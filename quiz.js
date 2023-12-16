//Total 5 questions with Answers
const questions =
[{
    question: "What does JavaScript primarily add to a web page?",
    answers: [
        { text: "Style", correct: false },
        { text: "Interactivity", correct: true },
        { text: "Structure", correct: false },
        { text: "Images", correct: false },
    ]
},
{
    question: "What is the correct way to declare a variable in JavaScript?",
    answers: [
        { text: " let myVar = 10;", correct: false },
        { text: "var myVar = 10;", correct: false },
        { text: "const myVar = 10;", correct: false },
        { text: "all of the above", correct: true },
    ]
},
{
    question: "Which of the following is a falsy value in JavaScript?",
    answers: [
        { text: "0", correct: false },
        { text: "“false”", correct: false },
        { text: "undefined", correct: false },
        { text: "all of the above", correct: true },
    ]
},
{
    question: "What is the purpose of the document.getElementById() method in JavaScript?",
    answers: [
        { text: "To get the value of an input element", correct: false },
        { text: "To change the page’s title", correct: false },
        { text: "To get an element by its ID", correct: true },
        { text: "To add a new HTML element", correct: false },
    ]
},
{
    question: "Which operator is used for equality without type coercion in JavaScript?",
    answers: [
        { text: "===", correct: true },
        { text: "==", correct: false },
        { text: "=", correct: false },
        { text: "!==", correct: false },
    ]
}
]
//To access the question answer and next button we have to create a variable which can be get the id element
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answerButtons");
const nextButton = document.getElementById("next_btn");

//+++++++++++ Hud Sections Starts +++++++++++//
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');
//+++++++++++ Hud Sections Ends +++++++++++//

//CONSTANTS for the correct answer and max questions to atempt
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;


//create a variable to change question number and score
let currentQuestionIndex = 0;
let score = 0;



function startQuiz() {
    //initially qs and score can be zero
    currentQuestionIndex = 0;
    score = 0;
    // after clicking the next button we need to replay
    nextButton.innerHTML = "Next";
    showQuestion();

}
function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex]; // to fetch the questions
    let questionNo = currentQuestionIndex + 1;
   console.log(questionNo);
 //+++++++++++ questionCounter for Hud Sections Starts +++++++++++//
    //For 1/3 in html code
    questionCounterText.innerText = `${questionNo} / ${MAX_QUESTIONS}`;
   //+++++++++++ questionCounter for Hud Sections Ends +++++++++++//

    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        //check if ans correct from button dataset
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        //if ans is correct then should be clickable
         button.addEventListener("click", selectAnswer)

    });
}


function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}


function selectAnswer(e)
{
 const selectedButton = e.target;
 const isCorrect = selectedButton.dataset.correct === "true";
 if(isCorrect)
 {
    selectedButton.classList.add("correct");
    score++;
    //+++++++++++ scoreCounter for Hud Sections Starts +++++++++++// 
     scoreText.innerText = score * CORRECT_BONUS;
    //+++++++++++ scoreCounter for Hud Sections Ends +++++++++++//
    
 }
 else{
    selectedButton.classList.add("incorrect");
 }
 Array.from(answerButtons.children).forEach(button =>
    {
        if(button.dataset.correct === "true")
        {
            button.classList.add("correct");
           
        } 
        button.disabled = true;
    });
   nextButton.style.display = "block";
 
 }


function showScore()
{
    resetState();
    questionElement.innerHTML = `Your score = ${score * CORRECT_BONUS} out of ${MAX_QUESTIONS * CORRECT_BONUS}`;
    nextButton.innerHTML = "Play Again";
    scoreText.innerText = "";
    nextButton.style.display = "block";
}

function handleNextButton()
{
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length)
    {
        showQuestion();
    }
    else
    {
        showScore();
    }
}

nextButton.addEventListener("click", ()=>
{
    if(currentQuestionIndex < questions.length)
    {
        handleNextButton();
    }
    else
    {
        startQuiz(); 
    }
});


startQuiz();


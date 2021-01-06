var question = document.getElementById("question");
var choices = Array.from(document.getElementsByClassName("choiceText"));
var correctWrongEL = document.getElementById("correctWrong");
var currentQuestion = {};
var acceptingAnswers = false;
var score = 0;
var availableQuestions = [];
var MAX_QUESTIONS = 7;
var timeLeft = 75;


var questions = [{
        question: "Inside which HTML element do we put the JavaScript??",
        choice1: "<script>",
        choice2: "<javascript>",
        choice3: "<js>",
        choice4: "<scripting>",
        answer: 1
    },
    {
        question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choice1: "<script href='xxx.js'>",
        choice2: "<script name='xxx.js'>",
        choice3: "<script src='xxx.js'>",
        choice4: "<script file='xxx.js'>",
        answer: 3
    },
    {
        question: " How do you write 'Hello World' in an alert box?",
        choice1: "msgBox('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer: 4
    },
    {
        question: "How does a WHILE loop start?",
        choice1: "while (i <= 10)",
        choice2: "while i = 1 to 10",
        choice3: "while(i <= 10; i++)",
        choice4: "while i <= 10",
        answer: 1
    },
    {
        question: "How can you add a comment in a JavaScript?",
        choice1: "<!--This is a comment-->",
        choice2: '"This is a comment"',
        choice3: "// This is a comment",
        choice4: "***This is a comment***",
        answer: 3
    },
    {
        question: 'How do you call a function named "myFunction"?',
        choice1: "function myFunction[]",
        choice2: "function = myFunction()",
        choice3: "function, myFunction()",
        choice4: "function myFunction()",
        answer: 2,
    }
];

startQuiz = () => {
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

function timer() {
    var timerEl = document.getElementById("timer");

    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    var timeInterval = setInterval(function() {
        // As long as the `timeLeft` is greater than 1
        if (timeLeft > 1) {
            // Set the `textContent` of `timerEl` to show the remaining seconds
            timerEl.innerHTML = timeLeft;
            // Decrement `timeLeft` by 1
            timeLeft--;
        } else {
            return window.location.assign("/endQuiz.html")
        }
    }, 1000);
}


getNewQuestion = () => {
    correctWrongEL.innerHTML = "";

    var questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        var number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", event => {

        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        var selectedChoice = event.target;
        var selectedAnswer = selectedChoice.dataset["number"];

        if (selectedAnswer == currentQuestion.answer) {
            correctWrongEL.innerHTML = "Correct!";
        } else {
            correctWrongEL.innerHTML = "Wrong!";

            score = score - 10;
        }


        if (availableQuestions.length === 0) {
            score = timeLeft + score;
            if (score < 0) { score = 0; }

            localStorage.setItem("mostRecentScore", score);

            //go to the end page
            return window.location.assign("/endQuiz.html");
        }


        setTimeout(() => {
            getNewQuestion();
        }, 2000);
    });
});


startQuiz();
timer();
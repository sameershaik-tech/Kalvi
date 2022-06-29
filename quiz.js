const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
    {
        question : "Who is founder of kalvi?",
        imgSrc : "img/q1.jpg",
        choiceA : "Shaik sameer",
        choiceB : "Rajesh kumar",
        choiceC : "nithish kumar",
        correct : "B"
    },{
        question : "when is kalvi's founding year?",
        imgSrc : "img/q2.png",
        choiceA : "2008",
        choiceB : "2002",
        choiceC : "2021",
        correct : "C"
    },{
        question : "where is kalvi headquaters?",
        imgSrc : "img/q3.jpg",
        choiceA : "chennai",
        choiceB : "Hyderabad",
        choiceC : "Bangalore",
        correct : "C"
    },{
        question : "who developed c language?",
        imgSrc : "img/q4.png",
        choiceA : "James Gosling",
        choiceB : "Dennis Ritchie",
        choiceC : "Niskum sam",
        correct : "B"

    },{
        question : "who is richest man in the world?",
        imgSrc : "img/q5.jpg",
        choiceA : "Elon Musk",
        choiceB : "Larry Page",
        choiceC : "Bill Gates",
        correct : "A"
    },{
        question : "Most used app in the world?",
        imgSrc : "img/q6.jpg",
        choiceA : "Facebook Messenger",
        choiceB : "Instagram",
        choiceC : "Twitter",
        correct : "B"
    },{
        question : "What is Kalvi?",
        imgSrc : "img/q1.jpg",
        choiceA : "B.Tech Computer Science Program ",
        choiceB : "B.Tech Electrical & Electronics Engineering Program ",
        choiceC : "B.Tech Mech Program ",
        correct : "A"

    }
    
    
  
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}
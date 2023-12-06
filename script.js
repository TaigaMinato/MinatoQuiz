const questions = [
    {
        question:"サピックスに入った時のクラスは？",
        answers:[
            {text:"アルファワン",correct:false},
            {text:"アルファシックス",correct:false},
            {text:"L",correct:true},
            {text:"G",correct:false},
        ]
    },
    {
        question:"LINEの友達の数は？",
        answers:[
            {text:"53",correct:true},
            {text:"63",correct:false},
            {text:"88",correct:false},
            {text:"98",correct:false},
        ]
    },
    {
        question:"一番嫌いな芸能人は？",
        answers:[
            {text:"坂上忍",correct:false},
            {text:"フワちゃん",correct:false},
            {text:"遠藤憲一",correct:true},
            {text:"たむけん",correct:false},
        ]
    },
    {
        question:"家で飼ってない生き物は？",
        answers:[
            {text:"ヘビ",correct:false},
            {text:"カメ",correct:false},
            {text:"クワガタ",correct:false},
            {text:"カブトムシ",correct:true},
        ]
    },
    {
        question:"そろばん検定(暗算)は何級？",
        answers:[
            {text:"一級",correct:false},
            {text:"準一級",correct:true},
            {text:"二級",correct:false},
            {text:"準二級",correct:false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "次の問題";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `${questions.length}問中${score} 問正解やね（by松本人志）`;
    nextButton.innerHTML = "もう一周しよう！";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();

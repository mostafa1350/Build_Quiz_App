
//============== def All Cointainer ===========
const mainStyle = document.querySelector(".mainStyle");
const quizPartStyle = document.querySelector(".quizPartStyle");
const resultStyle = document.querySelector(".resultStyle");
// ============= def Variable =================

let myCategoryAsk = "Physics";
let totalQuestion = 10;

// =============================================
let replyOptions = document.querySelector(".aswerQuizUlList");
let btnNextQuestion = document.querySelector(".btnNextAsk");
let curQuestion=null;
//we want that each question comes only one time so we need to History of each Question
const historyAskIndex = [];
const recordNumber = document.querySelector(".recordNumber");


let numberCorrectReply = 0;

// ================= TIMER ===================
const timeQuiz  = 10;
let curTime = timeQuiz;
let timer = null;
const showTimer = document.querySelector(".quizTime");

const resetTimer = ()=>{
    clearInterval(timer);
    curTime = timeQuiz ; 
    showTimer.textContent = `${curTime}s`;
}


const startTimer = ()=>{
    timer = setInterval(()=>{
        curTime--;
        showTimer.textContent = `${curTime}s`;
        if(curTime<=0){
            clearInterval(timer);
            //then we must go to the next Question & reveal the answer
            highLightReplyFunc();
            btnNextQuestion.style.visibility = "visible";
            //change background timer and blinking
            quizPartStyle.querySelector(".quizTimer").style.background = "#ff0000";
            window.alert("Time is Over .... Plz go to the Next Question👉");
            //disable all answer
            replyOptions.querySelectorAll(".listAnsewer").forEach(option => option.style.pointerEvents = "none");

        }

    } , 1000);
}
// ===========================================
const finalResultQuiz = ()=>{
    quizPartStyle.style.display = "none";
    resultStyle.style.display = "block";
    const textResult = `You answered <b>${numberCorrectReply}</b> from <b>${totalQuestion}</b> Asks , well Done!`;
    document.querySelector(".msgResult").innerHTML = textResult;
}


// ===========================================

const randomAsk=()=>{
    
    // "myAsksArray" is from myQuestions.js that has a set of Questions
    // "asks" is an array of question in each Category

    const classificationAsks = myAsksArray.find(classification=> classification.category.toLowerCase() === myCategoryAsk.toLowerCase()).asks || [];

    if(historyAskIndex.length>= Math.min(classificationAsks.length,totalQuestion)){

        return finalResultQuiz();
        // recordNumber.innerHTML = "Quiz Completed";
        // // btnNextQuestion.visibility= "hidden";
        // btnNextQuestion.enable = false;

    };

    // first , in historyAskIndex has no array , after execute the follwoing code, it fill with the used index of question
    const availableQuestion = classificationAsks.filter((_,index)=> !historyAskIndex.includes(index));
    const getRandomQuestion = availableQuestion[Math.floor(Math.random() * availableQuestion.length)];

    console.log(getRandomQuestion);
    //fill with the used index of Questions ...
    historyAskIndex.push(classificationAsks.indexOf(getRandomQuestion));

    return getRandomQuestion;
}
// ============================
const highLightReplyFunc = ()=>{
    const correctOption = replyOptions.querySelectorAll(".listAnsewer")[curQuestion.correctAnsewer];
    //show automatically highlight the correct reply

    console.log("===>" + correctOption);

    correctOption.classList.add('correct');

    const iconReply = `<span class="material-symbols-rounded">check_circle</span>`;
    correctOption.insertAdjacentHTML("beforeend",iconReply);
}
// =========================
const handleAnswer=(myOption, indexReply)=>{
    // Start Timer ...
    clearInterval(timer);

    //isCorrect is a Boolean var ...
    const isCorrect = curQuestion.correctAnsewer === indexReply;

    // show the result in "Console"
    console.log("Result =>" + curQuestion.correctAnsewer);
    // =============================

    

    myOption.classList.add(isCorrect ? 'correct' :'incorrect');

    !isCorrect ? highLightReplyFunc() : numberCorrectReply++;

    console.log("isCorrect  =>" + !isCorrect);


    const iconReply = `<span class="material-symbols-rounded">${isCorrect ? "check_circle" : "cancel"}</span>`;
    myOption.insertAdjacentHTML("beforeend",iconReply);
    // disable other reply when click the answer
    replyOptions.querySelectorAll(".listAnsewer").forEach(option => option.style.pointerEvents = "none");

    btnNextQuestion.style.visibility = "visible";}


// Show data in "quizAsk" from "h2" tag in quizScreen 👇
// ====================================================
const showQuestion = ()=>{
    curQuestion = randomAsk();
    if(!curQuestion) return;

    resetTimer();
    startTimer();

    replyOptions.innerHTML="";

    btnNextQuestion.style.visibility = "hidden";
    console.log(curQuestion);


    // "question" is a "field" from question=>asks=>myAsksArray=>myQuestions.js
    document.querySelector(".quizAsk").textContent = curQuestion.question;
    //change background after time is over ...
    quizPartStyle.querySelector(".quizTimer").style.background = "#666662";

    //"options" is a "field" from options=>asks=>myAsksArray=>myQuestions.js

    // Show Record Number Status ...
    recordNumber.innerHTML = `<b>${historyAskIndex.length}</b> from <b>${totalQuestion}</b> Asks`

    curQuestion.options.forEach((option,index) => {
        //"option" param is one of the randomAsk question data that keep them.
        //Considering that we have 4 choice, we create 4 li in innerHTML
        const li = document.createElement("li");
        //listAnsewer is a class , that's one of the Multiple Choice
        li.classList.add("listAnsewer");
        li.textContent = option;

        replyOptions.appendChild(li);

        li.addEventListener("click",()=> handleAnswer(li,index));
    })
}

// ==========================================================
//After Clicking category Option and Number of Quiz ...
//Then each Option will be highted after clicking ...

document.querySelectorAll(".btnCategoryOptions,.btnNumberAsk").forEach(myOption => {
    myOption.addEventListener("click", ()=>{
        myOption.parentNode.querySelector(".active").classList.remove("active");
        myOption.classList.add("active");
        console.log("option = >" + myOption);

    });
});

// ============================================================
const startQuiz = ()=>{
    mainStyle.style.display = "none";
    quizPartStyle.style.display = "block";
    //========
    myCategoryAsk = mainStyle.querySelector(".btnCategoryOptions.active").textContent;
    totalQuestion = parseInt(mainStyle.querySelector(".btnNumberAsk.active").textContent);
    console.log("total => " + totalQuestion);
    // we show Question Part in this Event
    showQuestion();
}

// ==========================================================

// if we want to reset quiz , we need reset all the follwoing element ...
const resetQuiz = ()=>{
    resetTimer();
    correctAnsewer = 0 ;
    historyAskIndex.length = 0 ; 
    mainStyle.style.display = "block";
    resultStyle.style.display = "none";

}
// ============================================

// ============ Next Question ===============
btnNextQuestion.addEventListener("click",showQuestion);
// ==========================================
// For Try Again ...
document.querySelector(".btnTryAgain").addEventListener("click",resetQuiz);
document.querySelector(".btnSatartQuiz").addEventListener("click",startQuiz);
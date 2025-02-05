
// ============= def Variable =================

let myCategoryAsk = "programming";
let replyOptions = document.querySelector(".aswerQuizUlList");
let btnNextQuestion = document.querySelector(".btnNextAsk");
let curQuestion=null;
//we want that each question comes only one time so we need to History of each Question
const historyAskIndex = [];
// ===========================================

const randomAsk=()=>{
    
    // "myAsksArray" is from myQuestions.js that has a set of Questions
    // "asks" is an array of question in each Category

    const classificationAsks = myAsksArray.find(classification=> classification.category.toLowerCase() === myCategoryAsk.toLowerCase()).asks || [];
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
    //isCorrect is a Boolean var ...
    const isCorrect = curQuestion.correctAnsewer === indexReply;

    // show the result in "Console"
    console.log("Result =>" + curQuestion.correctAnsewer);
    // =============================

    

    myOption.classList.add(isCorrect ? 'correct' :'incorrect');

    !isCorrect ? highLightReplyFunc() : "";

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

    replyOptions.innerHTML="";

    btnNextQuestion.style.visibility = "hidden";
    console.log(curQuestion);


    // "question" is a "field" from question=>asks=>myAsksArray=>myQuestions.js
    document.querySelector(".quizAsk").textContent = curQuestion.question;
    //"options" is a "field" from options=>asks=>myAsksArray=>myQuestions.js


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

showQuestion();
// ============ Next Question ===============
btnNextQuestion.addEventListener("click",showQuestion);
// ==========================================
// console.log("Test_____");
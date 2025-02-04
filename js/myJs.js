let myCategoryAsk = "programming";
let replyOptions = document.querySelector(".aswerQuizUlList");

// ===========================================

const randomAsk=()=>{
    
    // "myAsksArray" is from myQuestions.js that has a set of Questions
    // "asks" is an array of question in each Category

    const classificationAsks = myAsksArray.find(classification=> classification.category.toLowerCase() === myCategoryAsk.toLowerCase()).asks;
    const getRandomQuestion = classificationAsks[Math.floor(Math.random() * classificationAsks.length)];
    console.log(getRandomQuestion);
    return getRandomQuestion;
}

// Show data in "quizAsk" from "h2" tag in quizScreen 👇

const showQuestion = ()=>{
    const curQuestion = randomAsk();
    if(!curQuestion) return;

    replyOptions.innerHTML="";


    // "question" is a "field" from question=>asks=>myAsksArray=>myQuestions.js
    document.querySelector(".quizAsk").textContent = curQuestion.question;
    //"options" is a "field" from options=>asks=>myAsksArray=>myQuestions.js
    curQuestion.options.forEach(option => {
        //"option" param is one of the randomAsk question data that keep them.
        //Considering that we have 4 choice, we create 4 li in innerHTML
        const li = document.createElement("li");
        //listAnsewer is a class , that's one of the Multiple Choice
        li.classList.add("listAnsewer");
        li.textContent = option;

        replyOptions.appendChild(li);
    })
}

showQuestion();
// console.log("Test_____");
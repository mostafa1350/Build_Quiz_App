let myCategoryAsk = "programming";
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
    // "question" is an element from question=>asks=>myAsksArray=>myQuestions.js
    document.querySelector(".quizAsk").textContent = curQuestion.question;
}

showQuestion();
// console.log("Test_____");
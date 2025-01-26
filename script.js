const questions = [
    {
        question: "Question 1 which I have not decided yet",
        answers: [
            { text: "Answer a", value: "true" },
            { text: "Answer b", value: "false" },
            { text: "Answer c", value: "false" },
            { text: "Answer d", value: "false" },
        ]
    },
    {
        question: "Question 2 which I have not decided yet",
        answers: [
            { text: "Answer e", value: "false" },
            { text: "Answer f", value: "false" },
            { text: "Answer g", value: "true" },
            { text: "Answer h", value: "false" },
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
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNum = currentQuestionIndex + 1; 
    questionElement.innerHTML = questionNum + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.value) {
            button.dataset.value = answer.value;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.visibility = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) { // remember to put the *e* as parameter so eventListener works
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.value === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.value === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.visibility = "visible";
}

function showScore() {
    resetState();

    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play again?";
    nextButton.style.visibility = "visible";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
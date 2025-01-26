const questions = [
    {
        question: "A question",
        answers: [
            { text: "Answer a", value: 2 },
            { text: "Answer b", value: 2 },
            { text: "Answer c", value: 2 },
            { text: "Answer d", value: 2 },
        ]
    },
    {
        question: "Another question",
        answers: [
            { text: "Answer e", value: 2 },
            { text: "Answer f", value: 2 },
            { text: "Answer g", value: 2 },
            { text: "Answer h", value: 2 },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswerValue = null;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswerValue = null;
    nextButton.innerHTML = "Next";
    nextButton.disabled = true;
    nextButton.style.visibility = "none";
    showQuestion();
}

function showQuestion() {
    resetState();
    selectedAnswerValue = null;

    let currentQuestion = questions[currentQuestionIndex];
    let questionNum = currentQuestionIndex + 1; 
    questionElement.innerHTML = `${score} - ${questionNum}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.value !== undefined) {
            button.dataset.value = answer.value;
        }
        button.addEventListener("click", () => {
            selectAnswer(button);
        });
    });
}

function resetState() {
    nextButton.disabled = true;
    nextButton.style.visibility = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(button) { 
    Array.from(answerButtons.children).forEach(btn => {
        btn.classList.remove("selected");
    });
    button.classList.add("selected");

    selectedAnswerValue = Number(button.dataset.value);

    nextButton.disabled = false;
    nextButton.style.visibility = "visible";
}

function showScore() {
    resetState();

    questionElement.innerHTML = `You scored ${score} points!`;
    nextButton.innerHTML = "Play again?";
    nextButton.disabled = false;
    nextButton.style.visibility = "visible";
}

function handleNextButton() {
    if (selectedAnswerValue !== null) {
        score += selectedAnswerValue;
    }

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
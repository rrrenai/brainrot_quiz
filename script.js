const questions = [
    {
        question: "What genre of game do you most often play?",
        answers: [
            { text: "Action / fighting", value: 40 },
            { text: "Turn-based / strategy", value: 30 },
            { text: "Open world", value: 20 },
            { text: "Casual", value: 10 },
        ]
    },
    {
        question: "On a runaway train, who are you saving?",
        answers: [
            { text: "Random old person", value: 20 },
            { text: "A cute doggo", value: 10 },
            { text: "Ryzen 7 9800X3D", value: 40 },
            { text: "Gaming chair", value: 30 },
        ]
    },
    {
        question: "What kinds of weather do you prefer?",
        answers: [
            { text: "Colder", value: 20 },
            { text: "Warmer", value: 10 },
            { text: "There is no weather in game", value: 40 },
            { text: "Doesn't matter as long as I have AC", value: 30 },
        ]
    },
    {
        question: "When do you go to sleep?",
        answers: [
            { text: "Between 9 to 11 PM", value: 10 },
            { text: "After this game", value: 40 },
            { text: "Whenever I want", value: 20 },
            { text: "2 AM, consistently", value: 30 },
        ]
    },
    {
        question: "What do you think of when you hear 'ram'?",
        answers: [
            { text: "The animal!", value: 10 },
            { text: "Random access memory", value: 30 },
            { text: "The trucks", value: 20 },
            { text: "The use of semiconductor RAM dates back to 1965 when IBM introdu...", value: 40 },
        ]
    },
    {
        question: "What is/was your favorite Hack Club event?",
        answers: [
            { text: "Hackapet", value: 10 },
            { text: "Scrapyard", value: 30 },
            { text: "Boba Drops", value: 20 },
            { text: "Juice", value: 40 },
        ]
    },
    {
        question: "How often are you online?",
        answers: [
            { text: "Only for school / work", value: 10 },
            { text: "My Discord is set to run on startup", value: 30 },
            { text: "I check my DMs / mentions within 10 minutes", value: 20 },
            { text: "I turn off Discord overlay cuz it causes lag", value: 40 },
        ]
    }
];
const result = [
    {
        name: "lite",
        image: "./media/lite.jpg",
        desc: "You don't play games all that often, but you enjoy them for the fun of playing with others!"
    },
    {
        name: "casual",
        image: "./media/casual.jpg",
        desc: "You play and enjoy games often enough to beat some levels!"
    },
    {
        name: "skilled",
        image: "./media/skilled.jpg",
        desc: "You play games pretty often and know a wide variety of games!"
    },
    {
        name: "HARDCORE",
        image: "./media/hardcore.jpg",
        desc: "You have dedicated your life to video games! I'm sorry :("
    },
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
    questionElement.innerHTML = `${questionNum}. ${currentQuestion.question}`;

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

function detResult() {
    grade = score / questions.length;
    profile = [];

    if (grade <= 10) {
        profile = result[0];
    } else if (grade > 10 && grade <= 20) {
        profile = result[1];
    } else if (grade > 20 && grade <= 30) {
        profile = result[2];
    } else {
        profile = result[3];
    }

    return profile;
}

function showScore() {
    resetState();
    let gamerType = detResult();

    // questionElement.innerHTML = `You scored ${score / questions.length} points!`;
    questionElement.innerHTML = `<h2 class="center">You are a ${gamerType.name} gamer!</h2>`;
    if (gamerType.image !== null) {
        questionElement.innerHTML += `<img src="${gamerType.image}" alt="${gamerType.name}" class="center">`;
    }
    questionElement.innerHTML += `<p class="center">${gamerType.desc}</p>`;
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
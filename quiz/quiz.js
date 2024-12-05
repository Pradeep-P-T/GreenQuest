const questions = [
    {
        question: "What is solar energy?",
        options: ["Energy from the Sun", "Energy from Wind", "Energy from the Earth", "Energy from Water"],
        correct: 0
    },
    {
        question: "What is wind energy?",
        options: ["Energy from Wind", "Energy from the Sun", "Energy from Fossil Fuels", "Energy from Water"],
        correct: 0
    },
    {
        question: "Which of the following is a renewable energy source?",
        options: ["Coal", "Natural Gas", "Wind", "Nuclear"],
        correct: 2
    },
    {
        question: "What is the main cause of global warming?",
        options: ["Fossil Fuels", "Solar Energy", "Wind Energy", "Hydropower"],
        correct: 0
    },
    {
        question: "What type of energy is geothermal energy?",
        options: ["Fossil", "Renewable", "Nuclear", "None of the above"],
        correct: 1
    },
    {
        question: "Which country produces the most wind energy?",
        options: ["China", "USA", "Germany", "India"],
        correct: 0
    },
    {
        question: "What is the purpose of a wind turbine?",
        options: ["To create electricity", "To store energy", "To create water", "To generate heat"],
        correct: 0
    },
    {
        question: "What is hydropower?",
        options: ["Energy from the Sun", "Energy from water", "Energy from wind", "Energy from coal"],
        correct: 1
    },
    {
        question: "What is biomass energy?",
        options: ["Energy from waste", "Energy from sunlight", "Energy from wind", "Energy from fossil fuels"],
        correct: 0
    },
    {
        question: "What is the primary advantage of renewable energy?",
        options: ["Sustainability", "Cost", "Pollution", "Efficiency"],
        correct: 0
    }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 180; // Reset timer to 60 seconds for each quiz
let timer;

document.getElementById("startBtn").addEventListener("click", startQuiz);

function startQuiz() {
    document.getElementById('rules').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    score = 0; // Reset score
    timeLeft = 180; // Reset time
    document.getElementById('time').textContent = timeLeft; // Display time
    startTimer();
    showQuestion();
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('time').textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            submitQuiz();
        }
    }, 1000);
}

function shuffleOptions(question) {
    const { options, correct } = question;
    const shuffled = [...options].map((option, index) => ({ option, index }));
    
    // Perform Fisher-Yates shuffle
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    // Find the new index of the correct answer
    question.options = shuffled.map(item => item.option);
    question.correct = shuffled.findIndex(item => item.index === correct);
}


function showQuestion() {
    const question = questions[currentQuestion];
    shuffleOptions(question); // Shuffle and update the correct answer index
    document.getElementById('question').textContent = question.question;

    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.textContent = option;
        btn.classList.add("option-btn"); // Adding class for styling
        btn.onclick = () => selectOption(index, btn, question);
        optionsContainer.appendChild(btn);
    });

    document.getElementById('submitBtn').style.display = 'none';
}


function selectOption(selectedIndex, btn, question) {
    const options = document.querySelectorAll('.options button');

    // Mark the selected button based on the answer
    if (selectedIndex === question.correct) {
        btn.classList.add('correct');
        score++;  // Increment the score for correct answer
    } else {
        btn.classList.add('incorrect');
    }

    // Disable all options after selection
    options.forEach((button) => {
        button.disabled = true;
    });

    // Show the Submit button after selecting an option
    document.getElementById('submitBtn').style.display = 'block';
}

function changeQuestion(direction) {
    if (currentQuestion + direction >= 0 && currentQuestion + direction < questions.length) {
        currentQuestion += direction;
        showQuestion();
    }
}

function submitQuiz() {
    clearInterval(timer);
    document.getElementById('quiz').style.display = 'none';
    document.getElementById('score').style.display = 'block';

    // Display score and time taken
    document.getElementById('final-score').textContent = `Score: ${score}/10`;
    document.getElementById('final-time').textContent = `Time Taken: ${180 - timeLeft} seconds`;

    // Get current total points from sessionStorage
    let totalPoints = parseInt(sessionStorage.getItem('points'), 10) || 0;

    // Add quiz score to total points
    totalPoints += score;

    // Update sessionStorage with new total points
    sessionStorage.setItem('points', totalPoints);

    console.log(`Total Points After Quiz: ${totalPoints}`);
}


function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    timeLeft = 180;
    document.getElementById('score').style.display = 'none';
    document.getElementById('rules').style.display = 'block';
    document.getElementById('time').textContent = timeLeft;
}

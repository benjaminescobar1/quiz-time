// Quiz Questions
let questions = [
  {
    question: "What does DOM stand for?",
    options: ["Document Order Manager", "Document Oriented Manager", "Document Object Model", "Document Order Model"],
    answer: "Document Object Model"
  },
  {
    question: "Which keyword is used to declare a function in JavaScript?",
    options: ["func", "var", "const", "function"],
    answer: "function"
  },
  {
    question: "What symbol is used as an array?",
    options: ["[]", " ,", ";", "()"],
    answer: "[]"
  },
  {
    question: "In the order of arrays, which number counts as #1?",
    options: ["1", "4", "0", "2"],
    answer: "0"
  },
  {
    question: "What does "===" check?",
    options: ["Value", "Type", "Both value and type", "None of the above"],
    answer: "Both value and type"
  }
];

//Varibales 
var currentQuestionIndex = 0;
var time = 60;
var timerInterval;
var score = 0;

let startButton = document.querySelector(".start-btn");
let quizContainer = document.querySelector(".quiz-container");
let questionText = document.querySelector(".question-text");
let optionsList = document.querySelector(".options-list");
let feedbackText = document.querySelector(".feedback-text");
let timer = document.querySelector(".time");
let finalScore = document.querySelector(".final-score");
let initialsForm = document.querySelector(".initials-form");

// Event listener for start button, initals form 
startButton.addEventListener("click", startQuiz);
initialsForm.addEventListener("submit", saveHighScore);

//Start Quiz, timer when starting quiz
function startQuiz() {
  startButton.parentNode.classList.add("hide");
  quizContainer.classList.remove("hide");
  timerInterval = setInterval(updateTimer, 1000);
  showQuestion();
}

//Shows Question and Choices
function showQuestion() {
  let currentQuestion = questions[currentQuestionIndex];

  questionText.textContent = currentQuestion.question;
  optionsList.innerHTML = "";

  currentQuestion.options.forEach((option) => {
    let li = document.createElement("li");
    let button = document.createElement("button");
    button.textContent = option;
    button.addEventListener("click", evaluateAnswer);
    li.appendChild(button);
    optionsList.appendChild(li);
  });
}

//Shows if selected answer is correct or wrong. Subtracts time by 10 seconds for inccorect
function evaluateAnswer(event) {
  let selectedOption = event.target.textContent;
  let currentQuestion = questions[currentQuestionIndex];

  if (selectedOption === currentQuestion.answer) {
    feedbackText.textContent = "Correct!";
    score += 10;
  } else {
    feedbackText.textContent = "Wrong!";
    time -= 10;
  }

  currentQuestionIndex++;

// Once all questions answered checks if quiz is over
  if (currentQuestionIndex === questions.length) {
    endQuiz();
  } else {
    showQuestion();
  }
}
function endQuiz() {
  clearInterval(timerInterval);

  quizContainer.classList.add("hide");
  document.querySelector(".end-container").classList.remove("hide");

  finalScore.textContent = score;
}

// Updates the timer thats displayed on the page
function updateTimer() {
  time--;
  timer.textContent = time;

  if (time <= 0) {
    endQuiz();
  }
}

//Saves initials and score
function saveHighScore(event) {
  event.preventDefault();

  let initials = document.querySelector(".initials").value;
  let highScores = JSON.parse(localStorage.getItem("highScores")) || [];

  let newScore = {
    initials: initials,
    score: score
  };

  highScores.push(newScore);

  localStorage.setItem("highScores", JSON.stringify(highScores));

// Displays all scores after quiz is taken
  displayHighScores();
  }

  function displayHighScores() {
    let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    let scoresList = document.createElement("ul");

    highScores.forEach((score) => {
      let listItem = document.createElement("li");
      listItem.textContent = `${score.initials}: ${score.score}`;
      scoresList.appendChild(listItem);
    });

// Assigned element and appends it to the varible
  let scoresContainer = document.querySelector(".scores-container");
  scoresContainer.innerHTML = "";
  scoresContainer.appendChild(scoresList);
  }

// Varibles for clear and restart button
var clearScoresButton = document.querySelector(".clear-scores-btn");
var restartButton = document.querySelector(".restart-btn");

// Event listener for Clear Scores button and Restart button 
clearScoresButton.addEventListener("click", clearScores);
restartButton.addEventListener("click", restartQuiz);

// Function for clearing score and restarting quiz
function clearScores() {
  localStorage.removeItem("highScores");
  displayHighScores();
}
function restartQuiz() {
  currentQuestionIndex = 0;
  time = 60;
  score = 0;
  feedbackText.textContent = "";
  document.querySelector(".end-container").classList.add("hide");
  document.querySelector(".start-container").classList.remove("hide");
  clearInterval(timerInterval);
  timer.textContent = time;
}

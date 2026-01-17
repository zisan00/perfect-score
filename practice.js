/* =====================================================
   PRACTICE QUESTIONS ENGINE
   ===================================================== */

const QUESTIONS = [
  {
    text: "What is the main purpose of the passage?",
    options: [
      "To explain a process",
      "To criticise a theory",
      "To describe an experiment",
      "To tell a personal story"
    ],
    correct: 0
  },
  {
    text: "Which statement best reflects the author’s opinion?",
    options: [
      "The issue is solved",
      "The issue is complex",
      "The issue is exaggerated",
      "The issue is irrelevant"
    ],
    correct: 1
  }
];

let index = 0;
let correct = 0;
let wrong = 0;
let skipped = 0;
let review = [];

// DOM elements
const qText = document.getElementById("qText");
const optionsWrap = document.getElementById("optionsWrap");
const progressText = document.getElementById("progressText");
const quizCard = document.getElementById("quizCard");
const resultCard = document.getElementById("resultCard");
const scoreText = document.getElementById("scoreText");
const statsText = document.getElementById("statsText");
const reviewWrap = document.getElementById("reviewWrap");
const skipBtn = document.getElementById("skipBtn");

// Render question
function renderQuestion() {
  const q = QUESTIONS[index];
  progressText.textContent = `Question ${index + 1} of ${QUESTIONS.length}`;
  qText.textContent = q.text;
  optionsWrap.innerHTML = "";

  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "btn";
    btn.textContent = opt;
    btn.onclick = () => submitAnswer(i);
    optionsWrap.appendChild(btn);
  });
}

// Submit answer
function submitAnswer(choice) {
  const q = QUESTIONS[index];

  if (choice === q.correct) {
    correct++;
  } else {
    wrong++;
    review.push({
      question: q.text,
      chosen: q.options[choice],
      correct: q.options[q.correct]
    });
  }
  next();
}

// Skip
function skipQuestion() {
  skipped++;
  const q = QUESTIONS[index];
  review.push({
    question: q.text,
    chosen: "Skipped",
    correct: q.options[q.correct]
  });
  next();
}

// Next question
function next() {
  index++;
  index < QUESTIONS.length ? renderQuestion() : finish();
}

// Finish session
function finish() {
  quizCard.style.display = "none";
  resultCard.style.display = "block";

  scoreText.textContent = `Correct: ${correct}, Wrong: ${wrong}, Skipped: ${skipped}`;
  const accuracy = Math.round((correct / QUESTIONS.length) * 100);
  statsText.textContent = `Accuracy: ${accuracy}%`;

  reviewWrap.innerHTML = "";
  review.forEach(item => {
    const div = document.createElement("div");
    div.innerHTML = `
      <strong>Question:</strong> ${item.question}<br>
      <strong>Your answer:</strong> ${item.chosen}<br>
      <strong>Correct answer:</strong> ${item.correct}
    `;
    reviewWrap.appendChild(div);
  });
}

skipBtn?.addEventListener("click", skipQuestion);
renderQuestion();

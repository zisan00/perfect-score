// ===============================
// IELTS PRACTICE ENGINE
// ===============================

const QUESTIONS = [
  {
    text: "What is the main purpose of the passage?",
    options: [
      "To explain a process",
      "To criticize a theory",
      "To describe an experiment",
      "To tell a personal story"
    ],
    correct: 0
  },
  {
    text: "Which statement best reflects the author’s view?",
    options: [
      "The issue is irrelevant",
      "The issue is complex",
      "The issue is solved",
      "The issue is exaggerated"
    ],
    correct: 1
  }
];

let index = 0;
let correctCount = 0;
let wrongCount = 0;
let skippedCount = 0;
let review = [];

const qText = document.getElementById("qText");
const optionsWrap = document.getElementById("optionsWrap");
const progressText = document.getElementById("progressText");
const quizCard = document.getElementById("quizCard");
const resultCard = document.getElementById("resultCard");
const scoreText = document.getElementById("scoreText");
const statsText = document.getElementById("statsText");
const reviewWrap = document.getElementById("reviewWrap");
const skipBtn = document.getElementById("skipBtn");

function renderQuestion() {
  const q = QUESTIONS[index];
  progressText.textContent = `Question ${index + 1} of ${QUESTIONS.length}`;
  qText.textContent = q.text;
  optionsWrap.innerHTML = "";

  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "btn option";
    btn.textContent = opt;
    btn.onclick = () => answer(i);
    optionsWrap.appendChild(btn);
  });
}

function answer(choice) {
  const q = QUESTIONS[index];
  if (choice === q.correct) {
    correctCount++;
  } else {
    wrongCount++;
    review.push({
      q: q.text,
      your: q.options[choice],
      correct: q.options[q.correct]
    });
  }
  next();
}

function skip() {
  skippedCount++;
  review.push({
    q: QUESTIONS[index].text,
    your: "Skipped",
    correct: QUESTIONS[index].options[QUESTIONS[index].correct]
  });
  next();
}

function next() {
  index++;
  if (index >= QUESTIONS.length) finish();
  else renderQuestion();
}

function finish() {
  quizCard.style.display = "none";
  resultCard.style.display = "block";

  const total = QUESTIONS.length;
  scoreText.textContent =
    `Correct: ${correctCount}, Wrong: ${wrongCount}, Skipped: ${skippedCount}`;

  const accuracy = Math.round((correctCount / total) * 100);
  statsText.textContent = `Accuracy: ${accuracy}%`;

  reviewWrap.innerHTML = "";
  review.forEach(r => {
    const div = document.createElement("div");
    div.innerHTML = `<strong>Q:</strong> ${r.q}<br>
                     <strong>Your answer:</strong> ${r.your}<br>
                     <strong>Correct:</strong> ${r.correct}`;
    reviewWrap.appendChild(div);
  });
}

if (skipBtn) skipBtn.onclick = skip;
renderQuestion();
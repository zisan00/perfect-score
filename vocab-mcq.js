/* =====================================================
   VOCABULARY MCQs
   ===================================================== */

const WORDS = [
  { word: "allocate", options: ["ignore", "distribute", "delay", "remove"], correct: 1 },
  { word: "significant", options: ["small", "important", "temporary", "rare"], correct: 1 },
  { word: "consequence", options: ["cause", "method", "result", "opinion"], correct: 2 }
];

let i = 0;
let correct = 0;
let wrong = 0;
let skipped = 0;

// DOM elements
const wordTitle = document.getElementById("wordTitle");
const promptText = document.getElementById("promptText");
const optionsWrap = document.getElementById("mcqOptions");
const progress = document.getElementById("mcqProgress");
const skipBtn = document.getElementById("mcqSkip");
const card = document.getElementById("mcqCard");
const result = document.getElementById("mcqResult");
const scoreText = document.getElementById("mcqScore");
const statsText = document.getElementById("mcqTotals");

// Render MCQ
function render() {
  const item = WORDS[i];
  wordTitle.textContent = item.word;
  promptText.textContent = "Choose the closest meaning:";
  progress.textContent = `Item ${i + 1} of ${WORDS.length}`;
  optionsWrap.innerHTML = "";

  item.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.className = "btn";
    btn.textContent = opt;
    btn.onclick = () => answer(idx);
    optionsWrap.appendChild(btn);
  });
}

// Answer
function answer(choice) {
  choice === WORDS[i].correct ? correct++ : wrong++;
  next();
}

// Skip
function skip() {
  skipped++;
  next();
}

// Next
function next() {
  i++;
  i < WORDS.length ? render() : finish();
}

// Finish
function finish() {
  card.style.display = "none";
  result.style.display = "block";

  scoreText.textContent = `Correct: ${correct}, Wrong: ${wrong}, Skipped: ${skipped}`;
  const accuracy = Math.round((correct / WORDS.length) * 100);
  statsText.textContent = `Accuracy: ${accuracy}%`;
}

skipBtn?.addEventListener("click", skip);
render();

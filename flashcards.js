/* =====================================================
   FLASHCARDS ENGINE
   ===================================================== */

const deck = [
  { front: "allocate", back: "to distribute for a purpose", box: 1 },
  { front: "significant", back: "important or noticeable", box: 1 },
  { front: "consequence", back: "a result or effect", box: 1 }
];

let current = 0;

// DOM elements
const flashcard = document.getElementById("flashcard");
const front = document.getElementById("fcFront");
const back = document.getElementById("fcBack");
const showBtn = document.getElementById("showBtn");
const gradeBtns = document.getElementById("gradeBtns");
const againBtn = document.getElementById("againBtn");
const goodBtn = document.getElementById("goodBtn");
const easyBtn = document.getElementById("easyBtn");

// Render card
function renderCard() {
  const card = deck[current];
  flashcard.classList.remove("flipped");
  front.textContent = card.front;
  back.textContent = card.back;
  showBtn.style.display = "inline-flex";
  gradeBtns.style.display = "none";
}

// Show answer
function showAnswer() {
  flashcard.classList.add("flipped");
  showBtn.style.display = "none";
  gradeBtns.style.display = "flex";
}

// Grade card
function grade(type) {
  const card = deck[current];

  if (type === "again") card.box = 1;
  if (type === "good") card.box = Math.min(card.box + 1, 3);
  if (type === "easy") card.box = 3;

  next();
}

// Next card
function next() {
  current++;
  if (current >= deck.length) current = 0;
  renderCard();
}

// Events
showBtn.onclick = showAnswer;
flashcard.onclick = showAnswer;
againBtn.onclick = () => grade("again");
goodBtn.onclick = () => grade("good");
easyBtn.onclick = () => grade("easy");

// Keyboard shortcuts
document.addEventListener("keydown", e => {
  if (e.key === "1") grade("again");
  if (e.key === "2") grade("good");
  if (e.key === "3") grade("easy");
});

renderCard();

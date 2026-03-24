// Quiz questions and answers
const quiz = [
  { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
  { question: "What is the capital of France?", options: ["Paris", "London", "Rome", "Berlin"], answer: "Paris" },
  { question: "Which language runs in the browser?", options: ["Java", "C", "Python", "JavaScript"], answer: "JavaScript" },
  { question: "What does CSS stand for?", options: ["Central Style Sheets", "Cascading Style Sheets", "Cascading Simple Sheets", "Cars SUVs Sailboats"], answer: "Cascading Style Sheets" },
  { question: "What is 10 / 2?", options: ["2", "5", "10", "20"], answer: "5" }
];

const questionsDiv = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

// Load progress from sessionStorage
let progress = JSON.parse(sessionStorage.getItem("progress")) || {};

// Render questions
function renderQuestions() {
  questionsDiv.innerHTML = "";
  quiz.forEach((q, idx) => {
    const qDiv = document.createElement("div");
    qDiv.className = "question";
    const p = document.createElement("p");
    p.textContent = `${idx + 1}. ${q.question}`;
    qDiv.appendChild(p);

    q.options.forEach(opt => {
      const label = document.createElement("label");
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `q${idx}`;
      radio.value = opt;

      // Restore selection if exists in sessionStorage
      if (progress[`q${idx}`] === opt) radio.checked = true;

      // Save selection to sessionStorage on change
      radio.addEventListener("change", () => {
        progress[`q${idx}`] = opt;
        sessionStorage.setItem("progress", JSON.stringify(progress));
      });

      label.appendChild(radio);
      label.appendChild(document.createTextNode(opt));
      qDiv.appendChild(label);
    });

    questionsDiv.appendChild(qDiv);
  });
}

// Calculate score and store in localStorage
submitBtn.addEventListener("click", () => {
  let score = 0;
  quiz.forEach((q, idx) => {
    if (progress[`q${idx}`] === q.answer) score++;
  });
  scoreDiv.textContent = `Your score is ${score} out of ${quiz.length}.`;
  localStorage.setItem("score", score);
});

renderQuestions();

// Restore score after refresh if exists
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreDiv.textContent = `Your score is ${savedScore} out of ${quiz.length}.`;
}
const questionsData = [
  {
    question: "What is 2 + 2?",
    options: ["1", "2", "3", "4"],
    answer: "4"
  },
  {
    question: "Capital of India?",
    options: ["Mumbai", "Delhi", "Pune", "Chennai"],
    answer: "Delhi"
  },
  {
    question: "HTML stands for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyperlinks Text Mark Language",
      "None"
    ],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "JS is?",
    options: ["Language", "Framework", "Library", "Tool"],
    answer: "Language"
  },
  {
    question: "CSS used for?",
    options: ["Logic", "Styling", "Database", "Backend"],
    answer: "Styling"
  }
];

const questionsContainer = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

// Load saved progress
let savedProgress = JSON.parse(sessionStorage.getItem("progress")) || {};

// 🔹 Render Questions
function renderQuestions() {
  questionsContainer.innerHTML = "";

  questionsData.forEach((q, qIndex) => {
    const div = document.createElement("div");
    div.classList.add("question");

    const title = document.createElement("p");
    title.textContent = `${qIndex + 1}. ${q.question}`;
    div.appendChild(title);

    q.options.forEach((opt) => {
      const label = document.createElement("label");

      const input = document.createElement("input");
      input.type = "radio";
      input.name = `q${qIndex}`;
      input.value = opt;

      // Restore selection
      if (savedProgress[qIndex] === opt) {
        input.checked = true;
      }

      // Save to sessionStorage
      input.addEventListener("change", () => {
        savedProgress[qIndex] = opt;
        sessionStorage.setItem("progress", JSON.stringify(savedProgress));
      });

      label.appendChild(input);
      label.append(opt);

      div.appendChild(label);
    });

    questionsContainer.appendChild(div);
  });
}

// 🔹 Calculate Score
function calculateScore() {
  let score = 0;

  questionsData.forEach((q, index) => {
    if (savedProgress[index] === q.answer) {
      score++;
    }
  });

  return score;
}

// 🔹 Submit Handler
submitBtn.addEventListener("click", () => {
  const score = calculateScore();

  scoreDiv.textContent = `Your score is ${score} out of 5.`;

  // Save in localStorage
  localStorage.setItem("score", score);
});

// 🔹 Restore score after refresh
function loadScore() {
  const savedScore = localStorage.getItem("score");
  if (savedScore !== null) {
    scoreDiv.textContent = `Your score is ${savedScore} out of 5.`;
  }
}

// 🔹 Init
renderQuestions();
loadScore();
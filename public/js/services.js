const questions = [
  {
    question: "Aur kya haal 1?",
    answers: [
      { text: "Boht bhadiya", score: 5 },
      { text: "Bhadiya", score: 4 },
      { text: "Theeka thak", score: 3 },
      { text: "Bekaar", score: 2 },
      { text: "Boht bekaar", score: 1 },
    ],
  },
  {
    question: "Aur kya haal 2?",
    answers: [
      { text: "Boht bhadiya", score: 5 },
      { text: "Bhadiya", score: 4 },
      { text: "Theeka thak", score: 3 },
      { text: "Bekaar", score: 2 },
      { text: "Boht bekaar", score: 1 },
    ],
  },
  {
    question: "Aur kya haal 3?",
    answers: [
      { text: "Boht bhadiya", score: 5 },
      { text: "Bhadiya", score: 4 },
      { text: "Theeka thak", score: 3 },
      { text: "Bekaar", score: 2 },
      { text: "Boht bekaar", score: 1 },
    ],
  },
  {
    question: "Aur kya haal 4?",
    answers: [
      { text: "Boht bhadiya", score: 5 },
      { text: "Bhadiya", score: 4 },
      { text: "Theeka thak", score: 3 },
      { text: "Bekaar", score: 2 },
      { text: "Boht bekaar", score: 1 },
    ],
  },
  {
    question: "Aur kya haal 5?",
    answers: [
      { text: "Boht bhadiya", score: 5 },
      { text: "Bhadiya", score: 4 },
      { text: "Theeka thak", score: 3 },
      { text: "Bekaar", score: 2 },
      { text: "Boht bekaar", score: 1 },
    ],
  },
];

const quesEl = document.getElementById("question");
const ansBtn = document.getElementById("ans-button");
const nextBtn = document.getElementById("next-btn");

let currentQuesindex = 0;
let stresslevel = 0;
function statanalysing() {
  currentQuesindex = 0;
  stresslevel = 0;
  nextBtn.innerHTML = "NEXT";
  showQuestions();
}
function showQuestions() {
  resetstate();
  let currentQues = questions[currentQuesindex];
  let questionNo = currentQuesindex + 1;
  quesEl.innerHTML = questionNo + ". " + currentQues.question;

  currentQues.answers.forEach((answer) => {
    const btn = document.createElement("button");
    btn.innerHTML = answer.text;
    btn.classList.add("btn");
    ansBtn.appendChild(btn);
    btn.addEventListener("click", () => {
      selectAns(answer.score);
    });
  });
}

function selectAns(score) {
  stresslevel += score;
  nextBtn.style.display = "block";
}

function handleNextBtn() {
  currentQuesindex++;
  if (currentQuesindex < questions.length) {
    showQuestions();
  } else {
    showStressLevel();
  }
}
function showStressLevel() {
  resetstate();
  const stressLevel = 100 - (stresslevel / (5*5))*100;
  quesEl.innerHTML = "Your stress level: " + stressLevel + "%";

  const meterContainer = document.querySelector(".meter-container");
  const meterFill = document.getElementById("meter-fill");
  const meterLabel = document.getElementById("meter-label");

  meterFill.style.width = stressLevel + "%";
  meterLabel.textContent = stressLevel.toFixed(2) + "%";

  nextBtn.innerHTML = "Analysis again";
  nextBtn.style.display = "block";
  meterContainer.style.display = "block"; // Display the meter container

  // Reset the stress level to 0
  stresslevel = 0;

  // Hide the meter on "Analysis again" click
  nextBtn.addEventListener("click", () => {
    meterContainer.style.display = "none"; // Hide the meter container
  });
}

nextBtn.addEventListener("click", () => {
  if (currentQuesindex < questions.length) {
    handleNextBtn();
  } else {
    statanalysing();
  }
});
function resetstate() {
  nextBtn.style.display = "none";
  while (ansBtn.firstChild) {
    ansBtn.removeChild(ansBtn.firstChild);
  }
}
// JavaScript code to update the meter

statanalysing();

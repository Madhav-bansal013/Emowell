const quesEl = document.getElementById("question");
const ansBtn = document.getElementById("ans-button");
const nextBtn = document.getElementById("next-btn");
const meterContainer = document.querySelector(".meter-container");
const meterFill = document.getElementById("meter-fill");
const meterLabel = document.getElementById("meter-label");

let currentQuesindex = 0;
let stresslevel = 0;
let stressScore = 0;

const questions = [
  {
    question: "You feel that too many demands are being made on you",
    answers: [
      { text: "Usually", score: 4 },
      { text: "Often", score: 3 },
      { text: "Sometimes", score: 2 },
      { text: "Almost Never", score: 1 },
    ],
  },
  {
    question: "You are irritable or grouchy",
    answers: [
      { text: "Usually", score: 4 },
      { text: "Often", score: 3 },
      { text: "Sometimes", score: 2 },
      { text: "Almost Never", score: 1 },
    ],
  },
  {
    question: "You have too many things to do",
    answers: [
      { text: "Usually", score: 4 },
      { text: "Often", score: 3 },
      { text: "Sometimes", score: 2 },
      { text: "Almost Never", score: 1 },
    ],
  },
  {
    question: "You feel lonely or isolated",
    answers: [
      { text: "Usually", score: 4 },
      { text: "Often", score: 3 },
      { text: "Sometimes", score: 2 },
      { text: "Almost Never", score: 1 },
    ],
  },
  {
    question: "You feel tired",
    answers: [
      { text: "Usually", score: 4 },
      { text: "Often", score: 3 },
      { text: "Sometimes", score: 2 },
      { text: "Almost Never", score: 1 },
    ],
  },

  {
    question: "You fear you may not manage to attain your goals",
    answers: [
      { text: "Usually", score: 4 },
      { text: "Often", score: 3 },
      { text: "Sometimes", score: 2 },
      { text: "Almost Never", score: 1 },
    ],
  },
  {
    question: "You have too many decisions to make",
    answers: [
      { text: "Usually", score: 4 },
      { text: "Often", score: 3 },
      { text: "Sometimes", score: 2 },
      { text: "Almost Never", score: 1 },
    ],
  },
  {
    question: "You feel frustrated",
    answers: [
      { text: "Usually", score: 4 },
      { text: "Often", score: 3 },
      { text: "Sometimes", score: 2 },
      { text: "Almost Never", score: 1 },
    ],
  },
  {
    question: "You feel tense",
    answers: [
      { text: "Usually", score: 4 },
      { text: "Often", score: 3 },
      { text: "Sometimes", score: 2 },
      { text: "Almost Never", score: 1 },
    ],
  },
  {
    question: "Your problems seem to be piling up",
    answers: [
      { text: "Usually", score: 4 },
      { text: "Often", score: 3 },
      { text: "Sometimes", score: 2 },
      { text: "Almost Never", score: 1 },
    ],
  },
];

function statanalysing() {
  currentQuesindex = 0;
  stresslevel = 0;
  meterContainer.style.display = "none";
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
      stressScore = answer.score;
      nextBtn.style.display = "block";
    });
  });
}

function selectAns(score) {
  stresslevel += score;
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
  const stressLevel = (stresslevel / (4 * 10)) * 100;
  quesEl.innerHTML = "Your stress level: " + stressLevel.toFixed(2) + "%";

  // Set the custom property for the animation
  meterFill.style.setProperty("--stressLevel", stressLevel + "%");
  meterLabel.textContent = stressLevel.toFixed(2) + "%";

  nextBtn.innerHTML = "Analysis again";
  nextBtn.style.display = "block";
  meterContainer.style.display = "block"; // Display the meter container

  // Apply the animation class
  meterFill.style.animation = "fillMeter 2s ease-in-out forwards"; // Adjust the duration as needed
}

nextBtn.addEventListener("click", () => {
  if (currentQuesindex < questions.length) {
    selectAns(stressScore);
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

statanalysing();

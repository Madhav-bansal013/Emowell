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
      const buttons = document.querySelectorAll(".btn");
      buttons.forEach((button) => {
        item.style.backgroundColor = "";
        item.style.color = "";
      });

      stressScore = answer.score;
      nextBtn.style.display = "block";
      btn.style.backgroundColor = "#119e71";
      btn.style.color = "#ffffdd";
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
  // Get the user information from session storage
  const enteredUsername = sessionStorage.getItem("username");

  // Get the current date and time
  const timestamp = new Date();

  // Send a POST request to the server to save the stress level score
  fetch("/api/savestresslevel", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      username: enteredUsername,
      score: stressLevel,
      timestamp: timestamp.toISOString(), // Convert to ISO string format
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.error("Error saving stress level score:", error);
    });

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

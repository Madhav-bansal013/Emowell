function calculateScore(event) {
  event.preventDefault();

  const radioButtons = document.querySelectorAll('input[type="radio"]');
  let totalScore = 0;
  let answeredQuestions = 0;

  radioButtons.forEach(function (radioButton) {
    if (radioButton.checked) {
      totalScore += parseInt(radioButton.value);
      answeredQuestions++;
    }
  });
  if (answeredQuestions === 10) {
    const resultElement = document.getElementById("result");
    resultElement.textContent = "Your stress score: " + totalScore;
  } else {
    alert("Please answer all questions before submitting.");
    event.preventDefault();
  }
}
let submit = document.querySelector('input[type="submit"]');

submit.addEventListener("click", calculateScore);

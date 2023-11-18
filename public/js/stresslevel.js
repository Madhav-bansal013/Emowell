async function fetchStressLevelData() {
  try {
    const response = await fetch("/api/stresslevel", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch stress level data from the server");
    }

    const stressLevelData = await response.json();
    console.log(stressLevelData);
    return stressLevelData;
  } catch (error) {
    console.error("Error fetching stress level data:", error);
    return null;
  }
}

function prepareChartData(stressLevelData) {
  const labels = stressLevelData.map((entry) => entry.timestamp);
  const data = stressLevelData.map((entry) => entry.score);
  const username = stressLevelData[0].username;
  const score = stressLevelData[0].score;
  return { labels, data, username, score };
}

function displayChart(labels, data) {
  const ctx = document.getElementById("myChart").getContext("2d");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels.map((timestamp) => moment(timestamp)),
      datasets: [
        {
          label: "Stress Level",
          data: data,
          borderColor: "rgba(0, 0, 0, 0.7)",
          borderWidth: 3,
          fill: false,
        },
      ],
    },
    options: {
      scales: {
        x: {
          type: "time",
          time: {
            unit: "day",
            tooltipFormat: "ll HH:mm",
          },
          title: {
            display: true,
            text: "Time",
            color: "black",
            fontWeight: "900",
          },
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Stress Level",
            color: "black",
            fontWeight: "900",
            fontSize: 28,
          },
          ticks: {
            color: "black",
          },
        },
      },
    },
  });
}

async function fetchDataAndDisplayChart() {
  const loadingIndicator = document.getElementById("loadingIndicator");
  loadingIndicator.textContent = "Loading...";

  const stressLevelData = await fetchStressLevelData();
  if (stressLevelData) {
    const { labels, data, username, score } = prepareChartData(stressLevelData);
    console.log("Labels:", labels);
    console.log("Data:", data);
    displayChart(labels, data);
    const userNameElement = document.getElementById("userName");
    const userScoreElement = document.getElementById("userScore");
    userNameElement.textContent = username;
    userScoreElement.textContent = `Latest Score: ${score}`;

    const recommendationCard = document.querySelector(".card.blue p");

    if (score < 50) {
      recommendationCard.textContent =
        "You are experiencing normal stress levels.";
    } else if (score >= 50 && score < 85) {
      recommendationCard.textContent =
        "You are experiencing Moderate stress. It's important to seek support and take care of your mental health.";
    } else {
      recommendationCard.textContent =
        "You are experiencing Severe stress. It's urgent to seek a doctor.";
    }

    // Hide loading indicator after displaying the chart
    loadingIndicator.style.display = "none";
  } else {
    loadingIndicator.textContent = "Failed to fetch data";
  }
}

function backToHome() {
  // Assuming your home page URL is "index.html"
  window.location.href = "index.html";
}

fetchDataAndDisplayChart();

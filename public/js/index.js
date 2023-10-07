//LOADER
const loaderTextOptions = ["Mind Matters", "EmoWell Loading", "Stay Calm"];

// Function to change loader text dynamically
function changeLoaderText() {
  const loaderText = document.getElementById("loader-text");
  let currentIndex = 0;

  setInterval(() => {
    loaderText.textContent = loaderTextOptions[currentIndex];
    currentIndex = (currentIndex + 1) % loaderTextOptions.length;
  }, 600); // Change text every second
}

changeLoaderText();

function showLoader() {
  const loader = document.createElement("div");
  loader.className = "loader";
  loader.innerHTML = `
    <span class="loader-text">EMOWELL</span>
    <span class="load"></span>
  `;

  const loaderContainer = document.getElementById("loader-container");
  loaderContainer.appendChild(loader);

  loader.style.display = "block";
}

window.addEventListener("load", () => {
  setTimeout(() => {
    hideLoader();
  }, 2200);
});

// Function to hide the loader
function hideLoader() {
  const loaderContainer = document.getElementById("loader-container");
  loaderContainer.style.display = "none";
}
//LOADER ENDS
const isLoggedIn = sessionStorage.getItem("isLoggedIn");

// Function to display the user profile and logout options
function showUserProfile(username) {
  const userProfile = document.getElementById("user-profile");
  const usernameElement = document.getElementById("username");
  const logoutButton = document.getElementById("logout");
  const loginButton = document.getElementById("login");

  userProfile.style.display = "block";
  usernameElement.textContent = username;
  logoutButton.style.display = "block";
  loginButton.style.display = "none";
}

// Function to hide the user profile and logout options
function hideUserProfile() {
  const userProfile = document.getElementById("user-profile");
  const logoutButton = document.getElementById("logout");
  const loginButton = document.getElementById("login");

  userProfile.style.display = "none";
  logoutButton.style.display = "none";
  loginButton.style.display = "block";
}

// Initialize the user profile based on login status
if (isLoggedIn) {
  const username = sessionStorage.getItem("username");
  showUserProfile(username);
} else {
  hideUserProfile();
}

// Logout functionality
const logoutLink = document.getElementById("logout-link");
logoutLink.addEventListener("click", () => {
  sessionStorage.removeItem("isLoggedIn");
  sessionStorage.removeItem("username");
  hideUserProfile();
});

// JavaScript to hide and show navbar on scroll
let prevScrollPos = window.scrollY;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  const currentScrollPos = window.scrollY;
  if (prevScrollPos > currentScrollPos) {
    navbar.style.transform = "translateY(0)";
  } else {
    navbar.style.transform = "translateY(-100%)";
  }
  prevScrollPos = currentScrollPos;
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();

    const targetId = anchor.getAttribute("href").substring(1);
    const target = document.getElementById(targetId);

    if (target) {
      window.scrollTo({
        top: target.offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Back to home button functionality
const backToHomeButton = document.getElementById("backToHome");

backToHomeButton.addEventListener("click", () => {
  window.location.href = "index.html";
});

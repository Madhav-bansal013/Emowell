const isLoggedIn = sessionStorage.getItem("isLoggedIn");

// Function to display the user profile and logout options
function showUserProfile(username) {
  document.getElementById("user-profile").style.display = "block";
  document.getElementById("username").textContent = username;
  document.getElementById("logout").style.display = "block";
  document.getElementById("login").style.display = "none";
}

// Function to hide the user profile and logout options
function hideUserProfile() {
  document.getElementById("user-profile").style.display = "none";
  document.getElementById("logout").style.display = "none";
  document.getElementById("login").style.display = "block";
}

// Check if the user is logged in and display the profile or login accordingly
if (isLoggedIn) {
  const username = sessionStorage.getItem("username");
  showUserProfile(username);
} else {
  hideUserProfile();
}

// Logout functionality
document.getElementById("logout-link").addEventListener("click", () => {
  sessionStorage.removeItem("isLoggedIn");
  sessionStorage.removeItem("username");
  hideUserProfile();
});

// JavaScript to hide and show navbar on scroll
let prevScrollPos = window.pageYOffset;
const navbar = document.querySelector(".navbar");

window.onscroll = function () {
  const currentScrollPos = window.pageYOffset;
  if (prevScrollPos > currentScrollPos) {
    navbar.style.transform = "translateY(0)";
  } else {
    navbar.style.transform = "translateY(-100%)";
  }
  prevScrollPos = currentScrollPos;
};

// for smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href").substring(1);
    const target = document.getElementById(targetId);

    if (target) {
      window.scrollTo({
        top: target.offsetTop,
        behavior: "smooth",
      });
    }
  });
});

const backToHomeButton = document.getElementById("backToHome");

backToHomeButton.addEventListener("click", () => {
  window.location.href = "index.html";
});

//javascript to add user profile on login

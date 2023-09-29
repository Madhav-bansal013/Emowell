// form loading animation

const form1 = [...document.querySelector(".form").children];

form1.forEach((item, i) => {
  setTimeout(() => {
    item.style.opacity = 1;
  }, i * 100);
});

let homebtn = document.querySelector(".home-btn");

homebtn.addEventListener("click", function () {
  setTimeout(() => {
    document.location.href = "index.html";
  }, 300);
});

//register file
// send data as JSON which we are using;

const form = document.getElementById('reg-form');
form.addEventListener('submit', registerUser);
async function registerUser(event){
  event.preventDefault()
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;


  const result = await fetch('api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      email,
      password
    })
  }).then((res)=> res.json())

  if(result.status === 'ok'){
    sessionStorage.setItem('isLoggedIn', 'true'); // Set the isLoggedIn variable
    sessionStorage.setItem('username', username); // Set the username
    window.location.href = 'index.html';
  }
  else{
    alert(result.error);
  }

}
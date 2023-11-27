// Get a reference to the HTML form with the id "predict_form"
const form = document.getElementById("predict_form");

// Attach an event listener to the form, calling the predict function on submit
form.addEventListener("submit", predict);

// Function to handle the form submission and predict personality
async function predict(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Retrieve user inputs from the form
  let gender = document.getElementById("gender").value;
  let age = parseInt(document.getElementById("age").value, 10);

  // Ensure age is within a specific range
  if (age < 17) {
    age = 17;
  } else if (age > 28) {
    age = 28;
  }

  // Extract personality trait values from the form and invert them
  let openness = 9 - parseInt(document.getElementById("openness").value, 10);
  let neuroticism =
    9 - parseInt(document.getElementById("neuroticism").value, 10);
  let conscientiousness =
    9 - parseInt(document.getElementById("conscientiousness").value, 10);
  let agreeableness =
    9 - parseInt(document.getElementById("agreeableness").value, 10);
  let extraversion =
    9 - parseInt(document.getElementById("extraversion").value, 10);

  try {
    // Send a POST request to the server's "/api/predict" endpoint with user inputs
    const response = await fetch("/api/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gender,
        age,
        openness,
        neuroticism,
        conscientiousness,
        agreeableness,
        extraversion,
      }),
    });

    // Check if the server response is not successful
    if (!response.ok) {
      // Parse the error response and log appropriate messages
      let errorData;
      try {
        errorData = await response.json();
      } catch (error) {
        console.error("Non-JSON error response:", response.statusText);
        throw new Error(
          `HTTP error! Status: ${response.status}, Message: ${response.statusText}`
        );
      }

      throw new Error(
        `HTTP error! Status: ${response.status}, Message: ${errorData.error}`
      );
    }

    // Extract the result from the server response
    const result = await response.json();
    const cleanedResult = result.result.trim();

    // Log the result received from the server
    console.log("Received from server:", cleanedResult);

    // Display the result in the HTML element with the id "predict_result"
    const resultContainer = document.getElementById("predict_result");
    resultContainer.innerHTML = `Your Personality: ${cleanedResult}`;
  } catch (error) {
    // Log and handle errors that occur during the prediction process
    console.error("Error:", error.message);
  }
}

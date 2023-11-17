// predictor.js
function predictPersonality() {
    // Display a loading message
    document.getElementById('predictionResult').innerHTML = 'Predicting...';

    // Gather input data from the form
    var formData = new FormData(document.getElementById('personalityForm'));

    // Make an AJAX request to your Flask server
    fetch('/predict_personality', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(result => {
        // Display the prediction result on the page
        document.getElementById('predictionResult').innerHTML = 'Prediction Result: ' + result;
    })
    .catch(error => {
        console.error('Error predicting personality:', error);
        document.getElementById('predictionResult').innerHTML = 'Error predicting personality.';
    });
}

#Librerias
import pandas as pd 
import numpy as np
import matplotlib.pyplot as plt 
from flask import Flask, render_template, request
from sklearn.preprocessing import LabelEncoder
from factor_analyzer import FactorAnalyzer

app = Flask(__name__)

# Load the preprocessed data
df = pd.read_csv("responses.csv")
df = df.iloc[:, 76:133]
df = df.dropna()

# Encode categorical data
df = df.apply(LabelEncoder().fit_transform)

# Factor analysis with 5 factors
fa = FactorAnalyzer(5, rotation="varimax")
fa.fit(df)

# Example route in app.py
@app.route('/personality_predictor', methods=['POST'])
def predict_personality():
    if request.method == 'POST':
        # Extract user input from the form
        user_input = [float(request.form['feature1']), float(request.form['feature2'])]
        # Update feature1, feature2, etc., with the actual feature names

        # Encode categorical data using LabelEncoder (if needed)
        user_input_encoded = LabelEncoder().fit_transform(user_input)

        # Perform factor analysis on the user input
        predicted_personality = fa.transform([user_input_encoded])

        # Return the prediction result as a response
        return render_template('result.html', prediction=predicted_personality)

    # If the request method is not POST, render the form
    return render_template('personality_predictor.html')

if __name__ == '__main__':
    app.run(debug=True)

import streamlit as st
import requests

API_URL = "http://localhost:8000/predict"
st.title("Insurance premium category predictor")
st.markdown("Enter your details below.")

age = st.number_input("Age", min_value=1, max_value=199, value=30)
weight = st.number_input("Weight", min_value=1.0, max_value=499.0, value=80.0)
height = st.number_input("Height", min_value=0.1, max_value=4.0, value=2.0)
income_lpa = st.number_input("Income", min_value=0.1, value=20.0)
smoker = st.selectbox("Are you a smoker?", options=[True, False])
city = st.text_input("City", value="Mumbai")
occupation = st.selectbox(
    "Occupation",
    options=[
        "retired",
        "government_job",
        "freelancer",
        "student",
        "buisness_owner",
        "private_job",
        "unemployed",
    ],
)

if st.button("Predict Premium Category"):
    input_data = {
        "age": age,
        "weight": weight,
        "height": height,
        "income_lpa": income_lpa,
        "smoker": smoker,
        "city": city,
        "occupation": occupation,
    }

    try:
        response = requests.post(API_URL, json=input_data)
        result = response.json()

        # 1. Check for the correct key "Prediction" (matches your app.py)
        if response.status_code == 200 and "Prediction" in result:
            prediction_value = result["Prediction"]

            st.success(f"Predicted Insurance Premium Category: **{prediction_value}**")

            # NOTE: Your current backend DOES NOT calculate confidence or probabilities.
            # I have commented these out so your app doesn't crash.
            # To enable these, you would need to change 'model.predict()' to 'model.predict_proba()' in app.py.

            # st.write("🔍 Confidence:", result.get("confidence", "N/A"))
            # st.write("📊 Class Probabilities:")
            # st.json(result.get("class_probabilities", {}))

        else:
            st.error(f"API Error: {response.status_code}")
            st.write(result)

    except requests.exceptions.ConnectionError:
        st.error("❌ Could not connect to the FastAPI server. Make sure it's running.")

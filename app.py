import math
from flask import Flask, render_template, request, jsonify
import pickle
import pandas as pd
import numpy as np

app = Flask(__name__)


@app.route('/')
def index():
    return render_template("index.html")


with open("model.pkl", "rb") as f:
    model = pickle.load(f)


@app.route('/result', methods=['POST'])
def result():
    age = request.form.get('age')
    medu = request.form.get('medu')
    fedu = request.form.get('fedu')
    failures = request.form.get('failures')
    higher = request.form.get('higher')
    romantic = request.form.get('romantic')
    g1 = request.form.get('g1')
    g2 = request.form.get('g2')
    gouout = request.form.get('gouout')

    age_no = age
    medu_no = medu
    fedu_no = fedu
    failures_no = failures
    higher_no = higher
    romantic_no = romantic
    g1_no = g1
    g2_no = g2
    hanging = gouout

    inputs = [age_no, medu_no, fedu_no, failures_no,
              higher_no, g1_no, g2_no, romantic_no, hanging]
    df = pd.DataFrame([np.array(inputs)], columns=[
        'age', 'Medu', 'Fedu', 'failures', 'higher_yes', 'G1', 'G2', 'romantic_no', 'goout'])

    finalGrade = model.predict(df)
    final_grade_rounded = round(float(finalGrade))
    return jsonify({'grade': final_grade_rounded})


if __name__ == "__main__":
    app.run(debug=True)

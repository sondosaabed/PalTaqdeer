import math
from flask import Flask, render_template, request, jsonify
import pickle
import pandas as pd
import numpy as np
import mariadb
import jinja2

conn = mariadb.connect(
    user="root",
    password="root",
    host="localhost",
    database="pal_taqdeer")
cur = conn.cursor()

app = Flask(__name__)


@app.route('/')
def index():
    query = "select * from student_forecast"
    cur.execute(query)
    data = list(cur)

    return render_template("index.html", data=data)


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

    if not age or int(age) < 15 or int(age) > 22:
        return jsonify({'error' : 'Invalid Age'})
    if medu == "":
        return jsonify({'error' : 'Invalid Mother Education Status'})
    if fedu == "":
        return jsonify({'error' : 'Invalid Father Education Status'})
    if failures == "" or int(failures) > 4:
        return jsonify({'error' : 'Invalid Failures No.'})
    if not higher:
        return jsonify({'error' : 'Invalid Higher Education Status'})
    if not romantic:
        return jsonify({'error' : 'Invalid Romantic Status'})
    if g1 == "" or int(g1) > 20:
        return jsonify({'error' : 'Invalid First Period Grade'})
    if g2 == "" or int(g2) > 20:
        return jsonify({'error' : 'Invalid Second Period Grade'})
    if not int(gouout) or int(gouout) > 5:
        return jsonify({'error' : 'Invalid Hang Out Status'})

    inputs = [age, medu, fedu, failures,
              higher, g1, g2, romantic, gouout]
    df = pd.DataFrame([np.array(inputs)], columns=[
        'age', 'Medu', 'Fedu', 'failures', 'higher_yes', 'G1', 'G2', 'romantic_no', 'goout'])

    finalGrade = model.predict(df)
    final_grade_rounded = round(float(finalGrade))

    query = f""" INSERT INTO student_forecast (age, medu, fedu, failures, higher, romantic, g1, g2, gouout)
            VALUES ('{age}','{medu}','{fedu}','{failures}','{higher}','{romantic}','{g1}','{g2}','{gouout}'); """

    cur.execute(query)
    conn.commit()

    return jsonify({'grade': final_grade_rounded})


if __name__ == "__main__":
    app.run(debug=True)

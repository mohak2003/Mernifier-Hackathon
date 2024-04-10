from flask import Flask, render_template, request
import subprocess

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/run_script', methods=['POST'])
def run_script():
    user_input = request.form['user_input']
    
    # Run your Python script with the user input
    result = subprocess.check_output(['python', 'your_script.py', user_input], universal_newlines=True)

    return render_template('index.html', result=result)

if __name__ == '__main__':
    app.run(debug=True)

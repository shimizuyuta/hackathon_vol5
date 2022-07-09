from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
# from dotenv import load_dotenv

from api.analyze import Analyze as AL

# load_dotenv()
app = Flask(__name__)
app.config.from_envvar('FLASK_CONFIG_FILE')
CORS(
    app,
    supports_credentials=True
)


@app.route("/")
def test():
    return render_template('test.html')


@app.route("/analyze", methods=["POST"])
def analyze():
    image_file = request.files['image_file']
    al = AL(image_file)
    analyze_data = al.analyze()
    return jsonify(analyze_data)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

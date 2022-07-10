from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
from dotenv import load_dotenv
from io import BytesIO
from PIL import Image

from api.analyze import Analyze as AL

load_dotenv()
app = Flask(__name__)
# app.config.from_envvar('FLASK_CONFIG_FILE')
CORS(
    app,
    supports_credentials=True
)


@app.route("/")
def test():
    return render_template('test.html')

@app.route("/analyze", methods=["POST"])
def analyze():
    
    request_image = request.files['image_file']
    image_data = request_image.read()
    image_file = {'image_file': (request_image.filename,
                                image_data, request_image.mimetype)}
    img = Image.open(BytesIO(image_data))
    img.save('flask/image.jpg')
    al = AL(image_file)
    analyze_data = al.analyze()
    return jsonify(analyze_data)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

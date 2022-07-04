from flask import Flask, jsonify

app = Flask(__name__)


@app.route("/")
def test():
    return jsonify({'name': 'ore', 'team': 'gokiburiHeart'})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

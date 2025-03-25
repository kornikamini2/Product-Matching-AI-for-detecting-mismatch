from flask import Flask, request, jsonify
from flask_cors import CORS
from utils.match import match_image_title
from utils.description import generate_description
from utils.image_enhance import remove_background
import os

app = Flask(__name__)
CORS(app)  # Allow frontend to communicate with backend

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

@app.route("/upload", methods=["POST"])
def upload_product():
    if "image" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["image"]
    filename = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(filename)

    # AI Processing
    title = match_image_title(filename)
    description = generate_description(title)
    processed_image_path = remove_background(filename)

    return jsonify({
        "title": title,
        "description": description,
        "image_url": processed_image_path
    })

if __name__ == "__main__":
    app.run(debug=True)

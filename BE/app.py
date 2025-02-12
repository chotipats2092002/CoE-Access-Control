from flask import Flask, request, jsonify, send_from_directory
from flask_swagger_ui import get_swaggerui_blueprint
from flask_cors import CORS, cross_origin
import os
import time
import datetime

app = Flask(__name__)
CORS(app)  # Allow CORS for all routes
app.config['CORS_HEADERS'] = 'Content-Type'


SWAGGER_URL="/swagger"
API_URL="/static/swagger.json"

swagger_ui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={
        'app_name': 'Access API'
    }
)
app.register_blueprint(swagger_ui_blueprint, url_prefix=SWAGGER_URL)

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif", "bmp", "webp"}

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/ping', methods=['GET'])
def health_check():
    return "<h1 style=\"font-size: 10rem;\">🥹🥹🥹🥹🥹🥹🥹</h1>", 200

def allowed_file(file):
    return "." in file.filename and file.filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

@cross_origin()
@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if not allowed_file(file):
        return jsonify({'error': 'Invalid file type Only image is allow'}), 400
    
    # Create directory to save file
    today = datetime.datetime.now()
    year, month, day = today.strftime('%Y'), today.strftime('%m'), today.strftime('%d')
    save_dir = os.path.join(app.config['UPLOAD_FOLDER'], year, month, day)
    os.makedirs(save_dir, exist_ok=True)

    #Unix Time (Milliseconds) 
    timestamp = int(time.time() * 1000) 
    file_ext = file.filename.rsplit(".", 1)[1].lower()  
    filename = f"{timestamp}.{file_ext}"  

    file_path = os.path.join(save_dir, filename)
    file.save(file_path)  

    return jsonify({'message': 'File uploaded successfully', 'file_path': file_path}), 201





if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')

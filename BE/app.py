import copy
from flask import Flask, request, jsonify, send_from_directory
import os
import time
import datetime
from PIL import Image

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif", "bmp", "webp"}

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def allowed_file(file):
    return "." in file.filename and file.filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

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
    app.run(debug=True)

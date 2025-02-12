from flask import Flask, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_swagger_ui import get_swaggerui_blueprint
from flask_cors import CORS
import os
import time
import datetime

app = Flask(__name__)
CORS(app)

# ตั้งค่าการเชื่อมต่อ PostgreSQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://root:root@postgres:5432/image_storage'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

UPLOAD_FOLDER = 'static/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif", "bmp", "webp"}

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# โมเดลฐานข้อมูล
class Image(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(255), nullable=False)
    file_path = db.Column(db.String(500), nullable=False)
    uploaded_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "filename": self.filename,
            "file_path": self.file_path,
            "uploaded_at": self.uploaded_at.strftime('%Y-%m-%d %H:%M:%S')
        }

# สร้างตารางในฐานข้อมูล
with app.app_context():
    db.create_all()

@app.route('/ping', methods=['GET'])
def health_check():
    return "✅ API is running", 200

def allowed_file(file):
    return "." in file.filename and file.filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files.get('file')
    if not file or file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if not allowed_file(file):
        return jsonify({'error': 'Invalid file type. Only images are allowed'}), 400

    # สร้างโฟลเดอร์เก็บไฟล์
    today = datetime.datetime.now()
    year, month, day = today.strftime('%Y'), today.strftime('%m'), today.strftime('%d')
    save_dir = os.path.join(app.config['UPLOAD_FOLDER'], year, month, day)
    os.makedirs(save_dir, exist_ok=True)

    # ตั้งชื่อไฟล์โดยใช้ Unix timestamp
    timestamp = int(time.time() * 1000)
    file_ext = file.filename.rsplit(".", 1)[1].lower()
    filename = f"{timestamp}.{file_ext}"
    file_path = os.path.join(save_dir, filename)
    file.save(file_path)

    # บันทึกข้อมูลไฟล์ลงฐานข้อมูล
    new_image = Image(filename=filename, file_path=file_path)
    db.session.add(new_image)
    db.session.commit()

    return jsonify({'message': 'File uploaded successfully', 'file_id': new_image.id, 'file_path': file_path}), 201

@app.route('/images', methods=['GET'])
def get_images():
    images = Image.query.order_by(Image.uploaded_at.desc()).all()
    return jsonify([image.to_dict() for image in images])

@app.route('/image/<int:image_id>', methods=['GET'])
def get_image(image_id):
    image = Image.query.get(image_id)
    if not image:
        return jsonify({'error': 'Image not found'}), 404
    return send_from_directory(os.path.dirname(image.file_path), os.path.basename(image.file_path))

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')

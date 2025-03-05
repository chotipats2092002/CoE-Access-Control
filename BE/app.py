from flask import Flask, request, jsonify, send_from_directory, make_response, session
from flask_sqlalchemy import SQLAlchemy
from flask_swagger_ui import get_swaggerui_blueprint
from flask_cors import CORS
import os
import time
import datetime
import bcrypt
from datetime import timedelta

app = Flask(__name__)
CORS(app, supports_credentials=True)

# ตั้งค่า secret key และ config สำหรับ session
app.secret_key = 'your-secret-key'
app.config['SESSION_COOKIE_NAME'] = 'session_id'
app.config['SESSION_PERMANENT'] = True
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(days=1)

# ตั้งค่าการเชื่อมต่อ PostgreSQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://root:root@postgres:5432/image_storage'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

SWAGGER_URL = "/swagger"
API_URL = "/static/swagger.json"
swagger_ui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={'app_name': 'Access API'}
)
app.register_blueprint(swagger_ui_blueprint, url_prefix=SWAGGER_URL)

UPLOAD_FOLDER = 'static/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif", "bmp", "webp"}
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# ---------------------------
# โมเดลฐานข้อมูล
# ---------------------------
class Admin(db.Model):
    __tablename__ = 'admin'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.LargeBinary, nullable=False)  # เก็บเป็น bytes


class Image(db.Model):
    __tablename__ = 'image'
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

with app.app_context():
    db.create_all()
    admin_user = Admin.query.filter_by(username='admin').first()
    if not admin_user:
        hashed_pw = bcrypt.hashpw("password123".encode('utf-8'), bcrypt.gensalt())
        new_admin = Admin(username='admin', password=hashed_pw)  # บันทึก password เป็น bytes
        db.session.add(new_admin)
        db.session.commit()
        print("Created default admin user: admin / password123")


# ---------------------------
# ฟังก์ชันช่วยเหลือ
# ---------------------------
def allowed_file(file):
    return "." in file.filename and file.filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

# ---------------------------
# Endpoint สำหรับ Health Check
# ---------------------------
@app.route('/ping', methods=['GET'])
def health_check():
    return "<h1 style=\"font-size: 10rem;\">🥹🥹🥹🥹🥹🥹🥹</h1>", 200

# ---------------------------
# Endpoint สำหรับ Login
# ---------------------------
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Username and password required'}), 400

    admin_user = Admin.query.filter_by(username=username).first()
    if not admin_user:
        return jsonify({'error': 'Invalid credentials'}), 401

    # bcrypt สามารถเช็ค password ได้ตรง ๆ ไม่ต้องแปลงค่า
    if not bcrypt.checkpw(password.encode('utf-8'), admin_user.password):
        return jsonify({'error': 'Invalid credentials'}), 401

    session['user'] = username
    session.permanent = True
    response = make_response(jsonify({'message': 'Login successful'}))
    return response


# ---------------------------
# Endpoint สำหรับ Logout
# ---------------------------
@app.route('/logout', methods=['POST'])
def logout():
    session.clear()
    response = make_response(jsonify({'message': 'Logged out successfully'}))
    response.delete_cookie(app.config['SESSION_COOKIE_NAME'], path='/')
    return response

# ---------------------------
# Endpoint สำหรับอัปโหลดรูปภาพ
# ---------------------------
@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files.get('file')
    if not file or file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if not allowed_file(file):
        return jsonify({'error': 'Invalid file type. Only images are allowed'}), 400

    today = datetime.datetime.now()
    year, month, day = today.strftime('%Y'), today.strftime('%m'), today.strftime('%d')
    save_dir = os.path.join(app.config['UPLOAD_FOLDER'], year, month, day)
    os.makedirs(save_dir, exist_ok=True)

    timestamp = int(time.time() * 1000)
    file_ext = file.filename.rsplit(".", 1)[1].lower()
    filename = f"{timestamp}.{file_ext}"
    file_path = os.path.join(save_dir, filename)
    file.save(file_path)

    new_image = Image(filename=filename, file_path=file_path)
    db.session.add(new_image)
    db.session.commit()

    return jsonify({'message': 'File uploaded successfully',
                    'file_id': new_image.id,
                    'file_path': file_path}), 201

# ---------------------------
# Endpoint สำหรับดึงข้อมูลรูปภาพทั้งหมด
# ---------------------------
@app.route('/images', methods=['GET'])
def get_images():
    # pagination
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    images = Image.query.order_by(Image.uploaded_at.desc()).paginate(page=page, per_page=per_page, error_out=False)
    return jsonify({
        'total': images.total,
        'pages': images.pages,
        'current_page': images.page,
        'next_page': images.next_num,
        'prev_page': images.prev_num,
        'images': [image.to_dict() for image in images.items]

    })

# ---------------------------
# Endpoint สำหรับดึงรูปภาพเฉพาะ (ต้อง Login)
# ---------------------------
@app.route('/image/<int:image_id>', methods=['GET'])
def get_image(image_id):
    if 'user' not in session:
        return jsonify({'error': 'Unauthorized access'}), 401

    image = Image.query.get(image_id)
    if not image:
        return jsonify({'error': 'Image not found'}), 404

    return send_from_directory(os.path.dirname(image.file_path), os.path.basename(image.file_path))

# ---------------------------
# Endpoint สำหรับกรองรูปภาพตามปี, เดือน, วัน (ต้อง Login)
# ---------------------------
@app.route('/filter', methods=['GET'])
def get_image_filter():
    if 'user' not in session:
        return jsonify({'error': 'Unauthorized access'}), 401

    year = request.args.get('year', type=int)
    month = request.args.get('month', type=int)
    day = request.args.get('day', type=int)
    query = Image.query
    if year:
        query = query.filter(db.extract('year', Image.uploaded_at) == year)
    if month:
        query = query.filter(db.extract('month', Image.uploaded_at) == month)
    if day:
        query = query.filter(db.extract('day', Image.uploaded_at) == day)
    images = query.order_by(Image.uploaded_at.desc()).all()
    return jsonify([image.to_dict() for image in images])

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')

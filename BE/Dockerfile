# ใช้ Python 3.9-slim เป็น Base Image
FROM python:3.9-slim

RUN mkdir -p /uploads/secure

RUN ls -l /uploads > /log.txt
# กำหนด Working Directory
WORKDIR /app

# คัดลอกไฟล์ทั้งหมดไปยัง Container
COPY . /app


# ติดตั้ง Dependencies
RUN pip install --no-cache-dir -r requirements.txt

# เปิด Port 5000
EXPOSE 5000

# รัน Flask App
CMD ["python", "app.py"]

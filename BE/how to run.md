### setup
1. เข้า CoE-Access-Control\BE
2. python -m venv venv
3. 
Windows (PowerShell)
`venv\Scripts\Activate` หากเจอปัญหา run `Set-ExecutionPolicy Unrestricted -Scope Process` ก่อน
macOS/Linux
`source venv/bin/activate`
4. pip install -r requirements.txt
5. python app.py



### How to upload file
`curl -X POST http://localhost:5001/upload -F "file=@path/to/image.jpg"`

เช่น `curl -X POST http://localhost:5001/upload -F "file=@Downloads/Kwai.webp"`

### ดึงรายการไฟล์ทั้งหมด
`curl -X GET http://localhost:5001/images`

### ดึงไฟล์รูปภาพตาม ID
curl -X GET http://localhost:5001/image/1

#### เดี๋ยวไว้จะมาแก้ไขในส่วนของการ query โดยใช้ วัน เดืือน ปี
เพิ่ม api ในการ login, logout ผ่านหน้าเว็บ


## IP Camera info
username : admin
password : Suphak0rn

### RTSPtoWeb
แก้ config.json
>> "url": "rtsp://admin:Suphak0rn@192.168.1.108:554/cam/realmonitor?channel=1\u0026subtype=0"
สำหรับดึงวิดีโอจาก IP Camera แบบ realtime
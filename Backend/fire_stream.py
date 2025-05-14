from fastapi import FastAPI
from fastapi.responses import StreamingResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
import cv2
import os
import requests

# 🆕 Added imports for email functionality
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = FastAPI()

# ✅ Enable CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Load YOLO model
model = YOLO(r"D:\proj\zindagi-ai\Backend\best.pt")

# ✅ Video feed mapping
VIDEO_PATHS = {
    "1": r"D:\proj\zindagi-ai\Frontend\public\videos\video1.mp4",
    "2": r"D:\proj\zindagi-ai\Frontend\public\videos\video2.mp4",
    "3": r"D:\proj\zindagi-ai\Frontend\public\videos\video3.mp4",
    "4": r"D:\proj\zindagi-ai\Frontend\public\videos\video4.mp4",
}

# ✅ Map cam to evacuation node
CAM_TO_NODE = {
    "1": "Room1",
    "2": "Room2",
    "3": "Room3",
    "4": "Room4"
}

# ✅ Prevent re-blocking same node
already_blocked = set()

# ✅ Evacuation endpoint
EVACUATION_API_URL = "http://localhost:8001/block-node"

# ✅ Shared list to keep frontend-visible messages
event_log = []

# 🆕 Email configuration - replace with your actual credentials
EMAIL_SENDER = "k213432@nu.edu.pk"
EMAIL_PASSWORD = "wslu xoti zobf vzue"
EMAIL_RECIPIENT = "aalyancool8@gmail.com"

# 🆕 Function to send email notifications
def send_email(subject, body, to_email):
    from_email = EMAIL_SENDER
    password = EMAIL_PASSWORD

    message = MIMEMultipart()
    message["From"] = from_email
    message["To"] = to_email
    message["Subject"] = subject

    message.attach(MIMEText(body, "plain"))

    try:
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(from_email, password)
            server.send_message(message)
        print(f"✅ Email sent to {to_email}")
    except Exception as e:
        print(f"❌ Failed to send email: {e}")

def generate_stream(video_path, cam_id):
    cap = cv2.VideoCapture(video_path)

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        results = model.predict(source=frame, conf=0.15, verbose=False)
        fire_detected = any(model.names[int(cls)].lower() == "fire" for r in results for cls in r.boxes.cls)

        node = CAM_TO_NODE.get(cam_id)
        if fire_detected and node and node not in already_blocked:
            try:
                response = requests.post(f"{EVACUATION_API_URL}?node={node}")
                if response.status_code == 200:
                    already_blocked.add(node)
                    data = response.json()

                    fire_msg = f"🔥 Fire detected in {node}. Blocking node."
                    event_log.append(fire_msg)
                    print(fire_msg)

                    # 🆕 Send email notification
                    email_subject = f"🔥 Fire Alert: {node}"
                    email_body = f"Fire has been detected in {node}. The node has been blocked, and evacuation procedures have been initiated."
                    send_email(email_subject, email_body, EMAIL_RECIPIENT)

                    path = data.get("evacuation_path_from_blocked_node")
                    if path:
                        path_msg = f"🟢 Suggested evacuation path from blocked node: {path}"
                        event_log.append(path_msg)
                        print(path_msg)
                    else:
                        warn_msg = f"⚠️ No valid evacuation path from blocked node {node}."
                        event_log.append(warn_msg)
                        print(warn_msg)
                else:
                    print(f"❌ Failed to block node {node}: {response.text}")
            except Exception as e:
                print(f"❌ Error notifying evacuation system: {e}")

        annotated = results[0].plot()
        _, jpeg = cv2.imencode('.jpg', annotated)
        frame_bytes = jpeg.tobytes()

        yield (
            b'--frame\r\n'
            b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n'
        )

    cap.release()

@app.get("/stream{cam_id}")
def video_stream(cam_id: str):
    path = VIDEO_PATHS.get(cam_id)
    if not path or not os.path.exists(path):
        return {"error": "Invalid or missing video file"}
    return StreamingResponse(generate_stream(path, cam_id), media_type='multipart/x-mixed-replace; boundary=frame')

# ✅ New endpoint to fetch live messages for frontend
@app.get("/events")
def get_fire_event_log():
    return JSONResponse(content={"events": event_log})

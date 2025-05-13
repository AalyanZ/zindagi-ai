from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
import cv2
import os
import requests

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load YOLO model
model = YOLO(r"D:\proj\zindagi-ai\Backend\best.pt")

# Video path mapping
VIDEO_PATHS = {
    "1": r"D:\proj\zindagi-ai\Frontend\public\videos\video1.mp4",
    "2": r"D:\proj\zindagi-ai\Frontend\public\videos\video2.mp4",
    "3": r"D:\proj\zindagi-ai\Frontend\public\videos\video3.mp4",
    "4": r"D:\proj\zindagi-ai\Frontend\public\videos\video4.mp4",
}

# Mapping from cam_id to evacuation node (room)
CAM_TO_NODE = {
    "1": "Room1",
    "2": "Room2",
    "3": "Room3",
    "4": "Room4"
}

# Track already blocked nodes to prevent duplicates
already_blocked = set()

# Evacuation API endpoint
EVACUATION_API_URL = "http://localhost:8001/block-node"  # ✅ note: matches GET endpoint

def generate_stream(video_path, cam_id):
    cap = cv2.VideoCapture(video_path)

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        results = model.predict(source=frame, conf=0.15, verbose=False)
        fire_detected = False

        for result in results:
            for cls in result.boxes.cls:
                class_name = model.names[int(cls)]
                if class_name.lower() == "fire":
                    fire_detected = True
                    break

        node = CAM_TO_NODE.get(cam_id)
        if fire_detected and node and node not in already_blocked:
            try:
                # ✅ Send node as query param, not JSON
                response = requests.post(f"{EVACUATION_API_URL}?node={node}")
                if response.status_code == 200:
                    already_blocked.add(node)
                    print(f"🔥 Fire detected in {node}. Blocking node.")
                else:
                    print(f"Failed to block node {node}: {response.text}")
            except Exception as e:
                print(f"Failed to notify evacuation system: {e}")

        # Annotate frame and yield
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

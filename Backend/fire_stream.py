from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
import cv2
import os
import requests  # for sending POST to evacuation
import threading  # for managing state safely

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

# Keep track of already blocked nodes (to avoid repeat blocking)
already_blocked = set()

# Evacuation API URL (Ensure your evacuation service is running at the correct address)
EVACUATION_API_URL = "http://localhost:8001/block_node"

def generate_stream(video_path, cam_id):
    cap = cv2.VideoCapture(video_path)

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        results = model.predict(source=frame, conf=0.15, verbose=False)
        fire_detected = False

        # Detect fire in the frame
        for result in results:
            for cls in result.boxes.cls:
                class_name = model.names[int(cls)]
                if class_name.lower() == "fire":
                    fire_detected = True
                    break

        # If fire detected and node is not yet blocked, send signal to evacuation system
        node = CAM_TO_NODE.get(cam_id)
        if fire_detected and node and node not in already_blocked:
            try:
                # Notify evacuation system to block this node
                response = requests.post(EVACUATION_API_URL, json={"node": node})
                if response.status_code == 200:
                    already_blocked.add(node)
                    print(f"🔥 Fire detected in {node}. Blocking node.")
                else:
                    print(f"Failed to block node {node}: {response.text}")
            except Exception as e:
                print(f"Failed to notify evacuation system: {e}")

        # Annotate the frame with fire detection (if any)
        annotated = results[0].plot()
        _, jpeg = cv2.imencode('.jpg', annotated)
        frame_bytes = jpeg.tobytes()

        # Yield the frame to the client
        yield (
            b'--frame\r\n'
            b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n'
        )

    cap.release()

@app.get("/stream{cam_id}")
def video_stream(cam_id: str):
    """Serve the video stream for the given camera id."""
    path = VIDEO_PATHS.get(cam_id)
    if not path or not os.path.exists(path):
        return {"error": "Invalid or missing video file"}
    return StreamingResponse(generate_stream(path, cam_id), media_type='multipart/x-mixed-replace; boundary=frame')

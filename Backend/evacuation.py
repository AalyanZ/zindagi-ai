from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import networkx as nx
import matplotlib.pyplot as plt
import threading
import os

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Updated evacuation graph setup
G = nx.Graph()
edges = [
    ('Room1', 'Hallway1'),
    ('Room2', 'Hallway1'),
    ('Room3', 'Hallway2'),  # Updated connection
    ('Room4', 'Hallway3'),
    ('Hallway1', 'Hallway2'),
    ('Hallway1', 'Hallway4'),
    ('Hallway2', 'Hallway3'),
    ('Hallway3', 'Hallway4'),
    ('Exit1', 'Hallway2'),
    ('Hallway4', 'Exit2')
]
G.add_edges_from(edges)

# Store blocked nodes
blocked_nodes = set()
lock = threading.Lock()

# JSON model for incoming node block requests
class NodeRequest(BaseModel):
    node: str

@app.post("/block_node")
def block_node(req: NodeRequest):
    node = req.node
    with lock:
        if node not in G.nodes:
            return {"error": f"Node '{node}' does not exist in the graph."}
        blocked_nodes.add(node)
    print(f"🚫 Node blocked: {node}")
    generate_graph_image()
    return {"message": f"Node '{node}' blocked successfully."}

@app.get("/evacuation-image")
def get_evacuation_image():
    image_path = "evacuation.png"
    if not os.path.exists(image_path):
        generate_graph_image()
    return FileResponse(image_path, media_type="image/png")

def generate_graph_image():
    plt.clf()
    pos = nx.spring_layout(G, seed=42)  # fixed layout for consistency
    node_colors = []
    with lock:
        for node in G.nodes:
            if node in blocked_nodes:
                node_colors.append("red")
            elif "Exit" in node:
                node_colors.append("green")
            elif "Room" in node:
                node_colors.append("skyblue")
            else:  # Hallways
                node_colors.append("orange")
    nx.draw(G, pos, with_labels=True, node_color=node_colors, node_size=1000, font_weight="bold", edge_color="gray")
    plt.savefig("evacuation.png")

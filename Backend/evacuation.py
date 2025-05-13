from fastapi import FastAPI, Request
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import networkx as nx
import matplotlib
matplotlib.use('Agg')  # ✅ Use non-GUI backend to avoid thread/tkinter errors
import matplotlib.pyplot as plt
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

# Initialize evacuation graph
G = nx.Graph()

# Evacuation graph structure
edges = [
    ('Room1', 'Hallway1'),
    ('Room2', 'Hallway1'),
    ('Room3', 'Hallway2'),
    ('Room4', 'Hallway3'),
    ('Hallway1', 'Hallway2'),
    ('Hallway1', 'Hallway4'),
    ('Hallway2', 'Hallway3'),
    ('Hallway3', 'Hallway4'),
    ('Exit1', 'Hallway2'),
    ('Hallway4', 'Exit2')
]
G.add_edges_from(edges)

rooms = ['Room1', 'Room2', 'Room3', 'Room4']
exits = ['Exit1', 'Exit2']
blocked_nodes = set()
path_colors = ['red', 'green', 'blue', 'orange']

# Draw graph and highlight paths and blocked nodes
def draw_graph():
    if os.path.exists("evacuation.png"):
        os.remove("evacuation.png")

    pos = nx.spring_layout(G, seed=42)
    plt.figure(figsize=(10, 7))
    nx.draw(G, pos, with_labels=True, node_color='lightgray', edge_color='gray',
            node_size=2000, font_size=10)

    if blocked_nodes:
        nx.draw_networkx_nodes(G, pos, nodelist=list(blocked_nodes), node_color='black')

    for idx, room in enumerate(rooms):
        if room in blocked_nodes:
            continue
        try:
            paths = [nx.shortest_path(G, source=room, target=exit) for exit in exits]
            valid_paths = [p for p in paths if not any(node in blocked_nodes for node in p)]
            if valid_paths:
                shortest = min(valid_paths, key=len)
                nx.draw_networkx_edges(
                    G,
                    pos,
                    edgelist=list(zip(shortest, shortest[1:])),
                    edge_color=path_colors[idx % len(path_colors)],
                    width=3
                )
        except (nx.NetworkXNoPath, nx.NodeNotFound):
            continue

    plt.title("Evacuation Map")
    plt.tight_layout()
    plt.savefig("evacuation.png")
    plt.close()

# Reset and draw on startup
blocked_nodes.clear()
draw_graph()

@app.get("/evacuation-image")
def get_evacuation_image():
    draw_graph()
    return FileResponse("evacuation.png", media_type="image/png")

@app.post("/block-node")
def block_node(request: Request):
    node = request.query_params.get("node")
    if node and node in G and node not in blocked_nodes:
        blocked_nodes.add(node)
        draw_graph()
        return {"message": f"Node {node} marked as blocked and graph updated."}
    return {"error": "Invalid or already blocked node."}

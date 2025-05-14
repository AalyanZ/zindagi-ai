from fastapi import FastAPI, Request
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import networkx as nx
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import os

app = FastAPI()

# CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize graph
G = nx.Graph()
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
path_colors = ['red', 'blue', 'green', 'orange', 'purple', 'cyan']

# Draw graph and color paths from blocked nodes to exits
def draw_graph():
    if os.path.exists("evacuation.png"):
        os.remove("evacuation.png")

    pos = nx.spring_layout(G, seed=42)
    plt.figure(figsize=(10, 7))
    nx.draw(G, pos, with_labels=True, node_color='lightgray', edge_color='gray',
            node_size=2000, font_size=10)

    # Highlight blocked nodes
    if blocked_nodes:
        nx.draw_networkx_nodes(G, pos, nodelist=list(blocked_nodes), node_color='black')

    # For each blocked node, try to show its path to nearest exit in a unique color
    for idx, blocked_node in enumerate(blocked_nodes):
        try:
            paths = [
                nx.shortest_path(G, source=blocked_node, target=exit)
                for exit in exits if exit not in blocked_nodes
            ]
            valid_paths = [
                p for p in paths if not any(n in blocked_nodes and n != blocked_node for n in p)
            ]
            if valid_paths:
                shortest = min(valid_paths, key=len)
                nx.draw_networkx_edges(
                    G,
                    pos,
                    edgelist=list(zip(shortest, shortest[1:])),
                    edge_color=path_colors[idx % len(path_colors)],
                    width=3,
                    style='dashed'
                )
        except (nx.NetworkXNoPath, nx.NodeNotFound):
            continue

    plt.title("Evacuation Map")
    plt.tight_layout()
    plt.savefig("evacuation.png")
    plt.close()

# Initial draw
blocked_nodes.clear()
draw_graph()

@app.get("/evacuation-image")
def get_evacuation_image():
    draw_graph()
    return FileResponse("evacuation.png", media_type="image/png")

@app.post("/block-node")
def block_node(request: Request):
    node = request.query_params.get("node")

    if not node or node not in G:
        return {"error": "Invalid node."}
    if node in blocked_nodes:
        return {"message": f"Node {node} is already blocked."}

    blocked_nodes.add(node)
    draw_graph()

    # Try to find and return path from blocked node
    try:
        paths = [
            nx.shortest_path(G, source=node, target=exit)
            for exit in exits if exit not in blocked_nodes
        ]
        valid_paths = [
            p for p in paths if not any(n in blocked_nodes and n != node for n in p)
        ]

        if valid_paths:
            shortest = min(valid_paths, key=len)
            return {
                "message": f"Node {node} marked as blocked and graph updated.",
                "evacuation_path_from_blocked_node": shortest
            }
        else:
            return {
                "message": f"Node {node} marked as blocked and graph updated.",
                "evacuation_path_from_blocked_node": None,
                "note": "No valid evacuation path from the blocked node."
            }

    except (nx.NetworkXNoPath, nx.NodeNotFound):
        return {
            "message": f"Node {node} marked as blocked and graph updated.",
            "evacuation_path_from_blocked_node": None,
            "note": "No valid evacuation path from the blocked node."
        }

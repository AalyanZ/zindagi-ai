import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid, Button } from "@mui/material";

const streamUrls = [
  { id: 1, title: "Camera 1", url: "http://localhost:8000/stream1" },
  { id: 2, title: "Camera 2", url: "http://localhost:8000/stream2" },
  { id: 3, title: "Camera 3", url: "http://localhost:8000/stream3" },
  { id: 4, title: "Camera 4", url: "http://localhost:8000/stream4" },
];

const pathLegend = [
  { room: "Room1", color: "#e74c3c" },
  { room: "Room2", color: "#27ae60" },
  { room: "Room3", color: "#2980b9" },
  { room: "Room4", color: "#f1c40f" },
];

const Dashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const [evacuationImgUrl, setEvacuationImgUrl] = useState("");
  const [events, setEvents] = useState([]);
  const [shownAlerts, setShownAlerts] = useState(new Set());

  useEffect(() => {
    const fetchUpdates = () => {
      // 🔄 Reload evacuation image
      setEvacuationImgUrl(`http://localhost:8001/evacuation-image?t=${Date.now()}`);

      // 🔄 Fetch fire + path logs
      fetch("http://localhost:8000/events")
        .then(res => res.json())
        .then(data => {
          if (data?.events) {
            setEvents(data.events);

            // 🔔 Show alert box for new fire detection messages
            data.events.forEach(msg => {
              const match = msg.match(/Fire detected in (\w+)/i);
              if (match) {
                const room = match[1];
                if (!shownAlerts.has(room)) {
                  alert(`🔥 Fire detected in ${room}`);
                  setShownAlerts(prev => new Set(prev).add(room));
                }
              }
            });
          }
        })
        .catch(err => console.error("Error fetching event log:", err));
    };

    const interval = setInterval(fetchUpdates, 3000);
    return () => clearInterval(interval);
  }, [shownAlerts]);

  return (
    <div className="dashboard-container" style={{ fontFamily: 'Arial, sans-serif' }}>
      <header className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', backgroundColor: '#2c3e50', color: '#fff' }}>
        <Typography variant="h4" style={{ fontWeight: 'bold' }}>Zindagi.ai Dashboard</Typography>
        <Button variant="contained" color="secondary" onClick={handleLogout} style={{ alignSelf: 'flex-start', fontSize: '14px' }}>
          Logout
        </Button>
      </header>

      {/* 📹 Camera Streams */}
      <Grid container spacing={2} style={{ padding: "20px", marginTop: '20px' }}>
        {streamUrls.map((stream) => (
          <Grid item xs={12} sm={6} key={stream.id}>
            <Card sx={{ borderRadius: 3, boxShadow: 3, backgroundColor: '#ecf0f1' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>🔥 {stream.title}</Typography>
                <img src={stream.url} alt={stream.title} style={{ width: "100%", borderRadius: "8px", border: "2px solid #ddd" }} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* 🛑 Evacuation Path Image */}
      <div style={{ maxWidth: 1000, margin: "30px auto" }}>
        <Card sx={{ borderRadius: 3, boxShadow: 3, backgroundColor: '#ecf0f1' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>🛑 Evacuation Route (Dynamic)</Typography>
            <img src={evacuationImgUrl} alt="Evacuation Graph" style={{ width: "100%", borderRadius: "8px", border: "3px solid #444" }} />
            <Typography variant="subtitle1" gutterBottom style={{ marginTop: 15 }}>🚪 Evacuation Path Colors:</Typography>
            <Grid container spacing={1}>
              {pathLegend.map(({ room, color }) => (
                <Grid item xs={6} sm={3} key={room} style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ width: 20, height: 20, backgroundColor: color, borderRadius: "50%", marginRight: 10, border: "2px solid #333" }} />
                  <Typography variant="body2">{room}</Typography>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </div>

      {/* ✅ Fire + Evacuation Log Card */}
      <div style={{ maxWidth: 1000, margin: "20px auto" }}>
        <Card sx={{ borderRadius: 3, boxShadow: 3, backgroundColor: '#f9f9f9' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>📢 Fire Alerts & Suggested Evacuation Paths</Typography>
            {events.length === 0 ? (
              <Typography variant="body2" color="textSecondary">No events detected yet.</Typography>
            ) : (
              events.map((msg, idx) => (
                <Typography key={idx} variant="body2" style={{ marginBottom: "8px" }}>
                  {msg}
                </Typography>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

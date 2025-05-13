import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid, Button } from "@mui/material";

// ✅ Camera stream URLs
const streamUrls = [
  { id: 1, title: "Camera 1", url: "http://localhost:8000/stream1" },
  { id: 2, title: "Camera 2", url: "http://localhost:8000/stream2" },
  { id: 3, title: "Camera 3", url: "http://localhost:8000/stream3" },
  { id: 4, title: "Camera 4", url: "http://localhost:8000/stream4" },
];

// ✅ Color mapping for each room's evacuation path
const pathLegend = [
  { room: "Room1", color: "#e74c3c" },  // Red
  { room: "Room2", color: "#27ae60" },  // Green
  { room: "Room3", color: "#2980b9" },  // Blue
  { room: "Room4", color: "#f1c40f" },  // Yellow
];

const Dashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const [evacuationImgUrl, setEvacuationImgUrl] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setEvacuationImgUrl(`http://localhost:8001/evacuation-image?t=${Date.now()}`);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-container" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Header with Left-aligned Logout */}
      <header className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', backgroundColor: '#2c3e50', color: '#fff' }}>
        <Typography variant="h4" style={{ fontWeight: 'bold' }}>Zindagi.ai Dashboard</Typography>
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={handleLogout} 
          style={{ alignSelf: 'flex-start', fontSize: '14px' }}
        >
          Logout
        </Button>
      </header>

      {/* Camera Streams */}
      <Grid container spacing={2} style={{ padding: "20px", marginTop: '20px' }}>
        {streamUrls.map((stream) => (
          <Grid item xs={12} sm={6} key={stream.id}>
            <Card sx={{ borderRadius: 3, boxShadow: 3, backgroundColor: '#ecf0f1' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  🔥 {stream.title}
                </Typography>
                <img
                  src={stream.url}
                  alt={stream.title}
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                    border: "2px solid #ddd",
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Evacuation Path */}
      <div style={{ maxWidth: 1000, margin: "30px auto" }}>
        <Card sx={{ borderRadius: 3, boxShadow: 3, backgroundColor: '#ecf0f1' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              🛑 Evacuation Route (Dynamic)
            </Typography>
            <img
              src={evacuationImgUrl}
              alt="Evacuation Graph"
              style={{
                width: "100%",
                borderRadius: "8px",
                border: "3px solid #444",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              }}
            />

            {/* Color Legend for Evacuation Paths */}
            <div style={{ marginTop: 15 }}>
              <Typography variant="subtitle1" gutterBottom>
                🚪 Evacuation Path Colors:
              </Typography>
              <Grid container spacing={1}>
                {pathLegend.map(({ room, color }) => (
                  <Grid item xs={6} sm={3} key={room} style={{ display: "flex", alignItems: "center" }}>
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        backgroundColor: color,
                        borderRadius: "50%",
                        marginRight: 10,
                        border: "2px solid #333",
                      }}
                    />
                    <Typography variant="body2">{room}</Typography>
                  </Grid>
                ))}
              </Grid>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

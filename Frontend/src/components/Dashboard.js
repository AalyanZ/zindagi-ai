import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";

const streamUrls = [
  { id: 1, title: "Camera 1", url: "http://localhost:8000/stream1" },
  { id: 2, title: "Camera 2", url: "http://localhost:8000/stream2" },
  { id: 3, title: "Camera 3", url: "http://localhost:8000/stream3" },
  { id: 4, title: "Camera 4", url: "http://localhost:8000/stream4" },
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
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Zindagi.ai Dashboard</h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <Grid container spacing={2} style={{ padding: "20px" }}>
        {streamUrls.map((stream) => (
          <Grid item xs={12} sm={6} key={stream.id}>
            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  🔥 {stream.title}
                </Typography>
                <img
                  src={stream.url}
                  alt={stream.title}
                  style={{ width: "100%", borderRadius: 8 }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <div style={{ maxWidth: 1000, margin: "30px auto" }}>
        <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              🛑 Evacuation Route (Dynamic)
            </Typography>
            <img
              src={evacuationImgUrl}
              alt="Evacuation Graph"
              style={{ width: "100%", borderRadius: 8 }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

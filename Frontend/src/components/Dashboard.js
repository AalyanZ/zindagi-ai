import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [camera1, setCamera1] = useState("http://localhost:5000/stream1");
  const [camera2, setCamera2] = useState("http://localhost:5000/stream2");
  const [alertMessage, setAlertMessage] = useState(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch("http://localhost:5000/alerts");
        const data = await response.json();
        setAlertMessage(data.alert || null);
      } catch (error) {
        console.error("Error fetching alerts", error);
      }
    };
    
    const alertInterval = setInterval(fetchAlerts, 5000);
    return () => clearInterval(alertInterval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Zindagi.ai Dashboard</h1>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </header>

      <div className="camera-section">
        <div className="camera-box">
          <h3>Camera 1</h3>
          <img src={camera1} alt="Live Camera 1" />
        </div>
        <div className="camera-box">
          <h3>Camera 2</h3>
          <img src={camera2} alt="Live Camera 2" />
        </div>
      </div>
      
      {alertMessage && (
        <div className="alert-box">
          <p>{alertMessage}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
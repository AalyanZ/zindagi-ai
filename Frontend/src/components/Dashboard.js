import { useState, useEffect } from "react";
import "../styles/Dashboard.css";
import { useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutPage";

const Dashboard = () => {
  const streamUrls = [
    { id: 1, title: "Camera 1", url: "http://localhost:8000/stream1" },
    { id: 2, title: "Camera 2", url: "http://localhost:8000/stream2" },
    { id: 3, title: "Camera 3", url: "http://localhost:8000/stream3" },
    { id: 4, title: "Camera 4", url: "http://localhost:8000/stream4" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const [evacuationImgUrl, setEvacuationImgUrl] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [shownAlerts, setShownAlerts] = useState([]);

  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  // Check if user is logged in when component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Redirect to login if not logged in
      navigate("/login");
    } else {
      // In a real app, you might fetch user data here using the token
      setUserName("User");
    }
  }, [navigate])

useEffect(() => {
  const interval = setInterval(() => {
    // 🔄 Reload evacuation image
    setEvacuationImgUrl(`http://localhost:8001/evacuation-image?t=${Date.now()}`);
    setCurrentTime(new Date());
  }, 3000);

  return () => clearInterval(interval);
}, [shownAlerts]);


  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-title">
            <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
            <h1>Monitoring Dashboard</h1>
          </div>
          <div className="header-actions">
            <div className="timestamp">
              <div className="timestamp-label">Last updated:</div>
              <div className="timestamp-value">{currentTime.toLocaleTimeString()}</div>
            </div>
            <button onClick={handleLogout} className="logout-btn">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Camera Grid */}
        <section>
          <h2 className="section-header">
            <svg className="camera-icon" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
            </svg>
            Live Camera Feeds
          </h2>
          <div className="camera-grid">
            {streamUrls.map((stream) => (
              <div key={stream.id} className="camera-card">
                <div className="camera-header">
                  <div className="camera-title">
                    <span className="live-indicator"></span>
                    {stream.title}
                  </div>
                  <div className="camera-controls">
                    <button className="camera-btn">
                      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                    </button>
                    <button className="camera-btn">
                      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="camera-feed">
                  <img
                    src={stream.url}
                    alt={stream.title}
                    className="camera-img"
                  />
                  <div className="live-badge">LIVE</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Evacuation Route */}
        <section>
          <h2 className="section-header">
            <svg className="evacuation-icon" width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
            Emergency Evacuation Route
          </h2>
          <div className="evacuation-card">
            <div className="evacuation-header">
              <div className="evacuation-title">
                <div className="alert-indicator">
                  <div className="alert-pulse"></div>
                  <div className="alert-dot"></div>
                </div>
                Dynamic Evacuation Map
              </div>
              <div className="update-info">Auto-updates every 3 seconds</div>
            </div>
            <div className="evacuation-content">
              <img
                src={evacuationImgUrl}
                alt="Evacuation Route"
                className="evacuation-img"
              />
              <div className="evacuation-alert">
                <svg className="alert-icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <p className="alert-text">
                  In case of emergency, follow the highlighted route to the nearest exit point.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
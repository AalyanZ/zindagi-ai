import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css"

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleAuth = async () => {
    const endpoint = "http://localhost:5000/login";
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.token);
      setMessage("Authentication successful!");
      navigate("/dashboard");
    } else {
      setMessage(data.message || "Authentication failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="auth-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="auth-input"
        />
        <button className="auth-button" onClick={handleAuth}>Login</button>
        <p className="auth-message">{message}</p>
        <p>
          Don't have an account? 
          <button className="toggle-button" onClick={() => navigate("/signUpPage")}>
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

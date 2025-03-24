import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";  // Using auth.css for styling

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
      // alert("Login Successful!");  Only shows alert
      // Redirects only when "Login" button is clicked
      navigate("/camera");
    } else {
      alert("Invalid Credentials!");
    }
  };

  return (
    <div className="auth-container">  {/* Matches auth.css */}
      <h2 className="auth-title">Login</h2>
      <input type="email" className="auth-input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" className="auth-input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="btn" onClick={handleLogin}>Login</button>
      <p className="auth-text">Don't have an account? <span className="auth-link" onClick={() => navigate("/register")}>Register</span></p>
    </div>
  );
};

export default Login;

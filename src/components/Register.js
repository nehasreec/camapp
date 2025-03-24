import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";  // Using auth.css for styling


const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const existingUser = JSON.parse(localStorage.getItem("user"));
    if (existingUser && existingUser.email === email) {
      alert("You have already registered. Please go to login.");
      navigate("/");
      return;
    }

    const user = { email, password };
    localStorage.setItem("user", JSON.stringify(user));
    alert("Registration Successful! Redirecting to Login...");
    navigate("/"); // Redirect after 1 second
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Register</h2>
      <form onSubmit={handleRegister}>
        <input type="email" className="auth-input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" className="auth-input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="btn">Register</button>
      </form>
      <p className="auth-text">Already have an account? <span className="auth-link" onClick={() => navigate("/")}>Login</span></p>
    </div>
  );
};

export default Register;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Camera from "./components/Camera";
// import Gallery from "./pages/Gallery";
// import Settings from "./pages/Settings";
import "./styles/global.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/camera" element={<Camera />} />
        {/* <Route path="/gallery" element={<Gallery />} /> */}
        {/* <Route path="/settings" element={<Settings />} /> */}
      </Routes>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Header from "./components/Header/header";
import Sidebar from "./components/Sidebar/sidebar";
import Home from "./pages/home";
import Login from "./pages/Login Form/login";
import Register from "./pages/Registration Form/register";
import ProfileManagement from "./pages/Profile Management/profile";
import EventManagement from "./pages/Event Management/eventManagement";
import VolunteerMatching from "./pages/Volunteer Matching/volunteerMatching";
import VolunteerHistory from "./pages/Volunteer History/volunteerHistory";
import Notification from "./components/Notification/notification";

import "./App.css";

function App() {
  const [users, setUsers] = useState([
    { username: "admin1", password: "pw1" },
    { username: "admin2", password: "pw2" },
  ]);

  const handleRegister = (username, password) => {
    const userExists = users.find((user) => user.username === username);
    if (!userExists) {
      // Add the new user
      setUsers([...users, { username, password }]);
      alert("Registration successful! You can now log in."); // Alert for successful registration
    } else {
      alert("Username already exists.");
    }
  };
  return (
    <Router>
      <Header />
      {/* <Notification/> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login users={users} />} />
        <Route path="/register" element={<Register onRegister={handleRegister} />} />
        <Route path="/profile" element={<ProfileManagement />} />
        <Route path="/event-matching" element={<EventManagement />} />
        <Route path="/volunteer-matching" element={<VolunteerMatching />} />
        <Route path="/volunteer-history" element={<VolunteerHistory />} />
      </Routes>
    </Router>
  );
}

export default App;

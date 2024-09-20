import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/header";
import Sidebar from "./components/Sidebar/sidebar";
import Home from "./pages/home";
import Login from "./pages/Login Form/login";
import Register from "./pages/Registration Form/register";
import Profile from "./pages/profile";
import EventManagement from "./pages/Event Management/eventManagement";
import VolunteerMatching from "./pages/Volunteer Matching/volunteerMatching";
import VolunteerHistory from "./pages/volunteerHistory";
import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/event-matching" element={<EventManagement />} />
        <Route path="/volunteer-matching" element={<VolunteerMatching />} />
        <Route path="/volunteer-history" element={<VolunteerHistory />} />
      </Routes>
    </Router>
  );
}

export default App;

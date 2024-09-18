import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import Sidebar from "./components/Sidebar/sidebar";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Profile from "./pages/profile";
import EventManagement from "./pages/Event Management/eventManagement";
import VolunteerMatching from "./pages/volunteerMatching";
import VolunteerHistory from "./pages/volunteerHistory";
import "./App.css";

function App() {
  return (
    <Router>
      <Sidebar />
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

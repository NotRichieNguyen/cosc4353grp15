// frontend/src/pages/Volunteer History/volunteerHistory.js
import React, { useEffect, useState } from "react";
import "./volunteerHistory.css"; // Import CSS if needed

const VolunteerHistory = () => {
  const [history, setHistory] = useState([]); // Store volunteer history
  const [totalHours, setTotalHours] = useState(0); // Store total hours
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all events from backend
        const historyResponse = await fetch("http://localhost:5000/api/volunteer-history");
        if (!historyResponse.ok) throw new Error("Failed to fetch volunteer history");
        const historyData = await historyResponse.json();
        setHistory(historyData); // Update state with all events

        // Fetch total hours for the current month
        const hoursResponse = await fetch("http://localhost:5000/api/volunteer-history/hours");
        if (!hoursResponse.ok) throw new Error("Failed to fetch total hours");
        const hoursData = await hoursResponse.json();
        setTotalHours(hoursData.totalHours);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false); // Ensure loading ends
      }
    };

    fetchData();
  }, []);

  if (loading) return <h5>Loading...</h5>; // Show loading message
  if (error) return <h5>Error: {error}</h5>; // Show error message if any

  return (
    <div className="container">
      <h1>Volunteer History</h1>
      <table id="volunteer-history">
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Description</th>
            <th>Location</th>
            <th>Required Skills</th>
            <th>Date</th>
            <th>Participation Status</th>
            <th>Hours</th>
          </tr>
        </thead>
        <tbody id="history-body">
          {history.length > 0 ? (
            history.map((event, index) => (
              <tr key={index}>
                <td>{event.eventName}</td>
                <td>{event.description}</td>
                <td>{event.location}</td>
                <td>{event.requiredSkills.join(", ")}</td>
                <td>{new Date(event.date).toLocaleDateString()}</td>
                <td>{event.participationStatus}</td>
                <td>{event.hours}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No volunteer history available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <h5 className="mt-4">Total Hours Volunteered This Month: {totalHours}</h5>
    </div>
  );
};

export default VolunteerHistory;

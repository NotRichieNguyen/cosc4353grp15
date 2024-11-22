import React, { useEffect, useState } from "react";
import { RxTriangleLeft } from "react-icons/rx";
import { RxTriangleRight } from "react-icons/rx";

import "./volunteerHistory.css";

const VolunteerHistory = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 10;

  useEffect(() => {
    const fetchVolunteerHistory = async () => {
      try {
        const userId = localStorage.getItem("id");

        const response = await fetch(
          `http://localhost:5000/api/volunteer-history/${userId}`
        );
        const data = await response.json();

        if (response.ok) {
          setEvents(data.events);
        } else {
          setError(data.message || "Failed to fetch volunteer history.");
        }
      } catch (err) {
        console.error("Error fetching volunteer history:", err);
        setError("An error occurred while fetching volunteer history.");
      }
    };

    fetchVolunteerHistory();
  }, []);

  // Pagination logic
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  const totalPages = Math.ceil(events.length / eventsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="volunteerHistory">
      <div className="vh_container">
        <div className="vh_container_header">
          <div className="vh_container_header_title">Volunteer History</div>
        </div>
        <div className="vh_eventList">
          {error && <p className="vh_error">{error}</p>}
          {currentEvents.length > 0 ? (
            <div>
              <table className="vh_table">
                <thead>
                  <tr>
                    <th>Event Name</th>
                    <th>Location</th>
                    <th>Date</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {currentEvents.map((event) => (
                    <tr key={event._id}>
                      <td>{event.eventname}</td>
                      <td>{event.eventlocation}</td>
                      <td>{new Date(event.date).toLocaleDateString()}</td>
                      <td>{event.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="pagination">
                <button
                  className="previousButton"
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  <RxTriangleLeft />
                </button>
                <span className="pageNumber">{currentPage}</span>
                <button
                  className="nextButton"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  <RxTriangleRight />
                </button>
              </div>
            </div>
          ) : (
            !error && <p>No volunteer history available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VolunteerHistory;

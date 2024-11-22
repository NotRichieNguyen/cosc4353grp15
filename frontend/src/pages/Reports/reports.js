import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { RxTriangleLeft } from "react-icons/rx";
import { RxTriangleRight } from "react-icons/rx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./reports.css";

const Reports = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [eventReport, setEventReport] = useState([]);
  const [volunteerReport, setVolunteerReport] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;

  const handleTabClick = (tab) => {
    setActiveTab((prevTab) => (prevTab === tab ? null : tab));
    setLoading(true);
    setError(null);
    setCurrentPage(1); // Reset to the first page when switching tabs

    if (tab === "volunteer") {
      fetchVolunteerReport();
    } else if (tab === "event") {
      fetchEventReport();
    }
  };

  const fetchVolunteerReport = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/volunteer-report"
      );
      const data = await response.json();

      if (response.ok) {
        setVolunteerReport(data);
      } else {
        setError(data.message || "Failed to fetch the volunteer report.");
      }
    } catch (err) {
      console.error("Error fetching volunteer report:", err);
      setError("An error occurred while fetching the report.");
    } finally {
      setLoading(false);
    }
  };

  const fetchEventReport = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/event-report");
      const data = await response.json();

      if (response.ok) {
        setEventReport(data);
      } else {
        setError(data.message || "Failed to fetch the event report.");
      }
    } catch (err) {
      console.error("Error fetching event report:", err);
      setError("An error occurred while fetching the report.");
    } finally {
      setLoading(false);
    }
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const currentVolunteerRows = volunteerReport.slice(
    indexOfFirstRow,
    indexOfLastRow
  );
  const currentEventRows = eventReport.slice(indexOfFirstRow, indexOfLastRow);

  const totalPagesVolunteer = Math.ceil(volunteerReport.length / rowsPerPage);
  const totalPagesEvent = Math.ceil(eventReport.length / rowsPerPage);

  const handleNextPage = () => {
    if (activeTab === "volunteer" && currentPage < totalPagesVolunteer) {
      setCurrentPage((prev) => prev + 1);
    }
    if (activeTab === "event" && currentPage < totalPagesEvent) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const generatePDF = (data, reportType) => {
    const doc = new jsPDF();
    doc.text(`${reportType} Report`, 20, 10);

    const headers =
      reportType === "Volunteer"
        ? ["Username", "Name", "Event Name", "Location", "Event Date"]
        : [
            "Event Name",
            "Location",
            "Date",
            "Urgency",
            "Description",
            "Volunteer Name",
            "Volunteer Username",
          ];

    const rows =
      reportType === "Volunteer"
        ? data.flatMap((volunteer) =>
            volunteer.events.map((event) => [
              volunteer.username,
              volunteer.fullname,
              event.eventname,
              event.eventlocation,
              new Date(event.date).toLocaleDateString(),
            ])
          )
        : data.flatMap((event) =>
            event.volunteers.map((volunteer) => [
              event.eventname,
              event.eventlocation,
              new Date(event.date).toLocaleDateString(),
              event.urgency,
              event.description,
              volunteer.fullname,
              volunteer.username,
            ])
          );

    doc.autoTable({
      head: [headers],
      body: rows,
    });

    doc.save(`${reportType.toLowerCase()}-report.pdf`);
  };

  return (
    <div className="reports">
      <div className="reportsContainer">
        <div className="reportTabs">
          <p onClick={() => handleTabClick("volunteer")}>Volunteer Reports</p>
          <p onClick={() => handleTabClick("event")}>Event Reports</p>
        </div>
        <div className="reportContent">
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {!loading && !error && activeTab === "volunteer" && (
            <div className="volunteerReport">
              <div className="downloadHeader">
                <CSVLink
                  data={volunteerReport}
                  headers={[
                    { label: "Username", key: "username" },
                    { label: "Name", key: "fullname" },
                    { label: "Event Name", key: "events[0].eventname" },
                    { label: "Location", key: "events[0].eventlocation" },
                    { label: "Event Date", key: "events[0].date" },
                  ]}
                  filename="volunteer-report.csv"
                  className="csvButton"
                >
                  <button className="volunteerCSV">
                    Export Volunteer Report to CSV
                  </button>
                </CSVLink>
                <button
                  className="volunteerPDF"
                  onClick={() => generatePDF(volunteerReport, "Volunteer")}
                >
                  Export Volunteer Report to PDF
                </button>
              </div>
              <div className="volunteerReportTableContainer">
                <table className="volunteerTable">
                  <thead>
                    <tr>
                      <th>Username</th>
                      <th>Name</th>
                      <th>Event Name</th>
                      <th>Location</th>
                      <th>Event Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentVolunteerRows.map((volunteer, index) => (
                      <React.Fragment key={index}>
                        {volunteer.events.length > 0 ? (
                          volunteer.events.map((event, eventIndex) => (
                            <tr key={eventIndex}>
                              {eventIndex === 0 && (
                                <>
                                  <td rowSpan={volunteer.events.length}>
                                    {volunteer.username}
                                  </td>
                                  <td rowSpan={volunteer.events.length}>
                                    {volunteer.fullname}
                                  </td>
                                </>
                              )}
                              <td>{event.eventname}</td>
                              <td>{event.eventlocation}</td>
                              <td>
                                {new Date(event.date).toLocaleDateString()}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="5">No Events</td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="reportsPagination">
                <button
                  className="previousButton"
                  disabled={currentPage === 1}
                  onClick={handlePreviousPage}
                >
                  <RxTriangleLeft />
                </button>
                <span className="pageNumber"> {currentPage}</span>
                <button
                  className="nextButton"
                  disabled={currentPage === totalPagesEvent}
                  onClick={handleNextPage}
                >
                  <RxTriangleRight />
                </button>
              </div>
            </div>
          )}
          {!loading && !error && activeTab === "event" && (
            <div className="eventReports">
              <div className="eventReportsContainer">
                <div className="downloadHeader">
                  <CSVLink
                    data={eventReport}
                    headers={[
                      { label: "Event Name", key: "eventname" },
                      { label: "Location", key: "eventlocation" },
                      { label: "Date", key: "date" },
                      { label: "Urgency", key: "urgency" },
                      { label: "Description", key: "description" },
                      {
                        label: "Volunteer Name",
                        key: "volunteers[0].fullname",
                      },
                      {
                        label: "Volunteer Username",
                        key: "volunteers[0].username",
                      },
                    ]}
                    filename="event-report.csv"
                    className="csvButton"
                  >
                    <button className="eventsCSV">
                      Export Event Report to CSV
                    </button>
                  </CSVLink>
                  <button
                    className="eventsPDF"
                    onClick={() => generatePDF(eventReport, "Event")}
                  >
                    Export Event Report to PDF
                  </button>
                </div>
                <table className="eventTable">
                  <thead>
                    <tr>
                      <th>Event Name</th>
                      <th>Location</th>
                      <th>Date</th>
                      <th>Urgency</th>
                      <th>Description</th>
                      <th>Volunteer Name</th>
                      <th>Volunteer Username</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentEventRows.map((event, index) => (
                      <React.Fragment key={index}>
                        {event.volunteers.length > 0 ? (
                          event.volunteers.map((volunteer, volunteerIndex) => (
                            <tr key={`${index}-${volunteerIndex}`}>
                              {volunteerIndex === 0 && (
                                <>
                                  <td rowSpan={event.volunteers.length}>
                                    {event.eventname}
                                  </td>
                                  <td rowSpan={event.volunteers.length}>
                                    {event.eventlocation}
                                  </td>
                                  <td rowSpan={event.volunteers.length}>
                                    {new Date(event.date).toLocaleDateString()}
                                  </td>
                                  <td rowSpan={event.volunteers.length}>
                                    {event.urgency}
                                  </td>
                                  <td rowSpan={event.volunteers.length}>
                                    {event.description}
                                  </td>
                                </>
                              )}
                              <td>{volunteer.fullname}</td>
                              <td>{volunteer.username}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td>{event.eventname}</td>
                            <td>{event.eventlocation}</td>
                            <td>{new Date(event.date).toLocaleDateString()}</td>
                            <td>{event.urgency}</td>
                            <td>{event.description}</td>
                            <td colSpan="2">No volunteers</td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="reportsPagination">
                <button
                  className="previousButton"
                  disabled={currentPage === 1}
                  onClick={handlePreviousPage}
                >
                  <RxTriangleLeft />
                </button>
                <span className="pageNumber"> {currentPage}</span>
                <button
                  className="nextButton"
                  disabled={currentPage === totalPagesEvent}
                  onClick={handleNextPage}
                >
                  <RxTriangleRight />
                </button>
              </div>
            </div>
          )}
          {!loading && !error && activeTab === null && (
            <div className="placeholderContainer">
              Select a report to view its details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;

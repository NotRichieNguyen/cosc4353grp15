import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import "./eventManagement.css";

const EventManagement = () => {
  const [formData, setFormData] = useState({
    eventName: "",
    eventLocation: "",
    eventRequiredSkills: "",
    eventUrgency: "",
    eventDate: "",
    eventDescription: "",
  });

  const [matchedEvent, setMatchedEvent] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage(null);

    try {
      const response = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventname: formData.eventName,
          eventlocation: formData.eventLocation,
          eventskills: formData.eventRequiredSkills,
          urgency: formData.eventUrgency,
          date: formData.eventDate,
          description: formData.eventDescription,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        if (result.message === "Event already exists") {
          setMatchedEvent(result.event);
          setStatusMessage("Event already exists.");
        } else {
          setStatusMessage("New event created successfully!");
          setMatchedEvent(result.event);
        }

        setFormData({
          eventName: "",
          eventLocation: "",
          eventRequiredSkills: "",
          eventUrgency: "",
          eventDate: "",
          eventDescription: "",
        });
      } else {
        setStatusMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatusMessage("Failed to submit. Please try again.");
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage(null);
    console.log(editFormData);
    try {
      const response = await fetch(
        `http://localhost:5000/api/events/update/${matchedEvent.eventname}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editFormData),
        }
      );

      const result = await response.json();
      console.log(result);
      if (response.ok) {
        setMatchedEvent(result.updatedEvent);
        setIsEditing(false);
        setStatusMessage("Event updated successfully!");
      } else {
        setStatusMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error updating event:", error);
      setStatusMessage("Failed to update event. Please try again.");
    }
  };

  const handleExitEdit = () => {
    setIsEditing(false);
  };

  return (
    <div className="eventmanagement">
      <div className="em_container">
        <div className="formContainer">
          <div className="formHeader"> Create or Search for an Event! </div>
          <form onSubmit={handleSubmit}>
            <div className="eventName">
              <input
                type="text"
                id="eventName"
                name="eventName"
                maxLength={100}
                placeholder="Event Name"
                required
                value={formData.eventName}
                onChange={handleChange}
              />
            </div>

            <div className="eventDetails">
              <input
                className="eventLocation"
                type="text"
                id="eventLocation"
                name="eventLocation"
                placeholder="Event Location"
                required
                value={formData.eventLocation}
                onChange={handleChange}
              />
              <select
                name="eventRequiredSkills"
                id="eventRequiredSkills"
                required
                value={formData.eventRequiredSkills}
                onChange={handleChange}
              >
                <option value="">Event Skills</option>
                <option value="Communication">Communication</option>
                <option value="Leadership">Leadership</option>
                <option value="Organization">Organization</option>
                <option value="Time Management">Time Management</option>
                <option value="Problem Solving">Problem Solving</option>
                <option value="Teamwork">Teamwork</option>
                <option value="Event Planning">Event Planning</option>
                <option value="Customer Service">Customer Service</option>
                <option value="First Aid/CPR">First Aid/CPR</option>
                <option value="Fundraising">Fundraising</option>
                <option value="Marketing/Social Media">
                  Marketing/Social Media
                </option>
                <option value="Budgeting">Budgeting</option>
                <option value="Multitasking">Multitasking</option>
                <option value="Tech Skills">Tech Skills</option>
              </select>
              <select
                name="eventUrgency"
                id="eventUrgency"
                required
                value={formData.eventUrgency}
                onChange={handleChange}
              >
                <option value="">Urgency</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <input
                type="date"
                id="eventDate"
                name="eventDate"
                required
                value={formData.eventDate}
                onChange={handleChange}
              />
            </div>

            <div className="eventDescription">
              <textarea
                className="descriptionBox"
                id="eventDescription"
                name="eventDescription"
                placeholder="Event Description"
                cols="30"
                rows="10"
                required
                value={formData.eventDescription}
                onChange={handleChange}
              />
            </div>

            <div className="em-submit">
              <button className="button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                  ></path>
                </svg>
                <div className="text">Submit</div>
              </button>
            </div>
          </form>
        </div>
      </div>
      {matchedEvent && !isEditing && (
        <div className="em_container" key={matchedEvent.id}>
          <div className="formContainer">
            <div className="me_header">
              <div className="header_title"> Manage Event </div>
              <button className="edit_button" onClick={handleEditClick}>
                <MdEdit />
              </button>
            </div>
            <div className="eventName">
              <input type="text" value={matchedEvent.eventname} readonly />
            </div>

            <div className="eventDetails">
              <input
                className="eventLocation"
                name="Event Location"
                type="text"
                value={matchedEvent.eventlocation}
                readonly
              />
              <input
                className="eventLocation"
                name="Event Skills"
                type="text"
                value={matchedEvent.eventskills}
                readonly
              />
              <input
                className="eventLocation"
                name="Event Urgency"
                type="text"
                value={matchedEvent.urgency}
                readonly
              />
              <input
                className="eventDate"
                name="Event Date"
                type="text"
                value={matchedEvent.date.slice(0, 10)}
                readonly
              />
            </div>

            <div className="eventDescription">
              <textarea
                className="descriptionBox"
                name="Event Description"
                placeholder="Event Description"
                cols="30"
                rows="10"
                readonly
                value={matchedEvent.description}
              />
            </div>
          </div>
        </div>
      )}

      {isEditing && (
        <div className="em_container">
          <div className="formContainer">
            <div className="formEditHeader">
              <div className="header_title">Edit Event</div>
              <button className="exitButton" onClick={handleExitEdit}></button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="eventName">
                <input type="text" value={matchedEvent.eventname} readonly />
              </div>

              <div className="eventDetails">
                <input
                  className="eventLocation"
                  name="eventlocation"
                  id="eventlocation"
                  type="text"
                  onChange={handleEditChange}
                  value={editFormData.eventLocation}
                />
                <select
                  className="eventLocation"
                  name="eventskills"
                  id="eventskills"
                  type="text"
                  onChange={handleEditChange}
                  value={editFormData.eventskills}
                >
                  <option value="">Event Skills</option>
                  <option value="Communication">Communication</option>
                  <option value="Leadership">Leadership</option>
                  <option value="Organization">Organization</option>
                  <option value="Time Management">Time Management</option>
                  <option value="Problem Solving">Problem Solving</option>
                  <option value="Teamwork">Teamwork</option>
                  <option value="Event Planning">Event Planning</option>
                  <option value="Customer Service">Customer Service</option>
                  <option value="First Aid/CPR">First Aid/CPR</option>
                  <option value="Fundraising">Fundraising</option>
                  <option value="Marketing/Social Media">
                    Marketing/Social Media
                  </option>
                  <option value="Budgeting">Budgeting</option>
                  <option value="Multitasking">Multitasking</option>
                  <option value="Tech Skills">Tech Skills</option>
                </select>
                <select
                  className="eventLocation"
                  name="urgency"
                  id="urgency"
                  type="text"
                  onChange={handleEditChange}
                  value={editFormData.eventUrgency}
                >
                  <option value="">Urgency</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>

                <input
                  className="eventDate"
                  name="date"
                  id="date"
                  type="date"
                  onChange={handleEditChange}
                  value={editFormData.eventDate}
                />
              </div>

              <div className="eventDescription">
                <textarea
                  className="descriptionBox"
                  name="description"
                  id="description"
                  placeholder="Event Description"
                  cols="30"
                  rows="10"
                  onChange={handleEditChange}
                  value={editFormData.description}
                />
              </div>
              <div className="editButtons">
                <div className="em-submit">
                  <button className="button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                      ></path>
                    </svg>
                    <div className="text">Save</div>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventManagement;

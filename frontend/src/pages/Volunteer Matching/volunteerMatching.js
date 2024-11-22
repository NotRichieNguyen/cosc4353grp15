import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import "./volunteerMatching.css";
import "../Event Management/eventManagement.css";

const VolunteerMatching = () => {
  const userID = localStorage.getItem("id");

  const [formData, setFormData] = useState({
    volunteerName: "",
    volunteerSkills: [],
    volunteerAvailability: "",
  });

  const [matchingEvents, setMatchingEvents] = useState([]);
  const [showThankYou, setShowThankYou] = useState(false);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setFormData((prevData) => ({
        ...prevData,
        volunteerSkills: [...prevData.volunteerSkills, value],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        volunteerSkills: prevData.volunteerSkills.filter(
          (skill) => skill !== value
        ),
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/volunteers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setMatchingEvents(result.events);
      } else {
        alert(result.message);
        setMatchingEvents([]);
      }

      setFormData({
        volunteerName: "",
        volunteerSkills: [],
        volunteerAvailability: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleCheckClick = async (eventId) => {
    const userId = localStorage.getItem("id");
    try {
      const response = await fetch(
        "http://localhost:5000/api/volunteer-matching",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, eventId }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert("Thank you for registering!");
        window.location.reload();
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error registering for event:", error);
      alert("Failed to register. Please try again.");
    }
  };

  return (
    <div className="volunteerMatching">
      <div className="vm_container">
        <div className="formContainer">
          <div className="formHeader">Volunteer Matching</div>
          <form onSubmit={handleSubmit}>
            <div className="volunteerInfo">
              <input
                className="volunteerName"
                type="text"
                id="volunteerName"
                name="volunteerName"
                placeholder="Volunteer Name"
                value={formData.volunteerName}
                onChange={handleInputChange}
                required
              />

              <div className="checkboxTitle">
                <p>Select All That Apply.</p>
              </div>

              <div className="checkboxGroup">
                <div className="groupone">
                  {[
                    "Communcation",
                    "Leadership",
                    "Organization",
                    "Time Management",
                    "Problem Solving",
                    "Teamwork",
                    "Event Planning",
                  ].map((skill) => (
                    <label key={skill}>
                      <input
                        type="checkbox"
                        name="volunteerSkills"
                        value={skill}
                        onChange={handleCheckboxChange}
                        checked={formData.volunteerSkills.includes(skill)}
                      />
                      {skill}
                    </label>
                  ))}
                </div>

                <div className="grouptwo">
                  {[
                    "Customer Service",
                    "First Aid/CPR",
                    "Fundraising",
                    "Marketing/Social Media",
                    "Budgeting",
                    "Multitasking",
                    "Tech Skills",
                  ].map((skill) => (
                    <label key={skill}>
                      <input
                        type="checkbox"
                        name="volunteerSkills"
                        value={skill}
                        onChange={handleCheckboxChange}
                        checked={formData.volunteerSkills.includes(skill)}
                      />
                      {skill}
                    </label>
                  ))}
                </div>
              </div>

              <div className="availabilityCalendar">
                <div className="availabilityTitle">
                  Select What Day You Are Available!
                </div>
                <input
                  type="date"
                  name="volunteerAvailability"
                  value={formData.volunteerAvailability}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="em-submit">
              <button type="submit" className="button">
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
      {matchingEvents.length > 0 && (
        <div className="matchingEvents_container">
          <div className="matchingEvents_title"> Events For You! </div>
          <p className="matchingEvents_disclaimer">
            Click The Check to Register!
          </p>
          <ul className="matchingEvents_list">
            {matchingEvents.map((event) => (
              <li key={event.id}>
                <strong>{event.eventname}</strong> - {event.eventlocation} -{" "}
                {new Date(event.date).toLocaleDateString()} -{" "}
                {event.description}
                <button
                  className="eventSignUp_button"
                  onClick={() => handleCheckClick(event._id)}
                >
                  <FaCheck />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default VolunteerMatching;

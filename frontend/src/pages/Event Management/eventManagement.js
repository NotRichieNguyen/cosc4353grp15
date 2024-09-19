import React from "react";
import "./eventManagement.css";

const EventManagement = () => {

  return (
    <div className="eventmanagement">
      <div className="em_container">
        <div className="formContainer">
          <div className="formHeader"> Event Management </div>
          <form>
            <div className="eventName">
              <input type="text" id="eventName" name="eventName" maxLength={100} placeholder="Event Name" required/> 
            </div>

            <div className="eventDetails">
              <input className="eventLocation" type="text" id="eventLocation" name="eventLocation" placeholder="Event Location" required/>
              <select name="eventRequiredSkills" id="eventRequiredSkills" required>
                <option value=""> Event Skills </option>
                <option value="communication">Communication</option>
                <option value="leadership">Leadership</option>
                <option value="organization">Organization</option>
                <option value="time_management">Time Management</option>
                <option value="problem_solving">Problem Solving</option>
                <option value="teamwork">Teamwork</option>
                <option value="event_planning">Event Planning</option>
                <option value="customer_service"> Customer Service</option>
                <option value="first_aidcpr"> First Aid/CPR </option>
                <option value="fundraising"> Fundraising </option>
                <option value="marketing_socialmedia"> Marketing/Social Media </option>
                <option value="budgeting"> Budgeting </option>
                <option value="multitasking"> Multitasking </option>
                <option value="techskills"> Tech Skills </option>
              </select>
              <select name="eventUrgency" id="eventUrgency" required>
                <option value=""> Uregency </option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <input type="date" id="eventDate" name="eventDate" placeholder="Event Date" required/>
            </div>

            <div className="eventDescription">
              <textarea className="descriptionBox" type="text" id="eventDescription" name="eventDescription" placeholder="Event Description" cols="30" rows="10" required/>
            </div>

            <div className="em-submit">
              <button class="button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                  ></path>
                </svg>
                <div class="text">Submit</div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventManagement;

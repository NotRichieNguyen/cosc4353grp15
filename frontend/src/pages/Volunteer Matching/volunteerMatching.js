import React from "react";
import './volunteerMatching.css';
import '../Event Management/eventManagement.css'

const VolunteerMatching = () => {
  return (
    <div className="volunteerMatching">
      <div className="vm_container">
        <div className="formContainer">
          <div className="formHeader">Volunteer Matching</div>
            <form>
              <div className="volunteerInfo"> 
                <input className="volunteerName" type="text" id="volunteerName" name="volunteerName" placeholder="Volunteer Name" required/> 
                <input type="text" id="volunteerEvent" name="volunteerEvent" placeholder="Matched Event" required/> 
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

export default VolunteerMatching;

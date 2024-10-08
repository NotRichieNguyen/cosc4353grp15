import React from "react";
import "./profile.css";

const ProfileManagement = () => {
  return (
    <div className="profile-management">
      <div className="pm-container">
        <div className="form-container">
          <form>
            <div className="form-header">
              <h1>User Profile</h1>
            </div>
            <div className="container">
              <div className="profile-details">
                <p>
                  <h2 className="profile-title">Profile Details</h2>
                </p>
                <p>
                  <input
                    className="profile-input"
                    type="text"
                    name="fullname"
                    id="fullname"
                    placeholder="Full Name"
                    maxlength="50"
                    required
                  />
                </p>
                <p>
                  <input
                    className="profile-input"
                    type="text"
                    name="address1"
                    id="address1"
                    placeholder="Address 1"
                    maxlength="100"
                    required
                  />
                </p>
                <p>
                  <input
                    className="profile-input"
                    type="text"
                    name="address2"
                    id="address2"
                    placeholder="Address 2"
                    maxlength="100"
                  />
                </p>
                <p>
                  <input
                    className="profile-input"
                    type="text"
                    name="city"
                    id="city"
                    placeholder="City"
                    maxlength="100"
                    required
                  />
                </p>
                <p>
                  <select
                    className="profile-input"
                    name="state"
                    id="state"
                    required
                  >
                    <option value="" disabled selected>
                      State
                    </option>
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                  </select>
                </p>
                <p>
                  <input
                    className="profile-input"
                    type="text"
                    name="zipcode"
                    id="zipcode"
                    placeholder="Zip Code"
                    minlength="5"
                    maxlength="10"
                    pattern="\d{5,5}(-\d{4,4})?"
                    required
                  />
                </p>
                <p>
                  <select
                    className="profile-input"
                    name="skills"
                    id="skills"
                    multiple
                    required
                  >
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
                    <option value="marketing_socialmedia">
                      {" "}
                      Marketing/Social Media{" "}
                    </option>
                    <option value="budgeting"> Budgeting </option>
                    <option value="multitasking"> Multitasking </option>
                    <option value="techskills"> Tech Skills </option>
                  </select>
                </p>
                <p>
                  <textarea
                    className="profile-input"
                    rows="5"
                    cols="50"
                    name="preferences"
                    id="preferences"
                    placeholder="Preferences"
                  ></textarea>
                </p>
                <p>
                  <input
                    className="profile-input"
                    type="date"
                    name="date-selector"
                    id="date-selector"
                  />
                </p>
                <p>
                  <textarea
                    className="profile-input"
                    rows="5"
                    cols="50"
                    name="date-string"
                    id="date-string"
                    placeholder="Dates Available"
                    required
                  ></textarea>
                </p>
                <div className="profile-submit">
                  <button class="button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
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
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
/*
const dateSelector = document.getElementById("date-selector");
const dateString = document.getElementById("date-string");

dateSelector.addEventListener("change", function () {
  if (!this.value) {
    return;
  }

  const selectedDateParts = this.value.split("-");
  const selectedDate = new Date(
    Date.UTC(
      selectedDateParts[0],
      selectedDateParts[1] - 1,
      selectedDateParts[2]
    )
  );
  const formattedDate = `${(selectedDate.getUTCMonth() + 1)
    .toString()
    .padStart(2, "0")}/${selectedDate
    .getUTCDate()
    .toString()
    .padStart(2, "0")}/${selectedDate.getUTCFullYear()}`;

  if (dateString.value) {
    dateString.value += ", " + formattedDate;
  } else {
    dateString.value = formattedDate;
  }
});
*/
export default ProfileManagement;

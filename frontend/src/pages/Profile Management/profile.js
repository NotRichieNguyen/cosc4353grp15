import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

import "./profile.css";

const ProfileManagement = () => {
  const navigate = useNavigate();

  const handleVHRedirect = () => {
    navigate("/volunteer-history");
  };

  const handleVMRedirect = () => {
    navigate("/volunteer-matching");
  };

  const [profile, setProfile] = useState({
    fullname: "",
    username: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipcode: "",
    skills: [],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [eventCount, setEventCount] = useState(0);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:5000/api/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (response.ok) {
          setProfile(data);
        } else if (response.status === 404) {
          setError(null);
        } else {
          setError(data.message || "Failed to fetch profile.");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("An error occurred while fetching profile.");
      }
    };

    const fetchEventCount = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/user-events-count",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setEventCount(data.totalEvents);
        } else {
          setEventCount(0);
        }
      } catch (err) {
        console.error("Error fetching event count:", err);
      }
    };

    fetchProfile();
    fetchEventCount();
  }, []);

  const handleEditClick = () => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
  };

  const handleSaveClick = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/profile", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      });

      const data = await response.json();

      if (response.ok) {
        setProfile(data.profile);
        setIsEditing(false);
        alert("Profile updated successfully!");
      } else {
        alert(data.message || "Failed to update profile.");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("An error occurred while updating the profile.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSkillChange = (e) => {
    const { value, checked } = e.target;

    setProfile((prevProfile) => ({
      ...prevProfile,
      skills: checked
        ? [...prevProfile.skills, value]
        : prevProfile.skills.filter((skill) => skill !== value),
    }));
  };

  return (
    <div className="profileManagement">
      <div className="profileContainer">
        <div className="profileHeaderContainer">
          <p className="profileTitle"> User Profile</p>
          <p className="profileEditIcon" onClick={handleEditClick}>
            {" "}
            <FaEdit />
          </p>
        </div>
        <div className="profileContentsContainer">
          <div className="leftContainer">
            <div className="topContainer">
              <div className="pictureContainer"></div>
              {isEditing ? (
                <input
                  type="text"
                  name="fullname"
                  value={profile.fullname}
                  onChange={handleChange}
                  className="editableNameInput"
                  placeholder="Enter Full Name"
                />
              ) : (
                <div className="name"> {profile.fullname || ""} </div>
              )}
            </div>
            <div className="bottomContainer">
              <div className="usernameContainer">
                <div className="longBox">
                  <p className="title"> Username </p>
                  <p className="label"> {profile.username} </p>
                </div>
              </div>
              <div className="addressContainer">
                <div className="longBox">
                  <p className="title">Address</p>
                  {isEditing ? (
                    <input
                      type="text"
                      name="address1"
                      value={profile.address1}
                      onChange={handleChange}
                      className="editableInput"
                      placeholder="Enter Address"
                    />
                  ) : (
                    <p className="label"> {profile.address1 || ""} </p>
                  )}
                </div>
              </div>
              <div className="addressContainer2">
                <div className="longBox">
                  <p className="title">Address 2 (Optional)</p>
                  {isEditing ? (
                    <input
                      type="text"
                      name="address2"
                      value={profile.address2}
                      onChange={handleChange}
                      className="editableInput"
                      placeholder="Enter Address 2 (Optional)"
                    />
                  ) : (
                    <p className="label"> {profile.address2 || ""} </p>
                  )}
                </div>
              </div>
              <div className="cityStateContainer">
                <div className="cityContainer">
                  <div className="shortBox">
                    <p className="title"> City </p>
                    {isEditing ? (
                      <input
                        type="text"
                        name="city"
                        value={profile.city}
                        onChange={handleChange}
                        className="editableCityInput"
                        placeholder="Enter City"
                      />
                    ) : (
                      <p className="label"> {profile.city || ""} </p>
                    )}
                  </div>
                </div>
                <div className="stateContainer">
                  <div className="smallBox">
                    <p className="title">State</p>
                    {isEditing ? (
                      <select
                        name="state"
                        value={profile.state}
                        onChange={handleChange}
                        className="editableSelect"
                      >
                        <option value="">Select</option>
                        {[
                          "AL",
                          "AK",
                          "AZ",
                          "AR",
                          "CA",
                          "CO",
                          "CT",
                          "DE",
                          "FL",
                          "GA",
                          "HI",
                          "ID",
                          "IL",
                          "IN",
                          "IA",
                          "KS",
                          "KY",
                          "LA",
                          "ME",
                          "MD",
                          "MA",
                          "MI",
                          "MN",
                          "MS",
                          "MO",
                          "MT",
                          "NE",
                          "NV",
                          "NH",
                          "NJ",
                          "NM",
                          "NY",
                          "NC",
                          "ND",
                          "OH",
                          "OK",
                          "OR",
                          "PA",
                          "RI",
                          "SC",
                          "SD",
                          "TN",
                          "TX",
                          "UT",
                          "VT",
                          "VA",
                          "WA",
                          "WV",
                          "WI",
                          "WY",
                        ].map((abbr) => (
                          <option key={abbr} value={abbr}>
                            {abbr}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <p className="label"> {profile.state || ""} </p>
                    )}
                  </div>
                </div>
                <div className="zipCodeContainer">
                  <div className="shortBox">
                    <p className="title"> Zip Code </p>
                    {isEditing ? (
                      <input
                        type="text"
                        name="zipcode"
                        value={profile.zipcode}
                        onChange={handleChange}
                        className="editableZipInput"
                        placeholder="Enter Zip Code"
                      />
                    ) : (
                      <p className="label"> {profile.zipcode || ""} </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="rightContainers">
            <div className="rightTopContainers">
              <div className="topContainer1">
                <div className="tc1_header">Your Events</div>
                <div className="eventNumberContainer"> {eventCount} </div>
                <div className="tc2_footer">
                  <button className="gotovh_button" onClick={handleVHRedirect}>
                    View History
                  </button>
                </div>
              </div>
              <div className="topContainer2">
                <div className="tc1_header"> Events Today </div>
                <div className="eventNumberContainer"> 1 </div>
                <div className="tc2_footer">
                  <button className="gotovh_button" onClick={handleVMRedirect}>
                    Go To Register
                  </button>
                </div>
              </div>
            </div>
            <div className="rightBottomContainer">
              <div className="headerContainer">
                <div className="headerTitle">Your Skills</div>
                <div className="editIconContainer"></div>
              </div>
              <div className="skillsContainer">
                <div className="group1">
                  <div className="skillsList1">
                    {[
                      "Communication",
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
                          checked={profile.skills.includes(skill)}
                          disabled={!isEditing}
                          onChange={handleSkillChange}
                        />
                        {skill}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="group2">
                  <div className="skillsList2">
                    {[
                      "Customer Service",
                      "First Aid/CPR",
                      "Fundraising",
                      "Marketing/Social",
                      "Budgeting",
                      "Multitasking",
                      "Tech Skills",
                    ].map((skill) => (
                      <label key={skill}>
                        <input
                          type="checkbox"
                          name="volunteerSkills"
                          value={skill}
                          checked={profile.skills.includes(skill)}
                          disabled={!isEditing}
                          onChange={handleSkillChange}
                        />
                        {skill}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {isEditing && (
              <div className="saveButtonContainer">
                <button className="saveButton" onClick={handleSaveClick}>
                  Save
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileManagement;

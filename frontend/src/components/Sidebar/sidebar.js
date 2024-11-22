import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  return (
    <div className="sidebar">
      <div className="sidebarContents">
        <div className="websiteNameContainer">
          <p className="university"> UNIVERSITY OF HOUSTON </p>
          <Link className="volunteering" to="/">
            volunteering
          </Link>
        </div>

        <li className="sidebarLinks">
          <Link to="/event-matching"> Event Matching </Link>
          <Link to="/volunteer-matching"> Volunteer Matching </Link>
          <Link to="/volunteer-history"> Volunteer History </Link>
        </li>

        <div className="profileContainer">
          <Link to="/profile">
            <div className="profilePictureContainer">
              <div className="profilePicture"></div>
            </div>
            <div className="profileName"> Wilson Huang </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

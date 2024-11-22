import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

const Header = () => {
  // Check if the user is logged in
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <header>
      <li>
        <div className="navbarWebsiteName">
          <p className="nav_university"> UNIVERSITY OF HOUSTON </p>
          <Link className="nav_volunteering" to="/">
            {" "}
            volunteering{" "}
          </Link>
        </div>
      </li>

      <nav>
        <ul>
          <li className="navLinks">
            {!isLoggedIn && (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
            )}
            {isLoggedIn && (
              <>
                <Link to="/profile">Profile</Link>
                <Link to="/event-matching">Event Management</Link>
                <Link to="/volunteer-matching">Volunteer Matching</Link>
                <Link to="/volunteer-history">Volunteer History</Link>
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                  }}
                  className="logout-button"
                >
                  Logout
                </button>
              </>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

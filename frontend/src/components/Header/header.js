import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

const Header = () => {
  // Check if the user is logged in
  const isLoggedIn = !!localStorage.getItem("token");
  console.log(localStorage.getItem("token"));
  const isAdmin = localStorage.getItem("admin") === "true";
  console.log(isAdmin);

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
            {isLoggedIn && !isAdmin && (
              <>
                <Link to="/profile">Profile</Link>
                <Link to="/volunteer-matching">Volunteer Matching</Link>
                <Link to="/volunteer-history">Volunteer History</Link>
                <Link
                  to="/login"
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                  }}
                  className="logout-button"
                >
                  Logout
                </Link>
              </>
            )}
            {isLoggedIn && isAdmin && (
              <>
                <Link to="/event-matching">Event Management </Link>
                <Link to="/reports"> Reports </Link>
                <Link
                  to="/login"
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                  }}
                  className="logout-button"
                >
                  Logout
                </Link>
              </>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

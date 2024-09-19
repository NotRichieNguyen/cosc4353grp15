import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <li>
        {" "}
        <Link to="/"> volunteering </Link>{" "}
      </li>

      <nav>
        <ul>
          <li className="navLinks">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/event-matching"> Event Management </Link>
            <Link to="/volunteer-matching"> Volunteer Matching </Link>
            <Link to="/volunteer-history"> Volunteer History </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

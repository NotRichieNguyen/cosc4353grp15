import React from "react";
import volunteeringPicture from "../../assets/volunteering uh.jpg";
import "./home.css";

const Home = () => {
  return (
    <div className="homepagePicContainer">
      <img
        className="homepagePicture"
        src={volunteeringPicture}
        alt="volunteeringPicture"
      />
      <div className="homepageSloganContainer">
        <div className="sloganTop"> UNIVERSITY OF HOUSTON </div>
        <div className="sloganBottom"> TOGETHER WE THRIVE </div>
        <button
          className="loginButton"
          onClick={() => {
            window.location.href = "/login";
          }}
        >
          {" "}
          LOGIN{" "}
        </button>
      </div>
    </div>
  );
};

export default Home;

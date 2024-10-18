import React from "react";
import "./register.css";

const Register = () => {
  return (
    <>
      <div className="register-root">
        <div className="register-container">
          <div className="register-header">Sign up</div>
          <input
            placeholder="Username"
            type="text"
            class="email"
            className="register-username"
          />
          <input
            placeholder="Password"
            type="text"
            class="email"
            className="register-password"
          />
          <div className="register-no-account">
            <div>Already Have an Account?</div>
            <div style={{ textDecoration: "underline", cursor: "pointer" }}>
              Log in here
            </div>
          </div>
          <div className="register-submit">
            <button className="button">
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
        </div>
      </div>
    </>
  );
};

export default Register;

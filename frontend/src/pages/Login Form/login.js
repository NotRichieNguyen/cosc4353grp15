import React, { useState } from "react";
import "./login.css";

const Login = () => {
  return (
    <>
      <div className="login-root">
        <div className="login-container">
          <div className="login-header">Sign in</div>
          <input
            placeholder="Username"
            type="text"
            class="email"
            className="login-username"
          />
          <input
            placeholder="Password"
            type="text"
            class="email"
            className="login-password"
          />
          <div className="login-no-account">
            <div>Don't Have an Account?</div>
            <div style={{ textDecoration: "underline", cursor: "pointer" }}>
              Register here
            </div>
          </div>
          <div className="login-submit">
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

export default Login;

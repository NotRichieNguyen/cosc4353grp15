import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username || !password) {
      setError("Both fields are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message);
        return;
      }

      alert("Registration successful! You can now log in.");
      navigate("/"); // Redirect to login page after registration
    } catch (error) {
      setError("An error occurred while registering.");
    }
  };
  
  return (
    <div className="register-root">
      <div className="register-container">
        <div className="register-header">Sign up</div>
        <input
          placeholder="Username"
          type="text"
          className="register-username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          className="register-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div style={{ color: "red" }}>{error}</div>}
        <div className="register-submit">
          <button className="button" onClick={handleRegister}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;

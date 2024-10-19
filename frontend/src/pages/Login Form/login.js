import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      navigate("/profile"); // Redirect to profile on successful login
    } else {
      const data = await response.json();
      setError(data.message);
    }
  };

  return (
    <div className="login-root">
      <div className="login-container">
        <div className="login-header">Sign in</div>
        <input
          placeholder="Username"
          type="text"
          className="login-username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          className="login-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <div style={{ color: "red" }}>{error}</div>}
        <div className="login-submit">
          <button className="button" onClick={handleLogin}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

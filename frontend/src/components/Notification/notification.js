import React, { useEffect, useState } from "react";
import "./notification.css"; // Import the CSS file for styling

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token used for fetch:", token);
  
        const response = await fetch("http://localhost:5000/api/notifications", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        console.log("Response status:", response.status);
  
        if (!response.ok) {
          const errorMessage = `Error: ${response.status} ${response.statusText}`;
          throw new Error(errorMessage);
        }
  
        const data = await response.json();
        setNotifications(data);
      } catch (err) {
        console.error("Error fetching notifications:", err);
        setError(err.message);
      }
    };
  
    fetchNotifications();
  }, []);

  if (error) {
    return <div className="notification-error">Error: {error}</div>;
  }

  return (
    <div className="notification-container">
      <h1>Notifications</h1>
      {notifications.length > 0 ? (
        <ul>
          {notifications.map((notification) => (
            <li key={notification._id} className="notification-item">
              <h3>{notification.title}</h3>
              <p>{notification.message}</p>
              {notification.eventName && (
                <p>
                  <strong>Event:</strong> {notification.eventName}
                </p>
              )}
              {notification.eventDescription && (
                <p>{notification.eventDescription}</p>
              )}
              {notification.eventDate && (
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(notification.eventDate).toLocaleString()}
                </p>
              )}
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(notification.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No notifications available.</p>
      )}
    </div>
  );
};

export default Notification;

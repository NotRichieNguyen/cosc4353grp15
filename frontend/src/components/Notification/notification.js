import React, { useEffect, useState } from 'react';
import "./notification.css";

const Notification = () => {
    const [notifications, setNotifications] = useState([]);

    // Fetch notifications from backend on load
    useEffect(() => {
        fetch("http://localhost:5000/api/notifications")
            .then((response) => response.json())
            .then((data) => setNotifications(data))
            .catch((error) => console.error("Error fetching notifications:", error));
    }, []);

    // Function to show new notification (for demo purposes)
    const showNotification = (type) => {
        const newNotification = {
            id: new Date().getTime(), // Unique ID based on timestamp
            type: type,
            content: getNotificationContent(type),
        };

        // Add the new notification to the top of the list
        setNotifications([newNotification, ...notifications]);

        // Send the notification to the backend
        sendNotificationToBackend(type);
    };

    // Send notification to backend
    const sendNotificationToBackend = (type) => {
        fetch("http://localhost:5000/api/notifications", { // Adjusted endpoint
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: type, message: `New ${type} notification` }),
        })
            .then((response) => response.json())
            .then((data) => console.log("Notification sent:", data))
            .catch((error) => console.error("Error sending notification:", error));
    };

    // Get content based on notification type
    const getNotificationContent = (type) => {
        switch (type) {
            case 'event':
                return (
                    <>
                        <p><strong>New Event Available!</strong></p>
                        <p>A new event has been created that matches your skills.</p>
                    </>
                );
            case 'update':
                return (
                    <>
                        <p><strong>Event Updated!</strong></p>
                        <p>The details for an event you're attending have changed.</p>
                    </>
                );
            case 'reminder':
                return (
                    <>
                        <p><strong>Event Reminder!</strong></p>
                        <p>Don't forget about your upcoming event tomorrow.</p>
                    </>
                );
            default:
                return <p>New notification!</p>;
        }
    };

    // Remove notification from the list
    const removeNotification = (id) => {
        setNotifications((prevNotifications) =>
            prevNotifications.filter((notification) => notification.id !== id)
        );
    };

    return (
        <div>
            <button className="notification-btn" onClick={() => showNotification('event')}>New Event Notification</button>
            <button className="notification-btn" onClick={() => showNotification('update')}>Update Notification</button>
            <button className="notification-btn" onClick={() => showNotification('reminder')}>Reminder Notification</button>

            <div id="notification-container">
                {notifications.map((notification) => (
                    <div key={notification.id || notification._id} className="notification show">
                        {/* Render based on content if it's newly created, or title/message if from backend */}
                        {notification.content || (
                            <>
                                <p><strong>{notification.title}</strong></p>
                                <p>{notification.message}</p>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notification;

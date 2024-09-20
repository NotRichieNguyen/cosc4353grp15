import React, { useState } from 'react';
import "./notification.css";

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    let notificationCounter = 0;

    // Function to show notifications based on the type
    const showNotification = (type) => {
        const newNotification = {
            id: notificationCounter++,
            type: type,
            content: getNotificationContent(type),
        };

        // Add the new notification to the top of the list
        setNotifications([newNotification, ...notifications]);

        // Remove the notification after 5 seconds
        setTimeout(() => {
            removeNotification(newNotification.id);
        }, 5000);
    };

    // Get content based on notification type
    const getNotificationContent = (type) => {
        if (type === 'event') {
            return (
                <>
                    <p><strong>New Event Available!</strong></p>
                    <p>A new event has been created that matches your skills.</p>
                    <div className="notification-buttons">
                        <button className="view-details-btn" onClick={() => viewDetails('event')}>View Details</button>
                    </div>
                </>
            );
        } else if (type === 'update') {
            return (
                <>
                    <p><strong>Event Updated!</strong></p>
                    <p>The details for an event you're attending have changed.</p>
                    <div className="notification-buttons">
                        <button className="view-details-btn" onClick={() => viewDetails('update')}>See Update</button>
                    </div>
                </>
            );
        } else if (type === 'reminder') {
            return (
                <>
                    <p><strong>Event Reminder!</strong></p>
                    <p>Don't forget about your upcoming event tomorrow.</p>
                    <div className="notification-buttons">
                        <button className="view-details-btn" onClick={() => viewDetails('reminder')}>View Reminder</button>
                    </div>
                </>
            );
        }
    };

    // Remove notification from the list
    const removeNotification = (id) => {
        setNotifications((prevNotifications) => prevNotifications.filter(notification => notification.id !== id));
    };

    // Handle redirection (for demo purposes)
    const viewDetails = (type) => {
        if (type === 'event') {
            window.location.href = '/event-details';  // Replace with actual event details page link
        } else if (type === 'update') {
            window.location.href = '/event-updates';  // Replace with event updates page
        } else if (type === 'reminder') {
            window.location.href = '/event-reminder';  // Replace with event reminder page
        }
    };

    return (
        <div>
            <button className="notification-btn" onClick={() => showNotification('event')}>New Event Notification</button>
            <button className="notification-btn" onClick={() => showNotification('update')}>Update Notification</button>
            <button className="notification-btn" onClick={() => showNotification('reminder')}>Reminder Notification</button>

            <div id="notification-container">
                {notifications.map((notification) => (
                    <div key={notification.id} className="notification show">
                        {notification.content}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Notification;
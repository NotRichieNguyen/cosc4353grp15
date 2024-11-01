import express from "express";
const router = express.Router();

// In-memory notifications list for demo purposes
let notifications = [];

// Route to get all notifications
router.get("/", (req, res) => {
  res.json(notifications);
});

// Route to send a new notification
router.post("/send", (req, res) => {
  const { type, message } = req.body;
  
  const newNotification = {
    id: notifications.length + 1,
    type,
    message,
    timestamp: new Date(),
  };

  notifications.push(newNotification); // Add notification to the list
  res.status(201).json({ success: true, notification: newNotification });
});

// Route to clear all notifications
router.delete("/clear", (req, res) => {
  notifications = [];
  res.json({ success: true, message: "All notifications cleared." });
});

export default router; // Default export

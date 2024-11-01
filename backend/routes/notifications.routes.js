// backend/routes/notifications.routes.js
import express from "express";
import Notification from "../models/notifications.model.js"; // Import the Mongoose model

const router = express.Router();

// Route to get all notifications
router.get("/", async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

// Route to create a new notification
router.post("/", async (req, res) => {
  const { title, message, status, userId } = req.body;

  try {
    const newNotification = new Notification({
      title,
      message,
      status,
      userId,
    });
    await newNotification.save();
    res.status(201).json(newNotification);
  } catch (error) {
    res.status(500).json({ error: "Failed to create notification" });
  }
});

// Route to update a notification status (e.g., mark as read)
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedNotification = await Notification.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updatedNotification) {
      return res.status(404).json({ error: "Notification not found" });
    }
    res.json(updatedNotification);
  } catch (error) {
    res.status(500).json({ error: "Failed to update notification" });
  }
});

// Route to delete a notification
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedNotification = await Notification.findByIdAndDelete(id);
    if (!deletedNotification) {
      return res.status(404).json({ error: "Notification not found" });
    }
    res.json({ message: "Notification deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete notification" });
  }
});

export default router;

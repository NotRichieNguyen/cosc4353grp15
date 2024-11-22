// backend/models/Notification.model.js
import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  },
  eventName: {
    type: String,
  },
  eventDescription: {
    type: String,
  },
  eventDate: {
    type: Date,
  },
  users: {
    type: [String],
    default: ["all"],
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  readBy: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;

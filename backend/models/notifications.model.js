// backend/models/Notification.model.js
import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ["unread", "read"], default: "unread" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // if notifications are user-specific
});

export default mongoose.model("Notification", notificationSchema);

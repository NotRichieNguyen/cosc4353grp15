// backend/models/VolunteerHistory.model.js
import mongoose from "mongoose";

const volunteerHistorySchema = new mongoose.Schema({
  eventName: String,
  description: String,
  location: String,
  date: Date,
  requiredSkills: [String],
  participationStatus: String,
  hours: Number,
});

export default mongoose.model("VolunteerHistory", volunteerHistorySchema);

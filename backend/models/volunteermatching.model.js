import mongoose from "mongoose";

const volunteermatchingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EventManagement",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const VolunteerMatching = mongoose.model(
  "VolunteerMatching",
  volunteermatchingSchema
);

export default VolunteerMatching;

const mongoose = require("mongoose");

const eventManagementSchema = new mongoose.Schema({
  eventname: {
    type: String,
    required: true,
    maxlength: 100,
  },
  eventlocation: {
    type: String,
    required: true,
    maxlength: 50,
  },
  eventskills: {
    type: String,
    enum: [
      "Communication",
      "Leadership",
      "Organization",
      "Time Management",
      "Problem Solving",
      "Teamwork",
      "Event Planning",
      "Customer Service",
      "First Aid/CPR",
      "Fundraising",
      "Marketing/Social Media",
      "Budgeting",
      "Multitasking",
      "Tech Skills",
    ],
    required: true,
  },
  urgency: {
    type: String,
    enum: ["Low", "Medium", "High"],
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const EventManagement = mongoose.model(
  "EventManagement",
  eventManagementSchema
);

export default EventManagement;

import mongoose from "mongoose";

const volunteermatchingSchema = new mongoose.Schema({
  volunteername: {
    type: String,
    required: true,
  },
  volunteerskills: {
    type: [String],
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
  volunteeravailability: {
    type: Date,
    required: true,
  },
});

const VolunteerMatching = mongoose.model(
  "VolunteerMatching",
  volunteermatchingSchema
);

export default VolunteerMatching;

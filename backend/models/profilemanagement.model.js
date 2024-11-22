import mongoose from "mongoose";

const profileManagementSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Referencing the User model
    required: true,
  },
  fullname: {
    type: String,
    required: true,
    maxlength: 50,
  },
  address1: {
    type: String,
    required: true,
    maxlength: 100,
  },
  address2: {
    type: String,
    required: false,
    maxlength: 100,
  },
  city: {
    type: String,
    required: true,
    maxlength: 100,
  },
  state: {
    type: String,
    required: true,
    enum: [
      "AL",
      "AK",
      "AZ",
      "AR",
      "CA",
      "CO",
      "CT",
      "DE",
      "FL",
      "GA",
      "HI",
      "ID",
      "IL",
      "IN",
      "IA",
      "KS",
      "KY",
      "LA",
      "ME",
      "MD",
      "MA",
      "MI",
      "MN",
      "MS",
      "MO",
      "MT",
      "NE",
      "NV",
      "NH",
      "NJ",
      "NM",
      "NY",
      "NC",
      "ND",
      "OH",
      "OK",
      "OR",
      "PA",
      "RI",
      "SC",
      "SD",
      "TN",
      "TX",
      "UT",
      "VT",
      "VA",
      "WA",
      "WV",
      "WI",
      "WY",
    ],
  },
  zipcode: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 10,
    match: /^\d{5}(-\d{4})?$/,
  },
  skills: {
    type: [String],
    required: false,
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
      "Marketing/Social",
      "Budgeting",
      "Multitasking",
      "Tech Skills",
    ],
  },
});

const ProfileManagement = mongoose.model(
  "ProfileManagement",
  profileManagementSchema
);

export default ProfileManagement;

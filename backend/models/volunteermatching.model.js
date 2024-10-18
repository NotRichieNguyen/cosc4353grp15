import mongoose from "mongoose";

const volunteermatchingSchema = new mongoose.Schema({
  volunteername: {
    type: String,
    required: true,
  },
});

const VolunteerMatching = mongoose.model(
  "VolunteerMatching",
  volunteermatchingSchema
);

export default VolunteerMatching;

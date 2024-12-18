import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: { type: Boolean, required: true, default: false },
  volunteerHistory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'VolunteerHistory'
  }],
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;

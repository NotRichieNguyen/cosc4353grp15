import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import User from "./models/user.model.js";
dotenv.config();

const app = express();

app.use(express.json());

// app.get("/api/users", (req, res) => {
//   res.send("server @ /api/users is ready");
// });

app.post("/api/users", async (req, res) => {
  const user = req.body;

  if (!user.name) {
    return res
      .status(400)
      .json({ success: false, message: "User does not exist" });
  }

  const newUser = new User(user);

  try {
    await newUser.save();
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    console.error("Error in create user:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.listen(5000, () => {
  connectDB();
  console.log("Server started at http://localhost:5000");
});

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import keys from "./config/keys.js";

mongoose.connect(keys.mongoURI, {})
    .then( () => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

const app = express();

app.use(cors());
app.use(express.json()); // Parse incoming JSON data

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Server Error" });
});

dotenv.config();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());

app.listen(4000, () => {
  console.log("Server started at http://localhost:5000");
});

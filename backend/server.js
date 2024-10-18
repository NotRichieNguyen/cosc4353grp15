import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import User from "./models/user.model.js";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());

// authentication
const users = []; // Array to store users

// Registration endpoint
app.post("/register", (req, res) => {
  const { username, password } = req.body;
  console.log(`Registering user: ${username}`);

  const userExists = users.find((user) => user.username === username);

  if (userExists) {
    console.log("User already exists.");
    return res.status(400).json({ message: "Username already exists." });
  }

  users.push({ username, password });
  console.log("User registered successfully.");
  res.status(201).json({ message: "User registered successfully." });
});

// Login endpoint
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log(`Logging in user: ${username}`);

  const user = users.find((u) => u.username === username && u.password === password);

  if (user) {
    console.log("Login successful.");
    res.status(200).json({ message: "Login successful." });
  } else {
    console.log("Invalid credentials.");
    res.status(401).json({ message: "Invalid username or password." });
  }
});



// event management
let mockEvents = [
  {
    id: 1,
    eventname: "Community Cleanup",
    eventlocation: "Park",
    eventskills: "Teamwork",
    urgency: "High",
    date: "2024-11-01",
    description: "Help clean the park.",
  },
  {
    id: 2,
    eventname: "Charity Run",
    eventlocation: "City Center",
    eventskills: "Leadership",
    urgency: "Medium",
    date: "2024-12-05",
    description: "Lead a charity 5K run.",
  },
];

app.get("/api/events", (req, res) => {
  res.json(mockEvents);
});

app.post("/api/events", (req, res) => {
  const { eventname } = req.body;

  const existingEvent = mockEvents.find(
    (event) => event.eventname === eventname
  );

  if (existingEvent) {
    return res
      .status(200)
      .json({ message: "Event already exists", event: existingEvent });
  } else {
    const newEvent = { id: mockEvents.length + 1, ...req.body };
    mockEvents.push(newEvent);
    return res
      .status(201)
      .json({ message: "New event created", event: newEvent });
  }
});

app.listen(5000, () => {
  console.log("Server started at http://localhost:5000");
});
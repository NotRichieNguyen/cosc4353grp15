import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import User from "./models/user.model.js";
import volunteerHistoryRoutes from "./routes/volunteerHistory.routes.js";
import notificationRoutes from "./routes/notifications.routes.js";

dotenv.config();
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST"],
  credentials: true,
}));
app.use(express.json()); // Parse incoming JSON data

// Register routes
app.use("/api/volunteer-history", volunteerHistoryRoutes);
app.use("/api/notifications", notificationRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Server Error" });
});

// Mock data and authentication
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

// Profile management
let mockProfile = [
  {
    id: 1,
    fullname: "John Doe",
    address1: "1 Volunteer St",
    city: "Houston",
    state: "TX",
    zipcode: "77004",
    skills: "Teamwork",
    availability: "10/14/2024, 10/18/2024",
  },
];

app.get("/api/profile", (req, res) => {
  res.json(mockProfile);
});

app.post("/api/profile", (req, res) => {
  const { fullname, address1, address2, city, state, zipcode, skills, preferences, availability } = req.body;
  let profileExists = mockProfile.find(profile => profile.fullname === fullname);

  if (profileExists) {
    Object.assign(profileExists, req.body);
    return res.status(200).json({ message: "Profile updated successfully", profile: profileExists });
  } else {
    const newProfile = { id: mockProfile.length + 1, ...req.body };
    mockProfile.push(newProfile);
    return res.status(201).json({ message: "New profile created", profile: newProfile });
  }
});

// Event management
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

// Volunteer matching
app.post("/api/volunteers", (req, res) => {
  const { volunteerName, volunteerSkills, volunteerAvailability } = req.body;

  if (!volunteerName || !volunteerSkills || !volunteerAvailability) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const volunteerDate = new Date(volunteerAvailability);

  const matchingEvents = mockEvents.filter((event) => {
    const eventDate = new Date(event.date);

    const isDateMatch = eventDate.getTime() === volunteerDate.getTime();

    const isSkillMatch = volunteerSkills.includes(
      event.eventskills.toLowerCase()
    );

    return isDateMatch && isSkillMatch;
  });

  if (matchingEvents.length > 0) {
    return res.status(200).json({
      success: true,
      message: "Matching events found!",
      events: matchingEvents,
    });
  } else {
    return res.status(200).json({
      success: false,
      message: "No matching events found",
    });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});

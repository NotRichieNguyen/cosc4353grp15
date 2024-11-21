import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import User from "./models/user.model.js";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import volunteerHistoryRoutes from "./routes/volunteerHistory.routes.js";
import notificationRoutes from "./routes/notifications.routes.js";

dotenv.config();
const app = express();


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

dotenv.config();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());

dotenv.config({ path: "./backend/config/.env" });

// Registration endpoint
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: "Username already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error during registration." });
  }
});

// Login endpoint
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
      res.status(200).json({ message: "Login successful.", token });
    } else {
      res.status(401).json({ message: "Invalid username or password." });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login." });
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
  connectDB();
  console.log(`Server started at http://localhost:${PORT}`);
});

export default app;
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
import EventManagement from "./models/eventmanagement.model.js";
import VolunteerMatching from "./models/volunteermatching.model.js";
import ProfileManagement from "./models/profilemanagement.model.js";

dotenv.config();
const app = express();

// Middleware
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
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
      const token = jwt.sign({ id: user._id }, "your_jwt_secret", {
        expiresIn: "1h",
      });
      res.status(200).json({ message: "Login successful.", token });
    } else {
      res.status(401).json({ message: "Invalid username or password." });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login." });
  }
});

// Profile Management
app.get("/api/profile", async (req, res) => {
  try {
    const profiles = await ProfileManagement.find({ });
    res.json(profiles)
  }
  catch (error) {
    console.error("Profile not found: ", error)
    res.status(500).json({ message: "Profile not found: ", error })
  }
});

app.post("/api/profile", async (req, res) => {
  const { fullname, address1, address2, city, state, zipcode, skills, preferences, availability } = req.body;
  try {
    const profileExists = await ProfileManagement.findOne({ fullname });
    if (profileExists) {
      return res.status(200).json({ message: "Profile updated successfully", profile: profileExists });
    }
    else {
      const newProfile = new ProfileManagement({ fullname, address1, address2, city, state, zipcode, skills, preferences, availability });
      await newProfile.save();
      return res.status(201).json({ message: "New profile created", profile: newProfile }); 
    }
  }
  catch (error) {
    console.error("Profile could not be created: ", error)
    res.status(500).json({ message: "Profile could not be created: ", error })
  }
});

// Event management
app.get("/api/events", async (req, res) => {
  try {
    const events = await EventManagement.find({});
    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Error fetching events", error });
  }
});

app.post("/api/events", async (req, res) => {
  const { eventname, eventlocation, eventskills, urgency, date, description } =
    req.body;

  try {
    const existingEvent = await EventManagement.findOne({ eventname });

    if (existingEvent) {
      return res
        .status(200)
        .json({ message: "Event already exists", event: existingEvent });
    } else {
      const newEvent = new EventManagement({
        eventname,
        eventlocation,
        eventskills,
        urgency,
        date,
        description,
      });
      await newEvent.save();
      return res
        .status(201)
        .json({ message: "New event created", event: newEvent });
    }
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Error creating event", error });
  }
});

app.post("/api/volunteers", async (req, res) => {
  const { volunteerName, volunteerSkills, volunteerAvailability } = req.body;

  if (!volunteerName || !volunteerSkills || !volunteerAvailability) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const volunteerDate = new Date(volunteerAvailability);

  try {
    const matchingEvents = await EventManagement.find({
      date: volunteerDate,
      eventskills: { $in: volunteerSkills },
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
  } catch (error) {
    console.error("Error finding matching events:", error);
    res.status(500).json({ message: "Error finding matching events", error });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server started at http://localhost:${PORT}`);
});

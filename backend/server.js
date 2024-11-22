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
import crypto from "crypto";
// const jwtSecret = crypto.randomBytes(32).toString("hex");
// console.log('jwtsecret:', jwtSecret);
dotenv.config({ path: "./backend/config/.env" });
const app = express();

// Middleware
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  })
);

app.use(express.json()); // Parse incoming JSON data
// Middleware to verify JWT and extract user ID
function authenticateJWT(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    req.user = user;
    next();
  });
}

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
      const token = jwt.sign(
        { id: user._id, admin: user.admin },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );
      res.status(200).json({
        message: "Login successful.",
        token,
        admin: user.admin,
        id: user._id,
      });
    } else {
      res.status(401).json({ message: "Invalid username or password." });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login." });
  }
});

console.log("proces.env.JWT_SECRET:", process.env.JWT_SECRET);

// Profile Management
app.get("/api/profile", async (req, res) => {
  try {
    const userId = req.user.id; // Get the user ID from the JWT token
    const profile = await ProfileManagement.findOne({ user: userId });
    console.log("userID: ", userID);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error while fetching profile" });
  }
});

// Create or update the user's profile
app.post("/api/profile", authenticateJWT, async (req, res) => {
  const {
    fullname,
    address1,
    address2,
    city,
    state,
    zipcode,
    skills,
    preferences,
    availability,
  } = req.body;

  try {
    const userId = req.user.id; // Get the user ID from the JWT token

    // Check if the user already has a profile
    let profile = await ProfileManagement.findOne({ user: userId });

    if (profile) {
      // Update the existing profile
      profile.fullname = fullname || profile.fullname;
      profile.address1 = address1 || profile.address1;
      profile.address2 = address2 || profile.address2;
      profile.city = city || profile.city;
      profile.state = state || profile.state;
      profile.zipcode = zipcode || profile.zipcode;
      profile.skills = skills || profile.skills;
      profile.preferences = preferences || profile.preferences;
      profile.availability = availability || profile.availability;

      await profile.save();
      return res
        .status(200)
        .json({ message: "Profile updated successfully", profile });
    } else {
      // Create a new profile for the user
      const newProfile = new ProfileManagement({
        user: userId, // Link the profile to the user
        fullname,
        address1,
        address2,
        city,
        state,
        zipcode,
        skills,
        preferences,
        availability,
      });

      await newProfile.save();
      return res
        .status(201)
        .json({ message: "Profile created successfully", profile: newProfile });
    }
  } catch (error) {
    console.error("Error creating or updating profile:", error);
    res
      .status(500)
      .json({ message: "Error creating or updating profile", error });
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

//Update Events
app.put("/api/events/update/:eventname", async (req, res) => {
  const { eventname } = req.params;
  const updateData = req.body;

  try {
    const updatedEvent = await EventManagement.findOneAndUpdate(
      { eventname },
      updateData,
      { new: true }
    );

    if (updatedEvent) {
      return res
        .status(200)
        .json({ message: "Event updated successfully", updatedEvent });
    } else {
      return res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ message: "Error updating event", error });
  }
});

//Volunteer Matching
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

//Matched Volunteers with Events
app.post("/api/volunteer-matching", async (req, res) => {
  const { eventId, userId } = req.body;

  try {
    const existingMatch = await VolunteerMatching.findOne({
      event: eventId,
      user: userId,
    });
    if (existingMatch) {
      return res
        .status(400)
        .json({ message: "User is already registered for this event" });
    }

    const newMatch = new VolunteerMatching({
      user: userId,
      event: eventId,
    });

    await newMatch.save();
    res
      .status(201)
      .json({ message: "Volunteer registered successfully", match: newMatch });
  } catch (error) {
    console.error("Error registering volunteer:", error);
    res.status(500).json({ message: "Error registering volunteer", error });
  }
});

//Volunteering History
app.get("/api/volunteer-history/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const volunteerRecords = await VolunteerMatching.find({
      user: userId,
    }).populate("event");

    if (!volunteerRecords.length) {
      return res
        .status(404)
        .json({ message: "No events found for this user." });
    }

    // Extract events
    const events = volunteerRecords.map((record) => record.event);

    res.status(200).json({ events });
  } catch (error) {
    console.error("Error fetching volunteer history:", error);
    res
      .status(500)
      .json({ message: "Error fetching volunteer history.", error });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server started at http://localhost:${PORT}`);
});

export default app;

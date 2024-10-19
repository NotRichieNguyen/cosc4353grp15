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

// app.get("/api/users", (req, res) => {
//   res.send("server @ /api/users is ready");
// });

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

app.listen(5000, () => {
  console.log("Server started at http://localhost:5000");
});

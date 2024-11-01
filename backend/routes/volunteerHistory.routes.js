// backend/routes/volunteerHistory.routes.js
import express from "express";
import VolunteerHistory from "../models/volunteerHistory.model.js";

const router = express.Router();

// Route to get all volunteer history
router.get("/", async (req, res) => {
  try {
    // Fetch all volunteer history data from MongoDB
    const volunteerHistoryData = await VolunteerHistory.find();
    res.json(volunteerHistoryData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch volunteer history data" });
  }
});

// Route to get total hours for the current month
router.get("/hours", async (req, res) => {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  try {
    // Find attended events from MongoDB
    const attendedEvents = await VolunteerHistory.find({
      participationStatus: "Attended",
    });

    // Filter events for the current month and year, then calculate total hours
    const totalHours = attendedEvents
      .filter((event) => {
        const eventDate = new Date(event.date);
        return (
          eventDate.getMonth() + 1 === currentMonth &&
          eventDate.getFullYear() === currentYear
        );
      })
      .reduce((total, event) => total + event.hours, 0);

    res.json({ totalHours });
  } catch (error) {
    res.status(500).json({ error: "Failed to calculate total hours" });
  }
});

export default router;

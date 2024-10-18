// backend/routes/volunteerHistory.routes.js
import express from "express";
const router = express.Router();

// Hardcoded volunteer history data
let volunteerHistoryData = [
  {
    eventName: "Beach Cleanup",
    description: "Cleaning the beach and surrounding areas.",
    location: "Santa Monica Beach",
    date: "2024-10-01",
    requiredSkills: ["Teamwork", "Environmental Awareness"],
    participationStatus: "Attended",
    hours: 2,
  },
  {
    eventName: "Food Bank",
    description: "Sorting and packing food donations.",
    location: "Community Food Bank",
    date: "2024-09-15",
    requiredSkills: ["Organization", "Lifting"],
    participationStatus: "Attended",
    hours: 3,
  },
  {
    eventName: "Tree Planting",
    description: "Planting trees in the park.",
    location: "Griffith Park",
    date: "2024-10-05",
    requiredSkills: ["Gardening", "Teamwork"],
    participationStatus: "Missed",
    hours: 0,
  },
];

// Calculate total hours for the current month
const calculateTotalHours = () => {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  return volunteerHistoryData
    .filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getMonth() + 1 === currentMonth &&
        eventDate.getFullYear() === currentYear &&
        event.participationStatus === "Attended"
      );
    })
    .reduce((total, event) => total + event.hours, 0);
};

// Route to get all volunteer history
router.get("/", (req, res) => {
  res.json(volunteerHistoryData);
});

// Route to get total hours for the current month
router.get("/hours", (req, res) => {
  const totalHours = calculateTotalHours();
  res.json({ totalHours });
});

export default router;

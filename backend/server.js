import express from "express";
import cors from "cors";
import volunteerHistoryRoutes from "./routes/volunteerHistory.routes.js";
import notificationRoutes from "./routes/notifications.routes.js";

const app = express();

app.use(cors());
app.use(express.json()); // Parse incoming JSON data

// Register routes
app.use("/api/volunteer-history", volunteerHistoryRoutes);
app.use("/api/notifications", notificationRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Server Error" });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});

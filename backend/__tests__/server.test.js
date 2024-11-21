import request from "supertest";
import app from "../server.js"; // Import your server
import Notification from "../models/notifications.model.js"; // Mock the Notification model
import VolunteerHistory from "../models/volunteerHistory.model.js"; // Mock the VolunteerHistory model
import User from "../models/user.model.js"; // Mock the User model
import bcrypt from "bcrypt";

describe("Server Tests", () => {
  describe("GET /api/events", () => {
    it("should return all mock events", async () => {
      const response = await request(app).get("/api/events");
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe("POST /api/events", () => {
    it("should create a new event", async () => {
      const newEvent = {
        eventname: "Food Drive",
        eventlocation: "Community Hall",
        eventskills: "Organization",
        urgency: "Low",
        date: "2024-12-25",
        description: "Distribute food to families in need.",
      };
      const response = await request(app).post("/api/events").send(newEvent);
      expect(response.status).toBe(201);
      expect(response.body.message).toBe("New event created");
      expect(response.body.event.eventname).toBe(newEvent.eventname);
    });

    it("should return an existing event if it already exists", async () => {
      const existingEvent = {
        eventname: "Community Cleanup",
      };
      const response = await request(app).post("/api/events").send(existingEvent);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Event already exists");
    });
  });

  describe("POST /register", () => {
    it("should register a new user", async () => {
      const newUser = { username: "testuser", password: "password123" };
      const response = await request(app).post("/register").send(newUser);
      expect(response.status).toBe(201);
      expect(response.body.message).toBe("User registered successfully.");
    });
  });

  describe("POST /login", () => {
    it("should log in a user with valid credentials", async () => {
      const loginCredentials = { username: "testuser", password: "password123" };
      const response = await request(app).post("/login").send(loginCredentials);
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Login successful.");
      expect(response.body).toHaveProperty("token");
    });

    it("should not log in a user with invalid credentials", async () => {
      const invalidCredentials = { username: "testuser", password: "wrongpass" };
      const response = await request(app).post("/login").send(invalidCredentials);
      expect(response.status).toBe(401);
      expect(response.body.message).toBe("Invalid username or password.");
    });
  });

  describe("POST /api/volunteers", () => {
    it("should return matching events for a volunteer", async () => {
      const volunteer = {
        volunteerName: "John Doe",
        volunteerSkills: ["teamwork"],
        volunteerAvailability: "2024-11-01",
      };
      const response = await request(app).post("/api/volunteers").send(volunteer);
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Matching events found!");
      expect(response.body.events.length).toBeGreaterThan(0);
    });

    it("should return no matches for a volunteer with mismatched data", async () => {
      const volunteer = {
        volunteerName: "John Doe",
        volunteerSkills: ["design"],
        volunteerAvailability: "2024-10-01",
      };
      const response = await request(app).post("/api/volunteers").send(volunteer);
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("No matching events found");
    });
  });
});

jest.mock("../models/notifications.model.js"); // Mock the Notification model for isolated tests
describe("Notifications Routes", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Reset mocks after each test
  });

  describe("GET /api/notifications", () => {
    it("should fetch all notifications", async () => {
      const mockNotifications = [
        { _id: "1", title: "Test 1", message: "Message 1", status: "unread", userId: "user1" },
        { _id: "2", title: "Test 2", message: "Message 2", status: "read", userId: "user2" },
      ];
      Notification.find.mockResolvedValue(mockNotifications);

      const response = await request(app).get("/api/notifications");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockNotifications);
      expect(Notification.find).toHaveBeenCalledTimes(1);
    });

    it("should handle errors when fetching notifications", async () => {
      Notification.find.mockRejectedValue(new Error("Fetch error"));

      const response = await request(app).get("/api/notifications");

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Failed to fetch notifications");
      expect(Notification.find).toHaveBeenCalledTimes(1);
    });
  });

  describe("POST /api/notifications", () => {
    it("should create a new notification", async () => {
      const newNotification = { title: "New Title", message: "New Message", status: "unread", userId: "user1" };
      Notification.prototype.save = jest.fn().mockResolvedValue({ _id: "1", ...newNotification });

      const response = await request(app).post("/api/notifications").send(newNotification);

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(newNotification);
      expect(Notification.prototype.save).toHaveBeenCalledTimes(1);
    });

    it("should handle errors when creating a notification", async () => {
      Notification.prototype.save = jest.fn().mockRejectedValue(new Error("Create error"));

      const response = await request(app).post("/api/notifications").send({});

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Failed to create notification");
    });
  });

  describe("PUT /api/notifications/:id", () => {
    it("should update a notification status", async () => {
      const updatedNotification = { _id: "1", title: "Title", message: "Message", status: "read", userId: "user1" };
      Notification.findByIdAndUpdate.mockResolvedValue(updatedNotification);

      const response = await request(app).put("/api/notifications/1").send({ status: "read" });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(updatedNotification);
      expect(Notification.findByIdAndUpdate).toHaveBeenCalledWith("1", { status: "read" }, { new: true });
    });

    it("should return 404 if notification is not found", async () => {
      Notification.findByIdAndUpdate.mockResolvedValue(null);

      const response = await request(app).put("/api/notifications/1").send({ status: "read" });

      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Notification not found");
    });

    it("should handle errors when updating a notification", async () => {
      Notification.findByIdAndUpdate.mockRejectedValue(new Error("Update error"));

      const response = await request(app).put("/api/notifications/1").send({ status: "read" });

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Failed to update notification");
    });
  });

  describe("DELETE /api/notifications/:id", () => {
    it("should delete a notification", async () => {
      Notification.findByIdAndDelete.mockResolvedValue({ _id: "1" });

      const response = await request(app).delete("/api/notifications/1");

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Notification deleted successfully");
      expect(Notification.findByIdAndDelete).toHaveBeenCalledWith("1");
    });

    it("should return 404 if notification to delete is not found", async () => {
      Notification.findByIdAndDelete.mockResolvedValue(null);

      const response = await request(app).delete("/api/notifications/1");

      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Notification not found");
    });

    it("should handle errors when deleting a notification", async () => {
      Notification.findByIdAndDelete.mockRejectedValue(new Error("Delete error"));

      const response = await request(app).delete("/api/notifications/1");

      expect(response.status).toBe(500);
      expect(response.body.error).toBe("Failed to delete notification");
    });
  });
});

jest.mock("../models/volunteerHistory.model.js"); // Mock the VolunteerHistory model for isolated tests

describe("GET /api/volunteer-history/hours", () => {
  it("should calculate total hours for the current month", async () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const mockData = [
      { _id: "1", date: `${currentYear}-${String(currentMonth).padStart(2, '0')}-01`, hours: 4, participationStatus: "Attended" },
      { _id: "2", date: `${currentYear}-${String(currentMonth).padStart(2, '0')}-15`, hours: 3, participationStatus: "Attended" },
    ];
    VolunteerHistory.find.mockResolvedValue(mockData);

    const response = await request(app).get("/api/volunteer-history/hours");

    expect(response.status).toBe(200);
    expect(response.body.totalHours).toBe(7); // Total hours for events in the current month
    expect(VolunteerHistory.find).toHaveBeenCalledWith({ participationStatus: "Attended" });
  });

  it("should return 0 total hours if no events match the current month", async () => {
    const mockData = [
      { _id: "1", date: "2024-10-01", hours: 4, participationStatus: "Attended" }, // Not in the current month
      { _id: "2", date: "2024-10-15", hours: 3, participationStatus: "Attended" }, // Not in the current month
    ];
    VolunteerHistory.find.mockResolvedValue(mockData);

    const response = await request(app).get("/api/volunteer-history/hours");

    expect(response.status).toBe(200);
    expect(response.body.totalHours).toBe(0); // No events in the current month
    expect(VolunteerHistory.find).toHaveBeenCalledWith({ participationStatus: "Attended" });
  });

  it("should handle errors when calculating total hours", async () => {
    VolunteerHistory.find.mockRejectedValue(new Error("Database error"));

    const response = await request(app).get("/api/volunteer-history/hours");

    expect(response.status).toBe(500);
    expect(response.body.error).toBe("Failed to calculate total hours");
    expect(VolunteerHistory.find).toHaveBeenCalledWith({ participationStatus: "Attended" });
  });
});

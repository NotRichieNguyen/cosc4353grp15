
import EventManagement from "./models/eventmanagement.model.js";

// authentication
const users = []; // Array to store users

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

// profile management
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
  Object.assign(profileExists, req.body);
  return res.status(200).json({ message: "Profile updated succesfully", event: profileExists });
})

// event management
app.post("/api/events", async (req, res) => {
  const { eventname, eventlocation, eventskills, urgency, date, description } = req.body;
  
  if (!eventname || !eventlocation || !eventskills || !urgency || !date || !description) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }
  
  try {
    const existingEvent = await EventManagement.findOne({ eventname });

    if (existingEvent) {
      return res.status(200).json({ message: "Event already exists", event: existingEvent });
    }

    const newEvent = new EventManagement({
      eventname,
      eventlocation,
      eventskills,
      urgency,
      date,
      description,
    });

    await newEvent.save(); 
    res.status(201).json({ message: "New event created", event: newEvent });
  } catch (error) {
    res.status(500).json({ message: "Failed to create event", error: error.message });
  }
});

app.post("/api/volunteers", async (req, res) => {
  const { volunteername, volunteerskills, volunteeravailability } = req.body;

  if (!volunteername || !volunteerskills || !volunteeravailability) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  try {
    const volunteerDate = new Date(volunteeravailability);

    const matchingEvents = await EventManagement.find({
      date: { $eq: volunteerDate },
      eventskills: { $in: volunteerskills },
    });

    if (matchingEvents.length > 0) {
      res.status(200).json({ success: true, message: "Matching events found!", events: matchingEvents });
    } else {
      res.status(200).json({ success: false, message: "No matching events found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to find matching events", error: error.message });
  }
});

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

const userRoutes = require('./routes/userRoute');
const adminRoutes = require('./routes/adminRoute');

// Load environment variables
dotenv.config();

const app = express();
const MONGO_URI = process.env.MONGO_URL;

// Allowed frontend origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://keto-eta-eight.vercel.app"
];

// CORS setup
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true
}));

app.use(express.json());

// ✅ Load sample.json
const samplePath = path.join(__dirname, 'sample.json');
let sampleData = [];

try {
  const data = fs.readFileSync(samplePath, 'utf-8');
  sampleData = JSON.parse(data);
  console.log("✅ Loaded sample.json");
} catch (err) {
  console.error("❌ Failed to load sample.json:", err.message);
}

// Routes
app.use(userRoutes);
app.use(adminRoutes);

// ✅ API endpoint to return sample.json data
app.get("/api/sample", (req, res) => {
  res.json(sampleData);
});

app.get("/", (req, res) => {
  res.send("✅ API is running on Vercel!");
});

// ✅ Connect to MongoDB (only if MONGO_URI is defined)
if (MONGO_URI) {
  mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB connection failed:", err));
} else {
  console.warn("⚠️ MONGO_URL is not defined. Skipping MongoDB connection.");
}




// MongoDB connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
})
.then(() => console.log(" MongoDB connected"))
.catch((err) => console.error("MongoDB connection failed:", err));


module.exports = app;

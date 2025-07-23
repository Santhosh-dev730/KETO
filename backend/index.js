const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const favicon = require('serve-favicon');

const userRoutes = require('./routes/userRoute');
const adminRoutes = require('./routes/adminRoute');

dotenv.config();

const app = express();

// ✅ Get Mongo URI from environment
const MONGO_URI = process.env.MONGO_URL;

// ✅ Serve favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// ✅ Allowed frontend origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://keto-eta-eight.vercel.app"
];

// ✅ CORS setup
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

// ✅ Body parser
app.use(express.json());

// ✅ Load sample.json data
const samplePath = path.join(__dirname, 'sample.json');
let sampleData = [];

try {
  const data = fs.readFileSync(samplePath, 'utf-8');
  sampleData = JSON.parse(data);
  console.log("✅ Loaded sample.json");
} catch (err) {
  console.error("❌ Failed to load sample.json:", err.message);
}

// ✅ API routes
app.use(userRoutes);
app.use(adminRoutes);

// ✅ Sample API endpoint
app.get("/api/sample", (req, res) => {
  res.json(sampleData);
});

// ✅ Root route
app.get("/", (req, res) => {
  res.send("✅ API is running on Vercel!");
});

// ✅ Debug route to check MongoDB connection
app.get("/ping-db", async (req, res) => {
  try {
    await mongoose.connection.db.admin().ping();
    res.send("✅ MongoDB is reachable");
  } catch (err) {
    res.status(500).send("❌ Ping failed: " + err.message);
  }
});

// ✅ MongoDB Connection Function
const connectDB = async () => {
  try {
    if (!MONGO_URI) {
      console.warn("⚠️ MONGO_URL is not defined. Skipping MongoDB connection.");
      return;
    }

    await mongoose.connect(MONGO_URI)
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
  }
};

// ✅ Connect to DB
connectDB();


// ✅ Export app for serverless deployment or normal
module.exports = app;

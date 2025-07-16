const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const userRoutes = require('./routes/userRoute');
const adminRoutes = require('./routes/adminRoute');

// Load environment variables
dotenv.config();

const app = express();

// Get Mongo URI from environment
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

// Middleware
app.use(express.json());

// Routes
app.use(userRoutes);
app.use(adminRoutes);


app.get("/", (req, res) => {
  res.send("✅ API is running on Vercel!");
});



// MongoDB connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log(" MongoDB connected"))
.catch((err) => console.error("MongoDB connection failed:", err));


module.exports = app;

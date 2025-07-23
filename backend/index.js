const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config();

const app = express();

const PORT = process.env.PORT || 7000;
const MONGO_URL = process.env.MONGO_URL;

// ✅ Middleware
app.use(cors());
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

// ✅ Routes
app.get('/', (req, res) => {
  res.send('🎉 Keto API running on Render!');
});

app.get('/api/sample', (req, res) => {
  res.json(sampleData);
});

// ✅ Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL)
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
  }
};

connectDB();

// ✅ Listen on port – This is required for Render to detect your app!
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const userRoutes = require('./routes/userRoute');
const adminRoutes = require('./routes/adminRoute');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 7000;

app.use(cors({ origin: "http://localhost:5173", methods: ["GET", "POST", "PATCH", "DELETE"] }));
app.use(express.json());
app.use(userRoutes);
app.use(adminRoutes);

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB Connection Failed:", err));
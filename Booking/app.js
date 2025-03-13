const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bookingRoutes = require("../Booking/bookingRoutes");

dotenv.config();

const app = express();
app.use(express.json());

// routes
app.use("/booking", bookingRoutes);

// starting server
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error("MongoDB connection error:", error));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

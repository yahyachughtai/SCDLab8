const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // maxBookings: { type: Number, default: 3 },
  // currentBookings: { type: Number },
});

module.exports = mongoose.model("User", userSchema);

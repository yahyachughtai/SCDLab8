const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  bookingId: { type: String, required: true },
  userId: { type: String, required: true },
  name: { type: String, require: true },
  description: { type: String, require: true },
  startDate: { type: Date, required: true },
  time: { type: Date, default: Date.now() },
  reminder: { type: Boolean, default: false },
  category: {
    type: String,
    default: "Non",
    enum: ["Meetings", "Birthdays", "Appointments"],
  },
});

module.exports = mongoose.model("Booking", bookingSchema);

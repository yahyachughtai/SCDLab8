const express = require("express");
const Booking = require("../Booking/Booking");
const User = require("../User/User");
const Car = require("../Car/Car");
const { default: axios } = require("axios");

const router = express.Router();

//put
const setBookingsReminder = async (req, res) => {
  try {
    const bookings = await Booking.findOne({ userId: req.params.userId });
    if (!bookings) {
      return res.status(404).json({ message: "User bookings not found" });
    }
    bookings.reminder = true;
    await booking.save();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// post
const createBooking = async (req, res) => {
  const { userId, name, description, startDate, reminder, category } = req.body;

  try {
    const existingUser = await axios.get(
      `${process.env.USER_PORT}/users/${userId}`
    );
    if (!existingUser)
      return res.status(400).json({ message: "User not found" });
    // if (existingUser.currentBookings >= existingUser.maxBookings) {
    //   return res.status(400).json({ message: "User booking limit reached" });
    // }
    // const availableCar = await axios.get(
    //   `${process.env.CAR_PORT}/cars/${carId}`
    // );
    // if (!availableCar)
    //   return res.status(400).json({ message: "Cars not available" });
    const newBooking = new Booking({
      userId: existingUser._id,
      name: name,
      description: description,
      startDate: startDate,
      reminder: reminder,
      category: category,
    });
    await newBooking.save();

    axios.put(`${process.env.USER_PORT}/users/${userId}`);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// get
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId });
    if (!bookings) {
      return res.status(404).json({ message: "User bookings not found" });
    }
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// delete
// const deleteBooking = async (req, res) => {
//   try {
//     const booking = await Booking.findById(req.params.bookingsId);
//     if (!booking) {
//       return res.status(404).json({ message: "Booking not found" });
//     }
//     booking.status = "canceled";
//     await booking.save();
//     res.json(booking);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

module.exports = { createBooking, getBookings, setBookingsReminder };

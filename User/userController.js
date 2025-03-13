const express = require("express");
const User = require("../User/User");

const router = express.Router();

// post
const registerUser = async (req, res) => {
  const { name, email } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const newUser = new User({
      name,
      email,
    });
    await newUser.save();
    const uuser = await User.findOne({ email });
    res.json(uuser);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// get
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// put
const UpdateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.currentBookings++;
    await user.save();
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerUser, getUser, UpdateUser };

const express = require("express");
const router = express.Router();
const bookingController = require("../Booking/bookingController");

router.post("/", bookingController.createBooking);
router.get("/:userId", bookingController.getBookings);
router.put("/:userId", bookingController.setBookingsReminder);
//router.delete("/:bookingId", bookingController.deleteBooking);

module.exports = router;

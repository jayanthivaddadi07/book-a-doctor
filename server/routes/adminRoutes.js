const express = require("express");
const router = express.Router();

const User = require("../models/User");
const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");

router.get("/stats", async (req, res) => {
  try {
    const users = await User.countDocuments();
    const doctors = await Doctor.countDocuments();
    const appointments = await Appointment.countDocuments();
    const pending = await Appointment.countDocuments({
      status: "Pending",
    });

    res.json({
      users,
      doctors,
      appointments,
      pending,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;
const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// Book Appointment
router.post("/", async (req, res) => {
  try {
    const appointment = new Appointment(req.body);

    await appointment.save();

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
});

// Get all appointments
router.get("/", async (req, res) => {
  try {
  const appointments = await Appointment.find()
  .populate("patient", "-password")
  .populate("doctor");

    res.json(appointments);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
});
// Cancel Appointment
router.delete("/:id", async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);

    res.json({
      message: "Appointment cancelled successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const appointment =
      await Appointment.findByIdAndUpdate(
        req.params.id,
        {
          status: req.body.status,
        },
        { new: true }
      );

    res.json({
      message: "Status updated",
      appointment,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Appointment cancelled successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;
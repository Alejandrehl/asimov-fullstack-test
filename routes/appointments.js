const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// @route GET api/appointments
// @desc get all appointments
// @access Public
router.get("/", async (req, res) => {
    try {
        const appointments = await Appointment.find();
    } catch (e) {
        res.status(500).send("Server Error.");
    }
    ;
});

module.exports = router;
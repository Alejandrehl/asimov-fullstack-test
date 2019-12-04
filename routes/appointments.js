const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// @route GET api/appointments
// @desc Get all appointments
// @access Public
router.get("/", async (req, res) => {
    try {
        const appointments = await Appointment.find();
        await res.json(appointments);
    } catch (e) {
        res.status(500).send("Server Error.");
    }
    ;
});

// @route GET api/appointments/date
// @desc Get appointments by date
// @access Public
router.get("/:date", async (req, res) => {
    try {
        const appointments = await Appointment.find({ formatDate: req.params.date});
        await res.json(appointments);
    } catch (e) {
        res.status(500).send("Server Error.");
    }
});

// @route POST api/appointments
// desc Add new appointment
// @access Public
router.post("/", async (req, res) => {
    const {email, date, formatDate, startTime} = req.body;
    try {
        const newAppointment = new Appointment({
            email,
            date,
            formatDate,
            startTime
        });

        const appointment = await newAppointment.save();
        await res.json(appointment);
    } catch (e) {
        res.status(500).send("Server Error.");
    }
});

module.exports = router;
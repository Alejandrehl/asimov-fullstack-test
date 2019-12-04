const mongoose = require("mongoose");

const AppointmentSchema = mongoose.Schema({
    email: {type: String, required: true},
    date: {type: Date, require: true}
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
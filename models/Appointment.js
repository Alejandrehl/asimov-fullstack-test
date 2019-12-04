const mongoose = require("mongoose");

const AppointmentSchema = mongoose.Schema({
    email: {type: String, required: true},
    date: {type: Date, require: true},
    formatDate: {type: String, require: true},
    startTime: {type: Number, require: true}
});

module.exports = mongoose.model("Appointment", AppointmentSchema);
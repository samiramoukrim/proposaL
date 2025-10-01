const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: String,
}, { timestamps: true });

module.exports = mongoose.model("Reservation", contactSchema);
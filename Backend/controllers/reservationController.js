const Reservation = require("../models/Reservation");

// Create a reservation
exports.createReservation = async (req, res) => {
    try {
        const { name, email, phone, date, package: pkg, message, serviceId } = req.body;

        if (!name || !email || !date || !pkg) {
            return res.status(400).json({ success: false, message: "Name, email, date, and package are required." });
        }

        const newReservation = new Reservation({
            name,
            email,
            phone,
            date,
            package: pkg,
            message,
            serviceId
        });

        const savedReservation = await newReservation.save();
        res.status(201).json({ success: true, message: "Reservation created successfully", data: savedReservation });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// Optionally: get all reservations
exports.getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find();
        res.json({ success: true, data: reservations });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

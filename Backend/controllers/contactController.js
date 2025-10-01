const Contact = require("../models/Contact");

// Create a reservation
exports.createContact = async (req, res) => {
    try {
        const { name, email,  message} = req.body;

        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required." });
        }

        const newContact= new Contact({
            name,
            email,
            message,
        });

        const savedContact = await newContact.save();
        res.status(201).json({ success: true, message: "Message sent successfully", data: savedContact });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');

// =======================
// GET all reservations
// =======================
router.get('/', async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const query = status ? { status } : {};

    const skip = (page - 1) * limit;

    const reservations = await Reservation.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('serviceId', 'title category');

    const total = await Reservation.countDocuments(query);

    res.json({
      success: true,
      data: reservations,
      count: reservations.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit)
    });
  } catch (error) {
    console.error('Error fetching reservations:', error);
    res.status(500).json({ success: false, message: 'Error fetching reservations', error: error.message });
  }
});

// =======================
// POST - Create new reservation
// =======================
router.post('/', async (req, res) => {
  try {
    const { name, email, date, package, phone, message, serviceId } = req.body;

    const reservationData = { name, email, date, package, phone, message, serviceId };

    const newReservation = new Reservation(reservationData);
    const savedReservation = await newReservation.save();

    await savedReservation.populate('serviceId', 'title category');

    res.status(201).json({
      success: true,
      message: 'Reservation created successfully',
      data: savedReservation
    });
  } catch (error) {
    console.error('Error creating reservation:', error);

    if (error.name === 'ValidationError') {
      const errors = {};
      Object.keys(error.errors).forEach(key => {
        errors[key] = error.errors[key].message;
      });
      return res.status(400).json({ success: false, message: 'Validation failed', errors });
    }

    res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
});

// =======================
// GET reservations by user email
// =======================
router.get('/user/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const reservations = await Reservation.find({ email: email.toLowerCase() })
      .sort({ createdAt: -1 })
      .populate('serviceId', 'title category');

    res.json({ success: true, data: reservations, count: reservations.length });
  } catch (error) {
    console.error('Error fetching user reservations:', error);
    res.status(500).json({ success: false, message: 'Error fetching user reservations', error: error.message });
  }
});

// =======================
// GET reservation statistics
// =======================
router.get('/stats/overview', async (req, res) => {
  try {
    const totalReservations = await Reservation.countDocuments();
    const pendingReservations = await Reservation.countDocuments({ status: 'pending' });
    const confirmedReservations = await Reservation.countDocuments({ status: 'confirmed' });
    const completedReservations = await Reservation.countDocuments({ status: 'completed' });

    const packageStats = await Reservation.aggregate([
      { $group: { _id: '$package', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      data: {
        total: totalReservations,
        pending: pendingReservations,
        confirmed: confirmedReservations,
        completed: completedReservations,
        packageStats
      }
    });
  } catch (error) {
    console.error('Error fetching reservation statistics:', error);
    res.status(500).json({ success: false, message: 'Error fetching reservation statistics', error: error.message });
  }
});

// =======================
// GET reservation by ID (keep last!)
// =======================
router.get('/:id', async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id)
      .populate('serviceId', 'title category');

    if (!reservation) {
      return res.status(404).json({ success: false, message: 'Reservation not found' });
    }

    res.json({ success: true, data: reservation });
  } catch (error) {
    console.error('Error fetching reservation:', error);
    res.status(500).json({ success: false, message: 'Error fetching reservation', error: error.message });
  }
});

// =======================
// PUT - Update reservation
// =======================
router.put('/:id', async (req, res) => {
  try {
    const { status, notes } = req.body;
    const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];

    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
    }

    const updateData = {};
    if (status) updateData.status = status;
    if (notes) updateData.notes = notes;

    const updatedReservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('serviceId', 'title category');

    if (!updatedReservation) {
      return res.status(404).json({ success: false, message: 'Reservation not found' });
    }

    res.json({ success: true, message: 'Reservation updated successfully', data: updatedReservation });
  } catch (error) {
    console.error('Error updating reservation:', error);
    res.status(500).json({ success: false, message: 'Error updating reservation', error: error.message });
  }
});

// =======================
// DELETE reservation
// =======================
router.delete('/:id', async (req, res) => {
  try {
    const deletedReservation = await Reservation.findByIdAndDelete(req.params.id);

    if (!deletedReservation) {
      return res.status(404).json({ success: false, message: 'Reservation not found' });
    }

    res.json({ success: true, message: 'Reservation deleted successfully', data: deletedReservation });
  } catch (error) {
    console.error('Error deleting reservation:', error);
    res.status(500).json({ success: false, message: 'Error deleting reservation', error: error.message });
  }
});

module.exports = router;

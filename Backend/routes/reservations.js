const express = require('express');
const router = express.Router();

// In-memory storage for reservations (replace with database in production)
let reservations = [];
let nextId = 1;

// GET all reservations
router.get('/', (req, res) => {
  try {
    res.json({
      success: true,
      data: reservations,
      count: reservations.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching reservations',
      error: error.message
    });
  }
});

// POST - Create new reservation
router.post('/', (req, res) => {
  try {
    const { name, email, date, package, phone, message, serviceId } = req.body;

    // Validation
    const errors = {};
    
    if (!name || name.trim().length < 2) {
      errors.name = 'Name is required and must be at least 2 characters';
    }
    
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Valid email is required';
    }
    
    if (!date) {
      errors.date = 'Date is required';
    } else {
      const selectedDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        errors.date = 'Date cannot be in the past';
      }
    }
    
    if (!package) {
      errors.package = 'Package selection is required';
    }

    // If there are validation errors, return them
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    // Create new reservation
    const newReservation = {
      id: nextId++,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      date,
      package,
      phone: phone?.trim() || null,
      message: message?.trim() || null,
      serviceId: serviceId || null,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Add to reservations array
    reservations.push(newReservation);

    // Send success response
    res.status(201).json({
      success: true,
      message: 'Reservation created successfully',
      data: newReservation
    });

    // Log the reservation (in production, you might want to send email notifications)
    console.log('New reservation created:', {
      id: newReservation.id,
      name: newReservation.name,
      email: newReservation.email,
      date: newReservation.date,
      package: newReservation.package
    });

  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// GET reservation by ID
router.get('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const reservation = reservations.find(r => r.id === id);

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: 'Reservation not found'
      });
    }

    res.json({
      success: true,
      data: reservation
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching reservation',
      error: error.message
    });
  }
});

// PUT - Update reservation status
router.put('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { status, notes } = req.body;
    
    const reservationIndex = reservations.findIndex(r => r.id === id);
    
    if (reservationIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Reservation not found'
      });
    }

    // Valid status values
    const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];
    
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be one of: ' + validStatuses.join(', ')
      });
    }

    // Update reservation
    if (status) {
      reservations[reservationIndex].status = status;
    }
    
    if (notes) {
      reservations[reservationIndex].notes = notes;
    }
    
    reservations[reservationIndex].updatedAt = new Date().toISOString();

    res.json({
      success: true,
      message: 'Reservation updated successfully',
      data: reservations[reservationIndex]
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating reservation',
      error: error.message
    });
  }
});

// DELETE reservation
router.delete('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const reservationIndex = reservations.findIndex(r => r.id === id);
    
    if (reservationIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Reservation not found'
      });
    }

    const deletedReservation = reservations.splice(reservationIndex, 1)[0];

    res.json({
      success: true,
      message: 'Reservation deleted successfully',
      data: deletedReservation
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting reservation',
      error: error.message
    });
  }
});

module.exports = router;

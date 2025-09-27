const express = require('express');
const router = express.Router();

// In-memory storage for contact messages (replace with database in production)
let contactMessages = [];
let nextId = 1;

// GET all contact messages (admin use)
router.get('/', (req, res) => {
  try {
    res.json({
      success: true,
      data: contactMessages,
      count: contactMessages.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching contact messages',
      error: error.message
    });
  }
});

// POST - Create new contact message
router.post('/', (req, res) => {
  try {
    const { name, email, subject, message, phone } = req.body;

    // Validation
    const errors = {};
    
    if (!name || name.trim().length < 2) {
      errors.name = 'Name is required and must be at least 2 characters';
    }
    
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Valid email is required';
    }
    
    if (!subject || subject.trim().length < 3) {
      errors.subject = 'Subject is required and must be at least 3 characters';
    }
    
    if (!message || message.trim().length < 10) {
      errors.message = 'Message is required and must be at least 10 characters';
    }

    // If there are validation errors, return them
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    // Create new contact message
    const newMessage = {
      id: nextId++,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      subject: subject.trim(),
      message: message.trim(),
      phone: phone?.trim() || null,
      status: 'new',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Add to messages array
    contactMessages.push(newMessage);

    // Send success response
    res.status(201).json({
      success: true,
      message: 'Contact message sent successfully',
      data: newMessage
    });

    // Log the message (in production, you might want to send email notifications)
    console.log('New contact message received:', {
      id: newMessage.id,
      name: newMessage.name,
      email: newMessage.email,
      subject: newMessage.subject
    });

  } catch (error) {
    console.error('Error creating contact message:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// GET contact message by ID
router.get('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const message = contactMessages.find(m => m.id === id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }

    res.json({
      success: true,
      data: message
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching contact message',
      error: error.message
    });
  }
});

// PUT - Update message status
router.put('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { status, response } = req.body;
    
    const messageIndex = contactMessages.findIndex(m => m.id === id);
    
    if (messageIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }

    // Valid status values
    const validStatuses = ['new', 'read', 'replied', 'archived'];
    
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be one of: ' + validStatuses.join(', ')
      });
    }

    // Update message
    if (status) {
      contactMessages[messageIndex].status = status;
    }
    
    if (response) {
      contactMessages[messageIndex].response = response;
    }
    
    contactMessages[messageIndex].updatedAt = new Date().toISOString();

    res.json({
      success: true,
      message: 'Contact message updated successfully',
      data: contactMessages[messageIndex]
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating contact message',
      error: error.message
    });
  }
});

// DELETE contact message
router.delete('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const messageIndex = contactMessages.findIndex(m => m.id === id);
    
    if (messageIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }

    const deletedMessage = contactMessages.splice(messageIndex, 1)[0];

    res.json({
      success: true,
      message: 'Contact message deleted successfully',
      data: deletedMessage
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting contact message',
      error: error.message
    });
  }
});

module.exports = router;

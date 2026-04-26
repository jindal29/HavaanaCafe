const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// @route   POST /api/contact
// @desc    Submit a contact message
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate inputs
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Please provide all details' });
    }

    const newContact = new Contact({
      name,
      email,
      message,
    });

    await newContact.save();

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({ message: 'Server error, could not send message' });
  }
});

module.exports = router;

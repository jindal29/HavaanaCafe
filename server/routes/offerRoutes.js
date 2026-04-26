const express = require('express');
const router = express.Router();
const Offer = require('../models/Offer');

// @route   GET /api/offers
// @desc    Get all active offers
// @access  Public
router.get('/', async (req, res) => {
  try {
    const offers = await Offer.find({ isActive: true });
    res.json(offers);
  } catch (error) {
    console.error('Error fetching offers:', error);
    res.status(500).json({ message: 'Server Error occurred while fetching offers.' });
  }
});

module.exports = router;

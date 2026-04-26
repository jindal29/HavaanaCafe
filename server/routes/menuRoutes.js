const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

// @route   GET /api/menu
// @desc    Get all menu items
// @access  Public
router.get('/', async (req, res) => {
  try {
    const items = await MenuItem.find({ isAvailable: true });
    res.json(items);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).json({ message: 'Server Error occurred while fetching menu.' });
  }
});

module.exports = router;

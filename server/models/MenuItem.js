const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Coffee', 'Snacks', 'Desserts', 'Other'],
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=400&auto=format&fit=crop',
  },
  isAvailable: {
    type: Boolean,
    default: true,
  }
}, {
  timestamps: true,
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;

const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  iconName: {
    type: String,
    required: true,
  },
  bgGradient: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  }
}, {
  timestamps: true,
});

const Offer = mongoose.model('Offer', offerSchema);

module.exports = Offer;

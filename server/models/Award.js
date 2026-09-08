const mongoose = require('mongoose');

const AwardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  issuer: {
    type: String,
    required: true,
    trim: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  category: {
    type: String,
    default: 'National / State Recognition',
  },
  icon: {
    type: String,
    default: 'Trophy',
  },
  certificateUrl: {
    type: String,
    trim: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

module.exports = mongoose.models.Award || mongoose.model('Award', AwardSchema);

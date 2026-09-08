const mongoose = require('mongoose');

const WorkshopSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    default: 'Resource Person',
  },
  type: {
    type: String,
    default: 'Workshop',
  },
  date: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    default: '1 Week',
  },
  institution: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  posterUrl: {
    type: String,
    trim: true,
  },
  certificateUrl: {
    type: String,
    trim: true,
  },
  isPublished: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

module.exports = mongoose.models.Workshop || mongoose.model('Workshop', WorkshopSchema);

const mongoose = require('mongoose');

const WorkshopSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    default: 'Organized / Convener',
    trim: true,
  },
  type: {
    type: String,
    default: 'Workshop',
    trim: true,
  },
  date: {
    type: String,
    default: () => new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    trim: true,
  },
  duration: {
    type: String,
    default: '1 Week',
    trim: true,
  },
  institution: {
    type: String,
    default: 'Maharashtra Institute of Technology, Chhatrapati Sambhajinagar',
    trim: true,
  },
  description: {
    type: String,
    default: '',
    trim: true,
  },
  posterUrl: {
    type: String,
    default: '',
    trim: true,
  },
  certificateUrl: {
    type: String,
    default: '',
    trim: true,
  },
  isPublished: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

module.exports = mongoose.models.Workshop || mongoose.model('Workshop', WorkshopSchema);

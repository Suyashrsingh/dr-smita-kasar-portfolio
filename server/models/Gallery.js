const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    default: 'Conferences',
  },
  imageUrl: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: String,
    default: () => new Date().toISOString().split('T')[0],
  },
  description: {
    type: String,
    trim: true,
  },
  location: {
    type: String,
    trim: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

module.exports = mongoose.models.Gallery || mongoose.model('Gallery', GallerySchema);

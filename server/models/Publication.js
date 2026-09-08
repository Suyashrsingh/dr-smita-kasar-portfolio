const mongoose = require('mongoose');

const PublicationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  authors: {
    type: String,
    required: true,
    trim: true,
  },
  journal: {
    type: String,
    required: true,
    trim: true,
  },
  year: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ['Journal', 'Conference', 'Book Chapter', 'Patent', 'Review'],
    default: 'Journal',
  },
  doi: {
    type: String,
    trim: true,
  },
  pdfUrl: {
    type: String,
    trim: true,
  },
  abstract: {
    type: String,
    trim: true,
  },
  citations: {
    type: Number,
    default: 0,
  },
  volume: String,
  issue: String,
  pages: String,
  featured: {
    type: Boolean,
    default: false,
  },
  isPublished: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

module.exports = mongoose.models.Publication || mongoose.model('Publication', PublicationSchema);

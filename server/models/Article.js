const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    default: 'Lecture Notes & Material',
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    default: 'Dr. Smita Kasar',
  },
  date: {
    type: String,
    default: () => new Date().toISOString().split('T')[0],
  },
  attachmentUrl: {
    type: String,
    trim: true,
  },
  attachmentName: {
    type: String,
    trim: true,
  },
  attachmentType: {
    type: String,
    trim: true,
  },
  tags: [String],
  isPublished: {
    type: Boolean,
    default: true,
  },
  viewsCount: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

module.exports = mongoose.models.Article || mongoose.model('Article', ArticleSchema);

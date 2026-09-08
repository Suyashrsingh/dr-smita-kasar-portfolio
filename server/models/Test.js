const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    default: '',
    trim: true,
  },
  options: [{
    type: String,
    trim: true,
  }],
  correctAnswer: {
    type: Number, // 0-indexed index of option
    default: 0,
  },
  explanation: {
    type: String,
    default: '',
  },
  marks: {
    type: Number,
    default: 1,
  },
});

const TestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  subject: {
    type: String,
    required: true,
    default: 'Computer Science & AI',
  },
  description: {
    type: String,
    trim: true,
  },
  targetAudience: {
    type: String,
    default: 'UG / PG Students & Research Scholars',
  },
  durationMinutes: {
    type: Number,
    default: 15,
  },
  passMarks: {
    type: Number,
    default: 6,
  },
  isPublished: {
    type: Boolean,
    default: true,
  },
  isScheduled: {
    type: Boolean,
    default: false,
  },
  startTime: {
    type: Date,
    default: null,
  },
  endTime: {
    type: Date,
    default: null,
  },
  targetClass: {
    type: String,
    default: 'All Classes / CSE',
  },
  questions: [QuestionSchema],
  submissionsCount: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

module.exports = mongoose.models.Test || mongoose.model('Test', TestSchema);


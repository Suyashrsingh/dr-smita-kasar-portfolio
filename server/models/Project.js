const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    default: 'Principal Investigator (PI)',
  },
  fundingAgency: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Ongoing', 'Completed', 'Sanctioned'],
    default: 'Completed',
  },
  description: {
    type: String,
    trim: true,
  },
  domain: {
    type: String,
    default: 'Artificial Intelligence & Healthcare',
  },
  isPublished: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

module.exports = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

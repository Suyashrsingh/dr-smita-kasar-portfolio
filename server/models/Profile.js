const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Dr. Smita Lalit Kasar',
  },
  title: {
    type: String,
    default: 'Professor & Head, Department of Computer Science & Engineering',
  },
  shortBio: {
    type: String,
    default: 'Distinguished academician, researcher, and author with over 24+ years of expertise in Computer Science and Engineering, specializing in Applied Artificial Intelligence, Machine Learning, Healthcare Informatics, and Blockchain Security.',
  },
  fullBio: {
    type: String,
    default: 'Dr. Smita Lalit Kasar is currently serving as Professor and Head of the Department of Computer Science & Engineering at Maharashtra Institute of Technology (MIT), Chhatrapati Sambhajinagar (Aurangabad), Maharashtra. She holds a Ph.D. in Computer Science & Engineering from Dr. Babasaheb Ambedkar Marathwada University (Dr. BAMU). Recognized with the Sir M. Visvesvaraya Outstanding Engineer Award 2023, she is an IETE Fellow and recognized Ph.D. research guide.',
  },
  affiliation: {
    department: { type: String, default: 'Department of Computer Science & Engineering' },
    institution: { type: String, default: 'Maharashtra Institute of Technology (MIT), Chhatrapati Sambhajinagar' },
    university: { type: String, default: 'Dr. Babasaheb Ambedkar Marathwada University (Dr. BAMU)' },
    designation: { type: String, default: 'Professor & Head' },
  },
  contact: {
    email: { type: String, default: 'smitakasar@gmail.com' },
    alternateEmail: { type: String, default: 'smita.kasar@mit.asia' },
    phone: { type: String, default: '+91 9923432229' },
    landline: { type: String, default: '0240 - 2375270' },
    office: { type: String, default: 'HOD Cabin, Dept. of Computer Science & Engineering, Maharashtra Institute of Technology, Beed Bypass Road, Chhatrapati Sambhajinagar - 431010, Maharashtra, India' },
    residence: { type: String, default: "06, 'Shripad', Silver Oaks Villas, Near Alpine Hospital, Behind Atharva Royal, Beed Bypass Road, Chhatrapati Sambhajinagar - 431010, Maharashtra, India" }
  },
  socialLinks: {
    scopus: { type: String, default: 'https://www.scopus.com/authid/detail.url?authorId=55370475800' },
    orcid: { type: String, default: 'https://orcid.org/0000-0002-6441-9658' },
    googleScholar: { type: String, default: 'https://scholar.google.co.in/citations?user=drsmitakasar' },
    researchGate: { type: String, default: 'https://www.researchgate.net/profile/Smita-Kasar' },
    linkedin: { type: String, default: 'https://www.linkedin.com/in/dr-smita-kasar' },
    github: { type: String, default: 'https://github.com/drsmitakasar' },
  },
  stats: {
    experienceYears: { type: Number, default: 24 },
    publicationsCount: { type: Number, default: 45 },
    citationsCount: { type: Number, default: 350 },
    hIndex: { type: Number, default: 11 },
    i10Index: { type: Number, default: 14 },
    patentsCount: { type: Number, default: 4 },
    phdScholarsGuided: { type: Number, default: 8 },
  },
  resumeUrl: {
    type: String,
    default: '/Dr_Smita_Kasar_Resume.pdf',
  },
  avatarUrl: {
    type: String,
    default: '/smita-kasar.jpg',
  },
  education: {
    type: Array,
    default: [],
  },
  experience: {
    type: Array,
    default: [],
  },
  researchAreas: {
    type: Array,
    default: [],
  },
}, { timestamps: true });

module.exports = mongoose.models.Profile || mongoose.model('Profile', ProfileSchema);

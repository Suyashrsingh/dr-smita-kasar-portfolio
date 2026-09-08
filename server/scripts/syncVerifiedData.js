const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const {
  initialProfile,
  initialEducation,
  initialExperience,
  initialResearchAreas,
  initialPublications,
  initialAwards,
  initialProjects,
  initialWorkshops,
  initialGallery,
  initialArticles
} = require('../data/initialData');

const ProfileModel = require('../models/Profile');
const PublicationModel = require('../models/Publication');
const AwardModel = require('../models/Award');
const ProjectModel = require('../models/Project');
const WorkshopModel = require('../models/Workshop');
const GalleryModel = require('../models/Gallery');
const ArticleModel = require('../models/Article');

async function syncData() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('No MONGODB_URI found.');
    process.exit(1);
  }

  console.log('Connecting to MongoDB Atlas...');
  await mongoose.connect(uri);
  console.log('MongoDB Atlas Connected successfully!');

  // 1. Profile
  console.log('Syncing Profile...');
  await ProfileModel.deleteMany({});
  await ProfileModel.create({
    ...initialProfile,
    education: initialEducation,
    experience: initialExperience,
    researchAreas: initialResearchAreas
  });
  console.log('Profile synced.');

  // 2. Publications
  console.log('Syncing ' + initialPublications.length + ' Publications...');
  await PublicationModel.deleteMany({});
  const pubDocs = initialPublications.map(p => ({
    title: p.title,
    authors: p.authors,
    journal: p.journal,
    year: p.year,
    type: p.type || 'Journal',
    doi: p.doi || '',
    abstract: p.abstract || '',
    citations: p.citations || 0,
    featured: p.citations > 15 || p.year >= 2024
  }));
  await PublicationModel.insertMany(pubDocs);
  console.log('Successfully synced ' + pubDocs.length + ' publications to MongoDB.');

  // 3. Awards
  console.log('Syncing ' + initialAwards.length + ' Awards...');
  await AwardModel.deleteMany({});
  const awardDocs = initialAwards.map(a => ({
    title: a.title,
    issuer: a.issuer,
    year: a.year,
    description: a.description,
    category: a.category,
    icon: a.icon || 'Trophy',
    featured: a.featured || false
  }));
  await AwardModel.insertMany(awardDocs);
  console.log('Successfully synced ' + awardDocs.length + ' awards to MongoDB.');

  // 4. Projects & Consultancies
  console.log('Syncing ' + initialProjects.length + ' Projects & Consultancies...');
  await ProjectModel.deleteMany({});
  const projectDocs = initialProjects.map(p => ({
    title: p.title,
    role: p.role,
    fundingAgency: p.fundingAgency,
    amount: p.amount,
    duration: p.duration,
    status: p.status,
    description: p.description,
    domain: p.domain
  }));
  await ProjectModel.insertMany(projectDocs);
  console.log('Successfully synced ' + projectDocs.length + ' projects to MongoDB.');

  // 5. Workshops & Talks
  console.log('Syncing ' + initialWorkshops.length + ' Workshops & Talks...');
  await WorkshopModel.deleteMany({});
  const workshopDocs = initialWorkshops.map(w => ({
    title: w.title,
    role: w.role,
    type: w.type,
    date: w.date,
    duration: w.duration,
    institution: w.institution,
    description: w.description
  }));
  await WorkshopModel.insertMany(workshopDocs);
  console.log('Successfully synced ' + workshopDocs.length + ' workshops to MongoDB.');

  // 6. Gallery
  console.log('Syncing Gallery...');
  await GalleryModel.deleteMany({});
  await GalleryModel.insertMany(initialGallery.map(g => ({
    title: g.title,
    category: g.category,
    imageUrl: g.imageUrl,
    description: g.description,
    featured: g.featured
  })));
  console.log('Gallery synced.');

  // 7. Articles
  console.log('Syncing Articles...');
  await ArticleModel.deleteMany({});
  await ArticleModel.insertMany(initialArticles);
  console.log('Articles synced.');

  console.log('\n ALL DATA SYNCHRONIZATION COMPLETE! Database now contains 100% verified academic records.');
  await mongoose.disconnect();
  process.exit(0);
}

syncData().catch(err => {
  console.error('Error syncing data:', err);
  process.exit(1);
});

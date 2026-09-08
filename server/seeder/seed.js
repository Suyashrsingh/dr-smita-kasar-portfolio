require('dotenv').config();
const mongoose = require('mongoose');
const { connectDB } = require('../config/db');
const Admin = require('../models/Admin');
const Profile = require('../models/Profile');
const Publication = require('../models/Publication');
const Award = require('../models/Award');
const Workshop = require('../models/Workshop');
const Project = require('../models/Project');
const Gallery = require('../models/Gallery');
const Message = require('../models/Message');
const Test = require('../models/Test');
const Article = require('../models/Article');

const {
  initialProfile,
  initialPublications,
  initialAwards,
  initialProjects,
  initialWorkshops,
  initialGallery,
  initialMessages,
  initialTests,
  initialArticles
} = require('../data/initialData');

const seedData = async () => {
  console.log('🌱 [Seeder] Starting database seeding for Dr. Smita Kasar Portfolio...');
  
  const connected = await connectDB();
  if (!connected) {
    console.log('ℹ️  [Seeder] MongoDB Atlas not connected. Memory store is active with default seeded records.');
    process.exit(0);
  }

  try {
    // 1. Admin account
    const adminEmail = (process.env.ADMIN_EMAIL || 'admin@drsmitakasar.edu').toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    
    await Admin.deleteMany({ email: adminEmail });
    await Admin.create({
      email: adminEmail,
      password: adminPassword,
      name: 'Dr. Smita Kasar',
      role: 'admin'
    });
    console.log(`✅ [Seeder] Admin user seeded: ${adminEmail}`);

    // 2. Profile
    await Profile.deleteMany({});
    await Profile.create(initialProfile);
    console.log('✅ [Seeder] Profile & contact details seeded');

    // 3. Publications
    await Publication.deleteMany({});
    await Publication.insertMany(initialPublications.map(({ id, ...rest }) => rest));
    console.log(`✅ [Seeder] ${initialPublications.length} Publications seeded`);

    // 4. Awards
    await Award.deleteMany({});
    await Award.insertMany(initialAwards.map(({ id, ...rest }) => rest));
    console.log(`✅ [Seeder] ${initialAwards.length} Awards seeded (including Sir M. Visvesvaraya Award)`);

    // 5. Workshops & FDPs
    await Workshop.deleteMany({});
    await Workshop.insertMany(initialWorkshops.map(({ id, ...rest }) => rest));
    console.log(`✅ [Seeder] ${initialWorkshops.length} Workshops & FDPs seeded`);

    // 6. Research Projects
    await Project.deleteMany({});
    await Project.insertMany(initialProjects.map(({ id, ...rest }) => rest));
    console.log(`✅ [Seeder] ${initialProjects.length} Research Projects seeded`);

    // 7. Gallery
    await Gallery.deleteMany({});
    await Gallery.insertMany(initialGallery.map(({ id, ...rest }) => rest));
    console.log(`✅ [Seeder] ${initialGallery.length} Gallery items seeded`);

    // 8. Contact Messages
    await Message.deleteMany({});
    await Message.insertMany(initialMessages.map(({ id, ...rest }) => rest));
    console.log(`✅ [Seeder] Initial messages seeded`);

    // 9. Online Tests & Assessments
    await Test.deleteMany({});
    await Test.insertMany(initialTests.map(({ id, ...rest }) => rest));
    console.log(`✅ [Seeder] ${initialTests.length} Online Tests & Quizzes seeded`);

    // 10. Academic Bulletins & Lecture Notes
    await Article.deleteMany({});
    await Article.insertMany(initialArticles.map(({ id, ...rest }) => rest));
    console.log(`✅ [Seeder] ${initialArticles.length} Academic Notices & Study Notes seeded`);

    console.log('🎉 [Seeder] MongoDB Atlas database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ [Seeder] Error during database seeding:', error);
    process.exit(1);
  }
};

seedData();

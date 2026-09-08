const mongoose = require('mongoose');
const { getStatus, connectDB } = require('../config/db');
const {
  initialProfile,
  initialEducation,
  initialExperience,
  initialResearchAreas,
  initialPublications,
  initialAwards,
  initialWorkshops,
  initialProjects,
  initialGallery,
  initialArticles,
  initialTests,
  initialMessages
} = require('./initialData');

// Mongoose Model imports
const ProfileModel = require('../models/Profile');
const PublicationModel = require('../models/Publication');
const AwardModel = require('../models/Award');
const WorkshopModel = require('../models/Workshop');
const ProjectModel = require('../models/Project');
const GalleryModel = require('../models/Gallery');
const MessageModel = require('../models/Message');
const TestModel = require('../models/Test');
const TestSubmissionModel = require('../models/TestSubmission');
const ArticleModel = require('../models/Article');

const MetaModel = mongoose.models.SystemMeta || mongoose.model('SystemMeta', new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  value: mongoose.Schema.Types.Mixed
}, { timestamps: true }));

let isSeeding = false;
const autoSeedIfEmpty = async () => {
  if (mongoose.connection.readyState !== 1 || isSeeding) return;
  isSeeding = true;
  try {
    const initialized = await MetaModel.findOne({ key: 'database_initialized' }).lean();
    if (initialized) {
      // Database has already been initialized. NEVER re-insert deleted records!
      return;
    }

    // Check if database already has data
    const pubCount = await PublicationModel.countDocuments();
    if (pubCount > 0) {
      await MetaModel.create({ key: 'database_initialized', value: true });
      return;
    }

    console.log('🌱 [MongoDB Atlas] Initializing one-time default dataset...');
    if (initialPublications && initialPublications.length > 0) {
      await PublicationModel.insertMany(initialPublications.map(({ id, _id, ...rest }) => rest));
    }
    if (initialAwards && initialAwards.length > 0) {
      await AwardModel.insertMany(initialAwards.map(({ id, _id, ...rest }) => rest));
    }
    if (initialWorkshops && initialWorkshops.length > 0) {
      await WorkshopModel.insertMany(initialWorkshops.map(({ id, _id, ...rest }) => rest));
    }
    if (initialProjects && initialProjects.length > 0) {
      await ProjectModel.insertMany(initialProjects.map(({ id, _id, ...rest }) => rest));
    }
    if (initialGallery && initialGallery.length > 0) {
      await GalleryModel.insertMany(initialGallery.map(({ id, _id, ...rest }) => rest));
    }
    if (initialArticles && initialArticles.length > 0) {
      await ArticleModel.insertMany(initialArticles.map(({ id, _id, ...rest }) => rest));
    }
    if (initialTests && initialTests.length > 0) {
      await TestModel.insertMany(initialTests.map(({ id, _id, ...rest }) => rest));
    }
    if (initialProfile) {
      await ProfileModel.create(initialProfile);
    }

    await MetaModel.create({ key: 'database_initialized', value: true });
    console.log('✅ [MongoDB Atlas] Database one-time initialization complete.');
  } catch (err) {
    console.warn('⚠️ [MongoDB Atlas] Auto-seed notice:', err.message);
  } finally {
    isSeeding = false;
  }
};

const ensureDb = async () => {
  if (mongoose.connection.readyState !== 1) {
    try {
      await connectDB();
      if (mongoose.connection.readyState === 1) {
        await autoSeedIfEmpty();
      }
    } catch (err) {
      // Silent error; fallback data will be used
    }
  }
};

const buildQuery = (id) => {
  if (!id) return { _id: null };
  if (id instanceof mongoose.Types.ObjectId) return { _id: id };
  const strId = String(id).trim();
  if (mongoose.Types.ObjectId.isValid(strId) && String(new mongoose.Types.ObjectId(strId)) === strId) {
    return { _id: new mongoose.Types.ObjectId(strId) };
  }
  return { $or: [{ _id: strId }, { id: strId }] };
};

const formatDoc = (doc) => {
  if (!doc) return null;
  const obj = doc.toObject ? doc.toObject() : { ...doc };
  if (obj._id) {
    obj.id = obj._id.toString();
    obj._id = obj._id.toString();
  }
  return obj;
};

const formatDocs = (docs) => {
  if (!docs || !Array.isArray(docs)) return [];
  return docs.map(formatDoc);
};

// High-Speed In-Memory Cache with 30s TTL
const queryCache = {
  data: new Map(),
  get(key) {
    const item = this.data.get(key);
    if (item && Date.now() - item.time < 30000) {
      return item.val;
    }
    return null;
  },
  set(key, val) {
    this.data.set(key, { val, time: Date.now() });
  },
  invalidate(prefix) {
    if (!prefix) {
      this.data.clear();
      return;
    }
    for (const key of this.data.keys()) {
      if (key.startsWith(prefix) || key.startsWith('stats')) {
        this.data.delete(key);
      }
    }
  }
};

const isDbConnected = () => mongoose.connection.readyState === 1 || getStatus();

const store = {
  // ==================== Profile ====================
  async getProfile() {
    const cached = queryCache.get('profile');
    if (cached) return cached;
    await ensureDb();
    if (mongoose.connection.readyState !== 1) {
      return initialProfile;
    }
    try {
      let p = await ProfileModel.findOne().lean();
      if (!p) {
        p = await ProfileModel.create(initialProfile);
      }
      const res = formatDoc(p) || initialProfile;
      queryCache.set('profile', res);
      return res;
    } catch (e) {
      return initialProfile;
    }
  },

  async updateProfile(updates) {
    await ensureDb();
    if (mongoose.connection.readyState !== 1) {
      Object.assign(initialProfile, updates);
      queryCache.invalidate('profile');
      return initialProfile;
    }
    let p = await ProfileModel.findOneAndUpdate({}, { $set: updates }, { new: true, upsert: true }).lean();
    queryCache.invalidate('profile');
    return formatDoc(p);
  },

  getEducation: (p) => (p?.education && p.education.length > 0 ? p.education : initialEducation),
  getExperience: (p) => (p?.experience && p.experience.length > 0 ? p.experience : initialExperience),
  getResearchAreas: (p) => (p?.researchAreas && p.researchAreas.length > 0 ? p.researchAreas : initialResearchAreas),

  // ==================== Publications ====================
  async getPublications(query = {}, isAdmin = false) {
    const cacheKey = 'pubs_' + isAdmin + '_' + JSON.stringify(query);
    const cached = queryCache.get(cacheKey);
    if (cached) return cached;
    await ensureDb();
    if (mongoose.connection.readyState !== 1) {
      return initialPublications;
    }
    try {
      const filter = {};
      if (!isAdmin) filter.isPublished = { $ne: false };
      if (query.type && query.type !== 'All') filter.type = query.type;
      if (query.year) filter.year = Number(query.year);
      if (query.search) {
        filter.$or = [
          { title: { $regex: query.search, $options: 'i' } },
          { authors: { $regex: query.search, $options: 'i' } },
          { journal: { $regex: query.search, $options: 'i' } }
        ];
      }
      const docs = await PublicationModel.find(filter).sort({ year: -1, createdAt: -1 }).lean();
      const res = formatDocs(docs);
      queryCache.set(cacheKey, res);
      return res;
    } catch (e) {
      return initialPublications;
    }
  },

  async createPublication(data) {
    await ensureDb();
    queryCache.invalidate('pubs');
    if (mongoose.connection.readyState !== 1) {
      const item = { id: 'pub-' + Date.now(), isPublished: true, ...data };
      initialPublications.unshift(item);
      return item;
    }
    const pubData = { isPublished: true, ...data };
    const created = await PublicationModel.create(pubData);
    const formatted = formatDoc(created);
    initialPublications.unshift(formatted);
    return formatted;
  },

  async updatePublication(id, updates) {
    await ensureDb();
    queryCache.invalidate('pubs');
    const idx = initialPublications.findIndex(p => p.id === id || p._id === id);
    if (idx !== -1) Object.assign(initialPublications[idx], updates);
    if (mongoose.connection.readyState !== 1) {
      return idx !== -1 ? initialPublications[idx] : null;
    }
    const updated = await PublicationModel.findOneAndUpdate(buildQuery(id), { $set: updates }, { new: true }).lean();
    return formatDoc(updated);
  },

  async togglePublishPublication(id) {
    await ensureDb();
    queryCache.invalidate('pubs');
    const idx = initialPublications.findIndex(p => p.id === id || p._id === id);
    if (idx !== -1) {
      initialPublications[idx].isPublished = initialPublications[idx].isPublished === false ? true : false;
    }
    if (mongoose.connection.readyState !== 1) {
      return idx !== -1 ? initialPublications[idx] : null;
    }
    const doc = await PublicationModel.findOne(buildQuery(id));
    if (!doc) return null;
    doc.isPublished = doc.isPublished === false ? true : false;
    await doc.save();
    return formatDoc(doc);
  },

  async deletePublication(id) {
    await ensureDb();
    queryCache.invalidate('pubs');
    const idx = initialPublications.findIndex(p => p.id === id || p._id === id);
    if (idx !== -1) initialPublications.splice(idx, 1);
    if (mongoose.connection.readyState !== 1) {
      return idx !== -1;
    }
    const res = await PublicationModel.deleteOne(buildQuery(id));
    return res.deletedCount > 0;
  },

  // ==================== Awards ====================
  async getAwards(isAdmin = false) {
    const cacheKey = 'awards_' + isAdmin;
    const cached = queryCache.get(cacheKey);
    if (cached) return cached;
    await ensureDb();
    if (mongoose.connection.readyState !== 1) {
      return initialAwards;
    }
    try {
      const filter = isAdmin ? {} : { isPublished: { $ne: false } };
      const docs = await AwardModel.find(filter).sort({ year: -1, createdAt: -1 }).lean();
      const res = formatDocs(docs);
      queryCache.set(cacheKey, res);
      return res;
    } catch (e) {
      return initialAwards;
    }
  },

  async createAward(data) {
    await ensureDb();
    queryCache.invalidate('awards');
    if (mongoose.connection.readyState !== 1) {
      const item = { id: 'awd-' + Date.now(), isPublished: true, ...data };
      initialAwards.unshift(item);
      return item;
    }
    const itemData = { isPublished: true, ...data };
    const created = await AwardModel.create(itemData);
    const formatted = formatDoc(created);
    initialAwards.unshift(formatted);
    return formatted;
  },

  async updateAward(id, updates) {
    await ensureDb();
    queryCache.invalidate('awards');
    const idx = initialAwards.findIndex(a => a.id === id || a._id === id);
    if (idx !== -1) Object.assign(initialAwards[idx], updates);
    if (mongoose.connection.readyState !== 1) {
      return idx !== -1 ? initialAwards[idx] : null;
    }
    const updated = await AwardModel.findOneAndUpdate(buildQuery(id), { $set: updates }, { new: true }).lean();
    return formatDoc(updated);
  },

  async togglePublishAward(id) {
    await ensureDb();
    queryCache.invalidate('awards');
    const idx = initialAwards.findIndex(a => a.id === id || a._id === id);
    if (idx !== -1) {
      initialAwards[idx].isPublished = initialAwards[idx].isPublished === false ? true : false;
    }
    if (mongoose.connection.readyState !== 1) {
      return idx !== -1 ? initialAwards[idx] : null;
    }
    const doc = await AwardModel.findOne(buildQuery(id));
    if (!doc) return null;
    doc.isPublished = doc.isPublished === false ? true : false;
    await doc.save();
    return formatDoc(doc);
  },

  async deleteAward(id) {
    await ensureDb();
    queryCache.invalidate('awards');
    const idx = initialAwards.findIndex(a => a.id === id || a._id === id);
    if (idx !== -1) initialAwards.splice(idx, 1);
    if (mongoose.connection.readyState !== 1) {
      return idx !== -1;
    }
    const res = await AwardModel.deleteOne(buildQuery(id));
    return res.deletedCount > 0;
  },

  // ==================== Workshops & FDPs ====================
  async getWorkshops(isAdmin = false) {
    const cacheKey = 'workshops_' + isAdmin;
    const cached = queryCache.get(cacheKey);
    if (cached) return cached;
    await ensureDb();
    if (mongoose.connection.readyState !== 1) {
      return initialWorkshops;
    }
    try {
      const filter = isAdmin ? {} : { isPublished: { $ne: false } };
      const docs = await WorkshopModel.find(filter).sort({ createdAt: -1 }).lean();
      const res = formatDocs(docs);
      queryCache.set(cacheKey, res);
      return res;
    } catch (e) {
      return initialWorkshops;
    }
  },

  async createWorkshop(data) {
    await ensureDb();
    queryCache.invalidate('workshops');
    if (mongoose.connection.readyState !== 1) {
      const item = { id: 'wkp-' + Date.now(), isPublished: true, ...data };
      initialWorkshops.unshift(item);
      return item;
    }
    const itemData = { isPublished: true, ...data };
    const created = await WorkshopModel.create(itemData);
    const formatted = formatDoc(created);
    initialWorkshops.unshift(formatted);
    return formatted;
  },

  async updateWorkshop(id, updates) {
    await ensureDb();
    queryCache.invalidate('workshops');
    const idx = initialWorkshops.findIndex(w => w.id === id || w._id === id);
    if (idx !== -1) Object.assign(initialWorkshops[idx], updates);
    if (mongoose.connection.readyState !== 1) {
      return idx !== -1 ? initialWorkshops[idx] : null;
    }
    const updated = await WorkshopModel.findOneAndUpdate(buildQuery(id), { $set: updates }, { new: true }).lean();
    return formatDoc(updated);
  },

  async togglePublishWorkshop(id) {
    await ensureDb();
    queryCache.invalidate('workshops');
    const idx = initialWorkshops.findIndex(w => w.id === id || w._id === id);
    if (idx !== -1) {
      initialWorkshops[idx].isPublished = initialWorkshops[idx].isPublished === false ? true : false;
    }
    if (mongoose.connection.readyState !== 1) {
      return idx !== -1 ? initialWorkshops[idx] : null;
    }
    const doc = await WorkshopModel.findOne(buildQuery(id));
    if (!doc) return null;
    doc.isPublished = doc.isPublished === false ? true : false;
    await doc.save();
    return formatDoc(doc);
  },

  async deleteWorkshop(id) {
    await ensureDb();
    queryCache.invalidate('workshops');
    const idx = initialWorkshops.findIndex(w => w.id === id || w._id === id);
    if (idx !== -1) initialWorkshops.splice(idx, 1);
    if (mongoose.connection.readyState !== 1) {
      return idx !== -1;
    }
    const res = await WorkshopModel.deleteOne(buildQuery(id));
    return res.deletedCount > 0;
  },

  // ==================== Funded Projects ====================
  async getProjects(isAdmin = false) {
    const cacheKey = 'projects_' + isAdmin;
    const cached = queryCache.get(cacheKey);
    if (cached) return cached;
    await ensureDb();
    if (mongoose.connection.readyState !== 1) {
      return initialProjects;
    }
    try {
      const filter = isAdmin ? {} : { isPublished: { $ne: false } };
      const docs = await ProjectModel.find(filter).sort({ createdAt: -1 }).lean();
      const res = formatDocs(docs);
      queryCache.set(cacheKey, res);
      return res;
    } catch (e) {
      return initialProjects;
    }
  },

  async createProject(data) {
    await ensureDb();
    queryCache.invalidate('projects');
    if (mongoose.connection.readyState !== 1) {
      const item = { id: 'prj-' + Date.now(), isPublished: true, ...data };
      initialProjects.unshift(item);
      return item;
    }
    const itemData = { isPublished: true, ...data };
    const created = await ProjectModel.create(itemData);
    const formatted = formatDoc(created);
    initialProjects.unshift(formatted);
    return formatted;
  },

  async updateProject(id, updates) {
    await ensureDb();
    queryCache.invalidate('projects');
    const idx = initialProjects.findIndex(p => p.id === id || p._id === id);
    if (idx !== -1) Object.assign(initialProjects[idx], updates);
    if (mongoose.connection.readyState !== 1) {
      return idx !== -1 ? initialProjects[idx] : null;
    }
    const updated = await ProjectModel.findOneAndUpdate(buildQuery(id), { $set: updates }, { new: true }).lean();
    return formatDoc(updated);
  },

  async togglePublishProject(id) {
    await ensureDb();
    queryCache.invalidate('projects');
    const idx = initialProjects.findIndex(p => p.id === id || p._id === id);
    if (idx !== -1) {
      initialProjects[idx].isPublished = initialProjects[idx].isPublished === false ? true : false;
    }
    if (mongoose.connection.readyState !== 1) {
      return idx !== -1 ? initialProjects[idx] : null;
    }
    const doc = await ProjectModel.findOne(buildQuery(id));
    if (!doc) return null;
    doc.isPublished = doc.isPublished === false ? true : false;
    await doc.save();
    return formatDoc(doc);
  },

  async deleteProject(id) {
    await ensureDb();
    queryCache.invalidate('projects');
    const idx = initialProjects.findIndex(p => p.id === id || p._id === id);
    if (idx !== -1) initialProjects.splice(idx, 1);
    if (mongoose.connection.readyState !== 1) {
      return idx !== -1;
    }
    const res = await ProjectModel.deleteOne(buildQuery(id));
    return res.deletedCount > 0;
  },

  // ==================== Photo Gallery ====================
  async getGallery(category, isAdmin = false) {
    const cacheKey = 'gallery_' + isAdmin + '_' + (category || 'all');
    const cached = queryCache.get(cacheKey);
    if (cached) return cached;
    await ensureDb();
    if (mongoose.connection.readyState !== 1) {
      return initialGallery;
    }
    try {
      const filter = {};
      if (!isAdmin) filter.isPublished = { $ne: false };
      if (category && category !== 'All') filter.category = category;
      const docs = await GalleryModel.find(filter).sort({ createdAt: -1 }).lean();
      const res = formatDocs(docs);
      queryCache.set(cacheKey, res);
      return res;
    } catch (e) {
      return initialGallery;
    }
  },

  async createGalleryItem(data) {
    await ensureDb();
    queryCache.invalidate('gallery');
    if (mongoose.connection.readyState !== 1) {
      const item = { id: 'gal-' + Date.now(), isPublished: true, ...data };
      initialGallery.unshift(item);
      return item;
    }
    const itemData = { isPublished: true, ...data };
    const created = await GalleryModel.create(itemData);
    const formatted = formatDoc(created);
    initialGallery.unshift(formatted);
    return formatted;
  },

  async updateGalleryItem(id, updates) {
    await ensureDb();
    queryCache.invalidate('gallery');
    const idx = initialGallery.findIndex(g => g.id === id || g._id === id);
    if (idx !== -1) Object.assign(initialGallery[idx], updates);
    if (mongoose.connection.readyState !== 1) {
      return idx !== -1 ? initialGallery[idx] : null;
    }
    const updated = await GalleryModel.findOneAndUpdate(buildQuery(id), { $set: updates }, { new: true }).lean();
    return formatDoc(updated);
  },

  async togglePublishGallery(id) {
    await ensureDb();
    queryCache.invalidate('gallery');
    const idx = initialGallery.findIndex(g => g.id === id || g._id === id);
    if (idx !== -1) {
      initialGallery[idx].isPublished = initialGallery[idx].isPublished === false ? true : false;
    }
    if (mongoose.connection.readyState !== 1) {
      return idx !== -1 ? initialGallery[idx] : null;
    }
    const doc = await GalleryModel.findOne(buildQuery(id));
    if (!doc) return null;
    doc.isPublished = doc.isPublished === false ? true : false;
    await doc.save();
    return formatDoc(doc);
  },

  async deleteGalleryItem(id) {
    await ensureDb();
    queryCache.invalidate('gallery');
    const idx = initialGallery.findIndex(g => g.id === id || g._id === id);
    if (idx !== -1) initialGallery.splice(idx, 1);
    if (mongoose.connection.readyState !== 1) {
      return idx !== -1;
    }
    const res = await GalleryModel.deleteOne(buildQuery(id));
    return res.deletedCount > 0;
  },

  // ==================== Online Tests & Assessments ====================
  async getTests(isAdmin = false) {
    const cacheKey = 'tests_' + isAdmin;
    const cached = queryCache.get(cacheKey);
    if (cached) return cached;
    await ensureDb();
    if (mongoose.connection.readyState !== 1) {
      return initialTests;
    }
    try {
      const filter = isAdmin ? {} : { isPublished: { $ne: false } };
      const docs = await TestModel.find(filter).sort({ createdAt: -1 }).lean();
      const res = formatDocs(docs);
      queryCache.set(cacheKey, res);
      return res;
    } catch (e) {
      return initialTests;
    }
  },

  async getTestById(id) {
    await ensureDb();
    if (mongoose.connection.readyState !== 1) {
      return initialTests.find(t => t.id === id || t._id === id) || initialTests[0];
    }
    try {
      const doc = await TestModel.findOne(buildQuery(id)).lean();
      return formatDoc(doc) || initialTests[0];
    } catch (e) {
      return initialTests[0];
    }
  },

  async createTest(data) {
    await ensureDb();
    queryCache.invalidate('tests');
    if (mongoose.connection.readyState !== 1) {
      const item = { id: 'tst-' + Date.now(), isPublished: true, submissionsCount: 0, ...data };
      initialTests.unshift(item);
      return item;
    }
    const itemData = { isPublished: true, submissionsCount: 0, ...data };
    const created = await TestModel.create(itemData);
    const formatted = formatDoc(created);
    initialTests.unshift(formatted);
    return formatted;
  },

  async updateTest(id, updates) {
    await ensureDb();
    queryCache.invalidate('tests');
    const idx = initialTests.findIndex(t => t.id === id || t._id === id);
    if (idx !== -1) Object.assign(initialTests[idx], updates);
    if (mongoose.connection.readyState !== 1) {
      return idx !== -1 ? initialTests[idx] : null;
    }
    const updated = await TestModel.findOneAndUpdate(buildQuery(id), { $set: updates }, { new: true }).lean();
    return formatDoc(updated);
  },

  async togglePublishTest(id) {
    await ensureDb();
    queryCache.invalidate('tests');
    const idx = initialTests.findIndex(t => t.id === id || t._id === id);
    if (idx !== -1) {
      initialTests[idx].isPublished = initialTests[idx].isPublished === false ? true : false;
    }
    if (mongoose.connection.readyState !== 1) {
      return idx !== -1 ? initialTests[idx] : null;
    }
    const doc = await TestModel.findOne(buildQuery(id));
    if (!doc) return null;
    doc.isPublished = doc.isPublished === false ? true : false;
    await doc.save();
    return formatDoc(doc);
  },

  async deleteTest(id) {
    await ensureDb();
    queryCache.invalidate('tests');
    const idx = initialTests.findIndex(t => t.id === id || t._id === id);
    if (idx !== -1) initialTests.splice(idx, 1);
    if (mongoose.connection.readyState !== 1) {
      return idx !== -1;
    }
    const res = await TestModel.deleteOne(buildQuery(id));
    return res.deletedCount > 0;
  },

  async submitTest(testId, submissionData) {
    await ensureDb();
    const test = (mongoose.connection.readyState === 1)
      ? await TestModel.findOne(buildQuery(testId))
      : (initialTests.find(t => t.id === testId || t._id === testId) || initialTests[0]);
    if (!test) return null;

    let score = 0;
    const studentAnswers = submissionData.answers || {};
    const detailedResults = test.questions.map((q, qIndex) => {
      const selected = studentAnswers[qIndex];
      const isCorrect = selected !== undefined && Number(selected) === q.correctAnswer;
      if (isCorrect) score += (q.marks || 1);
      return {
        questionIndex: qIndex,
        question: q.question,
        selectedOption: selected,
        correctOption: q.correctAnswer,
        isCorrect,
        explanation: q.explanation
      };
    });

    const totalMarks = test.questions.reduce((sum, q) => sum + (q.marks || 1), 0);
    const passed = score >= (test.passMarks || Math.ceil(totalMarks * 0.4));

    if (mongoose.connection.readyState === 1) {
      const submissionDoc = await TestSubmissionModel.create({
        testId: test._id,
        testTitle: test.title,
        studentName: submissionData.studentName || 'Anonymous Scholar',
        studentEmail: submissionData.studentEmail || '',
        studentRollNo: submissionData.studentRollNo || '',
        score,
        totalMarks,
        passed,
        answers: detailedResults
      });
      test.submissionsCount = (test.submissionsCount || 0) + 1;
      await test.save();
      return {
        submissionId: submissionDoc._id.toString(),
        score,
        totalMarks,
        passed,
        percentage: ((score / totalMarks) * 100).toFixed(1),
        results: detailedResults
      };
    }

    return {
      submissionId: 'sub-' + Date.now(),
      score,
      totalMarks,
      passed,
      percentage: ((score / totalMarks) * 100).toFixed(1),
      results: detailedResults
    };
  },

  async getTestSubmissions(testId) {
    await ensureDb();
    if (mongoose.connection.readyState !== 1) return [];
    try {
      const docs = await TestSubmissionModel.find({ testId }).sort({ createdAt: -1 }).lean();
      return formatDocs(docs);
    } catch(e) {
      return [];
    }
  },

  async getAllTestSubmissions() {
    await ensureDb();
    if (mongoose.connection.readyState !== 1) return [];
    try {
      const docs = await TestSubmissionModel.find().sort({ createdAt: -1 }).lean();
      return formatDocs(docs);
    } catch(e) {
      return [];
    }
  },

  async deleteTestSubmission(subId) {
    await ensureDb();
    if (mongoose.connection.readyState !== 1) return true;
    const res = await TestSubmissionModel.deleteOne(buildQuery(subId));
    return res.deletedCount > 0;
  },

  // ==================== Study Articles / Notes ====================
  async getArticles(category, isAdmin = false) {
    const cacheKey = 'articles_' + isAdmin + '_' + (category || 'all');
    const cached = queryCache.get(cacheKey);
    if (cached) return cached;
    await ensureDb();
    if (mongoose.connection.readyState !== 1) {
      return initialArticles;
    }
    try {
      const filter = {};
      if (!isAdmin) filter.isPublished = { $ne: false };
      if (category && category !== 'All') filter.category = category;
      const docs = await ArticleModel.find(filter).sort({ createdAt: -1 }).lean();
      const res = formatDocs(docs);
      queryCache.set(cacheKey, res);
      return res;
    } catch (e) {
      return [];
    }
  },

  async createArticle(data) {
    await ensureDb();
    queryCache.invalidate('articles');
    if (mongoose.connection.readyState !== 1) {
      const item = { id: 'art-' + Date.now(), isPublished: true, viewsCount: 0, ...data };
      initialArticles.unshift(item);
      return item;
    }
    const itemData = { isPublished: true, viewsCount: 0, ...data };
    const created = await ArticleModel.create(itemData);
    const formatted = formatDoc(created);
    initialArticles.unshift(formatted);
    return formatted;
  },

  async updateArticle(id, updates) {
    await ensureDb();
    queryCache.invalidate('articles');
    const idx = initialArticles.findIndex(a => a.id === id || a._id === id);
    if (idx !== -1) Object.assign(initialArticles[idx], updates);
    if (mongoose.connection.readyState !== 1) {
      return idx !== -1 ? initialArticles[idx] : null;
    }
    const updated = await ArticleModel.findOneAndUpdate(buildQuery(id), { $set: updates }, { new: true }).lean();
    return formatDoc(updated);
  },

  async togglePublishArticle(id) {
    await ensureDb();
    queryCache.invalidate('articles');
    const idx = initialArticles.findIndex(a => a.id === id || a._id === id);
    if (idx !== -1) {
      initialArticles[idx].isPublished = initialArticles[idx].isPublished === false ? true : false;
    }
    if (mongoose.connection.readyState !== 1) {
      return idx !== -1 ? initialArticles[idx] : null;
    }
    const doc = await ArticleModel.findOne(buildQuery(id));
    if (!doc) return null;
    doc.isPublished = doc.isPublished === false ? true : false;
    await doc.save();
    return formatDoc(doc);
  },

  async deleteArticle(id) {
    await ensureDb();
    queryCache.invalidate('articles');
    const idx = initialArticles.findIndex(a => a.id === id || a._id === id);
    if (idx !== -1) initialArticles.splice(idx, 1);
    if (mongoose.connection.readyState !== 1) {
      return idx !== -1;
    }
    const res = await ArticleModel.deleteOne(buildQuery(id));
    return res.deletedCount > 0;
  },

  // ==================== Messages & Contact Inquiries ====================
  async getMessages() {
    await ensureDb();
    if (mongoose.connection.readyState !== 1) return initialMessages || [];
    try {
      const docs = await MessageModel.find().sort({ createdAt: -1 }).lean();
      return formatDocs(docs);
    } catch(e) {
      return initialMessages || [];
    }
  },

  async createMessage(data) {
    await ensureDb();
    queryCache.invalidate('stats');
    if (mongoose.connection.readyState !== 1) {
      const item = { id: 'msg-' + Date.now(), isRead: false, createdAt: new Date().toISOString(), ...data };
      if (!initialMessages) initialMessages = [];
      initialMessages.unshift(item);
      return item;
    }
    const itemData = { isRead: false, ...data };
    const created = await MessageModel.create(itemData);
    return formatDoc(created);
  },

  async markMessageRead(id, isRead = true) {
    await ensureDb();
    queryCache.invalidate('stats');
    if (mongoose.connection.readyState !== 1) {
      const item = (initialMessages || []).find(m => m.id === id || m._id === id);
      if (item) item.isRead = isRead;
      return item;
    }
    const updated = await MessageModel.findOneAndUpdate(buildQuery(id), { $set: { isRead } }, { new: true }).lean();
    return formatDoc(updated);
  },

  async deleteMessage(id) {
    await ensureDb();
    queryCache.invalidate('stats');
    const idx = (initialMessages || []).findIndex(m => m.id === id || m._id === id);
    if (idx !== -1) initialMessages.splice(idx, 1);
    if (mongoose.connection.readyState !== 1) {
      return idx !== -1;
    }
    const res = await MessageModel.deleteOne(buildQuery(id));
    return res.deletedCount > 0;
  },

  // ==================== Dashboard Stats ====================
  async getDashboardStats() {
    const cached = queryCache.get('stats');
    if (cached) return cached;
    await ensureDb();

    if (mongoose.connection.readyState !== 1) {
      const res = {
        publicationsCount: initialPublications.length,
        awardsCount: initialAwards.length,
        workshopsCount: initialWorkshops.length,
        projectsCount: initialProjects.length,
        galleryCount: initialGallery.length,
        testsCount: initialTests.length,
        articlesCount: initialArticles.length,
        totalMessages: (initialMessages || []).length,
        unreadMessages: (initialMessages || []).filter(m => !m.isRead).length,
        databaseStatus: 'Local In-Memory Cache (Active)'
      };
      queryCache.set('stats', res);
      return res;
    }

    try {
      const [
        publicationsCount,
        awardsCount,
        workshopsCount,
        projectsCount,
        galleryCount,
        testsCount,
        articlesCount,
        totalMessages,
        unreadMessages
      ] = await Promise.all([
        PublicationModel.countDocuments().exec(),
        AwardModel.countDocuments().exec(),
        WorkshopModel.countDocuments().exec(),
        ProjectModel.countDocuments().exec(),
        GalleryModel.countDocuments().exec(),
        TestModel.countDocuments().exec(),
        ArticleModel.countDocuments().exec(),
        MessageModel.countDocuments().exec(),
        MessageModel.countDocuments({ isRead: false }).exec()
      ]);

      const res = {
        publicationsCount,
        awardsCount,
        workshopsCount,
        projectsCount,
        galleryCount,
        testsCount,
        articlesCount,
        totalMessages,
        unreadMessages,
        databaseStatus: isDbConnected() ? 'MongoDB Atlas (Connected)' : 'Disconnected'
      };
      queryCache.set('stats', res);
      return res;
    } catch (err) {
      const res = {
        publicationsCount: initialPublications.length,
        awardsCount: initialAwards.length,
        workshopsCount: initialWorkshops.length,
        projectsCount: initialProjects.length,
        galleryCount: initialGallery.length,
        testsCount: initialTests.length,
        articlesCount: initialArticles.length,
        totalMessages: (initialMessages || []).length,
        unreadMessages: (initialMessages || []).filter(m => !m.isRead).length,
        databaseStatus: 'Resilient Cache (Active)'
      };
      queryCache.set('stats', res);
      return res;
    }
  }
};

module.exports = store;

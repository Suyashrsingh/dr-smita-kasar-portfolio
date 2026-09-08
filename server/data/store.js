const mongoose = require('mongoose');
const { getStatus, connectDB } = require('../config/db');
const {
  initialProfile,
  initialEducation,
  initialExperience,
  initialResearchAreas,
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

const ensureDb = async () => {
  if (mongoose.connection.readyState !== 1) {
    await connectDB();
  }
};

const buildQuery = (id) => {
  if (!id) return { _id: null };
  const clauses = [];
  if (mongoose.Types.ObjectId.isValid(id)) {
    clauses.push({ _id: new mongoose.Types.ObjectId(id) });
  }
  clauses.push({ id: id });
  return clauses.length === 1 ? clauses[0] : { $or: clauses };
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
    let p = await ProfileModel.findOne().lean();
    if (!p) {
      p = await ProfileModel.create(initialProfile);
    }
    const res = formatDoc(p) || initialProfile;
    queryCache.set('profile', res);
    return res;
  },

  async updateProfile(updates) {
    await ensureDb();
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
  },

  async createPublication(data) {
    await ensureDb();
    const pubData = { isPublished: true, ...data };
    const created = await PublicationModel.create(pubData);
    queryCache.invalidate('pubs');
    return formatDoc(created);
  },

  async updatePublication(id, updates) {
    await ensureDb();
    const updated = await PublicationModel.findOneAndUpdate(buildQuery(id), { $set: updates }, { new: true }).lean();
    queryCache.invalidate('pubs');
    return formatDoc(updated);
  },

  async togglePublishPublication(id) {
    await ensureDb();
    const doc = await PublicationModel.findOne(buildQuery(id));
    if (!doc) return null;
    doc.isPublished = doc.isPublished === false ? true : false;
    await doc.save();
    queryCache.invalidate('pubs');
    return formatDoc(doc);
  },

  async deletePublication(id) {
    await ensureDb();
    const res = await PublicationModel.deleteOne(buildQuery(id));
    queryCache.invalidate('pubs');
    return res.deletedCount > 0;
  },

  // ==================== Awards ====================
  async getAwards(isAdmin = false) {
    const cacheKey = 'awards_' + isAdmin;
    const cached = queryCache.get(cacheKey);
    if (cached) return cached;
    await ensureDb();
    const filter = isAdmin ? {} : { isPublished: { $ne: false } };
    const docs = await AwardModel.find(filter).sort({ year: -1, createdAt: -1 }).lean();
    const res = formatDocs(docs);
    queryCache.set(cacheKey, res);
    return res;
  },

  async createAward(data) {
    await ensureDb();
    const itemData = { isPublished: true, ...data };
    const created = await AwardModel.create(itemData);
    queryCache.invalidate('awards');
    return formatDoc(created);
  },

  async updateAward(id, updates) {
    await ensureDb();
    const updated = await AwardModel.findOneAndUpdate(buildQuery(id), { $set: updates }, { new: true }).lean();
    queryCache.invalidate('awards');
    return formatDoc(updated);
  },

  async togglePublishAward(id) {
    await ensureDb();
    const doc = await AwardModel.findOne(buildQuery(id));
    if (!doc) return null;
    doc.isPublished = doc.isPublished === false ? true : false;
    await doc.save();
    return formatDoc(doc);
  },

  async deleteAward(id) {
    await ensureDb();
    const res = await AwardModel.deleteOne(buildQuery(id));
    queryCache.invalidate('awards');
    return res.deletedCount > 0;
  },

  // ==================== Workshops & FDPs ====================
  async getWorkshops(isAdmin = false) {
    const cacheKey = 'workshops_' + isAdmin;
    const cached = queryCache.get(cacheKey);
    if (cached) return cached;
    await ensureDb();
    const filter = isAdmin ? {} : { isPublished: { $ne: false } };
    const docs = await WorkshopModel.find(filter).sort({ createdAt: -1 }).lean();
    const res = formatDocs(docs);
    queryCache.set(cacheKey, res);
    return res;
  },

  async createWorkshop(data) {
    await ensureDb();
    const itemData = { isPublished: true, ...data };
    const created = await WorkshopModel.create(itemData);
    queryCache.invalidate('workshops');
    return formatDoc(created);
  },

  async updateWorkshop(id, updates) {
    await ensureDb();
    const updated = await WorkshopModel.findOneAndUpdate(buildQuery(id), { $set: updates }, { new: true }).lean();
    queryCache.invalidate('workshops');
    return formatDoc(updated);
  },

  async togglePublishWorkshop(id) {
    await ensureDb();
    const doc = await WorkshopModel.findOne(buildQuery(id));
    if (!doc) return null;
    doc.isPublished = doc.isPublished === false ? true : false;
    await doc.save();
    return formatDoc(doc);
  },

  async deleteWorkshop(id) {
    await ensureDb();
    const res = await WorkshopModel.deleteOne(buildQuery(id));
    queryCache.invalidate('workshops');
    return res.deletedCount > 0;
  },

  // ==================== Funded Projects ====================
  async getProjects(isAdmin = false) {
    const cacheKey = 'projects_' + isAdmin;
    const cached = queryCache.get(cacheKey);
    if (cached) return cached;
    await ensureDb();
    const filter = isAdmin ? {} : { isPublished: { $ne: false } };
    const docs = await ProjectModel.find(filter).sort({ createdAt: -1 }).lean();
    const res = formatDocs(docs);
    queryCache.set(cacheKey, res);
    return res;
  },

  async createProject(data) {
    await ensureDb();
    const itemData = { isPublished: true, ...data };
    const created = await ProjectModel.create(itemData);
    queryCache.invalidate('projects');
    return formatDoc(created);
  },

  async updateProject(id, updates) {
    await ensureDb();
    const updated = await ProjectModel.findOneAndUpdate(buildQuery(id), { $set: updates }, { new: true }).lean();
    queryCache.invalidate('projects');
    return formatDoc(updated);
  },

  async togglePublishProject(id) {
    await ensureDb();
    const doc = await ProjectModel.findOne(buildQuery(id));
    if (!doc) return null;
    doc.isPublished = doc.isPublished === false ? true : false;
    await doc.save();
    return formatDoc(doc);
  },

  async deleteProject(id) {
    await ensureDb();
    const res = await ProjectModel.deleteOne(buildQuery(id));
    queryCache.invalidate('projects');
    return res.deletedCount > 0;
  },

  // ==================== Photo Gallery ====================
  async getGallery(category, isAdmin = false) {
    const cacheKey = 'gallery_' + isAdmin + '_' + (category || 'all');
    const cached = queryCache.get(cacheKey);
    if (cached) return cached;
    await ensureDb();
    const filter = {};
    if (!isAdmin) filter.isPublished = { $ne: false };
    if (category && category !== 'All') filter.category = category;
    const docs = await GalleryModel.find(filter).sort({ createdAt: -1 }).lean();
    const res = formatDocs(docs);
    queryCache.set(cacheKey, res);
    return res;
  },

  async createGalleryItem(data) {
    await ensureDb();
    const itemData = { isPublished: true, ...data };
    const created = await GalleryModel.create(itemData);
    queryCache.invalidate('gallery');
    return formatDoc(created);
  },

  async updateGalleryItem(id, updates) {
    await ensureDb();
    const updated = await GalleryModel.findOneAndUpdate(buildQuery(id), { $set: updates }, { new: true }).lean();
    queryCache.invalidate('gallery');
    return formatDoc(updated);
  },

  async togglePublishGallery(id) {
    await ensureDb();
    const doc = await GalleryModel.findOne(buildQuery(id));
    if (!doc) return null;
    doc.isPublished = doc.isPublished === false ? true : false;
    await doc.save();
    return formatDoc(doc);
  },

  async deleteGalleryItem(id) {
    await ensureDb();
    const res = await GalleryModel.deleteOne(buildQuery(id));
    queryCache.invalidate('gallery');
    return res.deletedCount > 0;
  },

  // ==================== Online Tests & Assessments ====================
  async getTests(isAdmin = false) {
    const cacheKey = 'tests_' + isAdmin;
    const cached = queryCache.get(cacheKey);
    if (cached) return cached;
    await ensureDb();
    const filter = isAdmin ? {} : { isPublished: { $ne: false } };
    const docs = await TestModel.find(filter).sort({ createdAt: -1 }).lean();
    const res = formatDocs(docs);
    queryCache.set(cacheKey, res);
    return res;
  },

  async getTestById(id) {
    await ensureDb();
    const doc = await TestModel.findOne(buildQuery(id));
    return formatDoc(doc);
  },

  async createTest(data) {
    await ensureDb();
    const itemData = { isPublished: true, submissionsCount: 0, ...data };
    const created = await TestModel.create(itemData);
    return formatDoc(created);
  },

  async updateTest(id, updates) {
    await ensureDb();
    const updated = await TestModel.findOneAndUpdate(buildQuery(id), { $set: updates }, { new: true });
    return formatDoc(updated);
  },

  async togglePublishTest(id) {
    await ensureDb();
    const doc = await TestModel.findOne(buildQuery(id));
    if (!doc) return null;
    doc.isPublished = doc.isPublished === false ? true : false;
    await doc.save();
    return formatDoc(doc);
  },

  async deleteTest(id) {
    await ensureDb();
    const res = await TestModel.deleteOne(buildQuery(id));
    return res.deletedCount > 0;
  },

  async submitTest(testId, submissionData) {
    await ensureDb();
    const test = await TestModel.findOne(buildQuery(testId));
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
      testTitle: test.title,
      studentName: submissionDoc.studentName,
      score,
      totalMarks,
      percentage: totalMarks > 0 ? ((score / totalMarks) * 100).toFixed(1) : '0',
      passed,
      detailedResults
    };
  },

  async getSubmissionsByTestId(testId) {
    await ensureDb();
    const docs = await TestSubmissionModel.find({ testId: buildQuery(testId)._id || testId }).sort({ createdAt: -1 });
    return formatDocs(docs);
  },

  async getAllSubmissions() {
    await ensureDb();
    const docs = await TestSubmissionModel.find().sort({ createdAt: -1 });
    return formatDocs(docs);
  },

  async deleteSubmission(subId) {
    await ensureDb();
    const res = await TestSubmissionModel.deleteOne(buildQuery(subId));
    return res.deletedCount > 0;
  },

  // ==================== Articles & Study Notes ====================
  async getArticles(category, isAdmin = false) {
    const cacheKey = 'articles_' + isAdmin + '_' + (category || 'all');
    const cached = queryCache.get(cacheKey);
    if (cached) return cached;
    await ensureDb();
    const filter = {};
    if (!isAdmin) filter.isPublished = { $ne: false };
    if (category && category !== 'All') filter.category = category;
    const docs = await ArticleModel.find(filter).sort({ createdAt: -1 }).lean();
    const res = formatDocs(docs);
    queryCache.set(cacheKey, res);
    return res;
  },

  async createArticle(data) {
    await ensureDb();
    const itemData = { isPublished: true, ...data };
    const created = await ArticleModel.create(itemData);
    return formatDoc(created);
  },

  async updateArticle(id, updates) {
    await ensureDb();
    const updated = await ArticleModel.findOneAndUpdate(buildQuery(id), { $set: updates }, { new: true });
    return formatDoc(updated);
  },

  async togglePublishArticle(id) {
    await ensureDb();
    const doc = await ArticleModel.findOne(buildQuery(id));
    if (!doc) return null;
    doc.isPublished = doc.isPublished === false ? true : false;
    await doc.save();
    return formatDoc(doc);
  },

  async deleteArticle(id) {
    await ensureDb();
    const res = await ArticleModel.deleteOne(buildQuery(id));
    return res.deletedCount > 0;
  },

  // ==================== Messages & Inquiries ====================
  async getMessages() {
    await ensureDb();
    const docs = await MessageModel.find().sort({ createdAt: -1 });
    return formatDocs(docs);
  },

  async createMessage(data) {
    await ensureDb();
    const created = await MessageModel.create({ isRead: false, ...data });
    return formatDoc(created);
  },

  async markMessageRead(id, isRead = true) {
    await ensureDb();
    const updated = await MessageModel.findOneAndUpdate(buildQuery(id), { $set: { isRead } }, { new: true });
    return formatDoc(updated);
  },

  async deleteMessage(id) {
    await ensureDb();
    const res = await MessageModel.deleteOne(buildQuery(id));
    return res.deletedCount > 0;
  },

  // ==================== Dashboard Stats ====================
  async getDashboardStats() {
    const cached = queryCache.get('stats');
    if (cached) return cached;
    await ensureDb();
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
      PublicationModel.countDocuments(),
      AwardModel.countDocuments(),
      WorkshopModel.countDocuments(),
      ProjectModel.countDocuments(),
      GalleryModel.countDocuments(),
      TestModel.countDocuments(),
      ArticleModel.countDocuments(),
      MessageModel.countDocuments(),
      MessageModel.countDocuments({ isRead: false })
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
  }
};

module.exports = store;

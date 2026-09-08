const { getStatus } = require('../config/db');
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
  initialMessages,
  initialTests,
  initialArticles
} = require('./initialData');

// In-Memory dynamic cache initialized with initial rich data
let profile = { ...initialProfile };
let education = [...initialEducation];
let experience = [...initialExperience];
let researchAreas = [...initialResearchAreas];
let publications = [...initialPublications];
let awards = [...initialAwards];
let projects = [...initialProjects];
let workshops = [...initialWorkshops];
let gallery = [...initialGallery];
let messages = [...initialMessages];
let tests = [...initialTests];
let articles = [...initialArticles];
let testSubmissions = [];

const genId = (prefix) => `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

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

const store = {
  // Profile
  async getProfile() {
    if (getStatus()) {
      try {
        let p = await ProfileModel.findOne();
        if (!p) {
          p = await ProfileModel.create(profile);
        }
        return p;
      } catch (err) {
        console.warn('Fallback to local store for profile:', err.message);
      }
    }
    return profile;
  },

  async updateProfile(updates) {
    if (getStatus()) {
      try {
        let p = await ProfileModel.findOneAndUpdate({}, { $set: updates }, { new: true, upsert: true });
        profile = { ...profile, ...updates };
        return p;
      } catch (err) {
        console.warn('Fallback update for profile:', err.message);
      }
    }
    profile = { ...profile, ...updates };
    return profile;
  },

  getEducation: (p) => (p?.education && p.education.length > 0 ? p.education : education),
  getExperience: (p) => (p?.experience && p.experience.length > 0 ? p.experience : experience),
  getResearchAreas: (p) => (p?.researchAreas && p.researchAreas.length > 0 ? p.researchAreas : researchAreas),

  // Publications
  async getPublications(query = {}, isAdmin = false) {
    if (getStatus()) {
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
        const pubs = await PublicationModel.find(filter).sort({ year: -1, createdAt: -1 });
        return pubs || [];
      } catch (err) {
        console.warn('Fallback for publications:', err.message);
      }
    }
    let res = [...publications];
    if (!isAdmin) {
      res = res.filter(p => p.isPublished !== false);
    }
    if (query.type && query.type !== 'All') {
      res = res.filter(p => p.type?.toLowerCase() === query.type.toLowerCase());
    }
    if (query.year) {
      res = res.filter(p => p.year === Number(query.year));
    }
    if (query.search) {
      const q = query.search.toLowerCase();
      res = res.filter(p =>
        (p.title && p.title.toLowerCase().includes(q)) ||
        (p.authors && p.authors.toLowerCase().includes(q)) ||
        (p.journal && p.journal.toLowerCase().includes(q))
      );
    }
    return res.sort((a, b) => b.year - a.year);
  },

  async createPublication(data) {
    const pubData = { isPublished: true, ...data };
    if (getStatus()) {
      try {
        const created = await PublicationModel.create(pubData);
        publications.unshift(created.toObject ? created.toObject() : created);
        return created;
      } catch (err) {
        console.warn('Fallback create publication:', err.message);
      }
    }
    const item = { id: genId('pub'), ...pubData, createdAt: new Date().toISOString() };
    publications.unshift(item);
    return item;
  },

  async updatePublication(id, updates) {
    if (getStatus()) {
      try {
        const updated = await PublicationModel.findByIdAndUpdate(id, { $set: updates }, { new: true });
        if (updated) {
          const idx = publications.findIndex(p => p._id?.toString() === id || p.id === id);
          if (idx !== -1) publications[idx] = updated.toObject ? updated.toObject() : updated;
          return updated;
        }
      } catch (err) {
        console.warn('Fallback update publication:', err.message);
      }
    }
    const idx = publications.findIndex(p => p.id === id || p._id?.toString() === id);
    if (idx !== -1) {
      publications[idx] = { ...publications[idx], ...updates };
      return publications[idx];
    }
    return null;
  },

  async togglePublishPublication(id) {
    if (getStatus()) {
      try {
        const doc = await PublicationModel.findById(id);
        if (doc) {
          doc.isPublished = !doc.isPublished;
          await doc.save();
          const idx = publications.findIndex(p => p._id?.toString() === id || p.id === id);
          if (idx !== -1) publications[idx] = doc.toObject();
          return doc;
        }
      } catch (err) {
        console.warn('Fallback toggle publication:', err.message);
      }
    }
    const idx = publications.findIndex(p => p.id === id || p._id?.toString() === id);
    const newStatus = idx !== -1 ? !publications[idx].isPublished : false;
    return this.updatePublication(id, { isPublished: newStatus });
  },

  async deletePublication(id) {
    if (getStatus()) {
      try {
        await PublicationModel.findByIdAndDelete(id);
      } catch (err) {
        console.warn('Fallback delete publication:', err.message);
      }
    }
    publications = publications.filter(p => p.id !== id && p._id?.toString() !== id);
    return true;
  },

  // Awards
  async getAwards(isAdmin = false) {
    if (getStatus()) {
      try {
        const filter = isAdmin ? {} : { isPublished: { $ne: false } };
        const docs = await AwardModel.find(filter).sort({ year: -1, createdAt: -1 });
        return docs || [];
      } catch (err) {
        console.warn('Fallback for awards:', err.message);
      }
    }
    let res = [...awards];
    if (!isAdmin) res = res.filter(a => a.isPublished !== false);
    return res.sort((a, b) => (parseInt(b.year) || 0) - (parseInt(a.year) || 0));
  },

  async createAward(data) {
    const itemData = { isPublished: true, ...data };
    if (getStatus()) {
      try {
        const created = await AwardModel.create(itemData);
        awards.unshift(created.toObject ? created.toObject() : created);
        return created;
      } catch (err) {
        console.warn('Fallback create award:', err.message);
      }
    }
    const item = { id: genId('awd'), ...itemData, createdAt: new Date().toISOString() };
    awards.unshift(item);
    return item;
  },

  async updateAward(id, updates) {
    if (getStatus()) {
      try {
        const updated = await AwardModel.findByIdAndUpdate(id, { $set: updates }, { new: true });
        if (updated) {
          const idx = awards.findIndex(a => a._id?.toString() === id || a.id === id);
          if (idx !== -1) awards[idx] = updated.toObject ? updated.toObject() : updated;
          return updated;
        }
      } catch (err) {
        console.warn('Fallback update award:', err.message);
      }
    }
    const idx = awards.findIndex(a => a.id === id || a._id?.toString() === id);
    if (idx !== -1) {
      awards[idx] = { ...awards[idx], ...updates };
      return awards[idx];
    }
    return null;
  },

  async togglePublishAward(id) {
    if (getStatus()) {
      try {
        const doc = await AwardModel.findById(id);
        if (doc) {
          doc.isPublished = !doc.isPublished;
          await doc.save();
          const idx = awards.findIndex(a => a._id?.toString() === id || a.id === id);
          if (idx !== -1) awards[idx] = doc.toObject();
          return doc;
        }
      } catch (err) {
        console.warn('Fallback toggle award:', err.message);
      }
    }
    const idx = awards.findIndex(a => a.id === id || a._id?.toString() === id);
    const newStatus = idx !== -1 ? !awards[idx].isPublished : false;
    return this.updateAward(id, { isPublished: newStatus });
  },

  async deleteAward(id) {
    if (getStatus()) {
      try {
        await AwardModel.findByIdAndDelete(id);
      } catch (err) {
        console.warn('Fallback delete award:', err.message);
      }
    }
    awards = awards.filter(a => a.id !== id && a._id?.toString() !== id);
    return true;
  },

  // Workshops
  async getWorkshops(isAdmin = false) {
    if (getStatus()) {
      try {
        const filter = isAdmin ? {} : { isPublished: { $ne: false } };
        const docs = await WorkshopModel.find(filter).sort({ createdAt: -1 });
        return docs || [];
      } catch (err) {
        console.warn('Fallback for workshops:', err.message);
      }
    }
    let res = [...workshops];
    if (!isAdmin) res = res.filter(w => w.isPublished !== false);
    return res;
  },

  async createWorkshop(data) {
    const itemData = { isPublished: true, ...data };
    if (getStatus()) {
      try {
        const created = await WorkshopModel.create(itemData);
        workshops.unshift(created.toObject ? created.toObject() : created);
        return created;
      } catch (err) {
        console.warn('Fallback create workshop:', err.message);
      }
    }
    const item = { id: genId('wkp'), ...itemData, createdAt: new Date().toISOString() };
    workshops.unshift(item);
    return item;
  },

  async updateWorkshop(id, updates) {
    if (getStatus()) {
      try {
        const updated = await WorkshopModel.findByIdAndUpdate(id, { $set: updates }, { new: true });
        if (updated) {
          const idx = workshops.findIndex(w => w._id?.toString() === id || w.id === id);
          if (idx !== -1) workshops[idx] = updated.toObject ? updated.toObject() : updated;
          return updated;
        }
      } catch (err) {
        console.warn('Fallback update workshop:', err.message);
      }
    }
    const idx = workshops.findIndex(w => w.id === id || w._id?.toString() === id);
    if (idx !== -1) {
      workshops[idx] = { ...workshops[idx], ...updates };
      return workshops[idx];
    }
    return null;
  },

  async togglePublishWorkshop(id) {
    if (getStatus()) {
      try {
        const doc = await WorkshopModel.findById(id);
        if (doc) {
          doc.isPublished = !doc.isPublished;
          await doc.save();
          const idx = workshops.findIndex(w => w._id?.toString() === id || w.id === id);
          if (idx !== -1) workshops[idx] = doc.toObject();
          return doc;
        }
      } catch (err) {
        console.warn('Fallback toggle workshop:', err.message);
      }
    }
    const idx = workshops.findIndex(w => w.id === id || w._id?.toString() === id);
    const newStatus = idx !== -1 ? !workshops[idx].isPublished : false;
    return this.updateWorkshop(id, { isPublished: newStatus });
  },

  async deleteWorkshop(id) {
    if (getStatus()) {
      try {
        await WorkshopModel.findByIdAndDelete(id);
      } catch (err) {
        console.warn('Fallback delete workshop:', err.message);
      }
    }
    workshops = workshops.filter(w => w.id !== id && w._id?.toString() !== id);
    return true;
  },

  // Projects
  async getProjects(isAdmin = false) {
    if (getStatus()) {
      try {
        const filter = isAdmin ? {} : { isPublished: { $ne: false } };
        const docs = await ProjectModel.find(filter).sort({ createdAt: -1 });
        return docs || [];
      } catch (err) {
        console.warn('Fallback for projects:', err.message);
      }
    }
    let res = [...projects];
    if (!isAdmin) res = res.filter(p => p.isPublished !== false);
    return res;
  },

  async createProject(data) {
    const itemData = { isPublished: true, ...data };
    if (getStatus()) {
      try {
        const created = await ProjectModel.create(itemData);
        projects.unshift(created.toObject ? created.toObject() : created);
        return created;
      } catch (err) {
        console.warn('Fallback create project:', err.message);
      }
    }
    const item = { id: genId('prj'), ...itemData, createdAt: new Date().toISOString() };
    projects.unshift(item);
    return item;
  },

  async updateProject(id, updates) {
    if (getStatus()) {
      try {
        const updated = await ProjectModel.findByIdAndUpdate(id, { $set: updates }, { new: true });
        if (updated) {
          const idx = projects.findIndex(p => p._id?.toString() === id || p.id === id);
          if (idx !== -1) projects[idx] = updated.toObject ? updated.toObject() : updated;
          return updated;
        }
      } catch (err) {
        console.warn('Fallback update project:', err.message);
      }
    }
    const idx = projects.findIndex(p => p.id === id || p._id?.toString() === id);
    if (idx !== -1) {
      projects[idx] = { ...projects[idx], ...updates };
      return projects[idx];
    }
    return null;
  },

  async togglePublishProject(id) {
    if (getStatus()) {
      try {
        const doc = await ProjectModel.findById(id);
        if (doc) {
          doc.isPublished = !doc.isPublished;
          await doc.save();
          const idx = projects.findIndex(p => p._id?.toString() === id || p.id === id);
          if (idx !== -1) projects[idx] = doc.toObject();
          return doc;
        }
      } catch (err) {
        console.warn('Fallback toggle project:', err.message);
      }
    }
    const idx = projects.findIndex(p => p.id === id || p._id?.toString() === id);
    const newStatus = idx !== -1 ? !projects[idx].isPublished : false;
    return this.updateProject(id, { isPublished: newStatus });
  },

  async deleteProject(id) {
    if (getStatus()) {
      try {
        await ProjectModel.findByIdAndDelete(id);
      } catch (err) {
        console.warn('Fallback delete project:', err.message);
      }
    }
    projects = projects.filter(p => p.id !== id && p._id?.toString() !== id);
    return true;
  },

  // Gallery
  async getGallery(category, isAdmin = false) {
    if (getStatus()) {
      try {
        const filter = {};
        if (!isAdmin) filter.isPublished = { $ne: false };
        if (category && category !== 'All') filter.category = category;
        const docs = await GalleryModel.find(filter).sort({ createdAt: -1 });
        return docs || [];
      } catch (err) {
        console.warn('Fallback for gallery:', err.message);
      }
    }
    let res = [...gallery];
    if (!isAdmin) res = res.filter(g => g.isPublished !== false);
    if (category && category !== 'All') {
      res = res.filter(g => g.category?.toLowerCase() === category.toLowerCase());
    }
    return res;
  },

  async createGalleryItem(data) {
    const itemData = { isPublished: true, ...data };
    if (getStatus()) {
      try {
        const created = await GalleryModel.create(itemData);
        gallery.unshift(created.toObject ? created.toObject() : created);
        return created;
      } catch (err) {
        console.warn('Fallback create gallery item:', err.message);
      }
    }
    const item = { id: genId('gal'), ...itemData, createdAt: new Date().toISOString() };
    gallery.unshift(item);
    return item;
  },

  async updateGalleryItem(id, updates) {
    if (getStatus()) {
      try {
        const updated = await GalleryModel.findByIdAndUpdate(id, { $set: updates }, { new: true });
        if (updated) {
          const idx = gallery.findIndex(g => g._id?.toString() === id || g.id === id);
          if (idx !== -1) gallery[idx] = updated.toObject ? updated.toObject() : updated;
          return updated;
        }
      } catch (err) {
        console.warn('Fallback update gallery:', err.message);
      }
    }
    const idx = gallery.findIndex(g => g.id === id || g._id?.toString() === id);
    if (idx !== -1) {
      gallery[idx] = { ...gallery[idx], ...updates };
      return gallery[idx];
    }
    return null;
  },

  async togglePublishGallery(id) {
    if (getStatus()) {
      try {
        const doc = await GalleryModel.findById(id);
        if (doc) {
          doc.isPublished = !doc.isPublished;
          await doc.save();
          const idx = gallery.findIndex(g => g._id?.toString() === id || g.id === id);
          if (idx !== -1) gallery[idx] = doc.toObject();
          return doc;
        }
      } catch (err) {
        console.warn('Fallback toggle gallery:', err.message);
      }
    }
    const idx = gallery.findIndex(g => g.id === id || g._id?.toString() === id);
    const newStatus = idx !== -1 ? !gallery[idx].isPublished : false;
    return this.updateGalleryItem(id, { isPublished: newStatus });
  },

  async deleteGalleryItem(id) {
    if (getStatus()) {
      try {
        await GalleryModel.findByIdAndDelete(id);
      } catch (err) {
        console.warn('Fallback delete gallery:', err.message);
      }
    }
    gallery = gallery.filter(g => g.id !== id && g._id?.toString() !== id);
    return true;
  },

  // Online Tests & Assessments
  async getTests(isAdmin = false) {
    if (getStatus()) {
      try {
        const filter = isAdmin ? {} : { isPublished: { $ne: false } };
        const docs = await TestModel.find(filter).sort({ createdAt: -1 });
        return docs || [];
      } catch (err) {
        console.warn('Fallback for tests:', err.message);
      }
    }
    let res = [...tests];
    if (!isAdmin) res = res.filter(t => t.isPublished !== false);
    return res;
  },

  async getTestById(id) {
    if (getStatus()) {
      try {
        const doc = await TestModel.findById(id);
        if (doc) return doc;
      } catch (err) {
        console.warn('Fallback get test by id:', err.message);
      }
    }
    return tests.find(t => t.id === id || t._id?.toString() === id);
  },

  async createTest(data) {
    const itemData = { isPublished: true, submissionsCount: 0, ...data };
    if (getStatus()) {
      try {
        const created = await TestModel.create(itemData);
        tests.unshift(created.toObject ? created.toObject() : created);
        return created;
      } catch (err) {
        console.warn('Fallback create test:', err.message);
      }
    }
    const item = { id: genId('test'), ...itemData, createdAt: new Date().toISOString() };
    tests.unshift(item);
    return item;
  },

  async updateTest(id, updates) {
    if (getStatus()) {
      try {
        const updated = await TestModel.findByIdAndUpdate(id, { $set: updates }, { new: true });
        if (updated) {
          const idx = tests.findIndex(t => t._id?.toString() === id || t.id === id);
          if (idx !== -1) tests[idx] = updated.toObject ? updated.toObject() : updated;
          return updated;
        }
      } catch (err) {
        console.warn('Fallback update test:', err.message);
      }
    }
    const idx = tests.findIndex(t => t.id === id || t._id?.toString() === id);
    if (idx !== -1) {
      tests[idx] = { ...tests[idx], ...updates };
      return tests[idx];
    }
    return null;
  },

  async togglePublishTest(id) {
    if (getStatus()) {
      try {
        const doc = await TestModel.findById(id);
        if (doc) {
          doc.isPublished = !doc.isPublished;
          await doc.save();
          const idx = tests.findIndex(t => t._id?.toString() === id || t.id === id);
          if (idx !== -1) tests[idx] = doc.toObject();
          return doc;
        }
      } catch (err) {
        console.warn('Fallback toggle test:', err.message);
      }
    }
    const idx = tests.findIndex(t => t.id === id || t._id?.toString() === id);
    const newStatus = idx !== -1 ? !tests[idx].isPublished : false;
    return this.updateTest(id, { isPublished: newStatus });
  },

  async deleteTest(id) {
    if (getStatus()) {
      try {
        await TestModel.findByIdAndDelete(id);
      } catch (err) {
        console.warn('Fallback delete test:', err.message);
      }
    }
    tests = tests.filter(t => t.id !== id && t._id?.toString() !== id);
    return true;
  },

  async submitTest(id, userAnswers, studentDetails = {}) {
    const test = await this.getTestById(id);
    if (!test) return null;

    let score = 0;
    const results = (test.questions || []).map((q, idx) => {
      const selected = userAnswers[idx];
      const isCorrect = Number(selected) === Number(q.correctAnswer);
      if (isCorrect) score += (q.marks || 1);
      return {
        question: q.question,
        selected,
        correctAnswer: q.correctAnswer,
        isCorrect,
        explanation: q.explanation
      };
    });

    const totalPossible = (test.questions || []).reduce((acc, q) => acc + (q.marks || 1), 0);
    const passed = score >= (test.passMarks || Math.ceil(totalPossible * 0.5));
    const percentage = totalPossible > 0 ? Math.round((score / totalPossible) * 100) : 0;

    const submissionData = {
      testId: test._id || test.id,
      testTitle: test.title,
      studentName: studentDetails.studentName?.trim() || 'Anonymous Student',
      studentClass: studentDetails.studentClass?.trim() || 'General Batch',
      rollNo: studentDetails.rollNo?.trim() || 'N/A',
      studentEmail: studentDetails.studentEmail?.trim() || '',
      score,
      totalPossible,
      percentage,
      passed,
      timeSpentSeconds: Number(studentDetails.timeSpentSeconds) || 0,
      answers: userAnswers,
      submittedAt: new Date()
    };

    if (getStatus()) {
      try {
        const createdSub = await TestSubmissionModel.create(submissionData);
        testSubmissions.unshift(createdSub.toObject ? createdSub.toObject() : createdSub);
      } catch (err) {
        console.warn('Fallback save test submission:', err.message);
        testSubmissions.unshift({ id: genId('sub'), ...submissionData, submittedAt: new Date().toISOString() });
      }
    } else {
      testSubmissions.unshift({ id: genId('sub'), ...submissionData, submittedAt: new Date().toISOString() });
    }

    await this.updateTest(id, { submissionsCount: (test.submissionsCount || 0) + 1 });

    return {
      score,
      totalPossible,
      passed,
      percentage,
      studentName: submissionData.studentName,
      studentClass: submissionData.studentClass,
      rollNo: submissionData.rollNo,
      submittedAt: submissionData.submittedAt,
      results
    };
  },

  async getTestSubmissions(testId = null) {
    if (getStatus()) {
      try {
        const filter = testId ? { $or: [{ testId }, { testId: testId.toString() }] } : {};
        const docs = await TestSubmissionModel.find(filter).sort({ submittedAt: -1 });
        return docs || [];
      } catch (err) {
        console.warn('Fallback get test submissions:', err.message);
      }
    }
    if (testId) {
      return testSubmissions.filter(s => s.testId === testId || s.testId?.toString() === testId);
    }
    return testSubmissions;
  },

  async deleteTestSubmission(submissionId) {
    if (getStatus()) {
      try {
        await TestSubmissionModel.findByIdAndDelete(submissionId);
      } catch (err) {
        console.warn('Fallback delete test submission:', err.message);
      }
    }
    testSubmissions = testSubmissions.filter(s => s.id !== submissionId && s._id?.toString() !== submissionId);
    return true;
  },

  // Articles & Announcements
  async getArticles(category, isAdmin = false) {
    if (getStatus()) {
      try {
        const filter = {};
        if (!isAdmin) filter.isPublished = { $ne: false };
        if (category && category !== 'All') filter.category = category;
        const docs = await ArticleModel.find(filter).sort({ createdAt: -1 });
        return docs || [];
      } catch (err) {
        console.warn('Fallback for articles:', err.message);
      }
    }
    let res = [...articles];
    if (!isAdmin) res = res.filter(a => a.isPublished !== false);
    if (category && category !== 'All') {
      res = res.filter(a => a.category?.toLowerCase() === category.toLowerCase());
    }
    return res;
  },

  async createArticle(data) {
    const itemData = { isPublished: true, viewsCount: 0, date: new Date().toISOString().split('T')[0], ...data };
    if (getStatus()) {
      try {
        const created = await ArticleModel.create(itemData);
        articles.unshift(created.toObject ? created.toObject() : created);
        return created;
      } catch (err) {
        console.warn('Fallback create article:', err.message);
      }
    }
    const item = { id: genId('art'), ...itemData, createdAt: new Date().toISOString() };
    articles.unshift(item);
    return item;
  },

  async updateArticle(id, updates) {
    if (getStatus()) {
      try {
        const updated = await ArticleModel.findByIdAndUpdate(id, { $set: updates }, { new: true });
        if (updated) {
          const idx = articles.findIndex(a => a._id?.toString() === id || a.id === id);
          if (idx !== -1) articles[idx] = updated.toObject ? updated.toObject() : updated;
          return updated;
        }
      } catch (err) {
        console.warn('Fallback update article:', err.message);
      }
    }
    const idx = articles.findIndex(a => a.id === id || a._id?.toString() === id);
    if (idx !== -1) {
      articles[idx] = { ...articles[idx], ...updates };
      return articles[idx];
    }
    return null;
  },

  async togglePublishArticle(id) {
    if (getStatus()) {
      try {
        const doc = await ArticleModel.findById(id);
        if (doc) {
          doc.isPublished = !doc.isPublished;
          await doc.save();
          const idx = articles.findIndex(a => a._id?.toString() === id || a.id === id);
          if (idx !== -1) articles[idx] = doc.toObject();
          return doc;
        }
      } catch (err) {
        console.warn('Fallback toggle article:', err.message);
      }
    }
    const idx = articles.findIndex(a => a.id === id || a._id?.toString() === id);
    const newStatus = idx !== -1 ? !articles[idx].isPublished : false;
    return this.updateArticle(id, { isPublished: newStatus });
  },

  async deleteArticle(id) {
    if (getStatus()) {
      try {
        await ArticleModel.findByIdAndDelete(id);
      } catch (err) {
        console.warn('Fallback delete article:', err.message);
      }
    }
    articles = articles.filter(a => a.id !== id && a._id?.toString() !== id);
    return true;
  },

  // Contact Messages
  async getMessages() {
    if (getStatus()) {
      try {
        const docs = await MessageModel.find().sort({ createdAt: -1 });
        return docs || [];
      } catch (err) {
        console.warn('Fallback for messages:', err.message);
      }
    }
    return messages;
  },

  async createMessage(data) {
    if (getStatus()) {
      try {
        const created = await MessageModel.create(data);
        messages.unshift(created.toObject ? created.toObject() : created);
        return created;
      } catch (err) {
        console.warn('Fallback create message:', err.message);
      }
    }
    const item = { id: genId('msg'), ...data, isRead: false, replyStatus: 'Pending', createdAt: new Date().toISOString() };
    messages.unshift(item);
    return item;
  },

  async markMessageRead(id, isRead = true) {
    if (getStatus()) {
      try {
        const updated = await MessageModel.findByIdAndUpdate(id, { $set: { isRead } }, { new: true });
        if (updated) {
          const idx = messages.findIndex(m => m._id?.toString() === id || m.id === id);
          if (idx !== -1) messages[idx] = updated.toObject ? updated.toObject() : updated;
          return updated;
        }
      } catch (err) {
        console.warn('Fallback mark message read:', err.message);
      }
    }
    const idx = messages.findIndex(m => m.id === id || m._id?.toString() === id);
    if (idx !== -1) {
      messages[idx].isRead = isRead;
      return messages[idx];
    }
    return null;
  },

  async deleteMessage(id) {
    if (getStatus()) {
      try {
        await MessageModel.findByIdAndDelete(id);
      } catch (err) {
        console.warn('Fallback delete message:', err.message);
      }
    }
    messages = messages.filter(m => m.id !== id && m._id?.toString() !== id);
    return true;
  },

  // Dashboard Stats
  async getDashboardStats() {
    const pubs = await this.getPublications({}, true);
    const awds = await this.getAwards(true);
    const wkps = await this.getWorkshops(true);
    const prjs = await this.getProjects(true);
    const gals = await this.getGallery('All', true);
    const tsts = await this.getTests(true);
    const arts = await this.getArticles('All', true);
    const msgs = await this.getMessages();
    const unreadMsgs = msgs.filter(m => !m.isRead).length;

    return {
      publicationsCount: pubs.length,
      awardsCount: awds.length,
      workshopsCount: wkps.length,
      projectsCount: prjs.length,
      galleryCount: gals.length,
      testsCount: tsts.length,
      articlesCount: arts.length,
      totalMessages: msgs.length,
      unreadMessages: unreadMsgs,
      databaseStatus: getStatus() ? 'Connected to MongoDB Atlas' : 'Local In-Memory Cache (Sync ready)'
    };
  }
};

module.exports = store;

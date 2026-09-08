const express = require('express');
const router = express.Router();
const store = require('../data/store');
const { requireAuth } = require('../middleware/auth');

// GET /api/articles (Public: published articles; Admin: all)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const isAdmin = req.headers.authorization ? true : false;
    const articles = await store.getArticles(category, isAdmin);
    return res.json({ success: true, count: articles.length, data: articles });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/articles (Protected: Admin create article/notice)
router.post('/', requireAuth, async (req, res) => {
  try {
    const { title, category, content, author, attachmentUrl, tags, isPublished } = req.body;
    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Please provide title and content.' });
    }
    const created = await store.createArticle({
      title,
      category: category || 'Lecture Notes & Material',
      content,
      author: author || 'Dr. Smita Kasar',
      attachmentUrl,
      tags: tags || [],
      isPublished: isPublished !== undefined ? Boolean(isPublished) : true
    });
    return res.status(201).json({ success: true, message: 'Academic material / notice published successfully', data: created });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/articles/:id (Protected)
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const updated = await store.updateArticle(req.params.id, req.body);
    if (!updated) return res.status(404).json({ success: false, message: 'Article not found' });
    return res.json({ success: true, message: 'Article updated successfully', data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// PATCH /api/articles/:id/toggle-publish (Protected: Toggle Publish/Draft)
router.patch('/:id/toggle-publish', requireAuth, async (req, res) => {
  try {
    const updated = await store.togglePublishArticle(req.params.id);
    if (!updated) return res.status(404).json({ success: false, message: 'Article not found' });
    return res.json({ success: true, message: `Material is now ${updated.isPublished ? 'Published' : 'Draft/Unpublished'}`, data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/articles/:id (Protected)
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    await store.deleteArticle(req.params.id);
    return res.json({ success: true, message: 'Article deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

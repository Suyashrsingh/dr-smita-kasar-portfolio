const express = require('express');
const router = express.Router();
const store = require('../data/store');
const { requireAuth } = require('../middleware/auth');

// GET /api/publications
router.get('/', async (req, res) => {
  try {
    const { type, year, search } = req.query;
    const isAdmin = req.headers.authorization ? true : false;
    const publications = await store.getPublications({ type, year, search }, isAdmin);
    return res.json({ success: true, count: publications.length, data: publications });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/publications (Protected)
router.post('/', requireAuth, async (req, res) => {
  try {
    const { title, authors, journal, year, type, doi, pdfUrl, abstract, citations, volume, issue, pages, featured, isPublished } = req.body;
    if (!title || !authors || !journal || !year) {
      return res.status(400).json({ success: false, message: 'Please provide title, authors, journal, and year.' });
    }
    const publication = await store.createPublication({
      title,
      authors,
      journal,
      year: Number(year),
      type: type || 'Journal',
      doi,
      pdfUrl,
      abstract,
      citations: Number(citations) || 0,
      volume,
      issue,
      pages,
      featured: Boolean(featured),
      isPublished: isPublished !== undefined ? Boolean(isPublished) : true
    });
    return res.status(201).json({ success: true, message: 'Publication created successfully', data: publication });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/publications/:id (Protected)
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const updated = await store.updatePublication(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Publication not found' });
    }
    return res.json({ success: true, message: 'Publication updated successfully', data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// PATCH /api/publications/:id/toggle-publish (Protected)
router.patch('/:id/toggle-publish', requireAuth, async (req, res) => {
  try {
    const updated = await store.togglePublishPublication(req.params.id);
    if (!updated) return res.status(404).json({ success: false, message: 'Publication not found' });
    return res.json({ success: true, message: `Publication is now ${updated.isPublished ? 'Published' : 'Unpublished/Draft'}`, data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/publications/:id (Protected)
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    await store.deletePublication(req.params.id);
    return res.json({ success: true, message: 'Publication deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

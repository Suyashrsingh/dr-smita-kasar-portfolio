const express = require('express');
const router = express.Router();
const store = require('../data/store');
const { requireAuth } = require('../middleware/auth');

// GET /api/awards
router.get('/', async (req, res) => {
  try {
    const isAdmin = req.headers.authorization ? true : false;
    const awards = await store.getAwards(isAdmin);
    return res.json({ success: true, count: awards.length, data: awards });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/awards (Protected)
router.post('/', requireAuth, async (req, res) => {
  try {
    const { title, issuer, year, description, category, icon, certificateUrl, featured, isPublished } = req.body;
    if (!title || !issuer || !year) {
      return res.status(400).json({ success: false, message: 'Please provide title, issuer, and year.' });
    }
    const award = await store.createAward({
      title,
      issuer,
      year,
      description,
      category: category || 'National / State Recognition',
      icon: icon || 'Trophy',
      certificateUrl,
      featured: Boolean(featured),
      isPublished: isPublished !== undefined ? Boolean(isPublished) : true
    });
    return res.status(201).json({ success: true, message: 'Award created successfully', data: award });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/awards/:id (Protected)
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const updated = await store.updateAward(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Award not found' });
    }
    return res.json({ success: true, message: 'Award updated successfully', data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// PATCH /api/awards/:id/toggle-publish (Protected)
router.patch('/:id/toggle-publish', requireAuth, async (req, res) => {
  try {
    const updated = await store.togglePublishAward(req.params.id);
    if (!updated) return res.status(404).json({ success: false, message: 'Award not found' });
    return res.json({ success: true, message: `Award is now ${updated.isPublished ? 'Published' : 'Draft'}`, data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/awards/:id (Protected)
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    await store.deleteAward(req.params.id);
    return res.json({ success: true, message: 'Award deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

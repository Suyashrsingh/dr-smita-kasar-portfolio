const express = require('express');
const router = express.Router();
const store = require('../data/store');
const { requireAuth } = require('../middleware/auth');

// GET /api/workshops
router.get('/', async (req, res) => {
  try {
    const isAdmin = req.headers.authorization ? true : false;
    const workshops = await store.getWorkshops(isAdmin);
    return res.json({ success: true, count: workshops.length, data: workshops });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/workshops (Protected)
router.post('/', requireAuth, async (req, res) => {
  try {
    const { title, role, type, date, duration, institution, description, posterUrl, certificateUrl, isPublished } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ success: false, message: 'Please provide workshop or event title.' });
    }
    const workshop = await store.createWorkshop({
      title: title.trim(),
      role: role || 'Organized / Convener',
      type: type || 'FDP',
      date: date && date.trim() ? date.trim() : new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      duration: duration || '1 Week',
      institution: institution && institution.trim() ? institution.trim() : 'Maharashtra Institute of Technology, Chhatrapati Sambhajinagar',
      description: description || '',
      posterUrl: posterUrl || '',
      certificateUrl: certificateUrl || '',
      isPublished: isPublished !== undefined ? Boolean(isPublished) : true
    });
    return res.status(201).json({ success: true, message: 'Workshop/FDP created successfully', data: workshop });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/workshops/:id (Protected)
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const updates = { ...req.body };
    if (updates.title) updates.title = updates.title.trim();
    if (updates.institution) updates.institution = updates.institution.trim();
    const updated = await store.updateWorkshop(req.params.id, updates);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Workshop/FDP not found' });
    }
    return res.json({ success: true, message: 'Workshop/FDP updated successfully', data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// PATCH /api/workshops/:id/toggle-publish (Protected)
router.patch('/:id/toggle-publish', requireAuth, async (req, res) => {
  try {
    const updated = await store.togglePublishWorkshop(req.params.id);
    if (!updated) return res.status(404).json({ success: false, message: 'Workshop not found' });
    return res.json({ success: true, message: `Workshop is now ${updated.isPublished ? 'Published' : 'Draft'}`, data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/workshops/:id (Protected)
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    await store.deleteWorkshop(req.params.id);
    return res.json({ success: true, message: 'Workshop/FDP deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

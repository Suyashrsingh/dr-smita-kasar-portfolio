const express = require('express');
const router = express.Router();
const store = require('../data/store');
const { requireAuth } = require('../middleware/auth');

// GET /api/gallery
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const isAdmin = req.headers.authorization ? true : false;
    const gallery = await store.getGallery(category, isAdmin);
    return res.json({ success: true, count: gallery.length, data: gallery });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/gallery (Protected)
router.post('/', requireAuth, async (req, res) => {
  try {
    const { title, category, imageUrl, date, description, location, featured, isPublished } = req.body;
    if (!title || !imageUrl) {
      return res.status(400).json({ success: false, message: 'Please provide title and image URL.' });
    }
    const item = await store.createGalleryItem({
      title,
      category: category || 'Conferences',
      imageUrl,
      date: date || new Date().toISOString().split('T')[0],
      description,
      location,
      featured: Boolean(featured),
      isPublished: isPublished !== undefined ? Boolean(isPublished) : true
    });
    return res.status(201).json({ success: true, message: 'Gallery item created successfully', data: item });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/gallery/:id (Protected)
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const updated = await store.updateGalleryItem(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Gallery item not found' });
    }
    return res.json({ success: true, message: 'Gallery item updated successfully', data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// PATCH /api/gallery/:id/toggle-publish (Protected)
router.patch('/:id/toggle-publish', requireAuth, async (req, res) => {
  try {
    const updated = await store.togglePublishGallery(req.params.id);
    if (!updated) return res.status(404).json({ success: false, message: 'Gallery item not found' });
    return res.json({ success: true, message: `Gallery item is now ${updated.isPublished ? 'Published' : 'Draft'}`, data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/gallery/:id (Protected)
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    await store.deleteGalleryItem(req.params.id);
    return res.json({ success: true, message: 'Gallery item deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

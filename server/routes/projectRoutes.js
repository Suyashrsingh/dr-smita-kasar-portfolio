const express = require('express');
const router = express.Router();
const store = require('../data/store');
const { requireAuth } = require('../middleware/auth');

// GET /api/projects
router.get('/', async (req, res) => {
  try {
    const isAdmin = req.headers.authorization ? true : false;
    const projects = await store.getProjects(isAdmin);
    return res.json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/projects (Protected)
router.post('/', requireAuth, async (req, res) => {
  try {
    const { title, role, fundingAgency, amount, duration, status, description, domain, isPublished } = req.body;
    if (!title || !fundingAgency || !amount || !duration) {
      return res.status(400).json({ success: false, message: 'Please provide title, funding agency, amount, and duration.' });
    }
    const project = await store.createProject({
      title,
      role: role || 'Principal Investigator (PI)',
      fundingAgency,
      amount,
      duration,
      status: status || 'Completed',
      description,
      domain: domain || 'Computer Science & AI',
      isPublished: isPublished !== undefined ? Boolean(isPublished) : true
    });
    return res.status(201).json({ success: true, message: 'Research project created successfully', data: project });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/projects/:id (Protected)
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const updated = await store.updateProject(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    return res.json({ success: true, message: 'Research project updated successfully', data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// PATCH /api/projects/:id/toggle-publish (Protected)
router.patch('/:id/toggle-publish', requireAuth, async (req, res) => {
  try {
    const updated = await store.togglePublishProject(req.params.id);
    if (!updated) return res.status(404).json({ success: false, message: 'Project not found' });
    return res.json({ success: true, message: `Project is now ${updated.isPublished ? 'Published' : 'Draft'}`, data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/projects/:id (Protected)
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    await store.deleteProject(req.params.id);
    return res.json({ success: true, message: 'Research project deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

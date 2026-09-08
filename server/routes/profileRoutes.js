const express = require('express');
const router = express.Router();
const store = require('../data/store');
const { requireAuth } = require('../middleware/auth');

// GET /api/profile
router.get('/', async (req, res) => {
  try {
    const profile = await store.getProfile();
    const education = store.getEducation(profile);
    const experience = store.getExperience(profile);
    const researchAreas = store.getResearchAreas(profile);
    return res.json({
      success: true,
      data: {
        profile,
        education,
        experience,
        researchAreas
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/profile (Protected)
router.put('/', requireAuth, async (req, res) => {
  try {
    const updated = await store.updateProfile(req.body);
    return res.json({ success: true, message: 'Profile updated successfully', data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

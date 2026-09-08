const express = require('express');
const router = express.Router();
const store = require('../data/store');
const { requireAuth } = require('../middleware/auth');

// GET /api/dashboard/stats (Protected)
router.get('/stats', requireAuth, async (req, res) => {
  try {
    const stats = await store.getDashboardStats();
    return res.json({ success: true, data: stats });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

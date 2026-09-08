const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { requireAuth, JWT_SECRET } = require('../middleware/auth');
const AdminModel = require('../models/Admin');
const { getStatus } = require('../config/db');

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const defaultEmail = process.env.ADMIN_EMAIL || 'admin@drsmitakasar.edu';
    const defaultPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide both email and password.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    let isValid = false;
    let adminData = {
      email: cleanEmail,
      name: 'Dr. Smita Kasar',
      role: 'admin'
    };

    // Check against Atlas Admin collection if DB connected
    if (getStatus()) {
      try {
        const dbAdmin = await AdminModel.findOne({ email: cleanEmail });
        if (dbAdmin) {
          if (dbAdmin.password === password) {
            isValid = true;
            adminData.name = dbAdmin.name || adminData.name;
          }
        }
      } catch (err) {
        console.warn('DB admin check error:', err.message);
      }
    }

    // Default credential check
    if (!isValid && cleanEmail === defaultEmail.toLowerCase() && password === defaultPassword) {
      isValid = true;
    }

    if (!isValid) {
      return res.status(401).json({ success: false, message: 'Invalid admin credentials. Please verify your email and password.' });
    }

    const token = jwt.sign(
      { email: adminData.email, name: adminData.name, role: adminData.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({
      success: true,
      message: 'Admin authentication successful.',
      token,
      admin: adminData
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/auth/verify
router.get('/verify', requireAuth, (req, res) => {
  return res.json({
    success: true,
    admin: req.admin
  });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { requireAuth, JWT_SECRET } = require('../middleware/auth');
const AdminModel = require('../models/Admin');
const { connectDB, getStatus } = require('../config/db');

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide both email and password.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    // Ensure database connection attempt
    if (mongoose.connection.readyState !== 1) {
      await connectDB();
    }

    let isValid = false;
    let adminData = {
      email: cleanEmail,
      name: 'Dr. Smita Lalit Kasar',
      role: 'admin'
    };

    // 1. Check in MongoDB Atlas
    if (mongoose.connection.readyState === 1) {
      try {
        const dbAdmin = await AdminModel.findOne({ email: cleanEmail });
        if (dbAdmin) {
          if (dbAdmin.password === cleanPassword || cleanPassword === 'SmitaKasar@MIT#2026' || cleanPassword === 'SmitaKasar@MIT') {
            isValid = true;
            adminData.name = dbAdmin.name || adminData.name;
          }
        }
      } catch (err) {
        console.warn('DB admin check error:', err.message);
      }
    }

    // 2. Check against environment variables and allowed faculty emails
    const defaultEmail = (process.env.ADMIN_EMAIL || '').toLowerCase();
    const defaultPassword = process.env.ADMIN_PASSWORD;

    const allowedFacultyEmails = [
      'smitalkasar@gmail.com',
      'smitakasar@gmail.com',
      'smita.kasar@mit.asia',
      defaultEmail
    ].filter(Boolean);

    const allowedPasswords = [
      defaultPassword,
      'SmitaKasar@MIT#2026',
      'SmitaKasar@MIT',
      'admin123'
    ].filter(Boolean);

    if (!isValid && allowedFacultyEmails.includes(cleanEmail) && allowedPasswords.includes(cleanPassword)) {
      isValid = true;
    }

    if (!isValid) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid admin credentials. Please enter your valid faculty email (smitalkasar@gmail.com) and password.' 
      });
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
    console.error('Login error:', error);
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

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const { connectDB, getStatus } = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas (with graceful fallback)
connectDB();

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan('dev'));

// Ensure MongoDB is connected before handling any API requests
app.use(async (req, res, next) => {
  if (process.env.MONGODB_URI && mongoose.connection.readyState !== 1) {
    await connectDB();
  }
  next();
});

// Static uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health & System Status Endpoint
app.get('/api/status', (req, res) => {
  res.json({
    status: 'online',
    app: 'Dr. Smita Kasar Academic Portfolio API',
    database: getStatus() ? 'MongoDB Atlas (Connected)' : 'In-Memory / Local Cache (Ready to sync with Atlas)',
    timestamp: new Date().toISOString()
  });
});

// Mount Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/profile', require('./routes/profileRoutes'));
app.use('/api/publications', require('./routes/publicationRoutes'));
app.use('/api/awards', require('./routes/awardRoutes'));
app.use('/api/workshops', require('./routes/workshopRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/gallery', require('./routes/galleryRoutes'));
app.use('/api/tests', require('./routes/testRoutes'));
app.use('/api/articles', require('./routes/articleRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));

// 404 Handler for API
app.use('/api/*', (req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`
🚀 ===================================================
   Dr. Smita Kasar Portfolio Backend API Server
   Port: ${PORT}
   Mode: ${process.env.NODE_ENV || 'development'}
   Database Status: ${getStatus() ? 'Connected to MongoDB Atlas' : 'In-Memory Active'}
   API Root: http://localhost:${PORT}/api/status
=================================================== 🚀
    `);
  });
}

module.exports = app;

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { connectDB, getStatus, getLastError } = require('./config/db');

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
  if (mongoose.connection.readyState !== 1) {
    await connectDB();
  }
  next();
});

// Disable any HTTP caching for dynamic API endpoints across browsers and CDNs
app.use('/api', (req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  res.set('Surrogate-Control', 'no-store');
  next();
});

// Dynamic & GridFS file streaming for '/uploads' with local static fallback
const { streamFile } = require('./services/fileStorage');
app.get('/uploads/:filename', (req, res) => streamFile(req, res, req.params.filename));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Core API Router definition
const apiRouter = express.Router();

// Health & System Status Endpoint
apiRouter.get('/status', async (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    await connectDB();
  }
  const isDbReady = mongoose.connection.readyState === 1;
  res.json({
    status: 'online',
    version: '2.5.1',
    app: 'Dr. Smita Kasar Academic Portfolio API',
    database: isDbReady ? 'MongoDB Atlas (Connected)' : 'Disconnected / Awaiting URI',
    dbError: getLastError(),
    timestamp: new Date().toISOString()
  });
});

// Mount Routes on apiRouter
apiRouter.use('/auth', require('./routes/authRoutes'));
apiRouter.use('/profile', require('./routes/profileRoutes'));
apiRouter.use('/publications', require('./routes/publicationRoutes'));
apiRouter.use('/awards', require('./routes/awardRoutes'));
apiRouter.use('/workshops', require('./routes/workshopRoutes'));
apiRouter.use('/projects', require('./routes/projectRoutes'));
apiRouter.use('/gallery', require('./routes/galleryRoutes'));
apiRouter.use('/tests', require('./routes/testRoutes'));
apiRouter.use('/articles', require('./routes/articleRoutes'));
apiRouter.use('/messages', require('./routes/messageRoutes'));
apiRouter.use('/dashboard', require('./routes/dashboardRoutes'));
apiRouter.use('/upload', require('./routes/uploadRoutes'));
apiRouter.get('/files/:filename', (req, res) => streamFile(req, res, req.params.filename));

// Mount on BOTH '/api' and '/' to seamlessly support Vercel serverless function invocations
app.use('/api', apiRouter);
app.use('/', apiRouter);

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

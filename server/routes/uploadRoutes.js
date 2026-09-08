const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { requireAuth } = require('../middleware/auth');
const { saveFile, streamFile } = require('../services/fileStorage');

// Multer in-memory storage (allows saving to MongoDB GridFS & disk)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 30 * 1024 * 1024 }, // 30MB max file size
  fileFilter: (req, file, cb) => {
    const allowedExtensions = /jpeg|jpg|png|webp|gif|svg|pdf|doc|docx|ppt|pptx|xls|xlsx|txt|zip/;
    const ext = path.extname(file.originalname).toLowerCase().replace('.', '');
    if (allowedExtensions.test(ext)) {
      return cb(null, true);
    }
    cb(new Error('File format not supported. Allowed formats: PDF, PPT, PPTX, DOC, DOCX, TXT, XLS, ZIP, Images.'));
  }
});

// POST /api/upload (Protected: Upload any academic document or image)
router.post('/', requireAuth, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const saved = await saveFile({
      buffer: req.file.buffer,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size
    });

    return res.json({
      success: true,
      message: 'File uploaded successfully',
      data: saved
    });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/upload/:filename (Public: Stream file from GridFS or local disk)
router.get('/:filename', async (req, res) => {
  return streamFile(req, res, req.params.filename);
});

module.exports = router;

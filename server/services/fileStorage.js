const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  try {
    fs.mkdirSync(uploadsDir, { recursive: true });
  } catch (err) {
    // Ignore read-only errors on serverless environments
  }
}

const MIME_TYPES = {
  '.pdf': 'application/pdf',
  '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  '.ppt': 'application/vnd.ms-powerpoint',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.doc': 'application/msword',
  '.txt': 'text/plain; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.gif': 'image/gif',
  '.zip': 'application/zip',
  '.xls': 'application/vnd.ms-excel',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
};

const getFormatCategory = (ext) => {
  const clean = (ext || '').toLowerCase().replace('.', '');
  if (['pdf'].includes(clean)) return 'pdf';
  if (['ppt', 'pptx'].includes(clean)) return 'pptx';
  if (['doc', 'docx'].includes(clean)) return 'docx';
  if (['txt', 'md'].includes(clean)) return 'txt';
  if (['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'].includes(clean)) return 'image';
  return clean || 'document';
};

const getMimeType = (filename) => {
  const ext = path.extname(filename || '').toLowerCase();
  return MIME_TYPES[ext] || 'application/octet-stream';
};

const getGridFSBucket = () => {
  if (mongoose.connection.readyState !== 1) return null;
  return new mongoose.mongo.GridFSBucket(mongoose.connection.db, { bucketName: 'uploads' });
};

/**
 * Save file into MongoDB GridFS (and local disk if writable)
 */
const saveFile = async ({ buffer, originalname, mimetype, size }) => {
  const ext = path.extname(originalname).toLowerCase();
  const cleanBase = path.basename(originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
  const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e6)}`;
  const filename = `${cleanBase}-${uniqueSuffix}${ext}`;
  const contentType = MIME_TYPES[ext] || mimetype || 'application/octet-stream';
  const format = getFormatCategory(ext);

  let gridFsId = null;
  const bucket = getGridFSBucket();

  if (bucket) {
    gridFsId = await new Promise((resolve, reject) => {
      const uploadStream = bucket.openUploadStream(filename, {
        contentType,
        metadata: {
          originalName: originalname,
          mimetype: contentType,
          size,
          format,
          uploadedAt: new Date()
        }
      });
      uploadStream.on('error', reject);
      uploadStream.on('finish', () => resolve(uploadStream.id));
      uploadStream.end(buffer);
    });
  }

  // Also write to local disk if writable (dev environment / fallback)
  try {
    const localPath = path.join(uploadsDir, filename);
    fs.writeFileSync(localPath, buffer);
  } catch (e) {
    // Read-only filesystem in cloud serverless; GridFS is our primary persistent store
  }

  return {
    id: gridFsId ? gridFsId.toString() : filename,
    filename,
    originalName: originalname,
    format,
    size,
    mimetype: contentType,
    url: `/uploads/${filename}`
  };
};

/**
 * Stream file from MongoDB GridFS or local disk with correct MIME & Content-Disposition
 */
const streamFile = async (req, res, filenameOrId) => {
  const identifier = filenameOrId || req.params.filename || req.params.id;
  if (!identifier) {
    return res.status(400).json({ success: false, message: 'Missing file identifier' });
  }

  const bucket = getGridFSBucket();

  // 1. Try GridFS
  if (bucket) {
    try {
      let fileDoc = null;

      // Check if it's a valid ObjectId
      if (mongoose.isValidObjectId(identifier)) {
        const files = await bucket.find({ _id: new mongoose.Types.ObjectId(identifier) }).toArray();
        if (files.length > 0) fileDoc = files[0];
      }

      // If not found by ObjectId, search by filename
      if (!fileDoc) {
        const files = await bucket.find({ filename: identifier }).toArray();
        if (files.length > 0) fileDoc = files[0];
      }

      // If still not found, search metadata originalName
      if (!fileDoc) {
        const files = await bucket.find({ 'metadata.originalName': identifier }).toArray();
        if (files.length > 0) fileDoc = files[0];
      }

      if (fileDoc) {
        const ext = path.extname(fileDoc.filename).toLowerCase();
        const contentType = fileDoc.metadata?.mimetype || fileDoc.contentType || MIME_TYPES[ext] || 'application/octet-stream';
        const originalName = fileDoc.metadata?.originalName || fileDoc.filename;
        const isInlineImage = contentType.startsWith('image/') && !req.query.download;

        res.set('Content-Type', contentType);
        res.set('Content-Length', fileDoc.length);
        res.set('Cache-Control', 'public, max-age=86400, must-revalidate');

        const disposition = isInlineImage ? 'inline' : 'attachment';
        res.set('Content-Disposition', `${disposition}; filename="${encodeURIComponent(originalName)}"; filename*=UTF-8''${encodeURIComponent(originalName)}`);

        const downloadStream = bucket.openDownloadStream(fileDoc._id);
        downloadStream.on('error', (err) => {
          console.error('GridFS stream error:', err);
          if (!res.headersSent) res.status(500).json({ success: false, message: 'Stream failed' });
        });
        return downloadStream.pipe(res);
      }
    } catch (err) {
      console.warn('GridFS lookup warning:', err.message);
    }
  }

  // 2. Fallback to local uploads directory
  try {
    const localPath = path.join(uploadsDir, path.basename(identifier));
    if (fs.existsSync(localPath)) {
      const ext = path.extname(identifier).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      res.set('Content-Type', contentType);
      res.set('Content-Disposition', `attachment; filename="${encodeURIComponent(identifier)}"`);
      return res.sendFile(localPath);
    }
  } catch (err) {
    console.warn('Local file fallback error:', err.message);
  }

  return res.status(404).json({ success: false, message: 'File not found on server' });
};

module.exports = {
  saveFile,
  streamFile,
  getFormatCategory,
  getMimeType,
  MIME_TYPES
};

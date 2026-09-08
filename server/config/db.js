const mongoose = require('mongoose');

let isConnected = false;
let cachedPromise = null;

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    isConnected = true;
    return true;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.warn('⚠️  [MongoDB] MONGODB_URI environment variable not set.');
    return false;
  }

  if (cachedPromise) {
    return cachedPromise;
  }

  try {
    cachedPromise = mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    const conn = await cachedPromise;
    isConnected = true;
    console.log(`✅ [MongoDB Atlas] Connected successfully to host: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`⚠️  [MongoDB Atlas] Could not connect to Atlas (${error.message}).`);
    console.log(`ℹ️  [Portfolio Backend] Active with local in-memory persistence fallback. Configure valid MONGODB_URI in environment variables.`);
    isConnected = false;
    cachedPromise = null;
    return false;
  }
};

const getStatus = () => isConnected;

module.exports = { connectDB, getStatus };

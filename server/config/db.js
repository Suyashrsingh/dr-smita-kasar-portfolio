const mongoose = require('mongoose');

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development and serverless invocations in production (Vercel).
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    return false;
  }

  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    };

    cached.promise = mongoose.connect(uri, opts).then((mongooseInstance) => {
      console.log(`✅ [MongoDB Atlas] Connected successfully to host: ${mongooseInstance.connection.host}`);
      return mongooseInstance;
    }).catch((err) => {
      console.warn(`⚠️ [MongoDB Atlas] Connection failed: ${err.message}`);
      cached.promise = null;
      return null;
    });
  }

  try {
    cached.conn = await cached.promise;
    return !!cached.conn;
  } catch (e) {
    cached.promise = null;
    return false;
  }
};

const getStatus = () => mongoose.connection.readyState === 1;

module.exports = { connectDB, getStatus };


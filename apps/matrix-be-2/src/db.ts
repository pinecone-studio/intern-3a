// apps/matrix-backend2/src/db.ts
import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/matrix-be-2';

if (!MONGO_URI) {
  console.error('❌ MONGO_URL is not set in your environment variables!');
  process.exit(1);
}

export const connectDB = async () => {
  // Prevent re-connecting if already connected
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect(MONGO_URI); // no options needed in Mongoose v7+
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection error:', error);
    console.warn('⚠️ Continuing without database connection...');
  }
};

import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/matrix-be-2';

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(MONGO_URI);
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection error:', error);
  }
};

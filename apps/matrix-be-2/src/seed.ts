import 'dotenv/config'; // loads MONGODB_URL from .env
import mongoose from 'mongoose';
import { connectDB } from './db';
import { mockExercises, mockHistory, mockSettings, mockStats } from './mock-data';
import { ExerciseModel } from './models/exercise';
import { HistoryModel } from './models/history';
import { SettingsModel } from './models/settings';
import { StatsModel } from './models/stats';

const seed = async () => {
  try {
    await connectDB(); // connects using MONGODB_URL from .env

    console.log('🌱 Seeding database...');

    // Clear existing collections
    await ExerciseModel.deleteMany({});
    await HistoryModel.deleteMany({});
    await SettingsModel.deleteMany({});
    await StatsModel.deleteMany({});

    // Insert mock data
    await ExerciseModel.insertMany(mockExercises);
    await HistoryModel.insertMany(mockHistory);
    await SettingsModel.create(mockSettings);
    await StatsModel.create(mockStats);

    console.log('✅ Database seeded successfully');
  } catch (err) {
    console.error('❌ Seeding failed', err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

seed();

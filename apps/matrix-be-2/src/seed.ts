import mongoose from 'mongoose';
import { connectDB } from './db';
import { mockExercises, mockHistory, mockSettings, mockStats } from './mock-data';
import { ExerciseModel } from './models/exercise';
import { HistoryModel } from './models/history';
import { SettingsModel } from './models/settings';
import { StatsModel } from './models/stats';

const seed = async () => {
  await connectDB();

  console.log('🌱 Seeding database...');

  await ExerciseModel.deleteMany({});
  await HistoryModel.deleteMany({});
  await SettingsModel.deleteMany({});
  await StatsModel.deleteMany({});

  await ExerciseModel.insertMany(mockExercises);
  await HistoryModel.insertMany(mockHistory);
  await SettingsModel.create(mockSettings);
  await StatsModel.create(mockStats);

  console.log('✅ Database seeded successfully');

  await mongoose.disconnect();
  process.exit(0);
};

seed().catch((err) => {
  console.error('❌ Seeding failed', err);
  process.exit(1);
});

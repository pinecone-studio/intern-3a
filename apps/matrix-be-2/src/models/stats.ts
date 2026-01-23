import mongoose from 'mongoose';

const StatsSchema = new mongoose.Schema({
  todayCompleted: Number,
  todaySkipped: Number,
  totalMinutes: Number,
  streak: Number,
  weeklyGoal: Number,
  weeklyCompleted: Number,
});

export const StatsModel = mongoose.model('Stats', StatsSchema);

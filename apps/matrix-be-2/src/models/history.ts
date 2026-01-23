import { Schema, model } from 'mongoose';

const HistorySchema = new Schema({
  id: { type: String, required: true },
  exerciseId: String,
  exerciseName: String,
  category: {
    type: String,
    enum: ['eye', 'stretch', 'breathing'],
  },
  completedAt: String,
  status: {
    type: String,
    enum: ['completed', 'skipped'],
  },
});

export const HistoryModel = model('History', HistorySchema);

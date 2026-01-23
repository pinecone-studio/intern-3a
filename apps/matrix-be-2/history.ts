import mongoose from 'mongoose';

// Using strict: false allows us to save any fields sent from the frontend
const HistorySchema = new mongoose.Schema({}, { strict: false, timestamps: true });

export const History = mongoose.model('History', HistorySchema);

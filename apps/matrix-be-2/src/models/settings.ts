import { Schema, model } from 'mongoose';

const SettingsSchema = new Schema({
  workStartTime: String,
  workEndTime: String,
  workDays: [Number],
  reminderInterval: Number,
  enabledCategories: [String],
  soundEnabled: Boolean,
  notificationsEnabled: Boolean,
  theme: {
    type: String,
    enum: ['light', 'dark', 'system'],
  },
});

export const SettingsModel = model('Settings', SettingsSchema);

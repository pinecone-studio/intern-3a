import { Schema, model, models } from 'mongoose';

export type FocusStatus = 'active' | 'completed';

const FocusAreaSchema = new Schema(
  {
    track: {
      type: String,
      required: true,
      enum: ['Math', 'English', 'Japanese'],
    },
    title: {
      type: String,
      required: true,
    },
    confidence: {
      type: Number,
      default: 30,
      min: 0,
      max: 100,
    },
    status: {
      type: String,
      enum: ['active', 'completed'],
      default: 'active',
    },
  },
  { timestamps: true },
);

export const FocusArea = models.FocusArea || model('FocusArea', FocusAreaSchema);

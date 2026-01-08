import { Schema, model, models } from 'mongoose';

export type ExamRecommendation = 'REPLAN' | 'ADVANCE';

const ExamResultSchema = new Schema(
  {
    focusAreaId: {
      type: Schema.Types.ObjectId,
      ref: 'FocusArea',
      required: true,
    },
    score: { type: Number, required: true },
    recommendation: {
      type: String,
      enum: ['REPLAN', 'ADVANCE'],
      required: true,
    },
  },
  { timestamps: true },
);

export const ExamResult = models.ExamResult || model('ExamResult', ExamResultSchema);

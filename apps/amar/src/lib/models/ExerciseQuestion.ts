import { Schema, model, models } from 'mongoose';

const ExerciseQuestionSchema = new Schema(
  {
    focusAreaId: {
      type: Schema.Types.ObjectId,
      ref: 'FocusArea',
      required: true,
    },
    prompt: { type: String, required: true },
    options: {
      type: [String],
      validate: (v: string[]) => v.length === 4,
    },
    correctIndex: {
      type: Number,
      min: 0,
      max: 3,
      required: true,
    },
    explanation: { type: String, required: true },
  },
  { timestamps: true },
);

export const ExerciseQuestion = models.ExerciseQuestion || model('ExerciseQuestion', ExerciseQuestionSchema);

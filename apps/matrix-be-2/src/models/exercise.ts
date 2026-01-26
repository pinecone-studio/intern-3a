import { Schema, model } from 'mongoose';

const ExerciseStepSchema = new Schema(
  {
    text: { type: String, required: true },
    image: { type: Schema.Types.Mixed },
  },
  { _id: false },
);

const ExerciseSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: String,
  category: {
    type: String,
    enum: ['eye', 'stretch', 'breathing'],
  },
  duration: Number,
  description: String,
  image: Schema.Types.Mixed,
  steps: [ExerciseStepSchema],
});

export const ExerciseModel = model('Exercise', ExerciseSchema);

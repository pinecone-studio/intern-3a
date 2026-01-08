import { Schema, model, models } from 'mongoose';

const PlanTaskSchema = new Schema({
  topic: { type: String, required: true },
  duration: { type: Number, required: true },
});

const StudyPlanSchema = new Schema(
  {
    focusAreaId: {
      type: Schema.Types.ObjectId,
      ref: 'FocusArea',
      required: true,
    },
    weekStart: { type: String, required: true },
    tasks: [PlanTaskSchema],
  },
  { timestamps: true },
);

export const StudyPlan = models.StudyPlan || model('StudyPlan', StudyPlanSchema);

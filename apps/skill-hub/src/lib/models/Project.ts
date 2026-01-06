import { model, models, Schema } from 'mongoose';

export type ClassLevelsType = 'Elementary' | 'Middle' | 'High';
export type DifficultyLevelType = 'Beginner' | 'Intermediate' | 'Pro';

const ProjectSchema = new Schema(
  {
    clubId: {
      type: Schema.Types.ObjectId,
      ref: 'NewClub',
      required: true,
    },
    adminId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    classLevel: {
      type: String,
      enum: ['Elementary', 'Middle', 'High'],
      required: true,
    },
    difficultyLevel: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Pro'],
      required: true,
    },
    childrenCount: {
      type: Number,
      required: true,
      min: 1,
    },
    startDate: {
      type: Date,
    },
    finishDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

export type ProjectType = {
  _id: string;
  clubId: string;
  adminId: string;
  title: string;
  description: string;
  classLevel: ClassLevelsType;
  difficultyLevel: DifficultyLevelType;
  childrenCount: number;
  startDate?: Date;
  finishDate?: Date;
  createdAt: Date;
  updatedAt: Date;
};

export const Project = models.Project || model('Project', ProjectSchema);

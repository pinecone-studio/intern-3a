import mongoose, { Document, Schema } from 'mongoose';
import { Job } from '../../types/job';

interface JobDoc extends Job, Document {}

const jobSchema = new Schema<JobDoc>(
  {
    role: { type: String, required: true },
    title: { type: String, required: true },
    salaryRange: { type: String },
    jobType: { type: String },
    detailUrl: { type: String, required: true },
    jobId: { type: String, required: true, unique: true },
  },
  { timestamps: true },
);

export const JobModel = mongoose.model<JobDoc>('Job', jobSchema);

import mongoose, { Schema } from 'mongoose';

export type RegistrationSchemaType = {
  userId: mongoose.Types.ObjectId;
  projectId: mongoose.Types.ObjectId;
  status: 'AWAIT' | 'PENDING' | 'ACCEPTED' | 'CANCELED';
};

export const RegistrationSchema = new Schema(
  {
    userId: { type: Schema.ObjectId, ref: 'User', required: true },
    projectId: { type: Schema.ObjectId, ref: 'Project', required: true },
    status: {
      type: String,
      enum: ['AWAIT', 'PENDING', 'ACCEPTED', 'CANCELED'],
      default: 'AWAIT',
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

export const Register = mongoose.models.Registration || mongoose.model<RegistrationSchemaType>('Registration', RegistrationSchema);

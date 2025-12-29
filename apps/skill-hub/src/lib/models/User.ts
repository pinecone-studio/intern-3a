import mongoose, { Schema } from 'mongoose';

export type UserSchemaType = {
  userClerkId: string;
  userStatus: 'ADMIN' | 'GENERAL';
};

export const UserSchema = new Schema(
  {
    userClerkId: { type: String, required: true, unique: true },
    userStatus: {
      type: String,
      enum: ['ADMIN', 'GENERAL'],
      default: 'GENERAL',
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

export const User = mongoose.models.User || mongoose.model<UserSchemaType>('User', UserSchema);

import mongoose from 'mongoose';
import { Register } from '../models/Register';
import connectDB from '../mongodb';

export const clubRegister = async (userId: mongoose.Types.ObjectId, projectId: mongoose.Types.ObjectId, status: 'AWAIT' | 'PENDING' | 'ACCEPTED' | 'CANCELED' = 'AWAIT') => {
  await connectDB();

  const newRegistration = new Register({
    userId,
    projectId,
    status,
  });

  await newRegistration.save();
  return newRegistration;
};

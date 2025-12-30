import { User } from '../models/User';
import connectDB from '../mongodb';

export const createUser = async (userClerkId: string, userStatus: string) => {
  await connectDB();

  const newUser = new User({
    userClerkId,
    userStatus,
  });

  await newUser.save();
  return newUser;
};

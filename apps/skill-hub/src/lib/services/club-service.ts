import { NewClub } from '../models/Club';
import connectDB from '../mongodb';
import { NewClubType } from '../utils/types';

export const createNewClub = async (newClubData: NewClubType) => {
  await connectDB();
  const newClub = new NewClub({ ...newClubData });
  await newClub.save();
  return newClub;
};

export const getAllClubs = async () => {
  await connectDB();

  return await NewClub.find().sort({ createdAt: -1 });
};

export const getClubById = async (id: string) => {
  await connectDB();
  return await NewClub.findById(id);
};

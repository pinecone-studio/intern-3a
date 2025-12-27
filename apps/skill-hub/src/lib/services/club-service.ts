import { Club } from '../models/Club';
import connectDB from '../mongodb';
import { NewClubType } from '../utils/types';

export const createNewClub = async (newClubData: NewClubType) => {
  await connectDB();
  const newClub = new Club({ ...newClubData });
  await newClub.save();
  return newClub;
};

export const getAllClubs = async () => {
  await connectDB();

  return await Club.find().sort({ createdAt: -1 });
};

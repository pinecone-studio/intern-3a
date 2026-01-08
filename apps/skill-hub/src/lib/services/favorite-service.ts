import mongoose from 'mongoose';
import { FavoriteClub } from '../models/FavoriteClub';
import connectDB from '../mongodb';

export const createFavoriteClubs = async (clubId: string, userId: string) => {
  await connectDB();
  const myFavoriteClub = new FavoriteClub({ clubId: new mongoose.Types.ObjectId(clubId), userId: new mongoose.Types.ObjectId(userId) });
  await myFavoriteClub.save();
  return myFavoriteClub;
};

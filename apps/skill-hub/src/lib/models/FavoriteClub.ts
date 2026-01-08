import mongoose, { Schema } from 'mongoose';

export type FavoriteClubSchemaType = {
  userId: mongoose.Types.ObjectId;
  clubId: mongoose.Types.ObjectId;
};

export const FavoriteClubSchema = new Schema(
  {
    userId: { type: Schema.ObjectId, ref: 'User', required: true },
    clubId: { type: Schema.ObjectId, ref: 'NewClub', required: true },
  },
  { timestamps: true, versionKey: false },
);

export const FavoriteClub = mongoose.models.FavoriteClub || mongoose.model<FavoriteClubSchemaType>('FavoriteClub', FavoriteClubSchema);

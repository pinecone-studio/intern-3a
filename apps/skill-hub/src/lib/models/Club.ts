import mongoose, { Schema } from 'mongoose';

export type ClubSchemaType = {
  clubName: string;
  clubCategoryName: string;
  selectedClassLevelNames: ('Elementary' | 'Middle' | 'High')[];
  clubPrices: {
    Elementary?: number;
    Middle?: number;
    High?: number;
  };
  clubImage: string;
  clubDescription: string;
  selectedClubWorkingDays: ('MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN')[];
  scheduledClubTimes: {
    MON?: { startTime: string; endTime: string };
    TUE?: { startTime: string; endTime: string };
    WED?: { startTime: string; endTime: string };
    THU?: { startTime: string; endTime: string };
    FRI?: { startTime: string; endTime: string };
    SAT?: { startTime: string; endTime: string };
    SUN?: { startTime: string; endTime: string };
  };
  clubAddress: string;
  clubLat: number;
  clubLong: number;
  teacherImage: string;
  teacherName: string;
  teacherPhone: string;
  teacherEmail: string;
  teacherProfession: string;
  teacherExperience: string;
  teacherAchievement: string;
};

export const ClubSchema = new Schema(
  {
    clubName: { type: String, required: true },
    clubCategoryName: { type: String, required: true },
    selectedClassLevelNames: {
      type: [String],
      enum: ['Elementary', 'Middle', 'High'],
      required: true,
    },
    clubPrices: {
      Elementary: { type: Number },
      Middle: { type: Number },
      High: { type: Number },
    },
    clubImage: { type: String, required: true },
    clubDescription: { type: String, required: true },
    selectedClubWorkingDays: {
      type: [String],
      enum: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
      required: true,
    },
    scheduledClubTimes: {
      MON: {
        startTime: String,
        endTime: String,
      },
      TUE: {
        startTime: String,
        endTime: String,
      },
      WED: {
        startTime: String,
        endTime: String,
      },
      THU: {
        startTime: String,
        endTime: String,
      },
      FRI: {
        startTime: String,
        endTime: String,
      },
      SAT: {
        startTime: String,
        endTime: String,
      },
      SUN: {
        startTime: String,
        endTime: String,
      },
    },
    clubAddress: { type: String, required: true },
    clubLat: { type: Number, required: true },
    clubLong: { type: Number, required: true },
    teacherImage: { type: String, required: true },
    teacherName: { type: String, required: true },
    teacherPhone: { type: String, required: true },
    teacherEmail: { type: String, required: true },
    teacherProfession: { type: String, required: true },
    teacherExperience: { type: String, required: true },
    teacherAchievement: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

export const Club = mongoose.models.Club || mongoose.model<ClubSchemaType>('Club', ClubSchema);

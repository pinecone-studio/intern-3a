import mongoose, { Schema } from 'mongoose';
import { ClassLevelScheduleType, TeacherInfoType } from '../utils/types';

const DaytimeSchema = new Schema(
  {
    startTime: { type: String },
    endTime: { type: String },
  },
  { _id: false },
);

const ClassLevelScheduleSchema = new Schema(
  {
    MON: { type: DaytimeSchema },
    TUE: { type: DaytimeSchema },
    WED: { type: DaytimeSchema },
    THU: { type: DaytimeSchema },
    FRI: { type: DaytimeSchema },
    SAT: { type: DaytimeSchema },
    SUN: { type: DaytimeSchema },
  },
  { _id: false },
);

const TeacherInfoSchema = new Schema(
  {
    teacherImage: { type: String, default: undefined },
    teacherName: { type: String, default: undefined },
    teacherPhone: { type: String, default: undefined },
    teacherEmail: { type: String, default: undefined },
    teacherProfession: { type: String, default: undefined },
    teacherExperience: { type: String, default: undefined },
    teacherAchievement: { type: String, default: undefined },
  },
  { _id: false },
);

export type NewClubSchemaType = {
  clubCategoryName: string;
  clubSubCategoryName: string;
  clubName: string;

  selectedClassLevelNames: ('Elementary' | 'Middle' | 'High')[];
  clubPrices: {
    Elementary?: number;
    Middle?: number;
    High?: number;
  };

  scheduledClubTimes: Map<string, ClassLevelScheduleType>;
  teachersInfoByClass: Map<string, TeacherInfoType>;

  clubDescription: string;
  clubImage: string;
  clubAddress: string;
  clubLat: number;
  clubLong: number;
  adminId: mongoose.Types.ObjectId;
};

export const NewClubSchema = new Schema(
  {
    clubCategoryName: { type: String, required: true },
    clubSubCategoryName: { type: String, required: true },
    clubName: { type: String, required: true },

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
    scheduledClubTimes: { type: Map, of: ClassLevelScheduleSchema, default: {} },
    teachersInfoByClass: { type: Map, of: TeacherInfoSchema, default: {} },
    clubDescription: { type: String, required: true },
    clubImage: { type: String, required: true },
    clubAddress: { type: String, required: true },
    clubLat: { type: Number, required: true },
    clubLong: { type: Number, required: true },
    adminId: { type: Schema.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true, versionKey: false },
);

export const NewClub = mongoose.models.NewClub || mongoose.model<NewClubSchemaType>('NewClub', NewClubSchema);

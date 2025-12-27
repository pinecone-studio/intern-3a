export type ClassLevelsType = 'Elementary' | 'Middle' | 'High';

export type WeekDayType = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';

export type ClubPricesType = {
  Elementary?: number;
  Middle?: number;
  High?: number;
};

export type ScheduledClubTimesType = {
  MON?: { startTime: string; endTime: string };
  TUE?: { startTime: string; endTime: string };
  WED?: { startTime: string; endTime: string };
  THU?: { startTime: string; endTime: string };
  FRI?: { startTime: string; endTime: string };
  SAT?: { startTime: string; endTime: string };
  SUN?: { startTime: string; endTime: string };
};

export type NewClubType = {
  _id?: string;
  clubName: string;
  clubCategoryName: string;
  selectedClassLevelNames?: ClassLevelsType[];
  clubPrices?: ClubPricesType;
  clubImage: string | File;
  clubDescription: string;
  selectedClubWorkingDays?: WeekDayType[];
  scheduledClubTimes?: ScheduledClubTimesType;
  clubAddress: string;
  clubLat: number | null;
  clubLong: number | null;
  teacherImage: string | File;
  teacherName: string;
  teacherPhone: string;
  teacherEmail: string;
  teacherProfession: string;
  teacherExperience: string;
  teacherAchievement: string;
};

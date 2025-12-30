export type ClassLevelsType = 'Elementary' | 'Middle' | 'High';

export type WeekDayType = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';

export type ClubPricesType = {
  Elementary?: number;
  Middle?: number;
  High?: number;
};

export type DaytimeType = {
  startTime: string;
  endTime: string;
};

export type ClassLevelScheduleType = {
  MON?: DaytimeType;
  TUE?: DaytimeType;
  WED?: DaytimeType;
  THU?: DaytimeType;
  FRI?: DaytimeType;
  SAT?: DaytimeType;
  SUN?: DaytimeType;
};
export type WeekScheduleType = Partial<Record<WeekDayType, DaytimeType>>;

export type ScheduledClubTimesByClassLevelsType = Partial<Record<ClassLevelsType, WeekScheduleType>>;

export type TeacherInfoType = {
  teacherImage?: string | File;
  teacherImagePreview?: string;
  teacherName?: string;
  teacherPhone?: string;
  teacherEmail?: string;
  teacherProfession?: string;
  teacherExperience?: string;
  teacherAchievement?: string;
};

export type TeachersByClassLevelsType = { [key in ClassLevelsType]?: TeacherInfoType };

export type NewClubType = {
  _id?: string;
  clubCategoryName: string;
  clubSubCategoryName: string;
  clubName: string;
  selectedClassLevelNames?: ClassLevelsType[];
  clubPrices?: ClubPricesType;
  scheduledClubTimes?: ScheduledClubTimesByClassLevelsType;
  teachersInfoByClass?: TeachersByClassLevelsType;
  clubDescription: string;
  clubImage?: string | File;
  clubImagePreview?: string;
  clubAddress: string;
  clubLat: number;
  clubLong: number;
  adminId: string;
};

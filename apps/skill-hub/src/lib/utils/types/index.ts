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

export type TimeSlotValueType = 'morning' | 'afternoon' | 'evening';

export type CategoryKeyType = 'ART' | 'LANGUAGE' | 'MUSIC' | 'SCIENCE' | 'SPORT';

export const CATEGORY_UI_MAP: Record<string, { label: string; icon: string }> = {
  ART: {
    label: 'Урлаг',
    icon: '🎨',
  },
  LANGUAGE: {
    label: 'Хэл, уран илтгэл',
    icon: '🗣️',
  },
  MUSIC: {
    label: 'Хөгжим',
    icon: '🎵',
  },
  SCIENCE: {
    label: 'Шинжлэх ухаан',
    icon: '🔬',
  },
  SPORT: {
    label: 'Спорт',
    icon: '⚽',
  },
};

export const SUBCATEGORY_ICON_MAP: Record<string, string> = {
  'Calligraphy Club': '✍️',
  'Dance Club': '💃',
  'Design Club': '🎨',
  'Drama / Theater Club': '🎭',
  'Drawing / Painting Club': '🖌️',
  'Fine Arts Club': '🖼️',
  'Handcraft / DIY Club': '🧵',
  'Photography Club': '📸',
  'Video / Media Club': '🎬',
  'Debate Club': '🗣️',
  'English Club': '🇬🇧',
  'English Speaking Club': '🗨️',
  'Essay Writing Club': '📝',
  'Literature Club': '📖',
  'Mongolian Language Club': '🇲🇳',
  'Public Speaking Club': '📢',
  'Reading Club': '📚',
  'Band / Ensemble Club': '🎷',
  'Choir Club': '🎤',
  'Guitar Club': '🎸',
  'Morin Khuur': '🎻',
  'Orchestra Club': '🎼',
  'Piano Club': '🎹',
  'Ukulele Club': '🎸',
  'Vocal Club': '🎤',
  'Yatga Club': '🎼',
  'AI / ML Club': '🤖',
  'Astronomy Club': '🌌',
  'Logic & Puzzle Club': '🧩',
  'Math Club': '➗',
  'Mobile App Development Club': '📱',
  'Chemistry Club': '⚗️',
  'Coding Club': '💻',
  'Environmental / Eco Club': '🌱',
  'Physics Club': '🔬',
  'Programming Club': '💻',
  'Python Programming Club': '🐍',
  'Robotics Club': '🤖',
  'Science Experiment Club': '🧪',
  'STEM Club': '🧬',
  'Web Development Club': '🌐',
  'Young Researchers Club': '🧑‍🔬',
  'Athletics Club': '🏃',
  'Badminton Club': '🏸',
  'Basketball Club': '🏀',
  'Boxing Club': '🥊',
  'Chess Club': '♟️',
  'Cycling Club': '🚴',
  'Football Club': '⚽',
  'Futsal Club': '⚽',
  'Gymnastics Club': '🤸',
  'Judo Club': '🥋',
  'Karate Club': '🥋',
  'Martial Arts Club': '🥋',
  'Soccer Club': '⚽',
  'Swimming Club': '🏊',
  'Table Tennis': '🏓',
  'Taekwondo Club': '🥋',
  'Tennis Club': '🎾',
  'Track & Field Club': '🏃',
  'Volleyball Club': '🏐',
  'Wrestling Club': '🤼',
};

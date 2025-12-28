export type StudyTaskStatus = 'Pending' | 'Completed' | 'Missed';

export interface StudyTask {
  id: string;
  subject: string;
  topic: string;
  duration: number;
  status: StudyTaskStatus;
}

export interface DailyPlan {
  date: string;
  tasks: StudyTask[];
}

export interface WeeklyStudyPlan {
  weekStart: string;
  days: DailyPlan[];
}

export interface GenerateStudyPlanRequest {
  subject: string;
  deadline: string;
  dailyHours: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface GenerateStudyPlanResponse {
  plan: WeeklyStudyPlan;
}

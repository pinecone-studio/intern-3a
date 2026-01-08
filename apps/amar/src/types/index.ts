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

//Homework types
export interface HomeworkHintRequest {
  question: string;
}

export interface HomeworkHintStep {
  step: number;
  hint: string;
}

export interface HomeworkHintResponse {
  steps: HomeworkHintStep[];
}

//Exam types

export interface ExamQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface GenerateExamRequest {
  subject: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface GenerateExamResponse {
  questions: ExamQuestion[];
}

export type TrackLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface LearningTrack {
  id: string;
  title: string; // "Learn English"
  subject: string; // "English"
  level: TrackLevel;
  createdAt: string;
}

export interface RoadmapStage {
  id: string;
  title: string;
  order: number;
  completed: boolean;
}

export interface LearningRoadmap {
  trackId: string;
  stages: RoadmapStage[];
}

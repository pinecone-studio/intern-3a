// lib/mock-data.native.ts

export interface ExerciseStep {
  text: string;
  image: any | undefined; // optional image
}

export interface Exercise {
  id: string;
  name: string;
  category: 'eye' | 'stretch' | 'breathing';
  duration: number;
  description: string;
  image: any | undefined; // optional image
  steps: ExerciseStep[];
}

export interface HistoryItem {
  id: string;
  exerciseId: string;
  exerciseName: string;
  category: 'eye' | 'stretch' | 'breathing';
  completedAt: string;
  status: 'completed' | 'skipped';
}

export interface Settings {
  workStartTime: string;
  workEndTime: string;
  workDays: number[];
  reminderInterval: number;
  enabledCategories: ('eye' | 'stretch' | 'breathing')[];
  soundEnabled: boolean;
  notificationsEnabled: boolean;
  theme: 'light' | 'dark' | 'system';
}

export interface Stats {
  todayCompleted: number;
  todaySkipped: number;
  totalMinutes: number;
  streak: number;
  weeklyGoal: number;
  weeklyCompleted: number;
}

// -------------------------
// EXERCISES
// -------------------------
export const mockExercises: Exercise[] = [
  // ----- EYE -----
  {
    id: 'eye-1',
    name: '20-20-20 Rule',
    category: 'eye',
    duration: 20,
    description: 'Look at something 20 feet away for 20 seconds',
    image: undefined,
    steps: [
      { text: 'Find an object 20 feet away', image: undefined },
      { text: 'Focus on it for 20 seconds', image: undefined },
      { text: 'Blink naturally', image: undefined },
    ],
  },
  {
    id: 'eye-2',
    name: 'Eye Rolling',
    category: 'eye',
    duration: 30,
    description: 'Gentle circular eye movements',
    image: undefined,
    steps: [
      { text: 'Close your eyes', image: undefined },
      { text: 'Roll eyes clockwise 5 times', image: undefined },
      { text: 'Roll eyes counter-clockwise 5 times', image: undefined },
    ],
  },
  {
    id: 'eye-3',
    name: 'Palming',
    category: 'eye',
    duration: 60,
    description: 'Rest your eyes in darkness',
    image: undefined,
    steps: [
      { text: 'Rub palms together to warm them', image: undefined },
      { text: 'Cup palms over closed eyes', image: undefined },
      { text: 'Relax and breathe deeply', image: undefined },
    ],
  },
  {
    id: 'eye-4',
    name: 'Focus Shifting',
    category: 'eye',
    duration: 45,
    description: 'Alternate between near and far focus',
    image: undefined,
    steps: [
      { text: 'Hold thumb 10 inches away', image: undefined },
      { text: 'Focus on thumb for 5 seconds', image: undefined },
      { text: 'Focus on distant object for 5 seconds', image: undefined },
      { text: 'Repeat 5 times', image: undefined },
    ],
  },

  // ----- STRETCH -----
  {
    id: 'stretch-1',
    name: 'Neck Rolls',
    category: 'stretch',
    duration: 45,
    description: 'Gentle neck stretches to release tension',
    image: 'undefined',
    steps: [
      { text: 'Drop chin to chest', image: undefined },
      { text: 'Roll head to right shoulder', image: undefined },
      { text: 'Roll back and to left', image: undefined },
      { text: 'Complete 3 circles each direction', image: undefined },
    ],
  },
  {
    id: 'stretch-2',
    name: 'Shoulder Shrugs',
    category: 'stretch',
    duration: 30,
    description: 'Release shoulder tension',
    image: undefined,
    steps: [
      { text: 'Raise shoulders to ears', image: undefined },
      { text: 'Hold for 3 seconds', image: undefined },
      { text: 'Release and relax', image: undefined },
      { text: 'Repeat 5 times', image: undefined },
    ],
  },
  {
    id: 'stretch-3',
    name: 'Wrist Circles',
    category: 'stretch',
    duration: 30,
    description: 'Loosen up your wrists',
    image: undefined,
    steps: [
      { text: 'Extend arms forward', image: undefined },
      { text: 'Make fists', image: undefined },
      { text: 'Rotate wrists 10 times each direction', image: undefined },
    ],
  },
  {
    id: 'stretch-4',
    name: 'Seated Spinal Twist',
    category: 'stretch',
    duration: 60,
    description: 'Gentle spine rotation',
    image: undefined,
    steps: [
      { text: 'Sit up straight', image: undefined },
      { text: 'Place right hand on left knee', image: undefined },
      { text: 'Twist torso left, look over shoulder', image: undefined },
      { text: 'Hold 15 seconds, switch sides', image: undefined },
    ],
  },

  // ----- BREATHING -----
  {
    id: 'breath-1',
    name: 'Box Breathing',
    category: 'breathing',
    duration: 60,
    description: '4-4-4-4 breathing pattern for calm',
    image: undefined,
    steps: [
      {
        text: 'Inhale for 4 counts',
        image: '',
      },
      {
        text: 'Hold for 4 counts',
        image: '',
      },
      {
        text: 'Exhale for 4 counts',
        image: '',
      },
      {
        text: 'Hold for 4 counts',
        image: '',
      },
      {
        text: 'Repeat 3 times',
        image: '',
      },
    ],
  },
  {
    id: 'breath-2',
    name: '4-7-8 Technique',
    category: 'breathing',
    duration: 45,
    description: 'Calming breath for stress relief',
    image: '',
    steps: [
      {
        text: 'Inhale through nose for 4 counts',
        image: '',
      },
      {
        text: 'Hold breath for 7 counts',
        image: '',
      },
      {
        text: 'Exhale through mouth for 8 counts',
        image: '',
      },
    ],
  },
  {
    id: 'breath-3',
    name: 'Deep Belly Breathing',
    category: 'breathing',
    duration: 60,
    description: 'Diaphragmatic breathing',
    image: '',
    steps: [
      {
        text: 'Place hand on belly',
        image: '',
      },
      {
        text: 'Inhale deeply, feel belly rise',
        image: '',
      },
      {
        text: 'Exhale slowly, feel belly fall',
        image: '',
      },
      {
        text: 'Repeat 5 times',
        image: '',
      },
    ],
  },
  {
    id: 'breath-4',
    name: 'Energizing Breath',
    category: 'breathing',
    duration: 30,
    description: 'Quick breathing to boost energy',
    image: '',
    steps: [
      {
        text: 'Take 3 quick, sharp inhales through nose',
        image: '',
      },
      {
        text: 'One long exhale through mouth',
        image: '',
      },
      {
        text: 'Repeat 5 times',
        image: '',
      },
    ],
  },
];

// -------------------------
// HISTORY
// -------------------------
export const mockHistory: HistoryItem[] = [
  {
    id: '1',
    exerciseId: 'eye-1',
    exerciseName: '20-20-20 Rule',
    category: 'eye',
    completedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    status: 'completed',
  },
  {
    id: '2',
    exerciseId: 'stretch-1',
    exerciseName: 'Neck Rolls',
    category: 'stretch',
    completedAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    status: 'completed',
  },
  {
    id: '3',
    exerciseId: 'breath-1',
    exerciseName: 'Box Breathing',
    category: 'breathing',
    completedAt: new Date(Date.now() - 1000 * 60 * 150).toISOString(),
    status: 'skipped',
  },
  {
    id: '4',
    exerciseId: 'eye-2',
    exerciseName: 'Eye Rolling',
    category: 'eye',
    completedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    status: 'completed',
  },
  {
    id: '5',
    exerciseId: 'stretch-2',
    exerciseName: 'Shoulder Shrugs',
    category: 'stretch',
    completedAt: new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString(),
    status: 'completed',
  },
  {
    id: '6',
    exerciseId: 'breath-2',
    exerciseName: '4-7-8 Technique',
    category: 'breathing',
    completedAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    status: 'completed',
  },
  {
    id: '7',
    exerciseId: 'eye-3',
    exerciseName: 'Palming',
    category: 'eye',
    completedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    status: 'skipped',
  },
  {
    id: '8',
    exerciseId: 'stretch-3',
    exerciseName: 'Wrist Circles',
    category: 'stretch',
    completedAt: new Date(Date.now() - 1000 * 60 * 60 * 49).toISOString(),
    status: 'completed',
  },
];

// -------------------------
// SETTINGS
// -------------------------
export const mockSettings: Settings = {
  workStartTime: '09:00',
  workEndTime: '17:00',
  workDays: [1, 2, 3, 4, 5],
  reminderInterval: 45,
  enabledCategories: ['eye', 'stretch', 'breathing'],
  soundEnabled: true,
  notificationsEnabled: true,
  theme: 'system',
};

// -------------------------
// STATS
// -------------------------
export const mockStats: Stats = {
  todayCompleted: 3,
  todaySkipped: 1,
  totalMinutes: 12,
  streak: 5,
  weeklyGoal: 20,
  weeklyCompleted: 14,
};

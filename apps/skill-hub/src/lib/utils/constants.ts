import { TimeSlotValueType } from './types';

export const TIME_SLOT_RANGES: Record<TimeSlotValueType, { start: string; end: string }> = {
  morning: { start: '06:00', end: '12:00' },
  afternoon: { start: '12:00', end: '18:00' },
  evening: { start: '18:00', end: '23:59' },
};

export const TIME_SLOT_RANGES_MN: Record<TimeSlotValueType, string> = {
  morning: 'Өглөө',
  afternoon: 'Өдөр',
  evening: 'Орой',
};

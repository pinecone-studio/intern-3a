import { TIME_SLOT_RANGES } from './constants';
import { TimeSlotValueType } from './types';

export function isTimeInSlot(startTime: string, slot: TimeSlotValueType): boolean {
  const { start, end } = TIME_SLOT_RANGES[slot];
  return startTime >= start && startTime < end;
}

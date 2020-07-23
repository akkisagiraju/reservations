import { Slot, Status } from '../types/types';

export const generateNewSlot = (
  slotID: string,
  is_reserved: Status,
  is_occupied: Status,
  points: number[]
): Slot => ({
  slotID,
  is_reserved,
  is_occupied,
  points
});

export const hello = 'Hello';

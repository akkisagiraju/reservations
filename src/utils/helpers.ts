import { Slot } from '../types/types';

export const generateNewSlot = (
  slotID: string,
  status: string,
  points: number[]
): Slot => ({
  slotID,
  status,
  points
});

export const hello = 'Hello';

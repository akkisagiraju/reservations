// eslint-disable-next-line import/no-unresolved
import { Vector2d } from 'konva/types/types';

export interface Slot {
  slotID: string;
  points: number[];
  status: string;
}

export interface StageItem {
  getPointerPosition: () => Vector2d;
}

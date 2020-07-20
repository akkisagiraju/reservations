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

export interface CameraData {
  id: string | number;
  height: number;
  width: number;
  imageUrl: string;
  slots: Slot[];
}

type Status = 0 | 1;

export interface Chair {
  chairID: string;
  chair_name: string;
  is_active: boolean;
  details: ChairDetail[];
}

export interface ChairDetail {
  from: string;
  to: string;
  reserved: Status;
  status: Status;
}

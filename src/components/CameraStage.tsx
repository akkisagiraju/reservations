/* eslint-disable import/no-unresolved */
import React from 'react';
import { Layer, Stage, Line, Image } from 'react-konva';
import { KonvaEventObject } from 'konva/types/Node';
import { Vector2d } from 'konva/types/types';
import { Slot, StageItem } from '../types/types';
import useImage from '../hooks/useImage';

const WIDTH = window.innerWidth * 0.2;
const HEIGHT = window.innerHeight * 0.2;

const generateNewSlot = (
  slotID: string,
  status: string,
  points: number[]
): Slot => ({
  slotID,
  status,
  points
});

const intialSlots: Slot[] = [
  generateNewSlot(`${Math.random() * Math.random()}`, 'Occupied', [
    100,
    200,
    300,
    200,
    300,
    300,
    100,
    300,
    100,
    200
  ])
];

const CameraStage: React.FC = () => {
  const [points, setPoints] = React.useState<number[]>([]);
  const [curMousePosition, setCurMousePosition] = React.useState<number[]>([
    0,
    0
  ]);
  const [isDrawingFinished, setIsDrawingFinished] = React.useState<boolean>(
    false
  );
  const [localSlotList, setLocalSlotList] = React.useState<Slot[]>(intialSlots);
  const [selectedSlot, setSelectedSlot] = React.useState<Slot>();

  const [image] = useImage(
    'https://images.unsplash.com/photo-1505624198937-c704aff72608?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=650&q=80'
  );

  const imageElement = image as HTMLImageElement;

  const getMousePosition = (stage: StageItem): number[] => {
    const pointerPosition = stage.getPointerPosition() as Vector2d;
    return [pointerPosition.x, pointerPosition.y];
  };

  const flattenedPoints = (p = points): number[] => {
    return p
      .concat(isDrawingFinished ? [] : curMousePosition)
      .reduce((a: number[], b) => a.concat(b), []);
  };

  const handleMouseMove = (event: KonvaEventObject<MouseEvent>): void => {
    const stage = event.target.getStage() as StageItem;
    const mousePosition = getMousePosition(stage) as number[];
    setCurMousePosition(mousePosition);
  };

  const canDraw = (event: KonvaEventObject<MouseEvent>): boolean => {
    if (isDrawingFinished) {
      console.log('isDrawingFinished', isDrawingFinished);
      return false;
    }
    if (event.evt.button === 2) {
      return false;
    }
    return true;
  };

  const followMouse = (mousePosition: number[]): void => {
    setPoints((prevPoints) => prevPoints.concat(mousePosition));
  };

  const polygonFinished = (mousePosition: number[]): void => {
    const newPoints = points.concat(mousePosition, points[0]);
    const newLocalSlotList = localSlotList.concat(
      generateNewSlot(
        `${Math.random() * Math.random()}`,
        'Available',
        newPoints
      )
    );
    setLocalSlotList(newLocalSlotList);
    // updateSlotData(updatedSlot); // This is an API put request
    setPoints([]);
    setSelectedSlot({
      slotID: '',
      points: [],
      status: ''
    });
  };

  const plotNewPoint = (event: KonvaEventObject<MouseEvent>): void => {
    const stage = event.target.getStage() as StageItem;
    const mousePosition = getMousePosition(stage);
    if (!canDraw(event)) {
      return;
    }
    if (points.length === 6) {
      polygonFinished(mousePosition);
    } else {
      followMouse(mousePosition);
    }
  };

  const handlePolygonClick = async (event: KonvaEventObject<MouseEvent>) => {
    // Do nothing if it is not a right click
    if (event.evt.button !== 2) {
      return;
    }

    // Remove target slot if it as right click
    console.log('Right click');
    const targetSlotID = event.currentTarget.attrs.id;
    const newSlotsAfterRemoval: Slot[] = localSlotList.filter(
      (slot) => slot.slotID !== targetSlotID
    );
    setLocalSlotList(newSlotsAfterRemoval);
    // updateSlotData(updatedSlot); // This has to be an update API request
  };

  return (
    <Stage
      width={WIDTH}
      height={HEIGHT}
      style={{ border: '1px solid black', width: WIDTH, height: HEIGHT }}
      onMouseDown={plotNewPoint}
      onMouseMove={handleMouseMove}
      onContextMenu={(e) => e.evt.preventDefault()}
    >
      <Layer>
        <Image image={imageElement} />
      </Layer>
      <Layer>
        <Line
          points={flattenedPoints()}
          stroke="black"
          strokeWidth={2}
          closed={isDrawingFinished}
          fill="blue"
          draggable
          onClick={handlePolygonClick}
          onDragStart={() => setIsDrawingFinished(true)}
          onDragMove={() => setIsDrawingFinished(true)}
          onDragEnd={() => setIsDrawingFinished(true)}
        />
        {localSlotList.map((slot) => (
          <Line
            key={slot.slotID}
            id={slot.slotID}
            points={slot.points}
            stroke={slot.status === 'Available' ? 'green' : 'red'}
            closed
            onClick={handlePolygonClick}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default CameraStage;

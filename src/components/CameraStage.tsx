/* eslint-disable import/no-unresolved */
import React from 'react';
import { Layer, Stage, Line, Image } from 'react-konva';
import { KonvaEventObject } from 'konva/types/Node';
import { Vector2d } from 'konva/types/types';
import { Slot, StageItem } from '../types/types';
import useImage from '../hooks/useImage';
import { Container } from '../styles/componentStyles';
import { generateNewSlot } from '../utils/helpers';

interface CameraStageProps {
  imageUrl: string;
  width: number;
  height: number;
  slots: Slot[];
  areSlotsDrawable?: boolean;
  openModal: (id: string) => void;
}

const CameraStage: React.FC<CameraStageProps> = ({
  imageUrl,
  width,
  height,
  slots,
  areSlotsDrawable = false,
  openModal
}) => {
  const [points, setPoints] = React.useState<number[]>([]);
  const [curMousePosition, setCurMousePosition] = React.useState<number[]>([
    0,
    0
  ]);
  const [isDrawingFinished, setIsDrawingFinished] = React.useState<boolean>(
    false
  );
  const [localSlotList, setLocalSlotList] = React.useState<Slot[]>(slots);
  const [selectedSlot, setSelectedSlot] = React.useState<Slot>();
  const [image] = useImage(imageUrl);
  const imageElement = image as HTMLImageElement;

  if (!localSlotList) {
    return (
      <Container style={{ border: '1px solid black', width, height }}>
        <p>No slot data available</p>
      </Container>
    );
  }

  const getMousePosition = (stage: StageItem): number[] => {
    const pointerPosition = stage.getPointerPosition() as Vector2d;
    return [pointerPosition.x, pointerPosition.y];
  };

  const flattenedPoints = (): number[] => {
    return points
      .concat(isDrawingFinished ? [] : curMousePosition)
      .reduce((a: number[], b) => a.concat(b), []);
  };

  const handleMouseMove = (event: KonvaEventObject<MouseEvent>): void => {
    const stage = event.target.getStage() as StageItem;
    const mousePosition = getMousePosition(stage) as number[];
    setCurMousePosition(mousePosition);
  };

  const canDraw = (event: KonvaEventObject<MouseEvent>): boolean => {
    if (!areSlotsDrawable || isDrawingFinished || event.evt.button === 2) {
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
      generateNewSlot(`${Math.random() * Math.random()}`, 0, 0, newPoints)
    );
    setLocalSlotList(newLocalSlotList);
    // updateSlotData(updatedSlot); // This is an API put request
    setPoints([]);
    setSelectedSlot({
      slotID: '',
      points: [],
      is_reserved: 0,
      is_occupied: 0
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
    event.evt.preventDefault();
    openModal(event.target.attrs.id);
    // const targetSlotID = event.currentTarget.attrs.id;
    // const newSlotsAfterRemoval: Slot[] = localSlotList.filter(
    //   (slot) => slot.slotID !== targetSlotID
    // );
    // setLocalSlotList(newSlotsAfterRemoval);
    // // updateSlotData(updatedSlot); // This has to be an update API request
  };

  return (
    <Stage
      width={width}
      height={height}
      style={{ border: '1px solid black', width, height }}
      onMouseDown={plotNewPoint}
      onMouseMove={handleMouseMove}
      onContextMenu={(e: KonvaEventObject<MouseEvent>) =>
        e.evt.preventDefault()
      }
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
          onDragStart={() => setIsDrawingFinished(true)}
          onDragMove={() => setIsDrawingFinished(true)}
          onDragEnd={() => setIsDrawingFinished(true)}
        />
        {slots.map((slot) => (
          <Line
            key={slot.slotID}
            id={slot.slotID}
            points={slot.points}
            stroke={slot.is_reserved === 0 ? 'green' : 'red'}
            closed
            onClick={handlePolygonClick}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default CameraStage;

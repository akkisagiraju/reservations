import React from 'react';
import { API } from 'aws-amplify';
import { useHistory } from 'react-router-dom';
import {
  makeStyles,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button
} from '@material-ui/core';
import { Layer, Stage, Line } from 'react-konva';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100vw',
    display: 'flex',
    '&>*': {
      flex: 1,
      height: theme.spacing(10),
      paddingLeft: theme.spacing(1)
    }
  }
}));

const WIDTH = window.innerWidth - 200;
const HEIGHT = window.innerHeight - 240;

const statuses = [
  { color: 'silver', status: 'Available' },
  { color: 'green', status: 'Occupied' },
  { color: 'red', status: 'Wrong Parking' },
  { color: 'lightblue', status: 'VIP Parking' },
  { color: 'orange', status: 'Visitors Parking' }
];

const Map = () => {
  const classes = useStyles();
  const history = useHistory();
  const [slotList, setSlotList] = React.useState([]);
  const [linePointCollection, setLinePointCollection] = React.useState([]);
  const [selectedSlot, setSelectedSlot] = React.useState({});

  const [points, setPoints] = React.useState([]);
  const [curMousePosition, setCurMousePosition] = React.useState([0, 0]);
  const [isFinished, setIsFinished] = React.useState(true);
  const getSlots = React.useCallback(async () => {
    const response = await API.get('Beta', '/slot/getapi/slot-list', {
      queryStringParameters: {
        zoneID: history.location.state.id
      }
    });
    setSlotList(response);
    setLinePointCollection(response);
  }, [history]);

  React.useEffect(() => {
    let cancel = false;
    if (!cancel) {
      getSlots();
    }

    return () => {
      cancel = true;
    };
  }, [getSlots]);

  const updateSlotData = async (updatedSlot) => {
    const response = await API.post('Beta', '/slot/postapi/update-slot', {
      body: {
        slotID: updatedSlot.slotID,
        slot_name: updatedSlot.slot_name,
        unique_name: updatedSlot.unique_name,
        points: updatedSlot.points,
        zoneID: updatedSlot.zoneID,
        beaconID: updatedSlot.beaconID,
        is_active: updatedSlot.is_active,
        is_vip: updatedSlot.is_vip,
        is_visitor: updatedSlot.is_visitor,
        is_jeep: updatedSlot.is_jeep
      }
    });
    console.log(response);
    setTimeout(() => getSlots(), 9000);
  };

  const flattenedPoints = (p = points) => {
    return p
      .concat(isFinished ? [] : curMousePosition)
      .reduce((a, b) => a.concat(b), []);
  };

  const getMousePosition = (stage) => {
    return [stage.getPointerPosition().x, stage.getPointerPosition().y];
  };

  const handleClick = (event) => {
    const stage = event.target.getStage();
    const mousePosition = getMousePosition(stage);

    if (isFinished) {
      return;
    }
    if (event.evt.button === 2) {
      return;
    }

    if (points.length === 3) {
      const newPoints = points.concat(mousePosition, points[0]);
      const flattedNewPoints = newPoints.reduce((a, b) => a.concat(b), []);
      const updatedSlot = { ...selectedSlot, points: flattedNewPoints };
      const newPointsCollection = linePointCollection.map((slot) => {
        if (slot.slotID === selectedSlot.slotID) {
          return updatedSlot;
        }
        return slot;
      });
      setLinePointCollection(newPointsCollection);
      updateSlotData(updatedSlot);
      setPoints([]);
      setSelectedSlot({});
    } else {
      setPoints([...points, mousePosition]);
    }
  };

  const handleMouseMove = (event) => {
    const stage = event.target.getStage();
    const mousePosition = getMousePosition(stage);
    setCurMousePosition(mousePosition);
  };

  const handlePolygonClick = async (event) => {
    if (event.evt.button === 2) {
      console.log('Right click');
      const updatedSlot = { ...selectedSlot, points: '[]' };
      const tempSlotsCollection = linePointCollection.map((slot) => {
        if (slot.slotID === selectedSlot.slotID) {
          return updatedSlot;
        }
        return slot;
      });
      console.log(tempSlotsCollection);
      setLinePointCollection(tempSlotsCollection);
      updateSlotData(updatedSlot);
    }
  };

  const slotSelect = (_event, slot) => {
    setPoints([]);
    setSelectedSlot(slot);
    setIsFinished(false);
  };

  const handleDragEnd = (event) => {
    console.log(event);
  };

  return (
    <div>
      <div className={classes.container}>
        {statuses.map((s) => (
          <div key={s.status} style={{ backgroundColor: s.color }}>
            {s.status}
          </div>
        ))}
      </div>
      <h1 style={{ textAlign: 'center', marginBottom: 0 }}>
        {history.location.state.name}
      </h1>
      <div
        style={{
          padding: '0 16px 16px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div>
          <h2>Instructions:</h2>
          <Typography>1. Click on a slot name to select it.</Typography>
          <Typography>2. Draw a polygon shape to mark it.</Typography>
          <Typography>
            3. Right click on the selected slot marking to delete it.
          </Typography>
        </div>
        <Button
          color="primary"
          variant="contained"
          onClick={() => history.push('/dashboard')}
        >
          Go back to Dashboard
        </Button>
      </div>
      <Grid container>
        <Grid item lg={10} md={10}>
          <Stage
            width={WIDTH}
            height={HEIGHT}
            style={{ border: '1px solid black' }}
            onMouseDown={handleClick}
            onMouseMove={handleMouseMove}
            onContextMenu={(e) => e.evt.preventDefault()}
          >
            <Layer>
              <Line
                points={flattenedPoints()}
                stroke="black"
                strokeWidth={2}
                closed={isFinished}
                fill="white"
                draggable
                onClick={handlePolygonClick}
                onDragStart={() => setIsFinished(true)}
                onDragMove={() => setIsFinished(true)}
                onDragEnd={() => setIsFinished(true)}
              />
              {(linePointCollection || []).map((slot) => (
                <Line
                  key={slot.slotID}
                  id={slot.slotID}
                  points={
                    typeof slot.points === 'string'
                      ? JSON.parse(slot.points)
                      : slot.points
                  }
                  stroke={
                    slot.slotID === selectedSlot.slotID ? 'blue' : 'black'
                  }
                  strokeWidth={slot.slotID === selectedSlot.slotID ? 6 : 2}
                  closed
                  fill={slot.status === 'Available' ? 'silver' : 'green'}
                  draggable
                  onClick={handlePolygonClick}
                  onDragStart={() => setIsFinished(true)}
                  onDragMove={() => setIsFinished(true)}
                  onDragEnd={handleDragEnd}
                />
              ))}
            </Layer>
          </Stage>
        </Grid>
        <Grid item lg={2} md={12}>
          <h3 style={{ padding: 16, margin: 0 }}>Available Slots</h3>
          <List>
            {(slotList || []).map((slot) => (
              <ListItem
                button
                divider
                key={slot.slotID}
                selected={slot.slotID === selectedSlot.slotID}
                onClick={(event) => slotSelect(event, slot)}
              >
                <ListItemText>{slot.slot_name}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </div>
  );
};

export default Map;

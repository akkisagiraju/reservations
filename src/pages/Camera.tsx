import React from 'react';
import { useHistory } from 'react-router-dom';
import { API } from 'aws-amplify';
import { generateNewSlot } from '../utils/helpers';
import { Container } from '../styles/componentStyles';
import CameraStage from '../components/CameraStage';
import Chair from '../components/Chair';
import { Chair as ChairType } from '../types/types';

interface HistoryState {
  name: string;
  id: string;
}

const Camera: React.FC = () => {
  const history = useHistory();
  const [fetchedSlotList, setFetchedSlotList] = React.useState<ChairType[]>([]);

  const cameraDetails = history.location.state as HistoryState;

  const getSlotList = React.useCallback(async (cameraID: string): Promise<
    void
  > => {
    const response = await API.get('Beta', '/chair/getapi/chair-list', {
      queryStringParameters: {
        cameraID
      }
    });
    console.log(response);
    setFetchedSlotList(response);
  }, []);

  // const getCamDetails = React.useCallback(async (cameraID: string): Promise<
  //   void
  // > => {
  //   const response = await API.get('Beta', '/camera/getapi/camera-details', {
  //     queryStringParameters: {
  //       cameraID
  //     }
  //   });
  //   console.log(response);
  // }, []);

  React.useEffect(() => {
    getSlotList(cameraDetails.id.substring(3, cameraDetails.id.length - 1));
  }, [cameraDetails, getSlotList]);

  return (
    <Container column className="container">
      <h1>{cameraDetails.name}</h1>
      <CameraStage
        width={800}
        height={450}
        imageUrl="https://images.unsplash.com/photo-1505624198937-c704aff72608?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
        slots={[generateNewSlot('', '', [])]}
        isPreview
      />
      <Container
        column
        className="chairs-container"
        style={{ maxWidth: '800px', width: '100%', alignItems: 'start' }}
      >
        <h2>Slots</h2>
        {fetchedSlotList.map((chair) => (
          <Chair
            key={chair.chairID}
            name={chair.chair_name}
            isActive={chair.is_active}
            details={chair.details}
          />
        ))}
      </Container>
    </Container>
  );
};

export default Camera;

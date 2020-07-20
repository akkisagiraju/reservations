/* eslint-disable import/no-unresolved */
import React from 'react';
import { API } from 'aws-amplify';
import { Container, Grid } from '../styles/componentStyles';
import CameraFeed from '../components/CameraFeed';

interface CameraObjectFromAPI {
  camera_name: string;
  cameraID: string;
  macID: string;
  is_active: boolean;
}

const Home: React.FC = () => {
  const [fetchedCameraList, setFetchedCameraList] = React.useState<
    CameraObjectFromAPI[]
  >([]);

  const getCameraList = React.useCallback(async (): Promise<void> => {
    const response = await API.get('Beta', '/camera/getapi/camera-list', {});
    setFetchedCameraList(response);
  }, []);

  React.useEffect(() => {
    getCameraList();
  }, [getCameraList]);

  return (
    <>
      <div id="modal" />
      <Container column>
        <h1>Reservations</h1>
        <Grid>
          {fetchedCameraList.map((cam) => (
            <CameraFeed
              key={cam.cameraID}
              id={cam.cameraID}
              name={cam.camera_name}
            />
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Home;

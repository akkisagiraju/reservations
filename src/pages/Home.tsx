/* eslint-disable import/no-unresolved */
import React from 'react';
import Container from '../styles/Container';
import CameraStage from '../components/CameraStage';

const Home: React.FC = () => {
  // const [fetchedSlotList, setFetchedSlotList] = React.useState<Slot[]>();

  return (
    <Container column>
      <h1>Reservations</h1>
      <Container>
        <CameraStage />
        <CameraStage />
      </Container>
    </Container>
  );
};

export default Home;

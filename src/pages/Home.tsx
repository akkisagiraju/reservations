/* eslint-disable import/no-unresolved */
import React from 'react';
import { Container, Grid } from '../styles/componentStyles';
import CameraStage from '../components/CameraStage';
import { generateNewSlot } from '../utils/helpers';

const Home: React.FC = () => {
  // const [fetchedSlotList, setFetchedSlotList] = React.useState<Slot[]>();

  return (
    <Container column>
      <h1>Reservations</h1>
      <Grid>
        <CameraStage
          width={400}
          height={225}
          imageUrl="https://images.unsplash.com/photo-1505624198937-c704aff72608?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=550&q=80"
          slots={[generateNewSlot('', '', [])]}
        />
        <CameraStage
          width={400}
          height={225}
          imageUrl="https://images.unsplash.com/photo-1556565681-67b9cd907d20?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80"
          slots={[generateNewSlot('', '', [])]}
        />
        <CameraStage
          width={400}
          height={225}
          imageUrl="https://images.unsplash.com/photo-1462826303086-329426d1aef5?ixlib=rb-1.2.1&auto=format&fit=crop&w=450&q=80"
          slots={[generateNewSlot('', '', [])]}
        />
        <CameraStage
          width={400}
          height={225}
          imageUrl="https://images.unsplash.com/photo-1516258432871-b924b9b34d03?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=550&q=80"
          slots={[generateNewSlot('', '', [])]}
        />
        <CameraStage
          width={400}
          height={225}
          imageUrl="https://images.unsplash.com/photo-1524868857876-218cafbdda8b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=450&q=80"
          slots={[generateNewSlot('', '', [])]}
        />
      </Grid>
    </Container>
  );
};

export default Home;

/* eslint-disable import/no-unresolved */
import React from 'react';
import { Container, Grid, CamContainer } from '../styles/componentStyles';
import CameraStage from '../components/CameraStage';
import { generateNewSlot } from '../utils/helpers';
import ModalContainer from '../components/Modal';

const Home: React.FC = () => {
  // const [fetchedSlotList, setFetchedSlotList] = React.useState<Slot[]>();
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [activeCamera, setActiveCamera] = React.useState<
    number | string | null
  >(null);

  const cameraData = [
    {
      id: 1,
      width: 400,
      height: 225,
      imageUrl:
        'https://images.unsplash.com/photo-1505624198937-c704aff72608?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=550&q=80',
      slots: [generateNewSlot('', '', [])]
    },
    {
      id: 2,
      width: 400,
      height: 225,
      imageUrl:
        'https://images.unsplash.com/photo-1556565681-67b9cd907d20?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=80',
      slots: [generateNewSlot('', '', [])]
    },
    {
      id: 3,
      width: 400,
      height: 225,
      imageUrl:
        'https://images.unsplash.com/photo-1462826303086-329426d1aef5?ixlib=rb-1.2.1&auto=format&fit=crop&w=450&q=80',
      slots: [generateNewSlot('', '', [])]
    },
    {
      id: 4,
      width: 400,
      height: 225,
      imageUrl:
        'https://images.unsplash.com/photo-1516258432871-b924b9b34d03?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=550&q=80',
      slots: [generateNewSlot('', '', [])]
    },
    {
      id: 5,
      width: 400,
      height: 225,
      imageUrl:
        'https://images.unsplash.com/photo-1524868857876-218cafbdda8b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=450&q=80',
      slots: [generateNewSlot('', '', [])]
    }
  ];

  const selectCameraToPreview = (id: string | number): void => {
    setActiveCamera(id);
    setOpenModal(true);
  };

  const closePreview = (): void => {
    setActiveCamera(null);
    setOpenModal(false);
  };

  return (
    <>
      <div id="modal" />
      <Container column>
        <h1>Reservations</h1>
        <Grid>
          {cameraData.map((cam) => (
            <CamContainer
              key={cam.id}
              onClick={() => selectCameraToPreview(cam.id)}
              role="button"
              aria-hidden="true"
            >
              <CameraStage
                width={cam.width}
                height={cam.height}
                imageUrl={cam.imageUrl}
                slots={cam.slots}
              />
            </CamContainer>
          ))}
        </Grid>
      </Container>
      {openModal ? (
        <ModalContainer open={openModal} onClose={closePreview}>
          {activeCamera
            ? cameraData.map((cam) => {
                if (cam.id === activeCamera) {
                  return (
                    <CameraStage
                      width={800}
                      height={450}
                      isPreview={activeCamera === cam.id}
                      imageUrl={cam.imageUrl}
                      slots={cam.slots}
                    />
                  );
                }
                return null;
              })
            : null}
        </ModalContainer>
      ) : null}
    </>
  );
};

export default Home;

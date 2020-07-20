import React from 'react';
import { API } from 'aws-amplify';
import { generateNewSlot } from '../utils/helpers';
import { Container, Button } from '../styles/componentStyles';
import CameraStage from './CameraStage';
import { Chair as ChairType } from '../types/types';
import ModalContainer from './Modal';

interface CameraFeedProps {
  id: string;
  name: string;
}

const CameraFeed: React.FC<CameraFeedProps> = ({ id, name }) => {
  const [fetchedSlotList, setFetchedSlotList] = React.useState<ChairType[]>([]);
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

  const openModal = (): void => {
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
  };

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

  React.useEffect(() => {
    getSlotList(id.substring(3, id.length - 1));
  }, [id, getSlotList]);

  return (
    <Container column className="container">
      <p>{name}</p>
      <CameraStage
        width={800}
        height={450}
        imageUrl="https://images.unsplash.com/photo-1505624198937-c704aff72608?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
        slots={[
          generateNewSlot(`${Math.random() * Math.random()}`, 'Available', [
            492.5,
            425.23333740234375,
            495.5,
            345.23333740234375,
            758.5,
            314.23333740234375,
            761.5,
            436.23333740234375,
            492.5
          ])
        ]}
        openModal={openModal}
      />
      {isModalOpen ? (
        <ModalContainer open={isModalOpen} onClose={closeModal}>
          <h2>Book seat</h2>
          <div style={{ alignSelf: 'start', padding: '0px 80px' }}>
            <p>Status:</p>
            <p>Timings:</p>
          </div>
          <Button>Confirm</Button>
        </ModalContainer>
      ) : null}
    </Container>
  );
};

export default CameraFeed;

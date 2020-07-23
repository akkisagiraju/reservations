import React from 'react';
import { API } from 'aws-amplify';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
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
  const [fetchedChairList, setFetchedChairList] = React.useState<ChairType[]>(
    []
  );
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [fromDate, setFromDate] = React.useState<Date>(new Date());
  const [toDate, setToDate] = React.useState<Date>(new Date());

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
    setFetchedChairList(response);
  }, []);

  React.useEffect(() => {
    getSlotList(id.substring(3, id.length - 1));
  }, [id, getSlotList]);

  const chairs = fetchedChairList.map((chair) =>
    generateNewSlot(chair.chairID, chair.is_reserved, chair.is_occupied, [
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
  );

  return (
    <Container column className="container">
      <p>{name}</p>
      <CameraStage
        width={800}
        height={450}
        imageUrl="https://images.unsplash.com/photo-1505624198937-c704aff72608?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
        slots={chairs}
        // slots={[
        //   generateNewSlot(`${Math.random() * Math.random()}`, 'Available', [
        //     492.5,
        //     425.23333740234375,
        //     495.5,
        //     345.23333740234375,
        //     758.5,
        //     314.23333740234375,
        //     761.5,
        //     436.23333740234375,
        //     492.5
        //   ])
        // ]}
        openModal={openModal}
      />
      {isModalOpen ? (
        <ModalContainer open={isModalOpen} onClose={closeModal}>
          <h2>Book seat</h2>
          <div style={{ alignSelf: 'start', padding: '0px 80px' }}>
            <div style={{ margin: '12px auto' }}>
              From:
              <DatePicker
                selected={fromDate}
                onChange={(date: Date) => setFromDate(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="dd-MM-yyyy HH:mm"
              />
            </div>
            <div style={{ margin: '12px auto' }}>
              To:
              <DatePicker
                selected={toDate}
                onChange={(date: Date) => setToDate(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="dd-MM-yyyy HH:mm"
              />
            </div>
          </div>
          <Button>Confirm</Button>
        </ModalContainer>
      ) : null}
    </Container>
  );
};

export default CameraFeed;

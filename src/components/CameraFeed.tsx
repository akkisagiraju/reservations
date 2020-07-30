import React from 'react';
import { API } from 'aws-amplify';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { generateNewSlot } from '../utils/helpers';
import { Container, Button, Loader } from '../styles/componentStyles';
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
  const [activeChair, setActiveChair] = React.useState<ChairType | null>();
  const [loading, setLoading] = React.useState<boolean>(false);

  const openModal = (id: string): void => {
    const targetChair = fetchedChairList.find((chair) => chair.chairID === id);
    console.log(targetChair);
    setActiveChair(targetChair);
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setActiveChair(null);
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

  const requestFinished = (): void => {
    closeModal();
    setLoading(false);
  };

  // add a function to submit from and to date booking
  const bookChair = async () => {
    setLoading(true);
    const postBody = [
      {
        chairID: activeChair?.chairID.substring(7, 43),
        fromtime: moment(fromDate).format('DD-MM-YYYY HH:mm:ss'),
        totime: moment(toDate).format('DD-MM-YYYY HH:mm:ss')
      }
    ];
    try {
      await API.post('Beta', '/dashboard/postapi/create-data', {
        body: postBody
      });
      requestFinished();
    } catch (error) {
      console.log(error.message);
      requestFinished();
    }
  };

  return (
    <Container column className="container">
      <p>{name}</p>
      <CameraStage
        width={800}
        height={450}
        imageUrl="https://images.unsplash.com/photo-1505624198937-c704aff72608?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80"
        slots={chairs}
        openModal={openModal}
      />
      {isModalOpen ? (
        <ModalContainer open={isModalOpen} onClose={closeModal}>
          <h2>Book seat</h2>
          <div>
            <table>
              <tbody>
                <tr>
                  <td>From:</td>
                  <td>
                    <DatePicker
                      selected={fromDate}
                      onChange={(date: Date) => setFromDate(date)}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      timeCaption="Time"
                      dateFormat="dd-MM-yyyy HH:mm"
                    />
                  </td>
                </tr>
                <tr>
                  <td>To:</td>
                  <td>
                    <DatePicker
                      selected={toDate}
                      onChange={(date: Date) => setToDate(date)}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      timeCaption="Time"
                      dateFormat="dd-MM-yyyy HH:mm"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {!loading ? <Button onClick={bookChair}>Confirm</Button> : <Loader />}
          <h2>Booking history for this seat</h2>
          {activeChair?.details.map((detail) => (
            <div key={detail.SK}>
              <table>
                <thead style={{ fontWeight: 500 }}>
                  <tr>
                    <td>From</td>
                    <td>To</td>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{detail.from}</td>
                    <td>{detail.to}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </ModalContainer>
      ) : null}
    </Container>
  );
};

export default CameraFeed;

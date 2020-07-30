import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

interface Modal {
  open: boolean;
  onClose: () => void;
}

const Modal = styled.div`
  background-color: white;
  position: fixed;
  justify-self: center;
  top: 25vh;
  left: 30vw;
  right: 30vw;
  bottom: 25vh;
  z-index: 5;
  border-radius: 8px;
  max-height: calc(100% - 200px);
  display: flex;
  flex-direction: column;
  @media (max-width: 500px) {
    left: 0px;
    margin: 0px 10px;
  }
`;

const ModalContent = styled.div`
  overflow: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const ModalShadow = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0px;
  background-color: black;
  opacity: 0.7;
  z-index: 4;
`;

const ModalContainer: React.FC<Modal> = ({ open, onClose, children }) => {
  return ReactDOM.createPortal(
    <>
      <ModalShadow onClick={onClose} />
      <Modal>
        <ModalContent>{children}</ModalContent>
      </Modal>
    </>,
    document.getElementById('modal') as HTMLElement
  );
};

export default ModalContainer;

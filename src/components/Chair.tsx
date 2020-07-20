import React from 'react';
import styled from 'styled-components';
import { Container } from '../styles/componentStyles';
import { ChairDetail } from '../types/types';

interface ChairProps {
  name: string;
  isActive?: boolean;
  details: ChairDetail[];
}

const ChairContainer = styled(Container)<{ active?: boolean }>`
  border: 1px solid black;
  width: 100%;
  justify-content: space-around;
  color: ${(props) => (props.active ? 'inherit' : 'grey')};
  border-radius: 4px;
`;

const Chair: React.FC<ChairProps> = ({ name, isActive, details }) => {
  return (
    <ChairContainer active={isActive} className="chair-container">
      <h4>{name}</h4>
      <div>
        From<p>{details[0].from}</p>
      </div>
      <div>
        To<p>{details[0].to}</p>
      </div>
      <div>
        Reserved
        <div
          style={{
            height: '10px',
            width: '10px',
            borderRadius: '100%',
            backgroundColor: details[0].reserved ? 'green' : 'red'
          }}
        />
      </div>
      <div>
        Occupied
        <div
          style={{
            height: '10px',
            width: '10px',
            borderRadius: '100%',
            backgroundColor: details[0].status ? 'green' : 'red'
          }}
        />
      </div>
    </ChairContainer>
  );
};

export default Chair;

import styled from 'styled-components';

export const Container = styled.div<{ column?: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.column ? 'column' : 'row')};
  justify-content: center;
  align-items: center;
`;

export const Grid = styled.div`
  display: grid;
  width: 80%;
  grid-template-columns: auto;
  grid-template-rows: repeat(auto-fill, 1fr);
  grid-gap: 24px 0px;
  justify-items: center;
  justify-content: center;

  @media (min-width: 900px) {
    grid-template-columns: auto auto;
  }

  @media (min-width: 1296px) {
    grid-template-columns: auto auto auto;
  }
`;

export const TempCamContainer = styled(Container)`
  width: 800px;
  border: 1px solid black;
  height: 450px;
`;

export const Button = styled.button`
  background-color: #8e44ad;
  color: #fff;
  padding: 4px 12px;
  border: 1px solid #8e44ad;
  border-radius: 4px;
  box-shadow: 0px 0.5px 0.5px 0.5px rgba(0, 0, 0, 0.5);
`;

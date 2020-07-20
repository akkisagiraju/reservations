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
  grid-gap: 24px;
  justify-items: center;
  justify-content: center;

  @media (min-width: 900px) {
    grid-template-columns: auto auto;
  }

  @media (min-width: 1296px) {
    grid-template-columns: auto auto auto;
  }
`;

export const CamContainer = styled(Container)`
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

export const TempCamContainer = styled(CamContainer)`
  width: 400px;
  border: 1px solid black;
  height: 225px;
`;

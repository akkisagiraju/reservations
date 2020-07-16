import styled from 'styled-components';

const Container = styled.div<{ column?: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.column ? 'column' : 'row')};
  justify-content: center;
  align-items: center;
`;

export default Container;

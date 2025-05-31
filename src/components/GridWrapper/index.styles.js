import styled from "styled-components";

const GridWrapperEl = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(350px, auto));
  gap: 16px;
  justify-content: center;
  @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
  }
`;

export default GridWrapperEl;

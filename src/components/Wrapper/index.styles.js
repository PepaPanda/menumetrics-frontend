import styled from "styled-components";

const WrapperEl = styled.div`
  position: relative;
  width: 85%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  border: ${props => (props.$border ? "2px solid black" : "none")};
  @media (max-width: ${props => props.$colFrom}) {
    width: 93%;
    flex-direction: column;
    gap: 10px;
  }
`;

export default WrapperEl;

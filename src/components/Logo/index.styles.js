import styled from "styled-components";

const ImgEl = styled.img`
  width: 65px;
  height: 65px;
  position: absolute;
  left: 10px;
  top: 0;
  @media (max-width: 500px) {
    position: relative;
  }
`;

export { ImgEl };

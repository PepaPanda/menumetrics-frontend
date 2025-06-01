import styled from "styled-components";
import { Link } from "react-router-dom";

const OuterWrapperEl = styled(Link)`
  width: 400px;
  border: 2px solid rgb(177, 177, 177);
  border-radius: 7px;
  display: flex;
  justify-content: space-between;
  padding: 6px 15px;
  transition: 0.3s ease;
  @media (max-width: 500px) {
    width: 95%;
  }

  &:hover {
    border-color: black;
  }
`;

export { OuterWrapperEl };

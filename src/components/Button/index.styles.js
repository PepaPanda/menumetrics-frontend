import styled from "styled-components";

const ButtonEl = styled.button`
  width: fit-content;
  border: 2px solid black;
  border-radius: 7px;
  padding: 5px 9px;
  transition: 0.2s ease;
  &:hover {
    ${({ $theme }) => {
      if ($theme === "regular")
        return "background-color: rgba(209, 255, 166, 0.74);";
      if ($theme === "danger")
        return "background-color: rgba(255, 48, 48, 0.74);";
    }};
  }
`;

export { ButtonEl };

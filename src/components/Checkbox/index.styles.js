import styled from "styled-components";

const CheckboxEl = styled.input`
  transition: 0.2s ease;
  margin-left: 10px;
  -webkit-appearance: none;
  width: 30px;
  height: 30px;
  background: white;
  border-radius: 5px;
  border: 2px solid #555;
  &:checked {
    background: #abd;
    border-radius: 10px;
  }
`;

const LabelWrapperEl = styled.label`
  display: flex;
  align-items: center;
`;

export { CheckboxEl, LabelWrapperEl };

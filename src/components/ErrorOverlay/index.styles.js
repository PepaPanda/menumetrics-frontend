import styled from "styled-components";

export const ErrorContainer = styled.div`
  position: fixed;
  top: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  max-width: 90%;
`;

export const ErrorBox = styled.div`
  background-color: #fee2e2;
  color: #991b1b;
  padding: 1rem 1.25rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

export const ErrorMessage = styled.span`
  font-size: 0.9rem;
  flex-grow: 1;
  word-break: break-word;
`;

export const DismissButton = styled.button`
  background: none;
  border: none;
  color: #991b1b;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0;
  line-height: 1;
`;

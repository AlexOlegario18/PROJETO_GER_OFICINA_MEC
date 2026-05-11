import styled, { css, keyframes } from "styled-components";

// Input styles
export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
`;

export const Label = styled.label`
  color: #1a2233;
  font-weight: 600;
  margin-bottom: 0.5rem;
  letter-spacing: 0.5px;
`;

export const StyledInput = styled.input`
  padding: 0.75rem 1rem;
  border: 2px solid #232b38;
  border-radius: 6px;
  background: #181c22;
  color: #e3e6ea;
  font-size: 1rem;
  outline: none;
  transition: border 0.2s, box-shadow 0.2s;

  &:focus {
    border-color: #1e3a5c;
    box-shadow: 0 0 0 2px #1e3a5c33;
  }

  ${({ $hasError }) =>
    $hasError &&
    css`
      border-color: #e53935;
      background: #2a1818;
    `}
`;

export const ErrorMsg = styled.span`
  color: #e53935;
  font-size: 0.92rem;
  margin-top: 0.3rem;
  font-weight: 500;
`;

// Button styles
export const StyledButton = styled.button`
  padding: 0.75rem 2rem;
  background: linear-gradient(90deg, #1e3a5c 60%, #232b38 100%);
  color: #e3e6ea;
  font-weight: 700;
  border: none;
  border-radius: 6px;
  font-size: 1.05rem;
  cursor: pointer;
  transition: background 0.2s, opacity 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 120px;
  position: relative;

  &:hover:not(:disabled) {
    background: linear-gradient(90deg, #232b38 60%, #1e3a5c 100%);
    opacity: 0.95;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${({ $loading }) =>
    $loading &&
    css`
      pointer-events: none;
    `}
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const Spinner = styled.div`
  width: 22px;
  height: 22px;
  border: 3px solid #e3e6ea;
  border-top: 3px solid #1e3a5c;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

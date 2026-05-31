import styled from "styled-components";

export const LoginContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(120deg, #181c22 60%, #232b38 100%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoginCard = styled.div`
  background: #232b38;
  border-radius: 12px;
  box-shadow: 0 6px 32px 0 #000a 0.1;
  padding: 2.5rem 2.5rem 2rem 2.5rem;
  min-width: 340px;
  max-width: 380px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export const Title = styled.h1`
  color: #e3e6ea;
  font-size: clamp(1.6rem, 4vw, 2rem);
  line-height: 1.2;
  font-weight: 800;
  margin-bottom: 2rem;
  text-align: center;
  letter-spacing: 0.5px;
  white-space: normal;
  word-break: break-word;
`;

export const ErrorAlert = styled.div`
  background: #e53935;
  color: #fff;
  border-radius: 6px;
  padding: 0.8rem 1rem;
  margin-bottom: 1.2rem;
  font-weight: 600;
  text-align: center;
  box-shadow: 0 2px 8px #0002;
`;

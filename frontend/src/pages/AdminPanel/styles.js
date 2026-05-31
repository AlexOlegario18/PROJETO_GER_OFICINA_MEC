import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', sans-serif;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  background: var(--surface);
  padding: 1.5rem 2rem;
  border-radius: 12px;
  box-shadow: var(--shadow-sm);

  h1 {
    font-size: 1.5rem;
    color: var(--text-primary);
    margin: 0;
  }
`;

export const ActionButton = styled.button`
  background: var(--primary);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: var(--primary-hover);
  }
`;

export const TableContainer = styled.div`
  background: var(--surface);
  border-radius: 12px;
  box-shadow: var(--shadow-sm);
  overflow: hidden;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 1rem 1.5rem;
    text-align: left;
    border-bottom: 1px solid var(--border);
  }

  th {
    background: var(--background);
    font-weight: 600;
    color: var(--text-secondary);
  }

  tr:hover {
    background: rgba(0,0,0,0.02);
  }
`;

export const StatusBadge = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 600;
  
  background: ${({ status }) => {
    switch (status) {
      case 'Aberta': return '#e3f2fd';
      case 'Em Andamento': return '#fff3e0';
      case 'Aguardando Aprovação': return '#f3e5f5';
      case 'Finalizada': return '#e8f5e9';
      default: return '#f5f5f5';
    }
  }};
  
  color: ${({ status }) => {
    switch (status) {
      case 'Aberta': return '#1976d2';
      case 'Em Andamento': return '#f57c00';
      case 'Aguardando Aprovação': return '#7b1fa2';
      case 'Finalizada': return '#388e3c';
      default: return '#757575';
    }
  }};
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: var(--surface);
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  box-shadow: var(--shadow-lg);
`;

export const FormGroup = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: var(--text-secondary);
  }

  select, input {
    padding: 0.75rem;
    border: 1px solid var(--border);
    border-radius: 8px;
    font-size: 1rem;
    font-family: inherit;

    &:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }
  }
`;

export const FlexButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  justify-content: flex-end;
`;

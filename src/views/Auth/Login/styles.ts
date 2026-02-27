import styled from 'styled-components';
import { theme } from '../../../styles/theme';

export const AuthContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.backgroundDark};
  padding: 20px;
`;

export const AuthCard = styled.div`
  background-color: ${theme.colors.surfaceCard};
  border: 1px solid ${theme.colors.surfaceDark};
  border-radius: 16px;
  padding: 32px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const AuthTitle = styled.h1`
  color: ${theme.colors.primary};
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
`;

export const AuthSubtitle = styled.p`
  color: ${theme.colors.text.slate400};
  font-size: 14px;
  margin-bottom: 32px;
  text-align: center;
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Label = styled.label`
  color: ${theme.colors.text.white};
  font-size: 14px;
  font-weight: 500;
`;

export const Input = styled.input`
  background-color: ${theme.colors.surfaceDark};
  border: 1px solid ${theme.colors.surfaceCard};
  color: ${theme.colors.text.white};
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(255, 109, 0, 0.2);
  }
`;

export const SubmitButton = styled.button`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.text.white};
  border: none;
  padding: 14px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 8px;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const ToggleButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.text.slate400};
  font-size: 14px;
  cursor: pointer;
  margin-top: 16px;
  text-decoration: underline;

  &:hover {
    color: ${theme.colors.text.white};
  }
`;

export const ErrorMessage = styled.div`
  background-color: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid rgba(239, 68, 68, 0.2);
  width: 100%;
  margin-bottom: 20px;
  font-size: 14px;
  text-align: center;
`;

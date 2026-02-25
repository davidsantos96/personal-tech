import styled from "styled-components";
import { theme } from "../../../styles/theme";

export const Container = styled.div`
  padding: 1.5rem;
  min-height: 100vh;
  background-color: ${theme.colors.backgroundDark};
  color: ${theme.colors.text.white};
  padding-bottom: 5rem;
  
  width: 100%;
  max-width: 28rem;
  margin: 0 auto;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  position: relative;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;

export const PageTitle = styled.h1`
  font-family: ${theme.fonts.display};
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.25rem 0;
`;

export const Subtitle = styled.p`
  font-size: 0.875rem;
  color: ${theme.colors.text.slate400};
  margin: 0;
`;

export const WorkoutList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const WorkoutCard = styled.div<{ $expanded: boolean }>`
  background-color: ${theme.colors.surfaceCard};
  border-radius: ${theme.borderRadius.xl};
  border: 1px solid ${props => props.$expanded ? theme.colors.primary : 'rgba(255, 255, 255, 0.05)'};
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    border-color: ${props => props.$expanded ? theme.colors.primary : 'rgba(255, 255, 255, 0.1)'};
    transform: ${props => props.$expanded ? 'none' : 'translateY(-2px)'};
  }
`;

export const WorkoutHeader = styled.div`
  padding: 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const IconBox = styled.div<{ $status: string }>`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-color: ${props => {
        if (props.$status === 'active') return 'rgba(34, 197, 94, 0.1)';
        if (props.$status === 'expiring') return 'rgba(234, 179, 8, 0.1)';
        return 'rgba(239, 68, 68, 0.1)';
    }};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => {
        if (props.$status === 'active') return '#22C55E';
        if (props.$status === 'expiring') return '#EAB308';
        return '#EF4444';
    }};

  svg {
    width: 24px;
    height: 24px;
  }
`;

export const Content = styled.div`
  flex: 1;
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
`;

export const WorkoutName = styled.div`
  font-weight: 700;
  color: ${theme.colors.text.white};
  font-size: 1rem;
`;

export const StatusBadge = styled.span<{ $status: string }>`
  font-size: 0.625rem;
  font-weight: 800;
  padding: 0.125rem 0.5rem;
  border-radius: 999px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background-color: ${props => {
        if (props.$status === 'active') return 'rgba(34, 197, 94, 0.2)';
        if (props.$status === 'expiring') return 'rgba(234, 179, 8, 0.2)';
        return 'rgba(239, 68, 68, 0.2)';
    }};
  color: ${props => {
        if (props.$status === 'active') return '#22C55E';
        if (props.$status === 'expiring') return '#EAB308';
        return '#EF4444';
    }};
`;

export const WorkoutDetails = styled.div`
  font-size: 0.8125rem;
  color: ${theme.colors.text.slate400};
`;

export const ExpandIcon = styled.div<{ $expanded: boolean }>`
  color: ${theme.colors.text.slate500};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${props => props.$expanded ? 'rotate(180deg)' : 'rotate(0)'};

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const ExpandedContent = styled.div`
  padding: 0 1.25rem 1.25rem 1.25rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  animation: slideDown 0.3s ease-out;

  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const ExerciseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1.25rem;
`;

export const ExerciseItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
`;

export const ExerciseNumber = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${theme.colors.text.slate500};
  width: 1.5rem;
`;

export const ExerciseName = styled.span`
  flex: 1;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${theme.colors.text.white};
`;

export const ExerciseStats = styled.span`
  font-size: 0.8125rem;
  font-weight: 600;
  color: ${theme.colors.primary};
`;

export const StartButton = styled.button`
  width: 100%;
  margin-top: 1.5rem;
  background-color: ${theme.colors.primary};
  color: ${theme.colors.text.white};
  border: none;
  border-radius: ${theme.borderRadius.lg};
  padding: 1rem;
  font-weight: 700;
  font-size: 1rem;
  font-family: ${theme.fonts.display};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(255, 109, 0, 0.2);
  transition: all 0.2s;

  &:hover {
    background-color: ${theme.colors.primary}; // Keep same or slightly lighter
    opacity: 0.95;
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(255, 109, 0, 0.3);
  }

  &:disabled {
    background-color: ${theme.colors.surfaceDark};
    color: ${theme.colors.text.slate500};
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

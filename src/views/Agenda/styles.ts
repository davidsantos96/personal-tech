import styled from "styled-components";
import { theme } from "../../styles/theme";

export const Container = styled.div`
  padding: 1.5rem;
  min-height: 100vh;
  background-color: ${theme.colors.backgroundDark};
  color: ${theme.colors.text.white};
  padding-bottom: 80px; 
  
  width: 100%;
  max-width: 28rem;
  margin: 0 auto;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  position: relative;
  overflow-x: hidden;
`;

export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const HeaderTitle = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  font-family: ${theme.fonts.display};
  font-size: 1.75rem;
  font-weight: 700;
  color: ${theme.colors.text.white};
  margin: 0;
`;

export const Subtitle = styled.span`
  color: ${theme.colors.text.slate400};
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const IconButton = styled.button`
  background-color: ${theme.colors.surfaceCard};
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.text.white};
  cursor: pointer;

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid ${theme.colors.primary};
`;

export const CalendarStrip = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  overflow-x: auto;
  gap: 0.75rem;
  padding-bottom: 0.5rem;
  
  /* Hide scrollbar */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const DayCard = styled.button<{ $active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 60px;
  height: 70px;
  border-radius: ${theme.borderRadius.xl};
  background-color: ${props => props.$active ? theme.colors.primary : theme.colors.surfaceCard};
  border: none;
  cursor: pointer;
  transition: transform 0.2s;

  &:active {
    transform: scale(0.95);
  }
`;

export const DayLabel = styled.span<{ $active?: boolean }>`
  font-size: 0.75rem;
  text-transform: uppercase;
  color: ${props => props.$active ? theme.colors.text.white : theme.colors.text.slate500};
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

export const DayNumber = styled.span<{ $active?: boolean }>`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${theme.colors.text.white};
`;

export const TimelineContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-left: 1rem;
`;

export const TimelineLine = styled.div`
  position: absolute;
  left: 20px; // Aligns with the dots
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: ${theme.colors.surfaceCard};
  z-index: 0;
`;

export const TimeSlot = styled.div`
  position: relative;
  z-index: 1;
`;

export const TimeLabelRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  gap: 1rem;
`;

export const TimelineDot = styled.div<{ $active?: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => props.$active ? theme.colors.primary : theme.colors.text.slate500};
  margin-left: 0.55rem; // Adjust to align center with line
  flex-shrink: 0;
`;

export const TimeLabel = styled.span<{ $highlight?: boolean }>`
  font-weight: 700;
  color: ${props => props.$highlight ? theme.colors.primary : theme.colors.text.white};
  font-size: 0.875rem;
  width: 45px;
`;

export const AppointmentCard = styled.div<{ $variant?: 'default' | 'highlight' | 'free' | 'past' }>`
  margin-left: 3rem;
  background-color: ${theme.colors.surfaceCard};
  border-radius: ${theme.borderRadius.xl};
  padding: 1rem;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.05);

  ${props => props.$variant === 'highlight' && `
    background: linear-gradient(135deg, rgba(35, 25, 20, 1) 0%, rgba(20, 20, 20, 1) 100%);
    border-color: ${theme.colors.primary}40;
  `}

  ${props => props.$variant === 'past' && `
    border-left: 4px solid #22C55E; // Green
  `}
  
  ${props => props.$variant === 'free' && `
    background-color: transparent;
    border: 1px dashed ${theme.colors.text.slate500};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    cursor: pointer;
    color: ${theme.colors.text.slate400};
    font-weight: 500;
    
    &:hover {
      border-color: ${theme.colors.text.white};
      color: ${theme.colors.text.white};
    }
  `}
`;

export const CardContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const ClientAvatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  object-fit: cover;
`;

export const ClientInfo = styled.div`
  flex: 1;
`;

export const ClientName = styled.h3`
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: ${theme.colors.text.white};
  margin-bottom: 0.25rem;
`;

export const ActivityText = styled.p`
  margin: 0;
  font-size: 0.875rem;
  color: ${theme.colors.text.slate400};
`;

export const StatusIcon = styled.div<{ $color?: string }>`
  color: ${props => props.$color || theme.colors.text.slate500};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 24px;
    height: 24px;
  }
`;

export const NowIndicator = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  position: relative;
  z-index: 2;
  margin-left: -0.5rem;
`;

export const NowLabel = styled.span`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.text.white};
  font-size: 0.75rem;
  font-weight: 800;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  margin-right: 0.5rem;
`;

export const NowLine = styled.div`
  flex: 1;
  height: 2px;
  background-color: ${theme.colors.primary};
`;

export const AddFab = styled.button`
  position: fixed;
  bottom: 100px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: ${theme.colors.primary};
  border: none;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(255, 109, 0, 0.4);
  z-index: 10;
  cursor: pointer;

  @media (min-width: ${theme.screens.sm}) {
    position: absolute;
    bottom: 24px;
    right: 24px;
  }

  svg {
    width: 28px;
    height: 28px;
  }
`;

import styled from "styled-components";
import { theme } from "../../styles/theme";

export const Container = styled.div`
  padding: 1.5rem;
  min-height: 100vh;
  background-color: ${theme.colors.backgroundDark};
  color: ${theme.colors.text.white};
  padding-bottom: 100px; // Space for bottom actions
  
  width: 100%;
  max-width: 28rem;
  margin: 0 auto;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  position: relative;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export const IconButton = styled.button`
  background: transparent;
  border: none;
  color: ${theme.colors.text.white};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  margin: -0.5rem;
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

export const PageTitle = styled.h1`
  font-family: ${theme.fonts.display};
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
`;

export const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;

export const AvatarWrapper = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

export const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 3px solid ${theme.colors.primary};
  padding: 3px;
  background-color: ${theme.colors.backgroundDark};
  object-fit: cover;
`;

export const EditBadge = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: ${theme.colors.primary};
  border: 3px solid ${theme.colors.backgroundDark};
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.text.white};
  cursor: pointer;

  svg {
    width: 18px;
    height: 18px;
  }
`;

export const StudentName = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  text-align: center;
`;

export const TagsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;
`;

export const GoalTag = styled.span`
  background-color: rgba(255, 109, 0, 0.15);
  color: ${theme.colors.primary};
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
`;

export const ActiveTime = styled.span`
  color: ${theme.colors.text.slate400};
`;

export const SectionTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${theme.colors.text.slate400};
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ViewAllLink = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.primary};
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  margin-bottom: 2rem;
`;

export const StatCard = styled.div`
  background-color: ${theme.colors.surfaceCard};
  padding: 1rem;
  border-radius: ${theme.borderRadius.xl};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const StatLabel = styled.span`
  font-size: 0.75rem;
  color: ${theme.colors.text.slate400};
`;

export const StatValue = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${theme.colors.text.white};
  
  small {
    font-size: 0.875rem;
    font-weight: 400;
    color: ${theme.colors.text.slate500};
    margin-left: 2px;
  }
`;

export const StatTrend = styled.span<{ $positive?: boolean }>`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${props => props.$positive ? '#22C55E' : '#EF4444'}; // Green or Red
  display: flex;
  align-items: center;
  gap: 2px;
`;

export const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 2rem;
`;

export const HistoryItem = styled.div`
  background-color: ${theme.colors.surfaceCard};
  border-radius: ${theme.borderRadius.xl};
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: transform 0.2s;
  border: 1px solid rgba(255, 255, 255, 0.05);

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(255, 255, 255, 0.1);
  }
`;

export const HistoryIconBox = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.primary};

  svg {
    width: 24px;
    height: 24px;
  }
`;

export const HistoryContent = styled.div`
  flex: 1;
`;

export const HistoryTitle = styled.div`
  font-weight: 600;
  color: ${theme.colors.text.white};
  margin-bottom: 0.25rem;
`;

export const HistorySubtitle = styled.div`
  font-size: 0.875rem;
  color: ${theme.colors.text.slate400};
`;

export const GoalCard = styled.div`
  background-color: rgba(255, 109, 0, 0.05);
  border: 1px solid rgba(255, 109, 0, 0.2);
  border-radius: ${theme.borderRadius.xl};
  padding: 1.25rem;
  margin-bottom: 2rem;
`;

export const GoalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${theme.colors.primary};
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
  letter-spacing: 0.05em;

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const GoalText = styled.p`
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.5;
  color: ${theme.colors.text.white};
`;

export const BottomActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: auto;
  padding-top: 1rem;
`;

export const PrimaryButton = styled.button`
  flex: 1;
  background-color: ${theme.colors.primary};
  color: ${theme.colors.text.white};
  border: none;
  border-radius: ${theme.borderRadius.lg};
  padding: 1rem;
  font-weight: 700;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }

  svg {
    width: 20px;
    height: 20px;
    fill: currentColor;
  }
`;

export const SecondaryButton = styled.button`
  width: 56px;
  height: 56px;
  background-color: ${theme.colors.surfaceCard};
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${theme.borderRadius.lg};
  color: ${theme.colors.text.white};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

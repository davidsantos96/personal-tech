import styled from 'styled-components';
import { theme } from '../../../styles/theme';

export const Container = styled.div`
    min-height: 100dvh;
    max-width: 28rem;
    margin: 0 auto;
    padding-bottom: 5rem;
    background-color: ${theme.colors.backgroundDark};
    color: ${theme.colors.text.white};
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    position: relative;

    @supports not (min-height: 100dvh) {
        min-height: 100vh;
    }

    @media (max-width: ${theme.screens.xs}) {
        padding-bottom: 4.5rem;
    }
`;

export const HeaderSection = styled.header`
    padding: 1.5rem 1rem 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const UserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
`;

export const Avatar = styled.img`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;

    @media (max-width: ${theme.screens.xs}) {
        width: 40px;
        height: 40px;
    }
`;

export const Greeting = styled.div`
    font-size: 0.85rem;
    color: ${theme.colors.text.slate400};
`;

export const UserName = styled.div`
    font-size: 1.15rem;
    font-weight: 700;

    @media (max-width: ${theme.screens.xs}) {
        font-size: 1.05rem;
    }
`;

export const StreakBadge = styled.div`
    display: flex;
    align-items: center;
    gap: 0.35rem;
    background: ${theme.colors.surfaceCard};
    padding: 0.4rem 0.75rem;
    border-radius: ${theme.borderRadius.full};
    font-size: 0.85rem;
`;

export const StreakValue = styled.span`
    font-weight: 700;
    color: ${theme.colors.primary};
`;

/* Today Workout Card */
export const WorkoutCard = styled.div`
    margin: 0 1rem;
    padding: 1.25rem;
    background: linear-gradient(135deg, ${theme.colors.primary} 0%, #FF8F3F 100%);
    border-radius: ${theme.borderRadius.xl};
    color: ${theme.colors.text.white};
`;

export const WorkoutLabel = styled.div`
    font-size: 0.75rem;
    opacity: 0.85;
    margin-bottom: 0.25rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 600;
`;

export const WorkoutName = styled.div`
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 0.25rem;
    font-family: ${theme.fonts.display};

    @media (max-width: ${theme.screens.xs}) {
        font-size: 1.1rem;
    }
`;

export const WorkoutMeta = styled.div`
    font-size: 0.85rem;
    opacity: 0.9;
    margin-bottom: 1rem;
`;

export const StartButton = styled.button`
    background: ${theme.colors.text.white};
    color: ${theme.colors.primary};
    border: none;
    border-radius: ${theme.borderRadius.DEFAULT};
    padding: 0.65rem 1.5rem;
    font-weight: 700;
    font-size: 0.9rem;
    cursor: pointer;
    font-family: ${theme.fonts.display};
    transition: all 0.2s ease;

    &:hover {
        opacity: 0.9;
        transform: translateY(-1px);
    }

    &:active {
        transform: translateY(0);
    }
`;

/* Rest Day Card */
export const RestDayCard = styled.div`
    margin: 0 1rem;
    padding: 1.25rem;
    background: ${theme.colors.surfaceCard};
    border-radius: ${theme.borderRadius.xl};
    text-align: center;
    color: ${theme.colors.text.slate400};
`;

export const RestDayEmoji = styled.div`
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
`;

export const RestDayTitle = styled.div`
    font-weight: 600;
    color: ${theme.colors.text.white};
`;

export const RestDaySubtitle = styled.div`
    font-size: 0.85rem;
`;

/* Quick Stats */
export const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0.75rem;
    margin: 1.25rem 1rem;

    @media (max-width: ${theme.screens.xs}) {
        gap: 0.5rem;
    }
`;

export const StatCard = styled.div`
    background: ${theme.colors.surfaceCard};
    border-radius: ${theme.borderRadius.lg};
    padding: 1rem;
    text-align: center;

    @media (max-width: ${theme.screens.xs}) {
        padding: 0.75rem 0.5rem;
    }
`;

export const StatValue = styled.div<{ $color?: string }>`
    font-size: 1.5rem;
    font-weight: 700;
    color: ${props => props.$color || theme.colors.primary};

    @media (max-width: ${theme.screens.xs}) {
        font-size: 1.25rem;
    }
`;

export const StatLabel = styled.div`
    font-size: 0.7rem;
    color: ${theme.colors.text.slate400};
    margin-top: 0.25rem;
`;

/* Weekly Calendar */
export const WeekSection = styled.div`
    margin: 0 1rem 1.25rem;
`;

export const WeekSectionTitle = styled.div`
    font-size: 0.75rem;
    color: ${theme.colors.text.slate500};
    margin-bottom: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
`;

export const WeekGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 0.5rem;
`;

export const DayColumn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.35rem;
`;

export const DayName = styled.div`
    font-size: 0.65rem;
    color: ${theme.colors.text.slate500};
`;

export const DayCircle = styled.div<{ $trained: boolean; $isToday: boolean }>`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    font-weight: 600;
    background: ${props => props.$trained ? '#22C55E' : theme.colors.surfaceCard};
    color: ${props => props.$trained ? '#fff' : theme.colors.text.slate500};
    border: 2px solid ${props => props.$isToday ? theme.colors.primary : 'transparent'};
    transition: all 0.2s ease;

    @media (max-width: ${theme.screens.xs}) {
        width: 32px;
        height: 32px;
        font-size: 0.75rem;
    }
`;

/* Goal Card */
export const GoalCard = styled.div`
    margin: 0 1rem;
    padding: 1rem;
    background: ${theme.colors.surfaceCard};
    border-radius: ${theme.borderRadius.lg};
    border-left: 3px solid ${theme.colors.primary};
`;

export const GoalLabel = styled.div`
    font-size: 0.7rem;
    color: ${theme.colors.primary};
    font-weight: 700;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.35rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
`;

export const GoalText = styled.div`
    font-size: 0.85rem;
    color: #e2e8f0;
    line-height: 1.5;
`;

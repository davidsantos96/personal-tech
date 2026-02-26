import styled from 'styled-components';
import { theme } from '../../../styles/theme';

export const Container = styled.div`
    padding: 1.25rem;
    color: ${theme.colors.text.white};
    background-color: ${theme.colors.backgroundDark};
    min-height: 100dvh;
    padding-bottom: 6rem;
    max-width: 28rem;
    margin: 0 auto;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    position: relative;

    @supports not (min-height: 100dvh) {
        min-height: 100vh;
    }

    @media (max-width: ${theme.screens.xs}) {
        padding: 1rem 0.75rem;
        padding-bottom: 5rem;
    }
`;

export const PageTitle = styled.h1`
    font-family: ${theme.fonts.display};
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0 0 1.25rem 0;

    @media (max-width: ${theme.screens.xs}) {
        font-size: 1.3rem;
        margin-bottom: 1rem;
    }
`;

/* Streak Card */
export const StreakCard = styled.div`
    background-color: ${theme.colors.surfaceCard};
    padding: 1.5rem;
    border-radius: ${theme.borderRadius.xl};
    text-align: center;
    margin-bottom: 2rem;
    border: 1px solid rgba(255, 109, 0, 0.1);
`;

export const StreakEmoji = styled.div`
    font-size: 2rem;
    margin-bottom: 0.5rem;
`;

export const StreakTitle = styled.div`
    font-size: 1.5rem;
    font-weight: 700;
    font-family: ${theme.fonts.display};
    color: ${theme.colors.primary};

    @media (max-width: ${theme.screens.xs}) {
        font-size: 1.3rem;
    }
`;

export const StreakSubtitle = styled.div`
    color: ${theme.colors.text.slate400};
    font-size: 0.9rem;
    margin-top: 0.25rem;
`;

/* Section */
export const SectionHeader = styled.h2`
    font-size: 1.1rem;
    margin: 0 0 1rem 0;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    font-family: ${theme.fonts.display};
    font-weight: 600;

    @media (max-width: ${theme.screens.xs}) {
        font-size: 1rem;
    }
`;

export const SessionList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

/* Session Card */
export const SessionCard = styled.div`
    background-color: ${theme.colors.surfaceDark};
    padding: 1rem 1.25rem;
    border-radius: ${theme.borderRadius.xl};
    border-left: 4px solid ${theme.colors.primary};
    transition: all 0.2s ease;

    &:hover {
        border-color: #FF8F3F;
        background-color: rgba(255, 109, 0, 0.03);
    }
`;

export const SessionTop = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 0.75rem;
`;

export const SessionInfo = styled.div``;

export const SessionName = styled.div`
    font-weight: 700;
    font-size: 0.95rem;
`;

export const SessionType = styled.div`
    font-size: 0.8rem;
    color: ${theme.colors.text.slate400};
    margin-top: 0.15rem;
`;

export const SessionRight = styled.div`
    text-align: right;
`;

export const SessionDate = styled.div`
    font-size: 0.85rem;
`;

export const SessionDuration = styled.div`
    font-size: 0.8rem;
    color: #22C55E;
    font-weight: 600;
`;

export const SessionStats = styled.div`
    display: flex;
    gap: 1rem;
    font-size: 0.8rem;
    color: ${theme.colors.text.slate400};
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    padding-top: 0.75rem;

    @media (max-width: ${theme.screens.xs}) {
        gap: 0.75rem;
        font-size: 0.75rem;
    }
`;

export const SessionStatItem = styled.span`
    display: flex;
    align-items: center;
    gap: 0.3rem;
`;

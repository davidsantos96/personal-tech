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

/* Profile Header */
export const ProfileHeader = styled.div`
    text-align: center;
    margin-bottom: 2rem;
`;

export const AvatarWrapper = styled.div`
    position: relative;
    display: inline-block;
`;

export const Avatar = styled.img`
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid ${theme.colors.primary};

    @media (max-width: ${theme.screens.xs}) {
        width: 100px;
        height: 100px;
    }
`;

export const ProfileName = styled.h1`
    margin-top: 1rem;
    margin-bottom: 0.25rem;
    font-family: ${theme.fonts.display};
    font-size: 1.5rem;
    font-weight: 700;

    @media (max-width: ${theme.screens.xs}) {
        font-size: 1.3rem;
    }
`;

export const ProfileGoal = styled.div`
    color: ${theme.colors.primary};
    font-weight: 700;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
`;

/* Info Cards */
export const CardList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const Card = styled.div`
    background-color: ${theme.colors.surfaceCard};
    padding: 1.25rem;
    border-radius: ${theme.borderRadius.xl};
    border: 1px solid rgba(255, 255, 255, 0.05);
`;

export const CardTitle = styled.h3`
    font-size: 0.8rem;
    color: ${theme.colors.text.slate400};
    margin: 0 0 0.75rem 0;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 700;
`;

/* Trainer Row */
export const TrainerRow = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

export const TrainerAvatar = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;

    @media (max-width: ${theme.screens.xs}) {
        width: 44px;
        height: 44px;
    }
`;

export const TrainerName = styled.div`
    font-weight: 700;
    font-size: 1rem;
`;

export const TrainerPhone = styled.div`
    font-size: 0.8rem;
    color: ${theme.colors.text.slate400};
`;

/* Plan Details */
export const PlanRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;

    & + & {
        border-top: 1px solid rgba(255, 255, 255, 0.05);
    }
`;

export const PlanLabel = styled.span`
    color: ${theme.colors.text.slate400};
    font-size: 0.875rem;
`;

export const PlanValue = styled.span<{ $color?: string }>`
    font-weight: 600;
    font-size: 0.875rem;
    color: ${props => props.$color || theme.colors.text.white};
`;

/* Logout Button */
export const LogoutButton = styled.button`
    width: 100%;
    background-color: ${theme.colors.surfaceCard};
    color: #EF4444;
    border: 1px solid rgba(239, 68, 68, 0.2);
    padding: 1rem;
    border-radius: ${theme.borderRadius.xl};
    font-weight: 700;
    font-size: 0.9rem;
    margin-top: 0.5rem;
    cursor: pointer;
    font-family: ${theme.fonts.display};
    transition: all 0.2s ease;

    &:hover {
        background-color: rgba(239, 68, 68, 0.1);
        border-color: rgba(239, 68, 68, 0.4);
    }

    &:active {
        transform: scale(0.98);
    }
`;

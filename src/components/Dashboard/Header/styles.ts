import styled from 'styled-components';
import { theme } from '../../../styles/theme';

export const HeaderContainer = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem 1.5rem 0.5rem 1.5rem; /* p-6 pb-2 pt-12 (approx) */
    padding-top: 3rem;

    @media (max-width: ${theme.screens.xs}) {
        padding: 1rem 1rem 0.5rem 1rem;
        padding-top: 2rem;
    }
`;

export const ProfileSection = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

export const AvatarWrapper = styled.div`
    position: relative;
`;

export const Avatar = styled.div<{ $imageUrl: string }>`
    background-image: url(${props => props.$imageUrl});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 3rem; /* size-12 */
    height: 3rem;
    border-radius: 9999px;
    box-shadow: 0 0 0 2px ${theme.colors.primary}, 0 0 0 4px #0a0a0a;
`;

export const StatusIndicator = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    width: 0.75rem; /* size-3 */
    height: 0.75rem;
    background-color: ${theme.colors.primary};
    border-radius: 9999px;
    border: 2px solid #0a0a0a;
`;

export const UserInfo = styled.div``;

export const WelcomeText = styled.p`
    color: ${theme.colors.text.slate400};
    font-size: 0.875rem; /* text-sm */
    font-weight: 500;
    margin: 0;
`;

export const UserName = styled.h2`
    font-size: 1.25rem; /* text-xl */
    font-weight: 700;
    line-height: 1.25;
    margin: 0;
`;

export const NotificationButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem; /* size-10 */
    height: 2.5rem;
    border-radius: 9999px;
    background-color: rgba(20, 20, 20, 0.5); /* bg-surface-dark/50 */
    border: none;
    position: relative;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: ${theme.colors.surfaceDark};
    }
`;

export const NotificationDot = styled.span`
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    width: 0.5rem; /* size-2 */
    height: 0.5rem;
    background-color: ${theme.colors.primary};
    border-radius: 9999px;
`;

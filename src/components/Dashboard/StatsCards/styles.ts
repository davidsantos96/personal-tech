import styled from 'styled-components';
import { theme } from '../../../styles/theme';

export const StatsSection = styled.section`
    padding: 1.5rem; /* p-6 */
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;

    @media (max-width: ${theme.screens.xs}) {
        padding: 1rem;
        gap: 0.75rem;
    }
`;

export const Card = styled.div`
    background-color: ${theme.colors.surfaceCard};
    border-radius: 0.75rem; /* rounded-xl */
    padding: 1.25rem; /* p-5 */
    border: 1px solid rgba(255, 255, 255, 0.05);
    transition: all 0.2s;
    cursor: pointer;

    @media (max-width: ${theme.screens.xs}) {
        padding: 1rem;
    }

    &:hover {
        border-color: rgba(255, 109, 0, 0.3); /* primary/30 */
    }
`;

export const CardHeader = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 1rem;
`;

export const IconBox = styled.div`
    padding: 0.5rem;
    background-color: ${theme.colors.surfaceDark};
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;

    ${Card}:hover & {
        background-color: rgba(255, 109, 0, 0.1); /* primary/10 */
    }
`;

export const Badge = styled.span<{ $variant?: 'primary' | 'neutral' }>`
    font-size: 0.75rem; /* text-xs */
    font-weight: 700;
    padding: 0.25rem 0.5rem;
    border-radius: 9999px;
    
    ${props => props.$variant === 'primary' ? `
        color: ${theme.colors.primary};
        background-color: rgba(255, 109, 0, 0.1);
    ` : `
        color: ${theme.colors.text.slate500};
        background-color: ${theme.colors.surfaceDark};
        font-weight: 500;
    `}
`;

export const CardLabel = styled.p`
    color: ${theme.colors.text.slate400};
    font-size: 0.875rem; /* text-sm */
    font-weight: 500;
    margin: 0;
`;

export const CardValue = styled.h3`
    font-size: 1.875rem; /* text-3xl */
    font-weight: 700;
    color: ${theme.colors.text.white};
    margin: 0.25rem 0 0 0;
`;

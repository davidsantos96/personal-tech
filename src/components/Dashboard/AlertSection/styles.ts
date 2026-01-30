import styled from 'styled-components';
import { theme } from '../../../styles/theme';

export const AlertsSection = styled.section`
    padding: 0 1.5rem 1.5rem 1.5rem; /* px-6 pb-6 */
`;

export const Title = styled.h3`
    font-size: 1.125rem; /* text-lg */
    font-weight: 700;
    margin: 0 0 1rem 0;
`;

export const AlertList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

export const AlertCard = styled.div<{ $borderColor: string, $bgColor: string }>`
    background-color: ${props => props.$bgColor};
    border: 1px solid ${props => props.$borderColor};
    border-radius: 0.75rem;
    padding: 1rem;
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
`;

export const AlertIconBox = styled.div<{ $bgColor: string }>`
    padding: 0.5rem;
    background-color: ${props => props.$bgColor};
    border-radius: 9999px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const AlertContent = styled.div`
    flex: 1;
`;

export const AlertTitle = styled.h4`
    color: ${theme.colors.text.white};
    font-weight: 500;
    font-size: 0.875rem; /* text-sm */
    margin: 0;
`;

export const AlertDescription = styled.p<{ $color: string }>`
    color: ${props => props.$color};
    font-size: 0.75rem; /* text-xs */
    margin: 0.25rem 0 0 0;
    line-height: 1.625;
`;

export const ActionButton = styled.button<{ $bgColor: string, $textColor: string, $hoverColor: string }>`
    padding: 0.375rem 0.75rem;
    background-color: ${props => props.$bgColor};
    color: ${props => props.$textColor};
    font-size: 0.75rem;
    font-weight: 700;
    border-radius: 0.5rem;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: ${props => props.$hoverColor};
    }
`;

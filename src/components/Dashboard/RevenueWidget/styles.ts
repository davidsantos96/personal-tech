import styled from 'styled-components';
import { theme } from '../../../styles/theme';

export const WidgetSection = styled.section`
    padding: 0 1.5rem 1.5rem 1.5rem; /* px-6 pb-6 */

    @media (max-width: ${theme.screens.xs}) {
        padding: 0 1rem 1rem 1rem;
    }
`;

export const WidgetCard = styled.div`
    background-color: ${theme.colors.surfaceCard};
    border-radius: 0.75rem;
    padding: 1.25rem;
    border: 1px solid rgba(255, 255, 255, 0.05);
`;

export const WidgetHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2.25rem; /* mb-9 (approx) */

    @media (max-width: ${theme.screens.xs}) {
        margin-bottom: 1.5rem;
    }
`;

export const WidgetLabel = styled.p`
    color: ${theme.colors.text.slate400};
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin: 0;
`;

export const WidgetValue = styled.h3`
    font-size: 1.25rem; /* text-xl */
    font-weight: 700;
    color: ${theme.colors.text.white};
    margin: 0.25rem 0 0 0;
`;

export const TrendBadge = styled.div`
    display: flex;
    align-items: center;
    gap: 0.25rem;
    color: ${theme.colors.primary};
    font-size: 0.875rem;
    font-weight: 700;
    background-color: rgba(255, 109, 0, 0.1);
    padding: 0.25rem 0.5rem;
    border-radius: 0.5rem;
`;

export const ChartContainer = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    height: 8rem; /* h-32 */
    width: 100%;
    gap: 0.5rem;
`;

export const ChartBar = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    flex: 1;
    cursor: pointer;
    
    /* Using group logic from tailwind */
`;

export const BarTrack = styled.div`
    width: 100%;
    background-color: ${theme.colors.surfaceDark};
    border-top-left-radius: 0.125rem;
    border-top-right-radius: 0.125rem;
    height: 100%;
    position: relative;
    overflow: hidden;
`;

export const BarFill = styled.div<{ $height: string, $isCurrent?: boolean }>`
    position: absolute;
    bottom: 0;
    width: 100%;
    height: ${props => props.$height};
    border-top-left-radius: 0.125rem;
    border-top-right-radius: 0.125rem;
    
    ${props => props.$isCurrent ? `
        background-color: ${theme.colors.primary};
        box-shadow: 0 0 15px rgba(255, 109, 0, 0.3);
    ` : `
        background-color: rgba(255, 109, 0, 0.3);
        transition: background-color 0.3s;
        
        ${ChartBar}:hover & {
            background-color: ${theme.colors.primary};
        }
    `}
`;

export const WeekDay = styled.span<{ $isCurrent?: boolean }>`
    font-size: 0.625rem; /* text-[10px] */
    font-weight: 500;
    color: ${props => props.$isCurrent ? theme.colors.text.white : theme.colors.text.slate500};
    ${props => props.$isCurrent && 'font-weight: 700;'}
`;

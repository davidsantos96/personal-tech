import styled, { keyframes } from 'styled-components';
import { theme } from '../../../styles/theme';

export const StatsSection = styled.section`
    padding: 1.5rem;
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
    border-radius: 0.75rem;
    padding: 1.25rem;
    border: 1px solid rgba(255, 255, 255, 0.05);
    transition: all 0.2s;
    cursor: pointer;

    @media (max-width: ${theme.screens.xs}) {
        padding: 1rem;
    }

    &:hover {
        border-color: rgba(255, 109, 0, 0.3);
    }

    &:active {
        transform: scale(0.97);
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
        background-color: rgba(255, 109, 0, 0.1);
    }
`;

export const Badge = styled.span<{ $variant?: 'primary' | 'neutral' }>`
    font-size: 0.75rem;
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
    font-size: 0.875rem;
    font-weight: 500;
    margin: 0;
`;

export const CardValue = styled.h3`
    font-size: 1.875rem;
    font-weight: 700;
    color: ${theme.colors.text.white};
    margin: 0.25rem 0 0 0;
`;

/* ======= Modal / Overlay Styles ======= */

const fadeIn = keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
`;

const slideUp = keyframes`
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
`;

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(4px);
    z-index: 100;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    animation: ${fadeIn} 0.2s ease-out;
`;

export const ModalContent = styled.div`
    width: 100%;
    max-width: 28rem;
    max-height: 80vh;
    background-color: ${theme.colors.surfaceDark};
    border-radius: 1.5rem 1.5rem 0 0;
    padding: 1.5rem;
    overflow-y: auto;
    animation: ${slideUp} 0.3s ease-out;

    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
`;

export const ModalHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
`;

export const ModalTitle = styled.h2`
    font-size: 1.25rem;
    font-weight: 700;
    color: ${theme.colors.text.white};
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

export const ModalCloseButton = styled.button`
    background-color: ${theme.colors.surfaceCard};
    border: none;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${theme.colors.text.slate400};
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        color: ${theme.colors.text.white};
        background-color: rgba(255, 255, 255, 0.1);
    }

    svg {
        width: 18px;
        height: 18px;
    }
`;

export const ModalHandle = styled.div`
    width: 40px;
    height: 4px;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 2px;
    margin: 0 auto 1rem auto;
`;

/* Schedule Item in modal */
export const ScheduleItem = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background-color: ${theme.colors.surfaceCard};
    border-radius: 0.75rem;
    margin-bottom: 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.05);
    transition: all 0.2s;
    cursor: pointer;

    &:hover {
        border-color: rgba(255, 109, 0, 0.2);
    }
`;

export const ScheduleTime = styled.div<{ $color?: string }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 50px;
    
    span:first-child {
        font-size: 0.875rem;
        font-weight: 700;
        color: ${props => props.$color || theme.colors.primary};
    }
    
    span:last-child {
        font-size: 0.75rem;
        color: ${theme.colors.text.slate400};
    }
`;

export const ScheduleAvatar = styled.img`
    width: 44px;
    height: 44px;
    border-radius: 12px;
    object-fit: cover;
    border: 2px solid ${theme.colors.surfaceDark};
`;

export const ScheduleInfo = styled.div`
    flex: 1;
`;

export const ScheduleName = styled.h4`
    color: ${theme.colors.text.white};
    font-weight: 600;
    font-size: 0.9375rem;
    margin: 0 0 0.25rem 0;
`;

export const ScheduleDetail = styled.p`
    color: ${theme.colors.text.slate400};
    font-size: 0.8125rem;
    margin: 0;
`;

export const ScheduleStatusDot = styled.div<{ $color?: string }>`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${props => props.$color || theme.colors.text.slate500};
    flex-shrink: 0;
`;

/* Active students list in modal */
export const ActiveStudentItem = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background-color: ${theme.colors.surfaceCard};
    border-radius: 0.75rem;
    margin-bottom: 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.05);
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        border-color: rgba(255, 109, 0, 0.2);
        transform: translateX(4px);
    }
`;

export const ActiveStudentAvatar = styled.img`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid ${theme.colors.surfaceDark};
`;

export const ActiveStudentInfo = styled.div`
    flex: 1;
`;

export const ActiveStudentName = styled.h4`
    color: ${theme.colors.text.white};
    font-weight: 600;
    font-size: 1rem;
    margin: 0 0 0.25rem 0;
`;

export const ActiveStudentGoal = styled.p`
    color: ${theme.colors.text.slate400};
    font-size: 0.8125rem;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.375rem;
`;

export const ActiveStudentArrow = styled.div`
    color: ${theme.colors.text.slate500};
    display: flex;
    align-items: center;

    svg {
        width: 18px;
        height: 18px;
    }
`;

export const ModalSummary = styled.div`
    display: flex;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
`;

export const SummaryCard = styled.div`
    flex: 1;
    background-color: ${theme.colors.surfaceCard};
    border-radius: 0.75rem;
    padding: 0.875rem;
    text-align: center;
    border: 1px solid rgba(255, 255, 255, 0.05);
`;

export const SummaryValue = styled.p`
    color: ${theme.colors.text.white};
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
`;

export const SummaryLabel = styled.p`
    color: ${theme.colors.text.slate400};
    font-size: 0.75rem;
    margin: 0.25rem 0 0 0;
`;

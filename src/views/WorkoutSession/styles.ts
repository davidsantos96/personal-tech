import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const Container = styled.div`
    min-height: 100vh;
    background-color: ${theme.colors.backgroundDark};
    padding-bottom: 6rem;
    
    width: 100%;
    max-width: 28rem;
    margin: 0 auto;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    position: relative;

    @media (max-width: ${theme.screens.xs}) {
        padding-bottom: 5.5rem;
    }
`;

export const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem 1rem;
    background-color: ${theme.colors.backgroundDark};
    position: sticky;
    top: 0;
    z-index: 10;

    @media (max-width: ${theme.screens.xs}) {
        padding: 1rem 0.75rem;
    }
`;

export const IconButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    color: ${theme.colors.text.white};
    display: flex;
    align-items: center;
    justify-content: center;
    
    svg {
        width: 24px;
        height: 24px;
    }

    &:hover {
        opacity: 0.8;
    }
`;

export const HeaderTitle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
`;

export const Title = styled.h1`
    font-size: 1.25rem;
    font-weight: 700;
    color: ${theme.colors.text.white};
    margin: 0;
`;

export const Subtitle = styled.span`
    font-size: 0.875rem;
    color: ${theme.colors.text.slate400};
    margin-top: 0.25rem;
`;

export const TimerSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 1rem;
    background: linear-gradient(135deg, rgba(255, 109, 0, 0.1) 0%, rgba(255, 109, 0, 0.05) 100%);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;

export const TimerDisplay = styled.div`
    font-size: 3.5rem;
    font-weight: 700;
    color: ${theme.colors.primary};
    letter-spacing: 0.05em;
    margin-bottom: 1rem;
    
    @media (max-width: ${theme.screens.xs}) {
        font-size: 3rem;
    }
`;

export const TimerControls = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
`;

export const StartButton = styled.button<{ $isRunning?: boolean }>`
    background-color: ${props => props.$isRunning ? theme.colors.text.slate900 : theme.colors.primary};
    color: ${props => props.$isRunning ? theme.colors.text.white : '#000'};
    border: none;
    border-radius: 2rem;
    padding: 0.75rem 2rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.2s;
    
    svg {
        width: 20px;
        height: 20px;
    }

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 16px rgba(255, 109, 0, 0.3);
    }

    &:active {
        transform: translateY(0);
    }
`;

export const ExercisesSection = styled.div`
    padding: 1.5rem 1rem;
`;

export const SectionHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
`;

export const SectionTitle = styled.h2`
    font-size: 0.875rem;
    font-weight: 600;
    color: ${theme.colors.text.slate400};
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin: 0;
`;

export const ProgressText = styled.span`
    font-size: 0.875rem;
    color: ${theme.colors.text.slate500};
`;

export const ExercisesList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

export const ExerciseCard = styled.div<{ $completed?: boolean }>`
    background-color: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    padding: 1rem;
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    transition: all 0.2s;
    opacity: ${props => props.$completed ? 0.6 : 1};

    &:hover {
        background-color: rgba(255, 255, 255, 0.05);
    }
`;

export const CheckboxWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 0.25rem;
`;

export const Checkbox = styled.input`
    width: 24px;
    height: 24px;
    cursor: pointer;
    accent-color: ${theme.colors.primary};
    border-radius: 6px;
`;

export const ExerciseContent = styled.div`
    flex: 1;
    min-width: 0;
`;

export const ExerciseName = styled.h3<{ $completed?: boolean }>`
    font-size: 1rem;
    font-weight: 600;
    color: ${theme.colors.text.white};
    margin: 0 0 0.5rem 0;
    text-decoration: ${props => props.$completed ? 'line-through' : 'none'};
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
`;

export const SeriesBadge = styled.span`
    color: ${theme.colors.primary};
    font-weight: 700;
    font-size: 0.875rem;
`;

export const ExerciseDetails = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0.5rem;
    margin-bottom: 0.5rem;
`;

export const ExerciseDetail = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
`;

export const DetailLabel = styled.span`
    font-size: 0.75rem;
    color: ${theme.colors.text.slate500};
    text-transform: uppercase;
`;

export const DetailValue = styled.span`
    font-size: 0.875rem;
    font-weight: 600;
    color: ${theme.colors.text.white};
`;

export const ExecutionControl = styled.div`
    display: flex;
    align-items: center;
    gap: 0.375rem;
`;

export const ExecutionStartButton = styled.button`
    width: 1.75rem;
    height: 1.75rem;
    border: 1px solid rgba(255, 109, 0, 0.4);
    border-radius: ${theme.borderRadius.full};
    background-color: rgba(255, 109, 0, 0.15);
    color: ${theme.colors.primary};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0;
    transition: all 0.2s;

    svg {
        width: 0.875rem;
        height: 0.875rem;
        display: block;
    }

    &:hover {
        background-color: rgba(255, 109, 0, 0.25);
        border-color: rgba(255, 109, 0, 0.65);
    }
`;

export const ExecutionEstimate = styled.span`
    font-size: 0.8125rem;
    color: ${theme.colors.text.slate400};
    font-weight: 600;
`;

export const ExerciseNotes = styled.p`
    font-size: 0.875rem;
    color: ${theme.colors.text.slate400};
    margin: 0;
    font-style: italic;
`;

export const FloatingActions = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    max-width: 28rem;
    margin: 0 auto;
    padding: 1rem;
    background: linear-gradient(to top, ${theme.colors.backgroundDark} 70%, transparent);
    backdrop-filter: blur(8px);
    z-index: 20;
`;

export const FinishButton = styled.button<{ $disabled?: boolean }>`
    width: 100%;
    background-color: ${props => props.$disabled ? theme.colors.text.slate900 : theme.colors.primary};
    color: ${props => props.$disabled ? theme.colors.text.slate500 : '#000'};
    border: none;
    border-radius: 12px;
    padding: 1rem;
    font-size: 1rem;
    font-weight: 700;
    cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: all 0.2s;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    
    svg {
        width: 24px;
        height: 24px;
    }

    &:hover {
        transform: ${props => props.$disabled ? 'none' : 'translateY(-2px)'};
        box-shadow: ${props => props.$disabled ? 'none' : '0 8px 24px rgba(255, 109, 0, 0.4)'};
    }
`;

export const CelebrationModal = styled.div<{ $show?: boolean }>`
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.95);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 50;
    opacity: ${props => props.$show ? 1 : 0};
    pointer-events: ${props => props.$show ? 'all' : 'none'};
    transition: opacity 0.3s;
`;

export const CelebrationContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    max-width: 20rem;
    text-align: center;
`;

export const CelebrationIcon = styled.div`
    font-size: 5rem;
    margin-bottom: 1.5rem;
    animation: bounce 0.6s ease-in-out infinite alternate;
    
    @keyframes bounce {
        from {
            transform: translateY(0) scale(1);
        }
        to {
            transform: translateY(-20px) scale(1.1);
        }
    }
`;

export const CelebrationTitle = styled.h2`
    font-size: 2rem;
    font-weight: 700;
    color: ${theme.colors.primary};
    margin: 0 0 1rem 0;
    animation: fadeInUp 0.5s ease-out;
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

export const CelebrationMessage = styled.p`
    font-size: 1.125rem;
    color: ${theme.colors.text.slate400};
    margin: 0 0 0.5rem 0;
    line-height: 1.6;
`;

export const CelebrationStats = styled.div`
    display: flex;
    gap: 2rem;
    margin: 1.5rem 0;
    padding: 1rem;
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    width: 100%;
`;

export const CelebrationStat = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const CelebrationStatValue = styled.div`
    font-size: 1.5rem;
    font-weight: 700;
    color: ${theme.colors.primary};
`;

export const CelebrationStatLabel = styled.div`
    font-size: 0.75rem;
    color: ${theme.colors.text.slate400};
    text-transform: uppercase;
    margin-top: 0.25rem;
`;

export const CelebrationButton = styled.button`
    background-color: ${theme.colors.primary};
    color: #000;
    border: none;
    border-radius: 12px;
    padding: 1rem 2rem;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
    margin-top: 1rem;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(255, 109, 0, 0.4);
    }
`;

export const RestButton = styled.button`
    background-color: rgba(255, 109, 0, 0.1);
    color: ${theme.colors.primary};
    border: 1px solid rgba(255, 109, 0, 0.3);
    border-radius: 8px;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.375rem;
    margin-top: 0.75rem;
    transition: all 0.2s;
    
    svg {
        width: 16px;
        height: 16px;
    }

    &:hover {
        background-color: rgba(255, 109, 0, 0.2);
        border-color: rgba(255, 109, 0, 0.5);
    }
`;

export const RestTimerModal = styled.div<{ $show?: boolean }>`
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.95);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 60;
    opacity: ${props => props.$show ? 1 : 0};
    pointer-events: ${props => props.$show ? 'all' : 'none'};
    transition: opacity 0.3s;
    backdrop-filter: blur(8px);
`;

export const RestTimerContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    max-width: 24rem;
    width: 90%;
    text-align: center;
`;

export const RestTimerLabel = styled.div`
    font-size: 1rem;
    color: ${theme.colors.text.slate400};
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 1rem;
`;

export const RestTimerCircle = styled.div<{ $progress?: number }>`
    position: relative;
    width: 200px;
    height: 200px;
    margin: 2rem 0;
    
    &::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 50%;
        border: 8px solid rgba(255, 255, 255, 0.1);
    }
    
    &::after {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 50%;
        border: 8px solid ${theme.colors.primary};
        border-right-color: transparent;
        border-bottom-color: transparent;
        transform: rotate(${props => (props.$progress || 0) * 3.6}deg);
        transition: transform 0.3s linear;
    }
`;

export const RestTimerTime = styled.div`
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3.5rem;
    font-weight: 700;
    color: ${theme.colors.primary};
    
    @media (max-width: ${theme.screens.xs}) {
        font-size: 3rem;
    }
`;

export const RestTimerExercise = styled.div`
    font-size: 1.125rem;
    font-weight: 600;
    color: ${theme.colors.text.white};
    margin-bottom: 0.5rem;
`;

export const RestTimerActions = styled.div`
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
    width: 100%;
`;

export const RestTimerButton = styled.button<{ $secondary?: boolean }>`
    flex: 1;
    background-color: ${props => props.$secondary ? 'rgba(255, 255, 255, 0.1)' : theme.colors.primary};
    color: ${props => props.$secondary ? theme.colors.text.white : '#000'};
    border: ${props => props.$secondary ? '1px solid rgba(255, 255, 255, 0.2)' : 'none'};
    border-radius: 12px;
    padding: 1rem;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    
    svg {
        width: 20px;
        height: 20px;
    }

    &:hover {
        transform: translateY(-2px);
        background-color: ${props => props.$secondary ? 'rgba(255, 255, 255, 0.15)' : theme.colors.primary};
        box-shadow: ${props => props.$secondary ? 'none' : '0 8px 24px rgba(255, 109, 0, 0.4)'};
    }
`;

export const ExecutionTimerModal = styled(RestTimerModal)``;

export const ExecutionTimerContent = styled(RestTimerContent)``;

export const ExecutionTimerLabel = styled(RestTimerLabel)``;

export const ExecutionTimerCircle = styled(RestTimerCircle)``;

export const ExecutionTimerTime = styled(RestTimerTime)`
    font-size: 2.75rem;

    @media (max-width: ${theme.screens.xs}) {
        font-size: 2.375rem;
    }
`;

export const ExecutionTimerExercise = styled(RestTimerExercise)``;

export const ExecutionTimerActions = styled(RestTimerActions)``;

export const ExecutionTimerButton = styled(RestTimerButton)``;

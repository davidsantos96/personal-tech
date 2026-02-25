import styled from 'styled-components';
import { theme } from '../../../styles/theme';

export const Container = styled.div`
    min-height: 100vh;
    background-color: ${theme.colors.backgroundDark};
    padding-bottom: 6rem;
    
    width: 100%;
    max-width: 28rem;
    margin: 0 auto;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    position: relative;
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
    padding: 2.5rem 1.5rem;
    background-color: ${theme.colors.surfaceCard};
    margin: 1.5rem 1rem;
    border-radius: 1.5rem;
    border: 1px solid rgba(255, 109, 0, 0.1);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
`;

export const TimerDisplay = styled.div`
    font-size: 3.5rem;
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    color: ${theme.colors.primary};
    letter-spacing: 0.05em;
    margin-bottom: 1rem;
`;

export const TimerControls = styled.div`
    display: flex;
    gap: 1rem;
    align-items: center;
`;

export const StartButton = styled.button<{ $isRunning?: boolean }>`
    background-color: ${props => props.$isRunning ? '#1a1a1a' : theme.colors.primary};
    color: ${props => props.$isRunning ? theme.colors.text.white : '#000'};
    border: none;
    border-radius: 2rem;
    padding: 0.75rem 2rem;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.2s;
    font-family: ${theme.fonts.display};
    
    svg {
        width: 20px;
        height: 20px;
    }

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 16px rgba(255, 109, 0, 0.3);
    }
`;

export const ExercisesSection = styled.div`
    padding: 1.5rem 1rem;
`;

export const SectionHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.25rem;
`;

export const SectionTitle = styled.h2`
    font-size: 0.875rem;
    font-weight: 700;
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
    gap: 1rem;
`;

export const ExerciseCard = styled.div<{ $completed?: boolean }>`
    background-color: ${theme.colors.surfaceCard};
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    padding: 1.25rem;
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    transition: all 0.2s;
    opacity: ${props => props.$completed ? 0.6 : 1};

    &:hover {
        border-color: rgba(255, 255, 255, 0.1);
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
`;

export const ExerciseContent = styled.div`
    flex: 1;
    min-width: 0;
`;

export const ExerciseName = styled.h3<{ $completed?: boolean }>`
    font-size: 1.1rem;
    font-weight: 700;
    color: ${theme.colors.text.white};
    margin: 0 0 0.75rem 0;
    text-decoration: ${props => props.$completed ? 'line-through' : 'none'};
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

export const SeriesBadge = styled.span`
    color: ${theme.colors.primary};
    font-weight: 700;
    font-size: 0.875rem;
`;

export const ExerciseDetails = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;
    margin-bottom: 1rem;
`;

export const ExerciseDetail = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
`;

export const DetailLabel = styled.span`
    font-size: 0.65rem;
    color: ${theme.colors.text.slate500};
    text-transform: uppercase;
    font-weight: 700;
`;

export const DetailValue = styled.span`
    font-size: 0.9rem;
    font-weight: 700;
    color: ${theme.colors.text.white};
`;

export const ActionRow = styled.div`
    display: flex;
    gap: 0.75rem;
    margin-top: 1rem;
    flex-wrap: wrap;
`;

export const ActionButton = styled.button<{ $primary?: boolean }>`
    background-color: ${props => props.$primary ? theme.colors.primary : 'rgba(255, 109, 0, 0.1)'};
    color: ${props => props.$primary ? '#000' : theme.colors.primary};
    border: 1px solid ${props => props.$primary ? 'transparent' : 'rgba(255, 109, 0, 0.3)'};
    border-radius: 999px;
    padding: 0.6rem 1.25rem;
    font-size: 0.85rem;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.2s ease;
    
    svg {
        width: 16px;
        height: 16px;
    }

    &:hover {
        transform: scale(1.02);
        background-color: ${props => props.$primary ? theme.colors.primary : 'rgba(255, 109, 0, 0.2)'};
        opacity: 0.95;
    }
`;

export const DemoButton = styled(ActionButton)`
    background-color: rgba(255, 255, 255, 0.05);
    color: ${theme.colors.text.white};
    border-color: rgba(255, 255, 255, 0.1);

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
`;

export const ExerciseNotes = styled.p`
    font-size: 0.85rem;
    color: ${theme.colors.text.slate400};
    margin: 0.75rem 0 0;
    font-style: italic;
    background: rgba(255, 255, 255, 0.03);
    padding: 0.5rem;
    border-radius: 6px;
`;

export const GifContainer = styled.div`
    margin-top: 1rem;
    border-radius: 12px;
    overflow: hidden;
    background: #fff;
    img {
        width: 100%;
        display: block;
    }
`;

export const FloatingActions = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    max-width: 28rem;
    margin: 0 auto;
    padding: 1.5rem 1rem;
    background: linear-gradient(to top, ${theme.colors.backgroundDark} 70%, transparent);
    backdrop-filter: blur(8px);
    z-index: 20;
`;

export const FinishButton = styled.button<{ $disabled?: boolean }>`
    width: 100%;
    background-color: ${props => props.$disabled ? '#1a1a1a' : theme.colors.primary};
    color: ${props => props.$disabled ? theme.colors.text.slate500 : '#000'};
    border: none;
    border-radius: 12px;
    padding: 1.15rem;
    font-size: 1rem;
    font-weight: 800;
    cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: all 0.2s;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-family: ${theme.fonts.display};
    
    svg {
        width: 24px;
        height: 24px;
    }
`;

// Modals are identical to trainer version
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
    backdrop-filter: blur(10px);
`;

export const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    max-width: 24rem;
    width: 90%;
    text-align: center;
`;

export const ModalLabel = styled.div`
    font-size: 1rem;
    color: ${theme.colors.primary};
    text-transform: uppercase;
    font-weight: 800;
    letter-spacing: 0.15em;
    margin-bottom: 0.5rem;
`;

export const ModalExercise = styled.div`
    font-size: 1.25rem;
    font-weight: 700;
    color: ${theme.colors.text.white};
    margin-bottom: 2rem;
`;

export const TimerCircle = styled.div<{ $progress?: number; $color?: string }>`
    position: relative;
    width: 220px;
    height: 220px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2.5rem;

    &::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 50%;
        border: 8px solid rgba(255, 255, 255, 0.05);
    }

    &::after {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 50%;
        border: 8px solid ${props => props.$color || theme.colors.primary};
        border-right-color: transparent;
        border-bottom-color: transparent;
        transform: rotate(${props => (props.$progress || 0) * 3.6}deg);
        transition: transform 1s linear;
    }
`;

export const TimerTime = styled.div`
    font-size: 4rem;
    font-weight: 800;
    color: ${theme.colors.text.white};
    font-family: 'Syne', sans-serif;
`;

export const ModalActions = styled.div`
    display: flex;
    gap: 1rem;
    width: 100%;
`;

export const ModalButton = styled.button<{ $secondary?: boolean }>`
    flex: 1;
    background-color: ${props => props.$secondary ? 'rgba(255, 255, 255, 0.1)' : theme.colors.primary};
    color: ${props => props.$secondary ? theme.colors.text.white : '#000'};
    border: none;
    border-radius: 12px;
    padding: 1.15rem;
    font-size: 0.9rem;
    font-weight: 700;
    cursor: pointer;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    svg {
        width: 18px;
        height: 18px;
    }
`;

export const CelebrationModal = styled(RestTimerModal)``;
export const CelebrationContent = styled(ModalContent)``;
export const CelebrationTitle = styled.h2`
    font-size: 2rem;
    font-weight: 800;
    color: ${theme.colors.primary};
    margin-bottom: 0.5rem;
`;

export const CelebrationStats = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    width: 100%;
    margin: 2rem 0;
`;

export const CelebrationStat = styled.div`
    background: rgba(255, 255, 255, 0.05);
    padding: 1rem 0.5rem;
    border-radius: 12px;
`;

export const StatValue = styled.div`
    font-size: 1.25rem;
    font-weight: 800;
    color: ${theme.colors.text.white};
`;

export const StatLabel = styled.div`
    font-size: 0.65rem;
    color: ${theme.colors.text.slate500};
    text-transform: uppercase;
    margin-top: 0.25rem;
`;

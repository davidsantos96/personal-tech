import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const Container = styled.div`
    min-height: 100vh;
    background-color: ${theme.colors.backgroundDark};
    padding-bottom: 6rem;
    
    /* Responsive container matching other views */
    width: 100%;
    max-width: 28rem; /* max-w-md */
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

export const PageTitle = styled.h1`
    font-size: 1.125rem;
    font-weight: 600;
    color: ${theme.colors.text.white};
    margin: 0;
`;

export const CancelButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    color: ${theme.colors.primary};
    font-size: 1rem;
    font-weight: 500;
    padding: 0.5rem;

    &:hover {
        opacity: 0.8;
    }
`;

export const FormSection = styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    @media (max-width: ${theme.screens.xs}) {
        padding: 0.75rem;
    }
`;

export const Label = styled.label`
    display: block;
    font-size: 1rem;
    font-weight: 500;
    color: ${theme.colors.text.white};
    margin-top: 1rem;
    margin-bottom: 0.5rem;
`;

export const Input = styled.input`
    width: 100%;
    padding: 1rem;
    background-color: ${theme.colors.surfaceCard};
    border: 1px solid ${theme.colors.surfaceDark};
    border-radius: ${theme.borderRadius.lg};
    color: ${theme.colors.text.white};
    font-size: 1rem;
    outline: none;
    transition: border-color 0.2s;

    &::placeholder {
        color: ${theme.colors.text.slate400};
    }

    &:focus {
        border-color: ${theme.colors.primary};
    }
`;

export const Select = styled.select`
    width: 100%;
    padding: 1rem;
    background-color: ${theme.colors.surfaceCard};
    border: 1px solid ${theme.colors.surfaceDark};
    border-radius: ${theme.borderRadius.lg};
    color: ${theme.colors.text.white};
    font-size: 1rem;
    outline: none;
    cursor: pointer;
    transition: border-color 0.2s;
    
    /* Custom dropdown arrow */
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 1.25rem;
    padding-right: 3rem;

    option {
        background-color: ${theme.colors.surfaceCard};
        color: ${theme.colors.text.white};
    }

    &:focus {
        border-color: ${theme.colors.primary};
    }
`;

export const ExercisesSection = styled.div`
    padding: 1rem;
    margin-top: 1.5rem;

    @media (max-width: ${theme.screens.xs}) {
        padding: 0.75rem;
        margin-top: 1rem;
    }
`;

export const SectionHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
    font-size: 1.25rem;
    font-weight: 600;
    color: ${theme.colors.text.white};

    @media (max-width: ${theme.screens.xs}) {
        font-size: 1.125rem;
    }
`;

export const ExerciseCount = styled.span`
    font-size: 0.875rem;
    font-weight: 400;
    color: ${theme.colors.text.slate400};
`;

export const ExercisesList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const ExerciseCard = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1rem;
    background-color: ${theme.colors.surfaceCard};
    border-radius: ${theme.borderRadius.lg};
    border: 1px solid ${theme.colors.surfaceDark};

    @media (max-width: ${theme.screens.xs}) {
        gap: 0.75rem;
        padding: 0.875rem;
    }
`;

export const ExerciseNumber = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    background-color: ${theme.colors.backgroundDark};
    border-radius: ${theme.borderRadius.full};
    color: ${theme.colors.text.white};
    font-weight: 600;
    font-size: 1rem;
    flex-shrink: 0;

    @media (max-width: ${theme.screens.xs}) {
        width: 2rem;
        height: 2rem;
        font-size: 0.875rem;
    }
`;

export const ExerciseContent = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

export const ExerciseName = styled.h3`
    font-size: 1.125rem;
    font-weight: 600;
    color: ${theme.colors.text.white};
    margin: 0;

    @media (max-width: ${theme.screens.xs}) {
        font-size: 1rem;
    }
`;

export const MuscleGroup = styled.p`
    font-size: 0.875rem;
    color: ${theme.colors.text.slate400};
    margin: 0;
`;

export const ExerciseStats = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;
    margin-top: 0.75rem;

    @media (max-width: ${theme.screens.xs}) {
        gap: 0.375rem;
        grid-template-columns: repeat(4, 1fr);
    }
`;

export const StatBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.5rem;
    background-color: ${theme.colors.backgroundDark};
    border-radius: ${theme.borderRadius.DEFAULT};

    @media (max-width: ${theme.screens.xs}) {
        padding: 0.375rem 0.25rem;
    }
`;

export const StatLabel = styled.span`
    font-size: 0.75rem;
    color: ${theme.colors.text.slate400};
    margin-bottom: 0.25rem;

    @media (max-width: ${theme.screens.xs}) {
        font-size: 0.625rem;
    }
`;

export const StatValue = styled.span`
    font-size: 1rem;
    font-weight: 600;
    color: ${theme.colors.text.white};

    @media (max-width: ${theme.screens.xs}) {
        font-size: 0.875rem;
    }

    span {
        font-size: 0.75rem;
        font-weight: 400;
        color: ${theme.colors.text.slate400};
        margin-left: 0.125rem;

        @media (max-width: ${theme.screens.xs}) {
            font-size: 0.625rem;
        }
    }
`;

export const DeleteButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    color: ${theme.colors.text.slate400};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s;
    
    svg {
        width: 20px;
        height: 20px;
    }

    &:hover {
        color: #ef4444;
    }
`;

export const AddExerciseButton = styled.button`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 1rem;
    margin-top: 1rem;
    background-color: transparent;
    border: 2px dashed ${theme.colors.primary};
    border-radius: ${theme.borderRadius.lg};
    color: ${theme.colors.primary};
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;

    svg {
        width: 20px;
        height: 20px;
    }

    &:hover {
        background-color: ${theme.colors.primary}15;
    }
`;

export const SaveButton = styled.button`
    width: calc(100% - 2rem);
    margin: 2rem 1rem 1rem;
    padding: 1rem;
    background-color: ${theme.colors.primary};
    border: none;
    border-radius: ${theme.borderRadius.lg};
    color: ${theme.colors.text.white};
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s;

    @media (max-width: ${theme.screens.xs}) {
        width: calc(100% - 1.5rem);
        margin: 1.5rem 0.75rem 1rem;
        padding: 0.875rem;
    }

    &:hover {
        opacity: 0.9;
    }

    &:active {
        transform: scale(0.98);
    }
`;

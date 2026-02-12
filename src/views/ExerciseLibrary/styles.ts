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
    gap: 1rem;
    padding: 1.5rem 1rem;
    background-color: ${theme.colors.backgroundDark};
    position: sticky;
    top: 0;
    z-index: 10;

    @media (max-width: ${theme.screens.xs}) {
        padding: 1rem 0.75rem;
    }
`;

export const BackButton = styled.button`
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

export const HeaderTitle = styled.h1`
    font-size: 1.25rem;
    font-weight: 600;
    color: ${theme.colors.text.white};
    margin: 0;
    flex: 1;
`;

export const SearchContainer = styled.div`
    position: relative;
    padding: 0 1rem;
    margin-bottom: 1rem;

    @media (max-width: ${theme.screens.xs}) {
        padding: 0 0.75rem;
    }
`;

export const SearchIcon = styled.div`
    position: absolute;
    left: 1.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: ${theme.colors.text.slate400};
    pointer-events: none;
    
    svg {
        width: 20px;
        height: 20px;
    }

    @media (max-width: ${theme.screens.xs}) {
        left: 1.5rem;
    }
`;

export const SearchInput = styled.input`
    width: 100%;
    padding: 1rem 1rem 1rem 3rem;
    background-color: ${theme.colors.surfaceCard};
    border: 1px solid ${theme.colors.surfaceDark};
    border-radius: ${theme.borderRadius.lg};
    color: ${theme.colors.text.white};
    font-size: 1rem;
    outline: none;
    transition: border-color 0.2s;
    box-sizing: border-box;

    &::placeholder {
        color: ${theme.colors.text.slate400};
    }

    &:focus {
        border-color: ${theme.colors.primary};
    }
`;

export const CategoriesContainer = styled.div`
    display: flex;
    gap: 0.75rem;
    padding: 0 1rem 1rem;
    overflow-x: auto;
    
    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;

    @media (max-width: ${theme.screens.xs}) {
        padding: 0 0.75rem 1rem;
        gap: 0.5rem;
    }
`;

export const CategoryButton = styled.button<{ $active: boolean }>`
    padding: 0.75rem 1.5rem;
    background-color: ${props => props.$active ? theme.colors.primary : theme.colors.surfaceCard};
    color: ${theme.colors.text.white};
    border: none;
    border-radius: ${theme.borderRadius.full};
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.2s;

    &:hover {
        opacity: 0.9;
    }

    @media (max-width: ${theme.screens.xs}) {
        padding: 0.625rem 1.25rem;
        font-size: 0.8125rem;
    }
`;

export const ExerciseList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 0 1rem;

    @media (max-width: ${theme.screens.xs}) {
        padding: 0 0.75rem;
    }
`;

export const ExerciseCard = styled.div`
    display: flex;
    align-items: center;
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

export const ExerciseThumbnail = styled.div`
    width: 4rem;
    height: 4rem;
    background-color: ${theme.colors.backgroundDark};
    border-radius: ${theme.borderRadius.lg};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    @media (max-width: ${theme.screens.xs}) {
        width: 3.5rem;
        height: 3.5rem;
    }
`;

export const PlayIcon = styled.div`
    color: ${theme.colors.text.slate400};
    display: flex;
    align-items: center;
    justify-content: center;
    
    svg {
        width: 24px;
        height: 24px;
    }
`;

export const ExerciseInfo = styled.div`
    flex: 1;
    min-width: 0;
`;

export const ExerciseTitle = styled.h3`
    font-size: 1rem;
    font-weight: 600;
    color: ${theme.colors.text.white};
    margin: 0 0 0.25rem 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    @media (max-width: ${theme.screens.xs}) {
        font-size: 0.9375rem;
    }
`;

export const ExerciseMuscles = styled.p`
    font-size: 0.875rem;
    color: ${theme.colors.text.slate400};
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    @media (max-width: ${theme.screens.xs}) {
        font-size: 0.8125rem;
    }
`;

export const AddButton = styled.button`
    width: 2.5rem;
    height: 2.5rem;
    background-color: ${theme.colors.primary};
    border: none;
    border-radius: ${theme.borderRadius.full};
    color: ${theme.colors.text.white};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: opacity 0.2s;
    flex-shrink: 0;
    
    svg {
        width: 20px;
        height: 20px;
        stroke: currentColor;
        fill: none;
    }

    &:hover {
        opacity: 0.9;
    }

    @media (max-width: ${theme.screens.xs}) {
        width: 2.25rem;
        height: 2.25rem;
        
        svg {
            width: 18px;
            height: 18px;
        }
    }
`;

export const SelectedExercisesSection = styled.div`
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 28rem;
    background-color: ${theme.colors.surfaceDark};
    border-top: 1px solid ${theme.colors.surfaceCard};
    padding: 1rem;
    max-height: 50vh;
    overflow-y: auto;
    z-index: 20;
    
    &::-webkit-scrollbar {
        width: 4px;
    }
    
    &::-webkit-scrollbar-track {
        background: ${theme.colors.backgroundDark};
    }
    
    &::-webkit-scrollbar-thumb {
        background: ${theme.colors.surfaceCard};
        border-radius: 2px;
    }

    h3 {
        font-size: 1rem;
        font-weight: 600;
        color: ${theme.colors.text.white};
        margin: 0 0 1rem 0;
    }

    @media (max-width: ${theme.screens.xs}) {
        padding: 0.75rem;
    }
`;

export const SelectedExerciseCard = styled.div`
    background-color: ${theme.colors.surfaceCard};
    border-radius: ${theme.borderRadius.lg};
    padding: 1rem;
    margin-bottom: 0.75rem;

    @media (max-width: ${theme.screens.xs}) {
        padding: 0.875rem;
    }
`;

export const RemoveButton = styled.button`
    background: none;
    border: none;
    color: ${theme.colors.text.slate400};
    cursor: pointer;
    padding: 0.25rem;
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

export const ExerciseDetailsForm = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

export const FormRow = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;

    @media (max-width: ${theme.screens.xs}) {
        gap: 0.375rem;
    }
`;

export const FormLabel = styled.label`
    display: block;
    font-size: 0.75rem;
    font-weight: 500;
    color: ${theme.colors.text.slate400};
    margin-bottom: 0.25rem;

    @media (max-width: ${theme.screens.xs}) {
        font-size: 0.6875rem;
    }
`;

export const FormInput = styled.input`
    width: 100%;
    padding: 0.5rem;
    background-color: ${theme.colors.backgroundDark};
    border: 1px solid ${theme.colors.surfaceDark};
    border-radius: ${theme.borderRadius.DEFAULT};
    color: ${theme.colors.text.white};
    font-size: 0.875rem;
    font-weight: 600;
    text-align: center;
    outline: none;
    transition: border-color 0.2s;
    box-sizing: border-box;

    &:focus {
        border-color: ${theme.colors.primary};
    }

    @media (max-width: ${theme.screens.xs}) {
        padding: 0.4375rem;
        font-size: 0.8125rem;
    }
`;

export const ConfirmButton = styled.button`
    width: 100%;
    padding: 1rem;
    background-color: ${theme.colors.primary};
    border: none;
    border-radius: ${theme.borderRadius.lg};
    color: ${theme.colors.text.white};
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s;
    margin-top: 0.5rem;

    &:hover {
        opacity: 0.9;
    }

    &:active {
        transform: scale(0.98);
    }

    @media (max-width: ${theme.screens.xs}) {
        padding: 0.875rem;
        font-size: 0.9375rem;
    }
`;

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

export const PageTitle = styled.h1`
    font-family: ${theme.fonts.display};
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0 0 1.25rem 0;

    @media (max-width: ${theme.screens.xs}) {
        font-size: 1.3rem;
        margin-bottom: 1rem;
    }
`;

/* Overview Cards */
export const OverviewGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
    margin-bottom: 2rem;

    @media (max-width: ${theme.screens.xs}) {
        gap: 0.5rem;
    }
`;

export const OverviewCard = styled.div`
    background-color: ${theme.colors.surfaceCard};
    padding: 1.25rem;
    border-radius: ${theme.borderRadius.xl};
    border: 1px solid rgba(255, 255, 255, 0.05);

    @media (max-width: ${theme.screens.xs}) {
        padding: 1rem;
    }
`;

export const OverviewLabel = styled.div`
    color: ${theme.colors.text.slate400};
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
`;

export const OverviewValue = styled.div`
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0.35rem 0;
    font-family: ${theme.fonts.display};

    @media (max-width: ${theme.screens.xs}) {
        font-size: 1.3rem;
    }
`;

export const OverviewDiff = styled.div<{ $positive: boolean }>`
    font-size: 0.8rem;
    font-weight: 600;
    color: ${props => props.$positive ? '#22C55E' : '#EF4444'};
`;

/* Section */
export const SectionHeader = styled.h2`
    font-size: 1.1rem;
    margin: 0 0 1rem 0;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    font-family: ${theme.fonts.display};
    font-weight: 600;

    @media (max-width: ${theme.screens.xs}) {
        font-size: 1rem;
    }
`;

export const AssessmentList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

export const AssessmentCard = styled.div`
    background-color: ${theme.colors.surfaceDark};
    padding: 1rem 1.25rem;
    border-radius: ${theme.borderRadius.lg};
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s ease;
    border: 1px solid rgba(255, 255, 255, 0.03);

    &:hover {
        border-color: rgba(255, 109, 0, 0.15);
        background-color: rgba(255, 109, 0, 0.03);
    }
`;

export const AssessmentInfo = styled.div``;

export const AssessmentDate = styled.div`
    font-weight: 700;
    font-size: 0.95rem;
`;

export const AssessmentMeta = styled.div`
    font-size: 0.8rem;
    color: ${theme.colors.text.slate400};
    margin-top: 0.15rem;
`;

export const ChevronIcon = styled.div`
    color: ${theme.colors.primary};
    display: flex;
    align-items: center;

    svg {
        width: 20px;
        height: 20px;
    }
`;

/* Next Evaluation */
export const EvaluationCard = styled.div`
    margin-top: 2rem;
    background-color: ${theme.colors.surfaceCard};
    padding: 1.5rem;
    border-radius: ${theme.borderRadius.xl};
    text-align: center;
    border: 1px solid rgba(255, 109, 0, 0.1);
`;

export const EvaluationText = styled.p`
    margin: 0;
    color: ${theme.colors.text.slate400};
    font-size: 0.9rem;
`;

export const EvaluationDate = styled.div`
    font-size: 1.2rem;
    font-weight: 700;
    color: ${theme.colors.primary};
    margin-top: 0.5rem;
    font-family: ${theme.fonts.display};
`;

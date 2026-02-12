import styled from 'styled-components';
import { theme } from '../../../styles/theme';

export const ListSection = styled.section`
    padding-left: 1.5rem; /* pl-6 */
    padding-bottom: 1.5rem; /* pb-6 */

    @media (max-width: ${theme.screens.xs}) {
        padding-left: 1rem;
        padding-bottom: 1rem;
    }
`;

export const SectionHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 1.5rem; /* pr-6 */
    margin-bottom: 1rem;
`;

export const Title = styled.h3`
    font-size: 1.125rem; /* text-lg */
    font-weight: 700;
    margin: 0;
`;

export const ViewAllButton = styled.button`
    color: ${theme.colors.primary};
    font-size: 0.875rem; /* text-sm */
    font-weight: 500;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    
    &:hover {
        opacity: 0.8;
    }
`;

export const ScrollContainer = styled.div`
    display: flex;
    overflow-x: auto;
    gap: 1rem;
    padding-bottom: 1rem;
    padding-right: 1.5rem;
    scroll-snap-type: x mandatory;
    
    /* no-scrollbar mixin logic handled mainly by global css but good to enforce here if needed */
    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
`;

export const StudentCard = styled.div`
    min-width: 240px;
    scroll-snap-align: center;
    background-color: ${theme.colors.surfaceCard};
    padding: 1rem;
    border-radius: 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.05);
    display: flex;
    align-items: center;
    gap: 1rem;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        border-color: rgba(255, 109, 0, 0.3);
        transform: translateY(-2px);
    }

    &:active {
        transform: scale(0.98);
    }
`;

export const StatusBar = styled.div<{ $color: string }>`
    position: absolute;
    top: 0;
    left: 0;
    width: 0.25rem; /* w-1 */
    height: 100%;
    background-color: ${props => props.$color};
`;

export const StudentAvatar = styled.div<{ $imageUrl: string }>`
    width: 3.5rem; /* size-14 */
    height: 3.5rem;
    border-radius: 9999px;
    background-image: url(${props => props.$imageUrl});
    background-position: center;
    background-size: cover;
    border: 2px solid ${theme.colors.surfaceDark};
`;

export const StudentInfo = styled.div`
    flex: 1;
`;

export const TimeLabel = styled.span<{ $color: string }>`
    color: ${props => props.$color};
    font-size: 0.75rem; /* text-xs */
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    display: block;
    margin-bottom: 0.25rem;
`;

export const StudentName = styled.h4`
    color: ${theme.colors.text.white};
    font-weight: 600;
    font-size: 1rem;
    margin: 0;
`;

export const TrainingDetail = styled.p`
    color: ${theme.colors.text.slate400};
    font-size: 0.75rem; /* text-xs */
    margin: 0.25rem 0 0 0;
`;

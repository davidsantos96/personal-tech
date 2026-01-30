import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const HomeContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    width: 100%;
    max-width: 28rem; /* max-w-md */
    margin: 0 auto; /* Center horizontally if on desktop */
    background-color: ${theme.colors.backgroundDark};
    color: ${theme.colors.text.white};
    overflow: hidden;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    padding-bottom: 6rem; /* Space for bottom nav */
`;

export const ScrollArea = styled.div`
    flex: 1;
    overflow-y: auto;
    
    /* no-scrollbar */
    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
`;

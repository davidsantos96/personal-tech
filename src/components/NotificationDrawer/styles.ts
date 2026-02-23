import styled, { keyframes, css } from 'styled-components';
import { theme } from '../../styles/theme';

const slideUp = keyframes`
    from { transform: translateY(100%); opacity: 0; }
    to   { transform: translateY(0);    opacity: 1; }
`;

const fadeIn = keyframes`
    from { opacity: 0; }
    to   { opacity: 1; }
`;

export const Backdrop = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 200;
    animation: ${fadeIn} 0.22s ease;
    backdrop-filter: blur(2px);
`;

export const Drawer = styled.div`
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 28rem;
    max-height: 82vh;
    background: #111;
    border-top-left-radius: 1.25rem;
    border-top-right-radius: 1.25rem;
    border-top: 1.5px solid #1e1e1e;
    border-left: 1.5px solid #1e1e1e;
    border-right: 1.5px solid #1e1e1e;
    z-index: 201;
    display: flex;
    flex-direction: column;
    animation: ${slideUp} 0.28s cubic-bezier(0.32, 0.72, 0, 1);
    overflow: hidden;
`;

export const Handle = styled.div`
    width: 2.5rem;
    height: 4px;
    background: #2a2a2a;
    border-radius: 9999px;
    margin: 0.75rem auto 0;
    flex-shrink: 0;
`;

export const DrawerHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.25rem 0.75rem;
    flex-shrink: 0;
    border-bottom: 1px solid #1a1a1a;
`;

export const DrawerTitle = styled.h2`
    font-family: ${theme.fonts.display};
    font-size: 1.0625rem;
    font-weight: 700;
    margin: 0;
    color: ${theme.colors.text.white};
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

export const ClearAllButton = styled.button`
    background: none;
    border: none;
    color: ${theme.colors.text.slate400};
    font-size: 0.75rem;
    font-family: ${theme.fonts.display};
    font-weight: 600;
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    border-radius: 0.375rem;
    transition: color 0.15s, background 0.15s;

    &:hover {
        color: ${theme.colors.text.white};
        background: #1e1e1e;
    }
`;

export const ScrollArea = styled.div`
    overflow-y: auto;
    flex: 1;
    padding: 0.75rem 1rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    /* thin scrollbar */
    &::-webkit-scrollbar { width: 4px; }
    &::-webkit-scrollbar-track { background: transparent; }
    &::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 9999px; }
`;

export const GroupLabel = styled.p<{ $color: string }>`
    font-size: 0.6875rem;
    font-family: ${theme.fonts.display};
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${props => props.$color};
    margin: 0.5rem 0 0.25rem;
    padding-left: 0.25rem;
`;

export const NotifCard = styled.div<{ $borderColor: string; $bg: string; $dismissed: boolean }>`
    background: ${props => props.$bg};
    border: 1px solid ${props => props.$borderColor};
    border-radius: 0.875rem;
    padding: 0.875rem;
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    cursor: pointer;
    transition: opacity 0.2s, filter 0.2s;
    ${props => props.$dismissed && css`opacity: 0.35; filter: grayscale(0.6); pointer-events: none;`}

    &:hover {
        filter: brightness(1.12);
    }
`;

export const IconBox = styled.div<{ $bg: string }>`
    background: ${props => props.$bg};
    border-radius: 0.625rem;
    width: 2.25rem;
    height: 2.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
`;

export const NotifContent = styled.div`
    flex: 1;
    min-width: 0;
`;

export const NotifTitle = styled.p`
    color: ${theme.colors.text.white};
    font-size: 0.8125rem;
    font-weight: 600;
    margin: 0 0 0.2rem;
    font-family: ${theme.fonts.display};
`;

export const NotifDesc = styled.p<{ $color: string }>`
    color: ${props => props.$color};
    font-size: 0.75rem;
    margin: 0;
    line-height: 1.55;
`;

export const DismissButton = styled.button`
    background: none;
    border: none;
    color: #333;
    cursor: pointer;
    padding: 0.125rem;
    flex-shrink: 0;
    border-radius: 0.375rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.15s, background 0.15s;

    &:hover {
        color: #888;
        background: #1e1e1e;
    }
`;

export const EmptyState = styled.div`
    padding: 3rem 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    color: ${theme.colors.text.slate400};
    font-size: 0.875rem;
    text-align: center;
`;

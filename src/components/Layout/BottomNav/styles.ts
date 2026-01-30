import styled from 'styled-components';
import { theme } from '../../../styles/theme';

export const NavContainer = styled.nav`
    position: fixed;
    bottom: 0;
    width: 100%;
    max-width: 448px; /* max-w-md matching the dashboard container constraint */
    background-color: rgba(10, 10, 10, 0.9);
    backdrop-filter: blur(12px);
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    padding: 1rem 1.5rem 2rem 1.5rem; /* pt-4 px-6 pb-8 */
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 10;
    /* Since the main layout isn't strictly max-w-md centered in this impl yet, we might need adjustments. 
       Assuming the Home container handles the max-width relative or centering. 
       Ideally this should be sticky or fixed within the mobile container. */
`;

export const NavButton = styled.button<{ $active?: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    color: ${props => props.$active ? theme.colors.primary : theme.colors.text.slate500};
    transition: color 0.2s;

    &:hover {
        color: ${props => props.$active ? theme.colors.primary : theme.colors.text.white};
    }
`;

export const NavLabel = styled.span`
    font-size: 0.625rem; /* text-[10px] */
    font-weight: 500;
`;

export const AddButton = styled.button`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 3.5rem; /* size-14 */
    height: 3.5rem;
    margin-top: -2rem; /* -mt-8 */
    background-color: ${theme.colors.primary};
    color: #000;
    border-radius: 9999px;
    border: none;
    cursor: pointer;
    box-shadow: 0 0 20px rgba(255, 109, 0, 0.4);
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.05);
    }
`;

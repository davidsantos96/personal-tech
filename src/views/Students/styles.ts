import styled from "styled-components";
import { theme } from "../../styles/theme";

export const Container = styled.div`
  padding: 1.5rem;
  min-height: 100vh;
  background-color: ${theme.colors.backgroundDark};
  color: ${theme.colors.text.white};
  padding-bottom: 80px; // Space for bottom nav
  
  /* Match HomeContainer dimensions */
  width: 100%;
  max-width: 28rem; /* max-w-md */
  margin: 0 auto;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  position: relative;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const Title = styled.h1`
  font-family: ${theme.fonts.display};
  font-size: 1.75rem;
  font-weight: 700;
  color: ${theme.colors.text.white};
`;

export const AddButton = styled.button`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.text.white};
  border: none;
  width: 48px;
  height: 48px;
  padding: 0;
  line-height: 0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }

  svg {
    width: 24px;
    height: 24px;
    display: block;
    stroke: currentColor;
    fill: none;
    stroke-width: 2.5;
  }
`;

export const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 1.5rem;

  svg {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: ${theme.colors.text.slate400};
    width: 20px;
    height: 20px;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  background-color: ${theme.colors.surfaceCard};
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: ${theme.borderRadius.xl};
  padding: 1rem 1rem 1rem 3rem;
  color: ${theme.colors.text.white};
  font-size: 1rem;
  outline: none;

  &::placeholder {
    color: ${theme.colors.text.slate500};
  }

  &:focus {
    border-color: ${theme.colors.primary};
  }
`;

export const FilterScroll = styled.div`
  display: flex;
  gap: 0.75rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  margin-bottom: 1.5rem;
  scrollbar-width: none; // Hide scrollbar for Firefox

  &::-webkit-scrollbar {
    display: none; // Hide scrollbar for Chrome/Safari
  }
`;

export const FilterTab = styled.button<{ $active?: boolean }>`
  background-color: ${props => props.$active ? theme.colors.primary : theme.colors.surfaceCard};
  color: ${props => props.$active ? theme.colors.text.white : theme.colors.text.slate400};
  border: 1px solid ${props => props.$active ? theme.colors.primary : 'rgba(255, 255, 255, 0.1)'};
  border-radius: ${theme.borderRadius.full};
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
     border-color: ${theme.colors.primary};
  }
`;

export const StudentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const StudentCard = styled.div`
  background-color: ${theme.colors.surfaceCard};
  border-radius: ${theme.borderRadius.xl};
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  cursor: pointer;
  transition: transform 0.2s;

  &:active {
    transform: scale(0.98);
  }
`;

export const Avatar = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.1);
`;

export const StudentInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const NameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

export const StudentName = styled.h3`
  font-size: 1.125rem;
  font-weight: 700;
  color: ${theme.colors.text.white};
  margin: 0;
`;

export const StatusBadge = styled.span<{ $type: 'updated' | 'expiring' | 'expired' }>`
  font-size: 0.65rem;
  font-weight: 800;
  text-transform: uppercase;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  letter-spacing: 0.05em;
  
  ${props => {
    switch (props.$type) {
      case 'updated':
        return `
          background-color: rgba(234, 179, 8, 0.1);
          color: #EAB308;
        `;
      case 'expiring':
        return `
          background-color: rgba(249, 115, 22, 0.1);
          color: #F97316;
        `;
      case 'expired':
        return `
          background-color: rgba(239, 68, 68, 0.1);
          color: #EF4444;
        `;
    }
  }}
`;

export const GoalRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${theme.colors.text.slate400};
  font-size: 0.9rem;

  svg {
    width: 16px;
    height: 16px;
  }
`;

export const ArrowIcon = styled.div`
  color: ${theme.colors.text.slate500};
  display: flex;
  align-items: center;
  justify-content: center;
`;

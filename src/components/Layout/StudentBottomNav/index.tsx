import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../../styles/theme';

const Nav = styled.nav`
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 28rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: ${theme.colors.surfaceDark};
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    padding: 0.5rem 0;
    padding-bottom: max(0.5rem, env(safe-area-inset-bottom));
    z-index: 100;
`;

const TabButton = styled.button<{ $active: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    background: none;
    border: none;
    color: ${props => props.$active ? theme.colors.primary : theme.colors.text.slate500};
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    font-size: 0.65rem;
    font-family: ${theme.fonts.display};
    transition: color 0.2s ease;

    &:active {
        transform: scale(0.95);
    }
`;

const TabIcon = styled.span<{ $active: boolean }>`
    font-size: 1.5rem;
    font-variation-settings: ${props => props.$active ? "'FILL' 1" : "'FILL' 0"};

    @media (max-width: ${theme.screens.xs}) {
        font-size: 1.35rem;
    }
`;

const tabs = [
    { label: 'Início', icon: 'home', path: '/aluno' },
    { label: 'Treinos', icon: 'fitness_center', path: '/aluno/treinos' },
    { label: 'Progresso', icon: 'trending_up', path: '/aluno/progresso' },
    { label: 'Histórico', icon: 'history', path: '/aluno/historico' },
    { label: 'Perfil', icon: 'person', path: '/aluno/perfil' },
];

export const StudentBottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Nav>
            {tabs.map(tab => {
                const isActive = location.pathname === tab.path;
                return (
                    <TabButton
                        key={tab.path}
                        $active={isActive}
                        onClick={() => navigate(tab.path)}
                    >
                        <TabIcon className="material-symbols-outlined" $active={isActive}>
                            {tab.icon}
                        </TabIcon>
                        <span>{tab.label}</span>
                    </TabButton>
                );
            })}
        </Nav>
    );
};

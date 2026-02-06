import { useNavigate, useLocation } from 'react-router-dom';
import { AddButton, NavButton, NavContainer, NavLabel } from './styles';

export const BottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <NavContainer>
            <NavButton 
                $active={location.pathname === '/'} 
                onClick={() => navigate('/')}
            >
                <span className={`material-symbols-outlined ${location.pathname === '/' ? 'filled' : ''}`} style={location.pathname === '/' ? { fontVariationSettings: "'FILL' 1" } : {}}>dashboard</span>
                <NavLabel>Início</NavLabel>
            </NavButton>

            <NavButton 
                $active={location.pathname === '/alunos'} 
                onClick={() => navigate('/alunos')}
            >
                <span className={`material-symbols-outlined ${location.pathname === '/alunos' ? 'filled' : ''}`} style={location.pathname === '/alunos' ? { fontVariationSettings: "'FILL' 1" } : {}}>groups</span>
                <NavLabel>Alunos</NavLabel>
            </NavButton>

            <AddButton>
                <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>add</span>
            </AddButton>

            <NavButton
                $active={location.pathname === '/agenda'} 
                onClick={() => navigate('/agenda')}
            >
                <span className={`material-symbols-outlined ${location.pathname === '/agenda' ? 'filled' : ''}`} style={location.pathname === '/agenda' ? { fontVariationSettings: "'FILL' 1" } : {}}>calendar_month</span>
                <NavLabel>Agenda</NavLabel>
            </NavButton>

            <NavButton>
                <span className="material-symbols-outlined">person</span>
                <NavLabel>Perfil</NavLabel>
            </NavButton>
        </NavContainer>
    );
};

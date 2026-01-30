import { AddButton, NavButton, NavContainer, NavLabel } from './styles';

export const BottomNav = () => {
    return (
        <NavContainer>
            <NavButton $active>
                <span className="material-symbols-outlined filled" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
                <NavLabel>Início</NavLabel>
            </NavButton>

            <NavButton>
                <span className="material-symbols-outlined">groups</span>
                <NavLabel>Alunos</NavLabel>
            </NavButton>

            <AddButton>
                <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>add</span>
            </AddButton>

            <NavButton>
                <span className="material-symbols-outlined">calendar_month</span>
                <NavLabel>Agenda</NavLabel>
            </NavButton>

            <NavButton>
                <span className="material-symbols-outlined">person</span>
                <NavLabel>Perfil</NavLabel>
            </NavButton>
        </NavContainer>
    );
};

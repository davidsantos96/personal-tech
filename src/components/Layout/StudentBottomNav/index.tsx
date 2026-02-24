import { useNavigate, useLocation } from 'react-router-dom';

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
        <nav style={{
            position: 'fixed',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            maxWidth: '28rem',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            background: '#141414',
            borderTop: '1px solid #222',
            padding: '0.5rem 0',
            zIndex: 100,
        }}>
            {tabs.map(tab => {
                const isActive = location.pathname === tab.path;
                return (
                    <button
                        key={tab.path}
                        onClick={() => navigate(tab.path)}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '2px',
                            background: 'none',
                            border: 'none',
                            color: isActive ? '#FF6D00' : '#64748b',
                            cursor: 'pointer',
                            padding: '0.25rem 0.5rem',
                            fontSize: '0.65rem',
                            fontFamily: "'Syne', sans-serif",
                        }}
                    >
                        <span
                            className="material-symbols-outlined"
                            style={{
                                fontSize: '1.5rem',
                                fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
                            }}
                        >
                            {tab.icon}
                        </span>
                        <span>{tab.label}</span>
                    </button>
                );
            })}
        </nav>
    );
};

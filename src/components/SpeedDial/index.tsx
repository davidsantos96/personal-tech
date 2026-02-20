import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import {
    Backdrop,
    ActionsWrapper,
    ActionRow,
    ActionLabelPill,
    ActionIconButton,
    SpeedDialTrigger,
    ToastPositioner,
    ToastInner,
    ToastIcon,
    ToastText,
} from './styles';

interface Action {
    id: string;
    icon: string;
    label: string;
    toastMsg: string;
    color: string;
}

/* Ordered top → bottom (Nova Avaliação on top, Novo Treino closest to button) */
const ACTIONS: Action[] = [
    {
        id: 'avaliacao',
        icon: 'assignment',
        label: 'Nova Avaliação',
        toastMsg: 'Nova avaliação iniciada',
        color: '#22c55e',
    },
    {
        id: 'aluno',
        icon: 'person_add',
        label: 'Novo Aluno',
        toastMsg: 'Cadastro de aluno iniciado',
        color: '#3b82f6',
    },
    {
        id: 'agendamento',
        icon: 'event',
        label: 'Novo Agendamento',
        toastMsg: 'Agendamento criado',
        color: '#a855f7',
    },
    {
        id: 'treino',
        icon: 'fitness_center',
        label: 'Novo Treino',
        toastMsg: 'Novo treino criado',
        color: '#FF6D00',
    },
];

interface Toast {
    msg: string;
    key: number;
}

export const SpeedDial = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [toast, setToast] = useState<Toast | null>(null);

    const handleToggle = useCallback(() => setIsOpen(prev => !prev), []);

    const handleClose = useCallback(() => setIsOpen(false), []);

    const handleAction = useCallback((action: Action) => {
        setIsOpen(false);
        if (action.id === 'aluno') {
            navigate('/novo-aluno');
            return;
        }
        if (action.id === 'agendamento') {
            navigate('/novo-agendamento');
            return;
        }
        if (action.id === 'treino') {
            navigate('/montar-treino');
            return;
        }
        setToast({ msg: action.toastMsg, key: Date.now() });
        setTimeout(() => setToast(null), 3500);
    }, [navigate]);

    /* Close on Escape */
    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false);
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [isOpen]);

    return createPortal(
        <>
            {/* ── Backdrop ── */}
            {isOpen && <Backdrop onClick={handleClose} />}

            {/* ── Action items (stagger: bottom item first) ── */}
            {isOpen && (
                <ActionsWrapper>
                    {ACTIONS.map((action, index) => (
                        <ActionRow
                            key={action.id}
                            $index={index}
                            $total={ACTIONS.length}
                            onClick={() => handleAction(action)}
                        >
                            <ActionLabelPill>{action.label}</ActionLabelPill>
                            <ActionIconButton $color={action.color}>
                                <span
                                    className="material-symbols-outlined"
                                    style={{ fontSize: '22px' }}
                                >
                                    {action.icon}
                                </span>
                            </ActionIconButton>
                        </ActionRow>
                    ))}
                </ActionsWrapper>
            )}

            {/* ── FAB trigger ── */}
            <SpeedDialTrigger
                onClick={handleToggle}
                $isOpen={isOpen}
                aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
                aria-expanded={isOpen}
            >
                <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>
                    add
                </span>
            </SpeedDialTrigger>

            {/* ── Toast confirmation ── */}
            {toast && (
                <ToastPositioner key={toast.key}>
                    <ToastInner>
                        <ToastIcon className="material-symbols-outlined">check_circle</ToastIcon>
                        <ToastText>{toast.msg}</ToastText>
                    </ToastInner>
                </ToastPositioner>
            )}
        </>,
        document.body,
    );
};

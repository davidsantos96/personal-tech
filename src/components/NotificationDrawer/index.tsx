import { useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../../hooks/useNotifications';
import type { AppNotification, NotificationPriority } from '../../data/notifications';
import {
    Backdrop,
    Drawer,
    Handle,
    DrawerHeader,
    DrawerTitle,
    ClearAllButton,
    ScrollArea,
    GroupLabel,
    NotifCard,
    IconBox,
    NotifContent,
    NotifTitle,
    NotifDesc,
    DismissButton,
    EmptyState,
} from './styles';

const GROUP_LABELS: Record<NotificationPriority, { label: string; color: string }> = {
    critical: { label: 'Crítico',  color: '#EF4444' },
    high:     { label: 'Alta Prioridade', color: '#FF6D00' },
    medium:   { label: 'Atenção',  color: '#EAB308' },
};

interface Props {
    onClose: () => void;
}

export const NotificationDrawer = ({ onClose }: Props) => {
    const navigate = useNavigate();
    const { notifications } = useNotifications();
    const [dismissed, setDismissed] = useState<Set<string>>(new Set());

    const dismiss = useCallback((e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        setDismissed(prev => new Set(prev).add(id));
    }, []);

    const clearAll = useCallback(() => {
        setDismissed(new Set(notifications.map(n => n.id)));
    }, [notifications]);

    const handleAction = useCallback((n: AppNotification) => {
        onClose();
        navigate(`/perfil-aluno/${n.studentId}`);
    }, [navigate, onClose]);

    // Group by priority preserving sort order
    const groups = (['critical', 'high', 'medium'] as NotificationPriority[])
        .map(priority => ({
            priority,
            items: notifications.filter(n => n.priority === priority),
        }))
        .filter(g => g.items.length > 0);

    const allDismissed = notifications.every(n => dismissed.has(n.id));
    const activeCound = notifications.filter(n => !dismissed.has(n.id)).length;

    return createPortal(
        <>
            <Backdrop onClick={onClose} />
            <Drawer>
                <Handle />
                <DrawerHeader>
                    <DrawerTitle>
                        <span
                            className="material-symbols-outlined"
                            style={{ fontSize: '18px', color: '#FF6D00' }}
                        >
                            notifications
                        </span>
                        Notificações {activeCound > 0 && `(${activeCound})`}
                    </DrawerTitle>
                    {!allDismissed && (
                        <ClearAllButton onClick={clearAll}>
                            Limpar tudo
                        </ClearAllButton>
                    )}
                </DrawerHeader>

                <ScrollArea>
                    {allDismissed || notifications.length === 0 ? (
                        <EmptyState>
                            <span
                                className="material-symbols-outlined"
                                style={{ fontSize: '40px', color: '#2a2a2a' }}
                            >
                                notifications_off
                            </span>
                            Tudo em dia! Nenhuma notificação pendente.
                        </EmptyState>
                    ) : (
                        groups.map(({ priority, items }) => (
                            <div key={priority}>
                                <GroupLabel $color={GROUP_LABELS[priority].color}>
                                    {GROUP_LABELS[priority].label}
                                </GroupLabel>
                                {items.map(n => (
                                    <NotifCard
                                        key={n.id}
                                        $bg={n.color.bg}
                                        $borderColor={n.color.border}
                                        $dismissed={dismissed.has(n.id)}
                                        onClick={() => handleAction(n)}
                                    >
                                        <IconBox $bg={`${n.color.accent}22`}>
                                            <span
                                                className="material-symbols-outlined"
                                                style={{ fontSize: '18px', color: n.color.accent }}
                                            >
                                                {n.icon}
                                            </span>
                                        </IconBox>
                                        <NotifContent>
                                            <NotifTitle>{n.title}</NotifTitle>
                                            <NotifDesc
                                                $color={n.color.textMuted}
                                                dangerouslySetInnerHTML={{ __html: n.description }}
                                            />
                                        </NotifContent>
                                        <DismissButton
                                            onClick={e => dismiss(e, n.id)}
                                            aria-label="Dispensar"
                                        >
                                            <span
                                                className="material-symbols-outlined"
                                                style={{ fontSize: '16px' }}
                                            >
                                                close
                                            </span>
                                        </DismissButton>
                                    </NotifCard>
                                ))}
                            </div>
                        ))
                    )}
                </ScrollArea>
            </Drawer>
        </>,
        document.body,
    );
};

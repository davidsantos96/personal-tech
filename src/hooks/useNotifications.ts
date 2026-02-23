import { useMemo } from 'react';
import { computeNotifications, type AppNotification } from '../data/notifications';

export function useNotifications(): {
    notifications: AppNotification[];
    criticalCount: number;
    unreadCount: number;
} {
    const notifications = useMemo(() => computeNotifications(), []);
    const criticalCount = notifications.filter(n => n.priority === 'critical').length;
    const unreadCount = notifications.length;

    return { notifications, criticalCount, unreadCount };
}

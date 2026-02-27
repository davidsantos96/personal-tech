import { useEffect, useSyncExternalStore } from 'react';
import type { AppNotification } from '../data/notifications';
import {
    subscribeNotifications,
    getNotificationsSnapshot,
    fetchNotifications,
} from '../services/notificationService';

export function useNotifications(): {
    notifications: AppNotification[];
    criticalCount: number;
    unreadCount: number;
} {
    // Reactive — re-renders when the service cache is refreshed
    const notifications = useSyncExternalStore(
        subscribeNotifications,
        getNotificationsSnapshot,
    );

    // Kick off async fetch on mount (populates cache from real students)
    useEffect(() => {
        fetchNotifications();
    }, []);

    const criticalCount = notifications.filter(n => n.priority === 'critical').length;
    const unreadCount = notifications.length;

    return { notifications, criticalCount, unreadCount };
}

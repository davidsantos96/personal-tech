/**
 * Notification Service
 *
 * Dynamically computes notifications from real student data (Supabase or mock).
 * Also supports reading/writing the `notifications` table for persisted alerts.
 */

import { getSupabase, isSupabaseConfigured } from '../lib/supabase';
import { fetchStudents, type Student } from './studentService';
import {
    computeNotifications,
    type AppNotification,
} from '../data/notifications';

// ── In-memory cache + reactive subscriptions ─────────────────────

let _cache: AppNotification[] | null = null;
let _listeners: Array<() => void> = [];
let _snapshotVersion = 0;
let _lastFetchTime = 0;

const CACHE_TTL_MS = 60_000; // 1 min

function _notify() {
    _snapshotVersion++;
    _listeners.forEach(fn => fn());
}

/** Subscribe to notification changes (for useSyncExternalStore) */
export function subscribeNotifications(listener: () => void): () => void {
    _listeners.push(listener);
    return () => {
        _listeners = _listeners.filter(fn => fn !== listener);
    };
}

/** Synchronous snapshot for useSyncExternalStore */
export function getNotificationsSnapshot(): AppNotification[] {
    return _cache ?? [];
}

// ── Fetch notifications dynamically ──────────────────────────────

/**
 * Compute notifications from real student data.
 *
 * 1. Fetches all students for the trainer (from Supabase or mock).
 * 2. Runs the existing `computeNotifications` engine over them.
 * 3. Caches the result and notifies subscribers.
 *
 * Returns the computed list.
 */
export async function fetchNotifications(): Promise<AppNotification[]> {
    const now = Date.now();

    // Return cache if still fresh
    if (_cache && now - _lastFetchTime < CACHE_TTL_MS) {
        return _cache;
    }

    try {
        const students: Student[] = await fetchStudents();
        const notifications = computeNotifications(students);

        _cache = notifications;
        _lastFetchTime = Date.now();
        _notify();

        return notifications;
    } catch (err) {
        console.error('[notificationService] fetchNotifications error:', err);
        // Fall back to existing cache or empty
        return _cache ?? [];
    }
}

/** Force-refresh bypassing cache TTL */
export async function refreshNotifications(): Promise<AppNotification[]> {
    _lastFetchTime = 0;
    return fetchNotifications();
}

// ── Persisted notifications (DB table) ───────────────────────────

export interface PersistedNotification {
    id: string;
    trainerId: string;
    title: string;
    description: string | null;
    type: 'workout_expiring' | 'assessment_request' | 'payment_overdue' | 'general' | null;
    read: boolean;
    metadata: Record<string, unknown>;
    createdAt: string;
}

/**
 * Fetch persisted notifications from the `notifications` table.
 * These are server-generated alerts (e.g., cron jobs, triggers).
 */
export async function fetchPersistedNotifications(): Promise<PersistedNotification[]> {
    if (!isSupabaseConfigured) return [];

    try {
        const supabase = await getSupabase();

        const { data, error } = await supabase
            .from('notifications')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(50);

        if (error) throw error;

        return (data || []).map((row: any) => ({
            id: row.id,
            trainerId: row.trainer_id,
            title: row.title,
            description: row.description,
            type: row.type,
            read: row.read,
            metadata: row.metadata ?? {},
            createdAt: row.created_at,
        }));
    } catch (err) {
        console.error('[notificationService] fetchPersistedNotifications error:', err);
        return [];
    }
}

/** Mark a persisted notification as read */
export async function markNotificationRead(id: string): Promise<void> {
    if (!isSupabaseConfigured) return;

    try {
        const supabase = await getSupabase();
        await supabase
            .from('notifications')
            .update({ read: true } as any)
            .eq('id', id);
    } catch (err) {
        console.error('[notificationService] markNotificationRead error:', err);
    }
}

/** Mark all persisted notifications as read */
export async function markAllNotificationsRead(): Promise<void> {
    if (!isSupabaseConfigured) return;

    try {
        const supabase = await getSupabase();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data: trainer } = await supabase
            .from('trainers')
            .select('id')
            .eq('auth_id', user.id)
            .single();

        if (!trainer) return;

        await supabase
            .from('notifications')
            .update({ read: true } as any)
            .eq('trainer_id', (trainer as any).id);
    } catch (err) {
        console.error('[notificationService] markAllNotificationsRead error:', err);
    }
}

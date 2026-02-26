/**
 * Shared workout history service.
 * Stores completed sessions across both Personal and Student views.
 * Persists to localStorage so data survives page refreshes.
 */

export interface CompletedSession {
    id: string;
    studentId: string;
    workoutId: string;
    workoutName: string;
    workoutType: string;
    date: string;              // ISO date string
    durationSeconds: number;
    durationMinutes: number;
    caloriesBurned: number;
    exercisesCompleted: number;
    exercisesTotal: number;
    /** 'personal' = trainer conducted, 'student' = student self-service */
    source: 'personal' | 'student';
}

const STORAGE_KEY = 'workout_history';

// In-memory cache + subscribers for reactivity
let _cache: CompletedSession[] | null = null;
let _listeners: Array<() => void> = [];
// Snapshot cache – keeps a stable reference per studentId until data changes
let _snapshotVersion = 0;
const _snapshotCache = new Map<string, { version: number; data: CompletedSession[] }>();

function _load(): CompletedSession[] {
    if (_cache !== null) return _cache;
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        _cache = raw ? JSON.parse(raw) : [];
    } catch {
        _cache = [];
    }
    return _cache!;
}

function _persist(sessions: CompletedSession[]) {
    _cache = sessions;
    _snapshotVersion++;
    _snapshotCache.clear();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    _listeners.forEach(fn => fn());
}

/** Subscribe to changes (returns unsubscribe function) */
export function subscribeHistory(listener: () => void): () => void {
    _listeners.push(listener);
    return () => {
        _listeners = _listeners.filter(fn => fn !== listener);
    };
}

/**
 * Get all sessions, optionally filtered by studentId, newest first.
 * Returns a **stable reference** (same array object) until data changes,
 * which is required by useSyncExternalStore.
 */
export function getCompletedSessions(studentId?: string): CompletedSession[] {
    const key = studentId ?? '__all__';
    const cached = _snapshotCache.get(key);
    if (cached && cached.version === _snapshotVersion) return cached.data;

    const all = _load();
    const filtered = studentId ? all.filter(s => s.studentId === studentId) : all;
    const sorted = filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    _snapshotCache.set(key, { version: _snapshotVersion, data: sorted });
    return sorted;
}

/** Add a new completed session */
export function addCompletedSession(session: Omit<CompletedSession, 'id'>): CompletedSession {
    const all = _load();
    const newSession: CompletedSession = {
        ...session,
        id: `cs-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    };
    _persist([newSession, ...all]);
    return newSession;
}

/** Remove a completed session by id */
export function removeCompletedSession(id: string): void {
    const all = _load();
    _persist(all.filter(s => s.id !== id));
}

/** Clear all sessions (useful for dev/testing) */
export function clearHistory(): void {
    _persist([]);
}

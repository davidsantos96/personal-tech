/**
 * Shared workout history service.
 * Stores completed sessions across both Personal and Student views.
 *
 * When Supabase is configured the data is persisted in the
 * `workout_sessions` + `session_exercises` tables.
 * Falls back to localStorage when running offline / mock mode.
 */

import { getSupabase, isSupabaseConfigured } from '../lib/supabase';

// ── Types ────────────────────────────────────────────────────────

export interface CompletedSession {
    id: string;
    studentId: string;
    workoutId: string;
    workoutName: string;
    workoutType: string;
    date: string;              // ISO date string (YYYY-MM-DD)
    durationSeconds: number;
    durationMinutes: number;
    caloriesBurned: number;
    exercisesCompleted: number;
    exercisesTotal: number;
    /** 'personal' = trainer conducted, 'student' = student self-service */
    source: 'personal' | 'student';
}

/** Extra payload sent only when saving – detailed exercise info */
export interface SessionExercisePayload {
    exercise_id?: string;
    exercise_name: string;
    series_completed: number;
    series_total: number;
    completed: boolean;
}

// ── localStorage fallback (offline / mock) ───────────────────────

const STORAGE_KEY = 'workout_history';

let _cache: CompletedSession[] | null = null;
let _listeners: Array<() => void> = [];
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

function _notify() {
    _listeners.forEach(fn => fn());
}

// ── Subscriptions (works for both local & remote) ────────────────

/** Subscribe to changes (returns unsubscribe function) */
export function subscribeHistory(listener: () => void): () => void {
    _listeners.push(listener);
    return () => {
        _listeners = _listeners.filter(fn => fn !== listener);
    };
}

/**
 * Get all sessions **synchronously** from memory / localStorage.
 * Returns a stable reference per studentId (required by useSyncExternalStore).
 * For remote data prefer `fetchCompletedSessions`.
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

// ── Fetch sessions from Supabase ─────────────────────────────────

/**
 * Async fetch of completed sessions for a student.
 * Reads from Supabase when configured, falls back to localStorage.
 * Also refreshes the in-memory cache so `getCompletedSessions` stays up-to-date.
 */
export async function fetchCompletedSessions(studentId: string): Promise<CompletedSession[]> {
    if (!isSupabaseConfigured) {
        return getCompletedSessions(studentId);
    }

    try {
        const supabase = await getSupabase();

        const { data: rows, error } = await supabase
            .from('workout_sessions')
            .select(`
                *,
                workout_plans:workout_plan_id ( name, type ),
                session_exercises ( * )
            `)
            .eq('student_id', studentId)
            .order('started_at', { ascending: false });

        if (error) throw error;
        if (!rows) return [];

        const sessions: CompletedSession[] = rows.map((row: any) => {
            const exercises: any[] = row.session_exercises ?? [];
            const completedCount = exercises.filter((e: any) => e.completed).length;
            return {
                id: row.id,
                studentId: row.student_id,
                workoutId: row.workout_plan_id ?? '',
                workoutName: row.workout_plans?.name ?? 'Treino',
                workoutType: row.workout_plans?.type ?? '',
                date: (row.started_at ?? row.created_at).substring(0, 10),
                durationSeconds: row.duration_seconds ?? 0,
                durationMinutes: Math.round((row.duration_seconds ?? 0) / 60),
                caloriesBurned: row.calories_burned ?? 0,
                exercisesCompleted: completedCount,
                exercisesTotal: exercises.length,
                source: row.source ?? 'personal',
            };
        });

        // Refresh local cache so sync consumers stay current
        _cache = [
            ...sessions,
            ...(_load().filter(s => s.studentId !== studentId)),
        ];
        _snapshotVersion++;
        _snapshotCache.clear();
        _notify();

        return sessions;
    } catch (err) {
        console.error('[workoutHistoryService] fetchCompletedSessions error:', err);
        return getCompletedSessions(studentId);
    }
}

// ── Add a completed session ──────────────────────────────────────

/**
 * Add a new completed session.
 *
 * @param session  Core session fields (without `id`).
 * @param exercises  Optional per-exercise detail persisted to `session_exercises`.
 *
 * Always writes to localStorage for instant local reactivity.
 * When Supabase is configured also inserts into the DB.
 */
export async function addCompletedSession(
    session: Omit<CompletedSession, 'id'>,
    exercises?: SessionExercisePayload[],
): Promise<CompletedSession> {
    // ── 1. Always persist locally first for instant UI feedback ──
    const localSession: CompletedSession = {
        ...session,
        id: `cs-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    };
    const all = _load();
    _persist([localSession, ...all]);

    // ── 2. If Supabase available, persist remotely ──
    if (isSupabaseConfigured) {
        try {
            const supabase = await getSupabase();

            // Resolve trainer_id from the auth user
            let trainerId: string | null = null;
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (user) {
                    const { data: trainer } = await supabase
                        .from('trainers')
                        .select('id')
                        .eq('auth_id', user.id)
                        .single();
                    trainerId = (trainer as any)?.id ?? null;
                }
            } catch { /* non-critical */ }

            const sessionPayload = {
                student_id: session.studentId,
                workout_plan_id: session.workoutId || null,
                trainer_id: trainerId,
                duration_seconds: session.durationSeconds,
                calories_burned: session.caloriesBurned,
                source: session.source,
                started_at: new Date(
                    new Date(session.date).getTime() - session.durationSeconds * 1000,
                ).toISOString(),
                finished_at: new Date(session.date + 'T' + new Date().toTimeString().slice(0, 8)).toISOString(),
            };

            const { data: inserted, error: sessionErr } = await supabase
                .from('workout_sessions')
                .insert(sessionPayload as any)
                .select()
                .single();

            if (sessionErr) throw sessionErr;

            const dbSessionId = (inserted as any)?.id;

            // Insert per-exercise detail rows
            if (dbSessionId && exercises && exercises.length > 0) {
                const exRows = exercises.map(ex => ({
                    session_id: dbSessionId,
                    exercise_id: ex.exercise_id || null,
                    exercise_name: ex.exercise_name,
                    series_completed: ex.series_completed,
                    series_total: ex.series_total,
                    completed: ex.completed,
                }));

                const { error: exErr } = await supabase
                    .from('session_exercises')
                    .insert(exRows as any);

                if (exErr) console.error('[workoutHistoryService] session_exercises insert error:', exErr);
            }

            // Update local entry with the real DB id
            if (dbSessionId) {
                localSession.id = dbSessionId;
                _persist([localSession, ...all]);
            }

            // Update student's last_training_at
            await supabase
                .from('students')
                .update({ last_training_at: session.date } as any)
                .eq('id', session.studentId);

        } catch (err) {
            console.error('[workoutHistoryService] addCompletedSession remote error:', err);
            // Local data already saved — no data loss
        }
    }

    return localSession;
}

// ── Remove a completed session ───────────────────────────────────

/** Remove a completed session by id (local + remote) */
export async function removeCompletedSession(id: string): Promise<void> {
    // Local
    const all = _load();
    _persist(all.filter(s => s.id !== id));

    // Remote
    if (isSupabaseConfigured) {
        try {
            const supabase = await getSupabase();
            const { error } = await supabase
                .from('workout_sessions')
                .delete()
                .eq('id', id);
            if (error) throw error;
        } catch (err) {
            console.error('[workoutHistoryService] removeCompletedSession remote error:', err);
        }
    }
}



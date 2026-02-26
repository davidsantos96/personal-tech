/**
 * Student Workout Service.
 * Stores workouts created by the trainer for each student.
 * Persists to localStorage with reactive subscriptions (useSyncExternalStore-safe).
 */

export interface SavedWorkoutExercise {
    id: number;
    name: string;
    muscleGroup: string;
    series: number;
    reps: string;
    weight: string;
    rest: number;
    notes?: string;
    completed: boolean;
    gifUrl?: string;
}

export interface SavedWorkout {
    id: string;
    studentId: string;
    name: string;
    type: string;
    status: 'active' | 'expiring' | 'expired';
    validUntil: string;           // ISO date
    createdAt: string;            // ISO date
    estimatedMinutes: number;
    exercises: SavedWorkoutExercise[];
}

const STORAGE_KEY = 'student_workouts';

// ── In-memory cache + reactive subscriptions ─────────────────────
let _cache: SavedWorkout[] | null = null;
let _listeners: Array<() => void> = [];
let _snapshotVersion = 0;
const _snapshotCache = new Map<string, { version: number; data: SavedWorkout[] }>();

function _load(): SavedWorkout[] {
    if (_cache !== null) return _cache;
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        _cache = raw ? JSON.parse(raw) : [];
    } catch {
        _cache = [];
    }
    return _cache!;
}

function _persist(workouts: SavedWorkout[]) {
    _cache = workouts;
    _snapshotVersion++;
    _snapshotCache.clear();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(workouts));
    _listeners.forEach(fn => fn());
}

/** Subscribe to changes (returns unsubscribe fn). */
export function subscribeWorkouts(listener: () => void): () => void {
    _listeners.push(listener);
    return () => {
        _listeners = _listeners.filter(fn => fn !== listener);
    };
}

/**
 * Get workouts for a student (newest first).
 * Returns a **stable reference** per studentId until data changes.
 */
export function getStudentWorkouts(studentId?: string): SavedWorkout[] {
    const key = studentId ?? '__all__';
    const cached = _snapshotCache.get(key);
    if (cached && cached.version === _snapshotVersion) return cached.data;

    const all = _load();
    const filtered = studentId ? all.filter(w => w.studentId === studentId) : all;
    const sorted = filtered.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
    _snapshotCache.set(key, { version: _snapshotVersion, data: sorted });
    return sorted;
}

/** Get a single workout by id. */
export function getWorkoutById(workoutId: string): SavedWorkout | undefined {
    return _load().find(w => w.id === workoutId);
}

/** Add a newly created workout. */
export function addStudentWorkout(
    workout: Omit<SavedWorkout, 'id' | 'createdAt'>,
): SavedWorkout {
    const all = _load();
    const newWorkout: SavedWorkout = {
        ...workout,
        id: `sw-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        createdAt: new Date().toISOString().split('T')[0],
    };
    _persist([newWorkout, ...all]);
    return newWorkout;
}

/** Remove a workout by id. */
export function removeStudentWorkout(id: string): void {
    const all = _load();
    _persist(all.filter(w => w.id !== id));
}

/** Update only the status of a workout. */
export function updateWorkoutStatus(
    id: string,
    status: SavedWorkout['status'],
): void {
    const all = _load();
    _persist(all.map(w => (w.id === id ? { ...w, status } : w)));
}

/** Clear all workouts (dev/testing). */
export function clearWorkouts(): void {
    _persist([]);
}

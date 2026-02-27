import { getSupabase, isSupabaseConfigured } from '../lib/supabase';

export interface SavedWorkoutExercise {
    id?: number; // Not mapped strictly to DB on read, but used in UI
    db_id?: string;
    workout_plan_id?: string;
    name: string;
    muscleGroup: string; // Not mapped in DB strictly, we mock it or fetch from exercise. Optional.
    series: number;
    reps: string;
    weight: string;
    rest: number;
    notes?: string;
    completed: boolean;
    gifUrl?: string; // Not strictly in workout_plan_exercises, could join exercises table
    exercise_id?: string;
}

export interface SavedWorkout {
    id: string;
    studentId: string;
    name: string;
    type: string;
    status: 'active' | 'expiring' | 'expired';
    validUntil: string;
    createdAt: string;
    estimatedMinutes: number;
    exercises: SavedWorkoutExercise[];
}

const STORAGE_KEY = 'student_workouts';

// ── In-memory cache + reactive subscriptions (FOR MOCK DATA ONLY) ──
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

export function subscribeWorkouts(listener: () => void): () => void {
    _listeners.push(listener);
    return () => {
        _listeners = _listeners.filter(fn => fn !== listener);
    };
}

export function getWorkoutById(id: string): SavedWorkout | undefined {
    return _load().find(w => w.id === id);
}

// Keeping sync legacy version for non-async contexts until everything is migrated, but the main new functions are async
export function getStudentWorkoutsSync(studentId?: string): SavedWorkout[] {
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

/**
 * Fetch workouts for a student. Combines Supabase data if configured.
 */
export async function fetchStudentWorkouts(studentId: string): Promise<SavedWorkout[]> {
    if (!isSupabaseConfigured) {
        return getStudentWorkoutsSync(studentId);
    }

    try {
        const supabase = await getSupabase();

        // Fetch workout plans
        const { data: plans, error: plansError } = await supabase
            .from('workout_plans')
            .select(`
                *,
                workout_plan_exercises!inner (
                    *,
                    exercises:exercise_id (*)
                )
            `)
            .eq('student_id', studentId)
            .order('created_at', { ascending: false });

        if (plansError) throw plansError;

        if (!plans) return [];

        return plans.map((plan: any) => ({
            id: plan.id,
            studentId: plan.student_id,
            name: plan.name,
            type: plan.type || 'Cardio',
            status: plan.status || 'active',
            validUntil: plan.valid_until || '',
            createdAt: plan.created_at,
            estimatedMinutes: plan.estimated_minutes || 0,
            exercises: plan.workout_plan_exercises.map((wpe: any, idx: number) => ({
                id: idx + 1,
                db_id: wpe.id,
                workout_plan_id: wpe.workout_plan_id,
                exercise_id: wpe.exercise_id,
                name: wpe.exercises?.name || 'Exercício Desconhecido',
                muscleGroup: wpe.exercises?.primary_muscle_group || 'Vários',
                series: wpe.series || 0,
                reps: wpe.reps || '',
                weight: wpe.weight || '-',
                rest: wpe.rest_seconds || 60,
                notes: wpe.notes || '',
                completed: false, // UI state
                gifUrl: wpe.exercises?.gif_url || ''
            }))
        }));

    } catch (err) {
        console.error('[workoutService] fetchStudentWorkouts error:', err);
        return [];
    }
}

/** Add a newly created workout. Sync/Async hybrid. */
export async function addStudentWorkoutApi(
    workout: Omit<SavedWorkout, 'id' | 'createdAt'>,
): Promise<SavedWorkout | null> {
    if (!isSupabaseConfigured) {
        const all = _load();
        const newWorkout: SavedWorkout = {
            ...workout,
            id: `sw-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
            createdAt: new Date().toISOString().split('T')[0],
        };
        _persist([newWorkout, ...all]);
        return newWorkout;
    }

    try {
        const supabase = await getSupabase();

        // 1. Get logged-in trainer
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Not authenticated');

        const { data: trainer } = await supabase
            .from('trainers')
            .select('id')
            .eq('auth_id', user.id)
            .single();

        if (!trainer) throw new Error('Trainer not found');

        // 2. Insert Workout Plan
        const planPayload = {
            student_id: workout.studentId,
            trainer_id: (trainer as any).id,
            name: workout.name,
            type: workout.type as any,
            status: workout.status,
            valid_until: workout.validUntil || null,
            estimated_minutes: workout.estimatedMinutes,
        };

        const { data: plan, error: planError } = await supabase
            .from('workout_plans')
            .insert(planPayload as any)
            .select()
            .single();

        if (planError) throw planError;
        if (!plan) throw new Error('Failed to create plan');

        // 3. Insert exercises
        // For custom exercises not in DB, we'd normally create them first.
        // Assuming we have real exercise IDs or we create placeholders.
        // Since the UI might not be picking from full DB yet, let's create custom exercises on the fly
        // if they don't have an exercise_id.
        const planExercisesToInsert = [];
        for (let i = 0; i < workout.exercises.length; i++) {
            const ex = workout.exercises[i];

            let exerciseId = ex.exercise_id;

            if (!exerciseId) {
                // Determine missing exercise info. Search or create a generic custom one.
                const exPayload = {
                    name: ex.name,
                    primary_muscle_group: ex.muscleGroup || 'Outros',
                    is_custom: true,
                };

                const { data: newDbEx, error: _exErr } = await supabase
                    .from('exercises')
                    .insert(exPayload as any)
                    .select('id')
                    .single();

                if (newDbEx) {
                    exerciseId = (newDbEx as any).id;
                } else {
                    continue; // Skip if failed
                }
            }

            planExercisesToInsert.push({
                workout_plan_id: (plan as any).id,
                exercise_id: exerciseId,
                sort_order: i + 1,
                series: ex.series,
                reps: String(ex.reps),
                weight: ex.weight ? String(ex.weight) : null,
                rest_seconds: ex.rest,
                notes: ex.notes || null,
            });
        }

        if (planExercisesToInsert.length > 0) {
            const { error: exercisesError } = await supabase
                .from('workout_plan_exercises')
                .insert(planExercisesToInsert as any);

            if (exercisesError) throw exercisesError;
        }

        // We return the base format expected by frontend
        return {
            id: (plan as any).id,
            studentId: (plan as any).student_id,
            name: (plan as any).name,
            type: (plan as any).type || 'Cardio',
            status: (plan as any).status || 'active',
            validUntil: (plan as any).valid_until || '',
            createdAt: (plan as any).created_at,
            estimatedMinutes: (plan as any).estimated_minutes || 0,
            exercises: workout.exercises // Return what was sent since we know it
        };

    } catch (err) {
        console.error('[workoutService] addStudentWorkoutApi error:', err);
        return null;
    }
}

/** Remove a workout by id. */
export async function removeStudentWorkout(id: string): Promise<void> {
    if (!isSupabaseConfigured) {
        const all = _load();
        _persist(all.filter(w => w.id !== id));
        return;
    }

    try {
        const supabase = await getSupabase();
        const { error } = await supabase.from('workout_plans').delete().eq('id', id);
        if (error) throw error;
    } catch (err) {
        console.error('[workoutService] removeStudentWorkout error:', err);
    }
}

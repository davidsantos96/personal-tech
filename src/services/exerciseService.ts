import { getSupabase, isSupabaseConfigured } from '../lib/supabase';
import type { Exercise as DBExercise } from '../lib/database.types';

// Re-export the DB type with a friendlier alias
export type Exercise = DBExercise;

const categories = ['Todos', 'Peito', 'Costas', 'Pernas', 'Ombros', 'Bracos', 'Core', 'Cardio'] as const;

// ── Fallback (offline / mock) data ───────────────────────────
const fallbackExercises: Exercise[] = [
    { id: '1', name: 'Supino Reto com Barra', muscle_group: 'Peitoral Maior, Triceps', category: 'Peito', equipment: 'Barra', gif_url: null, instructions: null, external_id: null, is_custom: false, created_by: null, created_at: '' },
    { id: '2', name: 'Agachamento Livre', muscle_group: 'Quadriceps, Gluteos', category: 'Pernas', equipment: 'Barra', gif_url: null, instructions: null, external_id: null, is_custom: false, created_by: null, created_at: '' },
    { id: '3', name: 'Puxada Alta Frontal', muscle_group: 'Dorsais, Biceps', category: 'Costas', equipment: 'Cabo', gif_url: null, instructions: null, external_id: null, is_custom: false, created_by: null, created_at: '' },
    { id: '4', name: 'Elevacao Lateral', muscle_group: 'Deltoide Lateral', category: 'Ombros', equipment: 'Halteres', gif_url: null, instructions: null, external_id: null, is_custom: false, created_by: null, created_at: '' },
    { id: '5', name: 'Leg Press 45', muscle_group: 'Quadriceps', category: 'Pernas', equipment: 'Maquina', gif_url: null, instructions: null, external_id: null, is_custom: false, created_by: null, created_at: '' },
    { id: '6', name: 'Rosca Direta', muscle_group: 'Biceps', category: 'Braços', equipment: 'Barra', gif_url: null, instructions: null, external_id: null, is_custom: false, created_by: null, created_at: '' },
    { id: '7', name: 'Desenvolvimento com Halteres', muscle_group: 'Deltoide Anterior', category: 'Ombros', equipment: 'Halteres', gif_url: null, instructions: null, external_id: null, is_custom: false, created_by: null, created_at: '' },
    { id: '8', name: 'Crucifixo Inclinado', muscle_group: 'Peitoral Superior', category: 'Peito', equipment: 'Halteres', gif_url: null, instructions: null, external_id: null, is_custom: false, created_by: null, created_at: '' },
    { id: '9', name: 'Remada Curvada', muscle_group: 'Dorsais, Trapezio', category: 'Costas', equipment: 'Barra', gif_url: null, instructions: null, external_id: null, is_custom: false, created_by: null, created_at: '' },
    { id: '10', name: 'Extensao de Triceps', muscle_group: 'Triceps', category: 'Braços', equipment: 'Cabo', gif_url: null, instructions: null, external_id: null, is_custom: false, created_by: null, created_at: '' },
];

// ── In-memory cache ──────────────────────────────────────────
let _allExercisesCache: Exercise[] | null = null;
let _cacheTimestamp = 0;
const CACHE_TTL = 5 * 60_000; // 5 min

/**
 * Fetch exercises from Supabase.
 * Uses the Edge Function (exercise-search) which checks DB cache first,
 * then falls back to ExerciseDB API if configured.
 * If Supabase is not configured, returns local fallback data.
 */
export async function searchExercises(
    query?: string,
    bodyPart?: string,
    limit = 20,
): Promise<Exercise[]> {
    if (!isSupabaseConfigured) {
        // Apply client-side filter over fallback data
        return filterLocal(fallbackExercises, query, bodyPart).slice(0, limit);
    }

    try {
        const supabase = await getSupabase();
        const { data, error } = await supabase.functions.invoke('exercise-search', {
            body: { query, bodyPart, limit },
        });

        if (error) throw error;
        return (data?.exercises as Exercise[]) ?? [];
    } catch (err) {
        console.error('[exerciseService] Edge function failed, querying table directly:', err);
        // Fallback: query exercises table directly
        return queryExercisesTable(query, bodyPart, limit);
    }
}

/**
 * Fetch ALL exercises from the DB (paginated, cached).
 * Used as the initial dataset (replaces the old sync getExercises()).
 */
export async function fetchAllExercises(limit = 200): Promise<Exercise[]> {
    // Check cache
    if (_allExercisesCache && Date.now() - _cacheTimestamp < CACHE_TTL) {
        return _allExercisesCache;
    }

    if (!isSupabaseConfigured) {
        _allExercisesCache = fallbackExercises;
        _cacheTimestamp = Date.now();
        return fallbackExercises;
    }

    try {
        const supabase = await getSupabase();
        const { data, error } = await supabase
            .from('exercises')
            .select('*')
            .order('name', { ascending: true })
            .limit(limit);

        if (error) throw error;
        const result = (data as Exercise[]) ?? fallbackExercises;
        _allExercisesCache = result;
        _cacheTimestamp = Date.now();
        return result;
    } catch (err) {
        console.error('[exerciseService] fetchAllExercises error:', err);
        return fallbackExercises;
    }
}

/**
 * Fetch a single exercise by ID from Supabase.
 */
export async function fetchExerciseById(id: string): Promise<Exercise | null> {
    if (!isSupabaseConfigured) {
        return fallbackExercises.find(e => e.id === id) ?? null;
    }

    try {
        const supabase = await getSupabase();
        const { data, error } = await supabase
            .from('exercises')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data as Exercise;
    } catch (err) {
        console.error('[exerciseService] fetchExerciseById error:', err);
        return null;
    }
}

/**
 * Direct query to the exercises table (fallback when Edge Function is unavailable).
 */
async function queryExercisesTable(
    query?: string,
    category?: string,
    limit = 20,
): Promise<Exercise[]> {
    try {
        const supabase = await getSupabase();
        let q = supabase.from('exercises').select('*').limit(limit);
        if (query) q = q.ilike('name', `%${query}%`);
        if (category && category !== 'Todos') q = q.eq('category', category as any);
        const { data, error } = await q;
        if (error) throw error;
        return (data as Exercise[]) ?? [];
    } catch {
        return fallbackExercises;
    }
}

/** Client-side filter for offline mode */
function filterLocal(exercises: Exercise[], query?: string, category?: string): Exercise[] {
    return exercises.filter(ex => {
        const matchesQuery = !query ||
            ex.name.toLowerCase().includes(query.toLowerCase()) ||
            (ex.muscle_group ?? '').toLowerCase().includes(query.toLowerCase());
        const matchesCategory = !category || category === 'Todos' || ex.category === category;
        return matchesQuery && matchesCategory;
    });
}

/** Get all categories (static list matching the DB CHECK constraint). */
export function getCategories(): string[] {
    return [...categories];
}

/**
 * Fetch distinct categories from the DB.
 * Falls back to static list.
 */
export async function fetchCategories(): Promise<string[]> {
    if (!isSupabaseConfigured) return [...categories];

    try {
        const supabase = await getSupabase();
        const { data, error } = await supabase
            .from('exercises')
            .select('category')
            .not('category', 'is', null);

        if (error) throw error;

        const unique = new Set<string>(['Todos']);
        (data ?? []).forEach((row: any) => {
            if (row.category) unique.add(row.category);
        });
        return Array.from(unique);
    } catch {
        return [...categories];
    }
}

/**
 * Synchronous fallback — returns offline mock data.
 * Used by components that haven't migrated to async yet.
 * @deprecated Migrate to fetchAllExercises() or searchExercises() instead.
 */
export function getExercises(): Exercise[] {
    // Return cache if available (warm from a previous fetchAllExercises call)
    if (_allExercisesCache) return _allExercisesCache;
    return fallbackExercises;
}

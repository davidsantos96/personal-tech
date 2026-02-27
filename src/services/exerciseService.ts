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
    if (!isSupabaseConfigured) return fallbackExercises;

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
        if (category && category !== 'Todos') q = q.eq('category', category);
        const { data, error } = await q;
        if (error) throw error;
        return (data as Exercise[]) ?? [];
    } catch {
        return fallbackExercises;
    }
}

/** Get all categories (static list matching the DB CHECK constraint). */
export function getCategories(): string[] {
    return [...categories];
}



/**
 * Synchronous fallback — returns offline mock data.
 * Used by components that haven't migrated to async yet.
 * @deprecated Migrate to searchExercises() instead.
 */
export function getExercises(): Exercise[] {
    return fallbackExercises;
}

/**
 * Trainer Service
 *
 * Fetches and caches the current trainer profile from Supabase.
 * Falls back to a mock profile when running offline.
 */

import { getSupabase, isSupabaseConfigured } from '../lib/supabase';

export interface TrainerProfile {
    id: string;
    authId: string;
    fullName: string;
    email: string;
    phone: string | null;
    avatarUrl: string | null;
    specialty: string | null;
}

const MOCK_TRAINER: TrainerProfile = {
    id: 'mock-trainer',
    authId: 'mock-user-123',
    fullName: 'Coach Silva',
    email: 'coach@personaltech.app',
    phone: '(11) 99999-0000',
    avatarUrl: null,
    specialty: 'Musculação',
};

let _cache: TrainerProfile | null = null;
let _cachePromise: Promise<TrainerProfile | null> | null = null;

/**
 * Fetch the current trainer profile.
 * Caches result to avoid repeated queries.
 */
export async function fetchTrainerProfile(): Promise<TrainerProfile | null> {
    if (_cache) return _cache;
    if (!isSupabaseConfigured) {
        _cache = MOCK_TRAINER;
        return _cache;
    }

    // Deduplicate concurrent calls
    if (_cachePromise) return _cachePromise;

    _cachePromise = (async () => {
        try {
            const supabase = await getSupabase();
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return null;

            const { data: trainer, error } = await supabase
                .from('trainers')
                .select('*')
                .eq('auth_id', user.id)
                .single();

            if (error) {
                console.warn('[trainerService] Error fetching trainer:', error.message, error.details);
                return null;
            }
            if (!trainer) {
                console.warn('[trainerService] No trainer found for auth_id:', user.id);
                return null;
            }

            const profile: TrainerProfile = {
                id: (trainer as any).id,
                authId: (trainer as any).auth_id,
                fullName: (trainer as any).full_name,
                email: (trainer as any).email,
                phone: (trainer as any).phone,
                avatarUrl: (trainer as any).avatar_url,
                specialty: (trainer as any).specialty,
            };

            _cache = profile;
            return profile;
        } catch (err) {
            console.error('[trainerService] fetchTrainerProfile error:', err);
            return null;
        }
    })();

    return _cachePromise;
}

/** Force-refresh the trainer profile cache */
export async function refreshTrainerProfile(): Promise<TrainerProfile | null> {
    _cache = null;
    _cachePromise = null;
    return fetchTrainerProfile();
}

/** Clear cache (e.g. on sign out) */
export function clearTrainerCache() {
    _cache = null;
    _cachePromise = null;
}

/** Update trainer profile fields in Supabase */
export async function updateTrainerProfile(
    updates: Partial<Pick<TrainerProfile, 'fullName' | 'email' | 'phone' | 'avatarUrl' | 'specialty'>>
): Promise<TrainerProfile | null> {
    if (!isSupabaseConfigured) return _cache;

    try {
        const current = await fetchTrainerProfile();
        if (!current) throw new Error('Trainer not found');

        const supabase = await getSupabase();

        const payload: Record<string, unknown> = {};
        if (updates.fullName !== undefined) payload.full_name = updates.fullName;
        if (updates.email !== undefined) payload.email = updates.email;
        if (updates.phone !== undefined) payload.phone = updates.phone;
        if (updates.avatarUrl !== undefined) payload.avatar_url = updates.avatarUrl;
        if (updates.specialty !== undefined) payload.specialty = updates.specialty;

        const { error } = await supabase
            .from('trainers')
            .update(payload as any)
            .eq('id', current.id);

        if (error) throw error;

        // Refresh cache
        return refreshTrainerProfile();
    } catch (err) {
        console.error('[trainerService] updateTrainerProfile error:', err);
        throw err;
    }
}

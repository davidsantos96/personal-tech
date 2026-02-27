/**
 * Supabase Client — Personal Tech
 *
 * Lazy-loaded Supabase client to keep the initial bundle small (~477 KB saved).
 * The client is only instantiated on first use via getSupabase().
 *
 * Setup:
 *   1. Copy `.env.example` → `.env`
 *   2. Fill in your Supabase project URL and anon key
 *   3. Restart Vite dev server
 */

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
        '[Supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY.\n' +
            'Copy .env.example → .env and fill in your credentials.\n' +
            'The app will run in offline/mock mode until configured.',
    );
}

/**
 * Convenience helper — true when Supabase credentials are properly set.
 * Use this to gate real API calls vs mock/fallback data.
 */
export const isSupabaseConfigured =
    !!supabaseUrl &&
    !!supabaseAnonKey &&
    !supabaseUrl.includes('placeholder');

let _client: SupabaseClient<Database> | null = null;

/**
 * Lazily creates and returns the Supabase client.
 * The heavy @supabase/supabase-js bundle is only downloaded on first call.
 */
export async function getSupabase(): Promise<SupabaseClient<Database>> {
    if (_client) return _client;
    const { createClient } = await import('@supabase/supabase-js');
    _client = createClient<Database>(
        supabaseUrl || 'https://placeholder.supabase.co',
        supabaseAnonKey || 'placeholder-key',
        {
            auth: {
                persistSession: true,
                autoRefreshToken: true,
            },
        },
    );
    return _client;
}

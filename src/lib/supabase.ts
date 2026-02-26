/**
 * Supabase Client — Personal Tech
 *
 * Centralised Supabase client instance used across the entire app.
 * Reads credentials from environment variables (Vite convention).
 *
 * Setup:
 *   1. Copy `.env.example` → `.env`
 *   2. Fill in your Supabase project URL and anon key
 *   3. Restart Vite dev server
 */

import { createClient } from '@supabase/supabase-js';
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

export const supabase = createClient<Database>(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder-key',
    {
        auth: {
            persistSession: true,
            autoRefreshToken: true,
        },
    },
);

/**
 * Convenience helper — true when Supabase credentials are properly set.
 * Use this to gate real API calls vs mock/fallback data.
 */
export const isSupabaseConfigured =
    !!supabaseUrl &&
    !!supabaseAnonKey &&
    !supabaseUrl.includes('placeholder');

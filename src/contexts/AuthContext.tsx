import React, { createContext, useContext, useState, useEffect } from 'react';
import { getSupabase, isSupabaseConfigured } from '../lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

interface AuthContextData {
    user: User | null;
    session: Session | null;
    isLoading: boolean;
    signOut: () => Promise<void>;
    isMockMode: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!isSupabaseConfigured) {
            // Fallback: Se o banco não tiver env na nuvem, o app roda "offline mockado"
            setUser({ id: 'mock-user-123', email: 'mock@personal.com' } as User);
            setIsLoading(false);
            return;
        }

        let subscriptionUnsubscribe: (() => void) | undefined;

        const initAuth = async () => {
            try {
                const supabase = await getSupabase();
                const { data: { session } } = await supabase.auth.getSession();
                setSession(session);
                setUser(session?.user ?? null);

                const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, sess) => {
                    setSession(sess);
                    setUser(sess?.user ?? null);
                });

                subscriptionUnsubscribe = () => subscription.unsubscribe();

            } catch (err) {
                console.error('Auth init error:', err);
            } finally {
                setIsLoading(false);
            }
        };

        initAuth();

        return () => {
            if (subscriptionUnsubscribe) subscriptionUnsubscribe();
        };
    }, []);

    const signOut = async () => {
        if (isSupabaseConfigured) {
            const supabase = await getSupabase();
            await supabase.auth.signOut();
        } else {
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, session, isLoading, signOut, isMockMode: !isSupabaseConfigured }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

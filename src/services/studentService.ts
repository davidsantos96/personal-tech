import { getSupabase, isSupabaseConfigured } from '../lib/supabase';
import { studentsData as mockStudentsData, type Student as MockStudent } from '../data/students';
import type { Database } from '../lib/database.types';

export type Student = MockStudent;

/**
 * Fetch all students for the logged-in trainer.
 */
export async function fetchStudents(): Promise<Student[]> {
    if (!isSupabaseConfigured) return mockStudentsData;

    try {
        const supabase = await getSupabase();

        // As per RLS policies, this automatically filters by trainer_id
        const { data, error } = await supabase
            .from('students')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        return (data || []).map(mapDbStudentToAppStudent);
    } catch (err) {
        console.error('[studentService] fetchStudents failed:', err);
        return [];
    }
}

/**
 * Fetch a single student by ID
 */
export async function getStudentByIdApi(id: string): Promise<Student | null> {
    if (!isSupabaseConfigured) {
        return mockStudentsData.find(s => s.id === id) || null;
    }

    try {
        const supabase = await getSupabase();

        const { data, error } = await supabase
            .from('students')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        if (!data) return null;

        return mapDbStudentToAppStudent(data);
    } catch (err) {
        console.error('[studentService] getStudentByIdApi failed:', err);
        return null;
    }
}

/**
 * Create a new student for the logged-in trainer
 */
export async function createStudent(
    studentData: Omit<Database['public']['Tables']['students']['Insert'], 'trainer_id'>
): Promise<Student | null> {
    if (!isSupabaseConfigured) {
        console.warn('Mock mode: createStudent ignored.');
        return null;
    }

    try {
        const supabase = await getSupabase();

        // Get the current user first (the trainer)
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('User not authenticated');

        // Find the trainer_id for this user
        const { data: trainerData, error: trainerError } = await supabase
            .from('trainers')
            .select('id')
            .eq('auth_id', user.id)
            .single();

        if (trainerError || !trainerData) {
            throw new Error('Trainer record not found for auth_id');
        }

        const payload = {
            ...studentData,
            trainer_id: (trainerData as any).id,
        };

        const { data, error } = await supabase
            .from('students')
            .insert(payload as any)
            .select()
            .single();

        if (error) throw error;

        return mapDbStudentToAppStudent(data);
    } catch (err) {
        console.error('[studentService] createStudent failed:', err);
        throw err;
    }
}

// ── Helpers ──

function mapDbStudentToAppStudent(dbStudent: any): Student {
    // Map db status to app visual status (for legacy compatibility)
    let visualStatus: 'updated' | 'expiring' | 'expired' = 'updated';
    let label = 'ATUALIZADO';

    // Simplistic mapping, as visual statuses in app were date-based
    if (dbStudent.status === 'inactive') {
        visualStatus = 'expired';
        label = 'INATIVO';
    } else if (dbStudent.status === 'pending') {
        visualStatus = 'expiring';
        label = 'PENDENTE';
    }

    // Convert string inputs to Date objects to check dates if needed,
    // but the app expects ISO strings.
    return {
        id: dbStudent.id,
        name: dbStudent.full_name,
        avatar: dbStudent.avatar_url || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(dbStudent.full_name),
        goal: dbStudent.goal || 'Condicionamento',
        goalIcon: (dbStudent.goal_icon || 'dumbbell') as any,
        status: visualStatus,
        statusLabel: label,
        isActive: dbStudent.status === 'active',
        planExpiresAt: dbStudent.plan_expires_at || '',
        lastEvaluationAt: dbStudent.last_evaluation_at || '',
        lastTrainingAt: dbStudent.last_training_at || '',
        workoutSeriesExpiresAt: dbStudent.workout_series_expires_at || ''
    };
}

export { studentsData } from '../data/students';

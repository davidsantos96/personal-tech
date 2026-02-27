/**
 * Database Types — matching the Supabase schema
 * defined in supabase/migrations/001_create_tables.sql.
 *
 * In production you'd run `supabase gen types typescript` to auto-generate
 * this file. For now we maintain it manually.
 */

export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[];

/* ------------------------------------------------------------------ */
/*  Row types — each key matches a table name                         */
/* ------------------------------------------------------------------ */

// 1. TRAINERS
export type Trainer = {
    id: string;           // uuid PK
    auth_id: string;      // uuid, FK auth.users
    full_name: string;
    email: string;
    phone: string | null;
    avatar_url: string | null;
    specialty: string | null;   // ex: "Hipertrofia", "Funcional"
    created_at: string;   // timestamptz
    updated_at: string;
}

// 2. STUDENTS
export type Student = {
    id: string;
    trainer_id: string;
    full_name: string;
    email: string | null;
    phone: string | null;
    avatar_url: string | null;
    goal: 'hipertrofia' | 'emagrecimento' | 'condicionamento' | 'flexibilidade' | 'forca' | null;
    goal_icon: string | null;
    status: 'active' | 'pending' | 'inactive';
    started_at: string | null;          // date
    plan_expires_at: string | null;     // date
    last_evaluation_at: string | null;  // date
    last_training_at: string | null;    // date
    workout_series_expires_at: string | null; // date
    created_at: string;
    updated_at: string;
}

// 3. BODY ASSESSMENTS
export type BodyAssessment = {
    id: string;
    student_id: string;
    weight_kg: number | null;
    body_fat_pct: number | null;
    muscle_mass_kg: number | null;
    measurements: Json;       // JSONB { chest, waist, hips, rightArm, ... }
    assessed_at: string;      // date
    created_at: string;
}

// 4. EXERCISES
export type Exercise = {
    id: string;
    name: string;
    muscle_group: string | null;
    category: 'Peito' | 'Costas' | 'Pernas' | 'Ombros' | 'Braços' | 'Core' | 'Cardio' | 'Full Body' | null;
    equipment: string | null;
    gif_url: string | null;
    instructions: string | null;
    external_id: string | null;   // ExerciseDB id (UNIQUE)
    is_custom: boolean;
    created_by: string | null;    // uuid FK trainers
    created_at: string;
}

// 5. WORKOUT PLANS
export type WorkoutPlan = {
    id: string;
    student_id: string;
    trainer_id: string;
    name: string;
    type: 'Superiores' | 'Inferiores' | 'Full Body' | 'Cardio' | 'Funcional' | 'Core' | null;
    status: 'active' | 'expiring' | 'expired';
    valid_from: string | null;    // date
    valid_until: string | null;   // date
    estimated_minutes: number | null;
    created_at: string;
    updated_at: string;
}

// 6. WORKOUT PLAN EXERCISES
export type WorkoutPlanExercise = {
    id: string;
    workout_plan_id: string;
    exercise_id: string;
    sort_order: number;
    series: number;
    reps: string;
    weight: string | null;       // ex: "35kg", "-"
    rest_seconds: number;
    notes: string | null;
    created_at: string;
}

// 7. APPOINTMENTS
export type Appointment = {
    id: string;
    trainer_id: string;
    student_id: string | null;
    starts_at: string;           // timestamptz
    ends_at: string | null;
    duration_minutes: number | null;
    activity: string | null;     // ex: "Treino A - Superiores"
    status: 'scheduled' | 'completed' | 'cancelled' | 'free';
    sort_order: number | null;
    notes: string | null;
    created_at: string;
    updated_at: string;
}

// 8. WORKOUT SESSIONS
export type WorkoutSession = {
    id: string;
    student_id: string;
    workout_plan_id: string | null;
    trainer_id: string | null;
    duration_seconds: number;
    calories_burned: number | null;
    source: 'personal' | 'student';
    started_at: string;          // timestamptz
    finished_at: string | null;
    created_at: string;
}

// 9. SESSION EXERCISES
export type SessionExercise = {
    id: string;
    session_id: string;
    exercise_id: string | null;
    exercise_name: string;       // denormalized for history
    series_completed: number | null;
    series_total: number | null;
    completed: boolean;
    created_at: string;
}

// 10. FINANCIAL RECORDS
export type FinancialRecord = {
    id: string;
    trainer_id: string;
    student_id: string | null;
    amount: number;
    type: 'mensalidade' | 'avulso' | 'avaliacao';
    reference_date: string;      // date
    status: 'paid' | 'pending' | 'overdue';
    description: string | null;
    created_at: string;
}

// 11. NOTIFICATIONS
export type Notification = {
    id: string;
    trainer_id: string;
    title: string;
    description: string | null;
    type: 'workout_expiring' | 'assessment_request' | 'payment_overdue' | 'general' | null;
    read: boolean;
    metadata: Json;
    created_at: string;
}

/* ------------------------------------------------------------------ */
/*  Database interface (used by createClient<Database>)                */
/* ------------------------------------------------------------------ */

export interface Database {
    public: {
        Tables: {
            trainers: {
                Row: Trainer;
                Insert: Omit<Trainer, 'id' | 'created_at' | 'updated_at'> & {
                    id?: string;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: Partial<Omit<Trainer, 'id'>>;
                Relationships: { foreignKeyName: string; columns: string[]; isOneToOne?: boolean; referencedRelation: string; referencedColumns: string[] }[];
            };
            students: {
                Row: Student;
                Insert: Omit<Student, 'id' | 'goal_icon' | 'status' | 'started_at' | 'created_at' | 'updated_at'> & {
                    id?: string;
                    goal_icon?: string;
                    status?: 'active' | 'pending' | 'inactive';
                    started_at?: string;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: Partial<Omit<Student, 'id'>>;
                Relationships: { foreignKeyName: string; columns: string[]; isOneToOne?: boolean; referencedRelation: string; referencedColumns: string[] }[];
            };
            body_assessments: {
                Row: BodyAssessment;
                Insert: Omit<BodyAssessment, 'id' | 'measurements' | 'assessed_at' | 'created_at'> & {
                    id?: string;
                    measurements?: Json;
                    assessed_at?: string;
                    created_at?: string;
                };
                Update: Partial<Omit<BodyAssessment, 'id'>>;
                Relationships: { foreignKeyName: string; columns: string[]; isOneToOne?: boolean; referencedRelation: string; referencedColumns: string[] }[];
            };
            exercises: {
                Row: Exercise;
                Insert: Omit<Exercise, 'id' | 'is_custom' | 'created_at'> & {
                    id?: string;
                    is_custom?: boolean;
                    created_at?: string;
                };
                Update: Partial<Omit<Exercise, 'id'>>;
                Relationships: { foreignKeyName: string; columns: string[]; isOneToOne?: boolean; referencedRelation: string; referencedColumns: string[] }[];
            };
            workout_plans: {
                Row: WorkoutPlan;
                Insert: Omit<WorkoutPlan, 'id' | 'status' | 'valid_from' | 'created_at' | 'updated_at'> & {
                    id?: string;
                    status?: 'active' | 'expiring' | 'expired';
                    valid_from?: string;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: Partial<Omit<WorkoutPlan, 'id'>>;
                Relationships: { foreignKeyName: string; columns: string[]; isOneToOne?: boolean; referencedRelation: string; referencedColumns: string[] }[];
            };
            workout_plan_exercises: {
                Row: WorkoutPlanExercise;
                Insert: Omit<WorkoutPlanExercise, 'id' | 'sort_order' | 'series' | 'reps' | 'rest_seconds' | 'created_at'> & {
                    id?: string;
                    sort_order?: number;
                    series?: number;
                    reps?: string;
                    rest_seconds?: number;
                    created_at?: string;
                };
                Update: Partial<Omit<WorkoutPlanExercise, 'id'>>;
                Relationships: { foreignKeyName: string; columns: string[]; isOneToOne?: boolean; referencedRelation: string; referencedColumns: string[] }[];
            };
            appointments: {
                Row: Appointment;
                Insert: Omit<Appointment, 'id' | 'status' | 'duration_minutes' | 'sort_order' | 'created_at' | 'updated_at'> & {
                    id?: string;
                    status?: 'scheduled' | 'completed' | 'cancelled' | 'free';
                    duration_minutes?: number;
                    sort_order?: number;
                    created_at?: string;
                    updated_at?: string;
                };
                Update: Partial<Omit<Appointment, 'id'>>;
                Relationships: { foreignKeyName: string; columns: string[]; isOneToOne?: boolean; referencedRelation: string; referencedColumns: string[] }[];
            };
            workout_sessions: {
                Row: WorkoutSession;
                Insert: Omit<WorkoutSession, 'id' | 'duration_seconds' | 'calories_burned' | 'source' | 'started_at' | 'created_at'> & {
                    id?: string;
                    duration_seconds?: number;
                    calories_burned?: number;
                    source?: 'personal' | 'student';
                    started_at?: string;
                    created_at?: string;
                };
                Update: Partial<Omit<WorkoutSession, 'id'>>;
                Relationships: { foreignKeyName: string; columns: string[]; isOneToOne?: boolean; referencedRelation: string; referencedColumns: string[] }[];
            };
            session_exercises: {
                Row: SessionExercise;
                Insert: Omit<SessionExercise, 'id' | 'series_completed' | 'series_total' | 'completed' | 'created_at'> & {
                    id?: string;
                    series_completed?: number;
                    series_total?: number;
                    completed?: boolean;
                    created_at?: string;
                };
                Update: Partial<Omit<SessionExercise, 'id'>>;
                Relationships: { foreignKeyName: string; columns: string[]; isOneToOne?: boolean; referencedRelation: string; referencedColumns: string[] }[];
            };
            financial_records: {
                Row: FinancialRecord;
                Insert: Omit<FinancialRecord, 'id' | 'reference_date' | 'status' | 'created_at'> & {
                    id?: string;
                    reference_date?: string;
                    status?: 'paid' | 'pending' | 'overdue';
                    created_at?: string;
                };
                Update: Partial<Omit<FinancialRecord, 'id'>>;
                Relationships: { foreignKeyName: string; columns: string[]; isOneToOne?: boolean; referencedRelation: string; referencedColumns: string[] }[];
            };
            notifications: {
                Row: Notification;
                Insert: Omit<Notification, 'id' | 'read' | 'metadata' | 'created_at'> & {
                    id?: string;
                    read?: boolean;
                    metadata?: Json;
                    created_at?: string;
                };
                Update: Partial<Omit<Notification, 'id'>>;
                Relationships: { foreignKeyName: string; columns: string[]; isOneToOne?: boolean; referencedRelation: string; referencedColumns: string[] }[];
            };
        };
        Functions: {
            get_trainer_id: {
                Args: Record<string, never>;
                Returns: string;
            };
        };
        Views: {
            [_ in never]: never;
        };
        Enums: {
            [_ in never]: never;
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
}

/* ------------------------------------------------------------------ */
/*  Convenience aliases                                               */
/* ------------------------------------------------------------------ */

export type Tables<T extends keyof Database['public']['Tables']> =
    Database['public']['Tables'][T]['Row'];

export type InsertDto<T extends keyof Database['public']['Tables']> =
    Database['public']['Tables'][T]['Insert'];

export type UpdateDto<T extends keyof Database['public']['Tables']> =
    Database['public']['Tables'][T]['Update'];

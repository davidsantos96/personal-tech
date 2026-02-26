-- ============================================================
-- Personal Tech — Row Level Security Policies
-- ============================================================
-- Run AFTER 001_create_tables.sql
-- Each trainer sees only their own data.
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE trainers           ENABLE ROW LEVEL SECURITY;
ALTER TABLE students           ENABLE ROW LEVEL SECURITY;
ALTER TABLE body_assessments   ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercises          ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_plans      ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_plan_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments       ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_sessions   ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_exercises  ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_records  ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications      ENABLE ROW LEVEL SECURITY;

-- ── Helper: get the trainer id from the JWT ──────────────────
CREATE OR REPLACE FUNCTION get_trainer_id()
RETURNS UUID AS $$
    SELECT id FROM trainers WHERE auth_id = auth.uid() LIMIT 1;
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- ══════════════════════════════════════════════════════════════
-- TRAINERS: own profile only
-- ══════════════════════════════════════════════════════════════
CREATE POLICY "trainers_select_own" ON trainers
    FOR SELECT USING (auth_id = auth.uid());

CREATE POLICY "trainers_update_own" ON trainers
    FOR UPDATE USING (auth_id = auth.uid());

-- Allow insert during signup
CREATE POLICY "trainers_insert" ON trainers
    FOR INSERT WITH CHECK (auth_id = auth.uid());

-- ══════════════════════════════════════════════════════════════
-- STUDENTS: only the owning trainer
-- ══════════════════════════════════════════════════════════════
CREATE POLICY "students_all" ON students
    FOR ALL USING (trainer_id = get_trainer_id());

-- ══════════════════════════════════════════════════════════════
-- BODY ASSESSMENTS: through student ownership
-- ══════════════════════════════════════════════════════════════
CREATE POLICY "assessments_all" ON body_assessments
    FOR ALL USING (
        student_id IN (SELECT id FROM students WHERE trainer_id = get_trainer_id())
    );

-- ══════════════════════════════════════════════════════════════
-- EXERCISES: public read, trainer-owned for custom
-- ══════════════════════════════════════════════════════════════
CREATE POLICY "exercises_select" ON exercises
    FOR SELECT USING (true);  -- all exercises visible to everyone

CREATE POLICY "exercises_insert" ON exercises
    FOR INSERT WITH CHECK (created_by = get_trainer_id() OR is_custom = false);

CREATE POLICY "exercises_update" ON exercises
    FOR UPDATE USING (created_by = get_trainer_id());

CREATE POLICY "exercises_delete" ON exercises
    FOR DELETE USING (created_by = get_trainer_id() AND is_custom = true);

-- ══════════════════════════════════════════════════════════════
-- WORKOUT PLANS: only the owning trainer
-- ══════════════════════════════════════════════════════════════
CREATE POLICY "plans_all" ON workout_plans
    FOR ALL USING (trainer_id = get_trainer_id());

-- ══════════════════════════════════════════════════════════════
-- WORKOUT PLAN EXERCISES: through plan ownership
-- ══════════════════════════════════════════════════════════════
CREATE POLICY "plan_exercises_all" ON workout_plan_exercises
    FOR ALL USING (
        workout_plan_id IN (SELECT id FROM workout_plans WHERE trainer_id = get_trainer_id())
    );

-- ══════════════════════════════════════════════════════════════
-- APPOINTMENTS: only the owning trainer
-- ══════════════════════════════════════════════════════════════
CREATE POLICY "appointments_all" ON appointments
    FOR ALL USING (trainer_id = get_trainer_id());

-- ══════════════════════════════════════════════════════════════
-- WORKOUT SESSIONS: through student ownership
-- ══════════════════════════════════════════════════════════════
CREATE POLICY "sessions_all" ON workout_sessions
    FOR ALL USING (
        student_id IN (SELECT id FROM students WHERE trainer_id = get_trainer_id())
    );

-- ══════════════════════════════════════════════════════════════
-- SESSION EXERCISES: through session ownership
-- ══════════════════════════════════════════════════════════════
CREATE POLICY "session_exercises_all" ON session_exercises
    FOR ALL USING (
        session_id IN (
            SELECT ws.id FROM workout_sessions ws
            JOIN students s ON s.id = ws.student_id
            WHERE s.trainer_id = get_trainer_id()
        )
    );

-- ══════════════════════════════════════════════════════════════
-- FINANCIAL RECORDS: only the owning trainer
-- ══════════════════════════════════════════════════════════════
CREATE POLICY "financial_all" ON financial_records
    FOR ALL USING (trainer_id = get_trainer_id());

-- ══════════════════════════════════════════════════════════════
-- NOTIFICATIONS: only the owning trainer
-- ══════════════════════════════════════════════════════════════
CREATE POLICY "notifications_all" ON notifications
    FOR ALL USING (trainer_id = get_trainer_id());

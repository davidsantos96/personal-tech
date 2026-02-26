-- ============================================================
-- Personal Tech -- Supabase Migration: Main Tables
-- ============================================================
-- Run this in the Supabase SQL Editor (or via supabase db push)
-- Order matters due to foreign key references.
-- ============================================================

-- gen_random_uuid() is built-in on Postgres 13+, no extension needed.

-- ============================================================
-- 1. TRAINERS (personal trainers / coaches)
-- ============================================================
CREATE TABLE IF NOT EXISTS trainers (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_id     UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name   TEXT NOT NULL,
    email       TEXT NOT NULL UNIQUE,
    phone       TEXT,
    avatar_url  TEXT,
    specialty   TEXT,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- 2. STUDENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS students (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trainer_id  UUID NOT NULL REFERENCES trainers(id) ON DELETE CASCADE,
    full_name   TEXT NOT NULL,
    email       TEXT,
    phone       TEXT,
    avatar_url  TEXT,
    goal        TEXT CHECK (goal IN ('hipertrofia','emagrecimento','condicionamento','flexibilidade','forca')),
    goal_icon   TEXT DEFAULT 'dumbbell',
    status      TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','pending','inactive')),
    started_at  DATE DEFAULT CURRENT_DATE,
    plan_expires_at         DATE,
    last_evaluation_at      DATE,
    last_training_at        DATE,
    workout_series_expires_at DATE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_students_trainer ON students(trainer_id);
CREATE INDEX idx_students_status  ON students(status);

-- ============================================================
-- 3. BODY ASSESSMENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS body_assessments (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id      UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    weight_kg       NUMERIC(5,2),
    body_fat_pct    NUMERIC(5,2),
    muscle_mass_kg  NUMERIC(5,2),
    measurements    JSONB DEFAULT '{}',
    assessed_at     DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_assessments_student ON body_assessments(student_id);

-- ============================================================
-- 4. EXERCISES
-- ============================================================
CREATE TABLE IF NOT EXISTS exercises (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name            TEXT NOT NULL,
    muscle_group    TEXT,
    category        TEXT CHECK (category IN ('Peito','Costas','Pernas','Ombros','Braços','Core','Cardio','Full Body')),
    equipment       TEXT,
    gif_url         TEXT,
    instructions    TEXT,
    external_id     TEXT UNIQUE,
    is_custom       BOOLEAN NOT NULL DEFAULT false,
    created_by      UUID REFERENCES trainers(id) ON DELETE SET NULL,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_exercises_category ON exercises(category);
CREATE INDEX idx_exercises_external ON exercises(external_id);

-- ============================================================
-- 5. WORKOUT PLANS
-- ============================================================
CREATE TABLE IF NOT EXISTS workout_plans (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id      UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    trainer_id      UUID NOT NULL REFERENCES trainers(id) ON DELETE CASCADE,
    name            TEXT NOT NULL,
    type            TEXT CHECK (type IN ('Superiores','Inferiores','Full Body','Cardio','Funcional','Core')),
    status          TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','expiring','expired')),
    valid_from      DATE DEFAULT CURRENT_DATE,
    valid_until     DATE,
    estimated_minutes INT,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_plans_student ON workout_plans(student_id);
CREATE INDEX idx_plans_trainer ON workout_plans(trainer_id);

-- ============================================================
-- 6. WORKOUT PLAN EXERCISES
-- ============================================================
CREATE TABLE IF NOT EXISTS workout_plan_exercises (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workout_plan_id     UUID NOT NULL REFERENCES workout_plans(id) ON DELETE CASCADE,
    exercise_id         UUID NOT NULL REFERENCES exercises(id) ON DELETE CASCADE,
    sort_order          INT NOT NULL DEFAULT 0,
    series              INT NOT NULL DEFAULT 3,
    reps                TEXT NOT NULL DEFAULT '10',
    weight              TEXT,
    rest_seconds        INT NOT NULL DEFAULT 60,
    notes               TEXT,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_plan_exercises_plan ON workout_plan_exercises(workout_plan_id);

-- ============================================================
-- 7. APPOINTMENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS appointments (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trainer_id      UUID NOT NULL REFERENCES trainers(id) ON DELETE CASCADE,
    student_id      UUID REFERENCES students(id) ON DELETE SET NULL,
    starts_at       TIMESTAMPTZ NOT NULL,
    ends_at         TIMESTAMPTZ,
    duration_minutes INT DEFAULT 60,
    activity        TEXT,
    status          TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled','completed','cancelled','free')),
    sort_order      INT DEFAULT 0,
    notes           TEXT,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_appointments_trainer ON appointments(trainer_id);
CREATE INDEX idx_appointments_date    ON appointments(starts_at);

-- ============================================================
-- 8. WORKOUT SESSIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS workout_sessions (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id          UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    workout_plan_id     UUID REFERENCES workout_plans(id) ON DELETE SET NULL,
    trainer_id          UUID REFERENCES trainers(id) ON DELETE SET NULL,
    duration_seconds    INT NOT NULL DEFAULT 0,
    calories_burned     INT DEFAULT 0,
    source              TEXT NOT NULL DEFAULT 'personal' CHECK (source IN ('personal','student')),
    started_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
    finished_at         TIMESTAMPTZ,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_sessions_student ON workout_sessions(student_id);

-- ============================================================
-- 9. SESSION EXERCISES
-- ============================================================
CREATE TABLE IF NOT EXISTS session_exercises (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id      UUID NOT NULL REFERENCES workout_sessions(id) ON DELETE CASCADE,
    exercise_id     UUID REFERENCES exercises(id) ON DELETE SET NULL,
    exercise_name   TEXT NOT NULL,
    series_completed INT DEFAULT 0,
    series_total    INT DEFAULT 0,
    completed       BOOLEAN DEFAULT false,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_session_exercises_session ON session_exercises(session_id);

-- ============================================================
-- 10. FINANCIAL RECORDS
-- ============================================================
CREATE TABLE IF NOT EXISTS financial_records (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trainer_id      UUID NOT NULL REFERENCES trainers(id) ON DELETE CASCADE,
    student_id      UUID REFERENCES students(id) ON DELETE SET NULL,
    amount          NUMERIC(10,2) NOT NULL,
    type            TEXT NOT NULL CHECK (type IN ('mensalidade','avulso','avaliacao')),
    reference_date  DATE NOT NULL DEFAULT CURRENT_DATE,
    status          TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('paid','pending','overdue')),
    description     TEXT,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_financial_trainer ON financial_records(trainer_id);

-- ============================================================
-- 11. NOTIFICATIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS notifications (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trainer_id  UUID NOT NULL REFERENCES trainers(id) ON DELETE CASCADE,
    title       TEXT NOT NULL,
    description TEXT,
    type        TEXT CHECK (type IN ('workout_expiring','assessment_request','payment_overdue','general')),
    read        BOOLEAN NOT NULL DEFAULT false,
    metadata    JSONB DEFAULT '{}',
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_notifications_trainer ON notifications(trainer_id);
CREATE INDEX idx_notifications_unread  ON notifications(trainer_id) WHERE read = false;

-- ============================================================
-- 12. UPDATED_AT TRIGGER
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_trainers_updated    BEFORE UPDATE ON trainers       FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_students_updated    BEFORE UPDATE ON students       FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_plans_updated       BEFORE UPDATE ON workout_plans  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER trg_appointments_updated BEFORE UPDATE ON appointments  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

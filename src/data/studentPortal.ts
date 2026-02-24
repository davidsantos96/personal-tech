
// ── Student Profile ──────────────────────────────────────────────
export interface StudentPortalProfile {
    id: string;
    name: string;
    avatar: string;
    goal: string;
    status: 'active' | 'inactive';
    startedAt: string; // ISO date
    nextEvaluation: string; // ISO date
    planActiveUntil: string; // ISO date
    trainer: {
        name: string;
        avatar: string;
        phone: string;
        email: string;
    };
}

export const studentProfile: StudentPortalProfile = {
    id: '1',
    name: 'João Victor Silva',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80',
    goal: 'Hipertrofia',
    status: 'active',
    startedAt: '2025-08-15',
    nextEvaluation: '2026-03-10',
    planActiveUntil: '2026-04-15',
    trainer: {
        name: 'Coach Silva',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
        phone: '(11) 99999-0000',
        email: 'coach.silva@email.com',
    },
};

// ── Body Assessments (Evolução) ──────────────────────────────────
export interface BodyAssessment {
    id: string;
    date: string; // ISO date
    weightKg: number;
    bodyFatPct: number;
    muscleMassKg: number;
    measurements?: {
        chest?: number;
        waist?: number;
        hips?: number;
        rightArm?: number;
        leftArm?: number;
        rightThigh?: number;
        leftThigh?: number;
    };
}

export const bodyAssessments: BodyAssessment[] = [
    {
        id: 'a1',
        date: '2025-08-20',
        weightKg: 92.0,
        bodyFatPct: 22.5,
        muscleMassKg: 35.2,
        measurements: { chest: 105, waist: 92, hips: 100, rightArm: 34, leftArm: 33.5, rightThigh: 58, leftThigh: 57 },
    },
    {
        id: 'a2',
        date: '2025-10-15',
        weightKg: 89.5,
        bodyFatPct: 19.8,
        muscleMassKg: 36.1,
        measurements: { chest: 104, waist: 88, hips: 99, rightArm: 35, leftArm: 34.5, rightThigh: 59, leftThigh: 58 },
    },
    {
        id: 'a3',
        date: '2025-12-10',
        weightKg: 87.2,
        bodyFatPct: 17.3,
        muscleMassKg: 37.0,
        measurements: { chest: 103, waist: 85, hips: 98, rightArm: 36, leftArm: 35.5, rightThigh: 60, leftThigh: 59.5 },
    },
    {
        id: 'a4',
        date: '2026-02-20',
        weightKg: 85.4,
        bodyFatPct: 14.2,
        muscleMassKg: 38.5,
        measurements: { chest: 102, waist: 82, hips: 97, rightArm: 37, leftArm: 36.5, rightThigh: 61, leftThigh: 60.5 },
    },
];

// ── Workout Session History ──────────────────────────────────────
export interface WorkoutSessionHistory {
    id: string;
    workoutName: string;
    workoutType: string;
    date: string; // ISO date
    durationMinutes: number;
    caloriesBurned: number;
    exercisesCompleted: number;
    exercisesTotal: number;
}

export const sessionHistory: WorkoutSessionHistory[] = [
    { id: 'sh1', workoutName: 'Treino A', workoutType: 'Superiores', date: '2026-02-24', durationMinutes: 52, caloriesBurned: 420, exercisesCompleted: 7, exercisesTotal: 7 },
    { id: 'sh2', workoutName: 'Cardio HIIT', workoutType: 'Cardio', date: '2026-02-22', durationMinutes: 30, caloriesBurned: 310, exercisesCompleted: 5, exercisesTotal: 5 },
    { id: 'sh3', workoutName: 'Treino B', workoutType: 'Inferiores', date: '2026-02-21', durationMinutes: 65, caloriesBurned: 550, exercisesCompleted: 7, exercisesTotal: 7 },
    { id: 'sh4', workoutName: 'Treino A', workoutType: 'Superiores', date: '2026-02-19', durationMinutes: 48, caloriesBurned: 390, exercisesCompleted: 7, exercisesTotal: 7 },
    { id: 'sh5', workoutName: 'Treino B', workoutType: 'Inferiores', date: '2026-02-18', durationMinutes: 60, caloriesBurned: 510, exercisesCompleted: 6, exercisesTotal: 7 },
    { id: 'sh6', workoutName: 'Treino A', workoutType: 'Superiores', date: '2026-02-17', durationMinutes: 50, caloriesBurned: 405, exercisesCompleted: 7, exercisesTotal: 7 },
    { id: 'sh7', workoutName: 'Cardio HIIT', workoutType: 'Cardio', date: '2026-02-15', durationMinutes: 28, caloriesBurned: 290, exercisesCompleted: 5, exercisesTotal: 5 },
    { id: 'sh8', workoutName: 'Treino B', workoutType: 'Inferiores', date: '2026-02-14', durationMinutes: 62, caloriesBurned: 530, exercisesCompleted: 7, exercisesTotal: 7 },
    { id: 'sh9', workoutName: 'Treino A', workoutType: 'Superiores', date: '2026-02-12', durationMinutes: 55, caloriesBurned: 440, exercisesCompleted: 7, exercisesTotal: 7 },
    { id: 'sh10', workoutName: 'Treino B', workoutType: 'Inferiores', date: '2026-02-10', durationMinutes: 58, caloriesBurned: 490, exercisesCompleted: 7, exercisesTotal: 7 },
];

// ── Training Calendar (dias treinados) ───────────────────────────
export const trainingDays: string[] = [
    '2026-02-24', '2026-02-22', '2026-02-21', '2026-02-19',
    '2026-02-18', '2026-02-17', '2026-02-15', '2026-02-14',
    '2026-02-12', '2026-02-10', '2026-02-07', '2026-02-05',
    '2026-02-03', '2026-01-31', '2026-01-29', '2026-01-27',
    '2026-01-24', '2026-01-22', '2026-01-20', '2026-01-17',
];

// ── Available Workouts (with GIF URLs for exercise demos) ────────
export interface StudentWorkoutExercise {
    id: number;
    name: string;
    series: number;
    reps: string;
    weight: string;
    rest: number;
    estimatedExecutionTime?: number;
    notes?: string;
    completed: boolean;
    gifUrl?: string; // GIF demonstration URL
}

export interface StudentWorkout {
    id: string;
    name: string;
    type: string;
    status: 'active' | 'expiring' | 'expired';
    validUntil: string; // ISO date
    estimatedMinutes: number;
    exercises: StudentWorkoutExercise[];
}

export const studentWorkouts: StudentWorkout[] = [
    {
        id: 'treino-a',
        name: 'Treino A',
        type: 'Superiores',
        status: 'active',
        validUntil: '2026-03-15',
        estimatedMinutes: 55,
        exercises: [
            { id: 1, name: 'Supino Reto', series: 4, reps: '8-10', weight: '35kg', rest: 90, completed: false, gifUrl: 'https://v2.exercisedb.io/image/pCNGXzHy2buD9E' },
            { id: 2, name: 'Supino Inclinado', series: 3, reps: '10-12', weight: '30kg', rest: 90, completed: false, gifUrl: 'https://v2.exercisedb.io/image/AYpK5RiU590Rjs' },
            { id: 3, name: 'Crucifixo com Halteres', series: 3, reps: '12-15', weight: '12kg', rest: 60, completed: false, gifUrl: 'https://v2.exercisedb.io/image/9stRrBLFdSUDuN' },
            { id: 4, name: 'Desenvolvimento com Barra', series: 4, reps: '8-10', weight: '25kg', rest: 90, completed: false, gifUrl: 'https://v2.exercisedb.io/image/GFqBsDmK1Ey5BF' },
            { id: 5, name: 'Elevação Lateral', series: 3, reps: '12-15', weight: '8kg', rest: 60, notes: 'Manter controle no movimento', completed: false, gifUrl: 'https://v2.exercisedb.io/image/duMxFMgGxXZiLz' },
            { id: 6, name: 'Tríceps Testa', series: 3, reps: '10-12', weight: '20kg', rest: 60, completed: false, gifUrl: 'https://v2.exercisedb.io/image/4S0suaG2Xsbrof' },
            { id: 7, name: 'Tríceps Corda', series: 3, reps: '12-15', weight: '25kg', rest: 60, completed: false, gifUrl: 'https://v2.exercisedb.io/image/rKUEGiGQVwLxmH' },
        ],
    },
    {
        id: 'treino-b',
        name: 'Treino B',
        type: 'Inferiores',
        status: 'active',
        validUntil: '2026-03-15',
        estimatedMinutes: 65,
        exercises: [
            { id: 1, name: 'Agachamento Livre', series: 4, reps: '8-10', weight: '60kg', rest: 120, notes: 'Focar na profundidade', completed: false, gifUrl: 'https://v2.exercisedb.io/image/G13Y9zKBt6VOpP' },
            { id: 2, name: 'Leg Press 45°', series: 4, reps: '10-12', weight: '180kg', rest: 90, completed: false, gifUrl: 'https://v2.exercisedb.io/image/jxJMGF4Mk3RJKF' },
            { id: 3, name: 'Cadeira Extensora', series: 3, reps: '12-15', weight: '45kg', rest: 60, completed: false, gifUrl: 'https://v2.exercisedb.io/image/xzH2mLnwyg5Dxt' },
            { id: 4, name: 'Cadeira Flexora', series: 3, reps: '12-15', weight: '40kg', rest: 60, completed: false, gifUrl: 'https://v2.exercisedb.io/image/ajwNuAh9hJFQDi' },
            { id: 5, name: 'Stiff', series: 3, reps: '10-12', weight: '40kg', rest: 90, completed: false, gifUrl: 'https://v2.exercisedb.io/image/kCw-RXgA1cNSPj' },
            { id: 6, name: 'Panturrilha em Pé', series: 4, reps: '15-20', weight: '80kg', rest: 45, notes: 'Amplitude completa', completed: false, gifUrl: 'https://v2.exercisedb.io/image/s1nObYC-xIrxWc' },
            { id: 7, name: 'Prancha', series: 3, reps: '45s', weight: '-', rest: 45, estimatedExecutionTime: 45, notes: 'Manter abdômen contraído', completed: false, gifUrl: 'https://v2.exercisedb.io/image/5t7mBGCxm8h5sd' },
        ],
    },
];

// ── Helper functions ─────────────────────────────────────────────

export function getStudentWorkout(id: string): StudentWorkout | undefined {
    return studentWorkouts.find(w => w.id === id);
}

export function getLatestAssessment(): BodyAssessment | undefined {
    return bodyAssessments[bodyAssessments.length - 1];
}

export function getPreviousAssessment(): BodyAssessment | undefined {
    return bodyAssessments.length >= 2
        ? bodyAssessments[bodyAssessments.length - 2]
        : undefined;
}

export function getStreak(): number {
    const sorted = [...trainingDays].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
    if (sorted.length === 0) return 0;

    let streak = 1;
    for (let i = 1; i < sorted.length; i++) {
        const curr = new Date(sorted[i - 1]);
        const prev = new Date(sorted[i]);
        const diffDays = (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);
        if (diffDays <= 2) { // allows 1 rest day between training days
            streak++;
        } else {
            break;
        }
    }
    return streak;
}

export function getMonthTrainingCount(year: number, month: number): number {
    return trainingDays.filter(d => {
        const date = new Date(d);
        return date.getFullYear() === year && date.getMonth() === month;
    }).length;
}

export function getTodayWorkout(): StudentWorkout | undefined {
    // Simple logic: alternate between treinos based on day of week
    const dayOfWeek = new Date().getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) return undefined; // rest on weekends
    return dayOfWeek % 2 === 0 ? studentWorkouts[0] : studentWorkouts[1];
}

export interface WorkoutExercise {
    id: number;
    name: string;
    series: number;
    reps: string;
    weight: string;
    rest: number;
    estimatedExecutionTime?: number;
    notes?: string;
    completed: boolean;
}

export interface WorkoutData {
    name: string;
    type: string;
    exercises: WorkoutExercise[];
}

const mockWorkouts: Record<string, WorkoutData> = {
    'treino-a': {
        name: 'Treino A',
        type: 'Superiores',
        exercises: [
            { id: 1, name: 'Supino Reto', series: 4, reps: '8-10', weight: '35kg', rest: 90, completed: false },
            { id: 2, name: 'Supino Inclinado', series: 3, reps: '10-12', weight: '30kg', rest: 90, completed: false },
            { id: 3, name: 'Crucifixo com Halteres', series: 3, reps: '12-15', weight: '12kg', rest: 60, completed: false },
            { id: 4, name: 'Desenvolvimento com Barra', series: 4, reps: '8-10', weight: '25kg', rest: 90, completed: false },
            { id: 5, name: 'Elevação Lateral', series: 3, reps: '12-15', weight: '8kg', rest: 60, notes: 'Manter controle no movimento', completed: false },
            { id: 6, name: 'Tríceps Testa', series: 3, reps: '10-12', weight: '20kg', rest: 60, completed: false },
            { id: 7, name: 'Tríceps Corda', series: 3, reps: '12-15', weight: '25kg', rest: 60, completed: false },
        ],
    },
    'treino-b': {
        name: 'Treino B',
        type: 'Inferiores',
        exercises: [
            { id: 1, name: 'Agachamento Livre', series: 4, reps: '8-10', weight: '60kg', rest: 120, notes: 'Focar na profundidade', completed: false },
            { id: 2, name: 'Leg Press 45°', series: 4, reps: '10-12', weight: '180kg', rest: 90, completed: false },
            { id: 3, name: 'Cadeira Extensora', series: 3, reps: '12-15', weight: '45kg', rest: 60, completed: false },
            { id: 4, name: 'Cadeira Flexora', series: 3, reps: '12-15', weight: '40kg', rest: 60, completed: false },
            { id: 5, name: 'Stiff', series: 3, reps: '10-12', weight: '40kg', rest: 90, completed: false },
            { id: 6, name: 'Panturrilha em Pé', series: 4, reps: '15-20', weight: '80kg', rest: 45, notes: 'Amplitude completa', completed: false },
            { id: 7, name: 'Prancha', series: 3, reps: '45s', weight: '-', rest: 45, estimatedExecutionTime: 45, notes: 'Manter abdômen contraído durante toda a série', completed: false },
        ],
    },
};

export const TIMED_EXERCISE_MAP: Record<string, number> = {
    prancha: 45,
    isometria: 30,
    'wall sit': 45,
    'hollow hold': 30,
    'ponte estática': 40,
    'superman hold': 30,
};

export function getWorkout(id: string): WorkoutData | undefined {
    return mockWorkouts[id];
}

export function getWorkouts(): Record<string, WorkoutData> {
    return mockWorkouts;
}

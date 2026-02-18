export interface Exercise {
    id: number;
    name: string;
    muscles: string;
    category: string;
}

const exercises: Exercise[] = [
    { id: 1, name: 'Supino Reto com Barra', muscles: 'Peitoral Maior, Tríceps', category: 'Peito' },
    { id: 2, name: 'Agachamento Livre', muscles: 'Quadríceps, Glúteos', category: 'Pernas' },
    { id: 3, name: 'Puxada Alta Frontal', muscles: 'Dorsais, Bíceps', category: 'Costas' },
    { id: 4, name: 'Elevação Lateral', muscles: 'Deltoide Lateral', category: 'Ombros' },
    { id: 5, name: 'Leg Press 45°', muscles: 'Quadríceps', category: 'Pernas' },
    { id: 6, name: 'Rosca Direta', muscles: 'Bíceps', category: 'Braços' },
    { id: 7, name: 'Desenvolvimento com Halteres', muscles: 'Deltoide Anterior', category: 'Ombros' },
    { id: 8, name: 'Crucifixo Inclinado', muscles: 'Peitoral Superior', category: 'Peito' },
    { id: 9, name: 'Remada Curvada', muscles: 'Dorsais, Trapézio', category: 'Costas' },
    { id: 10, name: 'Extensão de Tríceps', muscles: 'Tríceps', category: 'Braços' },
];

export const categories = ['Todos', 'Peito', 'Costas', 'Pernas', 'Ombros', 'Braços'] as const;

export function getExercises(): Exercise[] {
    return exercises;
}

export function getCategories(): string[] {
    return [...categories];
}

export function getExerciseById(id: number): Exercise | undefined {
    return exercises.find(ex => ex.id === id);
}

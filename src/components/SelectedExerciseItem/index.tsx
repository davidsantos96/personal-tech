import type { Exercise } from '../../services/exerciseService';
import {
    SelectedExerciseCard,
    RemoveButton,
    ExerciseTitle,
    ExerciseMuscles,
    ExerciseDetailsForm,
    FormRow,
    FormLabel,
    FormInput,
} from '../../views/ExerciseLibrary/styles';

const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export interface SelectedExercise extends Exercise {
    series: string;
    reps: string;
    weight: string;
    rest: string;
}

interface SelectedExerciseItemProps {
    exercise: SelectedExercise;
    onRemove: (id: number) => void;
    onUpdate: (id: number, field: keyof SelectedExercise, value: string) => void;
}

export const SelectedExerciseItem = ({ exercise, onRemove, onUpdate }: SelectedExerciseItemProps) => (
    <SelectedExerciseCard>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <div>
                <ExerciseTitle style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>
                    {exercise.name}
                </ExerciseTitle>
                <ExerciseMuscles style={{ fontSize: '0.75rem' }}>
                    {exercise.muscles}
                </ExerciseMuscles>
            </div>
            <RemoveButton onClick={() => onRemove(exercise.id)}>
                <XIcon />
            </RemoveButton>
        </div>
        <ExerciseDetailsForm>
            <FormRow>
                <div>
                    <FormLabel>Séries</FormLabel>
                    <FormInput
                        type="text"
                        value={exercise.series}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onUpdate(exercise.id, 'series', e.target.value)}
                    />
                </div>
                <div>
                    <FormLabel>Reps</FormLabel>
                    <FormInput
                        type="text"
                        value={exercise.reps}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onUpdate(exercise.id, 'reps', e.target.value)}
                    />
                </div>
                <div>
                    <FormLabel>Carga (kg)</FormLabel>
                    <FormInput
                        type="text"
                        value={exercise.weight}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onUpdate(exercise.id, 'weight', e.target.value)}
                    />
                </div>
                <div>
                    <FormLabel>Descanso (s)</FormLabel>
                    <FormInput
                        type="text"
                        value={exercise.rest}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onUpdate(exercise.id, 'rest', e.target.value)}
                    />
                </div>
            </FormRow>
        </ExerciseDetailsForm>
    </SelectedExerciseCard>
);

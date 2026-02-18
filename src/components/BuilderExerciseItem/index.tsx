import {
    ExerciseCard,
    ExerciseNumber,
    ExerciseContent,
    ExerciseName,
    MuscleGroup,
    DeleteButton,
    ExerciseStats,
    StatBox,
    StatLabel,
    StatInput,
    StatInputRest,
    StatValueWrapper,
} from '../../views/WorkoutBuilder/styles';

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

export interface BuilderExercise {
    id: number;
    name: string;
    muscleGroup: string;
    series: string;
    reps: string;
    weight: string;
    rest: string;
}

interface BuilderExerciseItemProps {
    exercise: BuilderExercise;
    index: number;
    formatRestTime: (seconds: string) => string;
    onUpdate: (id: number, field: keyof BuilderExercise, value: string) => void;
    onDelete: (id: number) => void;
}

export const BuilderExerciseItem = ({
    exercise,
    index,
    formatRestTime,
    onUpdate,
    onDelete,
}: BuilderExerciseItemProps) => (
    <ExerciseCard>
        <ExerciseNumber>{index + 1}</ExerciseNumber>
        <ExerciseContent>
            <ExerciseName>{exercise.name}</ExerciseName>
            <MuscleGroup>{exercise.muscleGroup}</MuscleGroup>
            <ExerciseStats>
                <StatBox>
                    <StatLabel>Séries</StatLabel>
                    <StatInput
                        type="text"
                        value={exercise.series}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            onUpdate(exercise.id, 'series', e.target.value)
                        }
                    />
                </StatBox>
                <StatBox>
                    <StatLabel>Reps</StatLabel>
                    <StatInput
                        type="text"
                        value={exercise.reps}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            onUpdate(exercise.id, 'reps', e.target.value)
                        }
                    />
                </StatBox>
                <StatBox>
                    <StatLabel>Carga</StatLabel>
                    <StatValueWrapper>
                        <StatInput
                            type="text"
                            value={exercise.weight}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                onUpdate(exercise.id, 'weight', e.target.value)
                            }
                        />
                        <span style={{ fontSize: '0.625rem', color: '#94a3b8' }}>kg</span>
                    </StatValueWrapper>
                </StatBox>
                <StatBox>
                    <StatLabel>Descanso</StatLabel>
                    <StatValueWrapper>
                        <StatInputRest
                            type="text"
                            value={exercise.rest}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                onUpdate(exercise.id, 'rest', e.target.value)
                            }
                            onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                                const numericValue = e.target.value.replace(/[^0-9]/g, '');
                                if (numericValue) {
                                    onUpdate(exercise.id, 'rest', numericValue);
                                }
                            }}
                        />
                        <span style={{ fontSize: '0.5rem', color: '#94a3b8', whiteSpace: 'nowrap' }}>
                            {formatRestTime(exercise.rest)}
                        </span>
                    </StatValueWrapper>
                </StatBox>
            </ExerciseStats>
        </ExerciseContent>
        <DeleteButton onClick={() => onDelete(exercise.id)} aria-label="Deletar exercício">
            <TrashIcon />
        </DeleteButton>
    </ExerciseCard>
);

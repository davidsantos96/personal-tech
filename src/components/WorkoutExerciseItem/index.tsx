import type { WorkoutExercise } from '../../services/workoutService';
import {
    ExerciseCard,
    CheckboxWrapper,
    Checkbox,
    ExerciseContent,
    ExerciseName,
    SeriesBadge,
    ExerciseDetails,
    ExerciseDetail,
    DetailLabel,
    DetailValue,
    ExecutionControl,
    ExecutionStartButton,
    ExecutionEstimate,
    ExerciseNotes,
    RestButton,
} from '../../views/WorkoutSession/styles';

const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
    </svg>
);

interface WorkoutExerciseItemProps {
    exercise: WorkoutExercise;
    seriesCompleted: number;
    estimatedExecutionTime: number | null;
    onToggle: (id: number) => void;
    onStartRest: (exercise: WorkoutExercise) => void;
    onStartExecution: (exercise: WorkoutExercise, seconds: number) => void;
    formatRestTime: (seconds: number) => string;
}

export const WorkoutExerciseItem = ({
    exercise,
    seriesCompleted,
    estimatedExecutionTime,
    onToggle,
    onStartRest,
    onStartExecution,
    formatRestTime,
}: WorkoutExerciseItemProps) => (
    <ExerciseCard $completed={exercise.completed}>
        <CheckboxWrapper>
            <Checkbox
                type="checkbox"
                checked={exercise.completed}
                onChange={() => onToggle(exercise.id)}
            />
        </CheckboxWrapper>
        <ExerciseContent>
            <ExerciseName $completed={exercise.completed}>
                {exercise.name}
                {seriesCompleted > 0 && (
                    <SeriesBadge>
                        ({seriesCompleted}/{exercise.series})
                    </SeriesBadge>
                )}
            </ExerciseName>
            <ExerciseDetails>
                <ExerciseDetail>
                    <DetailLabel>Séries</DetailLabel>
                    <DetailValue>{exercise.series}</DetailValue>
                </ExerciseDetail>
                <ExerciseDetail>
                    <DetailLabel>Reps</DetailLabel>
                    <DetailValue>{exercise.reps}</DetailValue>
                </ExerciseDetail>
                <ExerciseDetail>
                    <DetailLabel>Carga</DetailLabel>
                    <DetailValue>{exercise.weight}</DetailValue>
                </ExerciseDetail>
                <ExerciseDetail>
                    <DetailLabel>Descanso</DetailLabel>
                    <DetailValue>{formatRestTime(exercise.rest)}</DetailValue>
                </ExerciseDetail>
                {estimatedExecutionTime && (
                    <ExerciseDetail>
                        <DetailLabel>Tempo</DetailLabel>
                        <ExecutionControl>
                            <ExecutionStartButton
                                type="button"
                                onClick={() => onStartExecution(exercise, estimatedExecutionTime)}
                                aria-label={`Iniciar execução de ${exercise.name}`}
                                title={`Iniciar execução (${formatRestTime(estimatedExecutionTime)})`}
                            >
                                <ClockIcon />
                            </ExecutionStartButton>
                            <ExecutionEstimate>{formatRestTime(estimatedExecutionTime)}</ExecutionEstimate>
                        </ExecutionControl>
                    </ExerciseDetail>
                )}
            </ExerciseDetails>
            {exercise.notes && (
                <ExerciseNotes>{exercise.notes}</ExerciseNotes>
            )}
            <RestButton onClick={() => onStartRest(exercise)}>
                <ClockIcon />
                Iniciar Descanso ({formatRestTime(exercise.rest)})
            </RestButton>
        </ExerciseContent>
    </ExerciseCard>
);

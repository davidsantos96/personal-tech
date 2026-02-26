import { useState } from 'react';
import type { Exercise } from '../../services/exerciseService';
import { ExerciseDemoModal, type DemoModalData } from '../ExerciseDemoModal';
import {
    ExerciseCard,
    ExerciseThumbnail,
    PlayIcon,
    ExerciseInfo,
    ExerciseTitle,
    ExerciseMuscles,
    AddButton,
} from '../../views/Personal/ExerciseLibrary/styles';

const PlayIconSVG = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5v14l11-7z" />
    </svg>
);

const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
);

interface ExerciseItemProps {
    exercise: Exercise;
    onAdd: (exercise: Exercise) => void;
}

export const ExerciseItem = ({ exercise, onAdd }: ExerciseItemProps) => {
    const [demoData, setDemoData] = useState<DemoModalData | null>(null);

    return (
        <>
        <ExerciseCard>
            <ExerciseThumbnail
                onClick={() => exercise.gif_url && setDemoData({
                    name: exercise.name,
                    gifUrl: exercise.gif_url,
                    muscleGroup: exercise.muscle_group ?? exercise.category ?? undefined,
                })}
                style={{ cursor: exercise.gif_url ? 'pointer' : 'default' }}
            >
                {exercise.gif_url ? (
                    <img src={exercise.gif_url} alt={exercise.name} loading="lazy" />
                ) : (
                    <PlayIcon>
                        <PlayIconSVG />
                    </PlayIcon>
                )}
            </ExerciseThumbnail>
            <ExerciseInfo>
                <ExerciseTitle>{exercise.name}</ExerciseTitle>
                <ExerciseMuscles>{exercise.muscle_group}</ExerciseMuscles>
            </ExerciseInfo>
            <AddButton onClick={() => onAdd(exercise)}>
                <PlusIcon />
            </AddButton>
        </ExerciseCard>
        <ExerciseDemoModal data={demoData} onClose={() => setDemoData(null)} />
        </>
    );
};

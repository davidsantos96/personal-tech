import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StudentBottomNav } from '../../../components/Layout/StudentBottomNav';
import { studentWorkouts, type StudentWorkout } from '../../../data/studentPortal';
import {
    Container,
    Header,
    PageTitle,
    Subtitle,
    WorkoutList,
    WorkoutCard,
    WorkoutHeader,
    IconBox,
    Content,
    TitleRow,
    WorkoutName,
    StatusBadge,
    WorkoutDetails,
    ExpandIcon,
    ExpandedContent,
    ExerciseList,
    ExerciseItem,
    ExerciseNumber,
    ExerciseName,
    ExerciseStats,
    StartButton
} from './styles';

// Icons to match Personal Trainer view
const DumbbellIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M3 18h18M8 6v12M16 6v12" />
    </svg>
);

const RunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
);

const ExpandMoreIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
);

const PlayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
    </svg>
);

const statusLabels: Record<string, string> = {
    active: 'Ativo',
    expiring: 'Vencendo',
    expired: 'Vencido',
};

export const StudentWorkouts = () => {
    const navigate = useNavigate();
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const toggleExpand = (id: string) => {
        setExpandedId(prev => (prev === id ? null : id));
    };

    return (
        <Container>
            <Header>
                <PageTitle>Meus Treinos</PageTitle>
                <Subtitle>{studentWorkouts.length} planos de treino disponíveis</Subtitle>
            </Header>

            <WorkoutList>
                {studentWorkouts.map((workout: StudentWorkout) => {
                    const isExpanded = expandedId === workout.id;
                    const isExpired = workout.status === 'expired';

                    return (
                        <WorkoutCard key={workout.id} $expanded={isExpanded} onClick={() => toggleExpand(workout.id)}>
                            <WorkoutHeader>
                                <IconBox $status={workout.status}>
                                    {workout.type.toLowerCase().includes('cardio') ? <RunIcon /> : <DumbbellIcon />}
                                </IconBox>
                                <Content>
                                    <TitleRow>
                                        <WorkoutName>{workout.name}</WorkoutName>
                                        <StatusBadge $status={workout.status}>
                                            {statusLabels[workout.status]}
                                        </StatusBadge>
                                    </TitleRow>
                                    <WorkoutDetails>
                                        {workout.type} • {workout.exercises.length} exercícios • ~{workout.estimatedMinutes}min
                                    </WorkoutDetails>
                                </Content>
                                <ExpandIcon $expanded={isExpanded}>
                                    <ExpandMoreIcon />
                                </ExpandIcon>
                            </WorkoutHeader>

                            {isExpanded && (
                                <ExpandedContent onClick={(e) => e.stopPropagation()}>
                                    <ExerciseList>
                                        {workout.exercises.map((ex, i) => (
                                            <ExerciseItem key={ex.id}>
                                                <ExerciseNumber>{(i + 1).toString().padStart(2, '0')}</ExerciseNumber>
                                                <ExerciseName>{ex.name}</ExerciseName>
                                                <ExerciseStats>
                                                    {ex.series} x {ex.reps}
                                                </ExerciseStats>
                                            </ExerciseItem>
                                        ))}
                                    </ExerciseList>

                                    <StartButton
                                        onClick={() => navigate(`/aluno/treino/${workout.id}`)}
                                        disabled={isExpired}
                                    >
                                        {isExpired ? (
                                            'Plano Vencido'
                                        ) : (
                                            <>
                                                <PlayIcon />
                                                Iniciar Treino
                                            </>
                                        )}
                                    </StartButton>
                                </ExpandedContent>
                            )}
                        </WorkoutCard>
                    );
                })}
            </WorkoutList>

            <StudentBottomNav />
        </Container>
    );
};

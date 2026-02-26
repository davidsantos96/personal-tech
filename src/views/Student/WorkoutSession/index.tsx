import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getStudentWorkout, studentProfile, type StudentWorkoutExercise, type StudentWorkout } from '../../../data/studentPortal';
import { addCompletedSession } from '../../../services/workoutHistoryService';
import { ExerciseDemoModal, type DemoModalData } from '../../../components/ExerciseDemoModal';
import {
    Container,
    Header,
    IconButton,
    HeaderTitle,
    Title,
    Subtitle,
    TimerSection,
    TimerDisplay,
    TimerControls,
    StartButton,
    ExercisesSection,
    SectionHeader,
    SectionTitle,
    ProgressText,
    ExercisesList,
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
    ActionRow,
    ActionButton,
    DemoButton,
    ExerciseNotes,
    FloatingActions,
    FinishButton,
    RestTimerModal,
    ModalContent,
    ModalLabel,
    ModalExercise,
    TimerCircle,
    TimerTime,
    ModalActions,
    ModalButton,
    CelebrationModal,
    CelebrationContent,
    CelebrationTitle,
    CelebrationStats,
    CelebrationStat,
    StatValue,
    StatLabel
} from './styles';

// Icons
const ChevronLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
);

const PlayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
    </svg>
);

const PauseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z" clipRule="evenodd" />
    </svg>
);

const CheckCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
    </svg>
);

const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
    </svg>
);

const ForwardIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M5.055 7.06c-1.25-.714-2.805.189-2.805 1.628v8.123c0 1.44 1.555 2.342 2.805 1.628L12 14.471v2.34c0 1.44 1.555 2.342 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256L14.805 7.06C13.555 6.346 12 7.25 12 8.688v2.34L5.055 7.06z" />
    </svg>
);

export const StudentWorkoutSession = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [workout, setWorkout] = useState<StudentWorkout | undefined>(getStudentWorkout(id || ''));
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [showCelebration, setShowCelebration] = useState(false);

    // Series tracking
    const [seriesDone, setSeriesDone] = useState<Record<number, number>>({});
    const [demoData, setDemoData] = useState<DemoModalData | null>(null);

    // Modals
    const [restState, setRestState] = useState<{ active: boolean; time: number; exercise: StudentWorkoutExercise | null; paused: boolean }>({
        active: false,
        time: 0,
        exercise: null,
        paused: false
    });

    const [executionState, setExecutionState] = useState<{ active: boolean; time: number; exercise: StudentWorkoutExercise | null; paused: boolean }>({
        active: false,
        time: 0,
        exercise: null,
        paused: false
    });

    useEffect(() => {
        let interval: any;
        if (isRunning) {
            interval = setInterval(() => setElapsedTime(p => p + 1), 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    useEffect(() => {
        let interval: any;
        if (restState.active && !restState.paused && restState.time > 0) {
            interval = setInterval(() => {
                setRestState(p => {
                    if (p.time <= 1) return { ...p, active: false, time: 0 };
                    return { ...p, time: p.time - 1 };
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [restState.active, restState.paused, restState.time]);

    useEffect(() => {
        let interval: any;
        if (executionState.active && !executionState.paused && executionState.time > 0) {
            interval = setInterval(() => {
                setExecutionState(p => {
                    if (p.time <= 1) {
                        // completing a timed execution increments series and starts rest
                        handleSeriesComplete(p.exercise!);
                        return { ...p, active: false, time: 0 };
                    }
                    return { ...p, time: p.time - 1 };
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [executionState.active, executionState.paused, executionState.time]);

    if (!workout) return <div>Treino não encontrado</div>;

    const completedCount = workout.exercises.filter(ex => ex.completed).length;
    const totalCount = workout.exercises.length;
    const allCompleted = completedCount === totalCount;

    const formatTime = (seconds: number) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleSeriesComplete = (ex: StudentWorkoutExercise) => {
        const done = (seriesDone[ex.id] || 0) + 1;
        setSeriesDone(p => ({ ...p, [ex.id]: done }));

        // Start rest
        if (done < ex.series) {
            setRestState({ active: true, time: ex.rest, exercise: ex, paused: false });
        }
    };

    const handleToggleExercise = (exId: number) => {
        setWorkout(p => p ? {
            ...p,
            exercises: p.exercises.map(ex => ex.id === exId ? { ...ex, completed: !ex.completed } : ex)
        } : undefined);
    };

    const handleFinish = () => {
        setIsRunning(false);

        // Save completed session to shared history
        if (workout) {
            const completedExercises = workout.exercises.filter(ex => ex.completed).length;
            addCompletedSession({
                studentId: studentProfile.id,
                workoutId: id || '',
                workoutName: workout.name,
                workoutType: workout.type,
                date: new Date().toISOString().split('T')[0],
                durationSeconds: elapsedTime,
                durationMinutes: Math.round(elapsedTime / 60),
                caloriesBurned: Math.round(elapsedTime * 0.15),
                exercisesCompleted: completedExercises,
                exercisesTotal: totalCount,
                source: 'student',
            });
        }

        setShowCelebration(true);
    };

    return (
        <Container>
            <Header>
                <IconButton onClick={() => navigate(-1)}><ChevronLeftIcon /></IconButton>
                <HeaderTitle>
                    <Title>{workout.name}</Title>
                    <Subtitle>{workout.type}</Subtitle>
                </HeaderTitle>
                <div style={{ width: 40 }} />
            </Header>

            <TimerSection>
                <TimerDisplay>{formatTime(elapsedTime)}</TimerDisplay>
                <TimerControls>
                    <StartButton $isRunning={isRunning} onClick={() => setIsRunning(!isRunning)}>
                        {isRunning ? <><PauseIcon /> Pausar</> : <><PlayIcon /> {elapsedTime === 0 ? 'Iniciar Treino' : 'Continuar'}</>}
                    </StartButton>
                </TimerControls>
            </TimerSection>

            <ExercisesSection>
                <SectionHeader>
                    <SectionTitle>Exercícios</SectionTitle>
                    <ProgressText>{completedCount}/{totalCount} concluídos</ProgressText>
                </SectionHeader>

                <ExercisesList>
                    {workout.exercises.map(ex => (
                        <ExerciseCard key={ex.id} $completed={ex.completed}>
                            <CheckboxWrapper>
                                <Checkbox
                                    type="checkbox"
                                    checked={ex.completed}
                                    onChange={() => handleToggleExercise(ex.id)}
                                />
                            </CheckboxWrapper>
                            <ExerciseContent>
                                <ExerciseName $completed={ex.completed}>
                                    {ex.name}
                                    {seriesDone[ex.id] > 0 && <SeriesBadge>({seriesDone[ex.id]}/{ex.series})</SeriesBadge>}
                                </ExerciseName>
                                <ExerciseDetails>
                                    <ExerciseDetail>
                                        <DetailLabel>Séries</DetailLabel>
                                        <DetailValue>{ex.series}</DetailValue>
                                    </ExerciseDetail>
                                    <ExerciseDetail>
                                        <DetailLabel>Reps</DetailLabel>
                                        <DetailValue>{ex.reps}</DetailValue>
                                    </ExerciseDetail>
                                    <ExerciseDetail>
                                        <DetailLabel>Carga</DetailLabel>
                                        <DetailValue>{ex.weight}</DetailValue>
                                    </ExerciseDetail>
                                    <ExerciseDetail>
                                        <DetailLabel>Descanso</DetailLabel>
                                        <DetailValue>{ex.rest}s</DetailValue>
                                    </ExerciseDetail>
                                </ExerciseDetails>

                                {ex.notes && <ExerciseNotes>{ex.notes}</ExerciseNotes>}

                                <ActionRow>
                                    <ActionButton $primary onClick={() => handleSeriesComplete(ex)}>
                                        <ClockIcon /> Concluir Série (Iniciar Descanso)
                                    </ActionButton>

                                    {ex.estimatedExecutionTime && (
                                        <ActionButton onClick={() => setExecutionState({ active: true, time: ex.estimatedExecutionTime!, exercise: ex, paused: false })}>
                                            <ClockIcon /> Execução ({ex.estimatedExecutionTime}s)
                                        </ActionButton>
                                    )}

                                    {ex.gifUrl && (
                                        <DemoButton onClick={() => setDemoData({ name: ex.name, gifUrl: ex.gifUrl! })}>
                                            <PlayIcon /> Ver Demo
                                        </DemoButton>
                                    )}
                                </ActionRow>
                            </ExerciseContent>
                        </ExerciseCard>
                    ))}
                </ExercisesList>
            </ExercisesSection>

            <FloatingActions>
                <FinishButton $disabled={!allCompleted} onClick={handleFinish} disabled={!allCompleted}>
                    <CheckCircleIcon /> Finalizar Treino
                </FinishButton>
            </FloatingActions>

            {/* Rest Modal */}
            <RestTimerModal $show={restState.active}>
                <ModalContent>
                    <ModalLabel>Descanso</ModalLabel>
                    <ModalExercise>{restState.exercise?.name}</ModalExercise>
                    <TimerCircle $progress={(restState.time / (restState.exercise?.rest || 1)) * 100}>
                        <TimerTime>{restState.time}</TimerTime>
                    </TimerCircle>
                    <ModalActions>
                        <ModalButton $secondary onClick={() => setRestState(p => ({ ...p, active: false }))}>
                            <ForwardIcon /> Pular
                        </ModalButton>
                        <ModalButton onClick={() => setRestState(p => ({ ...p, paused: !p.paused }))}>
                            {restState.paused ? <><PlayIcon /> Retomar</> : <><PauseIcon /> Pausar</>}
                        </ModalButton>
                    </ModalActions>
                </ModalContent>
            </RestTimerModal>

            {/* Execution Modal */}
            <RestTimerModal $show={executionState.active}>
                <ModalContent>
                    <ModalLabel>Execução</ModalLabel>
                    <ModalExercise>{executionState.exercise?.name}</ModalExercise>
                    <TimerCircle $color="#22C55E" $progress={(executionState.time / (executionState.exercise?.estimatedExecutionTime || 1)) * 100}>
                        <TimerTime>{executionState.time}s</TimerTime>
                    </TimerCircle>
                    <ModalActions>
                        <ModalButton $secondary onClick={() => setExecutionState(p => ({ ...p, active: false }))}>
                            <ForwardIcon /> Parar
                        </ModalButton>
                        <ModalButton onClick={() => setExecutionState(p => ({ ...p, paused: !p.paused }))}>
                            {executionState.paused ? <><PlayIcon /> Retomar</> : <><PauseIcon /> Pausar</>}
                        </ModalButton>
                    </ModalActions>
                </ModalContent>
            </RestTimerModal>

            {/* Celebration Modal */}
            <CelebrationModal $show={showCelebration}>
                <CelebrationContent>
                    <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>🔥💪</div>
                    <CelebrationTitle>Treino Completo!</CelebrationTitle>
                    <CelebrationStats>
                        <CelebrationStat>
                            <StatValue>{formatTime(elapsedTime).substring(3)}</StatValue>
                            <StatLabel>Tempo</StatLabel>
                        </CelebrationStat>
                        <CelebrationStat>
                            <StatValue>{totalCount}</StatValue>
                            <StatLabel>Exercícios</StatLabel>
                        </CelebrationStat>
                        <CelebrationStat>
                            <StatValue>~{Math.round(elapsedTime * 0.15)}</StatValue>
                            <StatLabel>Kcal</StatLabel>
                        </CelebrationStat>
                    </CelebrationStats>
                    <ModalButton onClick={() => navigate('/aluno')}>Concluir</ModalButton>
                </CelebrationContent>
            </CelebrationModal>

            <ExerciseDemoModal data={demoData} onClose={() => setDemoData(null)} />
        </Container>
    );
};

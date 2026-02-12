import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
    ExerciseNotes,
    FloatingActions,
    FinishButton,
    CelebrationModal,
    CelebrationContent,
    CelebrationIcon,
    CelebrationTitle,
    CelebrationMessage,
    CelebrationStats,
    CelebrationStat,
    CelebrationStatValue,
    CelebrationStatLabel,
    CelebrationButton,
    RestButton,
    RestTimerModal,
    RestTimerContent,
    RestTimerLabel,
    RestTimerCircle,
    RestTimerTime,
    RestTimerExercise,
    RestTimerActions,
    RestTimerButton
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

interface Exercise {
    id: number;
    name: string;
    series: number;
    reps: string;
    weight: string;
    rest: number;
    notes?: string;
    completed: boolean;
}

interface WorkoutData {
    name: string;
    type: string;
    exercises: Exercise[];
}

// Mock data - em produção viria de um contexto/API
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
        ]
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
        ]
    }
};

export const WorkoutSession = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const workoutId = location.state?.workoutId || 'treino-a';
    
    const [workout, setWorkout] = useState<WorkoutData>(mockWorkouts[workoutId]);
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [showCelebration, setShowCelebration] = useState(false);
    
    // Rest timer states
    const [isResting, setIsResting] = useState(false);
    const [restTimeLeft, setRestTimeLeft] = useState(0);
    const [restExercise, setRestExercise] = useState<Exercise | null>(null);
    const [restPaused, setRestPaused] = useState(false);
    
    // Series completed counter for each exercise
    const [seriesCompleted, setSeriesCompleted] = useState<Record<number, number>>({});

    const completedCount = workout.exercises.filter(ex => ex.completed).length;
    const totalCount = workout.exercises.length;
    const allCompleted = completedCount === totalCount;

    // Timer effect
    useEffect(() => {
        let interval: number;
        if (isRunning) {
            interval = setInterval(() => {
                setElapsedTime((prev) => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning]);
    
    // Rest timer effect
    useEffect(() => {
        let interval: number;
        if (isResting && !restPaused && restTimeLeft > 0) {
            interval = setInterval(() => {
                setRestTimeLeft((prev) => {
                    if (prev <= 1) {
                        setIsResting(false);
                        setRestExercise(null);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isResting, restPaused, restTimeLeft]);

    const formatTime = (seconds: number): string => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleToggleTimer = () => {
        setIsRunning(!isRunning);
    };

    const handleToggleExercise = (exerciseId: number) => {
        setWorkout(prev => ({
            ...prev,
            exercises: prev.exercises.map(ex =>
                ex.id === exerciseId ? { ...ex, completed: !ex.completed } : ex
            )
        }));
    };

    const handleFinishWorkout = () => {
        setIsRunning(false);
        setShowCelebration(true);
    };

    const handleCloseCelebration = () => {
        setShowCelebration(false);
        navigate(-1);
    };

    const formatRestTime = (seconds: number): string => {
        if (seconds < 60) return `${seconds}s`;
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return secs > 0 ? `${mins}min ${secs}s` : `${mins}min`;
    };
    
    const handleStartRest = (exercise: Exercise) => {
        // Increment series counter when starting rest
        setSeriesCompleted(prevCompleted => ({
            ...prevCompleted,
            [exercise.id]: (prevCompleted[exercise.id] || 0) + 1
        }));
        setRestExercise(exercise);
        setRestTimeLeft(exercise.rest);
        setIsResting(true);
        setRestPaused(false);
    };
    
    const handleSkipRest = () => {
        setIsResting(false);
        setRestTimeLeft(0);
        setRestExercise(null);
        setRestPaused(false);
    };
    
    const handleToggleRestPause = () => {
        setRestPaused(!restPaused);
    };
    
    const getRestProgress = (): number => {
        if (!restExercise) return 0;
        return ((restExercise.rest - restTimeLeft) / restExercise.rest) * 100;
    };

    return (
        <Container>
            <Header>
                <IconButton onClick={() => navigate(-1)} aria-label="Voltar">
                    <ChevronLeftIcon />
                </IconButton>
                <HeaderTitle>
                    <Title>{workout.name}</Title>
                    <Subtitle>{workout.type}</Subtitle>
                </HeaderTitle>
                <div style={{ width: '40px' }} /> {/* Spacer for centering */}
            </Header>

            <TimerSection>
                <TimerDisplay>{formatTime(elapsedTime)}</TimerDisplay>
                <TimerControls>
                    <StartButton $isRunning={isRunning} onClick={handleToggleTimer}>
                        {isRunning ? (
                            <>
                                <PauseIcon />
                                Pausar
                            </>
                        ) : (
                            <>
                                <PlayIcon />
                                {elapsedTime === 0 ? 'Iniciar Treino' : 'Continuar'}
                            </>
                        )}
                    </StartButton>
                </TimerControls>
            </TimerSection>

            <ExercisesSection>
                <SectionHeader>
                    <SectionTitle>Exercícios</SectionTitle>
                    <ProgressText>{completedCount}/{totalCount} concluídos</ProgressText>
                </SectionHeader>

                <ExercisesList>
                    {workout.exercises.map((exercise) => (
                        <ExerciseCard key={exercise.id} $completed={exercise.completed}>
                            <CheckboxWrapper>
                                <Checkbox
                                    type="checkbox"
                                    checked={exercise.completed}
                                    onChange={() => handleToggleExercise(exercise.id)}
                                />
                            </CheckboxWrapper>
                            <ExerciseContent>
                                <ExerciseName $completed={exercise.completed}>
                                    {exercise.name}
                                    {seriesCompleted[exercise.id] > 0 && (
                                        <SeriesBadge>
                                            ({seriesCompleted[exercise.id]}/{exercise.series})
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
                                </ExerciseDetails>
                                {exercise.notes && (
                                    <ExerciseNotes>{exercise.notes}</ExerciseNotes>
                                )}
                                <RestButton onClick={() => handleStartRest(exercise)}>
                                    <ClockIcon />
                                    Iniciar Descanso ({formatRestTime(exercise.rest)})
                                </RestButton>
                            </ExerciseContent>
                        </ExerciseCard>
                    ))}
                </ExercisesList>
            </ExercisesSection>

            <FloatingActions>
                <FinishButton 
                    $disabled={!allCompleted} 
                    onClick={handleFinishWorkout}
                    disabled={!allCompleted}
                >
                    <CheckCircleIcon />
                    Finalizar Treino
                </FinishButton>
            </FloatingActions>

            <RestTimerModal $show={isResting}>
                <RestTimerContent>
                    <RestTimerLabel>Descanso</RestTimerLabel>
                    {restExercise && (
                        <RestTimerExercise>{restExercise.name}</RestTimerExercise>
                    )}
                    <RestTimerCircle $progress={getRestProgress()}>
                        <RestTimerTime>{restTimeLeft}</RestTimerTime>
                    </RestTimerCircle>
                    <RestTimerActions>
                        <RestTimerButton $secondary onClick={handleSkipRest}>
                            <ForwardIcon />
                            Pular
                        </RestTimerButton>
                        <RestTimerButton onClick={handleToggleRestPause}>
                            {restPaused ? (
                                <>
                                    <PlayIcon />
                                    Continuar
                                </>
                            ) : (
                                <>
                                    <PauseIcon />
                                    Pausar
                                </>
                            )}
                        </RestTimerButton>
                    </RestTimerActions>
                </RestTimerContent>
            </RestTimerModal>

            <CelebrationModal $show={showCelebration}>
                <CelebrationContent>
                    <CelebrationIcon>🔥💪</CelebrationIcon>
                    <CelebrationTitle>Treino Completo!</CelebrationTitle>
                    <CelebrationMessage>
                        Parabéns! Você arrasou no treino de hoje!
                    </CelebrationMessage>
                    <CelebrationStats>
                        <CelebrationStat>
                            <CelebrationStatValue>{formatTime(elapsedTime).substring(3)}</CelebrationStatValue>
                            <CelebrationStatLabel>Tempo</CelebrationStatLabel>
                        </CelebrationStat>
                        <CelebrationStat>
                            <CelebrationStatValue>{totalCount}</CelebrationStatValue>
                            <CelebrationStatLabel>Exercícios</CelebrationStatLabel>
                        </CelebrationStat>
                        <CelebrationStat>
                            <CelebrationStatValue>~{Math.round(elapsedTime * 8.5)}</CelebrationStatValue>
                            <CelebrationStatLabel>Kcal</CelebrationStatLabel>
                        </CelebrationStat>
                    </CelebrationStats>
                    <CelebrationMessage>
                        Continue assim e alcance seus objetivos! 💯
                    </CelebrationMessage>
                    <CelebrationButton onClick={handleCloseCelebration}>
                        Concluir
                    </CelebrationButton>
                </CelebrationContent>
            </CelebrationModal>
        </Container>
    );
};

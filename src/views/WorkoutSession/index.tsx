import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getWorkout, TIMED_EXERCISE_MAP, type WorkoutData, type WorkoutExercise as Exercise } from '../../services/workoutService';
import { WorkoutExerciseItem } from '../../components/WorkoutExerciseItem';
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
    RestTimerModal,
    RestTimerContent,
    RestTimerLabel,
    RestTimerCircle,
    RestTimerTime,
    RestTimerExercise,
    RestTimerActions,
    RestTimerButton,
    ExecutionTimerModal,
    ExecutionTimerContent,
    ExecutionTimerLabel,
    ExecutionTimerCircle,
    ExecutionTimerTime,
    ExecutionTimerExercise,
    ExecutionTimerActions,
    ExecutionTimerButton
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

const ForwardIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M5.055 7.06c-1.25-.714-2.805.189-2.805 1.628v8.123c0 1.44 1.555 2.342 2.805 1.628L12 14.471v2.34c0 1.44 1.555 2.342 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256L14.805 7.06C13.555 6.346 12 7.25 12 8.688v2.34L5.055 7.06z" />
    </svg>
);



export const WorkoutSession = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const workoutId = location.state?.workoutId || 'treino-a';
    
    const [workout, setWorkout] = useState<WorkoutData>(getWorkout(workoutId)!);
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [showCelebration, setShowCelebration] = useState(false);
    
    // Rest timer states
    const [isResting, setIsResting] = useState(false);
    const [restTimeLeft, setRestTimeLeft] = useState(0);
    const [restExercise, setRestExercise] = useState<Exercise | null>(null);
    const [restPaused, setRestPaused] = useState(false);

    // Execution timer states (for timed exercises like plank)
    const [isExecutionTiming, setIsExecutionTiming] = useState(false);
    const [executionTimeLeft, setExecutionTimeLeft] = useState(0);
    const [executionExercise, setExecutionExercise] = useState<Exercise | null>(null);
    const [executionPaused, setExecutionPaused] = useState(false);
    
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

    // Execution timer effect
    useEffect(() => {
        let interval: number;
        if (isExecutionTiming && !executionPaused && executionTimeLeft > 0) {
            interval = setInterval(() => {
                setExecutionTimeLeft((prev) => {
                    if (prev <= 1) {
                        setIsExecutionTiming(false);
                        setExecutionExercise(null);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isExecutionTiming, executionPaused, executionTimeLeft]);

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

    const formatCountdown = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const getEstimatedExecutionTime = (exercise: Exercise): number | null => {
        if (exercise.estimatedExecutionTime && exercise.estimatedExecutionTime > 0) {
            return exercise.estimatedExecutionTime;
        }

        const normalizedName = exercise.name.toLowerCase();
        const mapped = Object.entries(TIMED_EXERCISE_MAP).find(([key]) => normalizedName.includes(key));
        if (mapped) {
            return mapped[1];
        }

        const repsInSeconds = exercise.reps.match(/(\d+)\s*s/i);
        if (repsInSeconds) {
            return Number(repsInSeconds[1]);
        }

        return null;
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

    const handleStartExecution = (exercise: Exercise, estimatedSeconds: number) => {
        setExecutionExercise(exercise);
        setExecutionTimeLeft(estimatedSeconds);
        setIsExecutionTiming(true);
        setExecutionPaused(false);
    };

    const handleSkipExecution = () => {
        setIsExecutionTiming(false);
        setExecutionTimeLeft(0);
        setExecutionExercise(null);
        setExecutionPaused(false);
    };

    const handleToggleExecutionPause = () => {
        setExecutionPaused(!executionPaused);
    };

    const getExecutionProgress = (): number => {
        if (!executionExercise) return 0;
        const estimated = getEstimatedExecutionTime(executionExercise);
        if (!estimated || estimated <= 0) return 0;
        return ((estimated - executionTimeLeft) / estimated) * 100;
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
                    {workout.exercises.map((exercise) => {
                        const estimatedExecutionTime = getEstimatedExecutionTime(exercise);
                        return (
                            <WorkoutExerciseItem
                                key={exercise.id}
                                exercise={exercise}
                                seriesCompleted={seriesCompleted[exercise.id] || 0}
                                estimatedExecutionTime={estimatedExecutionTime}
                                onToggle={handleToggleExercise}
                                onStartRest={handleStartRest}
                                onStartExecution={handleStartExecution}
                                formatRestTime={formatRestTime}
                            />
                        );
                    })}
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

            <ExecutionTimerModal $show={isExecutionTiming}>
                <ExecutionTimerContent>
                    <ExecutionTimerLabel>Execução</ExecutionTimerLabel>
                    {executionExercise && (
                        <ExecutionTimerExercise>{executionExercise.name}</ExecutionTimerExercise>
                    )}
                    <ExecutionTimerCircle $progress={getExecutionProgress()}>
                        <ExecutionTimerTime>{formatCountdown(executionTimeLeft)}</ExecutionTimerTime>
                    </ExecutionTimerCircle>
                    <ExecutionTimerActions>
                        <ExecutionTimerButton $secondary onClick={handleSkipExecution}>
                            <ForwardIcon />
                            Encerrar
                        </ExecutionTimerButton>
                        <ExecutionTimerButton onClick={handleToggleExecutionPause}>
                            {executionPaused ? (
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
                        </ExecutionTimerButton>
                    </ExecutionTimerActions>
                </ExecutionTimerContent>
            </ExecutionTimerModal>

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

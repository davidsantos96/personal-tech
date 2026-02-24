import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getStudentWorkout } from '../../../data/studentPortal';

export const StudentWorkoutSession = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const workout = getStudentWorkout(id || '');

    const [exerciseIndex, setExerciseIndex] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isRunning, setIsRunning] = useState(true);
    const [showDemo, setShowDemo] = useState(false);

    // Timer and series state
    const [seriesDone, setSeriesDone] = useState<Record<number, number>>({});
    const [isResting, setIsResting] = useState(false);
    const [restTime, setRestTime] = useState(0);
    const [isExecutionTiming, setIsExecutionTiming] = useState(false);
    const [executionTime, setExecutionTime] = useState(0);

    const currentExercise = workout?.exercises[exerciseIndex];

    useEffect(() => {
        let interval: any;
        if (isRunning && !isResting && !isExecutionTiming) {
            interval = setInterval(() => {
                setElapsedTime(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning, isResting, isExecutionTiming]);

    useEffect(() => {
        let interval: any;
        if (isResting && restTime > 0) {
            interval = setInterval(() => {
                setRestTime(prev => prev - 1);
            }, 1000);
        } else if (restTime === 0 && isResting) {
            setIsResting(false);
        }
        return () => clearInterval(interval);
    }, [isResting, restTime]);

    useEffect(() => {
        let interval: any;
        if (isExecutionTiming && executionTime > 0) {
            interval = setInterval(() => {
                setExecutionTime(prev => prev - 1);
            }, 1000);
        } else if (executionTime === 0 && isExecutionTiming) {
            setIsExecutionTiming(false);
            handleCompleteSeries(); // completing a timed exercise series starts rest or increments series
        }
        return () => clearInterval(interval);
    }, [isExecutionTiming, executionTime]);

    if (!workout || !currentExercise) {
        return <div>Treino não encontrado</div>;
    }

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleNextExercise = () => {
        if (exerciseIndex < workout.exercises.length - 1) {
            setExerciseIndex(prev => prev + 1);
            setIsResting(false);
            setIsExecutionTiming(false);
        } else {
            // Finish workout
            setIsRunning(false);
            alert('Treino concluído com sucesso! 🔥');
            navigate('/aluno');
        }
    };

    const handleCompleteSeries = () => {
        const currentSeries = seriesDone[currentExercise!.id] || 0;
        if (currentSeries < currentExercise!.series) {
            setSeriesDone({
                ...seriesDone,
                [currentExercise!.id]: currentSeries + 1
            });

            // Start rest timer
            setRestTime(currentExercise!.rest);
            setIsResting(true);
        }
    };

    const handleStartExecution = () => {
        if (currentExercise?.estimatedExecutionTime) {
            setExecutionTime(currentExercise.estimatedExecutionTime);
            setIsExecutionTiming(true);
        }
    };

    return (
        <div style={{ padding: '20px', color: 'white', backgroundColor: '#0a0a0a', minHeight: '100vh' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <div style={{ textAlign: 'center' }}>
                    <h2 style={{ margin: 0 }}>{workout.name}</h2>
                    <span style={{ fontSize: '0.8rem', color: '#FF6D00' }}>Tempo: {formatTime(elapsedTime)}</span>
                </div>
                <div style={{ width: '24px' }}></div>
            </div>

            <div style={{ marginTop: '30px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>EXERCÍCIO {exerciseIndex + 1} DE {workout.exercises.length}</div>
                <h1 style={{ margin: '10px 0' }}>{currentExercise.name}</h1>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', margin: '20px 0' }}>
                    <div>
                        <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>SÉRIES</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{seriesDone[currentExercise.id] || 0}/{currentExercise.series}</div>
                    </div>
                    <div>
                        <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>REPS</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{currentExercise.reps}</div>
                    </div>
                    <div>
                        <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>CARGA</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{currentExercise.weight}</div>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
                    <button
                        onClick={() => setShowDemo(!showDemo)}
                        style={{ background: '#1a1a1a', border: '1px solid #333', color: 'white', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}
                    >
                        {showDemo ? 'Ocultar Demo' : 'Ver Demo'}
                    </button>

                    {currentExercise.estimatedExecutionTime && !isExecutionTiming && !isResting && (
                        <button
                            onClick={handleStartExecution}
                            style={{ background: '#22C55E', border: 'none', color: 'white', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}
                        >
                            Iniciar Execução ({currentExercise.estimatedExecutionTime}s)
                        </button>
                    )}
                </div>

                {showDemo && currentExercise.gifUrl && (
                    <div style={{ marginBottom: '20px', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#fff' }}>
                        <img src={currentExercise.gifUrl} alt={currentExercise.name} style={{ width: '100%', maxWidth: '300px', display: 'block', margin: '0 auto' }} />
                    </div>
                )}

                {isResting ? (
                    <div style={{ backgroundColor: '#1a1a1a', padding: '30px', borderRadius: '50%', width: '150px', height: '150px', margin: '0 auto 30px', display: 'flex', flexDirection: 'column', justifyContent: 'center', border: '4px solid #FF6D00' }}>
                        <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>DESCANSO</div>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{restTime}s</div>
                        <button onClick={() => setIsResting(false)} style={{ background: 'none', border: 'none', color: '#FF6D00', fontSize: '0.8rem', marginTop: '10px', cursor: 'pointer' }}>PULAR</button>
                    </div>
                ) : isExecutionTiming ? (
                    <div style={{ backgroundColor: '#1a1a1a', padding: '30px', borderRadius: '50%', width: '150px', height: '150px', margin: '0 auto 30px', display: 'flex', flexDirection: 'column', justifyContent: 'center', border: '4px solid #22C55E' }}>
                        <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>EXECUÇÃO</div>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{executionTime}s</div>
                        <button onClick={() => setIsExecutionTiming(false)} style={{ background: 'none', border: 'none', color: '#EF4444', fontSize: '0.8rem', marginTop: '10px', cursor: 'pointer' }}>PARAR</button>
                    </div>
                ) : (
                    <button
                        onClick={handleCompleteSeries}
                        style={{ backgroundColor: '#FF6D00', color: 'white', border: 'none', padding: '15px 40px', borderRadius: '30px', fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '30px', width: '100%', cursor: 'pointer' }}
                    >
                        Concluir Série
                    </button>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                    <button
                        onClick={() => setExerciseIndex(prev => Math.max(0, prev - 1))}
                        disabled={exerciseIndex === 0}
                        style={{ background: 'none', border: '1px solid #333', color: exerciseIndex === 0 ? '#333' : 'white', padding: '10px 20px', borderRadius: '8px' }}
                    >
                        Anterior
                    </button>
                    <button
                        onClick={handleNextExercise}
                        style={{ background: 'white', color: 'black', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold' }}
                    >
                        {exerciseIndex === workout.exercises.length - 1 ? 'Finalizar' : 'Próximo'}
                    </button>
                </div>
            </div>
        </div>
    );
};

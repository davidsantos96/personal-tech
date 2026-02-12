import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Header,
    IconButton,
    PageTitle,
    CancelButton,
    FormSection,
    Label,
    Input,
    Select,
    ExercisesSection,
    SectionHeader,
    ExerciseCount,
    ExercisesList,
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
    AddExerciseButton,
    SaveButton
} from '../WorkoutBuilder/styles';

// Icons
const ChevronLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
);

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
);

interface Exercise {
    id: number;
    name: string;
    muscleGroup: string;
    series: string;
    reps: string;
    weight: string;
    rest: string;
}

export const WorkoutBuilder = () => {
    const navigate = useNavigate();
    const [workoutName, setWorkoutName] = useState('');
    const [selectedStudent, setSelectedStudent] = useState('');
    const [exercises, setExercises] = useState<Exercise[]>([
        {
            id: 1,
            name: 'Supino Reto',
            muscleGroup: 'Peitoral',
            series: '4',
            reps: '8-10',
            weight: '30',
            rest: '90'
        },
        {
            id: 2,
            name: 'Crucifixo Inclinado',
            muscleGroup: 'Peitoral',
            series: '3',
            reps: '12',
            weight: '14',
            rest: '60'
        },
        {
            id: 3,
            name: 'Tríceps Corda',
            muscleGroup: 'Tríceps',
            series: '4',
            reps: '15',
            weight: '25',
            rest: '45'
        }
    ]);

    // Formata o tempo de descanso (segundos para minutos se > 60)
    const formatRestTime = (seconds: string): string => {
        const sec = parseInt(seconds);
        if (isNaN(sec)) return '0s';
        
        if (sec >= 60) {
            const minutes = Math.floor(sec / 60);
            const remainingSeconds = sec % 60;
            if (remainingSeconds === 0) {
                return `${minutes}min`;
            }
            return `${minutes}min ${remainingSeconds}s`;
        }
        return `${sec}s`;
    };

    // Atualiza um campo específico de um exercício
    const handleUpdateExercise = (id: number, field: keyof Exercise, value: string) => {
        setExercises(exercises.map(ex => 
            ex.id === id ? { ...ex, [field]: value } : ex
        ));
    };

    const handleDeleteExercise = (id: number) => {
        setExercises(exercises.filter(ex => ex.id !== id));
    };

    const handleAddExercise = () => {
        // Navega para a biblioteca de exercícios
        navigate('/biblioteca-exercicios');
    };

    const handleSave = () => {
        // Placeholder for save logic
        console.log('Saving workout:', { workoutName, selectedStudent, exercises });
        navigate(-1);
    };

    return (
        <Container>
            <Header>
                <IconButton onClick={() => navigate(-1)} aria-label="Voltar">
                    <ChevronLeftIcon />
                </IconButton>
                <PageTitle>Montagem de Treino</PageTitle>
                <CancelButton onClick={() => navigate(-1)}>Cancelar</CancelButton>
            </Header>

            <FormSection>
                <Label>Nome do Treino</Label>
                <Input 
                    type="text" 
                    placeholder="Treino A - Hipertrofia"
                    value={workoutName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWorkoutName(e.target.value)}
                />

                <Label>Aluno</Label>
                <Select 
                    value={selectedStudent}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedStudent(e.target.value)}
                >
                    <option value="">Carlos Silva</option>
                    <option value="maria">Maria Santos</option>
                    <option value="joao">João Pedro</option>
                </Select>
            </FormSection>

            <ExercisesSection>
                <SectionHeader>
                    Exercícios
                    <ExerciseCount>{exercises.length} exercícios</ExerciseCount>
                </SectionHeader>

                <ExercisesList>
                    {exercises.map((exercise, index) => (
                        <ExerciseCard key={exercise.id}>
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
                                                handleUpdateExercise(exercise.id, 'series', e.target.value)
                                            }
                                        />
                                    </StatBox>
                                    <StatBox>
                                        <StatLabel>Reps</StatLabel>
                                        <StatInput
                                            type="text"
                                            value={exercise.reps}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                                                handleUpdateExercise(exercise.id, 'reps', e.target.value)
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
                                                    handleUpdateExercise(exercise.id, 'weight', e.target.value)
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
                                                    handleUpdateExercise(exercise.id, 'rest', e.target.value)
                                                }
                                                onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                                                    // Ao sair do campo, mantém apenas o valor numérico
                                                    const numericValue = e.target.value.replace(/[^0-9]/g, '');
                                                    if (numericValue) {
                                                        handleUpdateExercise(exercise.id, 'rest', numericValue);
                                                    }
                                                }}
                                            />
                                            <span style={{ fontSize: '0.5rem', color: '#94a3b8', whiteSpace: 'nowrap' }}>{formatRestTime(exercise.rest)}</span>
                                        </StatValueWrapper>
                                    </StatBox>
                                </ExerciseStats>
                            </ExerciseContent>
                            <DeleteButton onClick={() => handleDeleteExercise(exercise.id)} aria-label="Deletar exercício">
                                <TrashIcon />
                            </DeleteButton>
                        </ExerciseCard>
                    ))}
                </ExercisesList>

                <AddExerciseButton onClick={handleAddExercise}>
                    <PlusIcon />
                    Adicionar Exercício
                </AddExerciseButton>
            </ExercisesSection>

            <SaveButton onClick={handleSave}>
                Salvar Treino
            </SaveButton>
        </Container>
    );
};

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
    StatValue,
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

    const handleDeleteExercise = (id: number) => {
        setExercises(exercises.filter(ex => ex.id !== id));
    };

    const handleAddExercise = () => {
        // Placeholder for adding new exercise
        const newExercise: Exercise = {
            id: exercises.length + 1,
            name: 'Novo Exercício',
            muscleGroup: '',
            series: '0',
            reps: '0',
            weight: '0',
            rest: '0'
        };
        setExercises([...exercises, newExercise]);
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
                                        <StatValue>{exercise.series}</StatValue>
                                    </StatBox>
                                    <StatBox>
                                        <StatLabel>Reps</StatLabel>
                                        <StatValue>{exercise.reps}</StatValue>
                                    </StatBox>
                                    <StatBox>
                                        <StatLabel>Carga</StatLabel>
                                        <StatValue>{exercise.weight} <span>kg</span></StatValue>
                                    </StatBox>
                                    <StatBox>
                                        <StatLabel>Descanso</StatLabel>
                                        <StatValue>{exercise.rest} <span>s</span></StatValue>
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

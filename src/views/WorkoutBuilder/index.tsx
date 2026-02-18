import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BuilderExerciseItem, type BuilderExercise } from '../../components/BuilderExerciseItem';
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
    AddExerciseButton,
    SaveButton
} from '../WorkoutBuilder/styles';

// Icons
const ChevronLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
);

const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
);

export const WorkoutBuilder = () => {
    const navigate = useNavigate();
    const [workoutName, setWorkoutName] = useState('');
    const [selectedStudent, setSelectedStudent] = useState('');
    const [exercises, setExercises] = useState<BuilderExercise[]>([
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
    const handleUpdateExercise = (id: number, field: keyof BuilderExercise, value: string) => {
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
                        <BuilderExerciseItem
                            key={exercise.id}
                            exercise={exercise}
                            index={index}
                            formatRestTime={formatRestTime}
                            onUpdate={handleUpdateExercise}
                            onDelete={handleDeleteExercise}
                        />
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

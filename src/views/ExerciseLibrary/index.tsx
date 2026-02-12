import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Header,
    BackButton,
    HeaderTitle,
    SearchContainer,
    SearchIcon,
    SearchInput,
    CategoriesContainer,
    CategoryButton,
    ExerciseList,
    ExerciseCard,
    ExerciseThumbnail,
    PlayIcon,
    ExerciseInfo,
    ExerciseTitle,
    ExerciseMuscles,
    AddButton,
    SelectedExercisesSection,
    SelectedExerciseCard,
    RemoveButton,
    ExerciseDetailsForm,
    FormRow,
    FormLabel,
    FormInput,
    ConfirmButton
} from './styles';

const ChevronLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
);

const SearchIconSVG = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

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

const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

interface Exercise {
    id: number;
    name: string;
    muscles: string;
    category: string;
}

interface SelectedExercise extends Exercise {
    series: string;
    reps: string;
    weight: string;
    rest: string;
}

const exercises: Exercise[] = [
    { id: 1, name: 'Supino Reto com Barra', muscles: 'Peitoral Maior, Tríceps', category: 'Peito' },
    { id: 2, name: 'Agachamento Livre', muscles: 'Quadríceps, Glúteos', category: 'Pernas' },
    { id: 3, name: 'Puxada Alta Frontal', muscles: 'Dorsais, Bíceps', category: 'Costas' },
    { id: 4, name: 'Elevação Lateral', muscles: 'Deltoide Lateral', category: 'Ombros' },
    { id: 5, name: 'Leg Press 45°', muscles: 'Quadríceps', category: 'Pernas' },
    { id: 6, name: 'Rosca Direta', muscles: 'Bíceps', category: 'Braços' },
    { id: 7, name: 'Desenvolvimento com Halteres', muscles: 'Deltoide Anterior', category: 'Ombros' },
    { id: 8, name: 'Crucifixo Inclinado', muscles: 'Peitoral Superior', category: 'Peito' },
    { id: 9, name: 'Remada Curvada', muscles: 'Dorsais, Trapézio', category: 'Costas' },
    { id: 10, name: 'Extensão de Tríceps', muscles: 'Tríceps', category: 'Braços' }
];

const categories = ['Todos', 'Peito', 'Costas', 'Pernas', 'Ombros', 'Braços'];

export const ExerciseLibrary = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [selectedExercises, setSelectedExercises] = useState<SelectedExercise[]>([]);

    const filteredExercises = exercises.filter(exercise => {
        const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            exercise.muscles.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'Todos' || exercise.category === selectedCategory;
        const notSelected = !selectedExercises.find(sel => sel.id === exercise.id);
        return matchesSearch && matchesCategory && notSelected;
    });

    const handleAddExercise = (exercise: Exercise) => {
        setSelectedExercises([...selectedExercises, {
            ...exercise,
            series: '3',
            reps: '10',
            weight: '0',
            rest: '60'
        }]);
    };

    const handleRemoveExercise = (id: number) => {
        setSelectedExercises(selectedExercises.filter(ex => ex.id !== id));
    };

    const handleUpdateExercise = (id: number, field: keyof SelectedExercise, value: string) => {
        setSelectedExercises(selectedExercises.map(ex =>
            ex.id === id ? { ...ex, [field]: value } : ex
        ));
    };

    const handleConfirm = () => {
        // Aqui você pode passar os exercícios selecionados via state ou context
        console.log('Exercícios adicionados:', selectedExercises);
        navigate(-1);
    };

    return (
        <Container>
            <Header>
                <BackButton onClick={() => navigate(-1)}>
                    <ChevronLeftIcon />
                </BackButton>
                <HeaderTitle>Biblioteca de Exercícios</HeaderTitle>
            </Header>

            <SearchContainer>
                <SearchIcon>
                    <SearchIconSVG />
                </SearchIcon>
                <SearchInput
                    type="text"
                    placeholder="Buscar exercício..."
                    value={searchTerm}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                />
            </SearchContainer>

            <CategoriesContainer>
                {categories.map(category => (
                    <CategoryButton
                        key={category}
                        $active={selectedCategory === category}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </CategoryButton>
                ))}
            </CategoriesContainer>

            <ExerciseList>
                {filteredExercises.map(exercise => (
                    <ExerciseCard key={exercise.id}>
                        <ExerciseThumbnail>
                            <PlayIcon>
                                <PlayIconSVG />
                            </PlayIcon>
                        </ExerciseThumbnail>
                        <ExerciseInfo>
                            <ExerciseTitle>{exercise.name}</ExerciseTitle>
                            <ExerciseMuscles>{exercise.muscles}</ExerciseMuscles>
                        </ExerciseInfo>
                        <AddButton onClick={() => handleAddExercise(exercise)}>
                            <PlusIcon />
                        </AddButton>
                    </ExerciseCard>
                ))}
            </ExerciseList>

            {selectedExercises.length > 0 && (
                <SelectedExercisesSection>
                    <h3>Exercícios Selecionados ({selectedExercises.length})</h3>
                    {selectedExercises.map(exercise => (
                        <SelectedExerciseCard key={exercise.id}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                                <div>
                                    <ExerciseTitle style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>
                                        {exercise.name}
                                    </ExerciseTitle>
                                    <ExerciseMuscles style={{ fontSize: '0.75rem' }}>
                                        {exercise.muscles}
                                    </ExerciseMuscles>
                                </div>
                                <RemoveButton onClick={() => handleRemoveExercise(exercise.id)}>
                                    <XIcon />
                                </RemoveButton>
                            </div>
                            <ExerciseDetailsForm>
                                <FormRow>
                                    <div>
                                        <FormLabel>Séries</FormLabel>
                                        <FormInput
                                            type="text"
                                            value={exercise.series}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdateExercise(exercise.id, 'series', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <FormLabel>Reps</FormLabel>
                                        <FormInput
                                            type="text"
                                            value={exercise.reps}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdateExercise(exercise.id, 'reps', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <FormLabel>Carga (kg)</FormLabel>
                                        <FormInput
                                            type="text"
                                            value={exercise.weight}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdateExercise(exercise.id, 'weight', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <FormLabel>Descanso (s)</FormLabel>
                                        <FormInput
                                            type="text"
                                            value={exercise.rest}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUpdateExercise(exercise.id, 'rest', e.target.value)}
                                        />
                                    </div>
                                </FormRow>
                            </ExerciseDetailsForm>
                        </SelectedExerciseCard>
                    ))}
                    <ConfirmButton onClick={handleConfirm}>
                        Adicionar {selectedExercises.length} Exercício{selectedExercises.length > 1 ? 's' : ''} ao Treino
                    </ConfirmButton>
                </SelectedExercisesSection>
            )}
        </Container>
    );
};

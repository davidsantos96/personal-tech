import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getExercises, getCategories, type Exercise } from '../../services/exerciseService';
import { ExerciseItem } from '../../components/ExerciseItem';
import { SelectedExerciseItem, type SelectedExercise } from '../../components/SelectedExerciseItem';
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
    SelectedExercisesSection,
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

const exercises = getExercises();
const categories = getCategories();

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
                    <ExerciseItem key={exercise.id} exercise={exercise} onAdd={handleAddExercise} />
                ))}
            </ExerciseList>

            {selectedExercises.length > 0 && (
                <SelectedExercisesSection>
                    <h3>Exercícios Selecionados ({selectedExercises.length})</h3>
                    {selectedExercises.map(exercise => (
                        <SelectedExerciseItem
                            key={exercise.id}
                            exercise={exercise}
                            onRemove={handleRemoveExercise}
                            onUpdate={handleUpdateExercise}
                        />
                    ))}
                    <ConfirmButton onClick={handleConfirm}>
                        Adicionar {selectedExercises.length} Exercício{selectedExercises.length > 1 ? 's' : ''} ao Treino
                    </ConfirmButton>
                </SelectedExercisesSection>
            )}
        </Container>
    );
};

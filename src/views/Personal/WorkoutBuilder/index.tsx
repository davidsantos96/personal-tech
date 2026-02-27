import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BuilderExerciseItem, type BuilderExercise } from '../../../components/BuilderExerciseItem';
import { studentsData } from '../../../data/students';
import { fetchStudents, type Student } from '../../../services/studentService';
// Add Student Workout from service removed as its dynamically imported
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
    SaveButton,
    ValidationError,
    SuccessToast,
    Spinner,
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

// State shape passed/received via location.state
interface WorkoutBuilderState {
    studentId?: string;
    workoutName?: string;
    workoutType?: string;
    selectedStudent?: string;
    exercises?: BuilderExercise[];
    addedExercises?: BuilderExercise[];
}

export const WorkoutBuilder = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const navState = (location.state as WorkoutBuilderState | null) ?? {};

    // Merge returning exercises (from ExerciseLibrary) with previously existing ones
    const initialExercises: BuilderExercise[] = [
        ...(navState.exercises ?? []),
        ...(navState.addedExercises ?? []),
    ];

    const [workoutName, setWorkoutName] = useState(navState.workoutName ?? '');
    const [workoutType, setWorkoutType] = useState(navState.workoutType ?? 'Superiores');
    const [selectedStudent, setSelectedStudent] = useState(navState.selectedStudent ?? navState.studentId ?? '');
    const [exercises, setExercises] = useState<BuilderExercise[]>(initialExercises);

    // Students: start with mock, refresh from DB
    const [students, setStudents] = useState<Student[]>(studentsData);

    useEffect(() => {
        let mounted = true;
        fetchStudents().then(data => {
            if (mounted && data.length > 0) setStudents(data);
        });
        return () => { mounted = false; };
    }, []);

    // Validation & save state
    const [errors, setErrors] = useState<{ name?: string; student?: string; exercises?: string }>({});
    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const isFormValid = workoutName.trim() !== '' && selectedStudent !== '' && exercises.length > 0;

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
    const handleUpdateExercise = (id: string, field: keyof BuilderExercise, value: string) => {
        setExercises(exercises.map(ex =>
            ex.id === id ? { ...ex, [field]: value } : ex
        ));
    };

    const handleDeleteExercise = (id: string) => {
        setExercises(exercises.filter(ex => ex.id !== id));
    };

    const handleAddExercise = () => {
        // Navigate to exercise library, preserving current form state so we can restore it on return
        navigate('/biblioteca-exercicios', {
            state: {
                returnTo: 'montar-treino',
                workoutName,
                workoutType,
                selectedStudent,
                exercises,
            },
        });
    };

    const validate = (): boolean => {
        const newErrors: typeof errors = {};
        if (!workoutName.trim()) newErrors.name = 'Informe o nome do treino';
        if (!selectedStudent) newErrors.student = 'Selecione um aluno';
        if (exercises.length === 0) newErrors.exercises = 'Adicione ao menos um exercício';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    /**
     * handleSave — async-ready for future Supabase integration.
     * Replace the body with `await supabase.from('workouts').insert(...)` later.
     */
    const handleSave = async () => {
        if (!validate()) return;

        setIsSaving(true);
        try {
            // Estimate workout duration: ~3 min per exercise
            const estimatedMinutes = exercises.length * 3 + 10;

            // Compute valid until (30 days from today)
            const validDate = new Date();
            validDate.setDate(validDate.getDate() + 30);
            const validUntil = validDate.toISOString().split('T')[0];

            const { addStudentWorkoutApi } = await import('../../../services/studentWorkoutService');

            const result = await addStudentWorkoutApi({
                studentId: selectedStudent,
                name: workoutName,
                type: workoutType,
                status: 'active',
                validUntil,
                estimatedMinutes,
                exercises: exercises.map((ex, idx) => ({
                    id: idx + 1,
                    exercise_id: ex.id.startsWith('custom-') ? undefined : ex.id,
                    name: ex.name,
                    muscleGroup: ex.muscleGroup,
                    series: parseInt(ex.series) || 0,
                    reps: ex.reps,
                    weight: ex.weight ? `${ex.weight}kg` : '-',
                    rest: parseInt(ex.rest) || 60,
                    completed: false,
                    gifUrl: ex.gifUrl,
                })),
            });

            if (!result) throw new Error('Failed to save workout to DB');

            // Show success feedback before navigating
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                navigate(`/perfil-aluno/${selectedStudent}`);
            }, 1200);
        } catch (err) {
            console.error('Erro ao salvar treino:', err);
            setErrors({ name: 'Erro ao salvar. Tente novamente.' });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Container>
            <SuccessToast $visible={showSuccess}>✅ Treino salvo com sucesso!</SuccessToast>

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
                    placeholder="Ex: Treino A - Hipertrofia"
                    value={workoutName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setWorkoutName(e.target.value);
                        if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
                    }}
                />
                {errors.name && <ValidationError>{errors.name}</ValidationError>}

                <Label>Tipo do Treino</Label>
                <Select
                    value={workoutType}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setWorkoutType(e.target.value)}
                >
                    <option value="Superiores">Superiores</option>
                    <option value="Inferiores">Inferiores</option>
                    <option value="Full Body">Full Body</option>
                    <option value="Cardio">Cardio</option>
                    <option value="Funcional">Funcional</option>
                    <option value="Core">Core</option>
                </Select>

                <Label>Aluno</Label>
                <Select
                    value={selectedStudent}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        setSelectedStudent(e.target.value);
                        if (errors.student) setErrors(prev => ({ ...prev, student: undefined }));
                    }}
                >
                    <option value="">Selecione um aluno</option>
                    {students.map(s => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                </Select>
                {errors.student && <ValidationError>{errors.student}</ValidationError>}
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
                {errors.exercises && <ValidationError>{errors.exercises}</ValidationError>}
            </ExercisesSection>

            <SaveButton onClick={handleSave} disabled={isSaving || !isFormValid}>
                {isSaving ? <><Spinner /> Salvando...</> : 'Salvar Treino'}
            </SaveButton>
        </Container>
    );
};


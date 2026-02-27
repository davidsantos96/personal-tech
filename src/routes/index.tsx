import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy-load all views for code-splitting
const Home = lazy(() => import('../views/Personal/Home').then(m => ({ default: m.Home })));
const Students = lazy(() => import('../views/Personal/Students').then(m => ({ default: m.Students })));
const Agenda = lazy(() => import('../views/Personal/Agenda').then(m => ({ default: m.Agenda })));
const StudentProfile = lazy(() => import('../views/Personal/StudentProfile').then(m => ({ default: m.StudentProfile })));
const WorkoutBuilder = lazy(() => import('../views/Personal/WorkoutBuilder').then(m => ({ default: m.WorkoutBuilder })));
const ExerciseLibrary = lazy(() => import('../views/Personal/ExerciseLibrary').then(m => ({ default: m.ExerciseLibrary })));
const WorkoutSession = lazy(() => import('../views/Personal/WorkoutSession').then(m => ({ default: m.WorkoutSession })));
const NewStudent = lazy(() => import('../views/Personal/NewStudent').then(m => ({ default: m.NewStudent })));
const ScheduleSession = lazy(() => import('../views/Personal/ScheduleSession').then(m => ({ default: m.ScheduleSession })));
const Anamnese = lazy(() => import('../views/Personal/NewAvaliation/Anamnese').then(m => ({ default: m.Anamnese })));
const AvaliacaoFisica = lazy(() => import('../views/Personal/NewAvaliation/AvaliacaoFisica').then(m => ({ default: m.AvaliacaoFisica })));
const TrainerProfile = lazy(() => import('../views/Personal/TrainerProfile').then(m => ({ default: m.TrainerProfile })));

// Student Views
const StudentHome = lazy(() => import('../views/Student/Home').then(m => ({ default: m.StudentHome })));
const StudentWorkouts = lazy(() => import('../views/Student/Workouts').then(m => ({ default: m.StudentWorkouts })));
const StudentWorkoutSession = lazy(() => import('../views/Student/WorkoutSession').then(m => ({ default: m.StudentWorkoutSession })));
const StudentProgress = lazy(() => import('../views/Student/Progress').then(m => ({ default: m.StudentProgress })));
const StudentHistory = lazy(() => import('../views/Student/History').then(m => ({ default: m.StudentHistory })));
const StudentProfileView = lazy(() => import('../views/Student/Profile').then(m => ({ default: m.StudentProfileView })));

export const AppRoutes = () => (
    <Suspense fallback={null}>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/alunos" element={<Students />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/perfil-aluno/:id" element={<StudentProfile />} />
            <Route path="/montar-treino" element={<WorkoutBuilder />} />
            <Route path="/biblioteca-exercicios" element={<ExerciseLibrary />} />
            <Route path="/treino-sessao" element={<WorkoutSession />} />
            <Route path="/novo-aluno" element={<NewStudent />} />
            <Route path="/novo-agendamento" element={<ScheduleSession />} />
            <Route path="/anamnese" element={<Anamnese />} />
            <Route path="/avaliacao-fisica" element={<AvaliacaoFisica />} />
            <Route path="/perfil" element={<TrainerProfile />} />

            {/* Student Routes */}
            <Route path="/aluno" element={<StudentHome />} />
            <Route path="/aluno/treinos" element={<StudentWorkouts />} />
            <Route path="/aluno/treino/:id" element={<StudentWorkoutSession />} />
            <Route path="/aluno/progresso" element={<StudentProgress />} />
            <Route path="/aluno/historico" element={<StudentHistory />} />
            <Route path="/aluno/perfil" element={<StudentProfileView />} />
        </Routes>
    </Suspense>
);

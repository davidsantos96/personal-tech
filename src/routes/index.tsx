import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Auth View
const Login = lazy(() => import('../views/Auth/Login').then(m => ({ default: m.Login })));

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

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, isLoading, isMockMode } = useAuth();

    if (isLoading) return <div>Carregando...</div>;

    if (!user && !isMockMode) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export const AppRoutes = () => (
    <Suspense fallback={<div>Carregando...</div>}>
        <Routes>
            <Route path="/login" element={<Login />} />

            {/* Protected Personal Trainer Routes */}
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/alunos" element={<PrivateRoute><Students /></PrivateRoute>} />
            <Route path="/agenda" element={<PrivateRoute><Agenda /></PrivateRoute>} />
            <Route path="/perfil-aluno/:id" element={<PrivateRoute><StudentProfile /></PrivateRoute>} />
            <Route path="/montar-treino" element={<PrivateRoute><WorkoutBuilder /></PrivateRoute>} />
            <Route path="/biblioteca-exercicios" element={<PrivateRoute><ExerciseLibrary /></PrivateRoute>} />
            <Route path="/treino-sessao" element={<PrivateRoute><WorkoutSession /></PrivateRoute>} />
            <Route path="/novo-aluno" element={<PrivateRoute><NewStudent /></PrivateRoute>} />
            <Route path="/novo-agendamento" element={<PrivateRoute><ScheduleSession /></PrivateRoute>} />
            <Route path="/anamnese" element={<PrivateRoute><Anamnese /></PrivateRoute>} />
            <Route path="/avaliacao-fisica" element={<PrivateRoute><AvaliacaoFisica /></PrivateRoute>} />
            <Route path="/perfil" element={<PrivateRoute><TrainerProfile /></PrivateRoute>} />

            {/* Student Routes (Assuming they could be accessed differently later, simplified for now) */}
            <Route path="/aluno" element={<StudentHome />} />
            <Route path="/aluno/treinos" element={<StudentWorkouts />} />
            <Route path="/aluno/treino/:id" element={<StudentWorkoutSession />} />
            <Route path="/aluno/progresso" element={<StudentProgress />} />
            <Route path="/aluno/historico" element={<StudentHistory />} />
            <Route path="/aluno/perfil" element={<StudentProfileView />} />
        </Routes>
    </Suspense>
);

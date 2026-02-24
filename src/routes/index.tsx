import { Routes, Route } from 'react-router-dom';
import { Home } from '../views/Personal/Home';
import { Students } from '../views/Personal/Students';
import { Agenda } from '../views/Personal/Agenda';
import { StudentProfile } from '../views/Personal/StudentProfile';
import { WorkoutBuilder } from '../views/Personal/WorkoutBuilder';
import { ExerciseLibrary } from '../views/Personal/ExerciseLibrary';
import { WorkoutSession } from '../views/Personal/WorkoutSession';
import { NewStudent } from '../views/Personal/NewStudent';
import { ScheduleSession } from '../views/Personal/ScheduleSession';
import { Anamnese } from '../views/Personal/NewAvaliation/Anamnese';
import { AvaliacaoFisica } from '../views/Personal/NewAvaliation/AvaliacaoFisica';
import { TrainerProfile } from '../views/Personal/TrainerProfile';

// Import Student Views
import { StudentHome } from '../views/Student/Home';
import { StudentWorkouts } from '../views/Student/Workouts';
import { StudentWorkoutSession } from '../views/Student/WorkoutSession';
import { StudentProgress } from '../views/Student/Progress';
import { StudentHistory } from '../views/Student/History';
import { StudentProfileView } from '../views/Student/Profile';

export const AppRoutes = () => (
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
);

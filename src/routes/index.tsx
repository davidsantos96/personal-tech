import { Routes, Route } from 'react-router-dom';
import { Home } from '../views/Home';
import { Students } from '../views/Students';
import { Agenda } from '../views/Agenda';
import { StudentProfile } from '../views/StudentProfile';
import { WorkoutBuilder } from '../views/WorkoutBuilder';
import { ExerciseLibrary } from '../views/ExerciseLibrary';
import { WorkoutSession } from '../views/WorkoutSession';
import { NewStudent } from '../views/NewStudent';
import { ScheduleSession } from '../views/ScheduleSession';
import { Anamnese } from '../views/NewAvaliation/Anamnese';
import { AvaliacaoFisica } from '../views/NewAvaliation/AvaliacaoFisica';

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
    </Routes>
);

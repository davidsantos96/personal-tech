import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/global';
import { ScheduleProvider } from './contexts/ScheduleContext';
import { Home } from './views/Home';
import { Students } from './views/Students';
import { Agenda } from './views/Agenda';
import { StudentProfile } from './views/StudentProfile';
import { WorkoutBuilder } from './views/WorkoutBuilder';
import { ExerciseLibrary } from './views/ExerciseLibrary';
import { WorkoutSession } from './views/WorkoutSession';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <ScheduleProvider>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/alunos" element={<Students />} />
              <Route path="/agenda" element={<Agenda />} />
              <Route path="/perfil-aluno/:id" element={<StudentProfile />} />
              <Route path="/montar-treino" element={<WorkoutBuilder />} />
              <Route path="/biblioteca-exercicios" element={<ExerciseLibrary />} />
              <Route path="/treino-sessao" element={<WorkoutSession />} />
            </Routes>
          </div>
        </ScheduleProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App

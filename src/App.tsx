import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/global';
import { Home } from './views/Home';
import { Students } from './views/Students';
import { Agenda } from './views/Agenda';
import { StudentProfile } from './views/StudentProfile';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/alunos" element={<Students />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/perfil-aluno" element={<StudentProfile />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App

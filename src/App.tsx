import { BrowserRouter, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/global';
import { ScheduleProvider } from './contexts/ScheduleContext';
import { SpeedDialProvider, useSpeedDial } from './contexts/SpeedDialContext';
import { AppRoutes } from './routes';
import { SpeedDial } from './components/SpeedDial';

const MAIN_TABS = ['/', '/alunos', '/agenda', '/perfil'];

const AppShell = () => {
  const { pathname } = useLocation();
  const { visible } = useSpeedDial();
  const showSpeedDial = MAIN_TABS.includes(pathname) && visible;
  return (
    <div className="App">
      <AppRoutes />
      {showSpeedDial && <SpeedDial />}
    </div>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <ScheduleProvider>
          <SpeedDialProvider>
            <AppShell />
          </SpeedDialProvider>
        </ScheduleProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App

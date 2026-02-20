import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/global';
import { ScheduleProvider } from './contexts/ScheduleContext';
import { AppRoutes } from './routes';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <ScheduleProvider>
          <div className="App">
            <AppRoutes />
          </div>
        </ScheduleProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App

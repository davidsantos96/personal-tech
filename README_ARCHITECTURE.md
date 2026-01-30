# Personal Tech - Dashboard Architecture

This project structure is designed to support the Personal Trainer Dashboard application.

## Directory Structure

### `src/views/Home`
Contains the main `Home` component which serves as the dashboard page. It aggregates all dashboard sub-components.

- `index.tsx`: The main view component.
- `styles.css`: View-specific styles (layout, background).

### `src/components/Dashboard`
Contains all dashboard-specific widgets and sections.

- **`Header`**: Displays the user profile, welcome message, and notifications.
- **`StatsCards`**: Shows summary statistics (Active Students, Today's Workouts).
- **`StudentsList`**: "Próximos Alunos" section - a horizontal list or carousel of upcoming student sessions.
- **`AlertSection`**: "Atenção Necessária" section - displays critical alerts or tasks for the trainer.
- **`RevenueWidget`**: "Faturamento Semanal" - displays financial metrics and charts.

### `src/components/Layout`
Contains global layout components.

- **`BottomNav`**: The fixed bottom navigation bar for mobile-style navigation (Home, Students, Add, Calendar, Profile).

## Next Steps

1.  **Implement Component Logic**: Add JSX and Props to each component.
2.  **Style Components**: Apply CSS (Vanilla) to match the dark theme and vibrant colors from the design.
3.  **Data Integration**: Connect components to a data source or state management.

import { sessionHistory, getStreak } from '../../../data/studentPortal';
import { StudentBottomNav } from '../../../components/Layout/StudentBottomNav';

export const StudentHistory = () => {
    const streak = getStreak();

    return (
        <div style={{ padding: '20px', color: 'white', backgroundColor: '#0a0a0a', minHeight: '100vh', paddingBottom: '100px' }}>
            <h1 style={{ marginBottom: '20px' }}>Meu Histórico</h1>

            <div style={{ backgroundColor: '#1a1a1a', padding: '20px', borderRadius: '12px', textAlign: 'center', marginBottom: '30px' }}>
                <div style={{ fontSize: '2rem' }}>🔥</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{streak} Dias de Foco!</div>
                <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Sua melhor sequência atual</div>
            </div>

            <h2 style={{ fontSize: '1.1rem', marginBottom: '15px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>Treinos Recentes</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {sessionHistory.map((session) => (
                    <div key={session.id} style={{ backgroundColor: '#141414', padding: '15px', borderRadius: '12px', borderLeft: '4px solid #FF6D00' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <div>
                                <div style={{ fontWeight: 'bold' }}>{session.workoutName}</div>
                                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{session.workoutType}</div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '0.9rem' }}>{new Date(session.date).toLocaleDateString('pt-BR')}</div>
                                <div style={{ fontSize: '0.8rem', color: '#22C55E' }}>{session.durationMinutes} min</div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '15px', fontSize: '0.8rem', color: '#94a3b8', borderTop: '1px solid #222', paddingTop: '10px' }}>
                            <span>🔥 {session.caloriesBurned} kcal</span>
                            <span>✅ {session.exercisesCompleted}/{session.exercisesTotal} ex.</span>
                        </div>
                    </div>
                ))}
            </div>

            <StudentBottomNav />
        </div>
    );
};

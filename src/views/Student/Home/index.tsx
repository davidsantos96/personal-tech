import { useNavigate } from 'react-router-dom';
import { StudentBottomNav } from '../../../components/Layout/StudentBottomNav';
import {
    studentProfile,
    getTodayWorkout,
    getStreak,
    getMonthTrainingCount,
    trainingDays,
} from '../../../data/studentPortal';

export const StudentHome = () => {
    const navigate = useNavigate();
    const todayWorkout = getTodayWorkout();
    const streak = getStreak();
    const now = new Date();
    const monthTrainings = getMonthTrainingCount(now.getFullYear(), now.getMonth());

    // Build last 7 days for mini calendar
    const last7Days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        return d;
    });

    const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    const formatDate = (d: Date) => d.toISOString().split('T')[0];

    const getGreeting = () => {
        const hour = now.getHours();
        if (hour < 12) return 'Bom dia';
        if (hour < 18) return 'Boa tarde';
        return 'Boa noite';
    };

    const daysUntilEval = Math.ceil(
        (new Date(studentProfile.nextEvaluation).getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    return (
        <div style={{ minHeight: '100vh', maxWidth: '28rem', margin: '0 auto', paddingBottom: '5rem' }}>
            {/* Header */}
            <div style={{ padding: '1.5rem 1rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img
                        src={studentProfile.avatar}
                        alt={studentProfile.name}
                        style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                        <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{getGreeting()}</div>
                        <div style={{ fontSize: '1.15rem', fontWeight: 700 }}>
                            {studentProfile.name.split(' ')[0]} 💪
                        </div>
                    </div>
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    background: '#1a1a1a',
                    padding: '0.4rem 0.75rem',
                    borderRadius: '999px',
                    fontSize: '0.85rem',
                }}>
                    🔥 <span style={{ fontWeight: 700, color: '#FF6D00' }}>{streak}</span> dias
                </div>
            </div>

            {/* Today's Workout Card */}
            {todayWorkout ? (
                <div style={{
                    margin: '0 1rem',
                    padding: '1.25rem',
                    background: 'linear-gradient(135deg, #FF6D00 0%, #FF8F3F 100%)',
                    borderRadius: '1rem',
                    color: '#fff',
                }}>
                    <div style={{ fontSize: '0.75rem', opacity: 0.85, marginBottom: '0.25rem' }}>TREINO DE HOJE</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>{todayWorkout.name}</div>
                    <div style={{ fontSize: '0.85rem', opacity: 0.9, marginBottom: '1rem' }}>
                        {todayWorkout.type} • {todayWorkout.exercises.length} exercícios • ~{todayWorkout.estimatedMinutes}min
                    </div>
                    <button
                        onClick={() => navigate(`/aluno/treino/${todayWorkout.id}`)}
                        style={{
                            background: '#fff',
                            color: '#FF6D00',
                            border: 'none',
                            borderRadius: '0.5rem',
                            padding: '0.65rem 1.5rem',
                            fontWeight: 700,
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                            fontFamily: "'Syne', sans-serif",
                        }}
                    >
                        ▶ Iniciar Treino
                    </button>
                </div>
            ) : (
                <div style={{
                    margin: '0 1rem',
                    padding: '1.25rem',
                    background: '#1a1a1a',
                    borderRadius: '1rem',
                    textAlign: 'center',
                    color: '#94a3b8',
                }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>😴</div>
                    <div style={{ fontWeight: 600 }}>Dia de descanso</div>
                    <div style={{ fontSize: '0.85rem' }}>Aproveite para se recuperar!</div>
                </div>
            )}

            {/* Quick Stats */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: '0.75rem',
                margin: '1.25rem 1rem',
            }}>
                <div style={{ background: '#1a1a1a', borderRadius: '0.75rem', padding: '1rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#FF6D00' }}>{monthTrainings}</div>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '0.25rem' }}>Treinos este mês</div>
                </div>
                <div style={{ background: '#1a1a1a', borderRadius: '0.75rem', padding: '1rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#22C55E' }}>{streak}</div>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '0.25rem' }}>Dias seguidos</div>
                </div>
                <div style={{ background: '#1a1a1a', borderRadius: '0.75rem', padding: '1rem', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#3B82F6' }}>{daysUntilEval}</div>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '0.25rem' }}>Dias p/ avaliação</div>
                </div>
            </div>

            {/* Weekly Mini Calendar */}
            <div style={{ margin: '0 1rem 1.25rem' }}>
                <div style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Última semana
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem' }}>
                    {last7Days.map(day => {
                        const iso = formatDate(day);
                        const trained = trainingDays.includes(iso);
                        const isToday = iso === formatDate(new Date());
                        return (
                            <div key={iso} style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '0.35rem',
                            }}>
                                <div style={{ fontSize: '0.65rem', color: '#64748b' }}>
                                    {dayNames[day.getDay()]}
                                </div>
                                <div style={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.8rem',
                                    fontWeight: 600,
                                    background: trained ? '#22C55E' : '#1a1a1a',
                                    color: trained ? '#fff' : '#64748b',
                                    border: isToday ? '2px solid #FF6D00' : '2px solid transparent',
                                }}>
                                    {trained ? '✓' : day.getDate()}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Goal Card */}
            <div style={{
                margin: '0 1rem',
                padding: '1rem',
                background: '#1a1a1a',
                borderRadius: '0.75rem',
                borderLeft: '3px solid #FF6D00',
            }}>
                <div style={{ fontSize: '0.7rem', color: '#FF6D00', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    🎯 PRÓXIMA META
                </div>
                <div style={{ fontSize: '0.85rem', color: '#e2e8f0', lineHeight: 1.5 }}>
                    Aumentar carga no supino reto para 40kg cada lado até o fim da semana. Focar na cadência de descida.
                </div>
            </div>

            <StudentBottomNav />
        </div>
    );
};

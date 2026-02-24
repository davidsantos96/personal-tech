import { useNavigate } from 'react-router-dom';
import { StudentBottomNav } from '../../../components/Layout/StudentBottomNav';
import { studentWorkouts, type StudentWorkout } from '../../../data/studentPortal';
import { useState } from 'react';

const statusColors: Record<string, string> = {
    active: '#22C55E',
    expiring: '#EAB308',
    expired: '#EF4444',
};

const statusLabels: Record<string, string> = {
    active: 'Ativo',
    expiring: 'Vencendo',
    expired: 'Vencido',
};

export const StudentWorkouts = () => {
    const navigate = useNavigate();
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const toggleExpand = (id: string) => {
        setExpandedId(prev => (prev === id ? null : id));
    };

    return (
        <div style={{ minHeight: '100vh', maxWidth: '28rem', margin: '0 auto', paddingBottom: '5rem' }}>
            {/* Header */}
            <div style={{ padding: '1.5rem 1rem 1rem' }}>
                <h1 style={{ fontSize: '1.35rem', fontWeight: 700, margin: 0 }}>Meus Treinos</h1>
                <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: '0.25rem 0 0' }}>
                    {studentWorkouts.length} treinos disponíveis
                </p>
            </div>

            {/* Workout Cards */}
            <div style={{ padding: '0 1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {studentWorkouts.map((workout: StudentWorkout) => (
                    <div
                        key={workout.id}
                        style={{
                            background: '#1a1a1a',
                            borderRadius: '0.75rem',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Card Header */}
                        <div
                            onClick={() => toggleExpand(workout.id)}
                            style={{
                                padding: '1rem',
                                cursor: 'pointer',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                            }}
                        >
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                                    <span style={{ fontSize: '1.1rem', fontWeight: 700 }}>{workout.name}</span>
                                    <span style={{
                                        fontSize: '0.6rem',
                                        fontWeight: 700,
                                        padding: '0.15rem 0.5rem',
                                        borderRadius: '999px',
                                        background: `${statusColors[workout.status]}20`,
                                        color: statusColors[workout.status],
                                    }}>
                                        {statusLabels[workout.status]}
                                    </span>
                                </div>
                                <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                                    {workout.type} • {workout.exercises.length} exercícios • ~{workout.estimatedMinutes}min
                                </div>
                            </div>
                            <span className="material-symbols-outlined" style={{
                                color: '#64748b',
                                fontSize: '1.25rem',
                                transform: expandedId === workout.id ? 'rotate(180deg)' : 'rotate(0)',
                                transition: 'transform 0.2s',
                            }}>
                                expand_more
                            </span>
                        </div>

                        {/* Expanded Exercise Preview */}
                        {expandedId === workout.id && (
                            <div style={{ padding: '0 1rem 1rem' }}>
                                <div style={{
                                    borderTop: '1px solid #222',
                                    paddingTop: '0.75rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.5rem',
                                }}>
                                    {workout.exercises.map((ex, i) => (
                                        <div key={ex.id} style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            fontSize: '0.8rem',
                                        }}>
                                            <span style={{
                                                color: '#64748b',
                                                fontSize: '0.7rem',
                                                minWidth: '1.25rem',
                                            }}>
                                                {i + 1}.
                                            </span>
                                            <span style={{ flex: 1, color: '#e2e8f0' }}>{ex.name}</span>
                                            <span style={{ color: '#64748b', fontSize: '0.75rem' }}>
                                                {ex.series}x{ex.reps}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={() => navigate(`/aluno/treino/${workout.id}`)}
                                    disabled={workout.status === 'expired'}
                                    style={{
                                        width: '100%',
                                        marginTop: '1rem',
                                        padding: '0.7rem',
                                        background: workout.status === 'expired' ? '#333' : '#FF6D00',
                                        color: workout.status === 'expired' ? '#666' : '#fff',
                                        border: 'none',
                                        borderRadius: '0.5rem',
                                        fontWeight: 700,
                                        fontSize: '0.9rem',
                                        cursor: workout.status === 'expired' ? 'not-allowed' : 'pointer',
                                        fontFamily: "'Syne', sans-serif",
                                    }}
                                >
                                    {workout.status === 'expired' ? 'Treino Vencido' : '▶ Iniciar Treino'}
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <StudentBottomNav />
        </div>
    );
};

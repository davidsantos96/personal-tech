import { studentProfile, bodyAssessments, getLatestAssessment, getPreviousAssessment } from '../../../data/studentPortal';
import { StudentBottomNav } from '../../../components/Layout/StudentBottomNav';

export const StudentProgress = () => {
    const latest = getLatestAssessment();
    const previous = getPreviousAssessment();

    const calculateDiff = (curr: number, prev: number) => {
        const diff = curr - prev;
        return diff > 0 ? `+${diff.toFixed(1)}` : diff.toFixed(1);
    };

    return (
        <div style={{ padding: '20px', color: 'white', backgroundColor: '#0a0a0a', minHeight: '100vh', paddingBottom: '100px' }}>
            <h1 style={{ marginBottom: '20px' }}>Minha Evolução</h1>

            {latest && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '30px' }}>
                    <div style={{ backgroundColor: '#1a1a1a', padding: '15px', borderRadius: '12px' }}>
                        <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>PESO</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '5px 0' }}>{latest.weightKg}kg</div>
                        {previous && (
                            <div style={{ fontSize: '0.8rem', color: latest.weightKg < previous.weightKg ? '#22C55E' : '#EF4444' }}>
                                {calculateDiff(latest.weightKg, previous.weightKg)}kg vs anterior
                            </div>
                        )}
                    </div>
                    <div style={{ backgroundColor: '#1a1a1a', padding: '15px', borderRadius: '12px' }}>
                        <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>GORDURA (BF)</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '5px 0' }}>{latest.bodyFatPct}%</div>
                        {previous && (
                            <div style={{ fontSize: '0.8rem', color: latest.bodyFatPct < previous.bodyFatPct ? '#22C55E' : '#EF4444' }}>
                                {calculateDiff(latest.bodyFatPct, previous.bodyFatPct)}% vs anterior
                            </div>
                        )}
                    </div>
                </div>
            )}

            <h2 style={{ fontSize: '1.1rem', marginBottom: '15px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>Histórico de Medidas</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {bodyAssessments.map((assessment) => (
                    <div key={assessment.id} style={{ backgroundColor: '#141414', padding: '15px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <div style={{ fontWeight: 'bold' }}>{new Date(assessment.date).toLocaleDateString('pt-BR')}</div>
                            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{assessment.weightKg}kg | {assessment.bodyFatPct}% BF</div>
                        </div>
                        <div style={{ color: '#FF6D00' }}>
                            <span className="material-symbols-outlined">chevron_right</span>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '30px', backgroundColor: '#1a1a1a', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
                <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem' }}>Próxima avaliação física agendada para:</p>
                <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#FF6D00', marginTop: '5px' }}>
                    {new Date(studentProfile.nextEvaluation).toLocaleDateString('pt-BR')}
                </div>
            </div>

            <StudentBottomNav />
        </div>
    );
};

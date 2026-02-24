import { studentProfile } from '../../../data/studentPortal';
import { StudentBottomNav } from '../../../components/Layout/StudentBottomNav';

export const StudentProfileView = () => {

    return (
        <div style={{ padding: '20px', color: 'white', backgroundColor: '#0a0a0a', minHeight: '100vh', paddingBottom: '100px' }}>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                    <img
                        src={studentProfile.avatar}
                        alt={studentProfile.name}
                        style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #FF6D00' }}
                    />
                </div>
                <h1 style={{ marginTop: '15px', marginBottom: '5px' }}>{studentProfile.name}</h1>
                <div style={{ color: '#FF6D00', fontWeight: 'bold' }}>{studentProfile.goal.toUpperCase()}</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ backgroundColor: '#1a1a1a', padding: '15px', borderRadius: '12px' }}>
                    <h3 style={{ fontSize: '0.9rem', color: '#94a3b8', margin: '0 0 10px 0' }}>MEU PERSONAL</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <img
                            src={studentProfile.trainer.avatar}
                            alt={studentProfile.trainer.name}
                            style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                        />
                        <div>
                            <div style={{ fontWeight: 'bold' }}>{studentProfile.trainer.name}</div>
                            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{studentProfile.trainer.phone}</div>
                        </div>
                    </div>
                </div>

                <div style={{ backgroundColor: '#1a1a1a', padding: '15px', borderRadius: '12px' }}>
                    <h3 style={{ fontSize: '0.9rem', color: '#94a3b8', margin: '0 0 10px 0' }}>DETALHES DO PLANO</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <span style={{ color: '#94a3b8' }}>Membro desde</span>
                        <span>{new Date(studentProfile.startedAt).toLocaleDateString('pt-BR')}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#94a3b8' }}>Plano válido até</span>
                        <span style={{ color: '#22C55E' }}>{new Date(studentProfile.planActiveUntil).toLocaleDateString('pt-BR')}</span>
                    </div>
                </div>

                <button style={{ backgroundColor: '#1a1a1a', color: '#EF4444', border: '1px solid #333', padding: '15px', borderRadius: '12px', fontWeight: 'bold', marginTop: '10px', cursor: 'pointer' }}>
                    Sair da Conta
                </button>
            </div>

            <StudentBottomNav />
        </div>
    );
};

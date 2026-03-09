import { useState, useEffect } from 'react';
import { Container, ScrollPane, Topbar, TopbarTitle } from './styles';
import { BottomNav } from '../../../components/Layout/BottomNav';
import { HeroSection } from './components/HeroSection';
import { MenuSection } from './components/MenuSection';
import { DadosScreen } from './components/DadosScreen';
import { HorariosScreen } from './components/HorariosScreen';
import { FaturamentoScreen } from './components/FaturamentoScreen';
import { NotificacoesScreen } from './components/NotificacoesScreen';
import { ContaScreen } from './components/ContaScreen';
import { theme } from '../../../styles/theme';
import { fetchTrainerProfile, type TrainerProfile as TrainerProfileType } from '../../../services/trainerService';
import { fetchStudents } from '../../../services/studentService';

type Screen = 'menu' | 'dados' | 'horarios' | 'fat' | 'notif' | 'conta';

export const TrainerProfile = () => {
    const [screen, setScreen] = useState<Screen>('menu');
    const [trainer, setTrainer] = useState<TrainerProfileType | null>(null);
    const [activeCount, setActiveCount] = useState(0);

    useEffect(() => {
        fetchTrainerProfile().then(p => {
            if (p) setTrainer(p);
        });
        fetchStudents().then(students => {
            setActiveCount(students.filter(s => s.isActive).length);
        });
    }, []);

    const trainerName = trainer?.fullName || 'Personal';
    const trainerSpecialty = trainer?.specialty || 'Personal Trainer';

    const TRAINER_STATS = [
        { value: activeCount.toString().padStart(2, '0'), label: 'Alunos ativos' },
        { value: '--', label: 'Treinos criados' },
        { value: '--', label: 'Avaliações' },
    ];

    const goBack = () => setScreen('menu');

    // Sub-screens render their own topbar
    if (screen === 'dados') return <Container><DadosScreen onBack={goBack} /><BottomNav /></Container>;
    if (screen === 'horarios') return <Container><HorariosScreen onBack={goBack} /><BottomNav /></Container>;
    if (screen === 'fat') return <Container><FaturamentoScreen onBack={goBack} /><BottomNav /></Container>;
    if (screen === 'notif') return <Container><NotificacoesScreen onBack={goBack} /><BottomNav /></Container>;
    if (screen === 'conta') return <Container><ContaScreen onBack={goBack} /><BottomNav /></Container>;

    // Main menu
    return (
        <Container>
            <Topbar style={{ justifyContent: 'space-between' }}>
                <TopbarTitle>Perfil</TopbarTitle>
                <span style={{ fontSize: 11, color: theme.colors.text.slate500 }}>{trainerName}</span>
            </Topbar>
            <ScrollPane>
                <HeroSection
                    name={trainerName}
                    subtitle={`${trainerSpecialty}`}
                    cref=""
                    stats={TRAINER_STATS}
                />
                <MenuSection onNavigate={(id) => setScreen(id as Screen)} />
            </ScrollPane>
            <BottomNav />
        </Container>
    );
};


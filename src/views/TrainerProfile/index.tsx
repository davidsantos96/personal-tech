import { useState } from 'react';
import { Container, ScrollPane, Topbar, TopbarTitle } from './styles';
import { BottomNav } from '../../components/Layout/BottomNav';
import { HeroSection } from './components/HeroSection';
import { MenuSection } from './components/MenuSection';
import { DadosScreen } from './components/DadosScreen';
import { HorariosScreen } from './components/HorariosScreen';
import { FaturamentoScreen } from './components/FaturamentoScreen';
import { NotificacoesScreen } from './components/NotificacoesScreen';
import { ContaScreen } from './components/ContaScreen';
import { theme } from '../../styles/theme';

type Screen = 'menu' | 'dados' | 'horarios' | 'fat' | 'notif' | 'conta';

const TRAINER_STATS = [
    { value: '04', label: 'Alunos ativos' },
    { value: '128', label: 'Treinos criados' },
    { value: '32', label: 'Avaliações' },
];

export const TrainerProfile = () => {
    const [screen, setScreen] = useState<Screen>('menu');

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
                <span style={{ fontSize: 11, color: theme.colors.text.slate500 }}>Coach Silva</span>
            </Topbar>
            <ScrollPane>
                <HeroSection
                    name="Coach Silva"
                    subtitle="Personal Trainer · São Paulo, SP"
                    cref="012345-G/SP"
                    stats={TRAINER_STATS}
                />
                <MenuSection onNavigate={(id) => setScreen(id as Screen)} />
            </ScrollPane>
            <BottomNav />
        </Container>
    );
};

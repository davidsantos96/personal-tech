import {
    TopicsContainer,
    TopicCard,
    TopicLeft,
    TopicIcon,
    TopicTextWrap,
    TopicTitle,
    TopicSub,
    TopicRight,
    TopicBadge,
    ChevronRight,
    FooterVersion,
} from '../styles';

interface TopicItem {
    id: string;
    icon: string;
    variant?: 'green' | 'red';
    title: string;
    sub: string;
    badge?: string;
    badgeWarn?: boolean;
}

interface MenuSectionProps {
    onNavigate: (screen: string) => void;
}

const TOPICS: TopicItem[] = [
    { id: 'dados', icon: '👤', title: 'Dados Profissionais', sub: 'Nome, CREF, bio, especialidades' },
    { id: 'horarios', icon: '🗓️', title: 'Horários & Atendimento', sub: 'Dias, turnos, valor da sessão' },
    { id: 'fat', icon: '💰', variant: 'green', title: 'Faturamento', sub: 'Receita mensal e indicadores', badge: 'R$ 9.800' },
    { id: 'notif', icon: '🔔', title: 'Notificações', sub: 'O que e quando ser avisado', badge: '2 desativ.', badgeWarn: true },
    { id: 'conta', icon: '🔐', title: 'Conta & Segurança', sub: 'Senha, 2FA, plano, LGPD' },
];

export const MenuSection = ({ onNavigate }: MenuSectionProps) => (
    <TopicsContainer>
        {TOPICS.map(t => (
            <TopicCard key={t.id} onClick={() => onNavigate(t.id)}>
                <TopicLeft>
                    <TopicIcon $variant={t.variant}>{t.icon}</TopicIcon>
                    <TopicTextWrap>
                        <TopicTitle>{t.title}</TopicTitle>
                        <TopicSub>{t.sub}</TopicSub>
                    </TopicTextWrap>
                </TopicLeft>
                <TopicRight>
                    {t.badge && <TopicBadge $warn={t.badgeWarn}>{t.badge}</TopicBadge>}
                    <ChevronRight>›</ChevronRight>
                </TopicRight>
            </TopicCard>
        ))}

        <TopicCard $danger onClick={() => { /* TODO: logout */ }}>
            <TopicLeft>
                <TopicIcon $variant="red">🚪</TopicIcon>
                <TopicTextWrap>
                    <TopicTitle style={{ color: '#EF4444' }}>Sair da conta</TopicTitle>
                    <TopicSub>Encerrar sessão atual</TopicSub>
                </TopicTextWrap>
            </TopicLeft>
            <ChevronRight style={{ color: '#EF4444' }}>›</ChevronRight>
        </TopicCard>

        <FooterVersion>
            Personal Tech v1.0.0 · <span className="link">Termos</span> · <span className="link">Privacidade</span>
        </FooterVersion>
    </TopicsContainer>
);

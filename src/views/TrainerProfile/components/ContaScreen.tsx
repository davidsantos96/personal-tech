import {
    Topbar,
    BackButton,
    TopbarTitle,
    ScrollPane,
    SectionBody,
    SectionLabel,
    PlanCard,
    PlanInfo,
    PlanTitle,
    PlanSub,
    PlanButton,
    MenuItem,
    MenuLeft,
    MenuIcon,
    MenuTextWrap,
    MenuTitle,
    MenuSub,
    ChevronRight,
    FooterVersion,
} from '../styles';

const ChevronLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
);

const SEGURANCA = [
    { icon: '🔑', variant: 'orange' as const, label: 'Alterar senha', sub: 'Última alteração há 3 meses' },
    { icon: '📧', variant: undefined, label: 'Alterar e-mail', sub: 'coach@personaltech.app' },
    { icon: '📱', variant: undefined, label: 'Autenticação em 2 fatores', sub: '⚠ Desativada — recomendamos ativar' },
];

const DADOS = [
    { icon: '📤', label: 'Exportar meus dados', sub: 'LGPD — formato JSON ou CSV' },
    { icon: '🗑️', label: 'Excluir conta', sub: 'Ação irreversível' },
];

interface ContaScreenProps {
    onBack: () => void;
}

export const ContaScreen = ({ onBack }: ContaScreenProps) => (
    <>
        <Topbar>
            <BackButton onClick={onBack}><ChevronLeftIcon /></BackButton>
            <TopbarTitle>Conta & Segurança</TopbarTitle>
        </Topbar>
        <ScrollPane>
            <SectionBody>
                <SectionLabel>Plano atual</SectionLabel>
                <PlanCard>
                    <PlanInfo>
                        <PlanTitle>⭐ Plano Pro</PlanTitle>
                        <PlanSub>Renova em 15 Mar 2026 · R$ 49,90/mês</PlanSub>
                    </PlanInfo>
                    <PlanButton>Gerenciar</PlanButton>
                </PlanCard>

                <SectionLabel>Segurança</SectionLabel>
                {SEGURANCA.map(i => (
                    <MenuItem key={i.label}>
                        <MenuLeft>
                            <MenuIcon $variant={i.variant}>{i.icon}</MenuIcon>
                            <MenuTextWrap>
                                <MenuTitle>{i.label}</MenuTitle>
                                <MenuSub>{i.sub}</MenuSub>
                            </MenuTextWrap>
                        </MenuLeft>
                        <ChevronRight>›</ChevronRight>
                    </MenuItem>
                ))}

                <SectionLabel>Meus dados</SectionLabel>
                {DADOS.map(i => (
                    <MenuItem key={i.label}>
                        <MenuLeft>
                            <MenuIcon>{i.icon}</MenuIcon>
                            <MenuTextWrap>
                                <MenuTitle>{i.label}</MenuTitle>
                                <MenuSub>{i.sub}</MenuSub>
                            </MenuTextWrap>
                        </MenuLeft>
                        <ChevronRight>›</ChevronRight>
                    </MenuItem>
                ))}

                <MenuItem $danger style={{ marginTop: 4 }}>
                    <MenuLeft>
                        <MenuIcon $variant="red">🚪</MenuIcon>
                        <MenuTextWrap>
                            <MenuTitle $danger>Sair da conta</MenuTitle>
                            <MenuSub>Você precisará fazer login novamente</MenuSub>
                        </MenuTextWrap>
                    </MenuLeft>
                    <ChevronRight style={{ color: '#EF4444' }}>›</ChevronRight>
                </MenuItem>

                <FooterVersion>
                    Personal Tech v1.0.0 · <span className="link">Termos</span> · <span className="link">Privacidade</span>
                </FooterVersion>
            </SectionBody>
        </ScrollPane>
    </>
);

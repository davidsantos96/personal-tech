import { useState } from 'react';
import { useSaveAction } from '../hooks/useSaveAction';
import {
    Topbar,
    BackButton,
    TopbarTitle,
    TopbarAction,
    ScrollPane,
    SectionBody,
    SectionLabel,
    Field,
    FieldLabel,
    FieldSelect,
    ToggleRow,
    ToggleLeft,
    ToggleEmoji,
    ToggleTextWrap,
    ToggleTitle,
    ToggleSub,
    SwitchTrack,
    SwitchThumb,
    CounterBadge,
    CounterLabel,
    CounterValue,
} from '../styles';

interface NotifItem {
    emoji: string;
    label: string;
    sub: string;
    key: string;
}

const NOTIF: NotifItem[] = [
    { emoji: '⚠️', label: 'Plano vencendo', sub: '3 dias antes do vencimento', key: 'planoVencendo' },
    { emoji: '📋', label: 'Série de treino', sub: 'Quando vence amanhã', key: 'serieVencendo' },
    { emoji: '📅', label: 'Reagendamentos', sub: 'Quando aluno solicita', key: 'reagendamento' },
    { emoji: '💤', label: 'Aluno inativo', sub: 'Após 30 dias sem treinar', key: 'alunoInativo' },
    { emoji: '📊', label: 'Resumo diário', sub: 'Todo dia às 20h', key: 'resumoDiario' },
    { emoji: '💰', label: 'Pagamento confirmado', sub: 'Quando recebido', key: 'pagamento' },
    { emoji: '🎂', label: 'Aniversário de aluno', sub: 'No dia do aniversário', key: 'aniversario' },
    { emoji: '🔔', label: 'Lembrete de sessão', sub: '30 min antes do atendimento', key: 'lembrete' },
];

const ChevronLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
);

interface NotificacoesScreenProps {
    onBack: () => void;
}

export const NotificacoesScreen = ({ onBack }: NotificacoesScreenProps) => {
    const [notifs, setNotifs] = useState<Record<string, boolean>>({
        planoVencendo: true,
        serieVencendo: true,
        reagendamento: true,
        alunoInativo: true,
        resumoDiario: false,
        pagamento: true,
        aniversario: false,
        lembrete: true,
    });
    const { save, label, saved } = useSaveAction();

    const toggle = (key: string) => setNotifs(p => ({ ...p, [key]: !p[key] }));
    const ativas = Object.values(notifs).filter(Boolean).length;

    return (
        <>
            <Topbar>
                <BackButton onClick={onBack}><ChevronLeftIcon /></BackButton>
                <TopbarTitle>Notificações</TopbarTitle>
                <TopbarAction $saved={saved} onClick={save}>{label}</TopbarAction>
            </Topbar>
            <ScrollPane>
                <SectionBody>
                    <Field>
                        <FieldLabel>Canal preferido</FieldLabel>
                        <FieldSelect>
                            <option>Push + E-mail</option>
                            <option>Somente Push</option>
                            <option>Somente E-mail</option>
                        </FieldSelect>
                    </Field>

                    <SectionLabel>Tipos de notificação</SectionLabel>

                    {NOTIF.map(n => (
                        <ToggleRow key={n.key} onClick={() => toggle(n.key)}>
                            <ToggleLeft>
                                <ToggleEmoji>{n.emoji}</ToggleEmoji>
                                <ToggleTextWrap>
                                    <ToggleTitle>{n.label}</ToggleTitle>
                                    <ToggleSub>{n.sub}</ToggleSub>
                                </ToggleTextWrap>
                            </ToggleLeft>
                            <SwitchTrack $on={!!notifs[n.key]} onClick={e => { e.stopPropagation(); toggle(n.key); }}>
                                <SwitchThumb $on={!!notifs[n.key]} />
                            </SwitchTrack>
                        </ToggleRow>
                    ))}

                    <CounterBadge>
                        <CounterLabel>Notificações ativas</CounterLabel>
                        <CounterValue>{ativas}/{NOTIF.length}</CounterValue>
                    </CounterBadge>
                </SectionBody>
            </ScrollPane>
        </>
    );
};

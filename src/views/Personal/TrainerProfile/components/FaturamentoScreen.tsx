import { useState } from 'react';
import {
    Topbar,
    BackButton,
    TopbarTitle,
    TopbarAction,
    ScrollPane,
    SectionBody,
    SectionLabel,
    MonthSelector,
    MonthArrow,
    MonthLabel,
    FatCard,
    FatVal,
    FatBadge,
    MiniChart,
    MiniBar,
    FatRow,
    FatDot,
    KpiGrid,
    KpiCard,
    KpiLabel,
    KpiVal,
    KpiSub,
} from '../styles';
import { theme } from '../../../../styles/theme';

const DIAS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
const BARS = [38, 52, 44, 68, 58, 72, 61];

const DETALHAMENTO = [
    { dot: '#22c55e', label: 'Mensalidades ativas', val: 'R$ 7.200,00' },
    { dot: '#ff6b00', label: 'Sessões avulsas', val: 'R$ 1.800,00' },
    { dot: '#3b82f6', label: 'Planos a receber', val: 'R$ 800,00' },
    { dot: '#ef4444', label: 'Inadimplência', val: 'R$ 300,00' },
];

const KPIS = [
    { label: 'Ticket médio', val: 'R$ 2.450', sub: 'por aluno/mês' },
    { label: 'Taxa ocupação', val: '87%', sub: 'da agenda' },
    { label: 'Churn mensal', val: '0%', sub: 'cancelamentos' },
    { label: 'Alunos ativos', val: '4', sub: 'pagantes' },
];

const ChevronLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
);

interface FaturamentoScreenProps {
    onBack: () => void;
}

export const FaturamentoScreen = ({ onBack }: FaturamentoScreenProps) => {
    const [mesIdx, setMesIdx] = useState(1);
    const meses = ['Janeiro 2026', 'Fevereiro 2026', 'Março 2026'];

    return (
        <>
            <Topbar>
                <BackButton onClick={onBack}><ChevronLeftIcon /></BackButton>
                <TopbarTitle>Faturamento</TopbarTitle>
                <TopbarAction>Exportar</TopbarAction>
            </Topbar>
            <ScrollPane>
                <SectionBody>
                    {/* Month Selector */}
                    <MonthSelector>
                        <MonthArrow onClick={() => setMesIdx(i => Math.max(0, i - 1))}>‹</MonthArrow>
                        <MonthLabel>{meses[mesIdx]}</MonthLabel>
                        <MonthArrow onClick={() => setMesIdx(i => Math.min(meses.length - 1, i + 1))}>›</MonthArrow>
                    </MonthSelector>

                    {/* Revenue Card */}
                    <FatCard>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                            <div>
                                <div style={{ fontSize: 11, color: theme.colors.text.slate400 }}>Receita total</div>
                                <FatVal>R$ 9.800,00</FatVal>
                            </div>
                            <FatBadge>↑ 18% vs jan</FatBadge>
                        </div>

                        <MiniChart>
                            {BARS.map((h, i) => (
                                <MiniBar key={i} $highlight={i === 6} style={{ height: `${(h / 72) * 100}%` }} />
                            ))}
                        </MiniChart>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
                            {DIAS.map((d, i) => (
                                <span key={d} style={{
                                    flex: 1, textAlign: 'center', fontSize: 9,
                                    color: i === 6 ? theme.colors.primary : theme.colors.text.slate500,
                                    fontFamily: theme.fonts.display, fontWeight: 700,
                                }}>
                                    {d}
                                </span>
                            ))}
                        </div>
                    </FatCard>

                    {/* Breakdown */}
                    <SectionLabel>Detalhamento</SectionLabel>
                    {DETALHAMENTO.map(r => (
                        <FatRow key={r.label}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <FatDot $color={r.dot} />
                                <span style={{ fontSize: 13, color: theme.colors.text.white }}>{r.label}</span>
                            </div>
                            <span style={{ fontFamily: theme.fonts.display, fontSize: 13, fontWeight: 700, color: theme.colors.text.white }}>
                                {r.val}
                            </span>
                        </FatRow>
                    ))}

                    {/* KPIs */}
                    <SectionLabel>Indicadores</SectionLabel>
                    <KpiGrid>
                        {KPIS.map(k => (
                            <KpiCard key={k.label}>
                                <KpiLabel>{k.label}</KpiLabel>
                                <KpiVal>{k.val}</KpiVal>
                                <KpiSub>{k.sub}</KpiSub>
                            </KpiCard>
                        ))}
                    </KpiGrid>
                </SectionBody>
            </ScrollPane>
        </>
    );
};


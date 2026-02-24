import { MedidaRow } from '../../../../../components/avaliacao';
import { calcRCQ } from '../../../../../utils/calculos';
import { CIRCUNFERENCIAS } from '../constants';
import {
    Body,
    SectionHead,
    SectionIcon,
    SectionTitle,
    SectionSub,
    LiveStatCard,
    LiveStatLabel,
    LiveStatValue,
    LiveStatBadge,
    Btn,
    BtnRow,
} from '../styles';

interface TabCircunferenciasProps {
    sexo: string;
    circunf: Record<string, string>;
    onCircChange: (key: string, value: string) => void;
    onPrev: () => void;
    onNext: () => void;
}

export const TabCircunferencias = ({
    sexo,
    circunf,
    onCircChange,
    onPrev,
    onNext,
}: TabCircunferenciasProps) => {
    const rcq = calcRCQ(parseFloat(circunf.cintura), parseFloat(circunf.quadril));
    const rcqRef = sexo === 'M' ? 0.95 : 0.86;
    const rcqRisk = rcq ? parseFloat(rcq) > rcqRef : false;

    return (
        <Body key="circ">
            <SectionHead>
                <SectionIcon>📏</SectionIcon>
                <div>
                    <SectionTitle>Circunferências</SectionTitle>
                    <br />
                    <SectionSub>Perímetros corporais (cm)</SectionSub>
                </div>
            </SectionHead>

            {CIRCUNFERENCIAS.map(c => (
                <MedidaRow
                    key={c.key}
                    emoji={c.emoji}
                    label={c.label}
                    hint={c.hint}
                    unit="cm"
                    value={circunf[c.key] || ''}
                    onChange={v => onCircChange(c.key, v)}
                />
            ))}

            {/* RCQ live */}
            {rcq && (
                <LiveStatCard>
                    <div>
                        <LiveStatLabel>RCQ (Razão Cintura-Quadril)</LiveStatLabel>
                        <LiveStatValue $color={rcqRisk ? '#ef4444' : '#22c55e'}>
                            {rcq}
                        </LiveStatValue>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <LiveStatLabel>Ref: {sexo === 'M' ? '≤ 0.95' : '≤ 0.86'}</LiveStatLabel>
                        <LiveStatBadge $color={rcqRisk ? '#ef4444' : '#22c55e'}>
                            {rcqRisk ? 'Risco elevado' : 'Normal'}
                        </LiveStatBadge>
                    </div>
                </LiveStatCard>
            )}

            <BtnRow>
                <Btn $variant="ghost" onClick={onPrev}>← Voltar</Btn>
                <Btn $variant="primary" onClick={onNext}>Ver Resultado →</Btn>
            </BtnRow>
        </Body>
    );
};



import { MedidaRow } from '../../../../components/avaliacao';
import type { Dobra } from '../constants';
import {
    Body,
    SectionHead,
    SectionIcon,
    SectionTitle,
    SectionSub,
    LiveStatCard,
    LiveStatLabel,
    LiveStatValue,
    TipBox,
    TipIcon,
    TipTextWrap,
    TipTitle,
    TipText,
    Btn,
    BtnRow,
} from '../styles';

interface TabDobrasProps {
    dobrasList: Dobra[];
    dobras: Record<string, string>;
    onDobraChange: (key: string, value: string) => void;
    soma7: number;
    onPrev: () => void;
    onNext: () => void;
}

export const TabDobras = ({
    dobrasList,
    dobras,
    onDobraChange,
    soma7,
    onPrev,
    onNext,
}: TabDobrasProps) => (
    <Body key="dobras">
        <SectionHead>
            <SectionIcon>📐</SectionIcon>
            <div>
                <SectionTitle>Dobras Cutâneas</SectionTitle>
                <br />
                <SectionSub>Protocolo Jackson & Pollock 7 dobras</SectionSub>
            </div>
        </SectionHead>

        <TipBox>
            <TipIcon>📋</TipIcon>
            <TipTextWrap>
                <TipTitle>Como fazer corretamente</TipTitle>
                <TipText>
                    Sempre pelo lado direito do corpo. Pinçar com polegar e indicador,
                    1 cm acima do ponto. Medir 2 seg após soltar o adipômetro. Realizar
                    3 medidas e usar a média.
                </TipText>
            </TipTextWrap>
        </TipBox>

        {dobrasList.map(d => (
            <MedidaRow
                key={d.key}
                emoji={d.emoji}
                label={d.label}
                hint={d.hint}
                unit="mm"
                value={dobras[d.key] || ''}
                onChange={v => onDobraChange(d.key, v)}
            />
        ))}

        {/* Soma live */}
        <LiveStatCard>
            <LiveStatLabel>Soma das 7 dobras</LiveStatLabel>
            <LiveStatValue $color={soma7 > 0 ? '#FF6D00' : '#64748b'}>
                {soma7 > 0 ? `${soma7.toFixed(0)} mm` : '—'}
            </LiveStatValue>
        </LiveStatCard>

        <BtnRow>
            <Btn $variant="ghost" onClick={onPrev}>← Voltar</Btn>
            <Btn $variant="primary" onClick={onNext}>Circunferências →</Btn>
        </BtnRow>
    </Body>
);

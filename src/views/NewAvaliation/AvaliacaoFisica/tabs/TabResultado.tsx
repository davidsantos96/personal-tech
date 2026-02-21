import { calcPollock7, calcIMC, imcClass, fatClass, calcRCQ } from '../../../../utils/calculos';
import type { Dobra } from '../constants';
import {
    Body,
    SectionHead,
    SectionIcon,
    SectionTitle,
    SectionSub,
    Field,
    FieldLabel,
    Textarea,
    ResultCard,
    ResultCardTitle,
    ResultGrid,
    ResultItem,
    ResultItemLabel,
    ResultItemVal,
    ResultItemSub,
    FatBarWrap,
    FatBarLabels,
    FatBar,
    FatMarker,
    FatBarResult,
    TipBox,
    TipIcon,
    TipTextWrap,
    TipTitle,
    TipText,
    Btn,
} from '../styles';

interface TabResultadoProps {
    sexo: string;
    idade: string;
    peso: string;
    altura: string;
    pa: string;
    fc: string;
    dobrasList: Dobra[];
    dobras: Record<string, string>;
    circunf: Record<string, string>;
    onSave: () => void;
}

export const TabResultado = ({
    sexo,
    idade,
    peso,
    altura,
    pa,
    fc,
    dobrasList,
    dobras,
    circunf,
    onSave,
}: TabResultadoProps) => {
    const soma7 = dobrasList.reduce((acc, d) => acc + (parseFloat(dobras[d.key]) || 0), 0);
    const pctGordura = calcPollock7(soma7 || null, parseInt(idade) || null, sexo);
    const imc = calcIMC(parseFloat(peso), parseFloat(altura));
    const rcq = calcRCQ(parseFloat(circunf.cintura), parseFloat(circunf.quadril));
    const imcInfo = imcClass(imc);
    const fatInfo = pctGordura ? fatClass(pctGordura, sexo) : null;

    const massaGorda = pctGordura && peso
        ? ((parseFloat(pctGordura) / 100) * parseFloat(peso)).toFixed(1)
        : null;
    const massaMagra = massaGorda && peso
        ? (parseFloat(peso) - parseFloat(massaGorda)).toFixed(1)
        : null;
    const fatBarPos = pctGordura
        ? Math.min(95, Math.max(2, (parseFloat(pctGordura) / 40) * 100))
        : 0;

    const rcqRef = sexo === 'M' ? 0.95 : 0.86;
    const rcqRisk = rcq ? parseFloat(rcq) > rcqRef : false;

    return (
        <Body key="result">
            <SectionHead>
                <SectionIcon>📊</SectionIcon>
                <div>
                    <SectionTitle>Resultado da Avaliação</SectionTitle>
                    <br />
                    <SectionSub>Composição corporal calculada</SectionSub>
                </div>
            </SectionHead>

            {/* Composição corporal */}
            <ResultCard>
                <ResultCardTitle>Composição Corporal</ResultCardTitle>
                <ResultGrid>
                    <ResultItem>
                        <ResultItemLabel>Peso total</ResultItemLabel>
                        <ResultItemVal>{peso || '—'}</ResultItemVal>
                        <ResultItemSub>kg</ResultItemSub>
                    </ResultItem>
                    <ResultItem>
                        <ResultItemLabel>% Gordura</ResultItemLabel>
                        <ResultItemVal $color={fatInfo?.color}>
                            {pctGordura ? `${pctGordura}%` : '—'}
                        </ResultItemVal>
                        <ResultItemSub>{fatInfo?.label || 'preencha dobras'}</ResultItemSub>
                    </ResultItem>
                    <ResultItem>
                        <ResultItemLabel>Massa magra</ResultItemLabel>
                        <ResultItemVal $color="#22c55e">
                            {massaMagra || '—'}
                        </ResultItemVal>
                        <ResultItemSub>kg</ResultItemSub>
                    </ResultItem>
                    <ResultItem>
                        <ResultItemLabel>Massa gorda</ResultItemLabel>
                        <ResultItemVal $color="#FF6D00">
                            {massaGorda || '—'}
                        </ResultItemVal>
                        <ResultItemSub>kg</ResultItemSub>
                    </ResultItem>
                </ResultGrid>

                {/* Fat bar */}
                {pctGordura && fatInfo && (
                    <FatBarWrap>
                        <FatBarLabels>
                            <span>Essencial</span>
                            <span>Atleta</span>
                            <span>Boa forma</span>
                            <span>Obesidade</span>
                        </FatBarLabels>
                        <FatBar>
                            <FatMarker $position={fatBarPos} />
                        </FatBar>
                        <FatBarResult $color={fatInfo.color}>
                            {pctGordura}% — {fatInfo.label}
                        </FatBarResult>
                    </FatBarWrap>
                )}
            </ResultCard>

            {/* IMC & Pressão */}
            <ResultCard>
                <ResultCardTitle>IMC & Pressão</ResultCardTitle>
                <ResultGrid>
                    <ResultItem>
                        <ResultItemLabel>IMC</ResultItemLabel>
                        <ResultItemVal $color={imc ? imcInfo.color : '#64748b'}>
                            {imc || '—'}
                        </ResultItemVal>
                        <ResultItemSub>{imc ? imcInfo.label : 'preencha peso/altura'}</ResultItemSub>
                    </ResultItem>
                    <ResultItem>
                        <ResultItemLabel>RCQ</ResultItemLabel>
                        <ResultItemVal $color={rcq ? (rcqRisk ? '#ef4444' : '#22c55e') : '#64748b'}>
                            {rcq || '—'}
                        </ResultItemVal>
                        <ResultItemSub>Risco cardiovascular</ResultItemSub>
                    </ResultItem>
                    <ResultItem>
                        <ResultItemLabel>Pressão arterial</ResultItemLabel>
                        <ResultItemVal $small>{pa || '—'}</ResultItemVal>
                        <ResultItemSub>mmHg</ResultItemSub>
                    </ResultItem>
                    <ResultItem>
                        <ResultItemLabel>FC repouso</ResultItemLabel>
                        <ResultItemVal $small>{fc || '—'}</ResultItemVal>
                        <ResultItemSub>bpm</ResultItemSub>
                    </ResultItem>
                </ResultGrid>
            </ResultCard>

            {/* Protocolo */}
            <TipBox>
                <TipIcon>🔬</TipIcon>
                <TipTextWrap>
                    <TipTitle>Metodologia utilizada</TipTitle>
                    <TipText>
                        % Gordura: Jackson & Pollock 7 dobras (1978/1980) + equação de
                        Siri (1956). IMC: Quetelet. RCQ: WHO (1997). Soma de dobras:{' '}
                        {soma7 > 0 ? `${soma7.toFixed(0)} mm` : 'não calculado'}.
                    </TipText>
                </TipTextWrap>
            </TipBox>

            <Field>
                <FieldLabel>Parecer do avaliador</FieldLabel>
                <Textarea placeholder="Observações sobre a avaliação, recomendações, metas sugeridas..." />
            </Field>

            <Btn $variant="primary" onClick={onSave}>
                💾 Salvar Avaliação
            </Btn>
        </Body>
    );
};

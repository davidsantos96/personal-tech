import { YesNo } from '../../../../components/avaliacao';
import type { YNVal } from '../../../../components/avaliacao';
import {
    NIVEL_ATIVIDADE,
    HORAS_TREINO,
    DIAS_TREINO,
    TIPO_TRABALHO,
    QUALIDADE_SONO,
    ESCALA_ESTRESSE,
    ALIMENTACAO_OPTIONS,
    HORAS_SONO,
} from '../constants';
import {
    Body,
    SectionHead,
    SectionIcon,
    SectionTitle,
    SectionSub,
    SLabel,
    Field,
    FieldLabel,
    Select,
    Row2,
    Divider,
    ChipGrid,
    Chip,
    ScaleRow,
    ScaleBtn,
    Btn,
    BtnRow,
} from '../styles';

interface StepHabitosProps {
    nivelAtual: string | null;
    setNivelAtual: (v: string) => void;
    sono: number | null;
    setSono: (v: number) => void;
    estresse: string | null;
    setEstresse: (v: string) => void;
    fumo: YNVal;
    setFumo: (v: 'sim' | 'nao') => void;
    alcool: YNVal;
    setAlcool: (v: 'sim' | 'nao') => void;
    alimentacao: string | null;
    setAlimentacao: (v: string) => void;
    onPrev: () => void;
    onNext: () => void;
}

export const StepHabitos = ({
    nivelAtual, setNivelAtual,
    sono, setSono,
    estresse, setEstresse,
    fumo, setFumo,
    alcool, setAlcool,
    alimentacao, setAlimentacao,
    onPrev, onNext,
}: StepHabitosProps) => (
    <Body key="hab">
        <SectionHead>
            <SectionIcon>🌿</SectionIcon>
            <div>
                <SectionTitle>Hábitos de Vida</SectionTitle>
                <br />
                <SectionSub>Rotina, sono e comportamento</SectionSub>
            </div>
        </SectionHead>

        <SLabel>Nível atual de atividade física</SLabel>
        <ChipGrid>
            {NIVEL_ATIVIDADE.map(n => (
                <Chip key={n} $active={nivelAtual === n} onClick={() => setNivelAtual(n)}>
                    {n}
                </Chip>
            ))}
        </ChipGrid>

        <Row2>
            <Field>
                <FieldLabel>Horas de treino/semana</FieldLabel>
                <Select>
                    <option value="">Selecionar</option>
                    {HORAS_TREINO.map(o => (
                        <option key={o}>{o}</option>
                    ))}
                </Select>
            </Field>
            <Field>
                <FieldLabel>Dias de treino/semana</FieldLabel>
                <Select>
                    <option value="">Selecionar</option>
                    {DIAS_TREINO.map(o => (
                        <option key={o}>{o} dia{o !== '1' ? 's' : ''}</option>
                    ))}
                </Select>
            </Field>
        </Row2>

        <Field>
            <FieldLabel>Tipo de trabalho</FieldLabel>
            <Select>
                <option>Selecionar</option>
                {TIPO_TRABALHO.map(o => (
                    <option key={o}>{o}</option>
                ))}
            </Select>
        </Field>

        <Divider />

        <SLabel>Qualidade do sono</SLabel>
        <ScaleRow>
            {QUALIDADE_SONO.map((v, i) => (
                <ScaleBtn key={v} $active={sono === i} onClick={() => setSono(i)}
                    style={{ fontSize: '0.65rem', padding: '0.55rem 0.1rem' }}>
                    {v}
                </ScaleBtn>
            ))}
        </ScaleRow>

        <SLabel>Nível de estresse diário</SLabel>
        <ScaleRow>
            {ESCALA_ESTRESSE.map(v => (
                <ScaleBtn key={v} $active={estresse === v} onClick={() => setEstresse(v)}>
                    {v}
                </ScaleBtn>
            ))}
        </ScaleRow>

        <Divider />

        <YesNo label="Fuma ou já fumou?" val={fumo} onChange={setFumo} />
        <YesNo label="Consome bebidas alcoólicas regularmente?" val={alcool} onChange={setAlcool} />

        <SLabel>Alimentação</SLabel>
        <ChipGrid>
            {ALIMENTACAO_OPTIONS.map(a => (
                <Chip key={a} $active={alimentacao === a} onClick={() => setAlimentacao(a)}>
                    {a}
                </Chip>
            ))}
        </ChipGrid>

        <Field>
            <FieldLabel>Horas de sono por noite</FieldLabel>
            <Select>
                <option>Selecionar</option>
                {HORAS_SONO.map(o => (
                    <option key={o}>{o}</option>
                ))}
            </Select>
        </Field>

        <BtnRow>
            <Btn $variant="ghost" onClick={onPrev}>← Voltar</Btn>
            <Btn $variant="primary" onClick={onNext}>Continuar →</Btn>
        </BtnRow>
    </Body>
);

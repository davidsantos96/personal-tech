import { calcIMC, imcClass } from '../../../../utils/calculos';
import {
    Body,
    SectionHead,
    SectionIcon,
    SectionTitle,
    SectionSub,
    SLabel,
    Field,
    FieldLabel,
    Input,
    Textarea,
    Row2,
    Row3,
    Divider,
    SexSelector,
    SexOption,
    LiveStatCard,
    LiveStatLabel,
    LiveStatValue,
    LiveStatBadge,
    PhotoZone,
    PhotoLabel,
    Btn,
} from '../styles';

interface TabGeralProps {
    sexo: string;
    setSexo: (v: string) => void;
    idade: string;
    setIdade: (v: string) => void;
    peso: string;
    setPeso: (v: string) => void;
    altura: string;
    setAltura: (v: string) => void;
    pa: string;
    setPa: (v: string) => void;
    fc: string;
    setFc: (v: string) => void;
    obs: string;
    setObs: (v: string) => void;
    onResetDobras: () => void;
    onNext: () => void;
}

export const TabGeral = ({
    sexo, setSexo,
    idade, setIdade,
    peso, setPeso,
    altura, setAltura,
    pa, setPa,
    fc, setFc,
    obs, setObs,
    onResetDobras,
    onNext,
}: TabGeralProps) => {
    const imc = calcIMC(parseFloat(peso), parseFloat(altura));
    const imcInfo = imcClass(imc);

    return (
        <Body key="geral">
            <SectionHead>
                <SectionIcon>📏</SectionIcon>
                <div>
                    <SectionTitle>Medidas Gerais</SectionTitle>
                    <br />
                    <SectionSub>Dados antropométricos básicos</SectionSub>
                </div>
            </SectionHead>

            {/* Sexo */}
            <div>
                <SLabel style={{ marginBottom: 8, display: 'block' }}>Sexo biológico</SLabel>
                <SexSelector>
                    <SexOption
                        $active={sexo === 'M'}
                        onClick={() => { setSexo('M'); onResetDobras(); }}
                    >
                        👨 Masculino
                    </SexOption>
                    <SexOption
                        $active={sexo === 'F'}
                        onClick={() => { setSexo('F'); onResetDobras(); }}
                    >
                        👩 Feminino
                    </SexOption>
                </SexSelector>
            </div>

            <Row2>
                <Field>
                    <FieldLabel>Idade</FieldLabel>
                    <Input
                        type="number"
                        placeholder="Ex: 28"
                        value={idade}
                        onChange={e => setIdade(e.target.value)}
                    />
                </Field>
                <Field>
                    <FieldLabel>Data da avaliação</FieldLabel>
                    <Input type="date" defaultValue="2026-02-18" />
                </Field>
            </Row2>

            <Row2>
                <Field>
                    <FieldLabel>Peso (kg)</FieldLabel>
                    <Input
                        type="number"
                        inputMode="decimal"
                        placeholder="Ex: 75.5"
                        value={peso}
                        onChange={e => setPeso(e.target.value)}
                    />
                </Field>
                <Field>
                    <FieldLabel>Altura (cm)</FieldLabel>
                    <Input
                        type="number"
                        inputMode="decimal"
                        placeholder="Ex: 178"
                        value={altura}
                        onChange={e => setAltura(e.target.value)}
                    />
                </Field>
            </Row2>

            {/* IMC live */}
            {imc && (
                <LiveStatCard>
                    <div>
                        <LiveStatLabel>IMC calculado</LiveStatLabel>
                        <LiveStatValue $color={imcInfo.color}>{imc}</LiveStatValue>
                    </div>
                    <LiveStatBadge $color={imcInfo.color}>
                        {imcInfo.label}
                    </LiveStatBadge>
                </LiveStatCard>
            )}

            <Divider />

            <SLabel>Pressão arterial & frequência cardíaca</SLabel>
            <Row2>
                <Field>
                    <FieldLabel>PA (mmHg)</FieldLabel>
                    <Input
                        placeholder="Ex: 120/80"
                        value={pa}
                        onChange={e => setPa(e.target.value)}
                    />
                </Field>
                <Field>
                    <FieldLabel>FC repouso (bpm)</FieldLabel>
                    <Input
                        type="number"
                        placeholder="Ex: 72"
                        value={fc}
                        onChange={e => setFc(e.target.value)}
                    />
                </Field>
            </Row2>

            <Divider />

            {/* Fotos posturais */}
            <SLabel>Fotos posturais (opcional)</SLabel>
            <Row3>
                {['Frontal', 'Lateral', 'Posterior'].map(v => (
                    <PhotoZone key={v}>
                        <span style={{ fontSize: '1.375rem' }}>📷</span>
                        <PhotoLabel>{v}</PhotoLabel>
                    </PhotoZone>
                ))}
            </Row3>

            <Field>
                <FieldLabel>Observações gerais</FieldLabel>
                <Textarea
                    placeholder="Postura, tônus, aspectos visuais observados..."
                    value={obs}
                    onChange={e => setObs(e.target.value)}
                />
            </Field>

            <Btn $variant="primary" onClick={onNext}>
                Próximo: Dobras Cutâneas →
            </Btn>
        </Body>
    );
};

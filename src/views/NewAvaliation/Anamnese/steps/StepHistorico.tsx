import { YesNo, ChipSelector } from '../../../../components/avaliacao';
import type { YNVal } from '../../../../components/avaliacao';
import { toggle } from '../../../../utils/calculos';
import { DOENCAS, CIRURGIAS, LESOES } from '../constants';
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
    Divider,
    Btn,
    BtnRow,
} from '../styles';

interface StepHistoricoProps {
    doencas: string[];
    setDoencas: React.Dispatch<React.SetStateAction<string[]>>;
    cirurgias: string[];
    setCirurgias: React.Dispatch<React.SetStateAction<string[]>>;
    lesoes: string[];
    setLesoes: React.Dispatch<React.SetStateAction<string[]>>;
    medicamentos: YNVal;
    setMedicamentos: (v: 'sim' | 'nao') => void;
    medicDesc: string;
    setMedicDesc: React.Dispatch<React.SetStateAction<string>>;
    histFamiliar: YNVal;
    setHistFamiliar: (v: 'sim' | 'nao') => void;
    onPrev: () => void;
    onNext: () => void;
}

export const StepHistorico = ({
    doencas, setDoencas,
    cirurgias, setCirurgias,
    lesoes, setLesoes,
    medicamentos, setMedicamentos,
    medicDesc, setMedicDesc,
    histFamiliar, setHistFamiliar,
    onPrev, onNext,
}: StepHistoricoProps) => (
    <Body key="hist">
        <SectionHead>
            <SectionIcon>🩺</SectionIcon>
            <div>
                <SectionTitle>Histórico Médico</SectionTitle>
                <br />
                <SectionSub>Condições de saúde e histórico</SectionSub>
            </div>
        </SectionHead>

        <SLabel>Doenças diagnosticadas</SLabel>
        <ChipSelector
            items={DOENCAS}
            selected={doencas}
            onToggle={i => setDoencas(toggle(doencas, i))}
        />

        <Divider />

        <SLabel>Cirurgias realizadas</SLabel>
        <ChipSelector
            items={CIRURGIAS}
            selected={cirurgias}
            onToggle={i => setCirurgias(toggle(cirurgias, i))}
        />

        <Divider />

        <SLabel>Lesões ou dores atuais</SLabel>
        <ChipSelector
            items={LESOES}
            selected={lesoes}
            onToggle={i => setLesoes(toggle(lesoes, i))}
        />

        <Divider />

        <YesNo
            label="Faz uso de medicamentos contínuos?"
            val={medicamentos}
            onChange={setMedicamentos}
        />
        {medicamentos === 'sim' && (
            <Field>
                <FieldLabel>Quais medicamentos?</FieldLabel>
                <Textarea
                    placeholder="Ex: Metformina 500mg, Losartana 25mg..."
                    value={medicDesc}
                    onChange={e => setMedicDesc(e.target.value)}
                />
            </Field>
        )}

        <YesNo
            label="Histórico familiar de cardiopatia antes dos 50 anos?"
            val={histFamiliar}
            onChange={setHistFamiliar}
        />

        <Field>
            <FieldLabel>Último exame médico / data</FieldLabel>
            <Input type="date" />
        </Field>

        <Field>
            <FieldLabel>Observações médicas adicionais</FieldLabel>
            <Textarea placeholder="Restrições, laudos, diagnósticos relevantes..." />
        </Field>

        <BtnRow>
            <Btn $variant="ghost" onClick={onPrev}>← Voltar</Btn>
            <Btn $variant="primary" onClick={onNext}>Continuar →</Btn>
        </BtnRow>
    </Body>
);

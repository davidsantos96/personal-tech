import { useState } from 'react';
import { useSaveAction } from '../hooks/useSaveAction';
import {
    Topbar,
    BackButton,
    TopbarTitle,
    TopbarAction,
    ScrollPane,
    SectionBody,
    Field,
    FieldLabel,
    FieldInput,
    FieldSelect,
    Row2,
    Chips,
    Chip,
    DaysGrid,
    DayButton,
    TimeRow,
    TimeSep,
    TimeInput,
    SummaryCard,
    SectionLabel,
    SummaryText,
    OrangeText,
} from '../styles';

const DIAS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

const ChevronLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
);

interface HorariosScreenProps {
    onBack: () => void;
}

export const HorariosScreen = ({ onBack }: HorariosScreenProps) => {
    const [dias, setDias] = useState(['Seg', 'Ter', 'Qua', 'Qui', 'Sex']);
    const [inicio, setInicio] = useState('07:00');
    const [fim, setFim] = useState('19:00');
    const [duracao, setDuracao] = useState('60');
    const [maxAl, setMaxAl] = useState('12');
    const [valor, setValor] = useState('150');
    const [local, setLocal] = useState(['Presencial']);
    const [interv, setInterv] = useState('Sem intervalo');
    const { save, label, saved } = useSaveAction();

    const toggleDia = (d: string) => setDias(p => p.includes(d) ? p.filter(x => x !== d) : [...p, d]);
    const toggleLocal = (l: string) => setLocal(p => p.includes(l) ? p.filter(x => x !== l) : [...p, l]);

    return (
        <>
            <Topbar>
                <BackButton onClick={onBack}><ChevronLeftIcon /></BackButton>
                <TopbarTitle>Horários & Atendimento</TopbarTitle>
                <TopbarAction $saved={saved} onClick={save}>{label}</TopbarAction>
            </Topbar>
            <ScrollPane>
                <SectionBody>
                    <Field>
                        <FieldLabel>Dias disponíveis</FieldLabel>
                        <DaysGrid>
                            {DIAS.map(d => (
                                <DayButton key={d} $active={dias.includes(d)} onClick={() => toggleDia(d)}>{d}</DayButton>
                            ))}
                        </DaysGrid>
                    </Field>

                    <Field>
                        <FieldLabel>Horário de funcionamento</FieldLabel>
                        <TimeRow>
                            <TimeInput type="time" value={inicio} onChange={e => setInicio(e.target.value)} />
                            <TimeSep>até</TimeSep>
                            <TimeInput type="time" value={fim} onChange={e => setFim(e.target.value)} />
                        </TimeRow>
                    </Field>

                    <Row2>
                        <Field>
                            <FieldLabel>Duração padrão</FieldLabel>
                            <FieldSelect value={duracao} onChange={e => setDuracao(e.target.value)}>
                                {['30', '45', '60', '75', '90', '120'].map(v => <option key={v}>{v} min</option>)}
                            </FieldSelect>
                        </Field>
                        <Field>
                            <FieldLabel>Máx. alunos/dia</FieldLabel>
                            <FieldSelect value={maxAl} onChange={e => setMaxAl(e.target.value)}>
                                {['4', '6', '8', '10', '12', '15', '20'].map(v => <option key={v}>{v}</option>)}
                            </FieldSelect>
                        </Field>
                    </Row2>

                    <Field>
                        <FieldLabel>Modalidade</FieldLabel>
                        <Chips>
                            {['Presencial', 'Online', 'Híbrido'].map(l => (
                                <Chip key={l} $active={local.includes(l)} onClick={() => toggleLocal(l)}>{l}</Chip>
                            ))}
                        </Chips>
                    </Field>

                    <Row2>
                        <Field>
                            <FieldLabel>Valor por sessão (R$)</FieldLabel>
                            <FieldInput type="number" value={valor} onChange={e => setValor(e.target.value)} />
                        </Field>
                        <Field>
                            <FieldLabel>Intervalo entre sessões</FieldLabel>
                            <FieldSelect value={interv} onChange={e => setInterv(e.target.value)}>
                                {['Sem intervalo', '10 min', '15 min', '30 min'].map(v => <option key={v}>{v}</option>)}
                            </FieldSelect>
                        </Field>
                    </Row2>

                    {/* Preview */}
                    <SummaryCard>
                        <SectionLabel style={{ marginBottom: 8 }}>Resumo</SectionLabel>
                        <SummaryText>
                            <OrangeText>{dias.join(', ') || 'Nenhum dia'}</OrangeText><br />
                            {inicio} às {fim} · {duracao} min · {interv.toLowerCase()}<br />
                            Até <OrangeText>{maxAl} alunos</OrangeText>/dia · R$ {valor}/sessão
                        </SummaryText>
                    </SummaryCard>
                </SectionBody>
            </ScrollPane>
        </>
    );
};

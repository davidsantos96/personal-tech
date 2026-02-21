import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { YNVal } from '../../../components/avaliacao';
import { STEPS } from './constants';
import { ChevronLeftIcon } from './ChevronLeftIcon';
import { StepParq } from './steps/StepParq';
import { StepHistorico } from './steps/StepHistorico';
import { StepHabitos } from './steps/StepHabitos';
import { StepObjetivos } from './steps/StepObjetivos';
import { StepRevisao } from './steps/StepRevisao';
import {
    Container,
    Header,
    BackButton,
    HeaderCenter,
    PageTitle,
    PageSubtitle,
    StepCounter,
    StepBar,
    StepItem,
    StepCircle,
    StepName,
} from './styles';

export const Anamnese = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [consent, setConsent] = useState(false);

    /* PAR-Q */
    const [parq, setParq] = useState<YNVal[]>(Array(7).fill(null));

    /* Histórico */
    const [doencas, setDoencas] = useState<string[]>([]);
    const [cirurgias, setCirurgias] = useState<string[]>([]);
    const [lesoes, setLesoes] = useState<string[]>([]);
    const [medicamentos, setMedicamentos] = useState<YNVal>(null);
    const [medicDesc, setMedicDesc] = useState('');
    const [histFamiliar, setHistFamiliar] = useState<YNVal>(null);

    /* Hábitos */
    const [nivelAtual, setNivelAtual] = useState<string | null>(null);
    const [sono, setSono] = useState<number | null>(null);
    const [estresse, setEstresse] = useState<string | null>(null);
    const [fumo, setFumo] = useState<YNVal>(null);
    const [alcool, setAlcool] = useState<YNVal>(null);
    const [alimentacao, setAlimentacao] = useState<string | null>(null);

    /* Objetivos */
    const [objetivos, setObjetivos] = useState<string[]>([]);
    const [modalidades, setModalidades] = useState<string[]>([]);
    const [restricoes, setRestricoes] = useState('');
    const [expectativas, setExpectativas] = useState('');

    /* Navigation */
    const next = () => setStep(s => Math.min(s + 1, 4));
    const prev = () => setStep(s => Math.max(s - 1, 0));
    const setParqAt = (i: number, v: 'sim' | 'nao') =>
        setParq(p => { const n = [...p]; n[i] = v; return n; });

    const stepState = (i: number) =>
        i < step ? 'done' : i === step ? 'active' : 'pending';

    return (
        <Container>
            {/* ── Header ── */}
            <Header>
                <BackButton onClick={() => navigate(-1)} aria-label="Voltar">
                    <ChevronLeftIcon />
                </BackButton>
                <HeaderCenter>
                    <PageTitle>Anamnese</PageTitle>
                    <PageSubtitle>Carlos Silva • Novo cadastro</PageSubtitle>
                </HeaderCenter>
                <StepCounter>{step + 1}/{STEPS.length}</StepCounter>
            </Header>

            {/* ── Step bar ── */}
            <StepBar>
                {STEPS.map((s, i) => (
                    <StepItem key={s} $state={stepState(i)}>
                        <StepCircle $state={stepState(i)}>
                            {i < step ? '✓' : i + 1}
                        </StepCircle>
                        <StepName $state={stepState(i)}>{s}</StepName>
                    </StepItem>
                ))}
            </StepBar>

            {/* ── Steps ── */}
            {step === 0 && (
                <StepParq
                    parq={parq}
                    onParqChange={setParqAt}
                    consent={consent}
                    onConsentToggle={() => setConsent(c => !c)}
                    onNext={next}
                />
            )}

            {step === 1 && (
                <StepHistorico
                    doencas={doencas} setDoencas={setDoencas}
                    cirurgias={cirurgias} setCirurgias={setCirurgias}
                    lesoes={lesoes} setLesoes={setLesoes}
                    medicamentos={medicamentos} setMedicamentos={setMedicamentos}
                    medicDesc={medicDesc} setMedicDesc={setMedicDesc}
                    histFamiliar={histFamiliar} setHistFamiliar={setHistFamiliar}
                    onPrev={prev} onNext={next}
                />
            )}

            {step === 2 && (
                <StepHabitos
                    nivelAtual={nivelAtual} setNivelAtual={setNivelAtual}
                    sono={sono} setSono={setSono}
                    estresse={estresse} setEstresse={setEstresse}
                    fumo={fumo} setFumo={setFumo}
                    alcool={alcool} setAlcool={setAlcool}
                    alimentacao={alimentacao} setAlimentacao={setAlimentacao}
                    onPrev={prev} onNext={next}
                />
            )}

            {step === 3 && (
                <StepObjetivos
                    objetivos={objetivos} setObjetivos={setObjetivos}
                    modalidades={modalidades} setModalidades={setModalidades}
                    restricoes={restricoes} setRestricoes={setRestricoes}
                    expectativas={expectativas} setExpectativas={setExpectativas}
                    onPrev={prev} onNext={next}
                />
            )}

            {step === 4 && (
                <StepRevisao
                    parq={parq}
                    doencas={doencas}
                    cirurgias={cirurgias}
                    lesoes={lesoes}
                    medicamentos={medicamentos}
                    medicDesc={medicDesc}
                    nivelAtual={nivelAtual}
                    alimentacao={alimentacao}
                    estresse={estresse}
                    objetivos={objetivos}
                    modalidades={modalidades}
                    onPrev={prev}
                    onSave={() => navigate(-1)}
                />
            )}
        </Container>
    );
};

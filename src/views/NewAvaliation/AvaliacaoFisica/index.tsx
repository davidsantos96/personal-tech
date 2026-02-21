import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon } from '../Anamnese/ChevronLeftIcon';
import { TABS, DOBRAS_MASC, DOBRAS_FEM } from './constants';
import { TabGeral } from './tabs/TabGeral';
import { TabDobras } from './tabs/TabDobras';
import { TabCircunferencias } from './tabs/TabCircunferencias';
import { TabResultado } from './tabs/TabResultado';
import {
    Container,
    Header,
    HeaderLeft,
    BackButton,
    PageTitle,
    PageSubtitle,
    ProtoBadge,
    TabBar,
    TabPill,
} from './styles';

export const AvaliacaoFisica = () => {
    const navigate = useNavigate();
    const [tab, setTab] = useState(0);
    const [sexo, setSexo] = useState('M');
    const [idade, setIdade] = useState('');
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [pa, setPa] = useState('');
    const [fc, setFc] = useState('');
    const [obs, setObs] = useState('');

    const dobrasList = sexo === 'M' ? DOBRAS_MASC : DOBRAS_FEM;
    const [dobras, setDobras] = useState<Record<string, string>>({});
    const [circunf, setCircunf] = useState<Record<string, string>>({});

    const setDobra = (k: string, v: string) => setDobras(p => ({ ...p, [k]: v }));
    const setCirc = (k: string, v: string) => setCircunf(p => ({ ...p, [k]: v }));

    const soma7 = dobrasList.reduce((acc, d) => acc + (parseFloat(dobras[d.key]) || 0), 0);
    const dobrasFilled = dobrasList.filter(d => dobras[d.key]).length;

    return (
        <Container>
            {/* ── Header ── */}
            <Header>
                <HeaderLeft>
                    <BackButton onClick={() => navigate(-1)} aria-label="Voltar">
                        <ChevronLeftIcon />
                    </BackButton>
                    <div>
                        <PageTitle>Avaliação Física</PageTitle>
                        <PageSubtitle>Carlos Silva • 18 Fev 2026</PageSubtitle>
                    </div>
                </HeaderLeft>
                <ProtoBadge>📐 Pollock 7</ProtoBadge>
            </Header>

            {/* ── Tab bar ── */}
            <TabBar>
                {TABS.map((t, i) => (
                    <TabPill key={t} $active={tab === i} onClick={() => setTab(i)}>
                        {i === 1 ? `Dobras ${dobrasFilled > 0 ? `(${dobrasFilled}/7)` : ''}` : t}
                    </TabPill>
                ))}
            </TabBar>

            {/* ── Tabs ── */}
            {tab === 0 && (
                <TabGeral
                    sexo={sexo} setSexo={setSexo}
                    idade={idade} setIdade={setIdade}
                    peso={peso} setPeso={setPeso}
                    altura={altura} setAltura={setAltura}
                    pa={pa} setPa={setPa}
                    fc={fc} setFc={setFc}
                    obs={obs} setObs={setObs}
                    onResetDobras={() => setDobras({})}
                    onNext={() => setTab(1)}
                />
            )}

            {tab === 1 && (
                <TabDobras
                    dobrasList={dobrasList}
                    dobras={dobras}
                    onDobraChange={setDobra}
                    soma7={soma7}
                    onPrev={() => setTab(0)}
                    onNext={() => setTab(2)}
                />
            )}

            {tab === 2 && (
                <TabCircunferencias
                    sexo={sexo}
                    circunf={circunf}
                    onCircChange={setCirc}
                    onPrev={() => setTab(1)}
                    onNext={() => setTab(3)}
                />
            )}

            {tab === 3 && (
                <TabResultado
                    sexo={sexo}
                    idade={idade}
                    peso={peso}
                    altura={altura}
                    pa={pa}
                    fc={fc}
                    dobrasList={dobrasList}
                    dobras={dobras}
                    circunf={circunf}
                    onSave={() => navigate(-1)}
                />
            )}
        </Container>
    );
};

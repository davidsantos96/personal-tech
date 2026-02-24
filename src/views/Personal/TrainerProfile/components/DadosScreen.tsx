import { useState } from 'react';
import { useSaveAction } from '../hooks/useSaveAction';
import {
    Topbar,
    BackButton,
    TopbarTitle,
    TopbarAction,
    ScrollPane,
    SectionBody,
    AvatarRing,
    AvatarInner,
    AvatarCamOverlay,
    Field,
    FieldLabel,
    FieldInput,
    FieldSelect,
    FieldTextarea,
    Row2,
    Chips,
    Chip,
} from '../styles';

const ESPECIALIDADES = [
    'Musculação', 'Pilates', 'Funcional', 'HIIT', 'Mobilidade',
    'Cardio', 'Emagrecimento', 'Reabilitação', 'Idosos', 'Esportivo',
];

const ChevronLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
);

interface DadosScreenProps {
    onBack: () => void;
}

export const DadosScreen = ({ onBack }: DadosScreenProps) => {
    const [nome, setNome] = useState('Coach Silva');
    const [cref, setCref] = useState('012345-G/SP');
    const [tel, setTel] = useState('(11) 99999-0000');
    const [email, setEmail] = useState('coach@personaltech.app');
    const [bio, setBio] = useState('Personal trainer há 8 anos, especializado em hipertrofia e reabilitação funcional.');
    const [esp, setEsp] = useState(['Musculação', 'Funcional', 'Reabilitação']);
    const { save, label, saved } = useSaveAction();

    const toggleEsp = (e: string) => setEsp(p => p.includes(e) ? p.filter(x => x !== e) : [...p, e]);

    return (
        <>
            <Topbar>
                <BackButton onClick={onBack}><ChevronLeftIcon /></BackButton>
                <TopbarTitle>Dados Profissionais</TopbarTitle>
                <TopbarAction $saved={saved} onClick={save}>{label}</TopbarAction>
            </Topbar>
            <ScrollPane>
                <SectionBody>
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '4px 0 8px' }}>
                        <AvatarRing style={{ width: 72, height: 72 }}>
                            <AvatarInner style={{ fontSize: 28 }}>
                                💪
                                <AvatarCamOverlay>📷</AvatarCamOverlay>
                            </AvatarInner>
                        </AvatarRing>
                    </div>

                    <Row2>
                        <Field>
                            <FieldLabel>Nome completo</FieldLabel>
                            <FieldInput value={nome} onChange={e => setNome(e.target.value)} />
                        </Field>
                        <Field>
                            <FieldLabel>CREF</FieldLabel>
                            <FieldInput value={cref} onChange={e => setCref(e.target.value)} />
                        </Field>
                    </Row2>

                    <Row2>
                        <Field>
                            <FieldLabel>E-mail</FieldLabel>
                            <FieldInput type="email" value={email} onChange={e => setEmail(e.target.value)} />
                        </Field>
                        <Field>
                            <FieldLabel>WhatsApp</FieldLabel>
                            <FieldInput value={tel} onChange={e => setTel(e.target.value)} />
                        </Field>
                    </Row2>

                    <Field>
                        <FieldLabel>Cidade / Estado</FieldLabel>
                        <FieldSelect>
                            <option>São Paulo, SP</option>
                            <option>Rio de Janeiro, RJ</option>
                            <option>Outra</option>
                        </FieldSelect>
                    </Field>

                    <Field>
                        <FieldLabel>Bio profissional</FieldLabel>
                        <FieldTextarea value={bio} onChange={e => setBio(e.target.value)} />
                    </Field>

                    <Field>
                        <FieldLabel>Especialidades</FieldLabel>
                        <Chips style={{ marginTop: 4 }}>
                            {ESPECIALIDADES.map(e => (
                                <Chip key={e} $active={esp.includes(e)} onClick={() => toggleEsp(e)}>{e}</Chip>
                            ))}
                        </Chips>
                    </Field>
                </SectionBody>
            </ScrollPane>
        </>
    );
};

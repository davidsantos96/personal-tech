import { useState, useEffect } from 'react';
import { useSaveAction } from '../hooks/useSaveAction';
import { fetchTrainerProfile, updateTrainerProfile } from '../../../../services/trainerService';
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
    const [nome, setNome] = useState('');
    const [cref, setCref] = useState('');
    const [tel, setTel] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [esp, setEsp] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const { save, label, saved } = useSaveAction();

    useEffect(() => {
        fetchTrainerProfile().then(profile => {
            if (profile) {
                setNome(profile.fullName || '');
                setEmail(profile.email || '');
                setTel(profile.phone || '');
                if (profile.specialty) {
                    setEsp(profile.specialty.split(',').map(s => s.trim()).filter(Boolean));
                }
            }
            setLoading(false);
        });
    }, []);

    const toggleEsp = (e: string) => setEsp(p => p.includes(e) ? p.filter(x => x !== e) : [...p, e]);

    const handleSave = async () => {
        try {
            await updateTrainerProfile({
                fullName: nome,
                email,
                phone: tel || null,
                specialty: esp.join(', ') || null,
            });
            save();
        } catch (err) {
            console.error('Erro ao salvar:', err);
        }
    };

    if (loading) {
        return (
            <>
                <Topbar>
                    <BackButton onClick={onBack}><ChevronLeftIcon /></BackButton>
                    <TopbarTitle>Dados Profissionais</TopbarTitle>
                </Topbar>
                <ScrollPane>
                    <div style={{ padding: 20, textAlign: 'center', color: '#94a3b8' }}>Carregando...</div>
                </ScrollPane>
            </>
        );
    }

    return (
        <>
            <Topbar>
                <BackButton onClick={onBack}><ChevronLeftIcon /></BackButton>
                <TopbarTitle>Dados Profissionais</TopbarTitle>
                <TopbarAction $saved={saved} onClick={handleSave}>{label}</TopbarAction>
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
                            <FieldInput value={cref} onChange={e => setCref(e.target.value)} placeholder="Seu CREF" />
                        </Field>
                    </Row2>

                    <Row2>
                        <Field>
                            <FieldLabel>E-mail</FieldLabel>
                            <FieldInput type="email" value={email} onChange={e => setEmail(e.target.value)} />
                        </Field>
                        <Field>
                            <FieldLabel>WhatsApp</FieldLabel>
                            <FieldInput value={tel} onChange={e => setTel(e.target.value)} placeholder="(00) 00000-0000" />
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
                        <FieldTextarea value={bio} onChange={e => setBio(e.target.value)} placeholder="Conte um pouco sobre você..." />
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

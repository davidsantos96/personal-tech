import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Header,
    BackButton,
    PageTitle,
    Spacer,
    PhotoSection,
    PhotoUploadButton,
    PhotoPreview,
    PhotoLabel,
    EditBadge,
    PhotoHint,
    FormSection,
    SectionTitle,
    FieldGroup,
    FieldRow,
    Label,
    Input,
    InputSuffix,
    Select,
    SaveButton,
} from './styles';

/* ── Icons ── */
const ChevronLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
);

const CameraIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
    </svg>
);

const PencilIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487z" />
    </svg>
);

const UserPlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
    </svg>
);

const GOALS = [
    'Hipertrofia',
    'Emagrecimento',
    'Condicionamento',
    'Flexibilidade',
    'Reabilitação',
    'Saúde Geral',
];

interface FormData {
    name: string;
    email: string;
    phone: string;
    birthDate: string;
    weight: string;
    height: string;
    goal: string;
}

const INITIAL_FORM: FormData = {
    name: '',
    email: '',
    phone: '',
    birthDate: '',
    weight: '',
    height: '',
    goal: '',
};

export const NewStudent = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [form, setForm] = useState<FormData>(INITIAL_FORM);
    const [photoUrl, setPhotoUrl] = useState<string | null>(null);

    const handleChange = (field: keyof FormData) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setForm(prev => ({ ...prev, [field]: e.target.value }));
    };

    const handlePhotoClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const url = URL.createObjectURL(file);
        setPhotoUrl(url);
    };

    const isValid = form.name.trim().length > 0 && form.email.trim().length > 0;

    const handleSave = () => {
        if (!isValid) return;
        // TODO: persist to store/backend
        navigate('/alunos');
    };

    return (
        <Container>
            {/* ── Header ── */}
            <Header>
                <BackButton onClick={() => navigate(-1)} aria-label="Voltar">
                    <ChevronLeftIcon />
                </BackButton>
                <PageTitle>Novo Aluno</PageTitle>
                <Spacer />
            </Header>

            {/* ── Photo ── */}
            <PhotoSection>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />

                {photoUrl ? (
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                        <PhotoPreview src={photoUrl} alt="Foto do aluno" />
                        <EditBadge onClick={handlePhotoClick} style={{ cursor: 'pointer' }}>
                            <PencilIcon />
                        </EditBadge>
                    </div>
                ) : (
                    <PhotoUploadButton type="button" onClick={handlePhotoClick} aria-label="Adicionar foto">
                        <CameraIcon />
                        <PhotoLabel>Add Photo</PhotoLabel>
                        <EditBadge>
                            <PencilIcon />
                        </EditBadge>
                    </PhotoUploadButton>
                )}

                <PhotoHint>Toque para enviar uma foto de perfil para o novo aluno</PhotoHint>
            </PhotoSection>

            {/* ── Form ── */}
            <FormSection>

                {/* Personal Information */}
                <SectionTitle>Informações Pessoais</SectionTitle>

                <FieldGroup>
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input
                        id="name"
                        type="text"
                        placeholder="João Silva"
                        value={form.name}
                        onChange={handleChange('name')}
                    />
                </FieldGroup>

                <FieldGroup>
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="joao@exemplo.com"
                        value={form.email}
                        onChange={handleChange('email')}
                    />
                </FieldGroup>

                <FieldRow>
                    <FieldGroup style={{ flex: 1 }}>
                        <Label htmlFor="phone">Telefone</Label>
                        <Input
                            id="phone"
                            type="tel"
                            placeholder="+55 (11) 9 0000-0000"
                            value={form.phone}
                            onChange={handleChange('phone')}
                        />
                    </FieldGroup>

                    <FieldGroup style={{ flex: 1 }}>
                        <Label htmlFor="birthDate">Data de Nasc.</Label>
                        <Input
                            id="birthDate"
                            type="date"
                            value={form.birthDate}
                            onChange={handleChange('birthDate')}
                        />
                    </FieldGroup>
                </FieldRow>

                {/* Biometrics & Goals */}
                <SectionTitle>Biometria &amp; Objetivos</SectionTitle>

                <FieldRow>
                    <FieldGroup style={{ flex: 1 }}>
                        <Label htmlFor="weight">Peso (kg)</Label>
                        <InputSuffix>
                            <Input
                                id="weight"
                                type="number"
                                min="0"
                                step="0.1"
                                placeholder="0.0"
                                value={form.weight}
                                onChange={handleChange('weight')}
                            />
                            <span>kg</span>
                        </InputSuffix>
                    </FieldGroup>

                    <FieldGroup style={{ flex: 1 }}>
                        <Label htmlFor="height">Altura (cm)</Label>
                        <InputSuffix>
                            <Input
                                id="height"
                                type="number"
                                min="0"
                                placeholder="0"
                                value={form.height}
                                onChange={handleChange('height')}
                            />
                            <span>cm</span>
                        </InputSuffix>
                    </FieldGroup>
                </FieldRow>

                <FieldGroup>
                    <Label htmlFor="goal">Objetivo Principal</Label>
                    <Select
                        id="goal"
                        value={form.goal}
                        onChange={handleChange('goal')}
                    >
                        <option value="" disabled>Selecione um objetivo</option>
                        {GOALS.map(g => (
                            <option key={g} value={g}>{g}</option>
                        ))}
                    </Select>
                </FieldGroup>

            </FormSection>

            {/* ── Save Button ── */}
            <SaveButton onClick={handleSave} disabled={!isValid}>
                <UserPlusIcon />
                Salvar Aluno
            </SaveButton>
        </Container>
    );
};

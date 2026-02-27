import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSupabase } from '../../../lib/supabase';
import { useAuth } from '../../../contexts/AuthContext';
import {
    AuthContainer,
    AuthCard,
    AuthTitle,
    AuthSubtitle,
    Form,
    InputGroup,
    Label,
    Input,
    SubmitButton,
    ToggleButton,
    ErrorMessage
} from './styles';

export const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { isMockMode } = useAuth(); // Avoid real connection if no env

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isMockMode) {
            navigate('/');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const supabase = await getSupabase();

            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password
                });
                if (error) throw error;
            } else {
                const { error: signUpError, data } = await supabase.auth.signUp({
                    email,
                    password
                });
                if (signUpError) throw signUpError;

                // After signup, insert into trainers
                if (data.user) {
                    const { error: insertError } = await supabase.from('trainers').insert({
                        auth_id: data.user.id,
                        email: data.user.email || '',
                        full_name: fullName,
                        phone: null,
                        avatar_url: null,
                        specialty: null,
                    });
                    if (insertError) {
                        console.error("Trainer hook failed:", insertError);
                        // Informally fallback but keep session
                    }
                }
            }

            navigate('/');
        } catch (err: any) {
            setError(err.message || 'Erro ao autenticar. Verifique seus dados.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContainer>
            <AuthCard>
                <AuthTitle>Personal Tech</AuthTitle>
                <AuthSubtitle>
                    {isLogin ? 'Faça login na sua conta' : 'Crie sua conta de Personal'}
                </AuthSubtitle>

                {error && <ErrorMessage>{error}</ErrorMessage>}

                <Form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <InputGroup>
                            <Label>Nome Completo</Label>
                            <Input
                                type="text"
                                value={fullName}
                                onChange={e => setFullName(e.target.value)}
                                placeholder="Seu nome completo"
                                required={!isLogin}
                            />
                        </InputGroup>
                    )}

                    <InputGroup>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="seu@personal.com"
                            required
                        />
                    </InputGroup>

                    <InputGroup>
                        <Label>Senha</Label>
                        <Input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            minLength={6}
                        />
                    </InputGroup>

                    <SubmitButton type="submit" disabled={loading}>
                        {loading ? 'Carregando...' : (isLogin ? 'Entrar' : 'Cadastrar')}
                    </SubmitButton>

                    <ToggleButton type="button" onClick={() => setIsLogin(!isLogin)}>
                        {isLogin
                            ? 'Não tem uma conta? Cadastre-se'
                            : 'Já tem conta? Faça login'}
                    </ToggleButton>
                </Form>
            </AuthCard>
        </AuthContainer>
    );
};

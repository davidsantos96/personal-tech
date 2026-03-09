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
                // ── LOGIN ──
                const { error, data } = await supabase.auth.signInWithPassword({
                    email,
                    password
                });
                if (error) throw error;

                // Ensure trainer record exists (may be missing if signup insert failed)
                if (data.user) {
                    await ensureTrainerExists(supabase, data.user);
                }
            } else {
                // ── SIGNUP ──
                // Store fullName in user_metadata so we can recover it after email confirmation
                const { error: signUpError, data } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: { full_name: fullName }
                    }
                });
                if (signUpError) throw signUpError;

                // Try to insert trainer row now (works if email confirmation is disabled)
                if (data.user) {
                    await ensureTrainerExists(supabase, data.user, fullName);
                }

                // If email confirmation is required, inform the user
                if (data.user && !data.session) {
                    setError('');
                    setLoading(false);
                    alert('Conta criada! Verifique seu email para confirmar e depois faça login.');
                    setIsLogin(true);
                    return;
                }
            }

            navigate('/');
        } catch (err: any) {
            setError(err.message || 'Erro ao autenticar. Verifique seus dados.');
        } finally {
            setLoading(false);
        }
    };

    /**
     * Ensure a trainer record exists for the authenticated user.
     * If not, create one using the provided name or the name from user_metadata.
     */
    const ensureTrainerExists = async (supabase: any, user: any, nameOverride?: string) => {
        try {
            // Check if trainer already exists
            const { data: existing } = await supabase
                .from('trainers')
                .select('id')
                .eq('auth_id', user.id)
                .maybeSingle();

            if (existing) return; // Already exists

            // Get the name from: 1) explicit param, 2) user_metadata, 3) email prefix
            const name = nameOverride
                || user.user_metadata?.full_name
                || user.email?.split('@')[0]
                || 'Personal';

            const { error: insertError } = await supabase.from('trainers').insert({
                auth_id: user.id,
                email: user.email || '',
                full_name: name,
                phone: null,
                avatar_url: null,
                specialty: null,
            });

            if (insertError) {
                console.error('[Login] Trainer insert failed:', insertError);
            }
        } catch (err) {
            console.error('[Login] ensureTrainerExists error:', err);
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

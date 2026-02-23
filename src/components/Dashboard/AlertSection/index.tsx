import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../../../hooks/useNotifications';
import { ActionButton, AlertCard, AlertContent, AlertDescription, AlertIconBox, AlertList, AlertTitle, AlertsSection, Title } from './styles';

export const AlertSection = () => {
    const navigate = useNavigate();
    const { notifications } = useNotifications();

    if (notifications.length === 0) return null;

    return (
        <AlertsSection>
            <Title>Atenção Necessária</Title>
            <AlertList>
                {notifications.map(n => (
                    <AlertCard key={n.id} $bgColor={n.color.bg} $borderColor={n.color.border}>
                        <AlertIconBox $bgColor={`${n.color.accent}1a`}>
                            <span
                                className="material-symbols-outlined"
                                style={{ fontSize: '20px', color: n.color.accent }}
                            >
                                {n.icon}
                            </span>
                        </AlertIconBox>
                        <AlertContent>
                            <AlertTitle>{n.title}</AlertTitle>
                            <AlertDescription
                                $color={n.color.textMuted}
                                dangerouslySetInnerHTML={{ __html: n.description }}
                            />
                        </AlertContent>
                        <ActionButton
                            $bgColor={`${n.color.accent}1a`}
                            $textColor={n.color.accent}
                            $hoverColor={`${n.color.accent}33`}
                            onClick={() => navigate(`/perfil-aluno/${n.studentId}`)}
                        >
                            {n.type === 'plano_vencido' || n.type === 'plano_vencendo' ? 'Renovar' :
                             n.type === 'treino_vencendo' ? 'Resolver' :
                             'Ver'}
                        </ActionButton>
                    </AlertCard>
                ))}
            </AlertList>
        </AlertsSection>
    );
};

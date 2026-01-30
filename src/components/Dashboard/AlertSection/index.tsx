import { ActionButton, AlertCard, AlertContent, AlertDescription, AlertIconBox, AlertList, AlertTitle, AlertsSection, Title } from './styles';

export const AlertSection = () => {
    return (
        <AlertsSection>
            <Title>Atenção Necessária</Title>
            <AlertList>
                {/* Atualizar Treino */}
                <AlertCard $bgColor="#2A1818" $borderColor="rgba(239, 68, 68, 0.2)">
                    <AlertIconBox $bgColor="rgba(239, 68, 68, 0.1)">
                        <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#EF4444' }}>warning</span>
                    </AlertIconBox>
                    <AlertContent>
                        <AlertTitle>Atualizar Treino</AlertTitle>
                        <AlertDescription $color="rgba(254, 202, 202, 0.6)">
                            O plano de treino de <strong>Pedro Santos</strong> vence amanhã. Crie a nova série.
                        </AlertDescription>
                    </AlertContent>
                    <ActionButton
                        $bgColor="rgba(239, 68, 68, 0.1)"
                        $textColor="#F87171"
                        $hoverColor="rgba(239, 68, 68, 0.2)"
                    >
                        Resolver
                    </ActionButton>
                </AlertCard>

                {/* Avaliação Física */}
                <AlertCard $bgColor="#282516" $borderColor="rgba(234, 179, 8, 0.2)">
                    <AlertIconBox $bgColor="rgba(234, 179, 8, 0.1)">
                        <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#EAB308' }}>pending_actions</span>
                    </AlertIconBox>
                    <AlertContent>
                        <AlertTitle>Avaliação Física</AlertTitle>
                        <AlertDescription $color="rgba(254, 240, 138, 0.6)">
                            Mariana solicitou reagendamento da avaliação para Sexta-feira.
                        </AlertDescription>
                    </AlertContent>
                    <ActionButton
                        $bgColor="rgba(234, 179, 8, 0.1)"
                        $textColor="#FACC15"
                        $hoverColor="rgba(234, 179, 8, 0.2)"
                    >
                        Ver
                    </ActionButton>
                </AlertCard>
            </AlertList>
        </AlertsSection>
    );
};

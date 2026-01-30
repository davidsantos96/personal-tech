import { StatsSection, Card, CardHeader, IconBox, Badge, CardLabel, CardValue } from './styles';

export const StatsCards = () => {
    return (
        <StatsSection>
            <Card>
                <CardHeader>
                    <IconBox>
                        <span className="material-symbols-outlined" style={{ fontSize: '24px', color: '#FF6D00' }}>groups</span>
                    </IconBox>
                    <Badge $variant="primary">+2%</Badge>
                </CardHeader>
                <div>
                    <CardLabel>Alunos Ativos</CardLabel>
                    <CardValue>24</CardValue>
                </div>
            </Card>

            <Card>
                <CardHeader>
                    <IconBox>
                        <span className="material-symbols-outlined" style={{ fontSize: '24px', color: '#FF6D00' }}>fitness_center</span>
                    </IconBox>
                    <Badge $variant="neutral">Hoje</Badge>
                </CardHeader>
                <div>
                    <CardLabel>Treinos Hoje</CardLabel>
                    <CardValue>05</CardValue>
                </div>
            </Card>
        </StatsSection>
    );
};

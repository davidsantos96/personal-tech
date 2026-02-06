import { useNavigate } from 'react-router-dom';
import {
    Container,
    Header,
    IconButton,
    PageTitle,
    ProfileSection,
    AvatarWrapper,
    Avatar,
    EditBadge,
    StudentName,
    TagsRow,
    GoalTag,
    ActiveTime,
    SectionTitle,
    ViewAllLink,
    StatsGrid,
    StatCard,
    StatLabel,
    StatValue,
    StatTrend,
    HistoryList,
    HistoryItem,
    HistoryIconBox,
    HistoryContent,
    HistoryTitle,
    HistorySubtitle,
    GoalCard,
    GoalHeader,
    GoalText,
    BottomActions,
    PrimaryButton,
    SecondaryButton
} from './styles';

// Icons
const ChevronLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
);

const DotsVerticalIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
    </svg>
);

const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </svg>
);

const ChevronRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
);

const DumbbellIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
         <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M3 18h18M8 6v12M16 6v12" />
    </svg>
);

const RunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
);

const LampIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
        {/* Simplified bulb/idea icon approximation since we are using basic svgs */}
    </svg>
);

const PlayIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
    </svg>
);

const EditNoteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
);


export const StudentProfile = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <Header>
                <IconButton onClick={() => navigate(-1)} aria-label="Voltar">
                    <ChevronLeftIcon />
                </IconButton>
                <PageTitle>Perfil do Aluno</PageTitle>
                <IconButton aria-label="Mais opções">
                    <DotsVerticalIcon />
                </IconButton>
            </Header>

            <ProfileSection>
                <AvatarWrapper>
                    <Avatar src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="João Victor Silva" />
                    <EditBadge>
                        <EditIcon />
                    </EditBadge>
                </AvatarWrapper>
                <StudentName>João Victor Silva</StudentName>
                <TagsRow>
                    <GoalTag>HIPERTROFIA</GoalTag>
                    <ActiveTime>• Ativo há 6 meses</ActiveTime>
                </TagsRow>
            </ProfileSection>

            <SectionTitle>ESTATÍSTICAS RÁPIDAS</SectionTitle>
            <StatsGrid>
                <StatCard>
                    <StatLabel>Peso</StatLabel>
                    <StatValue>85.4 <small>kg</small></StatValue>
                    <StatTrend $positive>↘ -1.2kg</StatTrend>
                </StatCard>
                <StatCard>
                    <StatLabel>BF%</StatLabel>
                    <StatValue>14.2 <small>%</small></StatValue>
                    <StatTrend $positive>↘ -0.5%</StatTrend>
                </StatCard>
                <StatCard>
                    <StatLabel>Treinos/Mês</StatLabel>
                    <StatValue>18</StatValue>
                    <StatTrend>↑ +2</StatTrend> {/* Default color or make yellow logic if needed */}
                </StatCard>
            </StatsGrid>

            <SectionTitle>
                HISTÓRICO DE TREINOS
                <ViewAllLink>Ver todos</ViewAllLink>
            </SectionTitle>
            <HistoryList>
                <HistoryItem>
                    <HistoryIconBox>
                        <DumbbellIcon />
                    </HistoryIconBox>
                    <HistoryContent>
                        <HistoryTitle>Treino A - Superiores</HistoryTitle>
                        <HistorySubtitle>Ontem • 52 min • 420 kcal</HistorySubtitle>
                    </HistoryContent>
                    <IconButton style={{ margin: 0, padding: 0 }}>
                        <ChevronRightIcon />
                    </IconButton>
                </HistoryItem>

                <HistoryItem>
                    <HistoryIconBox>
                        <RunIcon />
                    </HistoryIconBox>
                    <HistoryContent>
                        <HistoryTitle>Cardio - HIIT</HistoryTitle>
                        <HistorySubtitle>Terça-feira • 30 min • 310 kcal</HistorySubtitle>
                    </HistoryContent>
                    <IconButton style={{ margin: 0, padding: 0 }}>
                        <ChevronRightIcon />
                    </IconButton>
                </HistoryItem>

                <HistoryItem>
                    <HistoryIconBox>
                        <DumbbellIcon />
                    </HistoryIconBox>
                    <HistoryContent>
                        <HistoryTitle>Treino B - Inferiores</HistoryTitle>
                        <HistorySubtitle>Segunda-feira • 65 min • 550 kcal</HistorySubtitle>
                    </HistoryContent>
                    <IconButton style={{ margin: 0, padding: 0 }}>
                        <ChevronRightIcon />
                    </IconButton>
                </HistoryItem>
            </HistoryList>

            <GoalCard>
                <GoalHeader>
                    <LampIcon />
                    PRÓXIMA META
                </GoalHeader>
                <GoalText>
                    Aumentar carga no supino reto para 40kg cada lado até o fim da semana. Focar na cadência de descida.
                </GoalText>
            </GoalCard>

            <BottomActions>
                <PrimaryButton>
                    <PlayIcon />
                    Iniciar Novo Treino
                </PrimaryButton>
                <SecondaryButton>
                    <EditNoteIcon />
                </SecondaryButton>
            </BottomActions>

        </Container>
    );
};

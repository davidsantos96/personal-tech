//TODO: REFATORAR O CÓDIGO, E SEPARAR MOCKS

import { useState, useSyncExternalStore, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getStudentById } from '../../../data/students';
import {
    getCompletedSessions,
    fetchCompletedSessions,
    removeCompletedSession,
    subscribeHistory,
} from '../../../services/workoutHistoryService';
import {
    removeStudentWorkout,
} from '../../../services/studentWorkoutService';
import {
    Container,
    Header,
    HeaderRight,
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
    WorkoutCardList,
    WorkoutCard,
    WorkoutCardIcon,
    WorkoutCardContent,
    WorkoutCardTitle,
    WorkoutCardSubtitle,
    WorkoutStatusBadge,
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
    SecondaryButton,
    DropdownOverlay,
    DropdownMenu,
    DropdownItem,
    WorkoutActions,
    WorkoutActionButton
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

// Dropdown menu icons
const RenewIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
);

const AssessmentIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
);

const EditSmallIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </svg>
);

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);


export const StudentProfile = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const student = id ? getStudentById(id) : undefined;
    const [menuOpen, setMenuOpen] = useState(false);

    // Reactive workout history — re-renders when sessions change
    const sessions = useSyncExternalStore(
        subscribeHistory,
        () => getCompletedSessions(id),
    );

    // Pre-fetch sessions from Supabase so local cache is warm
    useEffect(() => {
        if (id) {
            fetchCompletedSessions(id).catch(() => {});
        }
    }, [id]);

    // Fetch workouts from DB/Service
    const [workouts, setWorkouts] = useState<any[]>([]);

    useEffect(() => {
        let isMounted = true;
        if (id) {
            import('../../../services/studentWorkoutService').then(({ fetchStudentWorkouts }) => {
                fetchStudentWorkouts(id).then(data => {
                    if (isMounted) setWorkouts(data);
                });
            });
        }
        return () => { isMounted = false; };
    }, [id]);

    // Status label map
    const statusLabels: Record<string, string> = {
        active: 'Ativo',
        expiring: 'Vencendo',
        expired: 'Vencido',
    };

    // Fallback data if student not found (for backwards compatibility)
    const studentName = student?.name || 'João Victor Silva';
    const studentAvatar = student?.avatar || 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80';
    const studentGoal = student?.goal?.toUpperCase() || 'HIPERTROFIA';
    const studentStatus = student?.isActive ? `• Ativo` : '• Inativo';

    const formatSessionDate = (dateStr: string) => {
        const sessionDate = new Date(dateStr + 'T12:00:00');
        const today = new Date();
        today.setHours(12, 0, 0, 0);
        const diffDays = Math.round((today.getTime() - sessionDate.getTime()) / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'Hoje';
        if (diffDays === 1) return 'Ontem';
        if (diffDays < 7) {
            const weekdays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
            return weekdays[sessionDate.getDay()];
        }
        return sessionDate.toLocaleDateString('pt-BR');
    };

    return (
        <Container>
            <Header>
                <IconButton onClick={() => navigate(-1)} aria-label="Voltar">
                    <ChevronLeftIcon />
                </IconButton>
                <PageTitle>Perfil do Aluno</PageTitle>
                <HeaderRight>
                    <IconButton aria-label="Mais opções" onClick={() => setMenuOpen(!menuOpen)}>
                        <DotsVerticalIcon />
                    </IconButton>
                    {menuOpen && (
                        <>
                            <DropdownOverlay onClick={() => setMenuOpen(false)} />
                            <DropdownMenu>
                                <DropdownItem onClick={() => { setMenuOpen(false); /* TODO: Renovar Plano */ }}>
                                    <RenewIcon />
                                    Renovar Plano
                                </DropdownItem>
                                <DropdownItem onClick={() => { setMenuOpen(false); navigate('/avaliacao-fisica'); }}>
                                    <AssessmentIcon />
                                    Atualizar Avaliação Física
                                </DropdownItem>
                            </DropdownMenu>
                        </>
                    )}
                </HeaderRight>
            </Header>

            <ProfileSection>
                <AvatarWrapper>
                    <Avatar src={studentAvatar} alt={studentName} />
                    <EditBadge>
                        <EditIcon />
                    </EditBadge>
                </AvatarWrapper>
                <StudentName>{studentName}</StudentName>
                <TagsRow>
                    <GoalTag>{studentGoal}</GoalTag>
                    <ActiveTime>{studentStatus}</ActiveTime>
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
                    <StatTrend>↑ +2</StatTrend>
                </StatCard>
            </StatsGrid>

            <SectionTitle>
                TREINOS ATIVOS
                {workouts.length > 0 && <ViewAllLink>Ver todos</ViewAllLink>}
            </SectionTitle>
            <WorkoutCardList>
                {workouts.length === 0 ? (
                    <WorkoutCard style={{ cursor: 'default' }}>
                        <WorkoutCardContent style={{ textAlign: 'center' }}>
                            <WorkoutCardTitle>Nenhum treino criado</WorkoutCardTitle>
                            <WorkoutCardSubtitle>Crie um treino para este aluno</WorkoutCardSubtitle>
                        </WorkoutCardContent>
                    </WorkoutCard>
                ) : (
                    workouts.map((w) => {
                        const isCardio = w.type.toLowerCase().includes('cardio');
                        return (
                            <WorkoutCard
                                key={w.id}
                                onClick={() => navigate('/treino-sessao', { state: { workoutId: w.id, studentId: id } })}
                            >
                                <WorkoutCardIcon $status={w.status}>
                                    {isCardio ? <RunIcon /> : <DumbbellIcon />}
                                </WorkoutCardIcon>
                                <WorkoutCardContent>
                                    <WorkoutCardTitle>{w.name}</WorkoutCardTitle>
                                    <WorkoutCardSubtitle>
                                        {w.type} • {w.exercises.length} exercícios • ~{w.estimatedMinutes}min
                                    </WorkoutCardSubtitle>
                                </WorkoutCardContent>
                                <WorkoutStatusBadge $status={w.status}>
                                    {statusLabels[w.status] || w.status}
                                </WorkoutStatusBadge>
                                <WorkoutActions>
                                    <WorkoutActionButton
                                        $danger
                                        title="Remover treino"
                                        onClick={async (e) => {
                                            e.stopPropagation();
                                            await removeStudentWorkout(w.id);
                                            // Refresh local view
                                            setWorkouts(prev => prev.filter(work => work.id !== w.id));
                                        }}
                                    >
                                        <TrashIcon />
                                    </WorkoutActionButton>
                                </WorkoutActions>
                            </WorkoutCard>
                        );
                    })
                )}
            </WorkoutCardList>

            <SectionTitle>
                HISTÓRICO DE TREINOS
                {sessions.length > 0 && <ViewAllLink>Ver todos</ViewAllLink>}
            </SectionTitle>
            <HistoryList>
                {sessions.length === 0 ? (
                    <HistoryItem style={{ justifyContent: 'center', cursor: 'default' }}>
                        <HistoryContent style={{ textAlign: 'center' }}>
                            <HistoryTitle>Nenhum treino concluído</HistoryTitle>
                            <HistorySubtitle>Os treinos finalizados aparecerão aqui</HistorySubtitle>
                        </HistoryContent>
                    </HistoryItem>
                ) : (
                    sessions.slice(0, 5).map((session) => {
                        const isCardio = session.workoutType.toLowerCase().includes('cardio');
                        const dateLabel = formatSessionDate(session.date);
                        const sourceLabel = session.source === 'student' ? ' • 👤 Aluno' : ' • 🏋️ Personal';

                        return (
                            <HistoryItem
                                key={session.id}
                                onClick={() => navigate('/treino-sessao', { state: { workoutId: session.workoutId, studentId: id } })}
                            >
                                <HistoryIconBox>
                                    {isCardio ? <RunIcon /> : <DumbbellIcon />}
                                </HistoryIconBox>
                                <HistoryContent>
                                    <HistoryTitle>{session.workoutName} - {session.workoutType}</HistoryTitle>
                                    <HistorySubtitle>
                                        {dateLabel} • {session.durationMinutes} min • {session.caloriesBurned} kcal
                                        {sourceLabel}
                                    </HistorySubtitle>
                                </HistoryContent>
                                <WorkoutActions>
                                    <WorkoutActionButton
                                        title="Repetir treino"
                                        onClick={(e) => { e.stopPropagation(); navigate('/treino-sessao', { state: { workoutId: session.workoutId, studentId: id } }); }}
                                    >
                                        <EditSmallIcon />
                                    </WorkoutActionButton>
                                    <WorkoutActionButton
                                        $danger
                                        title="Remover do histórico"
                                        onClick={(e) => { e.stopPropagation(); removeCompletedSession(session.id); }}
                                    >
                                        <TrashIcon />
                                    </WorkoutActionButton>
                                </WorkoutActions>
                            </HistoryItem>
                        );
                    })
                )}
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
                <PrimaryButton onClick={() => navigate('/montar-treino', { state: { studentId: id } })}>
                    <PlayIcon />
                    Criar Novo Treino
                </PrimaryButton>
                <SecondaryButton>
                    <EditNoteIcon />
                </SecondaryButton>
            </BottomActions>

        </Container>
    );
};


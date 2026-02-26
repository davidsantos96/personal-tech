import { useNavigate } from 'react-router-dom';
import { StudentBottomNav } from '../../../components/Layout/StudentBottomNav';
import {
    studentProfile,
    getTodayWorkout,
    getStreak,
    getMonthTrainingCount,
    trainingDays,
} from '../../../data/studentPortal';
import {
    Container,
    HeaderSection,
    UserInfo,
    Avatar,
    Greeting,
    UserName,
    StreakBadge,
    StreakValue,
    WorkoutCard,
    WorkoutLabel,
    WorkoutName,
    WorkoutMeta,
    StartButton,
    RestDayCard,
    RestDayEmoji,
    RestDayTitle,
    RestDaySubtitle,
    StatsGrid,
    StatCard,
    StatValue,
    StatLabel,
    WeekSection,
    WeekSectionTitle,
    WeekGrid,
    DayColumn,
    DayName,
    DayCircle,
    GoalCard,
    GoalLabel,
    GoalText,
} from './styles';

export const StudentHome = () => {
    const navigate = useNavigate();
    const todayWorkout = getTodayWorkout();
    const streak = getStreak();
    const now = new Date();
    const monthTrainings = getMonthTrainingCount(now.getFullYear(), now.getMonth());

    const last7Days = Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        return d;
    });

    const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    const formatDate = (d: Date) => d.toISOString().split('T')[0];

    const getGreeting = () => {
        const hour = now.getHours();
        if (hour < 12) return 'Bom dia';
        if (hour < 18) return 'Boa tarde';
        return 'Boa noite';
    };

    const daysUntilEval = Math.ceil(
        (new Date(studentProfile.nextEvaluation).getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    return (
        <Container>
            <HeaderSection>
                <UserInfo>
                    <Avatar src={studentProfile.avatar} alt={studentProfile.name} />
                    <div>
                        <Greeting>{getGreeting()}</Greeting>
                        <UserName>{studentProfile.name.split(' ')[0]} 💪</UserName>
                    </div>
                </UserInfo>
                <StreakBadge>
                    🔥 <StreakValue>{streak}</StreakValue> dias
                </StreakBadge>
            </HeaderSection>

            {todayWorkout ? (
                <WorkoutCard>
                    <WorkoutLabel>TREINO DE HOJE</WorkoutLabel>
                    <WorkoutName>{todayWorkout.name}</WorkoutName>
                    <WorkoutMeta>
                        {todayWorkout.type} • {todayWorkout.exercises.length} exercícios • ~{todayWorkout.estimatedMinutes}min
                    </WorkoutMeta>
                    <StartButton onClick={() => navigate(`/aluno/treino/${todayWorkout.id}`)}>
                        ▶ Iniciar Treino
                    </StartButton>
                </WorkoutCard>
            ) : (
                <RestDayCard>
                    <RestDayEmoji>😴</RestDayEmoji>
                    <RestDayTitle>Dia de descanso</RestDayTitle>
                    <RestDaySubtitle>Aproveite para se recuperar!</RestDaySubtitle>
                </RestDayCard>
            )}

            <StatsGrid>
                <StatCard>
                    <StatValue>{monthTrainings}</StatValue>
                    <StatLabel>Treinos este mês</StatLabel>
                </StatCard>
                <StatCard>
                    <StatValue $color="#22C55E">{streak}</StatValue>
                    <StatLabel>Dias seguidos</StatLabel>
                </StatCard>
                <StatCard>
                    <StatValue $color="#3B82F6">{daysUntilEval}</StatValue>
                    <StatLabel>Dias p/ avaliação</StatLabel>
                </StatCard>
            </StatsGrid>

            <WeekSection>
                <WeekSectionTitle>Última semana</WeekSectionTitle>
                <WeekGrid>
                    {last7Days.map(day => {
                        const iso = formatDate(day);
                        const trained = trainingDays.includes(iso);
                        const isToday = iso === formatDate(new Date());
                        return (
                            <DayColumn key={iso}>
                                <DayName>{dayNames[day.getDay()]}</DayName>
                                <DayCircle $trained={trained} $isToday={isToday}>
                                    {trained ? '✓' : day.getDate()}
                                </DayCircle>
                            </DayColumn>
                        );
                    })}
                </WeekGrid>
            </WeekSection>

            <GoalCard>
                <GoalLabel>🎯 PRÓXIMA META</GoalLabel>
                <GoalText>
                    Aumentar carga no supino reto para 40kg cada lado até o fim da semana. Focar na cadência de descida.
                </GoalText>
            </GoalCard>

            <StudentBottomNav />
        </Container>
    );
};

import { sessionHistory, getStreak } from '../../../data/studentPortal';
import { StudentBottomNav } from '../../../components/Layout/StudentBottomNav';
import {
    Container,
    PageTitle,
    StreakCard,
    StreakEmoji,
    StreakTitle,
    StreakSubtitle,
    SectionHeader,
    SessionList,
    SessionCard,
    SessionTop,
    SessionInfo,
    SessionName,
    SessionType,
    SessionRight,
    SessionDate,
    SessionDuration,
    SessionStats,
    SessionStatItem,
} from './styles';

export const StudentHistory = () => {
    const streak = getStreak();

    return (
        <Container>
            <PageTitle>Meu Histórico</PageTitle>

            <StreakCard>
                <StreakEmoji>🔥</StreakEmoji>
                <StreakTitle>{streak} Dias de Foco!</StreakTitle>
                <StreakSubtitle>Sua melhor sequência atual</StreakSubtitle>
            </StreakCard>

            <SectionHeader>Treinos Recentes</SectionHeader>
            <SessionList>
                {sessionHistory.map((session) => (
                    <SessionCard key={session.id}>
                        <SessionTop>
                            <SessionInfo>
                                <SessionName>{session.workoutName}</SessionName>
                                <SessionType>{session.workoutType}</SessionType>
                            </SessionInfo>
                            <SessionRight>
                                <SessionDate>{new Date(session.date).toLocaleDateString('pt-BR')}</SessionDate>
                                <SessionDuration>{session.durationMinutes} min</SessionDuration>
                            </SessionRight>
                        </SessionTop>
                        <SessionStats>
                            <SessionStatItem>🔥 {session.caloriesBurned} kcal</SessionStatItem>
                            <SessionStatItem>✅ {session.exercisesCompleted}/{session.exercisesTotal} ex.</SessionStatItem>
                        </SessionStats>
                    </SessionCard>
                ))}
            </SessionList>

            <StudentBottomNav />
        </Container>
    );
};

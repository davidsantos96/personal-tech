import { useNavigate } from 'react-router-dom';
import { useSchedule } from '../../../contexts/ScheduleContext';
import {
    ListSection,
    SectionHeader,
    Title,
    ViewAllButton,
    ScrollContainer,
    StudentCard,
    StatusBar,
    StudentAvatar,
    StudentInfo,
    TimeLabel,
    StudentName,
    TrainingDetail
} from './styles';

export const StudentsList = () => {
    const navigate = useNavigate();
    const { filledSchedule } = useSchedule();

    // Show the next 3 upcoming sessions
    const upcomingStudents = filledSchedule.slice(0, 3);

    return (
        <ListSection>
            <SectionHeader>
                <Title>Próximos Alunos</Title>
                <ViewAllButton onClick={() => navigate('/agenda')}>Ver agenda</ViewAllButton>
            </SectionHeader>
            <ScrollContainer>
                {upcomingStudents.map((entry) => (
                    <StudentCard
                        key={entry.id}
                        onClick={() => navigate(`/perfil-aluno/${entry.studentId}`)}
                        style={{ cursor: 'pointer' }}
                    >
                        <StatusBar $color={entry.color} />
                        <StudentAvatar $imageUrl={entry.student?.avatar || ''} />
                        <StudentInfo>
                            <TimeLabel $color={entry.color}>
                                {entry.time} - {entry.type}
                            </TimeLabel>
                            <StudentName>{entry.student?.name || 'Aluno'}</StudentName>
                            <TrainingDetail>{entry.detail}</TrainingDetail>
                        </StudentInfo>
                    </StudentCard>
                ))}
            </ScrollContainer>
        </ListSection>
    );
};

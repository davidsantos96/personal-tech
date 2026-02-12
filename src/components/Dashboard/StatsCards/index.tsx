import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getActiveStudents, getTodayScheduleWithStudents, todaySchedule } from '../../../data/students';
import {
    StatsSection,
    Card,
    CardHeader,
    IconBox,
    Badge,
    CardLabel,
    CardValue,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalTitle,
    ModalCloseButton,
    ModalHandle,
    ScheduleItem,
    ScheduleTime,
    ScheduleAvatar,
    ScheduleInfo,
    ScheduleName,
    ScheduleDetail,
    ScheduleStatusDot,
    ActiveStudentItem,
    ActiveStudentAvatar,
    ActiveStudentInfo,
    ActiveStudentName,
    ActiveStudentGoal,
    ActiveStudentArrow,
    ModalSummary,
    SummaryCard,
    SummaryValue,
    SummaryLabel
} from './styles';

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const ChevronRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
);

type ModalType = null | 'students' | 'workouts';

export const StatsCards = () => {
    const [activeModal, setActiveModal] = useState<ModalType>(null);
    const navigate = useNavigate();

    const activeStudents = getActiveStudents();
    const scheduleWithStudents = getTodayScheduleWithStudents();

    const completedCount = todaySchedule.filter(s => s.statusVariant === 'past').length;
    const pendingCount = todaySchedule.length - completedCount;

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            setActiveModal(null);
        }
    };

    return (
        <>
            <StatsSection>
                <Card onClick={() => setActiveModal('students')}>
                    <CardHeader>
                        <IconBox>
                            <span className="material-symbols-outlined" style={{ fontSize: '24px', color: '#FF6D00' }}>groups</span>
                        </IconBox>
                        <Badge $variant="primary">+2%</Badge>
                    </CardHeader>
                    <div>
                        <CardLabel>Alunos Ativos</CardLabel>
                        <CardValue>{activeStudents.length.toString().padStart(2, '0')}</CardValue>
                    </div>
                </Card>

                <Card onClick={() => setActiveModal('workouts')}>
                    <CardHeader>
                        <IconBox>
                            <span className="material-symbols-outlined" style={{ fontSize: '24px', color: '#FF6D00' }}>fitness_center</span>
                        </IconBox>
                        <Badge $variant="neutral">Hoje</Badge>
                    </CardHeader>
                    <div>
                        <CardLabel>Treinos Hoje</CardLabel>
                        <CardValue>{todaySchedule.length.toString().padStart(2, '0')}</CardValue>
                    </div>
                </Card>
            </StatsSection>

            {/* Modal: Alunos Ativos */}
            {activeModal === 'students' && (
                <ModalOverlay onClick={handleOverlayClick}>
                    <ModalContent>
                        <ModalHandle />
                        <ModalHeader>
                            <ModalTitle>
                                <span className="material-symbols-outlined" style={{ fontSize: '22px', color: '#FF6D00' }}>groups</span>
                                Alunos Ativos
                            </ModalTitle>
                            <ModalCloseButton onClick={() => setActiveModal(null)}>
                                <CloseIcon />
                            </ModalCloseButton>
                        </ModalHeader>

                        {activeStudents.map((student) => (
                            <ActiveStudentItem
                                key={student.id}
                                onClick={() => {
                                    setActiveModal(null);
                                    navigate(`/perfil-aluno/${student.id}`);
                                }}
                            >
                                <ActiveStudentAvatar src={student.avatar} alt={student.name} />
                                <ActiveStudentInfo>
                                    <ActiveStudentName>{student.name}</ActiveStudentName>
                                    <ActiveStudentGoal>
                                        {student.goal} • {student.statusLabel}
                                    </ActiveStudentGoal>
                                </ActiveStudentInfo>
                                <ActiveStudentArrow>
                                    <ChevronRightIcon />
                                </ActiveStudentArrow>
                            </ActiveStudentItem>
                        ))}
                    </ModalContent>
                </ModalOverlay>
            )}

            {/* Modal: Treinos Hoje */}
            {activeModal === 'workouts' && (
                <ModalOverlay onClick={handleOverlayClick}>
                    <ModalContent>
                        <ModalHandle />
                        <ModalHeader>
                            <ModalTitle>
                                <span className="material-symbols-outlined" style={{ fontSize: '22px', color: '#FF6D00' }}>fitness_center</span>
                                Treinos Hoje
                            </ModalTitle>
                            <ModalCloseButton onClick={() => setActiveModal(null)}>
                                <CloseIcon />
                            </ModalCloseButton>
                        </ModalHeader>

                        <ModalSummary>
                            <SummaryCard>
                                <SummaryValue>{todaySchedule.length}</SummaryValue>
                                <SummaryLabel>Total</SummaryLabel>
                            </SummaryCard>
                            <SummaryCard>
                                <SummaryValue style={{ color: '#22C55E' }}>{completedCount}</SummaryValue>
                                <SummaryLabel>Concluídos</SummaryLabel>
                            </SummaryCard>
                            <SummaryCard>
                                <SummaryValue style={{ color: '#FF6D00' }}>{pendingCount}</SummaryValue>
                                <SummaryLabel>Pendentes</SummaryLabel>
                            </SummaryCard>
                        </ModalSummary>

                        {scheduleWithStudents.map((entry) => (
                            <ScheduleItem
                                key={entry.id}
                                onClick={() => {
                                    setActiveModal(null);
                                    navigate(`/perfil-aluno/${entry.studentId}`);
                                }}
                            >
                                <ScheduleTime $color={entry.color}>
                                    <span>{entry.time}</span>
                                    <span>{entry.endTime}</span>
                                </ScheduleTime>
                                <ScheduleAvatar src={entry.student?.avatar || ''} alt={entry.student?.name || ''} />
                                <ScheduleInfo>
                                    <ScheduleName>{entry.student?.name || 'Aluno'}</ScheduleName>
                                    <ScheduleDetail>{entry.type} • {entry.detail}</ScheduleDetail>
                                </ScheduleInfo>
                                <ScheduleStatusDot $color={entry.statusColor} />
                            </ScheduleItem>
                        ))}
                    </ModalContent>
                </ModalOverlay>
            )}
        </>
    );
};

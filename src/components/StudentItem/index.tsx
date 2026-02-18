import type { ReactElement } from 'react';
import type { Student } from '../../services/studentService';
import {
    StudentCard,
    Avatar,
    StudentInfo,
    NameRow,
    StudentName,
    StatusBadge,
    GoalRow,
    ArrowIcon,
} from '../../views/Students/styles';

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

const ScaleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 12h12l3-12H3zm9 6v-3m0 0l-2 2m2-2l2 2" />
    </svg>
);

const RunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
);

const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);

const goalIconMap: Record<string, ReactElement> = {
    dumbbell: <DumbbellIcon />,
    scale: <ScaleIcon />,
    run: <RunIcon />,
};

interface StudentItemProps {
    student: Student;
    onClick: (id: string) => void;
}

export const StudentItem = ({ student, onClick }: StudentItemProps) => (
    <StudentCard onClick={() => onClick(student.id)}>
        <Avatar src={student.avatar} alt={student.name} />
        <StudentInfo>
            <NameRow>
                <StudentName>{student.name}</StudentName>
                <StatusBadge $type={student.status}>
                    {student.statusLabel}
                </StatusBadge>
            </NameRow>
            <GoalRow>
                {goalIconMap[student.goalIcon] ?? <UserIcon />}
                <span>{student.goal}</span>
            </GoalRow>
        </StudentInfo>
        <ArrowIcon>
            <ChevronRightIcon />
        </ArrowIcon>
    </StudentCard>
);

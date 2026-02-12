import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { studentsData } from '../../data/students';
import { BottomNav } from '../../components/Layout/BottomNav';
import {
    Container,
    Header,
    Title,
    AddButton,
    SearchContainer,
    SearchInput,
    FilterScroll,
    FilterTab,
    StudentsList,
    StudentCard,
    Avatar,
    StudentInfo,
    NameRow,
    StudentName,
    StatusBadge,
    GoalRow,
    ArrowIcon
} from './styles';

// Icons
const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
);

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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

export const Students = () => {
    const [activeTab, setActiveTab] = useState('Todos');
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const getIcon = (type: string) => {
        switch (type) {
            case 'dumbbell': return <DumbbellIcon />;
            case 'scale': return <ScaleIcon />;
            case 'run': return <RunIcon />;
            default: return <UserIcon />;
        }
    };

    const filteredStudents = studentsData
        .filter(student => {
            // Filter by tab
            if (activeTab === 'Ativos') return student.isActive;
            if (activeTab === 'Pendentes') return student.status === 'expiring';
            if (activeTab === 'Inativos') return !student.isActive;
            return true; // 'Todos'
        })
        .filter(student => {
            // Filter by search
            if (!searchTerm) return true;
            return student.name.toLowerCase().includes(searchTerm.toLowerCase());
        });

    return (
        <Container>
            <Header>
                <Title>Meus Alunos</Title>
                <AddButton aria-label="Adicionar aluno">
                    <PlusIcon />
                </AddButton>
            </Header>

            <SearchContainer>
                <SearchIcon />
                <SearchInput
                    placeholder="Buscar aluno..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </SearchContainer>

            <FilterScroll>
                {['Todos', 'Ativos', 'Pendentes', 'Inativos'].map((tab) => (
                    <FilterTab
                        key={tab}
                        $active={activeTab === tab}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </FilterTab>
                ))}
            </FilterScroll>

            <StudentsList>
                {filteredStudents.map((student) => (
                    <StudentCard key={student.id} onClick={() => navigate(`/perfil-aluno/${student.id}`)}>
                        <Avatar src={student.avatar} alt={student.name} />
                        <StudentInfo>
                            <NameRow>
                                <StudentName>{student.name}</StudentName>
                                <StatusBadge $type={student.status}>
                                    {student.statusLabel}
                                </StatusBadge>
                            </NameRow>
                            <GoalRow>
                                {getIcon(student.goalIcon)}
                                <span>{student.goal}</span>
                            </GoalRow>
                        </StudentInfo>
                        <ArrowIcon>
                            <ChevronRightIcon />
                        </ArrowIcon>
                    </StudentCard>
                ))}
            </StudentsList>

            <BottomNav />
        </Container>
    );
};

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { studentsData } from '../../services/studentService';
import { StudentItem } from '../../components/StudentItem';
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

export const Students = () => {
    const [activeTab, setActiveTab] = useState('Todos');
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

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
                    <StudentItem
                        key={student.id}
                        student={student}
                        onClick={(id) => navigate(`/perfil-aluno/${id}`)}
                    />
                ))}
            </StudentsList>

            <BottomNav />
        </Container>
    );
};

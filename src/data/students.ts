export interface Student {
    id: string;
    name: string;
    avatar: string;
    goal: string;
    goalIcon: 'dumbbell' | 'scale' | 'run' | 'user';
    status: 'updated' | 'expiring' | 'expired';
    statusLabel: string;
    isActive: boolean;
}

export interface ScheduleEntry {
    id: string;
    studentId: string;
    time: string;
    endTime: string;
    type: string;
    detail: string;
    color: string;
    statusVariant: 'default' | 'highlight' | 'free' | 'past';
    statusIcon?: 'check' | 'calendar' | 'clock';
    statusColor?: string;
}

export const studentsData: Student[] = [
    {
        id: '1',
        name: 'Carlos Silva',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        goal: 'Hipertrofia',
        goalIcon: 'dumbbell',
        status: 'updated',
        statusLabel: 'ATUALIZADO',
        isActive: true
    },
    {
        id: '2',
        name: 'Ana Souza',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        goal: 'Emagrecimento',
        goalIcon: 'scale',
        status: 'expiring',
        statusLabel: 'VENCE EM 2 DIAS',
        isActive: true
    },
    {
        id: '3',
        name: 'Rafael Mendes',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        goal: 'Condicionamento',
        goalIcon: 'run',
        status: 'updated',
        statusLabel: 'ATUALIZADO',
        isActive: true
    },
    {
        id: '4',
        name: 'Julia Lima',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
        goal: 'Flexibilidade',
        goalIcon: 'user',
        status: 'expired',
        statusLabel: 'VENCIDO',
        isActive: false
    },
    {
        id: '5',
        name: 'Bruno Costa',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        goal: 'Força',
        goalIcon: 'dumbbell',
        status: 'updated',
        statusLabel: 'ATUALIZADO',
        isActive: true
    }
];

// Schedule for today using real student references
export const todaySchedule: ScheduleEntry[] = [
    {
        id: 'sched-1',
        studentId: '1',
        time: '08:00',
        endTime: '09:00',
        type: 'Musculação',
        detail: 'Série A • Peito/Tríceps',
        color: '#22C55E',
        statusVariant: 'past',
        statusIcon: 'check',
        statusColor: '#22C55E'
    },
    {
        id: 'sched-2',
        studentId: '2',
        time: '09:30',
        endTime: '10:15',
        type: 'Pilates',
        detail: 'Mobilidade • Core',
        color: '#FF6D00',
        statusVariant: 'highlight',
        statusIcon: 'calendar',
        statusColor: '#FF6D00'
    },
    {
        id: 'sched-3',
        studentId: '3',
        time: '11:00',
        endTime: '12:00',
        type: 'HIIT',
        detail: 'Cardio • Alta Intensidade',
        color: '#EAB308',
        statusVariant: 'default',
        statusIcon: 'clock',
        statusColor: '#94a3b8'
    },
    {
        id: 'sched-4',
        studentId: '5',
        time: '14:00',
        endTime: '15:00',
        type: 'Musculação',
        detail: 'Série B • Costas/Bíceps',
        color: '#3B82F6',
        statusVariant: 'default',
        statusIcon: 'clock',
        statusColor: '#94a3b8'
    },
    {
        id: 'sched-5',
        studentId: '2',
        time: '16:00',
        endTime: '16:45',
        type: 'Funcional',
        detail: 'Mobilidade • Flexibilidade',
        color: '#8B5CF6',
        statusVariant: 'default',
        statusIcon: 'clock',
        statusColor: '#94a3b8'
    }
];

// Helper to get student by id
export const getStudentById = (id: string): Student | undefined => {
    return studentsData.find(s => s.id === id);
};

// Get active students
export const getActiveStudents = (): Student[] => {
    return studentsData.filter(s => s.isActive);
};

// Get today's schedule with student data enriched
export const getTodayScheduleWithStudents = () => {
    return todaySchedule.map(entry => ({
        ...entry,
        student: getStudentById(entry.studentId)
    }));
};

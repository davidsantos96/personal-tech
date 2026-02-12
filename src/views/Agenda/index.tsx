import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd';
import { getTodayScheduleWithStudents } from '../../data/students';
import { BottomNav } from '../../components/Layout/BottomNav';
import {
    Container,
    HeaderRow,
    HeaderTitle,
    Title,
    Subtitle,
    HeaderActions,
    IconButton,
    Avatar,
    CalendarStrip,
    DayCard,
    DayLabel,
    DayNumber,
    TimelineContainer,
    TimelineLine,
    TimeSlot,
    TimeLabelRow,
    TimelineDot,
    TimeLabel,
    AppointmentCard,
    CardContent,
    ClientAvatar,
    ClientInfo,
    ClientName,
    ActivityText,
    StatusIcon,
    NowIndicator,
    NowLabel,
    NowLine,
    AddFab
} from './styles';

// Icons
const BellIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
);

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
    </svg>
);

const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14h.01" strokeWidth={3} />
    </svg>
);

const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
    </svg>
);

const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
);

interface AgendaDisplayItem {
    id: string;
    type: 'filled' | 'free';
    time: string;
    clientName?: string;
    activity?: string;
    avatar?: string;
    statusVariant?: 'default' | 'highlight' | 'free' | 'past';
    statusIcon?: 'check' | 'calendar' | 'clock';
    statusColor?: string;
    studentId?: string;
}

const RenderIcon = ({ name, color }: { name?: string, color?: string }) => {
    switch (name) {
        case 'check': return <StatusIcon $color={color}><CheckIcon /></StatusIcon>;
        case 'calendar': return <StatusIcon $color={color}><CalendarIcon /></StatusIcon>;
        case 'clock': return <StatusIcon $color={color}><ClockIcon /></StatusIcon>;
        default: return null;
    }
};

export const Agenda = () => {
    const navigate = useNavigate();
    const scheduleWithStudents = getTodayScheduleWithStudents();

    // Build agenda items from centralized data, add a free slot
    const buildAgendaItems = (): AgendaDisplayItem[] => {
        const items: AgendaDisplayItem[] = [];

        scheduleWithStudents.forEach((entry, index) => {
            items.push({
                id: entry.id,
                type: 'filled',
                time: entry.time,
                clientName: entry.student?.name || 'Aluno',
                activity: `${entry.type} • ${entry.detail.split(' • ')[0]}`,
                avatar: entry.student?.avatar,
                statusVariant: entry.statusVariant,
                statusIcon: entry.statusIcon,
                statusColor: entry.statusColor,
                studentId: entry.studentId
            });

            // Add a free slot after the second item
            if (index === 1) {
                items.push({
                    id: 'free-1',
                    type: 'free',
                    time: '10:30'
                });
            }
        });

        return items;
    };

    const [schedule, setSchedule] = useState<AgendaDisplayItem[]>(buildAgendaItems());

    const TIME_SLOTS = schedule.map(item => item.time || 'Extra');

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }

        const items = Array.from(schedule);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setSchedule(items);
    };

    return (
        <Container>
            <HeaderRow>
                <HeaderTitle>
                    <Title>Agenda</Title>
                    <Subtitle>Fevereiro, 2026</Subtitle>
                </HeaderTitle>
                <HeaderActions>
                    <IconButton aria-label="Notificações">
                        <BellIcon />
                    </IconButton>
                    <Avatar src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="Usuário" />
                </HeaderActions>
            </HeaderRow>

            <CalendarStrip>
                {[
                    { day: 'SEG', num: '09' },
                    { day: 'TER', num: '10' },
                    { day: 'QUA', num: '11' },
                    { day: 'QUI', num: '12', active: true },
                    { day: 'SEX', num: '13' },
                ].map((date) => (
                    <DayCard key={date.num} $active={date.active}>
                        <DayLabel $active={date.active}>{date.day}</DayLabel>
                        <DayNumber>{date.num}</DayNumber>
                    </DayCard>
                ))}
            </CalendarStrip>

            <TimelineContainer>
                <TimelineLine />

                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="agenda-timeline">
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                            >
                                {schedule.map((item, index) => {
                                    const showNowIndicator = index === 1;

                                    return (
                                        <div key={item.id}>
                                            {showNowIndicator && (
                                                <NowIndicator>
                                                    <TimelineDot $active />
                                                    <NowLabel>AGORA</NowLabel>
                                                    <NowLine />
                                                </NowIndicator>
                                            )}

                                            <Draggable draggableId={item.id} index={index}>
                                                {(provided, snapshot) => (
                                                    <TimeSlot
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={{
                                                            ...provided.draggableProps.style,
                                                            opacity: snapshot.isDragging ? 0.8 : 1
                                                        }}
                                                    >
                                                        <TimeLabelRow>
                                                            <TimelineDot $active={item.statusVariant === 'highlight'} />
                                                            <TimeLabel $highlight={item.statusVariant === 'highlight'}>
                                                                {TIME_SLOTS[index] || 'Extra'}
                                                            </TimeLabel>
                                                        </TimeLabelRow>

                                                        {item.type === 'free' ? (
                                                            <AppointmentCard $variant="free">
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                                    <PlusIcon />
                                                                    <span>Horário Livre</span>
                                                                </div>
                                                            </AppointmentCard>
                                                        ) : (
                                                            <AppointmentCard
                                                                $variant={item.statusVariant}
                                                                onClick={() => item.studentId && navigate(`/perfil-aluno/${item.studentId}`)}
                                                                style={{ cursor: item.studentId ? 'pointer' : 'default' }}
                                                            >
                                                                <CardContent>
                                                                    <ClientAvatar src={item.avatar} />
                                                                    <ClientInfo>
                                                                        <ClientName>{item.clientName}</ClientName>
                                                                        <ActivityText>{item.activity}</ActivityText>
                                                                    </ClientInfo>
                                                                    <RenderIcon name={item.statusIcon} color={item.statusColor} />
                                                                </CardContent>
                                                            </AppointmentCard>
                                                        )}
                                                    </TimeSlot>
                                                )}
                                            </Draggable>
                                        </div>
                                    );
                                })}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </TimelineContainer>

            <AddFab>
                <PlusIcon />
            </AddFab>

            <BottomNav />
        </Container>
    );
};

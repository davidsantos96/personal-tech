import { useState } from 'react';
import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd';
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
         <path strokeLinecap="round" strokeLinejoin="round" d="M12 14h.01" strokeWidth={3}/>
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

interface AgendaItem {
    id: string;
    type: 'filled' | 'free';
    time?: string;
    clientName?: string;
    activity?: string;
    avatar?: string;
    statusVariant?: 'default' | 'highlight' | 'free' | 'past';
    statusIcon?: 'check' | 'calendar' | 'clock';
    statusColor?: string;
}

const initialSchedule: AgendaItem[] = [
    {
        id: '1',
        type: 'filled',
        clientName: 'João Silva',
        activity: 'Musculação • 60min',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        statusVariant: 'past',
        statusIcon: 'check',
        statusColor: '#22C55E'
    },
    {
        id: '2',
        type: 'filled',
        clientName: 'Maria Souza',
        activity: 'Pilates • 45min',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        statusVariant: 'highlight',
        statusIcon: 'calendar',
        statusColor: '#FF6D00'
    },
    {
        id: '3',
        type: 'free'
    },
    {
        id: '4',
        type: 'filled',
        clientName: 'Carlos Lima',
        activity: 'Treino Funcional • 60min',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
        statusVariant: 'past',
        statusIcon: 'check',
        statusColor: '#22C55E'
    },
    {
        id: '5',
        type: 'filled',
        clientName: 'Ana Clara',
        activity: 'Yoga • 60min',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80',
        statusVariant: 'default',
        statusIcon: 'clock',
        statusColor: '#94a3b8'
    }
];

const TIME_SLOTS = ['08:00', '09:30', '11:00', '12:30', '14:00'];

const RenderIcon = ({ name, color }: { name?: string, color?: string }) => {
    switch(name) {
        case 'check': return <StatusIcon $color={color}><CheckIcon /></StatusIcon>;
        case 'calendar': return <StatusIcon $color={color}><CalendarIcon /></StatusIcon>;
        case 'clock': return <StatusIcon $color={color}><ClockIcon /></StatusIcon>;
        default: return null;
    }
};

export const Agenda = () => {
    const [schedule, setSchedule] = useState<AgendaItem[]>(initialSchedule);

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
                    <Subtitle>Outubro, 2023</Subtitle>
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
                    { day: 'SEG', num: '14' },
                    { day: 'TER', num: '15', active: true },
                    { day: 'QUA', num: '16' },
                    { day: 'QUI', num: '17' },
                    { day: 'SEX', num: '18' },
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
                                    // Visual logic: Insert 'NOW' after the first item (08:00) 
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
                                                            <AppointmentCard $variant={item.statusVariant}>
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

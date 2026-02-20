import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Header,
    BackButton,
    PageTitle,
    HeaderSpacer,
    CalendarSection,
    MonthRow,
    MonthLabel,
    NavRow,
    NavBtn,
    DaysStrip,
    DayCard,
    DayName,
    DayNum,
    FormSection,
    FieldGroup,
    FieldRow,
    Label,
    SelectWrapper,
    StyledSelect,
    ChevronIcon,
    TimeWrapper,
    TimeInput,
    ClockIconBtn,
    ChipsRow,
    Chip,
    NotesTextarea,
    SubmitArea,
    ScheduleButton,
} from './styles';
import { studentsData } from '../../data/students';

/* ── Icons ── */
const ChevronLeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
);

const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
    </svg>
);

const CalendarCheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
);

/* ── Helpers ── */

const WEEKDAYS = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];

const MONTH_NAMES = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

const DURATIONS = ['30 min', '45 min', '60 min', '75 min', '90 min', '120 min'];

const SESSION_TYPES = ['Força', 'Cardio', 'HIIT', 'Yoga', 'Funcional', 'Pilates'];

/** Returns an array of 7 day slots centred around `today` within the given month */
function buildDaySlots(year: number, month: number, centreDay: number) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const start = Math.max(1, centreDay - 2);
    const end = Math.min(daysInMonth, start + 6);
    const slots: number[] = [];
    for (let d = start; d <= end; d++) slots.push(d);
    return slots;
}

/* ── Component ── */

interface FormState {
    studentId: string;
    startTime: string;
    duration: string;
    sessionType: string;
    notes: string;
}

export const ScheduleSession = () => {
    const navigate = useNavigate();
    const today = new Date();

    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [selectedDay, setSelectedDay] = useState(today.getDate());

    const [form, setForm] = useState<FormState>({
        studentId: '',
        startTime: '14:00',
        duration: '60 min',
        sessionType: 'Força',
        notes: '',
    });

    /* Month navigation */
    const prevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(y => y - 1);
        } else {
            setCurrentMonth(m => m - 1);
        }
        setSelectedDay(1);
    };

    const nextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(y => y + 1);
        } else {
            setCurrentMonth(m => m + 1);
        }
        setSelectedDay(1);
    };

    const daySlots = buildDaySlots(currentYear, currentMonth, selectedDay);

    const handleField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
        setForm(prev => ({ ...prev, [key]: value }));
    };

    const isValid = form.studentId !== '';

    const handleSubmit = () => {
        if (!isValid) return;
        // TODO: persist session
        navigate('/agenda');
    };

    return (
        <Container>
            {/* ── Header ── */}
            <Header>
                <BackButton onClick={() => navigate(-1)} aria-label="Voltar">
                    <ChevronLeftIcon />
                </BackButton>
                <PageTitle>Agendar Sessão</PageTitle>
                <HeaderSpacer />
            </Header>

            {/* ── Calendar ── */}
            <CalendarSection>
                <MonthRow>
                    <MonthLabel>
                        {MONTH_NAMES[currentMonth]} {currentYear}
                    </MonthLabel>
                    <NavRow>
                        <NavBtn onClick={prevMonth} aria-label="Mês anterior">&#8249;</NavBtn>
                        <NavBtn onClick={nextMonth} aria-label="Próximo mês">&#8250;</NavBtn>
                    </NavRow>
                </MonthRow>

                <DaysStrip>
                    {daySlots.map(day => {
                        const weekday = new Date(currentYear, currentMonth, day).getDay();
                        return (
                            <DayCard
                                key={day}
                                $active={day === selectedDay}
                                onClick={() => setSelectedDay(day)}
                            >
                                <DayName>{WEEKDAYS[weekday]}</DayName>
                                <DayNum>{day}</DayNum>
                            </DayCard>
                        );
                    })}
                </DaysStrip>
            </CalendarSection>

            {/* ── Form ── */}
            <FormSection>
                {/* Select Student */}
                <FieldGroup>
                    <Label>Selecionar Aluno</Label>
                    <SelectWrapper>
                        <StyledSelect
                            value={form.studentId}
                            onChange={e => handleField('studentId', e.target.value)}
                        >
                            <option value="">Escolha um aluno...</option>
                            {studentsData.map(s => (
                                <option key={s.id} value={s.id}>
                                    {s.name}
                                </option>
                            ))}
                        </StyledSelect>
                        <ChevronIcon>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </ChevronIcon>
                    </SelectWrapper>
                </FieldGroup>

                {/* Start Time + Duration */}
                <FieldRow>
                    <FieldGroup style={{ flex: 1 }}>
                        <Label>Horário de Início</Label>
                        <TimeWrapper>
                            <TimeInput
                                type="time"
                                value={form.startTime}
                                onChange={e => handleField('startTime', e.target.value)}
                            />
                            <ClockIconBtn type="button" aria-label="Abrir seletor de hora">
                                <ClockIcon />
                            </ClockIconBtn>
                        </TimeWrapper>
                    </FieldGroup>

                    <FieldGroup style={{ flex: 1 }}>
                        <Label>Duração</Label>
                        <SelectWrapper>
                            <StyledSelect
                                value={form.duration}
                                onChange={e => handleField('duration', e.target.value)}
                            >
                                {DURATIONS.map(d => (
                                    <option key={d} value={d}>{d}</option>
                                ))}
                            </StyledSelect>
                            <ChevronIcon>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </ChevronIcon>
                        </SelectWrapper>
                    </FieldGroup>
                </FieldRow>

                {/* Session Type */}
                <FieldGroup>
                    <Label>Tipo de Sessão</Label>
                    <ChipsRow>
                        {SESSION_TYPES.map(type => (
                            <Chip
                                key={type}
                                $active={form.sessionType === type}
                                onClick={() => handleField('sessionType', type)}
                                type="button"
                            >
                                {type}
                            </Chip>
                        ))}
                    </ChipsRow>
                </FieldGroup>

                {/* Session Notes */}
                <FieldGroup>
                    <Label>Observações da Sessão</Label>
                    <NotesTextarea
                        placeholder="Foco em parte superior e exercícios de estabilidade de core..."
                        value={form.notes}
                        onChange={e => handleField('notes', e.target.value)}
                        rows={4}
                    />
                </FieldGroup>
            </FormSection>

            {/* ── Submit ── */}
            <SubmitArea>
                <ScheduleButton onClick={handleSubmit} disabled={!isValid}>
                    <CalendarCheckIcon />
                    Agendar Sessão
                </ScheduleButton>
            </SubmitArea>
        </Container>
    );
};

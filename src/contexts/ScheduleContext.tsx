import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { todaySchedule, getStudentById, type ScheduleEntry, type Student } from '../data/students';
import { isSupabaseConfigured, getSupabase } from '../lib/supabase';
import { fetchStudents } from '../services/studentService';

// Enriched schedule entry for Dashboard usage
interface EnrichedScheduleEntry extends ScheduleEntry {
    student?: Student;
}

// Agenda item for display/drag-and-drop
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
    color?: string;
    endTime?: string;
    detail?: string;
}

interface ScheduleContextType {
    agendaItems: AgendaDisplayItem[];
    filledSchedule: EnrichedScheduleEntry[];
    totalWorkouts: number;
    completedWorkouts: number;
    pendingWorkouts: number;
    reorderAgenda: (sourceIndex: number, destinationIndex: number) => void;
    updateItemStatus: (itemId: string, statusVariant: ScheduleEntry['statusVariant'], statusIcon?: ScheduleEntry['statusIcon'], statusColor?: string) => void;
    removeAgendaItem: (itemId: string) => void;
    addAgendaItem: (item: AgendaDisplayItem) => void;
}

const ScheduleContext = createContext<ScheduleContextType | undefined>(undefined);

// Define fixed time slots for the daily agenda
const TIME_SLOTS = ['08:00', '09:30', '10:30', '11:00', '14:00', '16:00', '17:30'];

// Helper to sort items chronologically based on TIME_SLOTS order
const sortItemsByTime = (items: AgendaDisplayItem[]) => {
    return [...items].sort((a, b) => {
        return TIME_SLOTS.indexOf(a.time) - TIME_SLOTS.indexOf(b.time);
    });
};

const buildInitialAgendaItems = (): AgendaDisplayItem[] => {
    // 1. Map existing schedule items to a lookup map for easy access
    const scheduleMap = new Map<string, EnrichedScheduleEntry>();

    todaySchedule.forEach(entry => {
        scheduleMap.set(entry.time, {
            ...entry,
            student: getStudentById(entry.studentId)
        });
    });

    // 2. Build the full list ensuring every TIME_SLOT has an item (filled or free)
    const items: AgendaDisplayItem[] = TIME_SLOTS.map((time, index) => {
        const existingEntry = scheduleMap.get(time);

        if (existingEntry) {
            return {
                id: existingEntry.id,
                type: 'filled',
                time: existingEntry.time,
                endTime: existingEntry.endTime,
                clientName: existingEntry.student?.name || 'Aluno',
                activity: `${existingEntry.type} • ${existingEntry.detail.split(' • ')[0]}`,
                avatar: existingEntry.student?.avatar,
                statusVariant: existingEntry.statusVariant,
                statusIcon: existingEntry.statusIcon,
                statusColor: existingEntry.statusColor,
                studentId: existingEntry.studentId,
                color: existingEntry.color,
                detail: existingEntry.detail
            };
        } else {
            return {
                id: `free-${index}`,
                type: 'free',
                time: time,
                statusVariant: 'free'
            };
        }
    });

    return sortItemsByTime(items);
};

const deriveFilledSchedule = (agendaItems: AgendaDisplayItem[]): EnrichedScheduleEntry[] => {
    return agendaItems
        .filter(item => item.type === 'filled')
        .map(item => ({
            id: item.id,
            studentId: item.studentId || '',
            time: item.time,
            endTime: item.endTime || '',
            type: item.activity?.split(' • ')[0] || '',
            detail: item.detail || '',
            color: item.color || '#94a3b8',
            statusVariant: item.statusVariant as ScheduleEntry['statusVariant'] || 'default',
            statusIcon: item.statusIcon,
            statusColor: item.statusColor,
            student: item.studentId ? getStudentById(item.studentId) : undefined
        }));
};

export const ScheduleProvider = ({ children }: { children: ReactNode }) => {
    const [agendaItems, setAgendaItems] = useState<AgendaDisplayItem[]>(
        // Only use mock data when NOT connected to Supabase
        isSupabaseConfigured ? [] : buildInitialAgendaItems
    );

    // Fetch today's appointments from Supabase when configured
    useEffect(() => {
        if (!isSupabaseConfigured) return;

        let mounted = true;

        const loadFromDb = async () => {
            try {
                const supabase = await getSupabase();
                const today = new Date();
                const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString();
                const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59).toISOString();

                const { data: appointments, error } = await supabase
                    .from('appointments')
                    .select('*')
                    .gte('starts_at', startOfDay)
                    .lte('starts_at', endOfDay)
                    .order('starts_at', { ascending: true });

                if (error) throw error;
                if (!appointments || appointments.length === 0) {
                    // Ensure empty state for new users
                    if (mounted) setAgendaItems([]);
                    return;
                }

                // Fetch all students to map IDs → names/avatar
                const students = await fetchStudents();
                const studentMap = new Map(students.map(s => [s.id, s]));

                const COLORS = ['#22C55E', '#FF6D00', '#EAB308', '#3B82F6', '#8B5CF6', '#EC4899'];

                const dbItems: AgendaDisplayItem[] = (appointments as any[]).map((appt, idx) => {
                    const start = new Date(appt.starts_at);
                    const end = appt.ends_at ? new Date(appt.ends_at) : new Date(start.getTime() + (appt.duration_minutes || 60) * 60_000);
                    const timeStr = start.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                    const endStr = end.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                    const student = appt.student_id ? studentMap.get(appt.student_id) : undefined;
                    const color = COLORS[idx % COLORS.length];

                    // Determine status based on whether it's in the past
                    const isPast = end < today;
                    const isCancelled = appt.status === 'cancelled';
                    const isCompleted = appt.status === 'completed';

                    let statusVariant: 'default' | 'highlight' | 'free' | 'past' = 'default';
                    let statusIcon: 'check' | 'calendar' | 'clock' | undefined = 'clock';
                    let statusColor = '#94a3b8';

                    if (isCompleted || isPast) {
                        statusVariant = 'past';
                        statusIcon = 'check';
                        statusColor = '#22C55E';
                    } else if (appt.status === 'free' || isCancelled) {
                        statusVariant = 'free';
                        statusIcon = undefined;
                    }

                    if (appt.student_id && !isCancelled && appt.status !== 'free') {
                        return {
                            id: appt.id,
                            type: 'filled' as const,
                            time: timeStr,
                            endTime: endStr,
                            clientName: student?.name || 'Aluno',
                            activity: appt.activity || 'Treino',
                            avatar: student?.avatar,
                            statusVariant,
                            statusIcon,
                            statusColor,
                            studentId: appt.student_id,
                            color,
                            detail: appt.notes || appt.activity || '',
                        };
                    } else {
                        return {
                            id: appt.id || `free-db-${idx}`,
                            type: 'free' as const,
                            time: timeStr,
                            statusVariant: 'free' as const,
                        };
                    }
                });

                if (mounted) {
                    setAgendaItems(sortItemsByTime(dbItems));
                }
            } catch (err) {
                console.error('[ScheduleContext] Error loading appointments:', err);
                // Keep mock data on error
            }
        };

        loadFromDb();
        return () => { mounted = false; };
    }, []);

    const filledSchedule = deriveFilledSchedule(agendaItems);

    const totalWorkouts = filledSchedule.length;
    const completedWorkouts = filledSchedule.filter(s => s.statusVariant === 'past').length;
    const pendingWorkouts = totalWorkouts - completedWorkouts;

    const reorderAgenda = useCallback((sourceIndex: number, destinationIndex: number) => {
        setAgendaItems(prev => {
            const items = [...prev]; // Copy current state

            // Get the items at source and destination
            const sourceItem = items[sourceIndex];
            const destItem = items[destinationIndex];

            // Swap their times and IDs (to keep React keys stable if needed, but mainly time is key)
            // Ideally, we keep the ITEM content (student, activity) but assign it the NEW TIME.

            const newSourceItem = {
                ...sourceItem,
                time: destItem.time // Source item moves to Dest time
            };

            const newDestItem = {
                ...destItem,
                time: sourceItem.time // Dest item moves to Source time (swap)
            };

            // Update the array
            items[sourceIndex] = newDestItem;
            items[destinationIndex] = newSourceItem;

            // Re-sort chronologically to ensure the mapped list in UI stays in time order
            // This is crucial because drag-and-drop libraries visually swap positions,
            // but our data model relies on Time as the source of truth for order.
            return sortItemsByTime(items);
        });
    }, []);

    const updateItemStatus = useCallback((
        itemId: string,
        statusVariant: ScheduleEntry['statusVariant'],
        statusIcon?: ScheduleEntry['statusIcon'],
        statusColor?: string
    ) => {
        setAgendaItems(prev =>
            prev.map(item =>
                item.id === itemId
                    ? { ...item, statusVariant, statusIcon, statusColor }
                    : item
            )
        );
    }, []);

    const removeAgendaItem = useCallback((itemId: string) => {
        // When removing, we actually convert it to a free slot at that time
        setAgendaItems(prev => prev.map(item => {
            if (item.id === itemId) {
                return {
                    id: `free-${item.time}`,
                    type: 'free',
                    time: item.time,
                    statusVariant: 'free'
                };
            }
            return item;
        }));
    }, []);

    const addAgendaItem = useCallback((item: AgendaDisplayItem) => {
        setAgendaItems(prev => [...prev, item]);
    }, []);

    return (
        <ScheduleContext.Provider value={{
            agendaItems,
            filledSchedule,
            totalWorkouts,
            completedWorkouts,
            pendingWorkouts,
            reorderAgenda,
            updateItemStatus,
            removeAgendaItem,
            addAgendaItem
        }}>
            {children}
        </ScheduleContext.Provider>
    );
};

export const useSchedule = (): ScheduleContextType => {
    const context = useContext(ScheduleContext);
    if (!context) {
        throw new Error('useSchedule must be used within a ScheduleProvider');
    }
    return context;
};

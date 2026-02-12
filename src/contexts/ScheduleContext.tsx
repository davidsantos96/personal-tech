import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { todaySchedule, getStudentById, type ScheduleEntry, type Student } from '../data/students';

// Enriched schedule entry for Dashboard usage
export interface EnrichedScheduleEntry extends ScheduleEntry {
    student?: Student;
}

// Agenda item for display/drag-and-drop
export interface AgendaDisplayItem {
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
    const [agendaItems, setAgendaItems] = useState<AgendaDisplayItem[]>(buildInitialAgendaItems);

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

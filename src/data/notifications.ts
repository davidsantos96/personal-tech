import { studentsData, type Student } from './students';

// ─── Types ────────────────────────────────────────────────────────────────────

export type NotificationType =
    | 'plano_vencendo'
    | 'plano_vencido'
    | 'avaliacao_vencendo'
    | 'treino_vencendo'
    | 'aluno_inativo';

export type NotificationPriority = 'critical' | 'high' | 'medium';

export interface AppNotification {
    id: string;
    type: NotificationType;
    priority: NotificationPriority;
    studentId: string;
    studentName: string;
    studentAvatar: string;
    title: string;
    description: string;
    /** Days remaining / elapsed (contextual) */
    daysValue: number;
    /** Material symbol icon name */
    icon: string;
    /** Resolved color palette */
    color: {
        accent: string;
        bg: string;
        border: string;
        textMuted: string;
    };
    createdAt: Date;
}

// ─── Thresholds ───────────────────────────────────────────────────────────────

const PLAN_EXPIRING_DAYS = 3;        // warn when ≤ 3 days remaining
const EVAL_OVERDUE_DAYS  = 60;       // warn when last eval > 60 days ago
const INACTIVE_DAYS      = 14;       // warn when no training in > 14 days

// ─── Color palettes ───────────────────────────────────────────────────────────

const PALETTES: Record<NotificationPriority, AppNotification['color']> = {
    critical: {
        accent:    '#EF4444',
        bg:        '#2A1818',
        border:    'rgba(239, 68, 68, 0.25)',
        textMuted: 'rgba(254, 202, 202, 0.65)',
    },
    high: {
        accent:    '#FF6D00',
        bg:        '#251700',
        border:    'rgba(255, 109, 0, 0.25)',
        textMuted: 'rgba(255, 200, 150, 0.65)',
    },
    medium: {
        accent:    '#EAB308',
        bg:        '#282516',
        border:    'rgba(234, 179, 8, 0.22)',
        textMuted: 'rgba(254, 240, 138, 0.65)',
    },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function diffDays(a: Date, b: Date): number {
    return Math.round((b.getTime() - a.getTime()) / 86_400_000);
}

function parseDate(iso: string): Date {
    return new Date(iso + 'T00:00:00');
}

// ─── Engine ───────────────────────────────────────────────────────────────────

export function computeNotifications(
    students: Student[] = studentsData,
    now: Date = new Date(),
): AppNotification[] {
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const result: AppNotification[] = [];

    for (const s of students) {
        // ── plano_vencido ─────────────────────────────────────────────────────
        const planExpires = parseDate(s.planExpiresAt);
        const daysUntilPlan = diffDays(today, planExpires);

        if (daysUntilPlan === 0) {
            result.push({
                id:            `plano_vencido-${s.id}`,
                type:          'plano_vencido',
                priority:      'critical',
                studentId:     s.id,
                studentName:   s.name,
                studentAvatar: s.avatar,
                title:         'Plano Vencido Hoje',
                description:   `O plano de <strong>${s.name}</strong> venceu hoje. Renove para manter o acesso.`,
                daysValue:     0,
                icon:          'credit_card_off',
                color:         PALETTES.critical,
                createdAt:     now,
            });
        }

        // ── plano_vencendo ────────────────────────────────────────────────────
        else if (daysUntilPlan > 0 && daysUntilPlan <= PLAN_EXPIRING_DAYS) {
            result.push({
                id:            `plano_vencendo-${s.id}`,
                type:          'plano_vencendo',
                priority:      'high',
                studentId:     s.id,
                studentName:   s.name,
                studentAvatar: s.avatar,
                title:         'Plano a Vencer',
                description:   `O plano de <strong>${s.name}</strong> vence em <strong>${daysUntilPlan} ${daysUntilPlan === 1 ? 'dia' : 'dias'}</strong>. Contate o aluno.`,
                daysValue:     daysUntilPlan,
                icon:          'event_upcoming',
                color:         PALETTES.high,
                createdAt:     now,
            });
        }

        // ── treino_vencendo ───────────────────────────────────────────────────
        const seriesExpires = parseDate(s.workoutSeriesExpiresAt);
        const daysUntilSeries = diffDays(today, seriesExpires);

        if (daysUntilSeries === 1) {
            result.push({
                id:            `treino_vencendo-${s.id}`,
                type:          'treino_vencendo',
                priority:      'high',
                studentId:     s.id,
                studentName:   s.name,
                studentAvatar: s.avatar,
                title:         'Série de Treino Vence Amanhã',
                description:   `O plano de treino de <strong>${s.name}</strong> vence amanhã. Crie a nova série.`,
                daysValue:     1,
                icon:          'fitness_center',
                color:         PALETTES.high,
                createdAt:     now,
            });
        }

        // ── avaliacao_vencendo ────────────────────────────────────────────────
        const lastEval = parseDate(s.lastEvaluationAt);
        const daysSinceEval = diffDays(lastEval, today);

        if (daysSinceEval >= EVAL_OVERDUE_DAYS) {
            result.push({
                id:            `avaliacao_vencendo-${s.id}`,
                type:          'avaliacao_vencendo',
                priority:      'medium',
                studentId:     s.id,
                studentName:   s.name,
                studentAvatar: s.avatar,
                title:         'Reavaliação Pendente',
                description:   `Última avaliação de <strong>${s.name}</strong> foi há <strong>${daysSinceEval} dias</strong>. Agende uma nova.`,
                daysValue:     daysSinceEval,
                icon:          'pending_actions',
                color:         PALETTES.medium,
                createdAt:     now,
            });
        }

        // ── aluno_inativo ─────────────────────────────────────────────────────
        const lastTraining = parseDate(s.lastTrainingAt);
        const daysSinceTraining = diffDays(lastTraining, today);

        if (daysSinceTraining >= INACTIVE_DAYS) {
            result.push({
                id:            `aluno_inativo-${s.id}`,
                type:          'aluno_inativo',
                priority:      'medium',
                studentId:     s.id,
                studentName:   s.name,
                studentAvatar: s.avatar,
                title:         'Aluno Inativo',
                description:   `<strong>${s.name}</strong> não treina há <strong>${daysSinceTraining} dias</strong>. Verifique o engajamento.`,
                daysValue:     daysSinceTraining,
                icon:          'person_off',
                color:         PALETTES.medium,
                createdAt:     now,
            });
        }
    }

    // Sort: critical → high → medium, then by daysValue asc
    const priorityOrder: Record<NotificationPriority, number> = {
        critical: 0,
        high:     1,
        medium:   2,
    };

    return result.sort((a, b) => {
        const p = priorityOrder[a.priority] - priorityOrder[b.priority];
        return p !== 0 ? p : a.daysValue - b.daysValue;
    });
}

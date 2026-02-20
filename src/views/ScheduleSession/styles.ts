import styled from 'styled-components';
import { theme } from '../../styles/theme';

const PRIMARY = theme.colors.primary;
const BG = theme.colors.backgroundDark;
const CARD = theme.colors.surfaceCard;
const SURFACE = theme.colors.surfaceDark;
const BORDER = '#252525';
const TEXT_WHITE = theme.colors.text.white;
const TEXT_MUTED = theme.colors.text.slate500;
const TEXT_LABEL = theme.colors.text.slate400;

/* ── Layout ── */

export const Container = styled.div`
    min-height: 100vh;
    background-color: ${BG};
    padding-bottom: 7rem;
    width: 100%;
    max-width: 28rem;
    margin: 0 auto;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
    position: relative;
`;

export const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem 1.25rem;
    background-color: ${BG};
    position: sticky;
    top: 0;
    z-index: 10;
    border-bottom: 1px solid ${BORDER};
`;

export const BackButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    color: ${TEXT_WHITE};
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
        width: 22px;
        height: 22px;
    }
    &:hover { opacity: 0.75; }
`;

export const PageTitle = styled.h1`
    font-size: 1.125rem;
    font-weight: 700;
    color: ${TEXT_WHITE};
    margin: 0;
    letter-spacing: 0.01em;
`;

export const HeaderSpacer = styled.div`
    width: 38px;
`;

/* ── Calendar strip ── */

export const CalendarSection = styled.div`
    padding: 1.25rem 1.25rem 0.5rem;
`;

export const MonthRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.1rem;
`;

export const MonthLabel = styled.span`
    font-size: 1.05rem;
    font-weight: 700;
    color: ${TEXT_WHITE};
`;

export const NavRow = styled.div`
    display: flex;
    gap: 0.5rem;
`;

export const NavBtn = styled.button`
    background: none;
    border: none;
    color: ${TEXT_WHITE};
    cursor: pointer;
    padding: 0.25rem;
    display: flex;
    align-items: center;
    font-size: 1.15rem;
    &:hover { color: ${PRIMARY}; }
`;

export const DaysStrip = styled.div`
    display: flex;
    gap: 0.45rem;
    overflow-x: auto;
    padding-bottom: 0.25rem;
    scrollbar-width: none;
    &::-webkit-scrollbar { display: none; }
`;

interface DayCardProps {
    $active?: boolean;
}

export const DayCard = styled.button<DayCardProps>`
    flex: 0 0 auto;
    width: 64px;
    padding: 0.75rem 0;
    border-radius: 14px;
    border: none;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.35rem;
    transition: all 0.15s;
    background-color: ${({ $active }) => ($active ? PRIMARY : CARD)};
    color: ${({ $active }) => ($active ? theme.colors.text.white : TEXT_MUTED)};

    &:hover {
        background-color: ${({ $active }) => ($active ? PRIMARY : SURFACE)};
    }
`;

export const DayName = styled.span`
    font-size: 0.65rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
`;

export const DayNum = styled.span`
    font-size: 1.4rem;
    font-weight: 800;
    line-height: 1;
`;

/* ── Form ── */

export const FormSection = styled.div`
    padding: 1.5rem 1.25rem 0;
    display: flex;
    flex-direction: column;
    gap: 1.4rem;
`;

export const FieldGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

export const FieldRow = styled.div`
    display: flex;
    gap: 0.75rem;
`;

export const Label = styled.label`
    font-size: 0.875rem;
    font-weight: 600;
    color: ${TEXT_LABEL};
    letter-spacing: 0.01em;
`;

export const SelectWrapper = styled.div`
    position: relative;
    background-color: ${CARD};
    border: 1px solid ${BORDER};
    border-radius: 12px;
    display: flex;
    align-items: center;
    padding: 0 1rem;
    height: 54px;
`;

export const StyledSelect = styled.select`
    background: transparent;
    border: none;
    outline: none;
    color: ${TEXT_WHITE};
    font-size: 0.95rem;
    width: 100%;
    appearance: none;
    cursor: pointer;

    option {
        background-color: ${CARD};
        color: ${TEXT_WHITE};
    }
`;

export const ChevronIcon = styled.span`
    color: ${PRIMARY};
    font-size: 1.2rem;
    pointer-events: none;
    display: flex;
    align-items: center;
`;

/* Time field */

export const TimeWrapper = styled.div`
    flex: 1;
    position: relative;
    background-color: ${CARD};
    border: 1px solid ${BORDER};
    border-radius: 12px;
    display: flex;
    align-items: center;
    padding: 0 0.85rem;
    height: 54px;
    gap: 0.5rem;
`;

export const TimeInput = styled.input`
    background: transparent;
    border: none;
    outline: none;
    color: ${TEXT_WHITE};
    font-size: 0.95rem;
    width: 100%;
    cursor: pointer;

    &::-webkit-calendar-picker-indicator {
        display: none;
    }
`;

export const ClockIconBtn = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    color: ${PRIMARY};
    display: flex;
    align-items: center;
    svg { width: 20px; height: 20px; }
`;

/* Session type chips */

export const ChipsRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
`;

interface ChipProps {
    $active?: boolean;
}

export const Chip = styled.button<ChipProps>`
    padding: 0.55rem 1.1rem;
    border-radius: 9999px;
    border: 2px solid ${({ $active }) => ($active ? PRIMARY : BORDER)};
    background: transparent;
    color: ${({ $active }) => ($active ? PRIMARY : TEXT_MUTED)};
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.15s;

    &:hover {
        border-color: ${PRIMARY};
        color: ${PRIMARY};
    }
`;

/* Notes */

export const NotesTextarea = styled.textarea`
    background-color: ${CARD};
    border: 1px solid ${BORDER};
    border-radius: 12px;
    padding: 0.9rem 1rem;
    color: ${TEXT_WHITE};
    font-size: 0.9rem;
    width: 100%;
    min-height: 110px;
    resize: none;
    outline: none;
    font-family: inherit;
    box-sizing: border-box;

    &::placeholder {
        color: ${TEXT_MUTED};
    }

    &:focus {
        border-color: ${PRIMARY}55;
    }
`;

/* Submit */

export const SubmitArea = styled.div`
    padding: 1.25rem;
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 28rem;
    background: linear-gradient(to top, ${BG} 70%, transparent);
`;

export const ScheduleButton = styled.button`
    width: 100%;
    height: 56px;
    border-radius: 14px;
    border: none;
    background-color: ${PRIMARY};
    color: ${theme.colors.text.white};
    font-size: 1rem;
    font-weight: 800;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    transition: opacity 0.15s;
    letter-spacing: 0.02em;

    svg {
        width: 20px;
        height: 20px;
    }

    &:hover { opacity: 0.88; }
    &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
    }
`;

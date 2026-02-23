import styled, { css, keyframes } from 'styled-components';
import { theme } from '../../styles/theme';

/* ─── Layout ─────────────────────────────────────────────────── */

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  max-width: 28rem;
  margin: 0 auto;
  background-color: ${theme.colors.backgroundDark};
  color: ${theme.colors.text.white};
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  position: relative;
  padding-bottom: 6rem;
`;

export const ScrollPane = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  scroll-behavior: smooth;

  &::-webkit-scrollbar { width: 2px; }
  &::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 99px; }
`;

/* ─── Topbar ─────────────────────────────────────────────────── */

export const Topbar = styled.header`
  background: ${theme.colors.surfaceDark};
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  padding: 14px 18px;
  display: flex;
  align-items: center;
  gap: 12px;
  position: sticky;
  top: 0;
  z-index: 10;
`;

export const BackButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 9px;
  background: ${theme.colors.surfaceCard};
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${theme.colors.text.slate400};
  flex-shrink: 0;
  transition: all 0.2s;

  &:hover {
    border-color: rgba(255, 255, 255, 0.15);
    color: ${theme.colors.text.white};
  }

  svg { width: 16px; height: 16px; }
`;

export const TopbarTitle = styled.span`
  font-family: ${theme.fonts.display};
  font-size: 15px;
  font-weight: 800;
  color: ${theme.colors.text.white};
  flex: 1;
`;

export const TopbarAction = styled.button<{ $saved?: boolean }>`
  padding: 7px 14px;
  border-radius: 99px;
  border: 1.5px solid rgba(255, 255, 255, 0.08);
  background: ${theme.colors.surfaceCard};
  font-family: ${theme.fonts.display};
  font-size: 11px;
  font-weight: 700;
  color: ${theme.colors.primary};
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    border-color: ${theme.colors.primary};
    background: rgba(255, 109, 0, 0.1);
  }

  ${props => props.$saved && css`
    color: #22C55E;
    border-color: #22C55E;
    background: rgba(34, 197, 94, 0.1);
  `}
`;

/* ─── Hero Section ───────────────────────────────────────────── */

export const HeroWrapper = styled.div`
  background: ${theme.colors.surfaceDark};
  padding: 20px 20px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 50% 0%, rgba(255, 107, 0, 0.11) 0%, transparent 65%);
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255, 107, 0, 0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 107, 0, 0.025) 1px, transparent 1px);
    background-size: 28px 28px;
    pointer-events: none;
  }
`;

export const HeroInner = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;

export const AvatarRing = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${theme.colors.primary}, #ff3300);
  padding: 3px;
  cursor: pointer;
  box-shadow: 0 6px 24px rgba(255, 107, 0, 0.25);
  transition: box-shadow 0.3s;

  &:hover { box-shadow: 0 10px 36px rgba(255, 107, 0, 0.35); }
`;

export const AvatarInner = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #2a2a2a;
  border: 3px solid ${theme.colors.backgroundDark};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  position: relative;
  overflow: hidden;
`;

export const AvatarCamOverlay = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
  font-size: 18px;

  ${AvatarRing}:hover & { opacity: 1; }
`;

export const HeroName = styled.div`
  font-family: ${theme.fonts.display};
  font-size: 19px;
  font-weight: 800;
  color: ${theme.colors.text.white};
`;

export const HeroSub = styled.div`
  font-size: 12px;
  color: ${theme.colors.text.slate400};
  margin-top: -6px;
`;

export const CrefBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border-radius: 99px;
  background: rgba(255, 107, 0, 0.1);
  border: 1.5px solid rgba(255, 107, 0, 0.25);
  font-family: ${theme.fonts.display};
  font-size: 11px;
  font-weight: 700;
  color: ${theme.colors.primary};
`;

export const StatsStrip = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 16px 0 0;
  border-radius: 14px 14px 0 0;
  background: ${theme.colors.surfaceCard};
  border: 1.5px solid rgba(255, 255, 255, 0.06);
  border-bottom: none;
`;

export const StatCell = styled.div`
  padding: 12px 8px;
  text-align: center;
  border-right: 1px solid rgba(255, 255, 255, 0.06);

  &:last-child { border-right: none; }
`;

export const StatVal = styled.div`
  font-family: ${theme.fonts.display};
  font-size: 18px;
  font-weight: 800;
  color: ${theme.colors.text.white};
`;

export const StatLbl = styled.div`
  font-size: 9px;
  color: ${theme.colors.text.slate500};
  margin-top: 2px;
`;

/* ─── Topic Menu Cards ───────────────────────────────────────── */

export const TopicsContainer = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const TopicCard = styled.div<{ $danger?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  background: ${theme.colors.surfaceCard};
  border-radius: 14px;
  border: 1.5px solid rgba(255, 255, 255, 0.08);
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${props => props.$danger ? 'rgba(239, 68, 68, 0.35)' : 'rgba(255, 107, 0, 0.35)'};
    background: ${props => props.$danger ? 'rgba(239, 68, 68, 0.06)' : '#1e1508'};
  }

  ${props => props.$danger && css`
    border-color: rgba(239, 68, 68, 0.2);
    background: rgba(239, 68, 68, 0.04);
  `}
`;

export const TopicLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const TopicIcon = styled.div<{ $variant?: 'green' | 'red' }>`
  width: 38px;
  height: 38px;
  border-radius: 12px;
  background: rgba(255, 107, 0, 0.1);
  border: 1px solid rgba(255, 107, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  flex-shrink: 0;

  ${props => props.$variant === 'green' && css`
    background: rgba(34, 197, 94, 0.08);
    border-color: rgba(34, 197, 94, 0.2);
  `}

  ${props => props.$variant === 'red' && css`
    background: rgba(239, 68, 68, 0.1);
    border-color: rgba(239, 68, 68, 0.2);
  `}
`;

export const TopicTextWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TopicTitle = styled.strong`
  font-family: ${theme.fonts.display};
  font-size: 13px;
  font-weight: 700;
  color: ${theme.colors.text.white};
`;

export const TopicSub = styled.span`
  font-size: 11px;
  color: ${theme.colors.text.slate400};
`;

export const TopicRight = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
`;

export const TopicBadge = styled.div<{ $warn?: boolean }>`
  padding: 3px 9px;
  border-radius: 99px;
  font-family: ${theme.fonts.display};
  font-size: 10px;
  font-weight: 700;
  background: rgba(34, 197, 94, 0.1);
  color: #22C55E;
  border: 1px solid rgba(34, 197, 94, 0.2);

  ${props => props.$warn && css`
    background: rgba(239, 68, 68, 0.1);
    color: #EF4444;
    border-color: rgba(239, 68, 68, 0.2);
  `}
`;

export const ChevronRight = styled.span`
  font-size: 18px;
  color: ${theme.colors.text.slate500};
`;

/* ─── Section Body (fade-in content) ─────────────────────────── */

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const SectionBody = styled.div`
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  animation: ${fadeUp} 0.3s ease both;
`;

/* ─── Section Label ──────────────────────────────────────────── */

export const SectionLabel = styled.div`
  font-family: ${theme.fonts.display};
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${theme.colors.text.slate500};
`;

/* ─── Form Fields ────────────────────────────────────────────── */

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const FieldLabel = styled.label`
  font-size: 11px;
  font-weight: 500;
  color: ${theme.colors.text.slate400};
  padding-left: 2px;
`;

const fieldBase = css`
  background: ${theme.colors.surfaceCard};
  border: 1.5px solid rgba(255, 255, 255, 0.08);
  border-radius: 11px;
  padding: 11px 14px;
  color: ${theme.colors.text.white};
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  outline: none;
  width: 100%;
  transition: border-color 0.2s, box-shadow 0.2s;
  -webkit-appearance: none;

  &:focus {
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(255, 107, 0, 0.1);
  }
`;

export const FieldInput = styled.input`${fieldBase}`;

export const FieldSelect = styled.select`
  ${fieldBase}
  option { background: #1e1e1e; }
`;

export const FieldTextarea = styled.textarea`
  ${fieldBase}
  resize: none;
  height: 72px;
`;

export const Row2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

/* ─── Chips ──────────────────────────────────────────────────── */

export const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
`;

export const Chip = styled.div<{ $active?: boolean }>`
  padding: 6px 13px;
  border-radius: 99px;
  border: 1.5px solid rgba(255, 255, 255, 0.08);
  background: ${theme.colors.surfaceCard};
  color: ${theme.colors.text.slate400};
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.18s;

  ${props => props.$active && css`
    border-color: ${theme.colors.primary};
    background: rgba(255, 107, 0, 0.1);
    color: ${theme.colors.primary};
  `}
`;

/* ─── Day Grid ───────────────────────────────────────────────── */

export const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
`;

export const DayButton = styled.div<{ $active?: boolean }>`
  padding: 9px 2px;
  border-radius: 10px;
  border: 1.5px solid rgba(255, 255, 255, 0.08);
  background: ${theme.colors.surfaceCard};
  color: ${theme.colors.text.slate500};
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  text-align: center;
  transition: all 0.18s;
  font-family: ${theme.fonts.display};

  ${props => props.$active && css`
    border-color: ${theme.colors.primary};
    background: rgba(255, 107, 0, 0.1);
    color: ${theme.colors.primary};
  `}
`;

/* ─── Time Row ───────────────────────────────────────────────── */

export const TimeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const TimeSep = styled.span`
  font-size: 12px;
  color: ${theme.colors.text.slate500};
  flex-shrink: 0;
`;

export const TimeInput = styled.input`
  flex: 1;
  background: ${theme.colors.surfaceCard};
  border: 1.5px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  padding: 10px 12px;
  color: ${theme.colors.text.white};
  font-family: ${theme.fonts.display};
  font-size: 14px;
  font-weight: 700;
  outline: none;
  transition: border-color 0.2s;
  text-align: center;
  -webkit-appearance: none;

  &:focus { border-color: ${theme.colors.primary}; }
`;

/* ─── Toggle / Switch ────────────────────────────────────────── */

export const ToggleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  background: ${theme.colors.surfaceCard};
  border-radius: 12px;
  border: 1.5px solid rgba(255, 255, 255, 0.08);
  cursor: pointer;
  transition: border-color 0.2s;

  &:hover { border-color: rgba(255, 255, 255, 0.12); }
`;

export const ToggleLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ToggleEmoji = styled.span`
  font-size: 16px;
`;

export const ToggleTextWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ToggleTitle = styled.strong`
  font-size: 13px;
  font-weight: 600;
  color: ${theme.colors.text.white};
`;

export const ToggleSub = styled.span`
  font-size: 11px;
  color: ${theme.colors.text.slate400};
`;

export const SwitchTrack = styled.div<{ $on: boolean }>`
  width: 42px;
  height: 24px;
  border-radius: 99px;
  transition: background 0.25s;
  flex-shrink: 0;
  position: relative;
  background: ${props => props.$on ? theme.colors.primary : 'rgba(255,255,255,0.08)'};
`;

export const SwitchThumb = styled.div<{ $on: boolean }>`
  position: absolute;
  top: 3px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.35);
  transition: left 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  left: ${props => props.$on ? '21px' : '3px'};
`;

/* ─── Fat / Revenue Card ─────────────────────────────────────── */

export const FatCard = styled.div`
  background: ${theme.colors.surfaceCard};
  border: 1.5px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: 16px;
`;

export const FatVal = styled.div`
  font-family: ${theme.fonts.display};
  font-size: 26px;
  font-weight: 800;
  color: ${theme.colors.text.white};
  margin: 4px 0 12px;
`;

export const FatBadge = styled.span`
  padding: 4px 10px;
  border-radius: 99px;
  font-family: ${theme.fonts.display};
  font-size: 10px;
  font-weight: 700;
  background: rgba(34, 197, 94, 0.1);
  color: #22C55E;
  border: 1px solid rgba(34, 197, 94, 0.25);
`;

export const MiniChart = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 5px;
  height: 40px;
  margin-top: 12px;
`;

export const MiniBar = styled.div<{ $highlight?: boolean }>`
  flex: 1;
  border-radius: 4px 4px 0 0;
  min-height: 4px;
  background: ${props => props.$highlight ? theme.colors.primary : 'rgba(255,255,255,0.05)'};
`;

export const FatRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 11px 14px;
  background: ${theme.colors.surfaceCard};
  border-radius: 11px;
  border: 1.5px solid rgba(255, 255, 255, 0.08);
`;

export const FatDot = styled.div<{ $color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-right: 10px;
  background: ${props => props.$color};
`;

/* ─── KPI Grid ───────────────────────────────────────────────── */

export const KpiGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

export const KpiCard = styled.div`
  background: ${theme.colors.surfaceCard};
  border: 1.5px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 12px 14px;
`;

export const KpiLabel = styled.div`
  font-size: 10px;
  color: ${theme.colors.text.slate400};
`;

export const KpiVal = styled.div`
  font-family: ${theme.fonts.display};
  font-size: 20px;
  font-weight: 800;
  color: ${theme.colors.primary};
  margin: 4px 0 2px;
`;

export const KpiSub = styled.div`
  font-size: 10px;
  color: ${theme.colors.text.slate500};
`;

/* ─── Menu Item (Conta) ──────────────────────────────────────── */

export const MenuItem = styled.div<{ $danger?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px;
  background: ${theme.colors.surfaceCard};
  border-radius: 12px;
  border: 1.5px solid rgba(255, 255, 255, 0.08);
  cursor: pointer;
  transition: all 0.18s;

  &:hover {
    border-color: ${props => props.$danger ? 'rgba(239, 68, 68, 0.4)' : 'rgba(255, 255, 255, 0.12)'};
    ${props => props.$danger && 'background: rgba(239, 68, 68, 0.1);'}
  }
`;

export const MenuLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const MenuIcon = styled.div<{ $variant?: 'orange' | 'red' }>`
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;

  ${props => props.$variant === 'orange' && css`
    background: rgba(255, 107, 0, 0.1);
    border-color: rgba(255, 107, 0, 0.2);
  `}

  ${props => props.$variant === 'red' && css`
    background: rgba(239, 68, 68, 0.1);
    border-color: rgba(239, 68, 68, 0.15);
  `}
`;

export const MenuTextWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MenuTitle = styled.strong<{ $danger?: boolean }>`
  font-size: 13px;
  font-weight: 600;
  color: ${props => props.$danger ? '#EF4444' : theme.colors.text.white};
`;

export const MenuSub = styled.span`
  font-size: 11px;
  color: ${theme.colors.text.slate400};
`;

/* ─── Plan Card ──────────────────────────────────────────────── */

export const PlanCard = styled.div`
  background: linear-gradient(135deg, #1a0800, #220e00);
  border: 1.5px solid rgba(255, 107, 0, 0.2);
  border-radius: 14px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PlanInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PlanTitle = styled.strong`
  font-family: ${theme.fonts.display};
  font-size: 14px;
  font-weight: 800;
  color: ${theme.colors.text.white};
`;

export const PlanSub = styled.span`
  font-size: 11px;
  color: ${theme.colors.text.slate400};
`;

export const PlanButton = styled.button`
  padding: 8px 16px;
  border-radius: 99px;
  background: ${theme.colors.primary};
  border: none;
  color: #fff;
  font-family: ${theme.fonts.display};
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(255, 107, 0, 0.25);
  transition: all 0.18s;

  &:hover { transform: translateY(-1px); }
`;

/* ─── Summary Card ───────────────────────────────────────────── */

export const SummaryCard = styled.div`
  background: ${theme.colors.surfaceCard};
  border: 1.5px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 13px 14px;
`;

export const SummaryText = styled.div`
  font-size: 13px;
  color: ${theme.colors.text.white};
  line-height: 1.8;
`;

export const OrangeText = styled.span`
  color: ${theme.colors.primary};
  font-weight: 700;
`;

/* ─── Month Selector ─────────────────────────────────────────── */

export const MonthSelector = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${theme.colors.surfaceCard};
  border: 1.5px solid rgba(255, 255, 255, 0.08);
  border-radius: 11px;
  padding: 10px 14px;
`;

export const MonthArrow = styled.span`
  font-size: 18px;
  color: ${theme.colors.text.slate500};
  cursor: pointer;
  padding: 0 4px;
  user-select: none;

  &:hover { color: ${theme.colors.text.white}; }
`;

export const MonthLabel = styled.span`
  font-family: ${theme.fonts.display};
  font-size: 13px;
  font-weight: 700;
  color: ${theme.colors.text.white};
`;

/* ─── Counter Badge ──────────────────────────────────────────── */

export const CounterBadge = styled.div`
  background: ${theme.colors.surfaceCard};
  border: 1.5px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 12px 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CounterLabel = styled.span`
  font-size: 12px;
  color: ${theme.colors.text.slate400};
`;

export const CounterValue = styled.span`
  font-family: ${theme.fonts.display};
  font-size: 16px;
  font-weight: 800;
  color: ${theme.colors.primary};
`;

/* ─── Footer Version ─────────────────────────────────────────── */

export const FooterVersion = styled.div`
  text-align: center;
  font-size: 11px;
  color: ${theme.colors.text.slate500};
  padding-top: 2px;

  a, span.link {
    color: ${theme.colors.primary};
    cursor: pointer;
  }
`;

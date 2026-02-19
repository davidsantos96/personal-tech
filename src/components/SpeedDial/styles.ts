import styled, { keyframes } from 'styled-components';
import { theme } from '../../styles/theme';

/* ──────────────────────────────────────────────────
   Keyframes
────────────────────────────────────────────────── */

const backdropIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const itemIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(12px) scale(0.82);
  }
  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
`;

const toastIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-14px) scale(0.94);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

/* ──────────────────────────────────────────────────
   Backdrop
────────────────────────────────────────────────── */

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.72);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  z-index: 150;
  animation: ${backdropIn} 0.22s ease-out forwards;
`;

/* ──────────────────────────────────────────────────
   Action items stack
────────────────────────────────────────────────── */

export const ActionsWrapper = styled.div`
  position: fixed;
  bottom: 130px;
  /* Right edge sits at (50% + 24px) from left, so icon center = 50% = trigger center */
  right: calc(50% - 24px);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 14px;
  z-index: 180;
  pointer-events: none;
`;

export const ActionRow = styled.div<{ $index: number; $total: number }>`
  display: flex;
  align-items: center;
  gap: 12px;
  pointer-events: all;
  cursor: pointer;
  opacity: 0;
  /* Stagger: bottom item (highest $index) appears first → delay = (total - 1 - index) * 55ms */
  animation: ${itemIn} 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  animation-delay: ${({ $index, $total }) => ($total - 1 - $index) * 55}ms;

  &:hover button {
    transform: scale(1.12);
    box-shadow: 0 8px 28px rgba(0, 0, 0, 0.55);
  }
`;

export const ActionLabelPill = styled.span`
  font-size: 0.8125rem;
  font-weight: 600;
  color: #fff;
  background: rgba(18, 18, 18, 0.96);
  border: 1px solid rgba(255, 255, 255, 0.09);
  padding: 0.4rem 1.1rem;
  border-radius: 9999px;
  white-space: nowrap;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.4);
  letter-spacing: 0.015em;
  user-select: none;
  transition: background 0.15s ease;

  ${ActionRow}:hover & {
    background: rgba(30, 30, 30, 0.98);
  }
`;

export const ActionIconButton = styled.button<{ $color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: ${({ $color }) => $color};
  color: #fff;
  cursor: pointer;
  flex-shrink: 0;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.35);
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1),
              box-shadow 0.2s ease;
`;

/* ──────────────────────────────────────────────────
   Trigger FAB (portal – always above backdrop)
────────────────────────────────────────────────── */

export const SpeedDialTrigger = styled.button<{ $isOpen: boolean }>`
  position: fixed;
  bottom: 56px;
  left: 50%;
  /* translateX(-50%) centres the button; rotate() animates the icon */
  transform: translateX(-50%)
    rotate(${({ $isOpen }) => ($isOpen ? '45deg' : '0deg')});
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  border: none;
  background: ${theme.colors.primary};
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 200;
  box-shadow: ${({ $isOpen }) =>
    $isOpen
      ? '0 0 32px rgba(255, 109, 0, 0.7)'
      : '0 0 20px rgba(255, 109, 0, 0.4)'};
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
              box-shadow 0.25s ease;

  &:active {
    transform: translateX(-50%)
      rotate(${({ $isOpen }) => ($isOpen ? '45deg' : '0deg')})
      scale(0.92);
  }
`;

/* ──────────────────────────────────────────────────
   Toast (portal)
────────────────────────────────────────────────── */

/* Outer positioner keeps translateX(-50%) for centering */
export const ToastPositioner = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 250;
  pointer-events: none;
`;

/* Inner element owns the entry animation (only translateY + scale) */
export const ToastInner = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(14, 14, 14, 0.97);
  border: 1px solid rgba(255, 109, 0, 0.3);
  border-left: 3px solid ${theme.colors.primary};
  padding: 0.7rem 1.2rem 0.7rem 1rem;
  border-radius: 9999px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.55);
  white-space: nowrap;
  animation: ${toastIn} 0.38s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
`;

export const ToastIcon = styled.span`
  font-size: 18px;
  color: ${theme.colors.primary};
`;

export const ToastText = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: #fff;
  letter-spacing: 0.01em;
`;

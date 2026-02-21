import styled, { keyframes, css } from 'styled-components';
import { theme } from '../../../styles/theme';

/* ── Keyframes ── */

const fadeUp = keyframes`
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
`;

/* ── Layout ── */

export const Container = styled.div`
    min-height: 100vh;
    background-color: ${theme.colors.backgroundDark};
    width: 100%;
    max-width: 28rem;
    margin: 0 auto;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    position: relative;
    padding-bottom: 2rem;
`;

export const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.125rem 1rem;
    background-color: ${theme.colors.surfaceDark};
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    position: sticky;
    top: 0;
    z-index: 10;
`;

export const HeaderLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 0.625rem;
`;

export const BackButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    color: ${theme.colors.text.white};
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        width: 24px;
        height: 24px;
    }

    &:hover { opacity: 0.8; }
`;

export const PageTitle = styled.h1`
    font-size: 0.9rem;
    font-weight: 700;
    color: ${theme.colors.text.white};
    margin: 0;
    font-family: ${theme.fonts.display};
`;

export const PageSubtitle = styled.span`
    font-size: 0.6875rem;
    color: ${theme.colors.text.slate500};
`;

export const ProtoBadge = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 0.3rem 0.625rem;
    border-radius: ${theme.borderRadius.full};
    background: rgba(255, 109, 0, 0.1);
    border: 1px solid rgba(255, 109, 0, 0.25);
    font-size: 0.6875rem;
    font-weight: 700;
    color: ${theme.colors.primary};
    font-family: ${theme.fonts.display};
    white-space: nowrap;
`;

/* ── Tab bar ── */

export const TabBar = styled.div`
    display: flex;
    background: ${theme.colors.surfaceDark};
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
    padding: 0.75rem 1rem;
    gap: 0.5rem;
    overflow-x: auto;

    &::-webkit-scrollbar { display: none; }
    -ms-overflow-style: none;
    scrollbar-width: none;
`;

export const TabPill = styled.button<{ $active: boolean }>`
    flex-shrink: 0;
    padding: 0.5rem 0.875rem;
    border-radius: ${theme.borderRadius.full};
    font-family: ${theme.fonts.display};
    font-size: 0.75rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.18s;
    white-space: nowrap;
    border: 1.5px solid ${({ $active }) =>
        $active ? theme.colors.primary : 'rgba(255,255,255,0.08)'};
    background: ${({ $active }) =>
        $active ? theme.colors.primary : 'transparent'};
    color: ${({ $active }) =>
        $active ? '#fff' : theme.colors.text.slate400};
    box-shadow: ${({ $active }) =>
        $active ? '0 3px 12px rgba(255, 109, 0, 0.28)' : 'none'};
`;

/* ── Body (animated panel) ── */

export const Body = styled.div`
    padding: 1.125rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.875rem;
    animation: ${fadeUp} 0.3s ease both;
`;

/* ── Section header ── */

export const SectionHead = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

export const SectionIcon = styled.div`
    width: 32px;
    height: 32px;
    border-radius: ${theme.borderRadius.DEFAULT};
    background: rgba(255, 109, 0, 0.1);
    border: 1px solid rgba(255, 109, 0, 0.18);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.875rem;
`;

export const SectionTitle = styled.span`
    font-family: ${theme.fonts.display};
    font-size: 0.8125rem;
    font-weight: 700;
    color: ${theme.colors.text.white};
`;

export const SectionSub = styled.span`
    font-size: 0.6875rem;
    color: ${theme.colors.text.slate400};
    font-style: italic;
`;

/* ── Labels ── */

export const SLabel = styled.span`
    font-family: ${theme.fonts.display};
    font-size: 0.625rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${theme.colors.text.slate500};
`;

/* ── Field ── */

export const Field = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

export const FieldLabel = styled.label`
    font-size: 0.6875rem;
    font-weight: 500;
    color: ${theme.colors.text.slate400};
    padding-left: 2px;
`;

export const Input = styled.input`
    background: ${theme.colors.surfaceCard};
    border: 1.5px solid rgba(255, 255, 255, 0.08);
    border-radius: ${theme.borderRadius.lg};
    padding: 0.7rem 0.8rem;
    color: ${theme.colors.text.white};
    font-family: ${theme.fonts.display};
    font-size: 0.875rem;
    outline: none;
    width: 100%;
    transition: border-color 0.2s, box-shadow 0.2s;
    box-sizing: border-box;
    appearance: none;
    -webkit-appearance: none;

    &:focus {
        border-color: ${theme.colors.primary};
        box-shadow: 0 0 0 3px rgba(255, 109, 0, 0.1);
    }

    &::placeholder { color: ${theme.colors.text.slate500}; }
`;

export const Textarea = styled.textarea`
    background: ${theme.colors.surfaceCard};
    border: 1.5px solid rgba(255, 255, 255, 0.08);
    border-radius: ${theme.borderRadius.lg};
    padding: 0.7rem 0.8rem;
    color: ${theme.colors.text.white};
    font-family: ${theme.fonts.display};
    font-size: 0.875rem;
    outline: none;
    width: 100%;
    resize: none;
    height: 68px;
    transition: border-color 0.2s, box-shadow 0.2s;
    box-sizing: border-box;

    &:focus {
        border-color: ${theme.colors.primary};
        box-shadow: 0 0 0 3px rgba(255, 109, 0, 0.1);
    }

    &::placeholder { color: ${theme.colors.text.slate500}; }
`;

/* ── Rows ── */

export const Row2 = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.625rem;
`;

export const Row3 = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0.5rem;
`;

/* ── Divider ── */

export const Divider = styled.div`
    height: 1px;
    background: rgba(255, 255, 255, 0.06);
`;

/* ── Sex selector ── */

export const SexSelector = styled.div`
    display: flex;
    gap: 0.625rem;
`;

export const SexOption = styled.div<{ $active: boolean }>`
    flex: 1;
    padding: 0.7rem;
    border-radius: ${theme.borderRadius.lg};
    border: 1.5px solid ${({ $active }) =>
        $active ? theme.colors.primary : 'rgba(255,255,255,0.08)'};
    background: ${({ $active }) =>
        $active ? 'rgba(255, 109, 0, 0.1)' : theme.colors.surfaceCard};
    color: ${({ $active }) =>
        $active ? theme.colors.primary : theme.colors.text.slate400};
    font-family: ${theme.fonts.display};
    font-size: 0.8125rem;
    font-weight: 700;
    text-align: center;
    cursor: pointer;
    transition: all 0.18s;
`;

/* ── IMC / Live stat inline card ── */

export const LiveStatCard = styled.div`
    background: ${theme.colors.surfaceCard};
    border: 1.5px solid rgba(255, 255, 255, 0.06);
    border-radius: ${theme.borderRadius.lg};
    padding: 0.7rem 0.8rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const LiveStatLabel = styled.div`
    font-size: 0.6875rem;
    color: ${theme.colors.text.slate400};
`;

export const LiveStatValue = styled.div<{ $color?: string }>`
    font-family: ${theme.fonts.display};
    font-size: 1.375rem;
    font-weight: 800;
    color: ${({ $color }) => $color || theme.colors.text.white};
    line-height: 1;
`;

export const LiveStatBadge = styled.span<{ $color: string }>`
    padding: 0.375rem 0.75rem;
    border-radius: ${theme.borderRadius.full};
    background: ${({ $color }) => `${$color}20`};
    border: 1px solid ${({ $color }) => `${$color}40`};
    color: ${({ $color }) => $color};
    font-size: 0.75rem;
    font-weight: 700;
    font-family: ${theme.fonts.display};
`;

/* ── Photo zone ── */

export const PhotoZone = styled.div`
    border: 2px dashed rgba(255, 255, 255, 0.1);
    border-radius: ${theme.borderRadius.lg};
    padding: 1.125rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    transition: all 0.2s;
    text-align: center;

    &:hover {
        border-color: ${theme.colors.primary};
        background: rgba(255, 109, 0, 0.06);
    }
`;

export const PhotoLabel = styled.span`
    font-size: 0.75rem;
    font-weight: 700;
    color: ${theme.colors.primary};
`;

/* ── Tip / info box ── */

export const TipBox = styled.div`
    display: flex;
    gap: 0.5rem;
    padding: 0.625rem 0.75rem;
    background: rgba(59, 130, 246, 0.06);
    border: 1.5px solid rgba(59, 130, 246, 0.18);
    border-radius: ${theme.borderRadius.lg};
`;

export const TipIcon = styled.span`
    font-size: 0.875rem;
    flex-shrink: 0;
    margin-top: 1px;
`;

export const TipTextWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1px;
`;

export const TipTitle = styled.strong`
    font-size: 0.6875rem;
    font-weight: 700;
    color: ${theme.colors.text.white};
`;

export const TipText = styled.span`
    font-size: 0.6875rem;
    color: ${theme.colors.text.slate400};
    line-height: 1.5;
`;

/* ── Result card ── */

export const ResultCard = styled.div`
    background: ${theme.colors.surfaceCard};
    border: 1.5px solid rgba(255, 255, 255, 0.06);
    border-radius: ${theme.borderRadius.xl};
    padding: 0.875rem;
`;

export const ResultCardTitle = styled.div`
    font-family: ${theme.fonts.display};
    font-size: 0.625rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${theme.colors.text.slate500};
    margin-bottom: 0.625rem;
`;

export const ResultGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.625rem;
`;

export const ResultItem = styled.div`
    background: ${theme.colors.surfaceDark};
    border-radius: ${theme.borderRadius.lg};
    padding: 0.625rem 0.75rem;
`;

export const ResultItemLabel = styled.div`
    font-size: 0.625rem;
    color: ${theme.colors.text.slate400};
    margin-bottom: 3px;
`;

export const ResultItemVal = styled.div<{ $color?: string; $small?: boolean }>`
    font-family: ${theme.fonts.display};
    font-size: ${({ $small }) => ($small ? '0.9375rem' : '1.25rem')};
    font-weight: 800;
    color: ${({ $color }) => $color || theme.colors.text.white};
    line-height: 1;
    ${({ $small }) => $small && 'padding-top: 3px;'}
`;

export const ResultItemSub = styled.div`
    font-size: 0.625rem;
    color: ${theme.colors.text.slate500};
    margin-top: 2px;
`;

/* ── Fat bar ── */

export const FatBarWrap = styled.div`
    margin-top: 0.625rem;
`;

export const FatBarLabels = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 0.625rem;
    color: ${theme.colors.text.slate500};
    margin-bottom: 5px;
    font-family: ${theme.fonts.display};
`;

export const FatBar = styled.div`
    height: 8px;
    border-radius: ${theme.borderRadius.full};
    background: linear-gradient(
        90deg,
        #22c55e 0%,
        #86efac 18%,
        ${theme.colors.primary} 40%,
        #f97316 60%,
        #ef4444 80%
    );
    position: relative;
    overflow: visible;
`;

export const FatMarker = styled.div<{ $position: number }>`
    position: absolute;
    top: -3px;
    left: calc(${({ $position }) => $position}% - 7px);
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #fff;
    border: 2px solid ${theme.colors.primary};
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
    transition: left 0.4s ease;
`;

export const FatBarResult = styled.div<{ $color: string }>`
    text-align: center;
    margin-top: 8px;
    font-family: ${theme.fonts.display};
    font-size: 0.75rem;
    font-weight: 700;
    color: ${({ $color }) => $color};
`;

/* ── Buttons ── */

export const Btn = styled.button<{ $variant: 'primary' | 'ghost' }>`
    flex: 1;
    padding: 0.875rem;
    border-radius: ${theme.borderRadius.lg};
    border: none;
    font-family: ${theme.fonts.display};
    font-size: 0.875rem;
    font-weight: 700;
    cursor: pointer;
    letter-spacing: 0.03em;
    transition: all 0.18s;

    ${({ $variant }) =>
        $variant === 'primary'
            ? css`
                  background: ${theme.colors.primary};
                  color: #fff;
                  box-shadow: 0 6px 20px rgba(255, 109, 0, 0.28);

                  &:hover {
                      transform: translateY(-1px);
                      box-shadow: 0 10px 28px rgba(255, 109, 0, 0.35);
                  }
              `
            : css`
                  background: ${theme.colors.surfaceCard};
                  color: ${theme.colors.text.slate400};
              `}
`;

export const BtnRow = styled.div`
    display: flex;
    gap: 0.625rem;
`;

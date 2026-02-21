import styled, { keyframes, css } from 'styled-components';
import { theme } from '../../../styles/theme';

/* ── Keyframes ── */
const fadeUp = keyframes`
    from { opacity: 0; transform: translateY(14px); }
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
    padding: 1.25rem 1rem;
    background-color: ${theme.colors.backgroundDark};
    position: sticky;
    top: 0;
    z-index: 10;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
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

export const HeaderCenter = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const PageTitle = styled.h1`
    font-size: 1.05rem;
    font-weight: 700;
    color: ${theme.colors.text.white};
    margin: 0;
    font-family: ${theme.fonts.display};
`;

export const PageSubtitle = styled.span`
    font-size: 0.7rem;
    color: ${theme.colors.text.slate400};
    margin-top: 2px;
`;

export const StepCounter = styled.span`
    font-size: 0.75rem;
    font-weight: 700;
    color: ${theme.colors.primary};
    font-family: ${theme.fonts.display};
    min-width: 40px;
    text-align: right;
`;

/* ── Step Bar ── */

export const StepBar = styled.div`
    display: flex;
    align-items: center;
    padding: 0.875rem 1rem;
    background-color: ${theme.colors.surfaceDark};
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
`;

export const StepItem = styled.div<{ $state: 'done' | 'active' | 'pending' }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    flex: 1;
    position: relative;

    &:not(:last-child)::after {
        content: '';
        position: absolute;
        top: 10px;
        left: 55%;
        width: 90%;
        height: 2px;
        background: ${({ $state }) =>
            $state === 'done' ? theme.colors.primary : 'rgba(255,255,255,0.08)'};
        z-index: 0;
    }
`;

export const StepCircle = styled.div<{ $state: 'done' | 'active' | 'pending' }>`
    width: 22px;
    height: 22px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.6rem;
    font-weight: 700;
    z-index: 1;
    transition: all 0.3s;
    font-family: ${theme.fonts.display};

    ${({ $state }) => {
        if ($state === 'done')
            return css`
                border: 2px solid ${theme.colors.primary};
                background: ${theme.colors.primary};
                color: #fff;
            `;
        if ($state === 'active')
            return css`
                border: 2px solid ${theme.colors.primary};
                background: rgba(255, 109, 0, 0.1);
                color: ${theme.colors.primary};
            `;
        return css`
            border: 2px solid rgba(255, 255, 255, 0.1);
            background: ${theme.colors.surfaceDark};
            color: ${theme.colors.text.slate500};
        `;
    }}
`;

export const StepName = styled.span<{ $state: 'done' | 'active' | 'pending' }>`
    font-size: 0.5625rem;
    font-weight: 600;
    text-align: center;
    font-family: ${theme.fonts.display};
    color: ${({ $state }) =>
        $state === 'active'
            ? theme.colors.primary
            : $state === 'done'
              ? theme.colors.text.slate400
              : theme.colors.text.slate500};
`;

/* ── Body (animated panel) ── */

export const Body = styled.div`
    padding: 1.125rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.875rem;
    animation: ${fadeUp} 0.35s ease both;
`;

/* ── Section header ── */

export const SectionHead = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: -2px;
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
    font-size: 0.8125rem;
`;

export const SectionTitle = styled.span`
    font-family: ${theme.fonts.display};
    font-size: 0.875rem;
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
    margin-bottom: -4px;
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

    &:focus {
        border-color: ${theme.colors.primary};
        box-shadow: 0 0 0 3px rgba(255, 109, 0, 0.1);
    }

    &::placeholder {
        color: ${theme.colors.text.slate500};
    }
`;

export const Select = styled.select`
    background: ${theme.colors.surfaceCard};
    border: 1.5px solid rgba(255, 255, 255, 0.08);
    border-radius: ${theme.borderRadius.lg};
    padding: 0.7rem 0.8rem;
    color: ${theme.colors.text.white};
    font-family: ${theme.fonts.display};
    font-size: 0.875rem;
    outline: none;
    width: 100%;
    appearance: none;
    cursor: pointer;
    transition: border-color 0.2s;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    background-size: 1rem;
    padding-right: 2.5rem;
    box-sizing: border-box;

    option { background: ${theme.colors.surfaceCard}; }
    &:focus { border-color: ${theme.colors.primary}; }
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
    height: 72px;
    transition: border-color 0.2s, box-shadow 0.2s;
    box-sizing: border-box;

    &:focus {
        border-color: ${theme.colors.primary};
        box-shadow: 0 0 0 3px rgba(255, 109, 0, 0.1);
    }

    &::placeholder {
        color: ${theme.colors.text.slate500};
    }
`;

/* ── Rows ── */

export const Row2 = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.625rem;
`;

/* ── Divider ── */

export const Divider = styled.div`
    height: 1px;
    background: rgba(255, 255, 255, 0.06);
`;

/* ── Chip grid ── */

export const ChipGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
`;

export const Chip = styled.div<{ $active: boolean }>`
    padding: 0.45rem 0.8125rem;
    border-radius: ${theme.borderRadius.full};
    font-size: 0.75rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.18s;
    font-family: ${theme.fonts.display};
    border: 1.5px solid ${({ $active }) =>
        $active ? theme.colors.primary : 'rgba(255,255,255,0.08)'};
    background: ${({ $active }) =>
        $active ? 'rgba(255, 109, 0, 0.1)' : theme.colors.surfaceCard};
    color: ${({ $active }) =>
        $active ? theme.colors.primary : theme.colors.text.slate400};
`;

/* ── Scale row ── */

export const ScaleRow = styled.div`
    display: flex;
    gap: 5px;
`;

export const ScaleBtn = styled.div<{ $active: boolean }>`
    flex: 1;
    padding: 0.6rem 0.2rem;
    border-radius: ${theme.borderRadius.DEFAULT};
    font-family: ${theme.fonts.display};
    font-size: 0.8125rem;
    font-weight: 700;
    cursor: pointer;
    text-align: center;
    transition: all 0.18s;
    border: 1.5px solid ${({ $active }) =>
        $active ? theme.colors.primary : 'rgba(255,255,255,0.08)'};
    background: ${({ $active }) =>
        $active ? 'rgba(255, 109, 0, 0.1)' : theme.colors.surfaceCard};
    color: ${({ $active }) =>
        $active ? theme.colors.primary : theme.colors.text.slate500};
`;

/* ── Alert boxes ── */

export const AlertBox = styled.div<{ $variant: 'info' | 'warn' | 'danger' }>`
    display: flex;
    gap: 0.625rem;
    padding: 0.75rem 0.8rem;
    border-radius: ${theme.borderRadius.lg};
    border: 1.5px solid;

    ${({ $variant }) => {
        if ($variant === 'warn')
            return css`
                border-color: rgba(245, 158, 11, 0.35);
                background: rgba(245, 158, 11, 0.06);
            `;
        if ($variant === 'danger')
            return css`
                border-color: rgba(239, 68, 68, 0.35);
                background: rgba(239, 68, 68, 0.06);
            `;
        return css`
            border-color: rgba(255, 109, 0, 0.22);
            background: rgba(255, 109, 0, 0.06);
        `;
    }}
`;

export const AlertIcon = styled.span`
    font-size: 1rem;
    flex-shrink: 0;
    margin-top: 1px;
`;

export const AlertTextWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
`;

export const AlertTitle = styled.strong`
    font-size: 0.75rem;
    font-weight: 700;
    color: ${theme.colors.text.white};
`;

export const AlertText = styled.span`
    font-size: 0.75rem;
    color: ${theme.colors.text.slate400};
    line-height: 1.5;
`;

/* ── Consent checkbox ── */

export const ConsentBox = styled.div<{ $checked: boolean }>`
    background: ${theme.colors.surfaceCard};
    border: 1.5px solid ${({ $checked }) =>
        $checked ? theme.colors.primary : 'rgba(255,255,255,0.08)'};
    border-radius: ${theme.borderRadius.lg};
    padding: 0.8rem;
    display: flex;
    gap: 0.625rem;
    cursor: pointer;
    transition: border-color 0.2s;
`;

export const ConsentCheck = styled.div<{ $checked: boolean }>`
    width: 22px;
    height: 22px;
    border-radius: 6px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    transition: all 0.2s;
    margin-top: 1px;

    ${({ $checked }) =>
        $checked
            ? css`
                  background: ${theme.colors.primary};
                  border: 2px solid ${theme.colors.primary};
                  color: #fff;
              `
            : css`
                  border: 2px solid rgba(255, 255, 255, 0.1);
                  background: transparent;
                  color: transparent;
              `}
`;

export const ConsentText = styled.span`
    font-size: 0.75rem;
    color: ${theme.colors.text.slate400};
    line-height: 1.5;

    strong {
        color: ${theme.colors.text.white};
        display: block;
        margin-bottom: 2px;
    }
`;

/* ── Summary card ── */

export const SummaryCard = styled.div`
    background: ${theme.colors.surfaceCard};
    border: 1.5px solid rgba(255, 255, 255, 0.06);
    border-radius: ${theme.borderRadius.lg};
    padding: 0.7rem 0.8rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const SummaryLabel = styled.span`
    font-size: 0.75rem;
    color: ${theme.colors.text.slate400};
`;

export const SummaryVal = styled.span`
    font-size: 0.8125rem;
    font-weight: 600;
    color: ${theme.colors.text.white};
    text-align: right;
    max-width: 55%;
`;

/* ── PAR-Q result banner ── */

export const ParqBanner = styled.div<{ $alert: boolean }>`
    display: flex;
    align-items: center;
    gap: 0.625rem;
    padding: 0.7rem 0.8rem;
    border-radius: ${theme.borderRadius.lg};
    border: 1.5px solid
        ${({ $alert }) =>
            $alert ? 'rgba(239, 68, 68, 0.35)' : 'rgba(34, 197, 94, 0.3)'};
    background: ${({ $alert }) =>
        $alert ? 'rgba(239, 68, 68, 0.06)' : 'rgba(34, 197, 94, 0.06)'};
`;

export const ParqBannerTitle = styled.span<{ $alert: boolean }>`
    font-family: ${theme.fonts.display};
    font-size: 0.75rem;
    font-weight: 700;
    color: ${({ $alert }) => ($alert ? '#ef4444' : '#22c55e')};
`;

export const ParqBannerSub = styled.span`
    font-size: 0.6875rem;
    color: ${theme.colors.text.slate400};
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

                  &:disabled {
                      opacity: 0.45;
                      cursor: not-allowed;
                      transform: none;
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

import styled, { css } from 'styled-components';
import { theme } from '../../styles/theme';

/* ── Types ── */

export type YNVal = 'sim' | 'nao' | null;

/* ── Styles ── */

const YNRow = styled.div<{ $warn?: boolean }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.625rem;
    padding: 0.7rem 0.8rem;
    background: ${theme.colors.surfaceCard};
    border-radius: ${theme.borderRadius.lg};
    border: 1.5px solid ${({ $warn }) =>
        $warn ? 'rgba(239, 68, 68, 0.45)' : 'rgba(255, 255, 255, 0.08)'};
    transition: border-color 0.2s;
`;

const YNLabel = styled.span`
    font-size: 0.8125rem;
    color: ${theme.colors.text.white};
    flex: 1;
    line-height: 1.3;
`;

const YNBtns = styled.div`
    display: flex;
    gap: 6px;
    flex-shrink: 0;
`;

const YNBtn = styled.button<{ $variant: 'yes' | 'no'; $active: boolean }>`
    padding: 0.3rem 0.85rem;
    border-radius: ${theme.borderRadius.full};
    font-family: ${theme.fonts.display};
    font-size: 0.7rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.18s;
    border: 1.5px solid rgba(255, 255, 255, 0.08);
    background: transparent;
    color: ${theme.colors.text.slate500};

    ${({ $variant, $active }) => {
        if ($active && $variant === 'yes')
            return css`
                border-color: #22c55e;
                background: rgba(34, 197, 94, 0.1);
                color: #22c55e;
            `;
        if ($active && $variant === 'no')
            return css`
                border-color: #ef4444;
                background: rgba(239, 68, 68, 0.1);
                color: #ef4444;
            `;
        return '';
    }}
`;

/* ── Component ── */

interface YesNoProps {
    label: string;
    val: YNVal;
    onChange: (v: 'sim' | 'nao') => void;
    warn?: boolean;
}

export const YesNo = ({ label, val, onChange, warn }: YesNoProps) => (
    <YNRow $warn={warn && val === 'sim'}>
        <YNLabel>{label}</YNLabel>
        <YNBtns>
            <YNBtn $variant="yes" $active={val === 'sim'} onClick={() => onChange('sim')}>
                SIM
            </YNBtn>
            <YNBtn $variant="no" $active={val === 'nao'} onClick={() => onChange('nao')}>
                NÃO
            </YNBtn>
        </YNBtns>
    </YNRow>
);

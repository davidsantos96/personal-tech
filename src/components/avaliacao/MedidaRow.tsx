import styled from 'styled-components';
import { theme } from '../../styles/theme';

/* ── Styles ── */

const MRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.625rem 0.8rem;
    background: ${theme.colors.surfaceCard};
    border-radius: ${theme.borderRadius.lg};
    border: 1.5px solid rgba(255, 255, 255, 0.08);
    gap: 0.625rem;
    transition: border-color 0.2s;

    &:focus-within {
        border-color: rgba(255, 109, 0, 0.4);
    }
`;

const MRowLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 0.625rem;
    flex: 1;
    min-width: 0;
`;

const MRowPoint = styled.div`
    width: 28px;
    height: 28px;
    border-radius: ${theme.borderRadius.DEFAULT};
    background: rgba(255, 109, 0, 0.1);
    border: 1px solid rgba(255, 109, 0, 0.18);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8125rem;
    flex-shrink: 0;
`;

const MRowName = styled.span`
    font-size: 0.8125rem;
    color: ${theme.colors.text.white};
    font-weight: 500;
`;

const MRowHint = styled.span`
    font-size: 0.625rem;
    color: ${theme.colors.text.slate500};
    line-height: 1.3;
    margin-top: 1px;
`;

const MRowRight = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    flex-shrink: 0;
`;

const MRowInput = styled.input`
    width: 64px;
    background: rgba(255, 255, 255, 0.04);
    border: 1.5px solid rgba(255, 255, 255, 0.08);
    border-radius: ${theme.borderRadius.DEFAULT};
    padding: 0.4375rem 0.5rem;
    color: ${theme.colors.text.white};
    font-family: ${theme.fonts.display};
    font-size: 0.9375rem;
    font-weight: 700;
    text-align: right;
    outline: none;
    transition: border-color 0.2s;
    appearance: none;
    -webkit-appearance: none;

    &:focus { border-color: ${theme.colors.primary}; }
    &::placeholder { color: ${theme.colors.text.slate500}; }
`;

const MRowUnit = styled.span`
    font-size: 0.6875rem;
    color: ${theme.colors.text.slate500};
    min-width: 20px;
`;

/* ── Component ── */

interface MedidaRowProps {
    emoji: string;
    label: string;
    hint: string;
    unit?: string;
    value: string;
    onChange: (v: string) => void;
}

export const MedidaRow = ({ emoji, label, hint, unit = 'mm', value, onChange }: MedidaRowProps) => (
    <MRow>
        <MRowLeft>
            <MRowPoint>{emoji}</MRowPoint>
            <div>
                <MRowName>{label}</MRowName>
                <br />
                <MRowHint>{hint}</MRowHint>
            </div>
        </MRowLeft>
        <MRowRight>
            <MRowInput
                type="number"
                inputMode="decimal"
                placeholder="—"
                value={value}
                onChange={e => onChange(e.target.value)}
            />
            <MRowUnit>{unit}</MRowUnit>
        </MRowRight>
    </MRow>
);

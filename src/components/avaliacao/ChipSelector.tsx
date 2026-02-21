import styled from 'styled-components';
import { theme } from '../../styles/theme';

/* ── Styles ── */

const ChipGridStyled = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
`;

const ChipStyled = styled.div<{ $active: boolean }>`
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

/* ── Component ── */

interface ChipSelectorProps {
    items: string[];
    selected: string[];
    onToggle: (item: string) => void;
}

export const ChipSelector = ({ items, selected, onToggle }: ChipSelectorProps) => (
    <ChipGridStyled>
        {items.map(item => (
            <ChipStyled key={item} $active={selected.includes(item)} onClick={() => onToggle(item)}>
                {item}
            </ChipStyled>
        ))}
    </ChipGridStyled>
);

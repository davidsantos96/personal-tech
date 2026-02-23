/** Shared SVG defs (gradients + filters). Each instance needs a unique `id` to avoid collisions. */
const LogoDefs = ({ id }: { id: string }) => (
    <defs>
        <linearGradient id={`grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff8800" />
            <stop offset="100%" stopColor="#ff3300" />
        </linearGradient>
        <linearGradient id={`grad-fill-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff8800" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#ff3300" stopOpacity="0.04" />
        </linearGradient>
        <filter id={`glow-${id}`}>
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
            </feMerge>
        </filter>
    </defs>
);

interface HexIconProps {
    cx?: number;
    cy?: number;
    r?: number;
    id?: string;
    bgFill?: string;
    strokeOpacity?: number;
}

/** Core hexagonal dumbbell symbol. */
const HexIcon = ({
    cx = 60,
    cy = 60,
    r = 56,
    id = 'main',
    bgFill = '#111',
    strokeOpacity = 0.3,
}: HexIconProps) => {
    const hex = (rx: number, ry = rx) =>
        Array.from({ length: 6 }, (_, i) => {
            const a = (Math.PI / 3) * i - Math.PI / 6;
            return `${cx + rx * Math.cos(a)},${cy + ry * Math.sin(a)}`;
        }).join(' ');

    const barY = cy + r * 0.18;
    const barH = r * 0.08;
    const barW = r * 0.78;
    const barX = cx - barW / 2;

    const wW = r * 0.18, wH = r * 0.46, wR = r * 0.08;
    const innerW = r * 0.09, innerH = r * 0.56;
    const leftX = cx - barW / 2 - wW;
    const rightX = cx + barW / 2;
    const weightsY = cy - wH / 2 - barH / 2 + r * 0.04;

    return (
        <>
            <polygon points={hex(r)} fill={bgFill} />
            <polygon points={hex(r)} fill={`url(#grad-fill-${id})`} />
            <polygon points={hex(r)} fill="none"
                stroke={`url(#grad-${id})`} strokeWidth={r * 0.04} strokeOpacity={strokeOpacity} />
            <polygon points={hex(r * 0.78)} fill="none"
                stroke={`url(#grad-${id})`} strokeWidth={r * 0.02} strokeOpacity={0.08} />

            {/* Bar */}
            <rect x={barX} y={barY - barH / 2} width={barW} height={barH}
                rx={barH / 2} fill={`url(#grad-${id})`} filter={`url(#glow-${id})`} />

            {/* Left weight */}
            <rect x={leftX} y={weightsY} width={wW} height={wH}
                rx={wR} fill={`url(#grad-${id})`} opacity="0.85" />
            <rect x={leftX + wW * 0.25} y={weightsY - innerH * 0.04} width={innerW} height={innerH}
                rx={wR * 0.7} fill={`url(#grad-${id})`} />

            {/* Right weight */}
            <rect x={rightX} y={weightsY} width={wW} height={wH}
                rx={wR} fill={`url(#grad-${id})`} opacity="0.85" />
            <rect x={rightX + wW * 0.66} y={weightsY - innerH * 0.04} width={innerW} height={innerH}
                rx={wR * 0.7} fill={`url(#grad-${id})`} />
        </>
    );
};

// ─────────────────────────────────────────────────────────────────────────────
// Public variants
// ─────────────────────────────────────────────────────────────────────────────

interface CircleIconProps {
    size?: number;
    id?: string;
}

/** Standalone circular logo mark. */
export const LogoCircle = ({ size = 120, id = 'ci' }: CircleIconProps) => {
    const half = size / 2;
    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
            <LogoDefs id={id} />
            <HexIcon cx={half} cy={half} r={half * 0.94} id={id} bgFill="#111" strokeOpacity={0.32} />
        </svg>
    );
};

interface SquareIconProps {
    size?: number;
    radius?: number;
    bg?: string;
    id?: string;
}

/** Square (app icon) logo — use for iOS / Android icons. */
export const LogoSquare = ({ size = 120, radius = 26, bg = '#111', id = 'sq' }: SquareIconProps) => {
    const half = size / 2;
    const hexR = size * 0.44;
    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
            <LogoDefs id={id} />
            <rect width={size} height={size} rx={radius} fill={bg} />
            <rect width={size} height={size} rx={radius} fill={`url(#grad-fill-${id})`} />
            <HexIcon cx={half} cy={half} r={hexR} id={id} bgFill="none" strokeOpacity={0.35} />
        </svg>
    );
};

interface HzLogoProps {
    iconSize?: number;
    textColor?: string;
    subColor?: string;
    id?: string;
    bg?: string;
}

/** Horizontal logo — icon + "Personal Tech" text. */
export const LogoHorizontal = ({
    iconSize = 52,
    textColor = '#f0f0f0',
    subColor = '#ff6b00',
    id = 'hz',
    bg = 'transparent',
}: HzLogoProps) => {
    const half = iconSize / 2;
    const totalW = iconSize + 16 + 160;
    const totalH = iconSize + 8;
    return (
        <svg width={totalW} height={totalH} viewBox={`0 0 ${totalW} ${totalH}`} fill="none">
            <LogoDefs id={id} />
            {bg !== 'transparent' && <rect width={totalW} height={totalH} rx="12" fill={bg} />}
            <g transform={`translate(0, 4)`}>
                <HexIcon
                    cx={half} cy={half} r={half * 0.94} id={id}
                    bgFill={bg === 'transparent' ? '#111' : 'rgba(0,0,0,0.15)'}
                    strokeOpacity={0.3}
                />
            </g>
            <rect x={iconSize + 14} y={12} width={1.5} height={iconSize - 16} rx={0.75}
                fill={bg === 'transparent' ? '#222' : 'rgba(255,255,255,0.15)'} />
            <text x={iconSize + 26} y={28} fontFamily="'Syne', sans-serif"
                fontSize={18} fontWeight={800} fill={textColor}>Personal</text>
            <text x={iconSize + 26} y={50} fontFamily="'Syne', sans-serif"
                fontSize={18} fontWeight={800} fill={subColor}>Tech</text>
        </svg>
    );
};

interface CompactLogoProps {
    size?: number;
    id?: string;
    showText?: boolean;
    textColor?: string;
}

/** Compact logo — icon + "PT" abbreviation. */
export const LogoCompact = ({
    size = 52,
    id = 'cpt',
    showText = true,
    textColor = '#f0f0f0',
}: CompactLogoProps) => {
    const half = size / 2;
    const W = showText ? size + 52 : size;
    return (
        <svg width={W} height={size + 8} viewBox={`0 0 ${W} ${size + 8}`} fill="none">
            <LogoDefs id={id} />
            <g transform="translate(0, 4)">
                <HexIcon cx={half} cy={half} r={half * 0.94} id={id} bgFill="#111" strokeOpacity={0.3} />
            </g>
            {showText && (
                <text
                    x={size + 10}
                    y={(size + 8) / 2 + 6}
                    fontFamily="'Syne', sans-serif"
                    fontSize={22}
                    fontWeight={800}
                    fill={textColor}
                    letterSpacing={-0.5}
                >
                    PT
                </text>
            )}
        </svg>
    );
};

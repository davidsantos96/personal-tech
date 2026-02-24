import {
    HeroWrapper,
    HeroInner,
    AvatarRing,
    AvatarInner,
    AvatarCamOverlay,
    HeroName,
    HeroSub,
    CrefBadge,
    StatsStrip,
    StatCell,
    StatVal,
    StatLbl,
} from '../styles';

interface HeroSectionProps {
    name: string;
    subtitle: string;
    cref: string;
    stats: { value: string; label: string }[];
}

export const HeroSection = ({ name, subtitle, cref, stats }: HeroSectionProps) => (
    <HeroWrapper>
        <HeroInner>
            <AvatarRing>
                <AvatarInner>
                    💪
                    <AvatarCamOverlay>📷</AvatarCamOverlay>
                </AvatarInner>
            </AvatarRing>
            <div style={{ textAlign: 'center' }}>
                <HeroName>{name}</HeroName>
                <HeroSub>{subtitle}</HeroSub>
            </div>
            <CrefBadge>
                <span>✅</span>
                <span>CREF {cref}</span>
            </CrefBadge>
            <StatsStrip>
                {stats.map(s => (
                    <StatCell key={s.label}>
                        <StatVal>{s.value}</StatVal>
                        <StatLbl>{s.label}</StatLbl>
                    </StatCell>
                ))}
            </StatsStrip>
        </HeroInner>
    </HeroWrapper>
);

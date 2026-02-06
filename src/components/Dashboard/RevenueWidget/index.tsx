import { BarFill, BarTrack, ChartBar, ChartContainer, TrendBadge, WeekDay, WidgetCard, WidgetHeader, WidgetLabel, WidgetSection, WidgetValue } from './styles';

export const RevenueWidget = () => {
    return (
        <WidgetSection>
            <WidgetCard>
                <WidgetHeader>
                    <div>
                        <WidgetLabel>Faturamento Semanal</WidgetLabel>
                        <WidgetValue>R$ 2.450,00</WidgetValue>
                    </div>
                    <TrendBadge>
                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>trending_up</span>
                        <span>12%</span>
                    </TrendBadge>
                </WidgetHeader>

                <ChartContainer>
                    {/* SEG */}
                    <ChartBar>
                        <BarTrack>
                            <BarFill $height="40%" />
                        </BarTrack>
                        <WeekDay>SEG</WeekDay>
                    </ChartBar>

                    {/* TER */}
                    <ChartBar>
                        <BarTrack>
                            <BarFill $height="65%" />
                        </BarTrack>
                        <WeekDay>TER</WeekDay>
                    </ChartBar>

                    {/* QUA - Current */}
                    <ChartBar>
                        <BarTrack>
                            <BarFill $height="85%" $isCurrent />
                        </BarTrack>
                        <WeekDay $isCurrent>QUA</WeekDay>
                    </ChartBar>

                    {/* QUI */}
                    <ChartBar>
                        <BarTrack>
                            <BarFill $height="55%" />
                        </BarTrack>
                        <WeekDay>QUI</WeekDay>
                    </ChartBar>

                    {/* SEX */}
                    <ChartBar>
                        <BarTrack>
                            <BarFill $height="70%" />
                        </BarTrack>
                        <WeekDay>SEX</WeekDay>
                    </ChartBar>

                    {/* SAB */}
                    <ChartBar>
                        <BarTrack>
                            <BarFill $height="30%" />
                        </BarTrack>
                        <WeekDay>SÁB</WeekDay>
                    </ChartBar>
                </ChartContainer>
            </WidgetCard>
        </WidgetSection>
    );
};

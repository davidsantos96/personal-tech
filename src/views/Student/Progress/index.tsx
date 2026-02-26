import { studentProfile, bodyAssessments, getLatestAssessment, getPreviousAssessment } from '../../../data/studentPortal';
import { StudentBottomNav } from '../../../components/Layout/StudentBottomNav';
import {
    Container,
    PageTitle,
    OverviewGrid,
    OverviewCard,
    OverviewLabel,
    OverviewValue,
    OverviewDiff,
    SectionHeader,
    AssessmentList,
    AssessmentCard,
    AssessmentInfo,
    AssessmentDate,
    AssessmentMeta,
    ChevronIcon,
    EvaluationCard,
    EvaluationText,
    EvaluationDate,
} from './styles';

const ChevronRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
);

export const StudentProgress = () => {
    const latest = getLatestAssessment();
    const previous = getPreviousAssessment();

    const calculateDiff = (curr: number, prev: number) => {
        const diff = curr - prev;
        return diff > 0 ? `+${diff.toFixed(1)}` : diff.toFixed(1);
    };

    return (
        <Container>
            <PageTitle>Minha Evolução</PageTitle>

            {latest && (
                <OverviewGrid>
                    <OverviewCard>
                        <OverviewLabel>PESO</OverviewLabel>
                        <OverviewValue>{latest.weightKg}kg</OverviewValue>
                        {previous && (
                            <OverviewDiff $positive={latest.weightKg < previous.weightKg}>
                                {calculateDiff(latest.weightKg, previous.weightKg)}kg vs anterior
                            </OverviewDiff>
                        )}
                    </OverviewCard>
                    <OverviewCard>
                        <OverviewLabel>GORDURA (BF)</OverviewLabel>
                        <OverviewValue>{latest.bodyFatPct}%</OverviewValue>
                        {previous && (
                            <OverviewDiff $positive={latest.bodyFatPct < previous.bodyFatPct}>
                                {calculateDiff(latest.bodyFatPct, previous.bodyFatPct)}% vs anterior
                            </OverviewDiff>
                        )}
                    </OverviewCard>
                </OverviewGrid>
            )}

            <SectionHeader>Histórico de Medidas</SectionHeader>
            <AssessmentList>
                {bodyAssessments.map((assessment) => (
                    <AssessmentCard key={assessment.id}>
                        <AssessmentInfo>
                            <AssessmentDate>{new Date(assessment.date).toLocaleDateString('pt-BR')}</AssessmentDate>
                            <AssessmentMeta>{assessment.weightKg}kg | {assessment.bodyFatPct}% BF</AssessmentMeta>
                        </AssessmentInfo>
                        <ChevronIcon>
                            <ChevronRightIcon />
                        </ChevronIcon>
                    </AssessmentCard>
                ))}
            </AssessmentList>

            <EvaluationCard>
                <EvaluationText>Próxima avaliação física agendada para:</EvaluationText>
                <EvaluationDate>
                    {new Date(studentProfile.nextEvaluation).toLocaleDateString('pt-BR')}
                </EvaluationDate>
            </EvaluationCard>

            <StudentBottomNav />
        </Container>
    );
};

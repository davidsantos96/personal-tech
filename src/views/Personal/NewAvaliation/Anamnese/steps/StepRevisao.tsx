import type { YNVal } from '../../../../../components/avaliacao';
import {
    Body,
    SectionHead,
    SectionIcon,
    SectionTitle,
    SectionSub,
    SLabel,
    SummaryCard,
    SummaryLabel,
    SummaryVal,
    ParqBanner,
    ParqBannerTitle,
    ParqBannerSub,
    AlertBox,
    AlertIcon,
    AlertTextWrap,
    AlertTitle,
    AlertText,
    Btn,
    BtnRow,
} from '../styles';

interface StepRevisaoProps {
    parq: YNVal[];
    doencas: string[];
    cirurgias: string[];
    lesoes: string[];
    medicamentos: YNVal;
    medicDesc: string;
    nivelAtual: string | null;
    alimentacao: string | null;
    estresse: string | null;
    objetivos: string[];
    modalidades: string[];
    onPrev: () => void;
    onSave: () => void;
}

export const StepRevisao = ({
    parq,
    doencas,
    cirurgias,
    lesoes,
    medicamentos,
    medicDesc,
    nivelAtual,
    alimentacao,
    estresse,
    objetivos,
    modalidades,
    onPrev,
    onSave,
}: StepRevisaoProps) => {
    const parqAlerta = parq.some(v => v === 'sim');

    return (
        <Body key="rev">
            <SectionHead>
                <SectionIcon>✅</SectionIcon>
                <div>
                    <SectionTitle>Revisão Final</SectionTitle>
                    <br />
                    <SectionSub>Confirme antes de salvar</SectionSub>
                </div>
            </SectionHead>

            {/* PAR-Q status */}
            <ParqBanner $alert={parqAlerta}>
                <span style={{ fontSize: '1.125rem' }}>{parqAlerta ? '⚠️' : '✅'}</span>
                <div>
                    <ParqBannerTitle $alert={parqAlerta}>
                        PAR-Q {parqAlerta ? '— Requer atenção médica' : '— Liberado'}
                    </ParqBannerTitle>
                    <br />
                    <ParqBannerSub>
                        {parqAlerta
                            ? `${parq.filter(v => v === 'sim').length} resposta(s) positiva(s) registrada(s)`
                            : 'Todas as respostas negativas — treino liberado'}
                    </ParqBannerSub>
                </div>
            </ParqBanner>

            <SLabel>Saúde</SLabel>
            <SummaryCard>
                <SummaryLabel>Doenças</SummaryLabel>
                <SummaryVal>
                    {doencas.length
                        ? doencas.slice(0, 2).join(', ') + (doencas.length > 2 ? ` +${doencas.length - 2}` : '')
                        : 'Nenhuma'}
                </SummaryVal>
            </SummaryCard>
            <SummaryCard>
                <SummaryLabel>Cirurgias</SummaryLabel>
                <SummaryVal>{cirurgias.length ? cirurgias.join(', ') : 'Nenhuma'}</SummaryVal>
            </SummaryCard>
            <SummaryCard>
                <SummaryLabel>Lesões ativas</SummaryLabel>
                <SummaryVal>{lesoes.length ? lesoes.join(', ') : 'Nenhuma'}</SummaryVal>
            </SummaryCard>
            <SummaryCard>
                <SummaryLabel>Medicamentos</SummaryLabel>
                <SummaryVal>
                    {medicamentos === 'sim' ? (medicDesc || 'Sim (não especificado)') : 'Não'}
                </SummaryVal>
            </SummaryCard>

            <SLabel>Hábitos</SLabel>
            <SummaryCard>
                <SummaryLabel>Nível de atividade</SummaryLabel>
                <SummaryVal>{nivelAtual || '—'}</SummaryVal>
            </SummaryCard>
            <SummaryCard>
                <SummaryLabel>Alimentação</SummaryLabel>
                <SummaryVal>{alimentacao || '—'}</SummaryVal>
            </SummaryCard>
            <SummaryCard>
                <SummaryLabel>Estresse (1–10)</SummaryLabel>
                <SummaryVal>{estresse || '—'}/10</SummaryVal>
            </SummaryCard>

            <SLabel>Objetivos</SLabel>
            <SummaryCard>
                <SummaryLabel>Metas</SummaryLabel>
                <SummaryVal>{objetivos.length ? objetivos.join(', ') : '—'}</SummaryVal>
            </SummaryCard>
            <SummaryCard>
                <SummaryLabel>Modalidades</SummaryLabel>
                <SummaryVal>{modalidades.length ? modalidades.join(', ') : '—'}</SummaryVal>
            </SummaryCard>

            {parqAlerta && (
                <AlertBox $variant="warn">
                    <AlertIcon>⚠️</AlertIcon>
                    <AlertTextWrap>
                        <AlertTitle>Lembrete</AlertTitle>
                        <AlertText>
                            Solicite atestado médico antes de iniciar o treino. Registre o
                            recebimento no prontuário do aluno.
                        </AlertText>
                    </AlertTextWrap>
                </AlertBox>
            )}

            <BtnRow>
                <Btn $variant="ghost" onClick={onPrev}>← Voltar</Btn>
                <Btn $variant="primary" onClick={onSave}>
                    💾 Salvar Anamnese
                </Btn>
            </BtnRow>
        </Body>
    );
};



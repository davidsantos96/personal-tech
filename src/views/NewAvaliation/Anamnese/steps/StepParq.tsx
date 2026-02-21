import { YesNo } from '../../../../components/avaliacao';
import type { YNVal } from '../../../../components/avaliacao';
import { PARQ_QUESTIONS } from '../constants';
import {
    Body,
    SectionHead,
    SectionIcon,
    SectionTitle,
    SectionSub,
    AlertBox,
    AlertIcon,
    AlertTextWrap,
    AlertTitle,
    AlertText,
    ConsentBox,
    ConsentCheck,
    ConsentText,
    Btn,
} from '../styles';

interface StepParqProps {
    parq: YNVal[];
    onParqChange: (index: number, value: 'sim' | 'nao') => void;
    consent: boolean;
    onConsentToggle: () => void;
    onNext: () => void;
}

export const StepParq = ({ parq, onParqChange, consent, onConsentToggle, onNext }: StepParqProps) => {
    const parqAlerta = parq.some(v => v === 'sim');
    const parqValid = parq.every(v => v !== null) && consent;

    return (
        <Body key="parq">
            <SectionHead>
                <SectionIcon>❤️</SectionIcon>
                <div>
                    <SectionTitle>PAR-Q</SectionTitle>
                    <br />
                    <SectionSub>Prontidão para atividade física</SectionSub>
                </div>
            </SectionHead>

            <AlertBox $variant="info">
                <AlertIcon>ℹ️</AlertIcon>
                <AlertTextWrap>
                    <AlertTitle>Questionário obrigatório</AlertTitle>
                    <AlertText>
                        Responda SIM ou NÃO com honestidade. Uma resposta SIM não impede
                        o treino, mas exige avaliação médica prévia.
                    </AlertText>
                </AlertTextWrap>
            </AlertBox>

            {PARQ_QUESTIONS.map((q, i) => (
                <YesNo
                    key={i}
                    label={q}
                    val={parq[i]}
                    onChange={v => onParqChange(i, v)}
                    warn
                />
            ))}

            {parqAlerta && (
                <AlertBox $variant="danger">
                    <AlertIcon>⚠️</AlertIcon>
                    <AlertTextWrap>
                        <AlertTitle>Atenção Necessária</AlertTitle>
                        <AlertText>
                            Uma ou mais respostas positivas foram identificadas. Recomendamos
                            que o aluno apresente liberação médica antes de iniciar o treinamento.
                        </AlertText>
                    </AlertTextWrap>
                </AlertBox>
            )}

            <ConsentBox $checked={consent} onClick={onConsentToggle}>
                <ConsentCheck $checked={consent}>{consent ? '✓' : ''}</ConsentCheck>
                <ConsentText>
                    <strong>Termo de consentimento</strong>
                    Declaro que as informações acima são verdadeiras e que fui informado
                    sobre os riscos e benefícios da atividade física. Autorizo o uso dos
                    dados para fins de prescrição de exercícios.
                </ConsentText>
            </ConsentBox>

            <Btn $variant="primary" onClick={onNext} disabled={!parqValid}>
                Continuar →
            </Btn>
        </Body>
    );
};

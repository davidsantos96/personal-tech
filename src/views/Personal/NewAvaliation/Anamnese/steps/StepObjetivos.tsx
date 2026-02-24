import { ChipSelector } from '../../../../../components/avaliacao';
import { toggle } from '../../../../../utils/calculos';
import { OBJETIVOS_LIST, MODALIDADES, PRAZO_RESULTADOS } from '../constants';
import {
    Body,
    SectionHead,
    SectionIcon,
    SectionTitle,
    SectionSub,
    SLabel,
    Field,
    FieldLabel,
    Select,
    Textarea,
    Divider,
    AlertBox,
    AlertIcon,
    AlertTextWrap,
    AlertTitle,
    AlertText,
    Btn,
    BtnRow,
} from '../styles';

interface StepObjetivosProps {
    objetivos: string[];
    setObjetivos: React.Dispatch<React.SetStateAction<string[]>>;
    modalidades: string[];
    setModalidades: React.Dispatch<React.SetStateAction<string[]>>;
    restricoes: string;
    setRestricoes: React.Dispatch<React.SetStateAction<string>>;
    expectativas: string;
    setExpectativas: React.Dispatch<React.SetStateAction<string>>;
    onPrev: () => void;
    onNext: () => void;
}

export const StepObjetivos = ({
    objetivos, setObjetivos,
    modalidades, setModalidades,
    restricoes, setRestricoes,
    expectativas, setExpectativas,
    onPrev, onNext,
}: StepObjetivosProps) => (
    <Body key="obj">
        <SectionHead>
            <SectionIcon>🎯</SectionIcon>
            <div>
                <SectionTitle>Objetivos & Preferências</SectionTitle>
                <br />
                <SectionSub>O que o aluno busca alcançar</SectionSub>
            </div>
        </SectionHead>

        <SLabel>Objetivos principais</SLabel>
        <ChipSelector
            items={OBJETIVOS_LIST}
            selected={objetivos}
            onToggle={i => setObjetivos(toggle(objetivos, i))}
        />

        <Divider />

        <SLabel>Modalidades de interesse</SLabel>
        <ChipSelector
            items={MODALIDADES}
            selected={modalidades}
            onToggle={i => setModalidades(toggle(modalidades, i))}
        />

        <Divider />

        <Field>
            <FieldLabel>Prazo esperado para resultados</FieldLabel>
            <Select>
                <option>Selecionar</option>
                {PRAZO_RESULTADOS.map(o => (
                    <option key={o}>{o}</option>
                ))}
            </Select>
        </Field>

        <Field>
            <FieldLabel>Exercícios ou movimentos que não consegue/quer fazer</FieldLabel>
            <Textarea
                placeholder="Ex: não consigo agachar fundo, não gosto de corrida..."
                value={restricoes}
                onChange={e => setRestricoes(e.target.value)}
            />
        </Field>

        <Field>
            <FieldLabel>Expectativas e motivações pessoais</FieldLabel>
            <Textarea
                placeholder="Ex: quero ter mais energia para brincar com meus filhos..."
                value={expectativas}
                onChange={e => setExpectativas(e.target.value)}
            />
        </Field>

        <AlertBox $variant="warn">
            <AlertIcon>💡</AlertIcon>
            <AlertTextWrap>
                <AlertTitle>Dica profissional</AlertTitle>
                <AlertText>
                    Entender a motivação real do aluno aumenta a aderência ao treino.
                    Anote os detalhes que ele compartilhar fora do formulário.
                </AlertText>
            </AlertTextWrap>
        </AlertBox>

        <BtnRow>
            <Btn $variant="ghost" onClick={onPrev}>← Voltar</Btn>
            <Btn $variant="primary" onClick={onNext}>Ver Revisão →</Btn>
        </BtnRow>
    </Body>
);



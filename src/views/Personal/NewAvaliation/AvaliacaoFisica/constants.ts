export interface Dobra {
    key: string;
    label: string;
    emoji: string;
    hint: string;
}

interface Circunf {
    key: string;
    label: string;
    emoji: string;
    unit: string;
    hint: string;
}

export const TABS = ['Geral', 'Dobras', 'Circunf.', 'Resultado'];

export const DOBRAS_MASC: Dobra[] = [
    { key: 'peitoral', label: 'Peitoral', emoji: '🫁', hint: 'Diagonal, entre axila e mamilo' },
    { key: 'axilar', label: 'Axilar média', emoji: '📍', hint: 'Horizontal, linha axilar média' },
    { key: 'triceps', label: 'Tríceps', emoji: '💪', hint: 'Vertical, face posterior do braço' },
    { key: 'subescap', label: 'Subescapular', emoji: '🔹', hint: 'Oblíqua, 1–2 cm abaixo da escápula' },
    { key: 'suprailiac', label: 'Supra-ilíaca', emoji: '📌', hint: 'Oblíqua, acima da crista ilíaca' },
    { key: 'abdominal', label: 'Abdominal', emoji: '🎯', hint: 'Vertical, 2 cm à direita do umbigo' },
    { key: 'coxa', label: 'Coxa', emoji: '🦵', hint: 'Vertical, face anterior, 1/3 médio' },
];

export const DOBRAS_FEM: Dobra[] = [
    { key: 'triceps', label: 'Tríceps', emoji: '💪', hint: 'Vertical, face posterior do braço' },
    { key: 'suprailiac', label: 'Supra-ilíaca', emoji: '📌', hint: 'Oblíqua, acima da crista ilíaca' },
    { key: 'abdominal', label: 'Abdominal', emoji: '🎯', hint: 'Vertical, 2 cm à direita do umbigo' },
    { key: 'coxa', label: 'Coxa', emoji: '🦵', hint: 'Vertical, face anterior, 1/3 médio' },
    { key: 'peitoral', label: 'Peitoral', emoji: '🫁', hint: 'Diagonal, 1/3 entre axila e mamilo' },
    { key: 'axilar', label: 'Axilar média', emoji: '📍', hint: 'Horizontal, linha axilar média' },
    { key: 'subescap', label: 'Subescapular', emoji: '🔹', hint: 'Oblíqua, 1–2 cm abaixo da escápula' },
];

export const CIRCUNFERENCIAS: Circunf[] = [
    { key: 'cintura', label: 'Cintura', emoji: '⬜', unit: 'cm', hint: 'Menor circunferência abdominal' },
    { key: 'quadril', label: 'Quadril', emoji: '🔵', unit: 'cm', hint: 'Maior protuberância glútea' },
    { key: 'torax', label: 'Tórax', emoji: '🫀', unit: 'cm', hint: 'Na altura dos mamilos' },
    { key: 'bicepsD', label: 'Bíceps D.', emoji: '💪', unit: 'cm', hint: 'Máxima contração, braço direito' },
    { key: 'coxaD', label: 'Coxa D.', emoji: '🦵', unit: 'cm', hint: '1/3 superior, coxa direita' },
    { key: 'panturrilha', label: 'Panturrilha', emoji: '🦶', unit: 'cm', hint: 'Maior circunferência da perna' },
    { key: 'braco', label: 'Braço relaxado', emoji: '🙌', unit: 'cm', hint: 'Ponto médio, braço relaxado' },
];

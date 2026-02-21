/**
 * Funções puras de cálculo para avaliações físicas.
 * Sem dependências de React ou JSX.
 */

/* ── Pollock 7 dobras → Siri → % Gordura ── */

export function calcPollock7(
    soma7: number | null,
    idade: number | null,
    sexo: string,
): string | null {
    if (!soma7 || !idade) return null;
    let dc: number;
    if (sexo === 'M') {
        dc = 1.112 - 0.00043499 * soma7 + 0.00000055 * soma7 * soma7 - 0.00028826 * idade;
    } else {
        dc = 1.097 - 0.00046971 * soma7 + 0.00000056 * soma7 * soma7 - 0.00012828 * idade;
    }
    const pct = ((4.95 / dc) - 4.50) * 100;
    return Math.max(0, Math.min(60, pct)).toFixed(1);
}

/* ── IMC ── */

export function calcIMC(peso: number, altura: number): string | null {
    if (!peso || !altura) return null;
    return (peso / ((altura / 100) ** 2)).toFixed(1);
}

export function imcClass(imc: string | null): { label: string; color: string } {
    if (!imc) return { label: '—', color: '#888' };
    const v = parseFloat(imc);
    if (v < 18.5) return { label: 'Abaixo do peso', color: '#3b82f6' };
    if (v < 25) return { label: 'Peso normal', color: '#22c55e' };
    if (v < 30) return { label: 'Sobrepeso', color: '#f59e0b' };
    return { label: 'Obesidade', color: '#ef4444' };
}

/* ── % Gordura — classificação ── */

export function fatClass(
    pct: string,
    sexo: string,
): { label: string; color: string } {
    const v = parseFloat(pct);
    if (sexo === 'M') {
        if (v < 6) return { label: 'Essencial', color: '#3b82f6' };
        if (v < 14) return { label: 'Atleta', color: '#22c55e' };
        if (v < 18) return { label: 'Boa forma', color: '#22c55e' };
        if (v < 25) return { label: 'Aceitável', color: '#FF6D00' };
        return { label: 'Obesidade', color: '#ef4444' };
    } else {
        if (v < 14) return { label: 'Essencial', color: '#3b82f6' };
        if (v < 21) return { label: 'Atleta', color: '#22c55e' };
        if (v < 25) return { label: 'Boa forma', color: '#22c55e' };
        if (v < 32) return { label: 'Aceitável', color: '#FF6D00' };
        return { label: 'Obesidade', color: '#ef4444' };
    }
}

/* ── RCQ (Razão Cintura-Quadril) ── */

export function calcRCQ(cintura: number, quadril: number): string | null {
    if (!cintura || !quadril) return null;
    return (cintura / quadril).toFixed(2);
}

/* ── Helpers genéricos ── */

export function toggle(arr: string[], item: string): string[] {
    return arr.includes(item) ? arr.filter(x => x !== item) : [...arr, item];
}

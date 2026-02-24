import { useState } from 'react';

type SaveState = 'idle' | 'saving' | 'saved';

export function useSaveAction() {
    const [state, setState] = useState<SaveState>('idle');

    const save = () => {
        setState('saving');
        setTimeout(() => {
            setState('saved');
            setTimeout(() => setState('idle'), 1800);
        }, 900);
    };

    const label = state === 'saving' ? 'Salvando…' : state === 'saved' ? '✓ Salvo!' : 'Salvar';
    const saved = state === 'saved';

    return { save, label, saved };
}

import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
    Overlay,
    ModalCard,
    CloseButton,
    GifWrapper,
    LoadingSpinner,
    InfoSection,
    ExerciseName,
    MuscleGroup,
} from './styles';

const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

export interface DemoModalData {
    name: string;
    gifUrl: string;
    muscleGroup?: string;
}

interface ExerciseDemoModalProps {
    data: DemoModalData | null;
    onClose: () => void;
}

export const ExerciseDemoModal = ({ data, onClose }: ExerciseDemoModalProps) => {
    const [loading, setLoading] = useState(true);

    // Reset loading state when data changes
    useEffect(() => {
        if (data) setLoading(true);
    }, [data?.gifUrl]);

    // Close on Escape
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
    }, [onClose]);

    useEffect(() => {
        if (!data) return;
        document.addEventListener('keydown', handleKeyDown);
        // Prevent background scroll
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [data, handleKeyDown]);

    if (!data) return null;

    return createPortal(
        <Overlay onClick={onClose}>
            <ModalCard onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={onClose} aria-label="Fechar">
                    <XIcon />
                </CloseButton>
                <GifWrapper>
                    {loading && <LoadingSpinner />}
                    <img
                        src={data.gifUrl}
                        alt={data.name}
                        onLoad={() => setLoading(false)}
                        onError={() => setLoading(false)}
                        style={{ display: loading ? 'none' : 'block' }}
                    />
                </GifWrapper>
                <InfoSection>
                    <ExerciseName>{data.name}</ExerciseName>
                    {data.muscleGroup && <MuscleGroup>{data.muscleGroup}</MuscleGroup>}
                </InfoSection>
            </ModalCard>
        </Overlay>,
        document.body,
    );
};

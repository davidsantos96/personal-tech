import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
    from { opacity: 0; }
    to   { opacity: 1; }
`;

const slideUp = keyframes`
    from { transform: translateY(40px); opacity: 0; }
    to   { transform: translateY(0);    opacity: 1; }
`;

export const Overlay = styled.div`
    position: fixed;
    inset: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.85);
    animation: ${fadeIn} 0.2s ease-out;
    padding: 1rem;
`;

export const ModalCard = styled.div`
    position: relative;
    width: 100%;
    max-width: 420px;
    background: #1a1a1a;
    border-radius: 1rem;
    overflow: hidden;
    animation: ${slideUp} 0.25s ease-out;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
`;

export const CloseButton = styled.button`
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    z-index: 2;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: none;
    background: rgba(0, 0, 0, 0.6);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
        background: rgba(255, 109, 0, 0.8);
    }

    svg {
        width: 1rem;
        height: 1rem;
    }
`;

export const GifWrapper = styled.div`
    width: 100%;
    aspect-ratio: 1;
    background: #0a0a0a;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`;

export const LoadingSpinner = styled.div`
    width: 2.5rem;
    height: 2.5rem;
    border: 3px solid rgba(255, 255, 255, 0.15);
    border-top-color: #FF6D00;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;

    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;

export const InfoSection = styled.div`
    padding: 1rem 1.25rem 1.25rem;
`;

export const ExerciseName = styled.h3`
    margin: 0 0 0.25rem;
    font-size: 1.1rem;
    font-weight: 700;
    color: #fff;
`;

export const MuscleGroup = styled.p`
    margin: 0;
    font-size: 0.8rem;
    color: #94a3b8;
    text-transform: capitalize;
`;

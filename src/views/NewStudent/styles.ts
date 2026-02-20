import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const Container = styled.div`
    min-height: 100vh;
    background-color: ${theme.colors.backgroundDark};
    padding-bottom: 6rem;

    width: 100%;
    max-width: 28rem;
    margin: 0 auto;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    position: relative;
`;

export const Header = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem 1rem;
    background-color: ${theme.colors.backgroundDark};
    position: sticky;
    top: 0;
    z-index: 10;
`;

export const BackButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    color: ${theme.colors.text.white};
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        width: 24px;
        height: 24px;
    }

    &:hover {
        opacity: 0.8;
    }
`;

export const PageTitle = styled.h1`
    font-size: 1.125rem;
    font-weight: 600;
    color: ${theme.colors.text.white};
    margin: 0;
    font-family: ${theme.fonts.display};
`;

export const Spacer = styled.div`
    width: 40px;
`;

/* ── Photo Upload ── */

export const PhotoSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.5rem 1rem 1rem;
    gap: 0.75rem;
`;

export const PhotoUploadButton = styled.button`
    position: relative;
    width: 108px;
    height: 108px;
    border-radius: 50%;
    background: transparent;
    border: 2.5px dashed ${theme.colors.primary};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    gap: 0.4rem;
    transition: background-color 0.2s;

    &:hover {
        background-color: rgba(255, 109, 0, 0.08);
    }

    svg {
        width: 36px;
        height: 36px;
        color: ${theme.colors.primary};
    }
`;

export const PhotoPreview = styled.img`
    width: 108px;
    height: 108px;
    border-radius: 50%;
    object-fit: cover;
    border: 2.5px solid ${theme.colors.primary};
`;

export const PhotoLabel = styled.span`
    font-size: 0.75rem;
    font-weight: 600;
    color: ${theme.colors.primary};
    letter-spacing: 0.03em;
`;

export const EditBadge = styled.div`
    position: absolute;
    bottom: 4px;
    right: 4px;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background-color: ${theme.colors.primary};
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        width: 14px;
        height: 14px;
        color: #fff;
    }
`;

export const PhotoHint = styled.p`
    font-size: 0.8125rem;
    color: ${theme.colors.text.slate400};
    text-align: center;
    margin: 0;
`;

/* ── Form ── */

export const FormSection = styled.div`
    padding: 0 1rem;
    display: flex;
    flex-direction: column;
    gap: 0;
`;

export const SectionTitle = styled.h2`
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: ${theme.colors.primary};
    text-transform: uppercase;
    margin: 1.5rem 0 1rem;
`;

export const FieldGroup = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
`;

export const FieldRow = styled.div`
    display: flex;
    gap: 0.75rem;
`;

export const Label = styled.label`
    font-size: 0.9375rem;
    font-weight: 500;
    color: ${theme.colors.text.white};
    margin-bottom: 0.5rem;
`;

export const Input = styled.input`
    width: 100%;
    padding: 1rem;
    background-color: ${theme.colors.surfaceCard};
    border: 1px solid ${theme.colors.surfaceDark};
    border-radius: ${theme.borderRadius.lg};
    color: ${theme.colors.text.white};
    font-size: 1rem;
    outline: none;
    transition: border-color 0.2s;
    box-sizing: border-box;

    &::placeholder {
        color: ${theme.colors.text.slate400};
    }

    &:focus {
        border-color: ${theme.colors.primary};
    }
`;

export const InputSuffix = styled.div`
    position: relative;
    width: 100%;

    input {
        padding-right: 2.75rem;
    }

    span {
        position: absolute;
        right: 1rem;
        top: 50%;
        transform: translateY(-50%);
        font-size: 0.875rem;
        color: ${theme.colors.text.slate400};
        pointer-events: none;
    }
`;

export const Select = styled.select`
    width: 100%;
    padding: 1rem;
    background-color: ${theme.colors.surfaceCard};
    border: 1px solid ${theme.colors.surfaceDark};
    border-radius: ${theme.borderRadius.lg};
    color: ${theme.colors.text.white};
    font-size: 1rem;
    outline: none;
    cursor: pointer;
    transition: border-color 0.2s;
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 1.25rem;
    padding-right: 3rem;
    box-sizing: border-box;

    option {
        background-color: ${theme.colors.surfaceCard};
        color: ${theme.colors.text.white};
    }

    &:focus {
        border-color: ${theme.colors.primary};
    }
`;

/* ── Save Button ── */

export const SaveButton = styled.button`
    width: calc(100% - 2rem);
    margin: 2rem 1rem 1rem;
    padding: 1rem;
    background-color: ${theme.colors.primary};
    border: none;
    border-radius: ${theme.borderRadius.lg};
    color: ${theme.colors.text.white};
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.1s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    svg {
        width: 22px;
        height: 22px;
    }

    &:hover {
        opacity: 0.9;
    }

    &:active {
        transform: scale(0.98);
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

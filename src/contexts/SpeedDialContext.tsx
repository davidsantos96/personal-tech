import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';

interface SpeedDialContextValue {
    visible: boolean;
    hideSpeedDial: () => void;
    showSpeedDial: () => void;
}

const SpeedDialContext = createContext<SpeedDialContextValue>({
    visible: true,
    hideSpeedDial: () => {},
    showSpeedDial: () => {},
});

export const SpeedDialProvider = ({ children }: { children: ReactNode }) => {
    const [visible, setVisible] = useState(true);
    const hideSpeedDial = useCallback(() => setVisible(false), []);
    const showSpeedDial = useCallback(() => setVisible(true), []);

    return (
        <SpeedDialContext.Provider value={{ visible, hideSpeedDial, showSpeedDial }}>
            {children}
        </SpeedDialContext.Provider>
    );
};

export const useSpeedDial = () => useContext(SpeedDialContext);

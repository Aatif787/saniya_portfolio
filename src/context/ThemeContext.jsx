import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('classic');
    const [isBooting, setIsBooting] = useState(false);
    const [isFading, setIsFading] = useState(false);

    const toggleTheme = () => {
        if (isBooting || isFading) return;

        if (theme === 'classic') {
            setIsBooting(true);
        } else {
            setIsFading(true);
            setTheme('classic');
            setTimeout(() => setIsFading(false), 400);
        }
    };

    const finishBoot = () => {
        setTheme('cyber3d');
        setIsBooting(false);
    };

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, isBooting, finishBoot, isFading }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

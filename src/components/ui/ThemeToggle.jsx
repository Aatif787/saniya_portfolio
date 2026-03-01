import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`fixed top-6 right-24 z-50 px-4 py-2 rounded-full font-mono text-xs transition-all duration-500 border overflow-hidden group ${theme === 'cyber3d'
                    ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]'
                    : 'bg-white/10 border-black/10 text-black hover:border-black/30'
                }`}
        >
            <div className="relative z-10 flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-current animate-pulse"></span>
                <span>{theme === 'cyber3d' ? 'CYBER3D: ACTIVE' : 'SWITCH_TO_CYBER3D'}</span>
            </div>

            {/* Background sweep animation */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
            />
        </motion.button>
    );
};

export default ThemeToggle;

import React from 'react';
import { useTheme } from '../../context/ThemeContext';

/**
 * CyberSection wrapper safely swaps between "Classic" and "Cyber" components
 * while ensuring ZERO impact on the classic theme.
 */
const CyberSection = ({ ClassicComponent, CyberComponent, ...props }) => {
    const { theme } = useTheme();

    if (theme === 'cyber3d') {
        return <CyberComponent {...props} />;
    }

    return <ClassicComponent {...props} />;
};

export default CyberSection;

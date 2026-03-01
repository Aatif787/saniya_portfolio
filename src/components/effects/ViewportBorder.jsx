import React from 'react';
import '../../styles/ViewportBorder.css';

const ViewportBorder = () => {
    return (
        <div className="viewport-neon-root" aria-hidden="true">
            <div className="viewport-neon-glow">
                <div className="viewport-neon-gradient" />
            </div>
            <div className="viewport-neon-border">
                <div className="viewport-neon-gradient" />
            </div>
        </div>
    );
};

export default ViewportBorder;

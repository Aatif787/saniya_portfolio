import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { useTheme } from '../../context/ThemeContext';

const CyberEnvironment = () => {
    const { theme } = useTheme();

    useEffect(() => {
        if (theme === 'cyber3d') {
            const lenis = new Lenis({
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                orientation: 'vertical',
                gestureOrientation: 'vertical',
                smoothWheel: true,
                wheelMultiplier: 1,
                smoothTouch: false,
                touchMultiplier: 2,
                infinite: false,
            });

            let rafId;
            function raf(time) {
                lenis.raf(time);
                rafId = requestAnimationFrame(raf);
            }

            requestAnimationFrame(raf);

            return () => {
                if (rafId) cancelAnimationFrame(rafId);
                lenis.destroy();
            };
        }
    }, [theme]);


    if (theme !== 'cyber3d') return null;

    return (
        <>
            {/* Global Background Layer */}
            <div className="fixed inset-0 z-[-20] bg-[#050510] overflow-hidden pointer-events-none">
                {/* Deep Space Gradient */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(8,145,178,0.15),transparent_70%)] opacity-50"></div>

                {/* Animated Perspective Grid Floor */}
                <div className="absolute bottom-[-10%] left-[-50%] w-[200%] h-[50%] bg-gradient-to-t from-cyan-500/10 to-transparent skew-y-[-10deg] opacity-20">
                    <div className="cyber-grid w-full h-full animate-grid-flow"></div>
                </div>

                {/* Floating Holographic Particles (CSS based) */}
                <div className="absolute inset-0">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse opacity-20"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${3 + Math.random() * 5}s`
                            }}
                        ></div>
                    ))}
                </div>

                {/* Noise Overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
            </div>

            {/* Scroll Triggered Light Sweep */}
            <div className="fixed top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-50 opacity-0 animate-sweep pointer-events-none"></div>
        </>
    );
};

export default CyberEnvironment;

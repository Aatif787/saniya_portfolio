import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { portfolioData } from '../../data/portfolioData';

const BootSequence = () => {
    const { isBooting, finishBoot } = useTheme();
    const [logs, setLogs] = useState([]);
    const [progress, setProgress] = useState(0);

    const bootLogs = portfolioData.labels.boot.logs;

    useEffect(() => {
        if (isBooting) {
            console.log("🚀 Boot sequence started...");
            setLogs([]);
            setProgress(0);

            let currentLogIndex = 0;
            const logInterval = setInterval(() => {
                if (currentLogIndex < bootLogs.length) {
                    setLogs(prev => [...prev, bootLogs[currentLogIndex]]);
                    currentLogIndex++;
                } else {
                    clearInterval(logInterval);
                }
            }, 600);

            const progressInterval = setInterval(() => {
                setProgress(prev => {
                    if (prev < 100) return prev + 2.5;
                    clearInterval(progressInterval);
                    return 100;
                });
            }, 40);

            const finishTimeout = setTimeout(() => {
                console.log("✅ Boot sequence finished!");
                finishBoot();
            }, 4500);

            return () => {
                clearInterval(logInterval);
                clearInterval(progressInterval);
                clearTimeout(finishTimeout);
            };
        }
    }, [isBooting]);

    return (
        <AnimatePresence>
            {isBooting && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.5 } }}
                    className="fixed inset-0 z-[9999] bg-[#050510] flex flex-col items-center justify-center font-mono text-cyan-400 overflow-hidden"
                >
                    {/* Subtle Noise/Scanline */}
                    <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent h-1 w-full animate-scanline"></div>

                    {/* Helmet Silhouette Placeholder */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: [0.1, 0.3, 0.1], scale: 1 }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="w-64 h-64 mb-12 border-2 border-cyan-500/20 rounded-full flex items-center justify-center relative"
                    >
                        <div className="absolute inset-0 border-t-2 border-cyan-400/40 rounded-full animate-spin-slow"></div>
                        <span className="text-4xl opacity-40">🪖</span>
                    </motion.div>

                    {/* Terminal Logs */}
                    <div className="w-full max-w-md px-8 text-sm">
                        {logs.map((log, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="mb-1"
                            >
                                <span className="mr-2 text-cyan-700">{">"}</span>
                                {log}
                            </motion.div>
                        ))}

                        <div className="mt-6 font-mono">
                            <div className="flex justify-between mb-1">
                                <span>{portfolioData.labels.boot.progressLabel}</span>
                                <span>{progress}%</span>
                            </div>
                            <div className="w-full h-1 bg-cyan-950 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-cyan-500"
                                    style={{ width: `${progress}%` }}
                                ></motion.div>
                            </div>
                        </div>
                    </div>

                    {/* Glitch Overlay (Triggered at end) */}
                    {progress > 95 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0, 1, 0] }}
                            className="fixed inset-0 bg-white/10 mix-blend-overlay z-[10000]"
                        />
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default BootSequence;

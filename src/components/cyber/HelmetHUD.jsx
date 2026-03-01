import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../../context/ThemeContext';
import { portfolioData } from '../../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

const HelmetCore = ({ theme }) => {
    const meshRef = useRef();
    const groupRef = useRef();
    const particlesRef = useRef();

    // Create particle field
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < 100; i++) {
            const r = 2 + Math.random() * 3;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;
            temp.push([
                r * Math.sin(phi) * Math.cos(theta),
                r * Math.sin(phi) * Math.sin(theta),
                r * Math.cos(phi)
            ]);
        }
        return temp;
    }, []);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.rotation.y = t * 0.2;
            meshRef.current.rotation.x = t * 0.1;
            meshRef.current.scale.setScalar(1 + Math.sin(t * 2) * 0.05);
        }
        if (groupRef.current) {
            groupRef.current.rotation.z = t * 0.05;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <group ref={groupRef}>
                {/* Central Neural Core */}
                <mesh ref={meshRef}>
                    <torusKnotGeometry args={[1, 0.3, 128, 32]} />
                    <MeshDistortMaterial
                        color={theme === 'cyber3d' ? "#00f2ff" : "#8b5cf6"}
                        speed={3}
                        distort={0.4}
                        radius={1}
                        emissive="#00f2ff"
                        emissiveIntensity={0.5}
                    />
                </mesh>

                {/* Concentric HUD Rings */}
                {[1, 1.2, 1.5].map((r, i) => (
                    <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
                        <torusGeometry args={[1.8 + r * 0.2, 0.015, 16, 100]} />
                        <meshBasicMaterial color={i % 2 === 0 ? "#00f2ff" : "#bc13fe"} transparent opacity={0.3 - i * 0.05} />
                    </mesh>
                ))}

                {/* Scanning Vertical Rings */}
                <mesh rotation={[0, Math.PI / 2, 0]}>
                    <torusGeometry args={[2.5, 0.01, 16, 100]} />
                    <meshBasicMaterial color="#00f2ff" transparent opacity={0.1} />
                </mesh>

                {/* Floating Data Particles */}
                {particles.map((pos, i) => (
                    <mesh key={i} position={pos}>
                        <sphereGeometry args={[0.02, 8, 8]} />
                        <meshBasicMaterial color="#00f2ff" transparent opacity={0.6} />
                    </mesh>
                ))}
            </group>
        </Float>
    );
};

const HelmetHUD = () => {
    const { theme } = useTheme();
    const containerRef = useRef();
    const canvasRef = useRef();

    useEffect(() => {
        if (theme !== 'cyber3d') return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "800px top",
                scrub: 1,
            }
        });

        tl.to(canvasRef.current, {
            scale: 0.3,
            x: "38vw",
            y: "-42vh",
            rotation: 12,
            duration: 1,
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, [theme]);

    if (theme !== 'cyber3d') return null;

    return (
        <div ref={containerRef} className="fixed inset-0 z-40 pointer-events-none">
            <div ref={canvasRef} className="w-full h-full flex items-center justify-center">
                <Canvas dpr={[1, 2]}>
                    <PerspectiveCamera makeDefault position={[0, 0, 8]} />
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f2ff" />
                    <pointLight position={[-10, -10, -10]} intensity={1} color="#bc13fe" />
                    <spotLight position={[0, 10, 0]} intensity={2.5} color="#00f2ff" angle={0.5} penumbra={1} />

                    <HelmetCore theme={theme} />
                </Canvas>
            </div>

            {/* HUD Data UI */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none font-mono text-[10px] text-cyan-400/60 transition-all duration-500 w-full max-w-lg aspect-square">
                <div className="absolute top-0 left-0 border-t border-l border-cyan-500/30 w-24 h-24"></div>
                <div className="absolute bottom-0 right-0 border-b border-r border-cyan-500/30 w-24 h-24"></div>

                <div className="absolute top-20 right-0 whitespace-nowrap animate-pulse">
                    <span className="text-cyan-500 font-bold mr-2">[STATUS]</span>
                    {portfolioData?.labels?.hud?.status || "SYS_ERROR"}
                </div>
                <div className="absolute bottom-20 left-0 whitespace-nowrap">
                    <span className="text-cyan-500 font-bold mr-2">[ID]</span>
                    {portfolioData?.labels?.hud?.identity || "NO_ID"}
                </div>

                <div className="absolute top-1/2 -left-32 w-24 h-[1px] bg-cyan-500/30"></div>
                <div className="absolute top-1/2 -right-32 w-24 h-[1px] bg-cyan-500/30"></div>
            </div>
        </div>
    );
};


export default HelmetHUD;

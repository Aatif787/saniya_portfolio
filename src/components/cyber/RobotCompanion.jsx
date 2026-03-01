import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';

const Robot = ({ mouse }) => {
    const headRef = useRef();
    const groupRef = useRef();
    const shoulderLRef = useRef();
    const shoulderRRef = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (headRef.current) {
            const targetRotationX = (mouse.current[1] * Math.PI) / 8;
            const targetRotationY = (mouse.current[0] * Math.PI) / 4;
            headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetRotationX, 0.1);
            headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetRotationY, 0.1);
        }
        if (shoulderLRef.current) {
            shoulderLRef.current.position.y = 0.5 + Math.sin(t * 2) * 0.05;
        }
        if (shoulderRRef.current) {
            shoulderRRef.current.position.y = 0.5 + Math.cos(t * 2) * 0.05;
        }
    });

    return (
        <group position={[0, -0.5, 0]}>
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                {/* Main Body Core */}
                <mesh position={[0, 0, 0]}>
                    <cylinderGeometry args={[0.5, 0.4, 1.2, 8]} />
                    <meshStandardMaterial color="#0b0e1a" metalness={0.9} roughness={0.1} />
                </mesh>

                {/* Floating Shoulders */}
                <group ref={shoulderLRef} position={[-0.8, 0.5, 0]}>
                    <mesh>
                        <boxGeometry args={[0.3, 0.6, 0.4]} />
                        <meshStandardMaterial color="#1a1a2e" metalness={0.8} />
                    </mesh>
                    <mesh position={[0, -0.3, 0]}>
                        <sphereGeometry args={[0.05, 8, 8]} />
                        <meshBasicMaterial color="#00f2ff" />
                    </mesh>
                </group>
                <group ref={shoulderRRef} position={[0.8, 0.5, 0]}>
                    <mesh>
                        <boxGeometry args={[0.3, 0.6, 0.4]} />
                        <meshStandardMaterial color="#1a1a2e" metalness={0.8} />
                    </mesh>
                    <mesh position={[0, -0.3, 0]}>
                        <sphereGeometry args={[0.05, 8, 8]} />
                        <meshBasicMaterial color="#00f2ff" />
                    </mesh>
                </group>

                {/* Advanced Head */}
                <group ref={headRef} position={[0, 1.2, 0]}>
                    {/* Helm Mesh */}
                    <mesh>
                        <sphereGeometry args={[0.5, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
                        <meshStandardMaterial color="#0b0e1a" metalness={1} roughness={0} />
                    </mesh>
                    {/* Visor Area */}
                    <mesh position={[0, 0, 0.35]}>
                        <planeGeometry args={[0.6, 0.2]} />
                        <meshBasicMaterial color="#000" />
                    </mesh>
                    {/* Glowing Eyes/Scanner */}
                    <group position={[0, 0, 0.36]}>
                        <mesh position={[-0.15, 0, 0]}>
                            <boxGeometry args={[0.2, 0.02, 0.01]} />
                            <meshBasicMaterial color="#00f2ff" />
                        </mesh>
                        <mesh position={[0.15, 0, 0]}>
                            <boxGeometry args={[0.2, 0.02, 0.01]} />
                            <meshBasicMaterial color="#00f2ff" />
                        </mesh>
                    </group>
                </group>
            </Float>
        </group>
    );
};

const RobotCompanion = ({ labelLine1, labelLine2 }) => {
    const { theme } = useTheme();
    const mouse = useRef([0, 0]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!e) return;
            mouse.current = [
                (e.clientX / window.innerWidth) * 2 - 1,
                -(e.clientY / window.innerHeight) * 2 + 1,
            ];
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    if (theme !== 'cyber3d') return null;

    return (
        <div className="h-[500px] w-full relative pointer-events-none group">
            <Canvas dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f2ff" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#bc13fe" />
                <spotLight position={[0, 5, 5]} intensity={2} color="#00f2ff" angle={0.8} />

                <Robot mouse={mouse} />
            </Canvas>

            {(labelLine1 || labelLine2) && (
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-cyan-400 font-mono text-[11px] uppercase tracking-[0.4em] text-center bg-black/40 px-6 py-2 rounded-full border border-cyan-500/20 backdrop-blur-md">
                    <span className="animate-pulse">{labelLine1}</span>
                    {labelLine2 && (
                        <div className="text-[9px] text-cyan-500/60 mt-1 tracking-widest">{labelLine2}</div>
                    )}
                </div>
            )}
        </div>
    );
};


export default RobotCompanion;

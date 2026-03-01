import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Stars, Text } from '@react-three/drei';
import * as THREE from 'three';

const GunCore = () => {
    const group = useRef();

    useFrame((state) => {
        if (group.current) {
            group.current.rotation.z += 0.005;
        }
    });

    return (
        <group ref={group}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[2, 0.05, 16, 100]} />
                <meshBasicMaterial color="#00f2ff" transparent opacity={0.5} />
            </mesh>
            <Float speed={5} rotationIntensity={2} floatIntensity={2}>
                <mesh>
                    <octahedronGeometry args={[1, 0]} />
                    <MeshDistortMaterial color="#ff0055" speed={5} distort={0.5} />
                </mesh>
            </Float>
            {/* Light Rays */}
            {[0, 1, 2, 3].map((i) => (
                <mesh key={i} rotation={[0, 0, (Math.PI * 2 * i) / 4]}>
                    <boxGeometry args={[0.02, 5, 0.02]} />
                    <meshBasicMaterial color="#00f2ff" transparent opacity={0.2} />
                </mesh>
            ))}
        </group>
    );
};

const DataCapsule = ({ project, index, prefix, cta }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="relative mb-32 max-w-xl mx-auto"
        >
            <div className="cyber-glass p-8 rounded-2xl border-l-[4px] border-cyan-400 group cursor-pointer hover:bg-cyan-500/5 transition-colors">
                <div className="absolute -top-4 -left-4 bg-cyan-500 text-black px-4 py-1 skew-x-[-20deg] font-bold text-xs">
                    {prefix}{index + 1}
                </div>

                <h3 className="text-2xl font-bold neon-text mb-4 uppercase tracking-widest">{project.title}</h3>
                <p className="text-cyan-100/70 text-sm mb-6 leading-relaxed">
                    {project.solution}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map(tech => (
                        <span key={tech} className="text-[10px] px-2 py-1 border border-cyan-500/30 text-cyan-400 uppercase">
                            {tech}
                        </span>
                    ))}
                </div>

                <div className="h-[2px] w-full bg-gradient-to-r from-cyan-500/50 to-transparent mb-4"></div>
                <div className="flex justify-between items-center text-[10px] text-cyan-500/50 font-mono">
                    <span>{project.metrics?.impact || project.metrics?.speed || project.metrics?.accuracy || ""}</span>
                    <span className="group-hover:text-white transition-colors">{cta}</span>
                </div>

            </div>
        </motion.div>
    );
};

const ArmoryOfCreation = ({ projects = [], heading, subheading, projectPrefix, projectCta }) => {
    return (
        <section className="relative py-32 bg-[#050510] overflow-hidden">
            {/* 3D Background Atmosphere */}
            <div className="absolute inset-0 z-0">
                <Canvas>
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                    <ambientLight intensity={0.2} />
                    <pointLight position={[10, 10, 10]} color="#00f2ff" intensity={2} />
                    <GunCore />
                </Canvas>
            </div>

            <div className="relative z-10 container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center mb-32"
                >
                    <h2 className="text-5xl font-bold text-white mb-4 tracking-tighter uppercase italic">
                        {heading}
                    </h2>
                    <p className="text-cyan-400/60 font-mono text-xs uppercase tracking-[0.3em]">
                        {subheading}
                    </p>
                </motion.div>

                <div className="space-y-12">
                    {projects.map((project, i) => (
                        <DataCapsule
                            key={i}
                            project={project}
                            index={i}
                            prefix={projectPrefix}
                            cta={projectCta}
                        />
                    ))}
                </div>
            </div>

            {/* Animated perspective grid floor */}
            <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-cyan-500/20 to-transparent pointer-events-none skew-y-[-5deg] opacity-30">
                <div className="cyber-grid w-full h-full"></div>
            </div>
        </section>
    );
};

export default ArmoryOfCreation;

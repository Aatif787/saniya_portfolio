import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, useMotionValue } from 'framer-motion';

const ParallaxBackground = () => {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });

  const layerShift = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMove = (e) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set(((e.clientX ?? innerWidth / 2) - innerWidth / 2) / innerWidth);
      mouseY.set(((e.clientY ?? innerHeight / 2) - innerHeight / 2) / innerHeight);
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, [mouseX, mouseY]);

  const translateX = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);
  const translateY = useTransform(mouseY, [-0.5, 0.5], [-10, 10]);

  return (
    <div ref={sectionRef} className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Layer 1: Gradient */}
      <motion.div
        className="absolute inset-0"
        style={reduceMotion ? undefined : { y: layerShift, x: translateX }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-indigo-950/40 to-black/60" />
      </motion.div>

      {/* Layer 2: Soft abstract shapes */}
      <motion.div
        className="absolute inset-0"
        style={reduceMotion ? undefined : { y: useTransform(layerShift, [0, -60], [0, -30]), x: translateX }}
      >
        <div className="absolute -top-20 -left-20 w-[36rem] h-[36rem] bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-24 w-[28rem] h-[28rem] bg-gradient-to-r from-blue-500/20 to-teal-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[24rem] h-[24rem] bg-gradient-to-r from-amber-400/15 to-rose-400/15 rounded-full blur-3xl" />
      </motion.div>

      {/* Layer 3: Light texture / particles */}
      <motion.div
        className="absolute inset-0"
        style={reduceMotion ? undefined : { y: useTransform(layerShift, [0, -60], [0, -15]), x: translateX }}
      >
        {[...Array(40)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-1 h-1 bg-white/10 rounded-full"
            style={{ left: `${(i * 73) % 100}%`, top: `${(i * 37) % 100}%` }}
            animate={reduceMotion ? undefined : { opacity: [0.1, 0.25, 0.1], y: [0, -4, 0] }}
            transition={reduceMotion ? undefined : { duration: 4 + (i % 5), repeat: Infinity }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default ParallaxBackground;


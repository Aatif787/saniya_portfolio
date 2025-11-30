import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const HeroOrb = ({ className = '' }) => {
  const reduceMotion = useReducedMotion();
  return (
    <div className={`absolute -z-10 ${className}`} aria-hidden>
      <motion.div
        className="w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-gradient-to-br from-purple-400/50 via-pink-400/40 to-blue-400/40 blur-xl"
        animate={reduceMotion ? undefined : { rotate: [0, 180, 360], scale: [1, 1.06, 1] }}
        transition={reduceMotion ? undefined : { duration: 18, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute inset-0 w-40 h-40 sm:w-56 sm:h-56 rounded-full bg-white/5"
        style={{ filter: 'blur(8px)' }}
        animate={reduceMotion ? undefined : { opacity: [0.2, 0.35, 0.2] }}
        transition={reduceMotion ? undefined : { duration: 6, repeat: Infinity }}
      />
    </div>
  );
};

export default HeroOrb;


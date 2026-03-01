import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import HeroOrb from '../../../components/effects/HeroOrb';
import Button from '../../../components/ui/Button';
import { portfolioData } from '@/data/portfolioData';

const HeroSection = () => {
  const [currentDataPoint, setCurrentDataPoint] = useState(0);
  const reduceMotion = useReducedMotion();

  const dataPoints = portfolioData.stats;

  const floatingElements = [
    { icon: 'BarChart3', delay: 0, x: 20, y: 30, color: 'text-purple-500' },
    { icon: 'Code', delay: 0.5, x: 80, y: 20, color: 'text-blue-500' },
    { icon: 'Database', delay: 1, x: 15, y: 70, color: 'text-green-500' },
    { icon: 'TrendingUp', delay: 1.5, x: 85, y: 75, color: 'text-yellow-500' },
    { icon: 'Zap', delay: 2, x: 50, y: 15, color: 'text-pink-500' },
    { icon: 'Target', delay: 2.5, x: 70, y: 60, color: 'text-indigo-500' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDataPoint((prev) => (prev + 1) % dataPoints?.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const bgTranslateY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const shapeRotate = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const titleGlow = useTransform(scrollYProgress, [0, 1], [0.3, 0.7]);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div className="absolute inset-0 opacity-20" style={{ y: bgTranslateY }}>
        {floatingElements?.map((element, index) => (
          <motion.div
            key={index}
            className={`absolute ${element?.color}`}
            style={{ left: `${element?.x}%`, top: `${element?.y}%` }}
            animate={{
              y: [0, -25, 0],
              rotate: [0, 10, -10, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 4 + index * 0.5,
              delay: element?.delay,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Icon name={element?.icon} size={36} />
          </motion.div>
        ))}
      </motion.div>
      {/* Colorful Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 blur-3xl will-change-transform transform-gpu"
          style={{ rotate: shapeRotate }}
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-r from-blue-400 to-green-400 rounded-full opacity-20 blur-2xl will-change-transform transform-gpu"
          animate={reduceMotion ? undefined : { scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
          transition={reduceMotion ? undefined : { duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-20 blur-xl will-change-transform transform-gpu"
          animate={reduceMotion ? undefined : { y: [0, -30, 0], x: [0, 20, 0] }}
          transition={reduceMotion ? undefined : { duration: 5, repeat: Infinity }}
        />
      </div>
      {/* Main Content */}
      <div className="relative z-20 max-w-none sm:max-w-[90rem] mx-0 sm:mx-auto px-4 sm:px-6 lg:px-10 pt-24 pb-12 glass-section rounded-none sm:rounded-3xl !overflow-visible">
        <div className="grid lg:grid-cols-[62%_38%] xl:grid-cols-[60%_40%] gap-8 sm:gap-12 items-start min-h-[80vh]">

          {/* Left Content */}
          <motion.div
            className="space-y-6 sm:space-y-8 text-center lg:text-left flex flex-col items-center lg:items-start"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border-2 border-purple-200 rounded-full px-4 sm:px-6 py-2 sm:py-3 shadow-lg animate-glow"
              whileHover={{ scale: 1.05 }}
              animate={{ y: [0, -2, 0] }}
              transition={{ y: { duration: 2, repeat: Infinity } }}
            >
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse"></div>
              <span className="text-xs sm:text-base font-semibold text-gray-700">Available for opportunities</span>
            </motion.div>

            {/* Name */}
            <div className="relative w-full">
              <HeroOrb className="-left-4 -top-6 sm:-left-10 sm:-top-10" />
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.div
                  className="text-[clamp(2.5rem,12vw,5.5rem)] font-bold text-gradient-rainbow leading-[1.1] sm:leading-none tracking-tighter font-['Poppins'] text-center lg:text-left"
                  style={{ filter: `drop-shadow(0 0 10px rgba(99,102,241,0.4))` }}
                  animate={reduceMotion ? undefined : {
                    textShadow: [
                      "0 0 20px rgba(99, 102, 241, 0.3)",
                      "0 0 40px rgba(236, 72, 153, 0.4)",
                      "0 0 20px rgba(99, 102, 241, 0.3)"
                    ]
                  }}
                  transition={reduceMotion ? undefined : { duration: 3, repeat: Infinity }}
                >
                  {portfolioData.name}
                </motion.div>
                <motion.p
                  className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-600"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {portfolioData.role}
                </motion.p>
              </motion.div>
            </div>

            {/* Main Headline */}
            <div className="space-y-3 sm:space-y-4">
              <motion.h1
                className="text-2xl sm:text-4xl lg:text-6xl font-bold text-gray-800 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Transforming Data into{' '}
                <motion.span
                  className="text-gradient block sm:inline"
                  animate={reduceMotion ? undefined : { scale: [1, 1.05, 1] }}
                  transition={reduceMotion ? undefined : { duration: 2, repeat: Infinity }}
                >
                  Decisions
                </motion.span>
              </motion.h1>

              <motion.h2
                className="text-lg sm:text-2xl lg:text-3xl font-semibold text-purple-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Building Solutions that Matter
              </motion.h2>
            </div>

            {/* Description */}
            <motion.p
              className="text-sm sm:text-lg text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {portfolioData.about}
            </motion.p>

            {/* Stats */}
            <motion.div
              className="glass-panel rounded-2xl p-4 sm:p-6 shadow-xl w-full sm:w-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.p
                className="text-purple-700 font-bold text-lg sm:text-xl"
                key={currentDataPoint}
                initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 0.6 }}
              >
                🚀 {dataPoints?.[currentDataPoint]}
              </motion.p>
            </motion.div>

            {/* Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <Link to="/project-case-studies-portfolio" className="w-full sm:w-auto">
                <Button
                  variant="default"
                  size="lg"
                  fullWidth
                  iconName="FolderOpen"
                  iconPosition="left"
                  className="hover-lift bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg animate-glow"
                >
                  View My Work
                </Button>
              </Link>

              <Link to="/about-professional-journey" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  fullWidth
                  iconName="User"
                  iconPosition="left"
                  className="hover-lift border-2 border-purple-300 text-purple-600 hover:bg-purple-50"
                >
                  About Me
                </Button>
              </Link>

              <Button
                variant="outline"
                size="lg"
                fullWidth
                iconName="Download"
                iconPosition="left"
                className="hover-lift border-2 border-gray-300 text-gray-600 hover:bg-gray-50 flex-shrink-0"
                onClick={() => window.open("/assets/images/resume.pdf", '_blank')}
              >
                Resume
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex items-center justify-center lg:justify-start space-x-6 sm:space-x-8 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              {[
                { href: "https://www.linkedin.com/in/saniya-dhada-618311326?", icon: "Linkedin", color: "text-blue-500 hover:text-blue-600" },
                { href: "https://github.com/Saniyyadhada06", icon: "Github", color: "text-gray-600 hover:text-gray-800" },
                { href: "mailto:saniyadhada71@gmail.com", icon: "Mail", color: "text-green-500 hover:text-green-600" }
              ]?.map((social, index) => (
                <motion.a
                  key={index}
                  href={social?.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${social?.color} transition-all duration-300 transform hover:scale-125`}
                  whileHover={{ y: -3 }}
                  animate={{ y: [0, -2, 0] }}
                  transition={{ y: { duration: 2 + index * 0.3, repeat: Infinity } }}
                >
                  <Icon name={social?.icon} size={28} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Profile Photo */}
          <motion.div
            className="relative z-[60] px-4 sm:px-0 lg:pr-4 xl:pr-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative w-full max-w-sm sm:max-w-[370px] mx-auto">
              {/* Profile Card Container - Fixed aspect ratio matching SVG coordinate space */}
              <Link to="/about-professional-journey" className="block">
                <motion.div
                  className="relative z-[70] glass-panel rounded-[30px] shadow-2xl border border-purple-100 overflow-visible transform-gpu will-change-transform w-full aspect-[370/450] cursor-pointer group/card"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
                  transition={reduceMotion ? undefined : { y: { duration: 4, repeat: Infinity } }}
                >
                  {/* SVG aligned perfectly using inset-0 */}
                  <motion.svg
                    className="pointer-events-none absolute inset-0 z-[100] overflow-visible select-none group-hover/card:drop-shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all duration-300"
                    viewBox="0 0 370 450"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <path
                        id="home-saniya-border-path"
                        /* 
                          PATH CALCULATION:
                          SVG Size: 370x450
                          Image centered with 20px padding -> Bounds: (20,20) to (350,430), Radius: 20px
                          Text spacing: 15px INSET from edge (moved 5px more inside) -> Path Bounds: (15,15) to (355,435), Radius: 30px
                        */
                        d="M 45,15 L 325,15 A 30,30 0 0 1 355,45 L 355,405 A 30,30 0 0 1 325,435 L 45,435 A 30,30 0 0 1 15,405 L 15,45 A 30,30 0 0 1 45,15 Z"
                      />
                      <linearGradient id="home-saniya-border-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#22c55e" />
                        <stop offset="50%" stopColor="#38bdf8" />
                        <stop offset="100%" stopColor="#f472b6" />
                      </linearGradient>
                    </defs>
                    <text
                      fill="url(#home-saniya-border-gradient)"
                      fontSize="16"
                      fontFamily="'Creepster', cursive"
                      letterSpacing="4"
                    >
                      <motion.textPath
                        href="#home-saniya-border-path"
                        animate={{ startOffset: ["-100%", "0%"] }}
                        transition={{
                          duration: 30,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      >
                        SANIYA • SANIYA • SANIYA • SANIYA • SANIYA • SANIYA • SANIYA • SANIYA • SANIYA • SANIYA • SANIYA • SANIYA • SANIYA • SANIYA • SANIYA • SANIYA • SANIYA • SANIYA • SANIYA • SANIYA • SANIYA • SANIYA • SANIYA • SANIYA •
                      </motion.textPath>
                    </text>
                  </motion.svg>

                  {/* Image Container - Inset exactly 20px to perfectly match path calculations */}
                  <div className="absolute inset-[20px] overflow-hidden rounded-[20px] z-[80] shadow-xl">
                    <Image
                      src="/assets/images/img1.png"
                      alt="My Profile Photo"
                      className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700"
                    />
                  </div>

                  {/* Floating Elements */}
                  <motion.div
                    className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-lg sm:rounded-xl p-2 sm:p-4 shadow-lg pointer-events-none transform-gpu will-change-transform z-[110]"
                    animate={{ y: [0, -8, 0], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Icon name="Code" size={reduceMotion ? 20 : 24} />
                  </motion.div>

                  <motion.div
                    className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 bg-gradient-to-r from-green-400 to-blue-400 text-white rounded-lg sm:rounded-xl p-2 sm:p-4 shadow-lg pointer-events-none transform-gpu will-change-transform z-[110]"
                    animate={{ y: [0, 8, 0], rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                  >
                    <Icon name="BarChart3" size={reduceMotion ? 20 : 24} />
                  </motion.div>

                  <motion.div
                    className="absolute top-1/2 -left-4 sm:-left-6 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-lg sm:rounded-xl p-2 sm:p-3 shadow-lg pointer-events-none transform-gpu will-change-transform z-[110]"
                    animate={{ x: [0, -5, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                  >
                    <Icon name="Sparkles" size={reduceMotion ? 18 : 20} />
                  </motion.div>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={reduceMotion ? undefined : { y: [0, 15, 0] }}
        transition={reduceMotion ? undefined : { duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center space-y-3 text-purple-600">
          <span className="text-sm font-semibold">Explore More</span>
          <motion.div
            animate={reduceMotion ? undefined : { scale: [1, 1.2, 1] }}
            transition={reduceMotion ? undefined : { duration: 2, repeat: Infinity }}
          >
            <Icon name="ChevronDown" size={24} />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const [currentDataPoint, setCurrentDataPoint] = useState(0);
  const reduceMotion = useReducedMotion();
  
  const dataPoints = [
    "15+ Projects Completed",
    "50,000+ Data Points Analyzed", 
    "3+ Years Learning Journey",
    "100% Client Satisfaction"
  ];

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
    <section ref={sectionRef} className="relative min-h-screen bg-transparent overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div className="absolute inset-0 opacity-20" style={{ y: bgTranslateY }}>
        {floatingElements?.map((element, index) => (
          <motion.div
            key={index}
            className={`absolute ${element?.color}`}
            style={{ left: `${element?.x}%`, top: `${element?.y}%` }}
            animate={reduceMotion ? undefined : {
              y: [0, -25, 0],
              rotate: [0, 10, -10, 0],
              scale: [1, 1.2, 1]
            }}
            transition={reduceMotion ? undefined : {
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
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20"
          style={{ rotate: shapeRotate }}
          animate={reduceMotion ? undefined : { scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={reduceMotion ? undefined : { duration: 8, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-r from-blue-400 to-green-400 rounded-full opacity-20"
          animate={reduceMotion ? undefined : { scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
          transition={reduceMotion ? undefined : { duration: 6, repeat: Infinity }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-20"
          animate={reduceMotion ? undefined : { y: [0, -30, 0], x: [0, 20, 0] }}
          transition={reduceMotion ? undefined : { duration: 5, repeat: Infinity }}
        />
      </div>
      {/* Main Content */}
      <div className="relative z-10 max-w-none sm:max-w-[90rem] mx-0 sm:mx-auto px-0 sm:px-6 lg:px-10 pt-10 pb-12 glass-section rounded-none sm:rounded-3xl">
        <div className="grid lg:grid-cols-[62%_38%] xl:grid-cols-[60%_40%] gap-12 items-start min-h-[80vh]">
          
          {/* Left Content */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div 
              className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border-2 border-purple-200 rounded-full px-6 py-3 shadow-lg animate-glow"
              whileHover={{ scale: 1.05 }}
              animate={{ y: [0, -2, 0] }}
              transition={{ y: { duration: 2, repeat: Infinity } }}
            >
              <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse"></div>
              <span className="text-base font-semibold text-gray-700">Available for opportunities</span>
            </motion.div>

            {/* Name */}
            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div 
                className="text-4xl sm:text-6xl lg:text-[89px] font-bold text-gradient-rainbow leading-none whitespace-nowrap"
                style={{ filter: `drop-shadow(0 0 ${titleGlow.get()}rem rgba(99,102,241,0.4))` }}
                animate={reduceMotion ? undefined : { 
                  textShadow: [
                    "0 0 20px rgba(99, 102, 241, 0.3)",
                    "0 0 40px rgba(236, 72, 153, 0.4)",
                    "0 0 20px rgba(99, 102, 241, 0.3)"
                  ]
                }}
                transition={reduceMotion ? undefined : { duration: 3, repeat: Infinity }}
              >
              Saniya Dhada
              </motion.div>
              <motion.p 
                className="text-2xl lg:text-3xl font-semibold text-gray-600"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Data Storyteller & Developer
              </motion.p>
            </motion.div>

            {/* Main Headline */}
            <div className="space-y-4">
              <motion.h1 
                className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-800 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Transforming Data into{' '}
                <motion.span 
                  className="text-gradient"
                  animate={reduceMotion ? undefined : { scale: [1, 1.05, 1] }}
                  transition={reduceMotion ? undefined : { duration: 2, repeat: Infinity }}
                >
                  Decisions
                </motion.span>
              </motion.h1>
              
              <motion.h2 
                className="text-xl sm:text-2xl lg:text-3xl font-semibold text-purple-600"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Building Solutions that Matter
              </motion.h2>
            </div>

            {/* Description */}
            <motion.p 
              className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              BCA graduate specializing in data analytics and full-stack development. 
              I bridge the gap between complex data insights and user-friendly solutions, 
              creating digital experiences that drive real business impact.
            </motion.p>

            {/* Stats */}
            <motion.div 
              className="glass-panel rounded-2xl p-6 shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.p 
                className="text-purple-700 font-bold text-xl"
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
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <Link to="/project-case-studies-portfolio">
                <Button 
                  variant="default" 
                  size="lg"
                  iconName="FolderOpen"
                  iconPosition="left"
                  className="hover-lift bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg animate-glow"
                >
                  View My Work
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                size="lg"
                iconName="Download"
                iconPosition="left"
                className="hover-lift border-2 border-purple-300 text-purple-600 hover:bg-purple-50 animate-wiggle"
                onClick={() => window.open("/assets/images/resume.pdf", '_blank')}
              >
                Download Resume
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              className="flex items-center space-x-8 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              {[
                { href: "https://www.linkedin.com/in/saniya-dhada-618311326?", icon: "Linkedin", color: "text-blue-500 hover:text-blue-600" },
                { href: "https://github.com/Saniyyadhada06", icon: "Github", color: "text-gray-600 hover:text-gray-800" },
                { href: "mailto:saniyadhada@gmail.com", icon: "Mail", color: "text-green-500 hover:text-green-600" }
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
            className="relative z-20"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative w-full max-w-none sm:max-w-lg mx-0 sm:mx-auto">
              <motion.div 
                className="absolute -inset-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 rounded-3xl opacity-30 blur-2xl"
                animate={reduceMotion ? undefined : { rotate: [0, 5, -5, 0] }}
                transition={reduceMotion ? undefined : { duration: 8, repeat: Infinity }}
              ></motion.div>
              
              <motion.div 
                className="relative glass-panel rounded-3xl p-8 shadow-2xl"
                whileHover={{ scale: 1.02 }}
                animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
                transition={reduceMotion ? undefined : { y: { duration: 4, repeat: Infinity } }}
              >
                <div className="aspect-[3/4] overflow-hidden rounded-none sm:rounded-2xl">
                  
                  <Image 
                    src="/assets/images/img1.png"
                    alt="My Profile Photo"
                    className="w-full h-full object-cover"
                  />

                </div>
                
                {/* Floating Info Cards */}
                <motion.div 
                  className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-xl p-4 shadow-lg"
                  animate={{ y: [0, -8, 0], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Icon name="Code" size={24} />
                </motion.div>
                
                <motion.div 
                  className="absolute -bottom-4 -left-4 bg-gradient-to-r from-green-400 to-blue-400 text-white rounded-xl p-4 shadow-lg"
                  animate={{ y: [0, 8, 0], rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                >
                  <Icon name="BarChart3" size={24} />
                </motion.div>
                
                <motion.div 
                  className="absolute top-1/2 -left-6 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-xl p-3 shadow-lg"
                  animate={{ x: [0, -5, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                >
                  <Icon name="Sparkles" size={20} />
                </motion.div>
              </motion.div>
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

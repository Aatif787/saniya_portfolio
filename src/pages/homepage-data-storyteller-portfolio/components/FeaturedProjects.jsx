import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { portfolioData } from '../../../data/portfolioData';

const FeaturedProjects = () => {
  const [activeProject, setActiveProject] = useState(0);
  const tiltRef = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({ transform: 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)', transition: 'transform 200ms ease' });
  const [shineStyle, setShineStyle] = useState({ opacity: 0 });

  const projects = portfolioData.projects;

  const nextProject = () => {
    setActiveProject((prev) => (prev + 1) % projects?.length);
  };

  const prevProject = () => {
    setActiveProject((prev) => (prev - 1 + projects?.length) % projects?.length);
  };

  return (
    <section className="py-12 sm:py-20 bg-transparent section-optimize overflow-hidden">
      <div className="max-w-none sm:max-w-7xl mx-0 sm:mx-auto px-4 sm:px-6 lg:px-8 glass-section rounded-none sm:rounded-3xl p-4 sm:p-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-3 sm:mb-4">
            {portfolioData.labels.projectsTitle}
          </h2>
          <p className="text-sm sm:text-lg text-text-secondary max-w-2xl mx-auto px-4 sm:px-0">
            {portfolioData.labels.projectsSubtitle}
          </p>
        </motion.div>

        {/* Project Carousel */}
        <div className="relative">
          {/* Main Project Display */}
          <motion.div
            key={activeProject}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = offset.x;
              if (swipe < -50) {
                nextProject();
              } else if (swipe > 50) {
                prevProject();
              }
            }}
            className="cursor-grab active:cursor-grabbing"
          >
            <div
              ref={tiltRef}
              className="relative glass-panel rounded-2xl overflow-hidden will-change-transform"
              style={tiltStyle}
              onMouseMove={(e) => {
                // Disable tilt on small screens
                if (window.innerWidth < 1024) return;
                const rect = tiltRef.current?.getBoundingClientRect();
                if (!rect) return;
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const rx = ((y / rect.height) - 0.5) * -10;
                const ry = ((x / rect.width) - 0.5) * 10;
                setTiltStyle({ transform: `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.01)`, transition: 'transform 80ms ease' });
                setShineStyle({
                  opacity: 0.15,
                  background: `radial-gradient(600px circle at ${x}px ${y}px, rgba(255,255,255,0.6), transparent 40%)`
                });
              }}
              onMouseLeave={() => {
                setTiltStyle({ transform: 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)', transition: 'transform 200ms ease' });
                setShineStyle({ opacity: 0 });
              }}
            >
              <div className="pointer-events-none absolute inset-0" style={shineStyle} />
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Project Image */}
                <div className="relative h-56 sm:h-64 lg:h-auto overflow-hidden">
                  <motion.div
                    initial={{ scale: 1.02 }}
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full"
                  >
                    <Image
                      src={projects?.[activeProject]?.image}
                      alt={projects?.[activeProject]?.title}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-accent/90 backdrop-blur-sm text-accent-foreground px-3 py-1 rounded-full text-xs sm:text-sm font-medium shadow-lg">
                      {projects?.[activeProject]?.category}
                    </span>
                  </div>
                </div>

                {/* Project Details */}
                <div className="p-6 sm:p-8 lg:p-12">
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                  >
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary mb-4">
                      {projects?.[activeProject]?.title}
                    </h3>

                    {/* Problem-Solution-Outcome */}
                    <div className="space-y-4 mb-6">
                      <div className="bg-muted/30 p-3 rounded-xl border border-border/50">
                        <h4 className="font-semibold text-text-primary mb-1 flex items-center text-sm sm:text-base">
                          <Icon name="AlertCircle" size={16} className="mr-2 text-error" />
                          Problem
                        </h4>
                        <p className="text-text-secondary text-xs sm:text-sm leading-relaxed">
                          {projects?.[activeProject]?.problem}
                        </p>
                      </div>

                      <div className="bg-muted/30 p-3 rounded-xl border border-border/50">
                        <h4 className="font-semibold text-text-primary mb-1 flex items-center text-sm sm:text-base">
                          <Icon name="Lightbulb" size={16} className="mr-2 text-warning" />
                          Solution
                        </h4>
                        <p className="text-text-secondary text-xs sm:text-sm leading-relaxed">
                          {projects?.[activeProject]?.solution}
                        </p>
                      </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6">
                      {Object.entries(projects?.[activeProject]?.metrics)?.map(([key, value], i) => (
                        <motion.div
                          key={key}
                          className="text-center p-2 sm:p-3 bg-primary/5 rounded-xl border border-primary/10"
                          initial={{ opacity: 0, y: 12 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.05 * i }}
                          viewport={{ once: true }}
                        >
                          <p className="text-[10px] sm:text-sm font-bold text-primary truncate">{value}</p>
                          <p className="text-[8px] sm:text-xs text-text-secondary capitalize truncate">{key}</p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Technologies */}
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {projects?.[activeProject]?.technologies?.map((tech, i) => (
                          <motion.span
                            key={tech}
                            className="bg-primary/10 text-primary px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-medium border border-primary/10"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.04 * i }}
                            viewport={{ once: true }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <Link to={projects?.[activeProject]?.link}>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          variant="default"
                          fullWidth
                          iconName="ExternalLink"
                          iconPosition="right"
                          className="hover-lift h-12 sm:h-auto text-sm sm:text-base"
                        >
                          View Case Study
                        </Button>
                      </motion.div>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-6 sm:mt-8">
            {/* Previous Button */}
            <button
              onClick={prevProject}
              className="flex items-center space-x-2 p-2 sm:p-3 glass-panel rounded-xl hover-lift bg-white/50"
            >
              <Icon name="ChevronLeft" size={20} />
              <span className="hidden sm:inline text-sm font-medium">Previous</span>
            </button>

            {/* Project Indicators */}
            <div className="flex space-x-2 sm:space-x-3">
              {projects?.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveProject(index)}
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${index === activeProject
                      ? 'bg-primary w-6 sm:w-8' : 'bg-primary/20 hover:bg-primary/40'
                    }`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={nextProject}
              className="flex items-center space-x-2 p-2 sm:p-3 glass-panel rounded-xl hover-lift bg-white/50"
            >
              <span className="hidden sm:inline text-sm font-medium">Next</span>
              <Icon name="ChevronRight" size={20} />
            </button>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-8 sm:mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link to="/project-case-studies-portfolio">
            <Button
              variant="outline"
              size="lg"
              fullWidth
              iconName="FolderOpen"
              iconPosition="left"
              className="hover-lift h-12 sm:h-auto border-2 border-primary/20 text-primary hover:bg-primary/5"
            >
              View All Projects
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProjects;

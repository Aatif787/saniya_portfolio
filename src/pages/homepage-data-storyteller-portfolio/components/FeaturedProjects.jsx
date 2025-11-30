import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedProjects = () => {
  const [activeProject, setActiveProject] = useState(0);
  const tiltRef = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({ transform: 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)', transition: 'transform 200ms ease' });
  const [shineStyle, setShineStyle] = useState({ opacity: 0 });

  const projects = [
    {
      id: 1,
      title: "DocMeet - Online Doctor Appointment Platform",
      category: "Full-Stack",
      problem: "Clinics and patients relied on phone calls and spreadsheets, causing scheduling conflicts and no-shows.",
      solution: "Responsive web app to browse doctors, book slots, receive automated reminders, with role-based dashboards for staff and doctors.",
      outcome: "Reduced scheduling time by 60%, improved patient satisfaction by 35%, and decreased no-shows by 25%.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop",
      technologies: ["React", "Node.js", "MongoDB", "Express", "JWT"],
      metrics: {
        impact: "60% Time Reduction",
        users: "1,000+ Bookings/Month",
        timeline: "8 Weeks"
      },
      link: "/project-case-studies-portfolio"
    },
    {
      id: 2,
      title: "HR Analytics Dashboard",
      category: "Data Analytics",
      problem: "HR teams lacked consolidated insight across 1,000+ employee records for attrition, performance, and hiring decisions.",
      solution: "Developed Power BI dashboards fed by SQL and Excel ETL; built predictive models for attrition and performance.",
      outcome: "Achieved 85% model accuracy, reduced manual processing by 50%, and improved decision-making efficiency by 30%.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      technologies: ["Power BI", "SQL", "Excel", "Python"],
      metrics: {
        accuracy: "85% Accuracy",
        efficiency: "30% Decision Efficiency",
        time: "50% Manual Time Cut"
      },
      link: "/project-case-studies-portfolio"
    },
    {
      id: 3,
      title: "DataHorizon with AI - Full-Stack Data Analysis",
      category: "Full-Stack",
      problem: "Organizations struggled with fragmented data pipelines and slow manual reporting across teams.",
      solution: "Unified platform for ingestion, model training, and real-time dashboards with AI-assisted insights and feature store.",
      outcome: "Delivered 2× faster analytics cycles and 90% forecast accuracy with automated, repeatable pipelines.",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&h=400&fit=crop",
      technologies: ["React", "FastAPI", "PostgreSQL", "TensorFlow", "Docker"],
      metrics: {
        speed: "2× Faster Insights",
        accuracy: "90% Forecast Accuracy",
        timeline: "12 Weeks"
      },
      link: "/project-case-studies-portfolio"
    }
  ];

  const nextProject = () => {
    setActiveProject((prev) => (prev + 1) % projects?.length);
  };

  const prevProject = () => {
    setActiveProject((prev) => (prev - 1 + projects?.length) % projects?.length);
  };

  return (
    <section className="py-16 sm:py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 glass-section rounded-3xl p-6 sm:p-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Real-world solutions that demonstrate the intersection of data analytics and web development. 
            Each project showcases problem-solving approach and measurable business impact.
          </p>
        </motion.div>

        {/* Project Carousel */}
        <div className="relative">
          {/* Main Project Display */}
          <motion.div 
            key={activeProject}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div
              ref={tiltRef}
              className="relative glass-panel rounded-2xl overflow-hidden will-change-transform"
              style={tiltStyle}
              onMouseMove={(e) => {
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
              <div className="relative h-64 lg:h-auto overflow-hidden">
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {projects?.[activeProject]?.category}
                  </span>
                </div>
              </div>

              {/* Project Details */}
              <div className="p-8 lg:p-12">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                >
                  <h3 className="text-2xl lg:text-3xl font-bold text-primary mb-4">
                    {projects?.[activeProject]?.title}
                  </h3>

                  {/* Problem-Solution-Outcome */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <h4 className="font-semibold text-text-primary mb-2 flex items-center">
                        <Icon name="AlertCircle" size={16} className="mr-2 text-error" />
                        Problem
                      </h4>
                      <p className="text-text-secondary text-sm leading-relaxed">
                        {projects?.[activeProject]?.problem}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-text-primary mb-2 flex items-center">
                        <Icon name="Lightbulb" size={16} className="mr-2 text-warning" />
                        Solution
                      </h4>
                      <p className="text-text-secondary text-sm leading-relaxed">
                        {projects?.[activeProject]?.solution}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-text-primary mb-2 flex items-center">
                        <Icon name="TrendingUp" size={16} className="mr-2 text-success" />
                        Outcome
                      </h4>
                      <p className="text-text-secondary text-sm leading-relaxed">
                        {projects?.[activeProject]?.outcome}
                      </p>
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {Object.entries(projects?.[activeProject]?.metrics)?.map(([key, value], i) => (
                      <motion.div 
                        key={key}
                        className="text-center p-3 bg-muted rounded-lg"
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.05 * i }}
                        viewport={{ once: true }}
                      >
                        <p className="text-sm font-semibold text-primary">{value}</p>
                        <p className="text-xs text-text-secondary capitalize">{key}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-text-primary mb-3">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {projects?.[activeProject]?.technologies?.map((tech, i) => (
                        <motion.span 
                          key={tech}
                          className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
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
                        iconName="ExternalLink"
                        iconPosition="right"
                        className="hover-lift"
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
          <div className="flex items-center justify-between mt-8">
            {/* Previous Button */}
            <button
              onClick={prevProject}
              className="flex items-center space-x-2 p-3 glass-panel rounded-lg hover-lift"
            >
              <Icon name="ChevronLeft" size={20} />
              <span className="hidden sm:inline text-sm font-medium">Previous</span>
            </button>

            {/* Project Indicators */}
            <div className="flex space-x-2">
              {projects?.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveProject(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === activeProject 
                      ? 'bg-primary scale-125' :'bg-border hover:bg-text-secondary'
                  }`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={nextProject}
              className="flex items-center space-x-2 p-3 glass-panel rounded-lg hover-lift"
            >
              <span className="hidden sm:inline text-sm font-medium">Next</span>
              <Icon name="ChevronRight" size={20} />
            </button>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link to="/project-case-studies-portfolio">
            <Button 
              variant="outline" 
              size="lg"
              iconName="FolderOpen"
              iconPosition="left"
              className="hover-lift"
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

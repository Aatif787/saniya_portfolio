import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedProjects = () => {
  const [activeProject, setActiveProject] = useState(0);

  const projects = [
    {
      id: 1,
      title: "E-commerce Sales Analytics Dashboard",
      category: "Data Analytics",
      problem: "Online retailer needed insights into customer behavior and sales patterns to optimize inventory and marketing strategies.",
      solution: "Built comprehensive Tableau dashboard analyzing 50K+ transactions with predictive models for demand forecasting.",
      outcome: "Increased sales by 23% and reduced inventory costs by 15% through data-driven decision making.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      technologies: ["Python", "Tableau", "SQL", "Pandas"],
      metrics: {
        impact: "23% Sales Increase",
        data: "50K+ Transactions",
        timeline: "6 Weeks"
      },
      link: "/project-case-studies-portfolio"
    },
    {
      id: 2,
      title: "React Task Management App",
      category: "Web Development", 
      problem: "Small teams struggled with project coordination and task tracking across multiple platforms and tools.",
      solution: "Developed responsive React application with real-time collaboration features and intuitive drag-drop interface.",
      outcome: "Improved team productivity by 40% and reduced project completion time by 2 weeks on average.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
      technologies: ["React", "Node.js", "MongoDB", "Socket.io"],
      metrics: {
        impact: "40% Productivity Boost",
        users: "150+ Active Users",
        timeline: "8 Weeks"
      },
      link: "/project-case-studies-portfolio"
    },
    {
      id: 3,
      title: "Customer Segmentation ML Model",
      category: "Machine Learning",
      problem: "Marketing team needed to identify high-value customer segments for targeted campaigns and retention strategies.",
      solution: "Implemented K-means clustering algorithm analyzing customer behavior patterns and purchase history data.",
      outcome: "Achieved 85% accuracy in customer classification and increased campaign ROI by 60%.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      technologies: ["Python", "Scikit-learn", "Pandas", "Matplotlib"],
      metrics: {
        impact: "60% ROI Increase",
        accuracy: "85% Model Accuracy",
        timeline: "4 Weeks"
      },
      link: "/project-case-studies-portfolio"
    },
    {
      id: 4,
      title: "Financial Data Visualization Platform",
      category: "Full-Stack Development",
      problem: "Investment firm required real-time market data visualization with custom analytics and reporting capabilities.",
      solution: "Built full-stack platform with React frontend and Python backend, integrating multiple financial APIs.",
      outcome: "Reduced analysis time by 70% and enabled real-time decision making for portfolio management.",
      image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&h=400&fit=crop",
      technologies: ["React", "Python", "FastAPI", "PostgreSQL"],
      metrics: {
        impact: "70% Time Reduction",
        data: "Real-time Updates",
        timeline: "10 Weeks"
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
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
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
            className="bg-surface border border-border rounded-2xl shadow-brand-lg overflow-hidden"
            key={activeProject}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Project Image */}
              <div className="relative h-64 lg:h-auto overflow-hidden">
                <Image 
                  src={projects?.[activeProject]?.image}
                  alt={projects?.[activeProject]?.title}
                  className="w-full h-full object-cover"
                />
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
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
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
                    {Object.entries(projects?.[activeProject]?.metrics)?.map(([key, value]) => (
                      <div key={key} className="text-center p-3 bg-muted rounded-lg">
                        <p className="text-sm font-semibold text-primary">{value}</p>
                        <p className="text-xs text-text-secondary capitalize">{key}</p>
                      </div>
                    ))}
                  </div>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-text-primary mb-3">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {projects?.[activeProject]?.technologies?.map((tech) => (
                        <span 
                          key={tech}
                          className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <Link to={projects?.[activeProject]?.link}>
                    <Button 
                      variant="default"
                      iconName="ExternalLink"
                      iconPosition="right"
                      className="hover-lift"
                    >
                      View Case Study
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8">
            {/* Previous Button */}
            <button
              onClick={prevProject}
              className="flex items-center space-x-2 p-3 bg-surface border border-border rounded-lg hover:bg-muted transition-colors duration-200 hover-lift"
            >
              <Icon name="ChevronLeft" size={20} />
              <span className="hidden sm:inline text-sm font-medium">Previous</span>
            </button>

            {/* Project Indicators */}
            <div className="flex space-x-2">
              {projects?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveProject(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === activeProject 
                      ? 'bg-primary scale-125' :'bg-border hover:bg-text-secondary'
                  }`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={nextProject}
              className="flex items-center space-x-2 p-3 bg-surface border border-border rounded-lg hover:bg-muted transition-colors duration-200 hover-lift"
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
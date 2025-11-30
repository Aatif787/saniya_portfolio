import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import SkillCard from './components/SkillCard';
import InteractiveDemo from './components/InteractiveDemo';
import ProblemSolvingSection from './components/ProblemSolvingSection';
import ResourceLibrary from './components/ResourceLibrary';
import TestimonialSection from './components/TestimonialSection';

const SkillsInteractiveCapabilities = () => {
  const [selectedDemo, setSelectedDemo] = useState(null);
  const [activeSkillCategory, setActiveSkillCategory] = useState('all');

  const skillCategories = [
    { id: 'all', name: 'All Skills', icon: 'Grid3X3' },
    { id: 'data-analytics', name: 'Data Analytics', icon: 'BarChart3' },
    { id: 'full-stack', name: 'Full-Stack Development', icon: 'Code' },
    { id: 'bridge-skills', name: 'Bridge Skills', icon: 'Users' }
  ];

  const skills = [
    // Data Analytics
    {
      id: 1,
      name: "Python",
      category: "data-analytics",
      icon: "FileCode",
      proficiency: "Expert",
      experience: 3,
      description: "Advanced data analysis, machine learning, and automation using Python with libraries like Pandas, NumPy, and Scikit-learn.",
      recentProjects: ["Sales Forecasting Model", "Customer Segmentation", "Automated Reporting"],
      hasDemo: true
    },
    {
      id: 2,
      name: "SQL",
      category: "data-analytics",
      icon: "Database",
      proficiency: "Expert",
      experience: 3,
      description: "Complex query optimization, database design, and data warehousing with PostgreSQL, MySQL, and SQL Server.",
      recentProjects: ["Data Warehouse Design", "Query Optimization", "ETL Pipelines"],
      hasDemo: true
    },
    {
      id: 3,
      name: "Tableau",
      category: "data-analytics",
      icon: "BarChart3",
      proficiency: "Advanced",
      experience: 2,
      description: "Interactive dashboards, advanced calculations, and storytelling with data visualization best practices.",
      recentProjects: ["Executive Dashboard", "Sales Analytics", "KPI Monitoring"],
      hasDemo: true
    },
    {
      id: 4,
      name: "Power BI",
      category: "data-analytics",
      icon: "TrendingUp",
      proficiency: "Advanced",
      experience: 2,
      description: "Business intelligence solutions, DAX calculations, and integration with Microsoft ecosystem.",
      recentProjects: ["Financial Reporting", "Operational Metrics", "Real-time Dashboards"],
      hasDemo: true
    },

    // Full-Stack Development
    {
      id: 5,
      name: "React",
      category: "full-stack",
      icon: "Code",
      proficiency: "Expert",
      experience: 3,
      description: "Modern React development with hooks, context, and performance optimization for scalable web applications.",
      recentProjects: ["E-commerce Platform", "Analytics Dashboard", "Customer Portal"],
      hasDemo: true
    },
    {
      id: 6,
      name: "Node.js",
      category: "full-stack",
      icon: "Server",
      proficiency: "Advanced",
      experience: 2,
      description: "Backend API development, database integration, and microservices architecture with Express.js.",
      recentProjects: ["REST API Development", "Authentication System", "Data Processing Service"],
      hasDemo: true
    },
    {
      id: 7,
      name: "JavaScript",
      category: "full-stack",
      icon: "FileCode",
      proficiency: "Expert",
      experience: 3,
      description: "ES6+ features, async programming, and modern JavaScript patterns for both frontend and backend development.",
      recentProjects: ["Interactive Visualizations", "Form Validation", "API Integration"],
      hasDemo: true
    },
    {
      id: 8,
      name: "HTML/CSS",
      category: "full-stack",
      icon: "Layout",
      proficiency: "Expert",
      experience: 3,
      description: "Semantic HTML, responsive design, CSS Grid/Flexbox, and modern styling with Sass and Tailwind CSS.",
      recentProjects: ["Responsive Layouts", "Component Libraries", "Design Systems"],
      hasDemo: false
    },

    // Bridge Skills
    {
      id: 9,
      name: "UI/UX Design",
      category: "bridge-skills",
      icon: "Palette",
      proficiency: "Intermediate",
      experience: 2,
      description: "User-centered design principles, wireframing, prototyping, and usability testing for better user experiences.",
      recentProjects: ["Dashboard Redesign", "Mobile App UX", "User Research"],
      hasDemo: false
    },
    {
      id: 10,
      name: "Business Analysis",
      category: "bridge-skills",
      icon: "TrendingUp",
      proficiency: "Advanced",
      experience: 2,
      description: "Requirements gathering, stakeholder management, and translating business needs into technical solutions.",
      recentProjects: ["Process Optimization", "Requirements Documentation", "Stakeholder Workshops"],
      hasDemo: false
    },
    {
      id: 11,
      name: "Project Management",
      category: "bridge-skills",
      icon: "CheckSquare",
      proficiency: "Intermediate",
      experience: 2,
      description: "Agile methodologies, timeline management, and cross-functional team coordination for successful project delivery.",
      recentProjects: ["Agile Implementation", "Team Coordination", "Timeline Management"],
      hasDemo: false
    },
    {
      id: 12,
      name: "Data Storytelling",
      category: "bridge-skills",
      icon: "BookOpen",
      proficiency: "Advanced",
      experience: 3,
      description: "Transforming complex data insights into compelling narratives that drive business decisions and stakeholder buy-in.",
      recentProjects: ["Executive Presentations", "Data-Driven Reports", "Insight Communication"],
      hasDemo: false
    }
  ];

  const filteredSkills = activeSkillCategory === 'all' 
    ? skills 
    : skills?.filter(skill => skill?.category === activeSkillCategory);

  const handleDemoClick = (skill) => {
    setSelectedDemo(skill);
  };

  const closeDemoModal = () => {
    setSelectedDemo(null);
  };

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-transparent">
      <Helmet>
        <title>Skills & Interactive Capabilities - Saniya Portfolio</title>
        <meta name="description" content="Explore Saniya's technical skills through interactive demonstrations. Data Analytics, Full-Stack Development, and Bridge Skills with live examples and code samples." />
        <meta name="keywords" content="Python, SQL, React, Tableau, Power BI, Data Analysis, Full Stack Development, JavaScript, Node.js" />
      </Helmet>
      <Header />
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-brand text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2 mb-6">
              <Icon name="Zap" size={16} />
              <span className="text-sm font-medium">Interactive Capabilities</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Skills in Action
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto mb-8">
              Moving beyond static skill lists to demonstrate capabilities through interactive examples, 
              live tools, and real-world applications that showcase the intersection of analytics and user experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" iconName="Play" iconPosition="left">
                View Live Demos
              </Button>
              <Button variant="outline" size="lg" iconName="Download" iconPosition="left" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                Download Resources
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Skills Overview */}
      <section className="py-16 bg-transparent">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 glass-section rounded-3xl p-6 sm:p-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Technical Expertise
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              Organized into three main areas: Data Analytics, Full-Stack Development, and Bridge Skills 
              that connect technical capabilities with business value.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {skillCategories?.map((category) => (
              <button
                key={category?.id}
                onClick={() => setActiveSkillCategory(category?.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeSkillCategory === category?.id
                    ? 'bg-primary text-primary-foreground shadow-brand'
                    : 'bg-surface text-text-secondary hover:text-primary hover:bg-muted border border-border'
                }`}
              >
                <Icon name={category?.icon} size={16} />
                <span>{category?.name}</span>
              </button>
            ))}
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills?.map((skill) => (
              <SkillCard
                key={skill?.id}
                skill={skill}
                onDemoClick={handleDemoClick}
              />
            ))}
          </div>

          {/* Skills Summary */}
          <div className="mt-16 bg-surface rounded-lg shadow-brand p-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon name="BarChart3" size={32} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">Data Analytics</h3>
                <p className="text-text-secondary text-sm">
                  Python, SQL, Tableau, Power BI for transforming raw data into actionable business insights
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon name="Code" size={32} className="text-secondary" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">Full-Stack Development</h3>
                <p className="text-text-secondary text-sm">
                  React, Node.js, JavaScript for building scalable, user-friendly web applications
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon name="Users" size={32} className="text-accent-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">Bridge Skills</h3>
                <p className="text-text-secondary text-sm">
                  UI/UX, Business Analysis, Project Management for connecting technical solutions with business needs
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Problem-Solving Approach */}
      <ProblemSolvingSection />
      {/* Resource Library */}
      <ResourceLibrary />
      {/* Industry Applications */}
      <section className="py-16 bg-transparent">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 glass-section rounded-3xl p-6 sm:p-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">
              Industry Applications
            </h2>
            <p className="text-lg text-text-secondary max-w-3xl mx-auto">
              How my skills apply across different sectors and business contexts
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-surface rounded-lg p-6 hover-lift">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Icon name="ShoppingCart" size={24} className="text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-3">E-commerce Analytics</h3>
              <p className="text-text-secondary text-sm mb-4">
                Customer behavior analysis, conversion optimization, and sales forecasting for online retailers.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md">Python</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md">SQL</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md">Tableau</span>
              </div>
            </div>

            <div className="bg-surface rounded-lg p-6 hover-lift">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Icon name="Globe" size={24} className="text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-3">Web Applications</h3>
              <p className="text-text-secondary text-sm mb-4">
                Full-stack development of responsive, scalable web applications with modern user interfaces.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-md">React</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-md">Node.js</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-md">JavaScript</span>
              </div>
            </div>

            <div className="bg-surface rounded-lg p-6 hover-lift">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Icon name="TrendingUp" size={24} className="text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-3">Business Intelligence</h3>
              <p className="text-text-secondary text-sm mb-4">
                Executive dashboards, KPI monitoring, and data-driven decision support systems.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-md">Power BI</span>
                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-md">SQL</span>
                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-md">Analysis</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonials */}
      <TestimonialSection />
      {/* Call to Action */}
      <section className="py-16 bg-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center glass-section rounded-3xl p-6">
          <h2 className="text-3xl font-bold text-text-primary mb-4">
            Ready to See These Skills in Action?
          </h2>
          <p className="text-lg text-text-secondary mb-8">
            Let's discuss how my technical expertise can help solve your business challenges
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="default" size="lg" iconName="Calendar" iconPosition="left">
              Schedule a Call
            </Button>
            <Button variant="outline" size="lg" iconName="FolderOpen" iconPosition="left">
              View Project Portfolio
            </Button>
          </div>
        </div>
      </section>
      {/* Interactive Demo Modal */}
      {selectedDemo && (
        <InteractiveDemo
          skill={selectedDemo}
          onClose={closeDemoModal}
        />
      )}
    </div>
  );
};

export default SkillsInteractiveCapabilities;

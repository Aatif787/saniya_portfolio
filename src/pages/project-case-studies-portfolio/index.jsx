import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ProjectCard from './components/ProjectCard';
import ProjectFilter from './components/ProjectFilter';
import ProjectModal from './components/ProjectModal';
import FeaturedProject from './components/FeaturedProject';
import ProjectStats from './components/ProjectStats';

const ProjectCaseStudiesPortfolio = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeIndustry, setActiveIndustry] = useState('all');
  const [activeTechnology, setActiveTechnology] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState('featured');

  // Mock project data
  const projects = [
    {
      id: 1,
      title: "E-commerce Analytics Dashboard",
      category: "Data Analytics",
      industry: "E-commerce",
      description: "Comprehensive analytics dashboard that transformed raw sales data into actionable business insights, enabling data-driven decision making for a growing online retailer.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
      technologies: ["Python", "Tableau", "PostgreSQL", "Pandas", "NumPy", "Plotly"],
      metrics: [
        "Increased conversion rates by 23%",
        "Reduced data processing time by 75%",
        "Improved inventory turnover by 18%",
        "Enhanced customer segmentation accuracy by 40%"
      ],
      status: "Completed",
      duration: "3 months",
      githubUrl: "https://github.com/saniya/ecommerce-dashboard",
      liveUrl: "https://demo.ecommerce-dashboard.com",
      featured: true,
      challenge: `The client was struggling with fragmented data across multiple platforms - sales data in Shopify, customer behavior in Google Analytics, inventory in their ERP system, and marketing metrics scattered across various tools. They needed a unified view to make informed decisions about inventory, marketing spend, and customer acquisition strategies.`,
      solution: `Developed a comprehensive ETL pipeline that consolidated data from multiple sources into a centralized PostgreSQL database. Created interactive Tableau dashboards with real-time updates, automated reporting, and predictive analytics for inventory management and customer lifetime value prediction.`,
      implementation: `• Built Python-based ETL pipeline using Pandas and SQLAlchemy for data extraction and transformation\n• Implemented automated data validation and error handling mechanisms\n• Created 15+ interactive dashboard views with drill-down capabilities\n• Developed custom KPI calculations and business metrics\n• Set up automated email reports for key stakeholders\n• Integrated real-time data refresh every 15 minutes`,
      outcomes: `The dashboard became the central hub for business decision-making, leading to significant improvements in operational efficiency. The client reported better inventory management, more targeted marketing campaigns, and improved customer retention strategies. The automated reporting saved 20+ hours per week of manual data compilation.`,
      lessonsLearned: `This project taught me the importance of stakeholder communication and iterative development. Regular feedback sessions were crucial for ensuring the dashboard met actual business needs rather than just technical requirements. I also learned valuable lessons about data quality and the importance of building robust validation systems.`,
      gallery: [
        {
          url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
          caption: "Main dashboard overview"
        },
        {
          url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
          caption: "Sales performance metrics"
        },
        {
          url: "https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?w=400&h=300&fit=crop",
          caption: "Customer segmentation analysis"
        }
      ]
    },
    {
      id: 2,
      title: "Healthcare Patient Management System",
      category: "Full-Stack",
      industry: "Healthcare",
      description: "Full-stack web application streamlining patient management workflows for a multi-specialty clinic, improving operational efficiency and patient experience.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop",
      technologies: ["React", "Node.js", "MongoDB", "Express", "JWT", "Socket.io"],
      metrics: [
        "Reduced appointment scheduling time by 60%",
        "Improved patient satisfaction by 35%",
        "Decreased administrative overhead by 45%",
        "Enhanced data accuracy by 90%"
      ],
      status: "Completed",
      duration: "4 months",
      githubUrl: "https://github.com/saniya/healthcare-management",
      liveUrl: null,
      featured: false,
      challenge: `The clinic was managing patient records, appointments, and billing through a combination of paper forms, Excel spreadsheets, and an outdated legacy system. This led to scheduling conflicts, lost patient information, and significant administrative overhead. Staff spent hours daily on manual data entry and coordination.`,
      solution: `Designed and developed a comprehensive patient management system with role-based access control, real-time appointment scheduling, automated reminders, and integrated billing. The system included patient portals for self-service and staff dashboards for efficient workflow management.`,
      implementation: `• Built responsive React frontend with Material-UI components\n• Developed RESTful API using Node.js and Express\n• Implemented MongoDB database with proper indexing and relationships\n• Added JWT-based authentication and authorization\n• Integrated Socket.io for real-time notifications\n• Created automated email and SMS reminder system`,
      outcomes: `The system transformed clinic operations, eliminating scheduling conflicts and reducing patient wait times. Staff productivity increased significantly, and patient satisfaction scores improved due to better communication and reduced errors. The digital transformation also enabled better compliance with healthcare regulations.`,
      lessonsLearned: `Working in healthcare taught me the critical importance of data security and privacy compliance. I gained deep experience with HIPAA requirements and learned to balance user experience with strict security protocols. The project also highlighted the value of thorough testing in mission-critical applications.`,
      gallery: [
        {
          url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
          caption: "Patient dashboard interface"
        },
        {
          url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop",
          caption: "Appointment scheduling system"
        }
      ]
    },
    {
      id: 3,
      title: "Educational Learning Analytics Platform",
      category: "Data Analytics",
      industry: "Education",
      description: "Advanced analytics platform providing insights into student performance, learning patterns, and curriculum effectiveness for educational institutions.",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop",
      technologies: ["Python", "Django", "Power BI", "MySQL", "Scikit-learn", "Matplotlib"],
      metrics: [
        "Improved student retention by 28%",
        "Enhanced learning outcomes by 22%",
        "Reduced dropout prediction accuracy to 95%",
        "Increased teacher efficiency by 30%"
      ],
      status: "Completed",
      duration: "5 months",
      githubUrl: "https://github.com/saniya/education-analytics",
      liveUrl: "https://demo.education-analytics.com",
      featured: false,
      challenge: `The educational institution had vast amounts of student data but lacked the tools to extract meaningful insights. They couldn't identify at-risk students early, optimize curriculum delivery, or measure the effectiveness of different teaching methods. Decision-making was largely intuitive rather than data-driven.`,
      solution: `Developed a comprehensive learning analytics platform that processes student interaction data, assessment results, and engagement metrics to provide actionable insights. Implemented machine learning models for early intervention and personalized learning recommendations.`,
      implementation: `• Created Django-based web application with role-based dashboards\n• Implemented data pipeline for processing learning management system data\n• Developed machine learning models for student performance prediction\n• Built Power BI integration for advanced visualization\n• Created automated alert system for at-risk students\n• Implemented A/B testing framework for curriculum optimization`,
      outcomes: `The platform enabled proactive student support, leading to significant improvements in retention and learning outcomes. Teachers could identify struggling students weeks earlier and provide targeted interventions. The institution also optimized their curriculum based on data-driven insights about learning effectiveness.`,
      lessonsLearned: `This project deepened my understanding of educational data privacy and the ethical considerations in student analytics. I learned to balance predictive accuracy with fairness and transparency, ensuring that algorithmic decisions supported rather than replaced human judgment in educational contexts.`,
      gallery: [
        {
          url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=300&fit=crop",
          caption: "Student performance analytics"
        },
        {
          url: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&h=300&fit=crop",
          caption: "Learning pattern visualization"
        }
      ]
    },
    {
      id: 4,
      title: "Financial Portfolio Tracker",
      category: "Web Development",
      industry: "Finance",
      description: "Real-time portfolio tracking application with advanced charting, risk analysis, and automated reporting for individual investors and financial advisors.",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop",
      technologies: ["React", "TypeScript", "Chart.js", "Firebase", "Alpha Vantage API"],
      metrics: [
        "Improved investment decision speed by 40%",
        "Enhanced portfolio performance tracking by 100%",
        "Reduced manual reporting time by 80%",
        "Increased user engagement by 65%"
      ],
      status: "In Progress",
      duration: "2 months",
      githubUrl: "https://github.com/saniya/portfolio-tracker",
      liveUrl: "https://demo.portfolio-tracker.com",
      featured: false,
      challenge: `Individual investors and small financial advisors were using spreadsheets and multiple disconnected tools to track portfolio performance. They lacked real-time data, comprehensive risk analysis, and professional-grade reporting capabilities that larger institutions had access to.`,
      solution: `Built a comprehensive portfolio tracking application with real-time market data integration, advanced charting capabilities, risk analysis tools, and automated report generation. The platform provides institutional-grade analytics in a user-friendly interface.`,
      implementation: `• Developed React application with TypeScript for type safety\n• Integrated multiple financial data APIs for real-time pricing\n• Implemented advanced charting with Chart.js and custom components\n• Built Firebase backend for user authentication and data storage\n• Created automated PDF report generation system\n• Added portfolio optimization and risk analysis algorithms`,
      outcomes: `Users reported significant improvements in their investment decision-making process and portfolio performance tracking. The automated reporting feature saved hours of manual work, while the risk analysis tools helped users make more informed investment decisions.`,
      lessonsLearned: `Working with financial data taught me the importance of accuracy, real-time performance, and regulatory compliance. I gained experience with financial APIs, learned about portfolio theory, and developed skills in creating intuitive interfaces for complex financial data.`,
      gallery: [
        {
          url: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=300&fit=crop",
          caption: "Portfolio overview dashboard"
        },
        {
          url: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=300&fit=crop",
          caption: "Risk analysis charts"
        }
      ]
    },
    {
      id: 5,
      title: "Tech Startup CRM System",
      category: "Full-Stack",
      industry: "Technology",
      description: "Custom CRM solution designed for tech startups, featuring lead management, sales pipeline tracking, and automated customer communication workflows.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
      technologies: ["Vue.js", "Laravel", "MySQL", "Redis", "Stripe API", "SendGrid"],
      metrics: [
        "Increased sales conversion by 32%",
        "Improved lead response time by 70%",
        "Enhanced customer retention by 25%",
        "Reduced sales cycle length by 20%"
      ],
      status: "Completed",
      duration: "6 months",
      githubUrl: "https://github.com/saniya/startup-crm",
      liveUrl: null,
      featured: false,
      challenge: `The startup was using a combination of spreadsheets, email, and generic CRM tools that didn't fit their unique sales process. They needed a solution that could handle their rapid growth, complex product offerings, and technical customer base while remaining cost-effective.`,
      solution: `Developed a custom CRM system tailored to tech startup needs, with features like technical lead scoring, integration with development tools, automated follow-up sequences, and detailed analytics on sales performance and customer behavior.`,
      implementation: `• Built Vue.js frontend with responsive design and real-time updates\n• Developed Laravel API with comprehensive business logic\n• Implemented MySQL database with optimized queries and indexing\n• Added Redis caching for improved performance\n• Integrated Stripe for payment processing and SendGrid for email automation\n• Created comprehensive reporting and analytics dashboard`,
      outcomes: `The CRM system became central to the startup's sales operations, enabling them to scale their sales team effectively. The automated workflows and better lead management contributed to significant improvements in conversion rates and customer satisfaction.`,
      lessonsLearned: `This project taught me about the unique needs of fast-growing startups and the importance of building scalable systems. I learned to balance feature richness with simplicity, ensuring the system could grow with the company while remaining user-friendly for non-technical team members.`,
      gallery: [
        {
          url: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=400&h=300&fit=crop",
          caption: "CRM dashboard overview"
        },
        {
          url: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop",
          caption: "Sales pipeline visualization"
        }
      ]
    },
    {
      id: 6,
      title: "Social Media Analytics Tool",
      category: "Data Analytics",
      industry: "Technology",
      description: "Comprehensive social media analytics platform providing insights into engagement patterns, audience demographics, and content performance across multiple platforms.",
      image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800&h=400&fit=crop",
      technologies: ["Python", "Flask", "MongoDB", "D3.js", "Twitter API", "Facebook Graph API"],
      metrics: [
        "Improved content engagement by 45%",
        "Enhanced audience targeting accuracy by 60%",
        "Reduced content creation time by 35%",
        "Increased social media ROI by 50%"
      ],
      status: "Completed",
      duration: "4 months",
      githubUrl: "https://github.com/saniya/social-analytics",
      liveUrl: "https://demo.social-analytics.com",
      featured: false,
      challenge: `Marketing teams were struggling to measure the effectiveness of their social media campaigns across different platforms. They had access to individual platform analytics but lacked a unified view and deeper insights into audience behavior and content performance patterns.`,
      solution: `Created a centralized analytics platform that aggregates data from multiple social media APIs, provides advanced visualization of engagement patterns, and offers AI-powered recommendations for content optimization and audience targeting.`,
      implementation: `• Built Flask-based API for data collection and processing\n• Implemented MongoDB for storing social media data and analytics\n• Created interactive D3.js visualizations for data exploration\n• Integrated multiple social media APIs with rate limiting and error handling\n• Developed machine learning models for content performance prediction\n• Added automated reporting and alert systems`,
      outcomes: `Marketing teams gained unprecedented insights into their social media performance, leading to more effective content strategies and better audience engagement. The platform's recommendations helped optimize posting schedules and content types for maximum impact.`,
      lessonsLearned: `This project enhanced my understanding of API integration challenges and the complexities of social media data. I learned about rate limiting, data privacy considerations, and the importance of creating intuitive visualizations for non-technical users to understand complex data patterns.`,
      gallery: [
        {
          url: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=400&h=300&fit=crop",
          caption: "Social media dashboard"
        },
        {
          url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
          caption: "Engagement analytics visualization"
        }
      ]
    }
    ,
    {
      id: 7,
      title: "DocMeet - Online Doctor Appointment Platform",
      category: "Full-Stack",
      industry: "Healthcare",
      description: "Full-stack appointment system for clinics and patients with role-based dashboards, real-time scheduling, and automated reminders.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop",
      technologies: ["React", "Node.js", "Express", "MongoDB", "JWT", "Socket.io"],
      metrics: [
        "Reduced scheduling time by 60%",
        "Decreased no-shows by 25%",
        "Improved patient satisfaction by 35%",
        "1,000+ bookings per month"
      ],
      status: "Completed",
      duration: "8 weeks",
      githubUrl: "https://github.com/saniya/docmeet",
      liveUrl: null,
      featured: false,
      challenge: `Clinics relied on phone calls and spreadsheets, leading to scheduling conflicts, lost information, and high administrative overhead. Patients struggled with limited booking hours and poor visibility of doctor availability.`,
      solution: `Designed and implemented a responsive platform where patients browse doctors by specialty, check live availability, book slots, and receive automated reminders. Built staff and doctor dashboards with role-based access, audit logs, and secure records management.`,
      implementation: `• React frontend with reusable components and accessibility\n• Node.js/Express REST API with JWT auth and RBAC\n• MongoDB schema for doctors, patients, appointments, and notifications\n• Socket.io for real-time slot updates and admin broadcasting\n• Cron-based email/SMS reminders with configurable templates\n• Deployment with Docker and environment-based configuration`,
      outcomes: `The platform streamlined booking across clinics, reduced administrative work, and significantly improved patient experience. Automated reminders lowered no-shows and doctors gained better visibility into schedules and workload.`,
      lessonsLearned: `Healthcare workflows benefit from clarity and reliability. Building resilient scheduling and notification systems required careful attention to edge cases, timezone handling, and user experience under load.`,
      gallery: [
        { url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop", caption: "Doctor availability and booking" },
        { url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop", caption: "Appointment dashboard" }
      ]
    },
    {
      id: 8,
      title: "HR Analytics Dashboard",
      category: "Data Analytics",
      industry: "Technology",
      description: "Developed an HR analytics dashboard using Power BI, SQL, and Excel to consolidate data from 1,000+ employee records.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
      technologies: ["Power BI", "SQL", "Excel", "Python"],
      metrics: [
        "Achieved 85% accuracy in predictive models",
        "Reduced manual processing time by 50%",
        "Improved decision-making efficiency by 30%",
        "Unified 1,000+ employee records"
      ],
      status: "Completed",
      duration: "6 weeks",
      githubUrl: "https://github.com/saniya/hr-analytics-dashboard",
      liveUrl: null,
      featured: false,
      challenge: `HR data was scattered across spreadsheets and siloed systems, making it difficult to analyze attrition, performance, and hiring trends. Manual reporting took hours and insights arrived too late for decisions.`,
      solution: `Built an ETL process to consolidate records into SQL, automated data quality checks, and designed Power BI dashboards for attrition risk, performance distribution, hiring pipeline health, and diversity metrics.`,
      implementation: `• SQL-based warehouse schema for employees, roles, compensation, and performance\n• Excel connectors and scheduled imports with validation\n• Power BI dashboards with drill-through and row-level security\n• Predictive models for attrition and performance using Python\n• KPI cards, interactive filters, and executive summary reports`,
      outcomes: `HR teams reduced manual reporting by half and used accurate predictive signals to plan interventions. Leaders saw clearer trends and made faster, data-backed decisions.`,
      lessonsLearned: `Balancing usability with rigor is key. Data freshness, security, and trust in metrics matter as much as model accuracy.`,
      gallery: [
        { url: "https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?w=400&h=300&fit=crop", caption: "Attrition risk overview" },
        { url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop", caption: "Power BI dashboard tiles" }
      ]
    },
    {
      id: 9,
      title: "DataHorizon with AI - Full-Stack Data Analysis",
      category: "Full-Stack",
      industry: "Technology",
      description: "End-to-end platform that unifies data ingestion, AI model training, and real-time visualization for business users.",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=400&fit=crop",
      technologies: ["React", "FastAPI", "PostgreSQL", "TensorFlow", "Docker", "Redis"],
      metrics: [
        "2× faster analytics cycles",
        "90% forecast accuracy",
        "Real-time dashboards and alerting",
        "Reusable pipelines with feature store"
      ],
      status: "Completed",
      duration: "3 months",
      githubUrl: "https://github.com/saniya/datahorizon-ai",
      liveUrl: null,
      featured: false,
      challenge: `Multiple teams maintained separate pipelines and manual reports, causing delays and inconsistent metrics across the organization.`,
      solution: `Standardized ingestion, centralized model training and registry, and built dashboards with role-based views. Added alerting and batch/stream processing to support near real-time insights.`,
      implementation: `• FastAPI microservices for ingestion and serving\n• PostgreSQL warehouse with dimensional models\n• TensorFlow training jobs with experiment tracking\n• React dashboards with component library and charts\n• Docker-based deployments and CI/CD\n• Redis caching and background workers for throughput`,
      outcomes: `Teams cut analysis time in half and gained consistent KPIs. Forecasting models supported planning with high accuracy, and dashboards provided timely insight for decisions.`,
      lessonsLearned: `Good developer ergonomics speed delivery. Investing in component libraries, pipeline templates, and observability pays dividends.`,
      gallery: [
        { url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop", caption: "Unified analytics overview" },
        { url: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=300&fit=crop", caption: "Forecast visualization" }
      ]
    }
  ];

  // Filter projects based on active filters
  const filteredProjects = projects?.filter(project => {
    const categoryMatch = activeCategory === 'all' || project?.category === activeCategory;
    const industryMatch = activeIndustry === 'all' || project?.industry === activeIndustry;
    const technologyMatch = activeTechnology === 'all' || project?.technologies?.includes(activeTechnology);
    
    return categoryMatch && industryMatch && technologyMatch;
  });

  // Sort projects
  const sortedProjects = [...filteredProjects]?.sort((a, b) => {
    switch (sortBy) {
      case 'featured':
        return b?.featured - a?.featured;
      case 'recent':
        return b?.id - a?.id;
      case 'category':
        return a?.category?.localeCompare(b?.category);
      default:
        return 0;
    }
  });

  // Get featured project
  const featuredProject = projects?.find(p => p?.featured);

  // Calculate project counts for filters
  const projectCounts = {
    all: projects?.length,
    'Data Analytics': projects?.filter(p => p?.category === 'Data Analytics')?.length,
    'Web Development': projects?.filter(p => p?.category === 'Web Development')?.length,
    'Full-Stack': projects?.filter(p => p?.category === 'Full-Stack')?.length
  };

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const handleClearFilters = () => {
    setActiveCategory('all');
    setActiveIndustry('all');
    setActiveTechnology('all');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-transparent">
      <Helmet>
        <title>Project Case Studies & Portfolio - Saniya | Data Storyteller</title>
        <meta name="description" content="Explore Saniya's comprehensive project portfolio featuring data analytics dashboards, full-stack web applications, and detailed case studies with measurable business impact." />
        <meta name="keywords" content="project portfolio, case studies, data analytics, web development, full-stack developer, business impact" />
      </Helmet>
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-brand text-white py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <div className="flex items-center justify-center space-x-2 mb-6">
                <Icon name="FolderOpen" size={32} className="text-accent" />
                <span className="px-4 py-2 bg-white bg-opacity-20 rounded-full text-sm font-medium">
                  Project Portfolio
                </span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Case Studies &
                <span className="text-accent"> Portfolio</span>
              </h1>
              <p className="text-xl lg:text-2xl opacity-90 mb-8 leading-relaxed">
                Detailed project narratives showcasing technical expertise, problem-solving approach, 
                and measurable business impact across data analytics and full-stack development.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Button
                  variant="secondary"
                  size="lg"
                  iconName="Eye"
                  iconPosition="left"
                  onClick={() => document.getElementById('featured-project')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View Featured Project
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  iconName="Filter"
                  iconPosition="left"
                  onClick={() => document.getElementById('project-filters')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-white bg-opacity-20 border-white border-opacity-30 text-white hover:bg-white hover:bg-opacity-30"
                >
                  Browse All Projects
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Project Statistics */}
        <section className="py-16 bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 glass-section rounded-3xl p-6">
            <ProjectStats projects={projects} />
          </div>
        </section>

        {/* Featured Project */}
        {featuredProject && (
          <section id="featured-project" className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 glass-section rounded-3xl p-6">
              <FeaturedProject 
                project={featuredProject} 
                onViewDetails={handleViewDetails}
              />
            </div>
          </section>
        )}

        {/* Project Filters */}
        <section id="project-filters" className="py-16 bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 glass-section rounded-3xl p-6">
            <ProjectFilter
              activeCategory={activeCategory}
              activeIndustry={activeIndustry}
              activeTechnology={activeTechnology}
              onCategoryChange={setActiveCategory}
              onIndustryChange={setActiveIndustry}
              onTechnologyChange={setActiveTechnology}
              onClearFilters={handleClearFilters}
              projectCounts={projectCounts}
            />

            {/* Sort Options */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <h2 className="text-2xl font-bold text-text-primary">
                  All Projects
                </h2>
                <span className="px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium">
                  {sortedProjects?.length} {sortedProjects?.length === 1 ? 'project' : 'projects'}
                </span>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className="text-sm text-text-secondary">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e?.target?.value)}
                  className="px-3 py-2 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="featured">Featured First</option>
                  <option value="recent">Most Recent</option>
                  <option value="category">Category</option>
                </select>
              </div>
            </div>

            {/* Projects Grid */}
            {sortedProjects?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedProjects?.map((project) => (
                  <ProjectCard
                    key={project?.id}
                    project={project}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Icon name="Search" size={48} className="text-text-secondary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  No projects found
                </h3>
                <p className="text-text-secondary mb-6">
                  Try adjusting your filters to see more projects.
                </p>
                <Button
                  variant="outline"
                  onClick={handleClearFilters}
                  iconName="RotateCcw"
                  iconPosition="left"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 sm:py-20 bg-gradient-brand text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Icon name="MessageCircle" size={48} className="text-accent mx-auto mb-6" />
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Ready to Start Your Next Project?
            </h2>
            <p className="text-xl opacity-90 mb-8 leading-relaxed">
              Let's discuss how I can help bring your data analytics or web development 
              vision to life with the same attention to detail and business impact.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button
                variant="secondary"
                size="lg"
                iconName="Calendar"
                iconPosition="left"
                onClick={() => window.open('mailto:saniya@example.com?subject=Project Collaboration Inquiry', '_blank')}
              >
                Schedule a Discussion
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="Download"
                iconPosition="left"
                onClick={() => window.open('/assets/images/resume.pdf', '_blank')}
                className="bg-white bg-opacity-20 border-white border-opacity-30 text-white hover:bg-white hover:bg-opacity-30"
              >
                Download Resume
              </Button>
            </div>
          </div>
        </section>
      </main>
      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default ProjectCaseStudiesPortfolio;

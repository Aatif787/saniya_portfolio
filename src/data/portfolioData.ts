export const portfolioData = {
  name: "Saniya Dhada",
  role: "Data Storyteller & Developer",
  labels: {
    heroKicker: "NEURAL_IDENTITY",
    aboutTitle: "About",
    skillsTitle: "Technical Expertise",
    skillsSubtitle:
      "A comprehensive skill set spanning data analytics, web development, and modern tools. Hover over skills to see proficiency levels and project experience.",
    projectsTitle: "Featured Projects",
    projectsSubtitle:
      "Real-world solutions that demonstrate the intersection of data analytics and web development.",
    contactTitle: "Get in Touch",
    contactSubtitle: "Secure channel open",
    contactMeta: {
      channel: "Channel",
      status: "Status",
      reach: "Reach"
    },
    contactForm: {
      namePlaceholder: "Your name",
      emailPlaceholder: "Your email",
      messagePlaceholder: "Your message",
      sendLabel: "Send to Saniya",
      success: "Message sent successfully",
      failure: "Failed to send message",
      network: "Network error"
    },
    boot: {
      logs: [
        "Initiating Neural Identity Scan...",
        "Syncing Developer Profile...",
        "Loading Cyber Assets...",
        "Establishing Secure Interface...",
        "Access Granted."
      ],
      progressLabel: "Loading Interface Assets"
    },
    hud: {
      status: "SYS_STATUS: OPTIMAL",
      identity: "NEURAL_ID: SANIYA_v2"
    },
    projectMeta: {
      prefix: "PROJECT_0",
      cta: "INIT_SEQUENCE >>"
    },
    robot: {
      line1: "Companion_AI // Online",
      line2: "Awaiting Commands..."
    }
  },
  about:
    "BCA graduate specializing in data analytics and full-stack development. I bridge the gap between complex data insights and user-friendly solutions.",
  stats: [
    "15+ Projects Completed",
    "50,000+ Data Points Analyzed",
    "3+ Years Learning Journey",
    "100% Client Satisfaction"
  ],
  skills: [
    {
      title: "Data Analytics",
      icon: "BarChart3",
      color: "bg-blue-500",
      skills: [
        { name: "Python", level: 90, projects: 12, icon: "Code" },
        { name: "SQL", level: 85, projects: 15, icon: "Database" },
        { name: "Tableau", level: 80, projects: 8, icon: "PieChart" },
        { name: "Excel", level: 95, projects: 20, icon: "FileSpreadsheet" }
      ]
    },
    {
      title: "Web Development",
      icon: "Code",
      color: "bg-green-500",
      skills: [
        { name: "React", level: 88, projects: 10, icon: "Zap" },
        { name: "JavaScript", level: 85, projects: 14, icon: "Braces" },
        { name: "Node.js", level: 75, projects: 6, icon: "Server" },
        { name: "HTML/CSS", level: 92, projects: 18, icon: "Layout" }
      ]
    },
    {
      title: "Tools & Platforms",
      icon: "Settings",
      color: "bg-purple-500",
      skills: [
        { name: "Git", level: 80, projects: 16, icon: "GitBranch" },
        { name: "AWS", level: 70, projects: 4, icon: "Cloud" },
        { name: "MongoDB", level: 75, projects: 7, icon: "Database" },
        { name: "Figma", level: 85, projects: 9, icon: "Palette" }
      ]
    }
  ],
  projects: [
    {
      id: 1,
      title: "DocMeet - Online Doctor Appointment Platform",
      category: "Full-Stack",
      problem:
        "Clinics and patients relied on phone calls and spreadsheets, causing scheduling conflicts and no-shows.",
      solution:
        "Responsive web app to browse doctors, book slots, receive automated reminders, with role-based dashboards for staff and doctors.",
      status: "Completed",
      outcome:
        "Reduced scheduling time by 60%, improved patient satisfaction by 35%, and decreased no-shows by 25%.",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop",
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
      problem:
        "HR teams lacked consolidated insight across 1,000+ employee records for attrition, performance, and hiring decisions.",
      solution:
        "Developed Power BI dashboards fed by SQL and Excel ETL; built predictive models for attrition and performance.",
      status: "Completed",
      outcome:
        "Achieved 85% model accuracy, reduced manual processing by 50%, and improved decision-making efficiency by 30%.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
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
      problem:
        "Organizations struggled with fragmented data pipelines and slow manual reporting across teams.",
      solution:
        "Unified platform for ingestion, model training, and real-time dashboards with AI-assisted insights and feature store.",
      status: "Completed",
      outcome:
        "Delivered 2× faster analytics cycles and 90% forecast accuracy with automated, repeatable pipelines.",
      image:
        "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&h=400&fit=crop",
      technologies: ["React", "FastAPI", "PostgreSQL", "TensorFlow", "Docker"],
      metrics: {
        speed: "2× Faster Insights",
        accuracy: "90% Forecast Accuracy",
        timeline: "12 Weeks"
      },
      link: "/project-case-studies-portfolio"
    },
    {
      id: 4,
      title: "FinTech Transaction Analyzer",
      category: "Data Analytics",
      problem: "High volume of fraudulent transactions passing through undetected.",
      solution: "Implemented machine learning models in Python to detect anomalies in real-time.",
      status: "Completed",
      outcome: "Reduced fraud by 40% and saved $2M annually in chargebacks.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      technologies: ["Python", "Scikit-Learn", "Pandas", "AWS"],
      metrics: {
        impact: "40% Fraud Reduction",
        savings: "$2M Saved",
        timeline: "10 Weeks"
      },
      link: "/project-case-studies-portfolio"
    },
    {
      id: 5,
      title: "E-Commerce Recommendation Engine",
      category: "Full-Stack",
      problem: "Low user engagement and average order value due to poor product discovery.",
      solution: "Built a collaborative filtering engine and integrated it into the Node.js backend.",
      status: "Completed",
      outcome: "Increased average order value by 22% over 3 months.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      technologies: ["Node.js", "Python", "React", "MongoDB"],
      metrics: {
        growth: "22% AOV Increase",
        engagement: "35% More Clicks",
        timeline: "14 Weeks"
      },
      link: "/project-case-studies-portfolio"
    },
    {
      id: 6,
      title: "Supply Chain Dashboard",
      category: "Data Analytics",
      problem: "Lack of visibility into international shipping delays.",
      solution: "Created an interactive Tableau dashboard linking live ERP data via SQL views.",
      status: "Completed",
      outcome: "Decreased inventory stockouts by 18%.",
      image: "https://images.unsplash.com/photo-1586528116311-ad8ed7c15902?w=600&h=400&fit=crop",
      technologies: ["Tableau", "SQL", "ERP API"],
      metrics: {
        efficiency: "18% Stockout Drop",
        visibility: "Real-time updates",
        timeline: "6 Weeks"
      },
      link: "/project-case-studies-portfolio"
    },
    {
      id: 7,
      title: "SaaS User Analytics Portal",
      category: "Web Development",
      problem: "Clients had no insight into their own platform usage.",
      solution: "Developed a stunning React dashboard tracking user metrics and API consumption.",
      status: "Completed",
      outcome: "Boosted premium tier upgrades by 15%.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      technologies: ["React", "Chart.js", "Express", "PostgreSQL"],
      metrics: {
        revenue: "15% Upgrades",
        usage: "10k+ Daily Views",
        timeline: "8 Weeks"
      },
      link: "/project-case-studies-portfolio"
    },
    {
      id: 8,
      title: "Real Estate Price Predictor",
      category: "Data Analytics",
      problem: "Agents guessing listing prices led to longer times on market.",
      solution: "Trained an XGBoost model on 10 years of housing data and deployed via Flask.",
      status: "Completed",
      outcome: "Reduced average time on market by 12 days.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
      technologies: ["Python", "XGBoost", "Flask", "React"],
      metrics: {
        speed: "12 Days Faster Sale",
        accuracy: "94% Price Accuracy",
        timeline: "9 Weeks"
      },
      link: "/project-case-studies-portfolio"
    },
    {
      id: 9,
      title: "Healthcare Patient Flow Optimizer",
      category: "Full-Stack",
      problem: "Long hospital wait times during peak hours.",
      solution: "Analyzed historical admission data to predict surges and built a staff allocation app.",
      status: "In Progress",
      outcome: "Wait times decreased by 20% on average.",
      image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&h=400&fit=crop",
      technologies: ["React", "Node.js", "Python", "SQL"],
      metrics: {
        impact: "20% Less Wait Time",
        accuracy: "Hourly Predictions",
        timeline: "16 Weeks"
      },
      link: "/project-case-studies-portfolio"
    }
  ],
  contact: {
    email: "saniyadhada71@gmail.com",
    phone: "+91 88649 31247",
    availability: "Available for freelance",
    location: "Remote & On-site"
  }
};

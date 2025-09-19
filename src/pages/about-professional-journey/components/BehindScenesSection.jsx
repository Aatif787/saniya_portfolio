import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const BehindScenesSection = () => {
  const [activeTab, setActiveTab] = useState('learning');

  const learningJourney = [
    {
      challenge: "Understanding Complex Algorithms",
      solution: "Break down into smaller components and visualize each step",
      outcome: "Mastered machine learning concepts by building from first principles",
      timeframe: "3 months"
    },
    {
      challenge: "Bridging Technical and Business Domains",
      solution: "Spent time with business stakeholders to understand their language",
      outcome: "Became fluent in translating technical insights to business value",
      timeframe: "6 months"
    },
    {
      challenge: "Scaling Data Processing",
      solution: "Learned cloud architectures and distributed computing patterns",
      outcome: "Built systems handling millions of records efficiently",
      timeframe: "4 months"
    }
  ];

  const dailyRoutine = [
    { time: "6:00 AM", activity: "Morning reading - Industry blogs and research papers", icon: "BookOpen" },
    { time: "7:30 AM", activity: "Exercise and mindfulness - Clear thinking starts with clear mind", icon: "Heart" },
    { time: "9:00 AM", activity: "Deep work - Complex analysis and development tasks", icon: "Brain" },
    { time: "12:00 PM", activity: "Collaboration time - Team meetings and stakeholder discussions", icon: "Users" },
    { time: "3:00 PM", activity: "Learning block - New technologies and skill development", icon: "Lightbulb" },
    { time: "5:00 PM", activity: "Documentation and knowledge sharing", icon: "FileText" },
    { time: "7:00 PM", activity: "Personal projects and experimentation", icon: "Sparkles" }
  ];

  const toolsAndSetup = [
    {
      category: "Development Environment",
      tools: ["VS Code with custom extensions", "iTerm2 with Oh My Zsh", "Docker for containerization"],
      description: "Optimized for productivity and seamless workflow"
    },
    {
      category: "Data Analysis Stack",
      tools: ["Python (Pandas, NumPy, Scikit-learn)", "R for statistical analysis", "Tableau for visualization"],
      description: "Comprehensive toolkit for end-to-end data science"
    },
    {
      category: "Design and Prototyping",
      tools: ["Figma for UI/UX design", "Notion for documentation", "Miro for collaborative thinking"],
      description: "Bridging design thinking with technical implementation"
    },
    {
      category: "Productivity System",
      tools: ["Time-blocking calendar", "Pomodoro technique", "Regular reflection sessions"],
      description: "Maintaining focus and continuous improvement"
    }
  ];

  const personalValues = [
    {
      value: "Continuous Growth",
      description: "Every project is an opportunity to learn something new",
      example: "I dedicate 20% of my time to exploring emerging technologies and methodologies",
      icon: "TrendingUp"
    },
    {
      value: "Collaborative Spirit",
      description: "The best solutions emerge from diverse perspectives",
      example: "I actively seek feedback and enjoy pair programming sessions with colleagues",
      icon: "Users"
    },
    {
      value: "Quality Over Speed",
      description: "Sustainable solutions require thoughtful architecture",
      example: "I write comprehensive tests and documentation, even under tight deadlines",
      icon: "Shield"
    },
    {
      value: "User Empathy",
      description: "Technology should serve people, not the other way around",
      example: "I conduct user interviews before designing any data dashboard or application",
      icon: "Heart"
    }
  ];

  const tabs = [
    { id: 'learning', label: 'Learning Process', icon: 'BookOpen' },
    { id: 'routine', label: 'Daily Routine', icon: 'Clock' },
    { id: 'tools', label: 'Tools & Setup', icon: 'Settings' },
    { id: 'values', label: 'Personal Values', icon: 'Compass' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'learning':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-primary mb-4">How I Tackle Complex Challenges</h3>
            {learningJourney?.map((item, index) => (
              <div key={index} className="bg-surface rounded-lg p-6 shadow-brand">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Challenge</h4>
                    <p className="text-text-secondary text-sm">{item?.challenge}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-secondary mb-2">My Approach</h4>
                    <p className="text-text-secondary text-sm">{item?.solution}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-accent mb-2">Outcome</h4>
                    <p className="text-text-secondary text-sm">{item?.outcome}</p>
                    <span className="inline-block mt-2 px-2 py-1 bg-muted text-xs rounded-full">
                      {item?.timeframe}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'routine':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-primary mb-4">A Day in My Life</h3>
            <div className="space-y-4">
              {dailyRoutine?.map((item, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-surface rounded-lg">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={item?.icon} size={20} color="var(--color-primary)" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-1">
                      <span className="font-mono text-sm text-accent">{item?.time}</span>
                      <div className="h-px bg-border flex-1"></div>
                    </div>
                    <p className="text-text-secondary">{item?.activity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'tools':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-primary mb-4">My Digital Workspace</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {toolsAndSetup?.map((category, index) => (
                <div key={index} className="bg-surface rounded-lg p-6 shadow-brand">
                  <h4 className="font-semibold text-primary mb-3">{category?.category}</h4>
                  <p className="text-text-secondary text-sm mb-4">{category?.description}</p>
                  <div className="space-y-2">
                    {category?.tools?.map((tool, toolIndex) => (
                      <div key={toolIndex} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        <span className="text-text-secondary text-sm">{tool}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'values':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-primary mb-4">What Drives Me</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {personalValues?.map((item, index) => (
                <div key={index} className="bg-surface rounded-lg p-6 shadow-brand">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name={item?.icon} size={24} color="var(--color-primary)" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-primary mb-2">{item?.value}</h4>
                      <p className="text-text-secondary text-sm mb-3">{item?.description}</p>
                      <div className="bg-muted p-3 rounded-lg">
                        <p className="text-xs text-text-secondary italic">
                          <strong>In practice:</strong> {item?.example}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
            Behind the Scenes
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            The learning process, daily habits, and personal values that shape my approach to work and life
          </p>
        </div>

        {/* Workspace Image */}
        <div className="mb-16">
          <div className="relative rounded-2xl overflow-hidden shadow-brand-xl">
            <Image
              src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="Saniya's workspace showing dual monitors with data visualizations and code"
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-2xl font-bold mb-2">My Creative Space</h3>
              <p className="text-white/90">Where data meets design and ideas come to life</p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === tab?.id
                  ? 'bg-primary text-primary-foreground shadow-brand'
                  : 'bg-surface text-text-secondary hover:text-primary hover:bg-muted'
              }`}
            >
              <Icon name={tab?.icon} size={18} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">
          {renderTabContent()}
        </div>

        {/* Growth Mindset Quote */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 lg:p-12">
            <blockquote className="text-2xl lg:text-3xl font-bold text-primary mb-4">
              "Every challenge is a chance to grow, every project is a chance to learn, 
              and every collaboration is a chance to make something better together."
            </blockquote>
            <cite className="text-text-secondary">— My approach to professional growth</cite>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BehindScenesSection;
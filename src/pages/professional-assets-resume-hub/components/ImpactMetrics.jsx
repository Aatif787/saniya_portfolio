import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const ImpactMetrics = () => {
  const [animatedValues, setAnimatedValues] = useState({});

  const metrics = [
    {
      id: 'projects',
      title: 'Projects Completed',
      value: 24,
      suffix: '+',
      description: 'Successful project deliveries across web development and data analysis',
      icon: 'FolderCheck',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      growth: '+15% this year'
    },
    {
      id: 'technologies',
      title: 'Technologies Mastered',
      value: 18,
      suffix: '',
      description: 'Programming languages, frameworks, and tools in active use',
      icon: 'Code',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      growth: '+6 new skills'
    },
    {
      id: 'problems',
      title: 'Problems Solved',
      value: 156,
      suffix: '+',
      description: 'Complex technical and analytical challenges addressed',
      icon: 'Lightbulb',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      growth: '+45 this quarter'
    },
    {
      id: 'impact',
      title: 'Business Impact',
      value: 40,
      suffix: '%',
      description: 'Average improvement in efficiency through data-driven solutions',
      icon: 'TrendingUp',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      growth: 'Consistent growth'
    }
  ];

  const skillProgression = [
    {
      category: 'Data Analysis',
      skills: [
        { name: 'Python', level: 90, growth: '+15%' },
        { name: 'SQL', level: 85, growth: '+10%' },
        { name: 'Tableau', level: 80, growth: '+20%' },
        { name: 'Excel', level: 95, growth: '+5%' }
      ]
    },
    {
      category: 'Web Development',
      skills: [
        { name: 'React', level: 88, growth: '+18%' },
        { name: 'JavaScript', level: 92, growth: '+12%' },
        { name: 'Node.js', level: 75, growth: '+25%' },
        { name: 'CSS/Tailwind', level: 90, growth: '+8%' }
      ]
    },
    {
      category: 'Tools & Platforms',
      skills: [
        { name: 'Git/GitHub', level: 85, growth: '+10%' },
        { name: 'AWS', level: 70, growth: '+30%' },
        { name: 'Docker', level: 65, growth: '+35%' },
        { name: 'Figma', level: 80, growth: '+15%' }
      ]
    }
  ];

  const achievements = [
    {
      year: '2024',
      title: 'Hackathon Winner',
      description: 'First place in Data Innovation Challenge at TechFest Delhi',
      impact: 'Recognition for innovative data visualization solution'
    },
    {
      year: '2024',
      title: 'BCA Graduate',
      description: 'Completed Bachelor of Computer Applications with First Class Distinction',
      impact: 'Strong foundation in computer science and programming'
    },
    {
      year: '2023',
      title: 'Internship Excellence',
      description: 'Outstanding performance during summer internship at TechCorp',
      impact: 'Built analytics dashboard improving decision-making by 40%'
    },
    {
      year: '2023',
      title: 'Certification Achievement',
      description: 'Completed Google Data Analytics Professional Certificate',
      impact: 'Enhanced data analysis and visualization skills'
    }
  ];

  useEffect(() => {
    // Animate counter values
    const animateCounters = () => {
      metrics?.forEach(metric => {
        let current = 0;
        const increment = metric?.value / 50; // 50 steps for smooth animation
        const timer = setInterval(() => {
          current += increment;
          if (current >= metric?.value) {
            current = metric?.value;
            clearInterval(timer);
          }
          setAnimatedValues(prev => ({
            ...prev,
            [metric?.id]: Math.floor(current)
          }));
        }, 30);
      });
    };

    const timer = setTimeout(animateCounters, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="bg-surface rounded-xl p-6 shadow-brand">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-primary mb-2">Impact Metrics</h3>
            <p className="text-text-secondary">Quantified professional achievements and growth</p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-text-muted">
            <Icon name="BarChart3" size={16} />
            <span>Updated Dec 2024</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics?.map((metric) => (
            <div
              key={metric?.id}
              className="relative p-6 border border-border rounded-lg hover:border-primary/50 transition-all duration-200 hover-lift group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${metric?.bgColor}`}>
                  <Icon name={metric?.icon} size={24} className={metric?.color} />
                </div>
                <div className="text-xs text-text-muted bg-muted px-2 py-1 rounded">
                  {metric?.growth}
                </div>
              </div>

              <div className="mb-2">
                <div className="text-3xl font-bold text-primary mb-1">
                  {animatedValues?.[metric?.id] || 0}{metric?.suffix}
                </div>
                <h4 className="font-semibold text-primary text-sm">{metric?.title}</h4>
              </div>

              <p className="text-xs text-text-secondary leading-relaxed">
                {metric?.description}
              </p>

              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
      {/* Skill Progression */}
      <div className="bg-surface rounded-xl p-6 shadow-brand">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-primary mb-2">Skill Progression</h3>
            <p className="text-text-secondary">Technical competency levels and recent growth</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {skillProgression?.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-4">
              <h4 className="font-semibold text-primary border-b border-border pb-2">
                {category?.category}
              </h4>
              
              <div className="space-y-3">
                {category?.skills?.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-primary">{skill?.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-accent">{skill?.growth}</span>
                        <span className="text-sm text-text-muted">{skill?.level}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill?.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Professional Growth Timeline */}
      <div className="bg-surface rounded-xl p-6 shadow-brand">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-primary mb-2">Growth Timeline</h3>
            <p className="text-text-secondary">Key milestones and achievements</p>
          </div>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>
          
          <div className="space-y-6">
            {achievements?.map((achievement, index) => (
              <div key={index} className="relative flex items-start space-x-6">
                {/* Timeline dot */}
                <div className="relative z-10 flex items-center justify-center w-16 h-16 bg-primary rounded-full text-white font-bold">
                  {achievement?.year}
                </div>
                
                {/* Achievement content */}
                <div className="flex-1 pb-6">
                  <div className="bg-muted rounded-lg p-4">
                    <h4 className="font-semibold text-primary mb-1">{achievement?.title}</h4>
                    <p className="text-sm text-text-secondary mb-2">{achievement?.description}</p>
                    <div className="flex items-start space-x-2">
                      <Icon name="Target" size={14} className="text-accent mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-text-muted">{achievement?.impact}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Future Goals */}
      <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-6 border border-primary/10">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-primary rounded-lg">
            <Icon name="Rocket" size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-primary">Future Trajectory</h3>
            <p className="text-text-secondary">Goals and aspirations for continued growth</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">2025</div>
            <div className="text-sm text-text-secondary">Senior Analyst Role</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">5+</div>
            <div className="text-sm text-text-secondary">New Certifications</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">50+</div>
            <div className="text-sm text-text-secondary">Projects Target</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactMetrics;
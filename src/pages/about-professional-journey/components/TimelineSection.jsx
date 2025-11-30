import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const TimelineSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const timelineData = [
    {
      year: "2023",
      title: "BCA Foundation",
      subtitle: "Bachelor of Computer Applications",
      description: `Started my journey in computer applications with a strong foundation in programming fundamentals, database management, and software development principles.\n\nKey achievements: Graduated with distinction, led multiple group projects, and developed my first web application as a final year project.`,
      icon: "GraduationCap",
      color: "bg-primary",
      skills: ["Java", "Database Design", "Web Development", "Project Management"]
    },
    {
      year: "2023",
      title: "First Data Project",
      subtitle: "Sales Analytics Dashboard",
      description: `Developed my first comprehensive data analytics project - a sales performance dashboard for a local retail business.\n\nThis project sparked my passion for data storytelling and showed me the power of transforming raw numbers into actionable insights.`,
      icon: "BarChart3",
      color: "bg-secondary",
      skills: ["Excel", "Data Visualization", "SQL", "Business Intelligence"]
    },
    {
      year: "2023",
      title: "Full-Stack Development",
      subtitle: "Expanding Technical Horizons",
      description: `Mastered modern web development technologies including React, Node.js, and cloud platforms.\n\nBuilt several full-stack applications that combined my analytical skills with user-centric design principles.`,
      icon: "Code",
      color: "bg-accent",
      skills: ["React", "Node.js", "MongoDB", "AWS", "API Development"]
    },
    {
      year: "2024",
      title: "Data Storyteller",
      subtitle: "Professional Recognition",
      description: `Established myself as a 'Data Storyteller' - someone who bridges the gap between complex analytics and clear business insights.\n\nCompleted advanced certifications in data science and began mentoring junior developers.`,
      icon: "TrendingUp",
      color: "bg-primary",
      skills: ["Python", "Machine Learning", "Tableau", "Statistical Analysis"]
    },
    {
      year: "2025",
      title: "Digital Craftsperson",
      subtitle: "Current Focus",
      description: `Currently focused on creating digital experiences that combine analytical precision with user empathy.\n\nWorking on innovative projects that demonstrate the intersection of data science and user experience design.`,
      icon: "Sparkles",
      color: "bg-secondary",
      skills: ["UX Research", "Advanced Analytics", "Team Leadership", "Strategic Planning"]
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-4">
            My Professional Journey
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            From BCA graduate to Data Storyteller - a timeline of growth, learning, and meaningful achievements
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-0.5 bg-border transform lg:-translate-x-0.5"></div>

          <div className="space-y-12">
            {timelineData?.map((item, index) => (
              <div
                key={index}
                className={`relative flex flex-col lg:flex-row items-start lg:items-center gap-8 cursor-pointer transition-all duration-300 ${
                  activeIndex === index ? 'opacity-100' : 'opacity-70 hover:opacity-90'
                }`}
                onClick={() => setActiveIndex(index)}
              >
                {/* Timeline Node */}
                <div className={`absolute left-6 lg:left-1/2 w-4 h-4 rounded-full border-4 border-surface transform lg:-translate-x-1/2 ${item?.color}`}></div>

                {/* Content */}
                <div className={`w-full lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-16' : 'lg:pl-16 lg:ml-auto'}`}>
                  <div className={`bg-background rounded-xl p-6 shadow-brand hover-lift ml-16 lg:ml-0 ${
                    activeIndex === index ? 'ring-2 ring-primary/20' : ''
                  }`}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${item?.color}`}>
                        <Icon name={item?.icon} size={24} color="white" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-accent">{item?.year}</div>
                        <h3 className="text-xl font-bold text-primary">{item?.title}</h3>
                        <p className="text-sm text-text-secondary">{item?.subtitle}</p>
                      </div>
                    </div>

                    <p className="text-text-secondary mb-4 whitespace-pre-line">
                      {item?.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {item?.skills?.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-3 py-1 bg-muted text-text-secondary text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-12 space-x-2">
          {timelineData?.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeIndex === index ? 'bg-primary' : 'bg-border hover:bg-primary/50'
              }`}
              aria-label={`Go to timeline item ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;

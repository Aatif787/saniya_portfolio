import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const SkillsPreview = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const skillCategories = [
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
  ];

  return (
    <section className="py-20 bg-surface">
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
            Technical Expertise
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            A comprehensive skill set spanning data analytics, web development, and modern tools. 
            Hover over skills to see proficiency levels and project experience.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories?.map((category, categoryIndex) => (
            <motion.div
              key={category?.title}
              className="bg-background border border-border rounded-xl p-6 shadow-brand hover-lift"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Category Header */}
              <div className="flex items-center space-x-3 mb-6">
                <div className={`w-10 h-10 ${category?.color} rounded-lg flex items-center justify-center`}>
                  <Icon name={category?.icon} size={20} color="white" />
                </div>
                <h3 className="text-xl font-semibold text-primary">{category?.title}</h3>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {category?.skills?.map((skill, skillIndex) => (
                  <motion.div
                    key={skill?.name}
                    className="relative"
                    onMouseEnter={() => setHoveredSkill(`${categoryIndex}-${skillIndex}`)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Icon name={skill?.icon} size={16} className="text-text-secondary" />
                        <span className="font-medium text-text-primary">{skill?.name}</span>
                      </div>
                      <span className="text-sm text-text-secondary font-mono">
                        {skill?.level}%
                      </span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <motion.div
                        className={`h-full ${category?.color} rounded-full`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill?.level}%` }}
                        transition={{ duration: 1, delay: categoryIndex * 0.1 + skillIndex * 0.1 }}
                        viewport={{ once: true }}
                      />
                    </div>

                    {/* Hover Tooltip */}
                    {hoveredSkill === `${categoryIndex}-${skillIndex}` && (
                      <motion.div
                        className="absolute top-full left-0 mt-2 bg-primary text-primary-foreground rounded-lg p-3 shadow-brand-lg z-10 min-w-max"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-center space-x-2">
                          <Icon name="Briefcase" size={14} />
                          <span className="text-sm font-medium">
                            {skill?.projects} projects completed
                          </span>
                        </div>
                        <div className="absolute -top-1 left-4 w-2 h-2 bg-primary transform rotate-45"></div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-text-secondary mb-4">
            Want to see these skills in action?
          </p>
          <motion.a
            href="/skills-interactive-capabilities"
            className="inline-flex items-center space-x-2 text-primary hover:text-secondary transition-colors duration-200 font-medium"
            whileHover={{ x: 5 }}
          >
            <span>Explore Interactive Demos</span>
            <Icon name="ArrowRight" size={16} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsPreview;
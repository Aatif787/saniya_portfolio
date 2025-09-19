import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SkillCard = ({ skill, onDemoClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getProficiencyColor = (level) => {
    switch (level) {
      case 'Expert': return 'bg-green-500';
      case 'Advanced': return 'bg-blue-500';
      case 'Intermediate': return 'bg-yellow-500';
      default: return 'bg-gray-400';
    }
  };

  const getProficiencyWidth = (level) => {
    switch (level) {
      case 'Expert': return 'w-full';
      case 'Advanced': return 'w-4/5';
      case 'Intermediate': return 'w-3/5';
      default: return 'w-2/5';
    }
  };

  return (
    <div 
      className={`bg-surface border border-border rounded-lg p-6 transition-all duration-300 hover-lift ${
        isHovered ? 'shadow-brand-lg' : 'shadow-brand'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name={skill?.icon} size={24} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">{skill?.name}</h3>
            <p className="text-sm text-text-secondary">{skill?.category}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          skill?.proficiency === 'Expert' ? 'bg-green-100 text-green-800' :
          skill?.proficiency === 'Advanced' ? 'bg-blue-100 text-blue-800' :
          skill?.proficiency === 'Intermediate'? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {skill?.proficiency}
        </span>
      </div>
      <p className="text-text-secondary text-sm mb-4 leading-relaxed">
        {skill?.description}
      </p>
      {/* Proficiency Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-medium text-text-secondary">Proficiency</span>
          <span className="text-xs text-text-muted">{skill?.proficiency}</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div className={`h-2 rounded-full transition-all duration-500 ${getProficiencyColor(skill?.proficiency)} ${getProficiencyWidth(skill?.proficiency)}`}></div>
        </div>
      </div>
      {/* Recent Projects */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-text-primary mb-2">Recent Applications</h4>
        <div className="flex flex-wrap gap-2">
          {skill?.recentProjects?.map((project, index) => (
            <span key={index} className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-md">
              {project}
            </span>
          ))}
        </div>
      </div>
      {/* Demo Button */}
      {skill?.hasDemo && (
        <Button
          variant="outline"
          size="sm"
          iconName="Play"
          iconPosition="left"
          onClick={() => onDemoClick(skill)}
          className="w-full"
        >
          View Demo
        </Button>
      )}
      {/* Years of Experience */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-text-muted">
          <span>Experience</span>
          <span className="font-medium">{skill?.experience} years</span>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
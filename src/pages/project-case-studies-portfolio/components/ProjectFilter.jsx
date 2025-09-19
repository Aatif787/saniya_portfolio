import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProjectFilter = ({ 
  activeCategory, 
  activeIndustry, 
  activeTechnology,
  onCategoryChange, 
  onIndustryChange, 
  onTechnologyChange,
  onClearFilters,
  projectCounts
}) => {
  const categories = [
    { id: 'all', name: 'All Projects', icon: 'Grid3X3' },
    { id: 'Data Analytics', name: 'Data Analytics', icon: 'BarChart3' },
    { id: 'Web Development', name: 'Web Development', icon: 'Code' },
    { id: 'Full-Stack', name: 'Full-Stack', icon: 'Layers' }
  ];

  const industries = [
    { id: 'all', name: 'All Industries' },
    { id: 'E-commerce', name: 'E-commerce' },
    { id: 'Healthcare', name: 'Healthcare' },
    { id: 'Education', name: 'Education' },
    { id: 'Finance', name: 'Finance' },
    { id: 'Technology', name: 'Technology' }
  ];

  const technologies = [
    { id: 'all', name: 'All Technologies' },
    { id: 'React', name: 'React' },
    { id: 'Python', name: 'Python' },
    { id: 'JavaScript', name: 'JavaScript' },
    { id: 'Node.js', name: 'Node.js' },
    { id: 'MongoDB', name: 'MongoDB' },
    { id: 'PostgreSQL', name: 'PostgreSQL' },
    { id: 'Tableau', name: 'Tableau' },
    { id: 'Power BI', name: 'Power BI' }
  ];

  const hasActiveFilters = activeCategory !== 'all' || activeIndustry !== 'all' || activeTechnology !== 'all';

  return (
    <div className="bg-surface rounded-xl shadow-brand p-6 mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-text-primary">Filter Projects</h3>
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
          >
            Clear All
          </Button>
        )}
      </div>
      {/* Category Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-text-primary mb-3">Project Type</h4>
        <div className="flex flex-wrap gap-2">
          {categories?.map((category) => (
            <Button
              key={category?.id}
              variant={activeCategory === category?.id ? "default" : "outline"}
              size="sm"
              onClick={() => onCategoryChange(category?.id)}
              iconName={category?.icon}
              iconPosition="left"
              className="flex-shrink-0"
            >
              {category?.name}
              {projectCounts?.[category?.id] && (
                <span className="ml-2 px-2 py-0.5 bg-muted rounded-full text-xs">
                  {projectCounts?.[category?.id]}
                </span>
              )}
            </Button>
          ))}
        </div>
      </div>
      {/* Industry Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-text-primary mb-3">Industry</h4>
        <div className="flex flex-wrap gap-2">
          {industries?.map((industry) => (
            <Button
              key={industry?.id}
              variant={activeIndustry === industry?.id ? "secondary" : "outline"}
              size="sm"
              onClick={() => onIndustryChange(industry?.id)}
              className="flex-shrink-0"
            >
              {industry?.name}
            </Button>
          ))}
        </div>
      </div>
      {/* Technology Filter */}
      <div>
        <h4 className="text-sm font-medium text-text-primary mb-3">Technology Stack</h4>
        <div className="flex flex-wrap gap-2">
          {technologies?.map((tech) => (
            <Button
              key={tech?.id}
              variant={activeTechnology === tech?.id ? "accent" : "outline"}
              size="sm"
              onClick={() => onTechnologyChange(tech?.id)}
              className="flex-shrink-0"
            >
              {tech?.name}
            </Button>
          ))}
        </div>
      </div>
      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center space-x-2 text-sm text-text-secondary">
            <Icon name="Filter" size={14} />
            <span>Active filters:</span>
            {activeCategory !== 'all' && (
              <span className="px-2 py-1 bg-primary text-primary-foreground rounded text-xs">
                {categories?.find(c => c?.id === activeCategory)?.name}
              </span>
            )}
            {activeIndustry !== 'all' && (
              <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs">
                {industries?.find(i => i?.id === activeIndustry)?.name}
              </span>
            )}
            {activeTechnology !== 'all' && (
              <span className="px-2 py-1 bg-accent text-accent-foreground rounded text-xs">
                {technologies?.find(t => t?.id === activeTechnology)?.name}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectFilter;
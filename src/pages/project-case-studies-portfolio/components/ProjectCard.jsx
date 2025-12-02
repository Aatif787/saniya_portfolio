import React from 'react';

import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProjectCard = ({ project, onViewDetails }) => {
  const {
    id,
    title,
    category,
    industry,
    description,
    image,
    technologies,
    metrics,
    status,
    duration,
    githubUrl,
    liveUrl,
    featured
  } = project;

  return (
    <div className={`bg-surface rounded-xl shadow-brand hover-lift transition-all duration-300 overflow-hidden ${
      featured ? 'ring-2 ring-accent ring-opacity-50' : ''
    }`}>
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-4 left-4 flex items-center space-x-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            category === 'Data Analytics' ?'bg-secondary text-secondary-foreground'
              : category === 'Web Development' ?'bg-accent text-accent-foreground' :'bg-primary text-primary-foreground'
          }`}>
            {category}
          </span>
          {featured && (
            <span className="px-3 py-1 bg-gradient-brand text-white rounded-full text-xs font-medium">
              Featured
            </span>
          )}
        </div>
        <div className="absolute top-4 right-4">
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            status === 'Completed' 
              ? 'bg-success text-success-foreground'
              : status === 'In Progress' ?'bg-warning text-warning-foreground' :'bg-muted text-muted-foreground'
          }`}>
            {status}
          </span>
        </div>
      </div>
      {/* Project Content */}
      <div className="p-6 text-center md:text-left">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-text-primary mb-2 line-clamp-2">
            {title}
          </h3>
          <div className="flex items-center text-sm text-text-secondary mb-3">
            <Icon name="Building" size={14} className="mr-1" />
            <span className="mr-4">{industry}</span>
            <Icon name="Clock" size={14} className="mr-1" />
            <span>{duration}</span>
          </div>
          <p className="text-text-secondary text-sm line-clamp-3">
            {description}
          </p>
        </div>

        {/* Technologies */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {technologies?.slice(0, 4)?.map((tech, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-muted text-text-secondary rounded text-xs font-medium"
              >
                {tech}
              </span>
            ))}
            {technologies?.length > 4 && (
              <span className="px-2 py-1 bg-muted text-text-secondary rounded text-xs font-medium">
                +{technologies?.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Key Metrics */}
        {metrics && metrics?.length > 0 && (
          <div className="mb-4 p-3 bg-muted rounded-lg">
            <h4 className="text-sm font-medium text-text-primary mb-2">Key Results</h4>
            <div className="space-y-1">
              {metrics?.slice(0, 2)?.map((metric, index) => (
                <div key={index} className="flex items-center text-xs text-text-secondary">
                  <Icon name="TrendingUp" size={12} className="mr-2 text-success" />
                  <span>{metric}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row items-center md:items-center gap-3 md:gap-0 justify-center md:justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(project)}
            iconName="Eye"
            iconPosition="left"
          >
            View Details
          </Button>
          
          <div className="flex items-center space-x-2">
            {githubUrl && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open(githubUrl, '_blank')}
                iconName="Github"
                className="p-2"
              />
            )}
            {liveUrl && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open(liveUrl, '_blank')}
                iconName="ExternalLink"
                className="p-2"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

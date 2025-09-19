import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedProject = ({ project, onViewDetails }) => {
  const {
    title,
    category,
    industry,
    description,
    image,
    technologies,
    metrics,
    duration,
    githubUrl,
    liveUrl
  } = project;

  return (
    <div className="bg-gradient-brand rounded-xl shadow-brand-xl overflow-hidden mb-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[400px]">
        {/* Content Side */}
        <div className="p-8 lg:p-12 flex flex-col justify-center text-white">
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm font-medium">
                Featured Project
              </span>
              <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm font-medium">
                {category}
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
              {title}
            </h2>
            <div className="flex items-center space-x-4 text-sm opacity-90 mb-4">
              <span className="flex items-center">
                <Icon name="Building" size={14} className="mr-1" />
                {industry}
              </span>
              <span className="flex items-center">
                <Icon name="Clock" size={14} className="mr-1" />
                {duration}
              </span>
            </div>
            <p className="text-lg opacity-90 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Key Metrics */}
          {metrics && metrics?.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Key Achievements</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {metrics?.slice(0, 4)?.map((metric, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <Icon name="TrendingUp" size={16} className="mt-1 text-accent flex-shrink-0" />
                    <span className="text-sm opacity-90">{metric}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technologies */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {technologies?.slice(0, 6)?.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
              {technologies?.length > 6 && (
                <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm font-medium">
                  +{technologies?.length - 6} more
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="secondary"
              onClick={() => onViewDetails(project)}
              iconName="Eye"
              iconPosition="left"
              className="flex-1"
            >
              View Case Study
            </Button>
            <div className="flex gap-2">
              {githubUrl && (
                <Button
                  variant="outline"
                  onClick={() => window.open(githubUrl, '_blank')}
                  iconName="Github"
                  className="bg-white bg-opacity-20 border-white border-opacity-30 text-white hover:bg-white hover:bg-opacity-30"
                />
              )}
              {liveUrl && (
                <Button
                  variant="outline"
                  onClick={() => window.open(liveUrl, '_blank')}
                  iconName="ExternalLink"
                  className="bg-white bg-opacity-20 border-white border-opacity-30 text-white hover:bg-white hover:bg-opacity-30"
                />
              )}
            </div>
          </div>
        </div>

        {/* Image Side */}
        <div className="relative">
          <Image
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-transparent opacity-20"></div>
          
          {/* Floating Stats */}
          <div className="absolute top-6 right-6 bg-white bg-opacity-95 rounded-lg p-4 shadow-brand">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{metrics?.length || 0}</div>
              <div className="text-xs text-text-secondary">Key Results</div>
            </div>
          </div>
          
          <div className="absolute bottom-6 right-6 bg-white bg-opacity-95 rounded-lg p-4 shadow-brand">
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">{technologies?.length || 0}</div>
              <div className="text-xs text-text-secondary">Technologies</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProject;
import React, { useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProjectModal = ({ project, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !project) return null;

  const {
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
    challenge,
    solution,
    implementation,
    outcomes,
    lessonsLearned,
    gallery
  } = project;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Modal Content */}
      <div className="relative bg-surface rounded-xl shadow-brand-xl max-w-4xl max-h-[90vh] overflow-y-auto w-full">
        {/* Header */}
        <div className="sticky top-0 bg-surface border-b border-border p-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-brand rounded-lg flex items-center justify-center">
              <Icon name="FolderOpen" size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text-primary">{title}</h2>
              <div className="flex items-center space-x-4 text-sm text-text-secondary mt-1">
                <span className="flex items-center">
                  <Icon name="Tag" size={14} className="mr-1" />
                  {category}
                </span>
                <span className="flex items-center">
                  <Icon name="Building" size={14} className="mr-1" />
                  {industry}
                </span>
                <span className="flex items-center">
                  <Icon name="Clock" size={14} className="mr-1" />
                  {duration}
                </span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            iconName="X"
            className="p-2"
          />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Hero Image */}
          <div className="mb-8">
            <div className="relative h-64 rounded-lg overflow-hidden">
              <Image
                src={image}
                alt={title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  status === 'Completed' 
                    ? 'bg-success text-success-foreground'
                    : status === 'In Progress' ?'bg-warning text-warning-foreground' :'bg-muted text-muted-foreground'
                }`}>
                  {status}
                </span>
              </div>
            </div>
          </div>

          {/* Project Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <h3 className="text-xl font-semibold text-text-primary mb-4">Project Overview</h3>
              <p className="text-text-secondary leading-relaxed mb-6">
                {description}
              </p>

              {/* Challenge */}
              <div className="mb-6">
                <h4 className="text-lg font-medium text-text-primary mb-3 flex items-center">
                  <Icon name="AlertCircle" size={18} className="mr-2 text-warning" />
                  Challenge
                </h4>
                <p className="text-text-secondary leading-relaxed">
                  {challenge}
                </p>
              </div>

              {/* Solution */}
              <div className="mb-6">
                <h4 className="text-lg font-medium text-text-primary mb-3 flex items-center">
                  <Icon name="Lightbulb" size={18} className="mr-2 text-accent" />
                  Solution
                </h4>
                <p className="text-text-secondary leading-relaxed">
                  {solution}
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Technologies */}
              <div className="bg-muted rounded-lg p-4">
                <h4 className="text-sm font-medium text-text-primary mb-3 flex items-center">
                  <Icon name="Code" size={16} className="mr-2" />
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {technologies?.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-surface text-text-secondary rounded text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Metrics */}
              {metrics && metrics?.length > 0 && (
                <div className="bg-muted rounded-lg p-4">
                  <h4 className="text-sm font-medium text-text-primary mb-3 flex items-center">
                    <Icon name="TrendingUp" size={16} className="mr-2" />
                    Key Results
                  </h4>
                  <div className="space-y-2">
                    {metrics?.map((metric, index) => (
                      <div key={index} className="flex items-start text-sm text-text-secondary">
                        <Icon name="CheckCircle" size={14} className="mr-2 mt-0.5 text-success flex-shrink-0" />
                        <span>{metric}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                {githubUrl && (
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => window.open(githubUrl, '_blank')}
                    iconName="Github"
                    iconPosition="left"
                  >
                    View Code
                  </Button>
                )}
                {liveUrl && (
                  <Button
                    variant="default"
                    fullWidth
                    onClick={() => window.open(liveUrl, '_blank')}
                    iconName="ExternalLink"
                    iconPosition="left"
                  >
                    Live Demo
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Implementation Details */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-text-primary mb-4 flex items-center">
              <Icon name="Settings" size={20} className="mr-2" />
              Technical Implementation
            </h3>
            <div className="bg-muted rounded-lg p-6">
              <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                {implementation}
              </p>
            </div>
          </div>

          {/* Outcomes */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-text-primary mb-4 flex items-center">
              <Icon name="Target" size={20} className="mr-2" />
              Outcomes & Impact
            </h3>
            <div className="bg-success bg-opacity-10 rounded-lg p-6">
              <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                {outcomes}
              </p>
            </div>
          </div>

          {/* Gallery */}
          {gallery && gallery?.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-text-primary mb-4 flex items-center">
                <Icon name="Images" size={20} className="mr-2" />
                Project Gallery
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {gallery?.map((img, index) => (
                  <div key={index} className="relative h-48 rounded-lg overflow-hidden">
                    <Image
                      src={img?.url}
                      alt={img?.caption}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    {img?.caption && (
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
                        <p className="text-xs">{img?.caption}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Lessons Learned */}
          <div>
            <h3 className="text-xl font-semibold text-text-primary mb-4 flex items-center">
              <Icon name="BookOpen" size={20} className="mr-2" />
              Lessons Learned
            </h3>
            <div className="bg-accent bg-opacity-10 rounded-lg p-6">
              <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                {lessonsLearned}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
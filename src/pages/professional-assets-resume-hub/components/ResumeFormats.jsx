import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ResumeFormats = () => {
  const [activeFormat, setActiveFormat] = useState('interactive');

  const resumeFormats = [
    {
      id: 'interactive',
      name: 'Interactive Web Resume',
      description: 'Dynamic resume with expandable sections and project links',
      icon: 'Monitor',
      features: ['Expandable sections', 'Project links', 'Skill demonstrations', 'Real-time updates'],
      action: 'View Online',
      actionIcon: 'ExternalLink'
    },
    {
      id: 'pdf',
      name: 'Professional PDF',
      description: 'Print-ready format optimized for hiring managers',
      icon: 'FileText',
      features: ['Print optimized', 'Professional layout', 'ATS compatible', 'Quick download'],
      action: 'Download PDF',
      actionIcon: 'Download'
    },
    {
      id: 'ats',
      name: 'ATS-Friendly Text',
      description: 'Plain text version for applicant tracking systems',
      icon: 'Type',
      features: ['Keyword optimized', 'Clean formatting', 'System compatible', 'Fast parsing'],
      action: 'Copy Text',
      actionIcon: 'Copy'
    }
  ];

  const handleFormatAction = (formatId) => {
    switch (formatId) {
      case 'interactive':
        // Mock action for interactive resume
        console.log('Opening interactive resume...');
        break;
      case 'pdf':
        const link = document.createElement('a');
        link.href = '/assets/images/resume.pdf';
        link.download = 'Saniya_Resume_2025.pdf';
        link?.click();
        break;
      case 'ats':
        // Mock copy to clipboard
        navigator.clipboard?.writeText('Saniya Dhada - Data Analyst & Full Stack Developer...');
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-surface rounded-xl p-6 shadow-brand">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-primary mb-2">Resume Formats</h3>
          <p className="text-text-secondary">Choose the format that best suits your needs</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-text-muted">
          <Icon name="Clock" size={16} />
          <span>Updated Dec 2024</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {resumeFormats?.map((format) => (
          <div
            key={format?.id}
            className={`relative p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer hover-lift ${
              activeFormat === format?.id
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            }`}
            onClick={() => setActiveFormat(format?.id)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2 rounded-lg ${
                activeFormat === format?.id ? 'bg-primary text-white' : 'bg-muted text-primary'
              }`}>
                <Icon name={format?.icon} size={20} />
              </div>
              {activeFormat === format?.id && (
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse-slow"></div>
              )}
            </div>

            <h4 className="font-semibold text-primary mb-1">{format?.name}</h4>
            <p className="text-sm text-text-secondary mb-4">{format?.description}</p>

            <div className="space-y-2 mb-4">
              {format?.features?.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 text-xs text-text-muted">
                  <Icon name="Check" size={12} className="text-accent" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <Button
              variant={activeFormat === format?.id ? 'default' : 'outline'}
              size="sm"
              fullWidth
              iconName={format?.actionIcon}
              iconPosition="left"
              onClick={(e) => {
                e?.stopPropagation();
                handleFormatAction(format?.id);
              }}
            >
              {format?.action}
            </Button>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-primary mt-0.5" />
          <div>
            <p className="text-sm text-text-secondary">
              <strong>Recommendation:</strong> Use the Interactive Web Resume for online applications, 
              PDF format for email submissions, and ATS-friendly text for job portals with upload restrictions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeFormats;

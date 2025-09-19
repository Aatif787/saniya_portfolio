import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ResourcesSection = () => {
  const [downloadCounts, setDownloadCounts] = useState({
    resume: 0,
    portfolio: 0,
    capabilities: 0,
    certifications: 0
  });

  const handleDownload = (resourceType, fileName) => {
    // Simulate download
    setDownloadCounts(prev => ({
      ...prev,
      [resourceType]: prev?.[resourceType] + 1
    }));
    
    // In a real app, this would trigger actual download
    console.log(`Downloading ${fileName}`);
  };

  const professionalAssets = [
    {
      id: 'resume',
      title: 'Complete Resume',
      description: 'Comprehensive CV with detailed experience, education, and achievements',
      fileSize: '2.4 MB',
      format: 'PDF',
      lastUpdated: 'January 2025',
      icon: 'FileText',
      color: 'bg-primary',
      features: ['ATS-Optimized', 'Professional Design', 'Contact Information', 'Project Details']
    },
    {
      id: 'portfolio',
      title: 'Portfolio Summary',
      description: 'Visual overview of key projects and technical capabilities',
      fileSize: '5.8 MB',
      format: 'PDF',
      lastUpdated: 'January 2025',
      icon: 'FolderOpen',
      color: 'bg-secondary',
      features: ['Project Screenshots', 'Technology Stack', 'Results & Impact', 'Code Samples']
    },
    {
      id: 'capabilities',
      title: 'Capabilities Matrix',
      description: 'Detailed breakdown of technical skills and proficiency levels',
      fileSize: '1.2 MB',
      format: 'PDF',
      lastUpdated: 'December 2024',
      icon: 'Target',
      color: 'bg-accent',
      features: ['Skill Ratings', 'Experience Timeline', 'Tool Proficiency', 'Learning Path']
    },
    {
      id: 'certifications',
      title: 'Certifications',
      description: 'Official certificates and training completion records',
      fileSize: '3.1 MB',
      format: 'ZIP',
      lastUpdated: 'November 2024',
      icon: 'Award',
      color: 'bg-primary',
      features: ['Digital Certificates', 'Training Records', 'Skill Validations', 'Course Transcripts']
    }
  ];

  const quickFacts = [
    { label: 'Years of Experience', value: '2+', icon: 'Calendar' },
    { label: 'Projects Completed', value: '15+', icon: 'CheckCircle' },
    { label: 'Technologies Mastered', value: '12+', icon: 'Code' },
    { label: 'Certifications Earned', value: '8+', icon: 'Award' }
  ];

  const contactMethods = [
    {
      method: 'Email',
      value: 'saniya@example.com',
      description: 'Best for detailed project discussions',
      icon: 'Mail',
      action: () => window.open('mailto:saniya@example.com', '_blank')
    },
    {
      method: 'LinkedIn',
      value: '/in/saniya-data-storyteller',
      description: 'Professional networking and updates',
      icon: 'Linkedin',
      action: () => window.open('https://linkedin.com/in/saniya-data-storyteller', '_blank')
    },
    {
      method: 'Phone',
      value: '+91 98765 43210',
      description: 'Quick consultations and urgent matters',
      icon: 'Phone',
      action: () => window.open('tel:+918269668885', '_blank')
    },
    {
      method: 'Calendar',
      value: 'Schedule a Meeting',
      description: 'Book a 30-minute discovery call',
      icon: 'Calendar',
      action: () => window.open('https://calendly.com/saniya-data-storyteller', '_blank')
    }
  ];

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
            Professional Resources
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Download comprehensive documentation of my experience, skills, and achievements
          </p>
        </div>

        {/* Quick Facts */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {quickFacts?.map((fact, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name={fact?.icon} size={24} color="var(--color-primary)" />
              </div>
              <div className="text-2xl font-bold text-primary mb-1">{fact?.value}</div>
              <div className="text-sm text-text-secondary">{fact?.label}</div>
            </div>
          ))}
        </div>

        {/* Professional Assets */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {professionalAssets?.map((asset) => (
            <div key={asset?.id} className="bg-background rounded-xl p-6 shadow-brand hover-lift">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${asset?.color}`}>
                    <Icon name={asset?.icon} size={24} color="white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-primary">{asset?.title}</h3>
                    <p className="text-sm text-text-secondary">{asset?.description}</p>
                  </div>
                </div>
                <div className="text-right text-xs text-text-secondary">
                  <div>{asset?.format}</div>
                  <div>{asset?.fileSize}</div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {asset?.features?.map((feature, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-xs text-text-secondary">
                  Updated: {asset?.lastUpdated}
                  {downloadCounts?.[asset?.id] > 0 && (
                    <span className="ml-2 text-accent">
                      • {downloadCounts?.[asset?.id]} downloads
                    </span>
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Download"
                  iconPosition="left"
                  onClick={() => handleDownload(asset?.id, `${asset?.title}.${asset?.format?.toLowerCase()}`)}
                >
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Methods */}
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-primary mb-4">Let's Connect</h3>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Ready to discuss opportunities, collaborations, or just want to chat about data and technology? 
              Choose your preferred way to reach out.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods?.map((contact, index) => (
              <button
                key={index}
                onClick={contact?.action}
                className="bg-surface rounded-lg p-6 text-center hover-lift transition-all duration-300 hover:shadow-brand-lg"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Icon name={contact?.icon} size={24} color="var(--color-primary)" />
                </div>
                <h4 className="font-semibold text-primary mb-1">{contact?.method}</h4>
                <p className="text-sm text-accent mb-2">{contact?.value}</p>
                <p className="text-xs text-text-secondary">{contact?.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Availability Status */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-3 bg-surface px-6 py-3 rounded-full shadow-brand">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-text-secondary">
              <strong className="text-primary">Available for new opportunities</strong> • 
              Typically responds within 24 hours
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;
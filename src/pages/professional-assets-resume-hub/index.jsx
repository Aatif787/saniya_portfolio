import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import all components
import ResumeFormats from './components/ResumeFormats';
import CredentialsShowcase from './components/CredentialsShowcase';
import PortfolioAssets from './components/PortfolioAssets';
import MediaKit from './components/MediaKit';
import ProfessionalReferences from './components/ProfessionalReferences';
import AvailabilityStatus from './components/AvailabilityStatus';
import ImpactMetrics from './components/ImpactMetrics';

const ProfessionalAssetsResumeHub = () => {
  const [activeSection, setActiveSection] = useState('resume');

  const navigationSections = [
    { id: 'resume', name: 'Resume Formats', icon: 'FileText', component: ResumeFormats },
    { id: 'credentials', name: 'Credentials', icon: 'Award', component: CredentialsShowcase },
    { id: 'assets', name: 'Portfolio Assets', icon: 'FolderOpen', component: PortfolioAssets },
    { id: 'media', name: 'Media Kit', icon: 'Camera', component: MediaKit },
    { id: 'references', name: 'References', icon: 'Users', component: ProfessionalReferences },
    { id: 'availability', name: 'Availability', icon: 'Calendar', component: AvailabilityStatus },
    { id: 'metrics', name: 'Impact Metrics', icon: 'BarChart3', component: ImpactMetrics }
  ];

  const quickActions = [
    {
      title: 'Download Resume PDF',
      description: 'Get the latest version of my professional resume',
      icon: 'Download',
      action: () => {
        const link = document.createElement('a');
        link.href = '/assets/saniya-resume.pdf';
        link.download = 'Saniya_Sharma_Resume_2025.pdf';
        link?.click();
      },
      variant: 'default'
    },
    {
      title: 'View Interactive Resume',
      description: 'Explore my dynamic web-based resume',
      icon: 'ExternalLink',
      action: () => window.open('/interactive-resume', '_blank'),
      variant: 'outline'
    },
    {
      title: 'Contact for Opportunities',
      description: 'Discuss potential collaborations',
      icon: 'MessageCircle',
      action: () => window.open('mailto:saniya@example.com?subject=Professional Opportunity', '_blank'),
      variant: 'outline'
    },
    {
      title: 'Schedule a Call',
      description: 'Book a time to discuss projects',
      icon: 'Phone',
      action: () => window.open('https://calendly.com/saniya-sharma', '_blank'),
      variant: 'outline'
    }
  ];

  const ActiveComponent = navigationSections?.find(section => section?.id === activeSection)?.component;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Professional Assets & Resume Hub - Saniya Sharma | Data Storyteller</title>
        <meta name="description" content="Access Saniya Sharma's professional documentation, resume formats, credentials, portfolio assets, and availability status. Complete resource center for hiring managers and collaborators." />
        <meta name="keywords" content="resume, CV, professional assets, credentials, portfolio, data analyst resume, full-stack developer resume, BCA graduate" />
        <meta property="og:title" content="Professional Assets & Resume Hub - Saniya Sharma" />
        <meta property="og:description" content="Comprehensive professional documentation and assets for data analyst and full-stack developer Saniya Sharma." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://saniya-portfolio.com/professional-assets-resume-hub" />
      </Helmet>
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary to-secondary text-white py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Icon name="Shield" size={16} />
                <span>Professional Resource Center</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Professional Assets &
                <span className="block text-accent">Resume Hub</span>
              </h1>
              
              <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
                Your comprehensive resource center for all professional documentation, credentials, 
                and assets. Everything you need to evaluate my qualifications and expertise.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button
                  variant="secondary"
                  size="lg"
                  iconName="Download"
                  iconPosition="left"
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = '/assets/saniya-resume.pdf';
                    link.download = 'Saniya_Sharma_Resume_2025.pdf';
                    link?.click();
                  }}
                >
                  Download Resume
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  iconName="ExternalLink"
                  iconPosition="left"
                  onClick={() => window.open('/interactive-resume', '_blank')}
                  className="border-white text-white hover:bg-white hover:text-primary"
                >
                  View Interactive Resume
                </Button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">24+</div>
                <div className="text-sm text-white/80">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">18</div>
                <div className="text-sm text-white/80">Technologies</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">6</div>
                <div className="text-sm text-white/80">Certifications</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">100%</div>
                <div className="text-sm text-white/80">Available</div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="py-12 bg-surface">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-primary mb-4">Quick Actions</h2>
              <p className="text-text-secondary">Fast access to the most requested resources</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions?.map((action, index) => (
                <div
                  key={index}
                  className="bg-background border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-200 hover-lift group cursor-pointer"
                  onClick={action?.action}
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                      <Icon name={action?.icon} size={20} className="text-primary group-hover:text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-primary mb-1 group-hover:text-accent transition-colors">
                        {action?.title}
                      </h3>
                      <p className="text-sm text-text-secondary">{action?.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar Navigation */}
              <div className="lg:w-64 flex-shrink-0">
                <div className="bg-surface rounded-xl p-4 shadow-brand sticky top-24">
                  <h3 className="font-semibold text-primary mb-4">Resource Sections</h3>
                  <nav className="space-y-1">
                    {navigationSections?.map((section) => (
                      <button
                        key={section?.id}
                        onClick={() => setActiveSection(section?.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          activeSection === section?.id
                            ? 'bg-primary text-white' :'text-text-secondary hover:text-primary hover:bg-muted'
                        }`}
                      >
                        <Icon name={section?.icon} size={16} />
                        <span>{section?.name}</span>
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Content Area */}
              <div className="flex-1">
                {ActiveComponent && <ActiveComponent />}
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <div className="bg-surface rounded-2xl p-8 shadow-brand-lg">
              <div className="flex items-center justify-center mb-6">
                <div className="p-4 bg-primary rounded-full">
                  <Icon name="Handshake" size={32} className="text-white" />
                </div>
              </div>
              
              <h2 className="text-3xl font-bold text-primary mb-4">Ready to Work Together?</h2>
              <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
                Have questions about my experience or interested in discussing opportunities? 
                I'm always open to meaningful conversations about data, technology, and innovation.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button
                  variant="default"
                  size="lg"
                  iconName="MessageCircle"
                  iconPosition="left"
                  onClick={() => window.open('mailto:saniya@example.com?subject=Professional Inquiry', '_blank')}
                >
                  Start a Conversation
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  iconName="Calendar"
                  iconPosition="left"
                  onClick={() => window.open('https://calendly.com/saniya-sharma', '_blank')}
                >
                  Schedule a Call
                </Button>
              </div>

              <div className="mt-8 pt-6 border-t border-border">
                <div className="flex items-center justify-center space-x-6 text-sm text-text-muted">
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={16} />
                    <span>Usually responds within 24 hours</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="MapPin" size={16} />
                    <span>Delhi, India (Remote friendly)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="bg-primary text-white py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold text-sm">S</span>
              </div>
              <div>
                <div className="font-semibold">Saniya Sharma</div>
                <div className="text-sm text-white/80">Data Storyteller & Developer</div>
              </div>
            </div>
            
            <div className="text-sm text-white/80">
              © {new Date()?.getFullYear()} Saniya Sharma. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProfessionalAssetsResumeHub;
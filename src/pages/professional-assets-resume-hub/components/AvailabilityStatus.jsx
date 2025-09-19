import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AvailabilityStatus = () => {
  const [selectedCollaboration, setSelectedCollaboration] = useState(null);

  const currentStatus = {
    available: true,
    capacity: 75,
    nextAvailable: '2025-01-15',
    preferredProjects: ['Full-time roles', 'Data analysis projects', 'React development'],
    location: 'Delhi, India (Open to remote)',
    notice: '2 weeks'
  };

  const collaborationTypes = [
    {
      id: 'fulltime',
      title: 'Full-time Employment',
      description: 'Seeking permanent positions in data analysis or full-stack development',
      icon: 'Briefcase',
      availability: 'Immediately available',
      commitment: 'Long-term',
      preferred: true,
      details: [
        'Data Analyst positions',
        'Full-stack Developer roles',
        'Business Intelligence roles',
        'Product Analyst positions'
      ]
    },
    {
      id: 'contract',
      title: 'Contract Projects',
      description: 'Short to medium-term projects with defined scope and timeline',
      icon: 'FileText',
      availability: 'Available',
      commitment: '3-6 months',
      preferred: false,
      details: [
        'Dashboard development',
        'Data visualization projects',
        'Web application development',
        'Analytics implementation'
      ]
    },
    {
      id: 'consulting',
      title: 'Consulting & Advisory',
      description: 'Strategic guidance on data initiatives and technical architecture',
      icon: 'Users',
      availability: 'Limited capacity',
      commitment: 'Flexible',
      preferred: false,
      details: [
        'Data strategy consulting',
        'Technical architecture review',
        'Team mentoring',
        'Process optimization'
      ]
    },
    {
      id: 'freelance',
      title: 'Freelance Projects',
      description: 'Small to medium projects with flexible engagement models',
      icon: 'Laptop',
      availability: 'Selective',
      commitment: '1-3 months',
      preferred: false,
      details: [
        'Website development',
        'Data analysis tasks',
        'Visualization creation',
        'Technical documentation'
      ]
    }
  ];

  const upcomingAvailability = [
    {
      period: 'January 2025',
      status: 'Fully Available',
      capacity: 100,
      focus: 'Open to all opportunities'
    },
    {
      period: 'February 2025',
      status: 'Available',
      capacity: 80,
      focus: 'Prioritizing full-time roles'
    },
    {
      period: 'March 2025',
      status: 'Limited',
      capacity: 40,
      focus: 'Existing commitments'
    }
  ];

  const handleCollaborationSelect = (collaborationType) => {
    setSelectedCollaboration(collaborationType);
  };

  const handleContactForOpportunity = () => {
    // Mock action for contacting about opportunities
    window.open('mailto:saniya@example.com?subject=Collaboration Opportunity', '_blank');
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'fully available': return 'text-green-600 bg-green-100';
      case 'available': return 'text-blue-600 bg-blue-100';
      case 'limited': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Availability Status */}
      <div className="bg-surface rounded-xl p-6 shadow-brand">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-primary mb-2">Current Availability</h3>
            <p className="text-text-secondary">Real-time status and capacity information</p>
          </div>
          <div className={`flex items-center space-x-2 px-3 py-2 rounded-full ${
            currentStatus?.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            <div className={`w-2 h-2 rounded-full ${
              currentStatus?.available ? 'bg-green-500' : 'bg-red-500'
            } animate-pulse`}></div>
            <span className="text-sm font-medium">
              {currentStatus?.available ? 'Available' : 'Unavailable'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Gauge" size={16} className="text-primary" />
              <span className="text-sm font-medium text-primary">Current Capacity</span>
            </div>
            <div className="text-2xl font-bold text-primary">{currentStatus?.capacity}%</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${currentStatus?.capacity}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Calendar" size={16} className="text-primary" />
              <span className="text-sm font-medium text-primary">Next Available</span>
            </div>
            <div className="text-lg font-semibold text-primary">
              {new Date(currentStatus.nextAvailable)?.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
          </div>

          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="MapPin" size={16} className="text-primary" />
              <span className="text-sm font-medium text-primary">Location</span>
            </div>
            <div className="text-sm text-text-secondary">{currentStatus?.location}</div>
          </div>

          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Clock" size={16} className="text-primary" />
              <span className="text-sm font-medium text-primary">Notice Period</span>
            </div>
            <div className="text-lg font-semibold text-primary">{currentStatus?.notice}</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-4 border border-primary/10">
          <h4 className="font-semibold text-primary mb-2">Preferred Project Types</h4>
          <div className="flex flex-wrap gap-2">
            {currentStatus?.preferredProjects?.map((project, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary text-white text-sm rounded-full"
              >
                {project}
              </span>
            ))}
          </div>
        </div>
      </div>
      {/* Collaboration Types */}
      <div className="bg-surface rounded-xl p-6 shadow-brand">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-primary mb-2">Collaboration Preferences</h3>
            <p className="text-text-secondary">Different ways we can work together</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {collaborationTypes?.map((type) => (
            <div
              key={type?.id}
              className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover-lift ${
                type?.preferred
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
              } ${
                selectedCollaboration?.id === type?.id ? 'ring-2 ring-primary/20' : ''
              }`}
              onClick={() => handleCollaborationSelect(type)}
            >
              {type?.preferred && (
                <div className="absolute -top-2 -right-2 bg-accent text-white px-2 py-1 rounded text-xs font-medium">
                  Preferred
                </div>
              )}

              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-lg ${
                  type?.preferred ? 'bg-primary text-white' : 'bg-muted text-primary'
                }`}>
                  <Icon name={type?.icon} size={20} />
                </div>
                <div className="text-right">
                  <div className="text-xs text-text-muted">{type?.availability}</div>
                  <div className="text-xs text-primary font-medium">{type?.commitment}</div>
                </div>
              </div>

              <h4 className="font-semibold text-primary mb-1">{type?.title}</h4>
              <p className="text-sm text-text-secondary mb-4">{type?.description}</p>

              {selectedCollaboration?.id === type?.id && (
                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-primary">Specific Areas:</h5>
                  {type?.details?.map((detail, index) => (
                    <div key={index} className="flex items-center space-x-2 text-xs text-text-muted">
                      <Icon name="Check" size={12} className="text-accent" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Upcoming Availability */}
      <div className="bg-surface rounded-xl p-6 shadow-brand">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-primary mb-2">Upcoming Availability</h3>
            <p className="text-text-secondary">Projected capacity for the next few months</p>
          </div>
        </div>

        <div className="space-y-4">
          {upcomingAvailability?.map((period, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 border border-border rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="font-semibold text-primary">{period?.period}</div>
                </div>
                <div>
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(period?.status)}`}>
                    {period?.status}
                  </div>
                  <div className="text-sm text-text-secondary mt-1">{period?.focus}</div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-lg font-bold text-primary">{period?.capacity}%</div>
                <div className="text-xs text-text-muted">Capacity</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Button
            variant="default"
            iconName="MessageCircle"
            iconPosition="left"
            onClick={handleContactForOpportunity}
          >
            Discuss Opportunities
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityStatus;
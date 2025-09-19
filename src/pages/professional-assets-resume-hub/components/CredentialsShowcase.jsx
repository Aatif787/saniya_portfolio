import React from 'react';
import Icon from '../../../components/AppIcon';


const CredentialsShowcase = () => {
  const credentials = [
    {
      id: 1,
      type: 'degree',
      title: 'Bachelor of Computer Applications (BCA)',
      institution: 'Delhi University',
      year: '2024',
      grade: 'First Class with Distinction',
      icon: 'GraduationCap',
      color: 'bg-primary',
      verified: true
    },
    {
      id: 2,
      type: 'certification',
      title: 'Google Data Analytics Professional Certificate',
      institution: 'Google via Coursera',
      year: '2024',
      credentialId: 'GDA-2024-789456',
      icon: 'Award',
      color: 'bg-accent',
      verified: true
    },
    {
      id: 3,
      type: 'certification',
      title: 'AWS Cloud Practitioner',
      institution: 'Amazon Web Services',
      year: '2024',
      credentialId: 'AWS-CP-2024-123789',
      icon: 'Cloud',
      color: 'bg-secondary',
      verified: true
    },
    {
      id: 4,
      type: 'course',
      title: 'Full Stack Web Development Bootcamp',
      institution: 'The Complete Web Developer Course',
      year: '2023',
      hours: '65 hours',
      icon: 'Code',
      color: 'bg-primary',
      verified: false
    },
    {
      id: 5,
      type: 'course',
      title: 'Advanced Data Visualization with D3.js',
      institution: 'FreeCodeCamp',
      year: '2023',
      hours: '40 hours',
      icon: 'BarChart3',
      color: 'bg-accent',
      verified: false
    },
    {
      id: 6,
      type: 'achievement',
      title: 'Hackathon Winner - Data Innovation Challenge',
      institution: 'TechFest Delhi 2024',
      year: '2024',
      achievement: '1st Place',
      icon: 'Trophy',
      color: 'bg-secondary',
      verified: true
    }
  ];

  const getCredentialIcon = (type) => {
    switch (type) {
      case 'degree': return 'GraduationCap';
      case 'certification': return 'Award';
      case 'course': return 'BookOpen';
      case 'achievement': return 'Trophy';
      default: return 'Certificate';
    }
  };

  const handleViewCredential = (credential) => {
    // Mock action for viewing credential
    console.log(`Viewing credential: ${credential?.title}`);
  };

  return (
    <div className="bg-surface rounded-xl p-6 shadow-brand">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-primary mb-2">Credentials & Achievements</h3>
          <p className="text-text-secondary">Professional qualifications and continuous learning</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 text-sm text-accent">
            <Icon name="Shield" size={16} />
            <span>{credentials?.filter(c => c?.verified)?.length} Verified</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {credentials?.map((credential) => (
          <div
            key={credential?.id}
            className="relative p-4 border border-border rounded-lg hover:border-primary/50 transition-all duration-200 hover-lift group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`p-2 rounded-lg ${credential?.color} text-white`}>
                <Icon name={getCredentialIcon(credential?.type)} size={20} />
              </div>
              <div className="flex items-center space-x-2">
                {credential?.verified && (
                  <div className="flex items-center space-x-1 text-xs text-accent">
                    <Icon name="ShieldCheck" size={12} />
                    <span>Verified</span>
                  </div>
                )}
                <span className="text-xs text-text-muted bg-muted px-2 py-1 rounded">
                  {credential?.year}
                </span>
              </div>
            </div>

            <h4 className="font-semibold text-primary mb-1 group-hover:text-accent transition-colors">
              {credential?.title}
            </h4>
            <p className="text-sm text-text-secondary mb-2">{credential?.institution}</p>

            <div className="space-y-1 mb-4">
              {credential?.grade && (
                <div className="flex items-center space-x-2 text-xs text-text-muted">
                  <Icon name="Star" size={12} className="text-accent" />
                  <span>{credential?.grade}</span>
                </div>
              )}
              {credential?.credentialId && (
                <div className="flex items-center space-x-2 text-xs text-text-muted">
                  <Icon name="Hash" size={12} />
                  <span>ID: {credential?.credentialId}</span>
                </div>
              )}
              {credential?.hours && (
                <div className="flex items-center space-x-2 text-xs text-text-muted">
                  <Icon name="Clock" size={12} />
                  <span>{credential?.hours}</span>
                </div>
              )}
              {credential?.achievement && (
                <div className="flex items-center space-x-2 text-xs text-text-muted">
                  <Icon name="Medal" size={12} className="text-accent" />
                  <span>{credential?.achievement}</span>
                </div>
              )}
            </div>

            <button
              onClick={() => handleViewCredential(credential)}
              className="text-xs text-primary hover:text-accent transition-colors flex items-center space-x-1 opacity-0 group-hover:opacity-100"
            >
              <Icon name="ExternalLink" size={12} />
              <span>View Credential</span>
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-primary/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary rounded-lg">
              <Icon name="TrendingUp" size={20} className="text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-primary">Continuous Learning</h4>
              <p className="text-sm text-text-secondary">Currently pursuing advanced certifications in Machine Learning</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">{credentials?.length}</div>
            <div className="text-xs text-text-muted">Total Credentials</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CredentialsShowcase;
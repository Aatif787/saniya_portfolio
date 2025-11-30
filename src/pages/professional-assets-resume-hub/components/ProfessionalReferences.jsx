import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProfessionalReferences = () => {
  const [showContactInfo, setShowContactInfo] = useState({});

  const references = [
    {
      id: 1,
      name: 'Dr. Rajesh Kumar',
      title: 'Professor & Head of Department',
      company: 'Delhi University - Computer Science',
      relationship: 'Academic Supervisor',
      duration: '2021-2024',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      testimonial: `Saniya was one of my most dedicated students during her BCA program. Her analytical thinking and problem-solving abilities were exceptional. She consistently delivered high-quality projects and showed remarkable growth in data analysis and programming skills.`,
      skills: ['Academic Excellence', 'Research', 'Data Analysis'],
      contact: {
        email: 'rajesh.kumar@du.ac.in',
        phone: '+91-98765-43210',
        linkedin: 'linkedin.com/in/rajeshkumar-du'
      },
      verified: true
    },
    {
      id: 2,
      name: 'Priya Sharma',
      title: 'Senior Product Manager',
      company: 'TechCorp Solutions',
      relationship: 'Internship Supervisor',
      duration: 'Summer 2023',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      testimonial: `During her internship, Saniya demonstrated exceptional technical skills and business acumen. She successfully built a customer analytics dashboard that improved our decision-making process by 40%. Her ability to translate complex data into actionable insights was impressive.`,
      skills: ['Dashboard Development', 'Data Visualization', 'Business Analysis'],
      contact: {
        email: 'priya.sharma@techcorp.com',
        phone: '+91-87654-32109',
        linkedin: 'linkedin.com/in/priyasharma-pm'
      },
      verified: true
    },
    {
      id: 3,
      name: 'Amit Patel',
      title: 'Lead Developer',
      company: 'StartupHub India',
      relationship: 'Project Collaborator',
      duration: '2023-2024',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      testimonial: `I had the pleasure of working with Saniya on multiple full-stack projects. Her React development skills are solid, and she has a great eye for user experience. She's reliable, communicates well, and always delivers on time.`,
      skills: ['React Development', 'Full-Stack', 'Team Collaboration'],
      contact: {
        email: 'amit.patel@startuphub.in',phone: '+91-76543-21098',linkedin: 'linkedin.com/in/amitpatel-dev'
      },
      verified: false
    }
  ];

  const linkedinTestimonials = [
    {
      id: 1,
      author: 'Sarah Johnson',
      title: 'Data Science Manager at Analytics Pro',
      content: `Saniya's approach to data storytelling is refreshing. She doesn't just present numbers; she crafts narratives that drive action. Highly recommend her for any data-driven role.`,
      date: '2 weeks ago',
      likes: 24
    },
    {
      id: 2,
      author: 'Michael Chen',
      title: 'Frontend Architect at WebTech',
      content: `Worked with Saniya on a React project. Her code quality is excellent, and she has great attention to detail. Would definitely collaborate again.`,
      date: '1 month ago',
      likes: 18
    },
    {
      id: 3,
      author: 'Lisa Rodriguez',
      title: 'Product Owner at InnovateLabs',
      content: `Saniya brings a unique blend of technical expertise and business understanding. Her contributions to our analytics dashboard were invaluable.`,
      date: '2 months ago',
      likes: 31
    }
  ];

  const toggleContactInfo = (referenceId) => {
    setShowContactInfo(prev => ({
      ...prev,
      [referenceId]: !prev?.[referenceId]
    }));
  };

  const handleContactReference = (reference) => {
    // Mock action for contacting reference
    console.log(`Contacting ${reference?.name}`);
    window.open(`mailto:${reference?.contact?.email}?subject=Reference Inquiry for Saniya Dhada`, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Professional References */}
      <div className="bg-surface rounded-xl p-6 shadow-brand">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-primary mb-2">Professional References</h3>
            <p className="text-text-secondary">Verified contacts who can speak to my work and character</p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-text-muted">
            <Icon name="Shield" size={16} />
            <span>{references?.filter(r => r?.verified)?.length} Verified</span>
          </div>
        </div>

        <div className="space-y-6">
          {references?.map((reference) => (
            <div
              key={reference?.id}
              className="border border-border rounded-lg p-6 hover:border-primary/50 transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className="relative">
                    <Image
                      src={reference?.avatar}
                      alt={reference?.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    {reference?.verified && (
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                        <Icon name="Check" size={12} className="text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-semibold text-primary">{reference?.name}</h4>
                    <p className="text-sm text-text-secondary">{reference?.title}</p>
                    <p className="text-sm text-text-muted">{reference?.company}</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-text-muted">
                      <span>{reference?.relationship}</span>
                      <span>•</span>
                      <span>{reference?.duration}</span>
                    </div>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  iconName={showContactInfo?.[reference?.id] ? "ChevronUp" : "ChevronDown"}
                  iconPosition="right"
                  onClick={() => toggleContactInfo(reference?.id)}
                >
                  Contact Info
                </Button>
              </div>

              {/* Testimonial */}
              <div className="bg-muted rounded-lg p-4 mb-4">
                <div className="flex items-start space-x-2">
                  <Icon name="Quote" size={16} className="text-primary mt-1 flex-shrink-0" />
                  <p className="text-text-secondary italic leading-relaxed">
                    {reference?.testimonial}
                  </p>
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 mb-4">
                {reference?.skills?.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Contact Information */}
              {showContactInfo?.[reference?.id] && (
                <div className="border-t border-border pt-4 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2 text-sm text-text-muted">
                      <Icon name="Mail" size={16} />
                      <span>{reference?.contact?.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-text-muted">
                      <Icon name="Phone" size={16} />
                      <span>{reference?.contact?.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-text-muted">
                      <Icon name="Linkedin" size={16} />
                      <span className="truncate">{reference?.contact?.linkedin}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Mail"
                      iconPosition="left"
                      onClick={() => handleContactReference(reference)}
                    >
                      Send Email
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-primary/10">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary rounded-lg">
              <Icon name="Info" size={20} className="text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-primary">Reference Policy</h4>
              <p className="text-sm text-text-secondary">
                All references have provided consent to be contacted. Please allow 2-3 business days for responses.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* LinkedIn Testimonials */}
      <div className="bg-surface rounded-xl p-6 shadow-brand">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-primary mb-2">LinkedIn Recommendations</h3>
            <p className="text-text-secondary">Public testimonials from professional network</p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-text-muted">
            <Icon name="Linkedin" size={16} />
            <span>{linkedinTestimonials?.length} Recommendations</span>
          </div>
        </div>

        <div className="space-y-4">
          {linkedinTestimonials?.map((testimonial) => (
            <div
              key={testimonial?.id}
              className="border border-border rounded-lg p-4 hover:border-primary/50 transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-primary">{testimonial?.author}</h4>
                  <p className="text-sm text-text-secondary">{testimonial?.title}</p>
                </div>
                <div className="flex items-center space-x-2 text-xs text-text-muted">
                  <Icon name="Heart" size={12} />
                  <span>{testimonial?.likes}</span>
                </div>
              </div>
              
              <p className="text-text-secondary mb-3 leading-relaxed">
                {testimonial?.content}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-muted">{testimonial?.date}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="ExternalLink"
                  iconPosition="right"
                  onClick={() => window.open('https://linkedin.com/in/saniya-sharma', '_blank')}
                >
                  View on LinkedIn
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalReferences;

import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MediaKit = () => {
  const [selectedBio, setSelectedBio] = useState('medium');

  const professionalPhotos = [
    {
      id: 1,
      title: 'Professional Headshot',
      description: 'High-resolution professional portrait',
      url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
      format: 'JPG',
      resolution: '2048x2048',
      size: '1.2 MB'
    },
    {
      id: 2,
      title: 'Casual Professional',
      description: 'Relaxed professional setting',
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      format: 'JPG',
      resolution: '1920x1920',
      size: '980 KB'
    },
    {
      id: 3,
      title: 'Speaking Engagement',
      description: 'Action shot from conference presentation',
      url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
      format: 'JPG',
      resolution: '1920x1080',
      size: '1.5 MB'
    }
  ];

  const bioVariations = {
    short: {
      title: '50 Words',
      content: `Saniya Dhada is a data analyst and full-stack developer with expertise in React, Python, and data visualization. BCA graduate passionate about transforming complex data into actionable insights. Experienced in building scalable web applications and creating compelling data stories for business decision-making.`
    },
    medium: {
      title: '100 Words',
      content: `Saniya Dhada is a dynamic data analyst and full-stack developer who bridges the gap between technical expertise and business insight. With a BCA degree and hands-on experience in React, Python, and advanced data visualization tools, she specializes in transforming complex datasets into compelling narratives that drive strategic decisions.\n\nHer portfolio includes e-commerce analytics dashboards, mobile banking applications, and interactive data visualizations. Saniya combines analytical rigor with user-centric design thinking, making her valuable for organizations seeking professionals who can translate technical capabilities into business value. She's passionate about continuous learning and sharing knowledge through workshops and speaking engagements.`
    },
    long: {
      title: '200 Words',
      content: `Saniya Dhada is an accomplished data analyst and full-stack developer who exemplifies the modern professional's ability to bridge technical expertise with strategic business thinking. Armed with a Bachelor of Computer Applications degree and a passion for continuous learning, she has established herself as a versatile technologist capable of delivering end-to-end solutions.\n\nHer technical arsenal includes proficiency in React, Python, JavaScript, and advanced data visualization tools like D3.js and Tableau. Saniya's project portfolio demonstrates her ability to tackle diverse challenges, from building responsive e-commerce dashboards that process real-time analytics to developing mobile banking applications with sophisticated user interfaces.\n\nWhat sets Saniya apart is her commitment to transforming complex data into actionable insights through compelling storytelling. She approaches every project with a user-centric mindset, ensuring that technical solutions align with business objectives and user needs. Her experience spans multiple domains, including fintech, e-commerce, and data analytics.\n\nBeyond her technical contributions, Saniya is an active member of the tech community, participating in hackathons, delivering workshops on data-driven decision making, and mentoring aspiring developers. Her combination of technical depth, business acumen, and communication skills makes her an ideal candidate for organizations seeking innovative problem-solvers who can drive digital transformation initiatives.`
    }
  };

  const speakingTopics = [
    {
      id: 1,
      title: 'Data-Driven Decision Making',
      description: 'How to transform raw data into strategic business insights',
      duration: '45-60 minutes',
      audience: 'Business leaders, analysts, product managers',
      format: 'Workshop/Keynote'
    },
    {
      id: 2,
      title: 'Building Scalable React Applications',
      description: 'Best practices for enterprise-level React development',
      duration: '30-45 minutes',
      audience: 'Developers, technical teams',
      format: 'Technical talk'
    },
    {
      id: 3,
      title: 'From BCA to Tech Professional',
      description: 'Career journey and lessons learned in tech transition',
      duration: '20-30 minutes',
      audience: 'Students, early-career professionals',
      format: 'Inspirational talk'
    },
    {
      id: 4,
      title: 'The Art of Data Visualization',
      description: 'Creating compelling visual stories with data',
      duration: '45 minutes',
      audience: 'Analysts, designers, marketers',
      format: 'Workshop'
    }
  ];

  const handleDownloadPhoto = (photo) => {
    // Mock download action
    console.log(`Downloading photo: ${photo?.title}`);
    const link = document.createElement('a');
    link.href = photo?.url;
    link.download = `Saniya_${photo?.title?.replace(/\s+/g, '_')}.${photo?.format?.toLowerCase()}`;
    link?.click();
  };

  const handleCopyBio = (bioText) => {
    navigator.clipboard?.writeText(bioText);
    // Could add a toast notification here
    console.log('Bio copied to clipboard');
  };

  return (
    <div className="space-y-6">
      {/* Professional Photos */}
      <div className="bg-surface rounded-xl p-6 shadow-brand">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-primary mb-2">Professional Photos</h3>
            <p className="text-text-secondary">High-resolution images for media and promotional use</p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-text-muted">
            <Icon name="Camera" size={16} />
            <span>{professionalPhotos?.length} Photos</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {professionalPhotos?.map((photo) => (
            <div
              key={photo?.id}
              className="border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-200 hover-lift group"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={photo?.url}
                  alt={photo?.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                  {photo?.format}
                </div>
              </div>
              
              <div className="p-4">
                <h4 className="font-semibold text-primary mb-1">{photo?.title}</h4>
                <p className="text-sm text-text-secondary mb-3">{photo?.description}</p>
                
                <div className="space-y-1 mb-4">
                  <div className="flex items-center justify-between text-xs text-text-muted">
                    <span>Resolution:</span>
                    <span>{photo?.resolution}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-text-muted">
                    <span>Size:</span>
                    <span>{photo?.size}</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  iconName="Download"
                  iconPosition="left"
                  onClick={() => handleDownloadPhoto(photo)}
                >
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Bio Variations */}
      <div className="bg-surface rounded-xl p-6 shadow-brand">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-primary mb-2">Professional Bio</h3>
            <p className="text-text-secondary">Multiple length options for different contexts</p>
          </div>
        </div>

        <div className="flex space-x-2 mb-6">
          {Object.entries(bioVariations)?.map(([key, bio]) => (
            <button
              key={key}
              onClick={() => setSelectedBio(key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedBio === key
                  ? 'bg-primary text-white' :'bg-muted text-text-secondary hover:bg-primary/10 hover:text-primary'
              }`}
            >
              {bio?.title}
            </button>
          ))}
        </div>

        <div className="bg-muted rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-primary">{bioVariations?.[selectedBio]?.title} Bio</h4>
            <Button
              variant="ghost"
              size="sm"
              iconName="Copy"
              iconPosition="left"
              onClick={() => handleCopyBio(bioVariations?.[selectedBio]?.content)}
            >
              Copy
            </Button>
          </div>
          <p className="text-text-secondary whitespace-pre-line leading-relaxed">
            {bioVariations?.[selectedBio]?.content}
          </p>
        </div>
      </div>
      {/* Speaking Topics */}
      <div className="bg-surface rounded-xl p-6 shadow-brand">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-primary mb-2">Speaking Topics</h3>
            <p className="text-text-secondary">Available presentations and workshop topics</p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-text-muted">
            <Icon name="Mic" size={16} />
            <span>{speakingTopics?.length} Topics</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {speakingTopics?.map((topic) => (
            <div
              key={topic?.id}
              className="border border-border rounded-lg p-4 hover:border-primary/50 transition-all duration-200 hover-lift"
            >
              <h4 className="font-semibold text-primary mb-2">{topic?.title}</h4>
              <p className="text-sm text-text-secondary mb-4">{topic?.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-xs text-text-muted">
                  <Icon name="Clock" size={12} />
                  <span>{topic?.duration}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-text-muted">
                  <Icon name="Users" size={12} />
                  <span>{topic?.audience}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-text-muted">
                  <Icon name="Presentation" size={12} />
                  <span>{topic?.format}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-primary/10">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary rounded-lg">
              <Icon name="MessageCircle" size={20} className="text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-primary">Speaking Inquiries</h4>
              <p className="text-sm text-text-secondary">
                Interested in having Saniya speak at your event? Contact for availability and custom topics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaKit;

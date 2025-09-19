import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const AuthorCard = () => {
  const author = {
    name: "Saniya",
    role: "Data Storyteller & Full-Stack Developer",
    bio: `BCA graduate passionate about transforming complex data into meaningful insights and building user-centric digital experiences. I bridge the gap between technical analysis and business impact.`,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    stats: [
      { label: "Articles", value: "24" },
      { label: "Readers", value: "12.5K" },
      { label: "Downloads", value: "5.2K" }
    ],
    social: [
      { platform: "LinkedIn", icon: "Linkedin", url: "#" },
      { platform: "GitHub", icon: "Github", url: "#" },
      { platform: "Twitter", icon: "Twitter", url: "#" }
    ]
  };

  return (
    <div className="bg-surface rounded-2xl p-8 border border-border">
      <div className="text-center mb-6">
        <div className="relative inline-block mb-4">
          <div className="w-24 h-24 rounded-full overflow-hidden mx-auto">
            <Image
              src={author?.avatar}
              alt={author?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
            <Icon name="Verified" size={16} className="text-accent-foreground" />
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-text-primary mb-1">{author?.name}</h3>
        <p className="text-text-secondary text-sm mb-4">{author?.role}</p>
        
        <p className="text-text-secondary text-sm leading-relaxed mb-6">
          {author?.bio}
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        {author?.stats?.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-lg font-bold text-primary">{stat?.value}</div>
            <div className="text-xs text-text-muted">{stat?.label}</div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center space-x-3 mb-6">
        {author?.social?.map((social, index) => (
          <a
            key={index}
            href={social?.url}
            className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-text-secondary hover:text-primary hover:bg-primary/10 transition-all duration-200"
            title={social?.platform}
          >
            <Icon name={social?.icon} size={18} />
          </a>
        ))}
      </div>
      <div className="space-y-3">
        <Button
          variant="default"
          fullWidth
          iconName="MessageCircle"
          iconPosition="left"
        >
          Connect with Me
        </Button>
        
        <Button
          variant="outline"
          fullWidth
          iconName="Calendar"
          iconPosition="left"
        >
          Schedule a Chat
        </Button>
      </div>
    </div>
  );
};

export default AuthorCard;
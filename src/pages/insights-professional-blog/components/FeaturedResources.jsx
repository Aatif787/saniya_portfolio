import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FeaturedResources = () => {
  const resources = [
    {
      id: 1,
      title: "Data Analytics Roadmap",
      description: "Complete guide for BCA graduates transitioning to data analytics",
      type: "PDF Guide",
      downloadCount: 1247,
      icon: "FileText",
      color: "bg-blue-500"
    },
    {
      id: 2,
      title: "Dashboard Design Templates",
      description: "Ready-to-use Figma templates for creating user-friendly dashboards",
      type: "Figma File",
      downloadCount: 892,
      icon: "Layout",
      color: "bg-purple-500"
    },
    {
      id: 3,
      title: "SQL Query Cheat Sheet",
      description: "Essential SQL queries for data analysis with practical examples",
      type: "Cheat Sheet",
      downloadCount: 2156,
      icon: "Database",
      color: "bg-green-500"
    },
    {
      id: 4,
      title: "React Components Library",
      description: "Reusable React components for building data visualization apps",
      type: "Code Package",
      downloadCount: 634,
      icon: "Code",
      color: "bg-orange-500"
    }
  ];

  return (
    <div className="bg-surface rounded-2xl p-8 border border-border">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-text-primary mb-2">Free Resources</h3>
        <p className="text-text-secondary">
          Downloadable templates, guides, and tools to accelerate your learning journey
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources?.map((resource) => (
          <div
            key={resource?.id}
            className="group bg-muted rounded-xl p-6 hover:bg-white hover:shadow-brand transition-all duration-300 border border-transparent hover:border-border"
          >
            <div className="flex items-start space-x-4">
              <div className={`w-12 h-12 ${resource?.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <Icon name={resource?.icon} size={24} className="text-white" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="text-lg font-semibold text-text-primary mb-1 group-hover:text-primary transition-colors duration-200">
                  {resource?.title}
                </h4>
                <p className="text-text-secondary text-sm mb-3 line-clamp-2">
                  {resource?.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-xs text-text-muted">
                    <span className="inline-flex items-center space-x-1">
                      <Icon name="FileType" size={12} />
                      <span>{resource?.type}</span>
                    </span>
                    <span className="inline-flex items-center space-x-1">
                      <Icon name="Download" size={12} />
                      <span>{resource?.downloadCount?.toLocaleString()}</span>
                    </span>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Download"
                    iconPosition="right"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    Download
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <Button
          variant="outline"
          iconName="ExternalLink"
          iconPosition="right"
        >
          View All Resources
        </Button>
      </div>
    </div>
  );
};

export default FeaturedResources;
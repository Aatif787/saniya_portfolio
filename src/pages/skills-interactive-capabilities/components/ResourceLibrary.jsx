import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ResourceLibrary = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const resources = [
    {
      id: 1,
      title: "Data Visualization Templates",
      description: "Ready-to-use Tableau and Power BI templates for common business metrics",
      category: "templates",
      type: "Template Pack",
      downloads: 234,
      size: "2.3 MB",
      format: "TWBX, PBIX",
      icon: "BarChart3",
      tags: ["Tableau", "Power BI", "Dashboard", "KPI"]
    },
    {
      id: 2,
      title: "React Component Library",
      description: "Reusable React components with TypeScript support and Storybook documentation",
      category: "code",
      type: "Code Library",
      downloads: 189,
      size: "1.8 MB",
      format: "ZIP",
      icon: "Code",
      tags: ["React", "TypeScript", "Components", "Storybook"]
    },
    {
      id: 3,
      title: "SQL Query Optimization Guide",
      description: "Best practices and examples for writing efficient SQL queries",
      category: "guides",
      type: "PDF Guide",
      downloads: 156,
      size: "890 KB",
      format: "PDF",
      icon: "Database",
      tags: ["SQL", "Performance", "Optimization", "Best Practices"]
    },
    {
      id: 4,
      title: "Python Data Analysis Toolkit",
      description: "Collection of Python scripts for common data analysis tasks",
      category: "code",
      type: "Script Collection",
      downloads: 298,
      size: "3.1 MB",
      format: "PY, IPYNB",
      icon: "FileCode",
      tags: ["Python", "Pandas", "Analysis", "Jupyter"]
    },
    {
      id: 5,
      title: "UX Research Templates",
      description: "User interview guides, survey templates, and analysis frameworks",
      category: "templates",
      type: "Template Pack",
      downloads: 167,
      size: "1.2 MB",
      format: "DOCX, PDF",
      icon: "Users",
      tags: ["UX Research", "Interviews", "Surveys", "Analysis"]
    },
    {
      id: 6,
      title: "API Integration Patterns",
      description: "Common patterns and examples for integrating with REST and GraphQL APIs",
      category: "code",
      type: "Code Examples",
      downloads: 143,
      size: "2.7 MB",
      format: "JS, TS",
      icon: "Globe",
      tags: ["API", "REST", "GraphQL", "Integration"]
    },
    {
      id: 7,
      title: "Business Intelligence Checklist",
      description: "Comprehensive checklist for BI project planning and execution",
      category: "guides",
      type: "Checklist",
      downloads: 201,
      size: "450 KB",
      format: "PDF",
      icon: "CheckSquare",
      tags: ["BI", "Planning", "Project Management", "Checklist"]
    },
    {
      id: 8,
      title: "Responsive Design System",
      description: "Complete design system with components, tokens, and documentation",
      category: "templates",
      type: "Design System",
      downloads: 312,
      size: "4.5 MB",
      format: "FIGMA, CSS",
      icon: "Palette",
      tags: ["Design System", "CSS", "Figma", "Responsive"]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Resources', icon: 'Grid3X3' },
    { id: 'templates', name: 'Templates', icon: 'FileText' },
    { id: 'code', name: 'Code Snippets', icon: 'Code' },
    { id: 'guides', name: 'Guides', icon: 'BookOpen' }
  ];

  const filteredResources = resources?.filter(resource => {
    const matchesCategory = activeCategory === 'all' || resource?.category === activeCategory;
    const matchesSearch = resource?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         resource?.description?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         resource?.tags?.some(tag => tag?.toLowerCase()?.includes(searchTerm?.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (resource) => {
    // Mock download functionality
    console.log(`Downloading ${resource?.title}`);
    // In a real app, this would trigger the actual download
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-text-primary mb-4">
            Resource Library
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto mb-8">
            Free templates, code snippets, and tools I've created for the community
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => setActiveCategory(category?.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeCategory === category?.id
                  ? 'bg-primary text-primary-foreground shadow-brand'
                  : 'bg-surface text-text-secondary hover:text-primary hover:bg-muted border border-border'
              }`}
            >
              <Icon name={category?.icon} size={16} />
              <span>{category?.name}</span>
            </button>
          ))}
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources?.map((resource) => (
            <div key={resource?.id} className="bg-surface border border-border rounded-lg p-6 hover-lift transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={resource?.icon} size={24} className="text-primary" />
                </div>
                <span className="px-2 py-1 bg-muted text-text-muted text-xs rounded-md">
                  {resource?.type}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-text-primary mb-2">
                {resource?.title}
              </h3>
              <p className="text-text-secondary text-sm mb-4 leading-relaxed">
                {resource?.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {resource?.tags?.slice(0, 3)?.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-accent/10 text-accent-foreground text-xs rounded-md">
                    {tag}
                  </span>
                ))}
                {resource?.tags?.length > 3 && (
                  <span className="px-2 py-1 bg-muted text-text-muted text-xs rounded-md">
                    +{resource?.tags?.length - 3}
                  </span>
                )}
              </div>

              {/* Resource Info */}
              <div className="flex items-center justify-between text-xs text-text-muted mb-4">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <Icon name="Download" size={12} className="mr-1" />
                    {resource?.downloads}
                  </span>
                  <span>{resource?.size}</span>
                  <span>{resource?.format}</span>
                </div>
              </div>

              {/* Download Button */}
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                iconPosition="left"
                onClick={() => handleDownload(resource)}
                className="w-full"
              >
                Download
              </Button>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredResources?.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Search" size={48} className="text-text-muted mx-auto mb-4" />
            <h3 className="text-lg font-medium text-text-primary mb-2">No resources found</h3>
            <p className="text-text-secondary">
              Try adjusting your search terms or category filter
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center bg-gradient-brand rounded-lg p-8 text-white">
          <h3 className="text-2xl font-bold mb-4">Need Something Custom?</h3>
          <p className="text-lg mb-6 opacity-90">
            I create custom templates, tools, and solutions for specific business needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" iconName="MessageCircle" iconPosition="left">
              Request Custom Resource
            </Button>
            <Button variant="outline" size="lg" iconName="Github" iconPosition="left" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              View on GitHub
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourceLibrary;
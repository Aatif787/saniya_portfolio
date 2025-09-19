import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PortfolioAssets = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const assetCategories = [
    { id: 'all', name: 'All Assets', icon: 'Grid3X3' },
    { id: 'screenshots', name: 'Project Screenshots', icon: 'Image' },
    { id: 'code', name: 'Code Samples', icon: 'Code' },
    { id: 'visualizations', name: 'Data Visualizations', icon: 'BarChart3' },
    { id: 'presentations', name: 'Presentations', icon: 'Presentation' }
  ];

  const portfolioAssets = [
    {
      id: 1,
      category: 'screenshots',
      title: 'E-commerce Dashboard Interface',
      description: 'React-based admin dashboard with real-time analytics',
      type: 'image',
      format: 'PNG',
      size: '2.4 MB',
      dimensions: '1920x1080',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      downloadUrl: '/assets/screenshots/ecommerce-dashboard.png',
      tags: ['React', 'Dashboard', 'Analytics']
    },
    {
      id: 2,
      category: 'code',
      title: 'Custom React Hook - useDataFetch',
      description: 'Reusable hook for API data fetching with error handling',
      type: 'code',
      format: 'JSX',
      size: '1.2 KB',
      lines: '45 lines',
      language: 'JavaScript',
      downloadUrl: '/assets/code/useDataFetch.jsx',
      tags: ['React', 'Hooks', 'API']
    },
    {
      id: 3,
      category: 'visualizations',
      title: 'Sales Performance Analysis',
      description: 'Interactive D3.js visualization showing quarterly trends',
      type: 'visualization',
      format: 'HTML',
      size: '850 KB',
      interactive: true,
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      downloadUrl: '/assets/visualizations/sales-analysis.html',
      tags: ['D3.js', 'Analytics', 'Interactive']
    },
    {
      id: 4,
      category: 'presentations',
      title: 'Data-Driven Decision Making Workshop',
      description: 'Presentation delivered at TechFest Delhi 2024',
      type: 'presentation',
      format: 'PDF',
      size: '5.2 MB',
      slides: '24 slides',
      thumbnail: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
      downloadUrl: '/assets/presentations/data-driven-decisions.pdf',
      tags: ['Workshop', 'Data Analysis', 'Speaking']
    },
    {
      id: 5,
      category: 'screenshots',
      title: 'Mobile Banking App UI',
      description: 'React Native app with biometric authentication',
      type: 'image',
      format: 'PNG',
      size: '1.8 MB',
      dimensions: '375x812',
      thumbnail: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop',
      downloadUrl: '/assets/screenshots/banking-app.png',
      tags: ['React Native', 'Mobile', 'UI/UX']
    },
    {
      id: 6,
      category: 'code',
      title: 'Data Validation Utility',
      description: 'TypeScript utility for form and API data validation',
      type: 'code',
      format: 'TS',
      size: '2.1 KB',
      lines: '78 lines',
      language: 'TypeScript',
      downloadUrl: '/assets/code/validation-utils.ts',
      tags: ['TypeScript', 'Validation', 'Utility']
    }
  ];

  const filteredAssets = activeCategory === 'all' 
    ? portfolioAssets 
    : portfolioAssets?.filter(asset => asset?.category === activeCategory);

  const handleDownload = (asset) => {
    // Mock download action
    console.log(`Downloading: ${asset?.title}`);
    const link = document.createElement('a');
    link.href = asset?.downloadUrl;
    link.download = `${asset?.title?.replace(/\s+/g, '_')}.${asset?.format?.toLowerCase()}`;
    link?.click();
  };

  const getAssetIcon = (type) => {
    switch (type) {
      case 'image': return 'Image';
      case 'code': return 'Code';
      case 'visualization': return 'BarChart3';
      case 'presentation': return 'Presentation';
      default: return 'File';
    }
  };

  return (
    <div className="bg-surface rounded-xl p-6 shadow-brand">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-primary mb-2">Portfolio Assets</h3>
          <p className="text-text-secondary">Downloadable project materials and code samples</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-text-muted">
          <Icon name="Download" size={16} />
          <span>{portfolioAssets?.length} Assets</span>
        </div>
      </div>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {assetCategories?.map((category) => (
          <button
            key={category?.id}
            onClick={() => setActiveCategory(category?.id)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeCategory === category?.id
                ? 'bg-primary text-white' :'bg-muted text-text-secondary hover:bg-primary/10 hover:text-primary'
            }`}
          >
            <Icon name={category?.icon} size={16} />
            <span>{category?.name}</span>
          </button>
        ))}
      </div>
      {/* Assets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAssets?.map((asset) => (
          <div
            key={asset?.id}
            className="border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-200 hover-lift group"
          >
            {/* Asset Preview */}
            <div className="relative h-32 bg-muted overflow-hidden">
              {asset?.thumbnail ? (
                <Image
                  src={asset?.thumbnail}
                  alt={asset?.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Icon name={getAssetIcon(asset?.type)} size={32} className="text-text-muted" />
                </div>
              )}
              <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                {asset?.format}
              </div>
            </div>

            {/* Asset Info */}
            <div className="p-4">
              <h4 className="font-semibold text-primary mb-1 group-hover:text-accent transition-colors">
                {asset?.title}
              </h4>
              <p className="text-sm text-text-secondary mb-3 line-clamp-2">
                {asset?.description}
              </p>

              {/* Asset Details */}
              <div className="space-y-1 mb-4">
                <div className="flex items-center justify-between text-xs text-text-muted">
                  <span>Size:</span>
                  <span>{asset?.size}</span>
                </div>
                {asset?.dimensions && (
                  <div className="flex items-center justify-between text-xs text-text-muted">
                    <span>Dimensions:</span>
                    <span>{asset?.dimensions}</span>
                  </div>
                )}
                {asset?.lines && (
                  <div className="flex items-center justify-between text-xs text-text-muted">
                    <span>Lines:</span>
                    <span>{asset?.lines}</span>
                  </div>
                )}
                {asset?.slides && (
                  <div className="flex items-center justify-between text-xs text-text-muted">
                    <span>Slides:</span>
                    <span>{asset?.slides}</span>
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {asset?.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-muted text-xs text-text-muted rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Download Button */}
              <Button
                variant="outline"
                size="sm"
                fullWidth
                iconName="Download"
                iconPosition="left"
                onClick={() => handleDownload(asset)}
              >
                Download
              </Button>
            </div>
          </div>
        ))}
      </div>
      {filteredAssets?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="FolderOpen" size={48} className="text-text-muted mx-auto mb-4" />
          <h4 className="text-lg font-semibold text-primary mb-2">No Assets Found</h4>
          <p className="text-text-secondary">No assets available in this category.</p>
        </div>
      )}
    </div>
  );
};

export default PortfolioAssets;
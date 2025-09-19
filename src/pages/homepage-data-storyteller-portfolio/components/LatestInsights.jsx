import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const LatestInsights = () => {
  const insights = [
    {
      id: 1,
      title: "The Future of Data Visualization: Interactive Dashboards in 2025",
      excerpt: "Exploring emerging trends in data visualization and how interactive dashboards are revolutionizing business intelligence. From AI-powered insights to real-time collaboration features.",
      category: "Data Analytics",
      readTime: "5 min read",
      publishDate: "2025-01-15",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
      tags: ["Tableau", "Power BI", "Data Viz", "Business Intelligence"],
      featured: true
    },
    {
      id: 2,
      title: "Building Scalable React Applications: Lessons from Real Projects",
      excerpt: "Key architectural decisions and best practices learned while building production React applications. Performance optimization, state management, and component design patterns.",
      category: "Web Development",
      readTime: "7 min read", 
      publishDate: "2025-01-10",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
      tags: ["React", "JavaScript", "Performance", "Architecture"],
      featured: false
    },
    {
      id: 3,
      title: "From Excel to Python: A Data Analyst\'s Journey",
      excerpt: "My personal transition from Excel-based analysis to Python programming. Challenges faced, tools learned, and how it transformed my analytical capabilities and career prospects.",
      category: "Career Growth",
      readTime: "6 min read",
      publishDate: "2025-01-05",
      image: "https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?w=400&h=250&fit=crop",
      tags: ["Python", "Excel", "Career", "Learning"],
      featured: false
    },
    {
      id: 4,
      title: "Machine Learning for Business: Practical Applications",
      excerpt: "Real-world examples of how machine learning can solve business problems. Customer segmentation, demand forecasting, and predictive analytics with practical implementation tips.",
      category: "Machine Learning",
      readTime: "8 min read",
      publishDate: "2024-12-28",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop",
      tags: ["Machine Learning", "Business", "Python", "Analytics"],
      featured: false
    }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      "Data Analytics": "bg-blue-100 text-blue-800",
      "Web Development": "bg-green-100 text-green-800", 
      "Career Growth": "bg-purple-100 text-purple-800",
      "Machine Learning": "bg-orange-100 text-orange-800"
    };
    return colors?.[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <section className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
            Latest Insights
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Sharing knowledge, experiences, and insights from the world of data analytics and web development. 
            Practical tutorials, industry trends, and lessons learned from real projects.
          </p>
        </motion.div>

        {/* Featured Article */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-surface border border-border rounded-2xl shadow-brand-lg overflow-hidden hover-lift">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Featured Image */}
              <div className="relative h-64 lg:h-auto overflow-hidden">
                <Image 
                  src={insights?.[0]?.image}
                  alt={insights?.[0]?.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                {/* Featured Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <Icon name="Star" size={14} className="mr-1" />
                    Featured
                  </span>
                </div>
              </div>

              {/* Featured Content */}
              <div className="p-8 lg:p-12">
                <div className="flex items-center space-x-4 mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(insights?.[0]?.category)}`}>
                    {insights?.[0]?.category}
                  </span>
                  <div className="flex items-center space-x-2 text-text-secondary text-sm">
                    <Icon name="Clock" size={14} />
                    <span>{insights?.[0]?.readTime}</span>
                  </div>
                </div>

                <h3 className="text-2xl lg:text-3xl font-bold text-primary mb-4 leading-tight">
                  {insights?.[0]?.title}
                </h3>

                <p className="text-text-secondary mb-6 leading-relaxed">
                  {insights?.[0]?.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {insights?.[0]?.tags?.map((tag) => (
                    <span 
                      key={tag}
                      className="bg-primary/10 text-primary px-2 py-1 rounded text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-text-secondary text-sm">
                    {formatDate(insights?.[0]?.publishDate)}
                  </span>
                  
                  <Link to="/insights-professional-blog">
                    <Button 
                      variant="default"
                      iconName="ArrowRight"
                      iconPosition="right"
                    >
                      Read Article
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {insights?.slice(1)?.map((article, index) => (
            <motion.article
              key={article?.id}
              className="bg-surface border border-border rounded-xl shadow-brand overflow-hidden hover-lift"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Article Image */}
              <div className="relative h-48 overflow-hidden">
                <Image 
                  src={article?.image}
                  alt={article?.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>

              {/* Article Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(article?.category)}`}>
                    {article?.category}
                  </span>
                  <div className="flex items-center space-x-1 text-text-secondary text-xs">
                    <Icon name="Clock" size={12} />
                    <span>{article?.readTime}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-primary mb-3 leading-tight line-clamp-2">
                  {article?.title}
                </h3>

                <p className="text-text-secondary text-sm mb-4 leading-relaxed line-clamp-3">
                  {article?.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {article?.tags?.slice(0, 2)?.map((tag) => (
                    <span 
                      key={tag}
                      className="bg-muted text-text-secondary px-2 py-1 rounded text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                  {article?.tags?.length > 2 && (
                    <span className="text-text-secondary text-xs px-2 py-1">
                      +{article?.tags?.length - 2} more
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-text-secondary text-xs">
                    {formatDate(article?.publishDate)}
                  </span>
                  
                  <Link 
                    to="/insights-professional-blog"
                    className="text-primary hover:text-secondary transition-colors duration-200 text-sm font-medium flex items-center space-x-1"
                  >
                    <span>Read More</span>
                    <Icon name="ArrowRight" size={14} />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link to="/insights-professional-blog">
            <Button 
              variant="outline" 
              size="lg"
              iconName="BookOpen"
              iconPosition="left"
              className="hover-lift"
            >
              View All Articles
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default LatestInsights;
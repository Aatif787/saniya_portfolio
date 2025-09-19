import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RecentPosts = () => {
  const recentPosts = [
    {
      id: 1,
      title: "Building Responsive Dashboards with React and D3",
      excerpt: "Learn how to create interactive data visualizations that work seamlessly across all devices.",
      date: "2025-01-05",
      readTime: 8,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop",
      slug: "responsive-dashboards-react-d3"
    },
    {
      id: 2,
      title: "SQL Performance Optimization: Real-World Tips",
      excerpt: "Practical strategies to improve query performance and database efficiency in production environments.",
      date: "2025-01-02",
      readTime: 6,
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=200&fit=crop",
      slug: "sql-performance-optimization"
    },
    {
      id: 3,
      title: "Career Transition: From BCA to Data Analytics",
      excerpt: "My personal journey and practical advice for computer application graduates entering data analytics.",
      date: "2024-12-28",
      readTime: 10,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop",
      slug: "bca-to-data-analytics-transition"
    },
    {
      id: 4,
      title: "Understanding User Behavior Through Data",
      excerpt: "How to extract meaningful insights from user interaction data to improve product experiences.",
      date: "2024-12-25",
      readTime: 7,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop",
      slug: "user-behavior-data-analysis"
    }
  ];

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-surface rounded-2xl p-8 border border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-text-primary">Recent Posts</h3>
        <Link
          to="/insights-professional-blog"
          className="text-primary hover:text-accent transition-colors duration-200 text-sm font-medium"
        >
          View All
        </Link>
      </div>
      <div className="space-y-6">
        {recentPosts?.map((post) => (
          <article key={post?.id} className="group">
            <Link
              to={`/insights-professional-blog/${post?.slug}`}
              className="flex space-x-4 hover:bg-muted/50 rounded-lg p-3 -m-3 transition-colors duration-200"
            >
              <div className="w-20 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={post?.image}
                  alt={post?.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-text-primary mb-1 line-clamp-2 group-hover:text-primary transition-colors duration-200">
                  {post?.title}
                </h4>
                <p className="text-xs text-text-secondary mb-2 line-clamp-2">
                  {post?.excerpt}
                </p>
                
                <div className="flex items-center space-x-3 text-xs text-text-muted">
                  <span className="flex items-center space-x-1">
                    <Icon name="Calendar" size={12} />
                    <span>{formatDate(post?.date)}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="Clock" size={12} />
                    <span>{post?.readTime} min</span>
                  </span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
};

export default RecentPosts;
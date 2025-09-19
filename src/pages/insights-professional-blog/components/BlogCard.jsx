import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const BlogCard = ({ post, featured = false }) => {
  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatReadTime = (minutes) => {
    return `${minutes} min read`;
  };

  if (featured) {
    return (
      <article className="group relative bg-surface rounded-2xl overflow-hidden shadow-brand-lg hover-lift transition-all duration-300">
        <div className="aspect-[16/9] overflow-hidden">
          <Image
            src={post?.image}
            alt={post?.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="flex items-center space-x-4 mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent text-accent-foreground">
              {post?.category}
            </span>
            <span className="text-white/80 text-sm">{formatDate(post?.date)}</span>
            <span className="text-white/80 text-sm">{formatReadTime(post?.readTime)}</span>
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-accent transition-colors duration-200">
            {post?.title}
          </h2>
          
          <p className="text-white/90 text-base mb-4 line-clamp-2">
            {post?.excerpt}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src={post?.author?.avatar}
                  alt={post?.author?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-white font-medium text-sm">{post?.author?.name}</p>
                <p className="text-white/70 text-xs">{post?.author?.role}</p>
              </div>
            </div>
            
            <Link
              to={`/insights-professional-blog/${post?.slug}`}
              className="inline-flex items-center space-x-2 text-white hover:text-accent transition-colors duration-200"
            >
              <span className="text-sm font-medium">Read More</span>
              <Icon name="ArrowRight" size={16} />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group bg-surface rounded-xl overflow-hidden shadow-brand hover-lift transition-all duration-300 border border-border">
      <div className="aspect-[16/10] overflow-hidden">
        <Image
          src={post?.image}
          alt={post?.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-3">
          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-muted text-text-secondary">
            {post?.category}
          </span>
          <span className="text-text-muted text-xs">{formatDate(post?.date)}</span>
          <span className="text-text-muted text-xs">{formatReadTime(post?.readTime)}</span>
        </div>
        
        <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors duration-200 line-clamp-2">
          {post?.title}
        </h3>
        
        <p className="text-text-secondary text-sm mb-4 line-clamp-3">
          {post?.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <Image
                src={post?.author?.avatar}
                alt={post?.author?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-text-primary font-medium text-xs">{post?.author?.name}</p>
            </div>
          </div>
          
          <Link
            to={`/insights-professional-blog/${post?.slug}`}
            className="inline-flex items-center space-x-1 text-primary hover:text-accent transition-colors duration-200"
          >
            <span className="text-xs font-medium">Read</span>
            <Icon name="ArrowRight" size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import BlogCard from './components/BlogCard';
import CategoryFilter from './components/CategoryFilter';
import SearchBar from './components/SearchBar';
import NewsletterSignup from './components/NewsletterSignup';
import FeaturedResources from './components/FeaturedResources';
import AuthorCard from './components/AuthorCard';
import RecentPosts from './components/RecentPosts';

const InsightsProfessionalBlog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredPosts, setFilteredPosts] = useState([]);

  const categories = [
    { id: 'all', name: 'All Posts', icon: 'Grid', count: 24 },
    { id: 'data-analytics', name: 'Data Analytics', icon: 'BarChart3', count: 8 },
    { id: 'development', name: 'Development', icon: 'Code', count: 7 },
    { id: 'career', name: 'Career Advice', icon: 'TrendingUp', count: 5 },
    { id: 'tutorials', name: 'Tutorials', icon: 'BookOpen', count: 4 }
  ];

  const blogPosts = [
    {
      id: 1,
      title: "From BCA to Data Analytics: A Practical Roadmap",
      excerpt: `A comprehensive guide for computer application graduates looking to transition into data analytics. This roadmap covers essential skills, learning resources, and practical steps to build a successful career in data science.`,
      content: `The journey from a Bachelor of Computer Applications (BCA) to data analytics is both exciting and challenging. Having made this transition myself, I want to share practical insights that can help fellow BCA graduates navigate this path successfully.\n\nThe foundation you've built during your BCA program - programming logic, database concepts, and analytical thinking - provides an excellent starting point for data analytics. However, there are specific skills and knowledge areas you'll need to develop to become proficient in this field.`,
      category: 'career',
      date: '2025-01-08',
      readTime: 12,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
      slug: 'bca-to-data-analytics-roadmap',
      author: {
        name: 'Saniya',
        role: 'Data Storyteller',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
      },
      tags: ['Career', 'BCA', 'Data Analytics', 'Learning Path'],
      featured: true
    },
    {
      id: 2,
      title: "Building User-Friendly Dashboards: A Developer\'s Guide",
      excerpt: `Learn the principles of creating intuitive data dashboards that users actually want to use. From design principles to technical implementation, this guide covers everything you need to know.`,
      content: `Creating effective dashboards is both an art and a science. As developers, we often focus on the technical aspects - data processing, visualization libraries, and performance optimization. However, the most critical factor in dashboard success is user experience.\n\nA well-designed dashboard should tell a story with data, guiding users to insights without overwhelming them with information. This requires careful consideration of visual hierarchy, color psychology, and interaction patterns.`,
      category: 'development',
      date: '2025-01-05',
      readTime: 10,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
      slug: 'user-friendly-dashboards-guide',
      author: {
        name: 'Saniya',
        role: 'Data Storyteller',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
      },
      tags: ['Dashboard Design', 'UX', 'Data Visualization', 'React']
    },
    {
      id: 3,
      title: "Why Full-Stack Developers Need Data Literacy",
      excerpt: `In today's data-driven world, full-stack developers who understand data analytics have a significant competitive advantage. Here's why and how to develop these skills.`,
      content: `The modern web application is increasingly data-centric. Users expect personalized experiences, real-time insights, and intelligent features. As full-stack developers, understanding data analytics isn't just beneficial - it's becoming essential.\n\nData literacy for developers goes beyond knowing how to query a database. It involves understanding data patterns, implementing analytics tracking, and building features that leverage data insights to improve user experience.`,
      category: 'development',
      date: '2025-01-02',
      readTime: 8,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
      slug: 'fullstack-developers-data-literacy',
      author: {
        name: 'Saniya',
        role: 'Data Storyteller',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
      },
      tags: ['Full-Stack', 'Data Literacy', 'Career Development', 'Skills']
    },
    {
      id: 4,
      title: "SQL Performance Optimization: Real-World Strategies",
      excerpt: `Practical techniques to improve database query performance based on real-world scenarios. Learn indexing strategies, query optimization, and performance monitoring.`,
      content: `Database performance can make or break an application. Slow queries frustrate users and waste server resources. After working with various database systems and optimizing countless queries, I've learned that performance optimization is both systematic and creative.\n\nThe key to SQL optimization lies in understanding how databases execute queries and where bottlenecks typically occur. This knowledge allows you to write efficient queries from the start and optimize existing ones effectively.`,
      category: 'data-analytics',date: '2024-12-28',readTime: 15,image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop',slug: 'sql-performance-optimization',
      author: {
        name: 'Saniya',role: 'Data Storyteller',avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
      },
      tags: ['SQL', 'Performance', 'Database', 'Optimization']
    },
    {
      id: 5,
      title: "React Hooks for Data Visualization",
      excerpt: `Explore advanced React hooks patterns for building interactive data visualizations. Learn custom hooks for data fetching, state management, and animation.`,
      content: `React hooks have revolutionized how we build interactive applications, and this is especially true for data visualization. Custom hooks can encapsulate complex data processing logic, making your visualization components cleaner and more reusable.\n\nIn this article, we'll explore patterns for creating custom hooks that handle data fetching, transformation, and state management specifically for data visualization use cases.`,
      category: 'tutorials',
      date: '2024-12-25',
      readTime: 12,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
      slug: 'react-hooks-data-visualization',
      author: {
        name: 'Saniya',
        role: 'Data Storyteller',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
      },
      tags: ['React', 'Hooks', 'Data Visualization', 'JavaScript']
    },
    {
      id: 6,
      title: "Understanding User Behavior Through Data",
      excerpt: `Learn how to collect, analyze, and interpret user behavior data to make informed product decisions. From analytics setup to actionable insights.`,
      content: `User behavior data is one of the most valuable assets for any digital product. It tells us not just what users do, but why they do it. Understanding these patterns allows us to create better user experiences and make data-driven product decisions.\n\nThe challenge isn't collecting data - modern analytics tools make that relatively easy. The real challenge is extracting meaningful insights from the noise and translating those insights into actionable improvements.`,category: 'data-analytics',date: '2024-12-22',readTime: 9,image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',slug: 'user-behavior-data-analysis',
      author: {
        name: 'Saniya',role: 'Data Storyteller',avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
      },
      tags: ['User Analytics', 'Behavior Analysis', 'Product Development', 'Data Science']
    }
  ];

  useEffect(() => {
    let filtered = blogPosts;

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered?.filter(post => post?.category === activeCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered?.filter(post =>
        post?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        post?.excerpt?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        post?.tags?.some(tag => tag?.toLowerCase()?.includes(searchTerm?.toLowerCase()))
      );
    }

    setFilteredPosts(filtered);
  }, [searchTerm, activeCategory]);

  const featuredPost = blogPosts?.find(post => post?.featured);
  const regularPosts = filteredPosts?.filter(post => !post?.featured);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Insights & Professional Blog - Saniya Portfolio</title>
        <meta name="description" content="Data analytics insights, development tutorials, and career advice from a BCA graduate turned data storyteller. Learn from real-world experiences and practical guides." />
        <meta name="keywords" content="data analytics blog, BCA graduate, full-stack development, career advice, SQL tutorials, React development, data visualization" />
      </Helmet>
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-brand text-white py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center space-x-2 bg-white/10 rounded-full px-4 py-2 mb-6">
                <Icon name="BookOpen" size={20} />
                <span className="text-sm font-medium">Professional Insights</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Insights & Learning
              </h1>
              
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Sharing knowledge on data analytics, development best practices, and career insights 
                from my journey as a BCA graduate in the tech industry.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="flex items-center space-x-2 text-white/80">
                  <Icon name="FileText" size={20} />
                  <span>24 Articles Published</span>
                </div>
                <div className="flex items-center space-x-2 text-white/80">
                  <Icon name="Users" size={20} />
                  <span>12.5K Monthly Readers</span>
                </div>
                <div className="flex items-center space-x-2 text-white/80">
                  <Icon name="Download" size={20} />
                  <span>5.2K Resource Downloads</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-12 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <SearchBar
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  placeholder="Search articles, tutorials, and insights..."
                />
              </div>
              
              <CategoryFilter
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
            </div>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-text-primary mb-4">Featured Article</h2>
                <p className="text-text-secondary max-w-2xl mx-auto">
                  In-depth insights and practical guidance from real-world experience
                </p>
              </div>
              
              <div className="max-w-4xl mx-auto">
                <BlogCard post={featuredPost} featured={true} />
              </div>
            </div>
          </section>
        )}

        {/* Main Content Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Articles Grid */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-text-primary">
                    {searchTerm ? `Search Results (${regularPosts?.length})` : 'Latest Articles'}
                  </h2>
                  
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm('')}
                      className="text-primary hover:text-accent transition-colors duration-200 text-sm font-medium"
                    >
                      Clear Search
                    </button>
                  )}
                </div>

                {regularPosts?.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {regularPosts?.map((post) => (
                      <BlogCard key={post?.id} post={post} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                      <Icon name="Search" size={32} className="text-text-muted" />
                    </div>
                    <h3 className="text-xl font-semibold text-text-primary mb-2">No articles found</h3>
                    <p className="text-text-secondary mb-6">
                      Try adjusting your search terms or browse different categories
                    </p>
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setActiveCategory('all');
                      }}
                      className="text-primary hover:text-accent transition-colors duration-200 font-medium"
                    >
                      View All Articles
                    </button>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                <AuthorCard />
                <RecentPosts />
                <NewsletterSignup />
              </div>
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <FeaturedResources />
          </div>
        </section>

        {/* Speaking & Collaboration */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="bg-surface rounded-2xl p-12 border border-border text-center">
              <div className="max-w-3xl mx-auto">
                <div className="w-16 h-16 bg-gradient-brand rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name="Mic" size={32} className="text-white" />
                </div>
                
                <h2 className="text-3xl font-bold text-text-primary mb-4">
                  Speaking & Collaboration
                </h2>
                
                <p className="text-text-secondary text-lg mb-8 leading-relaxed">
                  I'm available for speaking engagements, guest posts, and collaborative projects. 
                  Let's share knowledge and build something meaningful together.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Icon name="Users" size={24} className="text-primary" />
                    </div>
                    <h3 className="font-semibold text-text-primary mb-1">Speaking</h3>
                    <p className="text-sm text-text-secondary">Tech conferences & meetups</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Icon name="PenTool" size={24} className="text-secondary" />
                    </div>
                    <h3 className="font-semibold text-text-primary mb-1">Guest Posts</h3>
                    <p className="text-sm text-text-secondary">Industry publications</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Icon name="Handshake" size={24} className="text-accent" />
                    </div>
                    <h3 className="font-semibold text-text-primary mb-1">Collaboration</h3>
                    <p className="text-sm text-text-secondary">Joint projects & research</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <a
                    href="mailto:saniya@example.com"
                    className="inline-flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200"
                  >
                    <Icon name="Mail" size={18} />
                    <span>Get in Touch</span>
                  </a>
                  
                  <a
                    href="#"
                    className="inline-flex items-center space-x-2 bg-surface border border-border text-text-primary px-6 py-3 rounded-lg font-medium hover:bg-muted transition-colors duration-200"
                  >
                    <Icon name="Calendar" size={18} />
                    <span>Schedule Call</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-lg font-mono">S</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Saniya</h3>
                <p className="text-sm text-primary-foreground/80">Data Storyteller</p>
              </div>
            </div>
            
            <p className="text-primary-foreground/80 mb-6">
              Transforming data into insights, building meaningful digital experiences
            </p>
            
            <div className="flex items-center justify-center space-x-6 mb-8">
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200">
                <Icon name="Linkedin" size={20} />
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200">
                <Icon name="Github" size={20} />
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200">
                <Icon name="Twitter" size={20} />
              </a>
              <a href="mailto:saniya@example.com" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200">
                <Icon name="Mail" size={20} />
              </a>
            </div>
            
            <div className="border-t border-primary-foreground/20 pt-6">
              <p className="text-primary-foreground/60 text-sm">
                © {new Date()?.getFullYear()} Saniya. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default InsightsProfessionalBlog;
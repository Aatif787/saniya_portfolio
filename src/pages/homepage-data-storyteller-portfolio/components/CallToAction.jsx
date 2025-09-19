import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CallToAction = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e?.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail('');
    }, 1500);
  };

  const quickActions = [
    {
      title: "View Portfolio",
      description: "Explore detailed case studies and project outcomes",
      icon: "FolderOpen",
      link: "/project-case-studies-portfolio",
      color: "bg-blue-500"
    },
    {
      title: "Download Resume",
      description: "Get comprehensive professional documentation",
      icon: "Download", 
      action: () => window.open('/assets/resume.pdf', '_blank'),
      color: "bg-green-500"
    },
    {
      title: "Schedule Call",
      description: "Book a consultation to discuss your project",
      icon: "Calendar",
      action: () => window.open('mailto:saniya@example.com?subject=Project Consultation', '_blank'),
      color: "bg-purple-500"
    }
  ];

  const contactMethods = [
    {
      platform: "Email",
      handle: "saniya@example.com",
      icon: "Mail",
      link: "mailto:saniya@example.com"
    },
    {
      platform: "LinkedIn", 
      handle: "/in/saniya-portfolio",
      icon: "Linkedin",
      link: "https://linkedin.com/in/saniya-portfolio"
    },
    {
      platform: "GitHub",
      handle: "/saniya-portfolio", 
      icon: "Github",
      link: "https://github.com/saniya-portfolio"
    },
    {
      platform: "Phone",
      handle: "+91 98765 43210",
      icon: "Phone",
      link: "tel:+919876543210"
    }
  ];

  return (
    <section className="py-20 bg-gradient-brand text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border border-white/20 rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-32 right-1/3 w-24 h-24 border border-white/20 rounded-full"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-5xl font-bold mb-6 leading-tight">
              Ready to Transform Your Data into 
              <span className="text-accent"> Success Stories</span>?
            </h2>
            
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Let's collaborate to turn your business challenges into data-driven solutions. Whether you need analytics insights or web development expertise, I'm here to help.
            </p>

            {/* Quick Actions */}
            <div className="space-y-4 mb-8">
              {quickActions?.map((action, index) => (
                <motion.div
                  key={action?.title}
                  className="flex items-center space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-200 cursor-pointer"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={action?.action}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className={`w-12 h-12 ${action?.color} rounded-lg flex items-center justify-center`}>
                    <Icon name={action?.icon} size={20} color="white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1">{action?.title}</h3>
                    <p className="text-white/80 text-sm">{action?.description}</p>
                  </div>
                  <Icon name="ArrowRight" size={20} className="text-white/60" />
                </motion.div>
              ))}
            </div>

            {/* Contact Methods */}
            <motion.div 
              className="grid grid-cols-2 gap-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {contactMethods?.map((method) => (
                <a
                  key={method?.platform}
                  href={method?.link}
                  target={method?.platform !== 'Email' && method?.platform !== 'Phone' ? '_blank' : undefined}
                  rel={method?.platform !== 'Email' && method?.platform !== 'Phone' ? 'noopener noreferrer' : undefined}
                  className="flex items-center space-x-3 p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-200"
                >
                  <Icon name={method?.icon} size={16} />
                  <div>
                    <p className="text-white/80 text-xs">{method?.platform}</p>
                    <p className="text-white font-medium text-sm">{method?.handle}</p>
                  </div>
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Newsletter & CTA */}
          <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {!isSubscribed ? (
              <>
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Mail" size={24} color="white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Stay Updated
                  </h3>
                  <p className="text-white/80">
                    Get the latest insights on data analytics, web development trends, 
                    and exclusive project case studies delivered to your inbox.
                  </p>
                </div>

                <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e?.target?.value)}
                    required
                    className="bg-white/20 border-white/30 text-white placeholder-white/60"
                  />
                  
                  <Button
                    type="submit"
                    variant="secondary"
                    fullWidth
                    loading={isLoading}
                    iconName="Send"
                    iconPosition="right"
                    disabled={!email}
                  >
                    Subscribe to Newsletter
                  </Button>
                </form>

                <div className="mt-6 pt-6 border-t border-white/20">
                  <p className="text-white/60 text-sm text-center mb-4">
                    Or connect directly:
                  </p>
                  
                  <div className="flex justify-center space-x-4">
                    <Link to="/project-case-studies-portfolio">
                      <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/20">
                        View Projects
                      </Button>
                    </Link>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="border-white/30 text-white hover:bg-white/20"
                      onClick={() => window.open('mailto:saniya@example.com', '_blank')}
                    >
                      Send Message
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <motion.div 
                className="text-center py-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Check" size={24} color="white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Welcome Aboard!
                </h3>
                <p className="text-white/80 mb-6">
                  Thank you for subscribing! You'll receive valuable insights and updates 
                  about data analytics and web development.
                </p>
                
                <div className="space-y-3">
                  <Link to="/insights-professional-blog">
                    <Button variant="secondary" fullWidth>
                      Read Latest Articles
                    </Button>
                  </Link>
                  
                  <Button 
                    variant="outline" 
                    fullWidth
                    className="border-white/30 text-white hover:bg-white/20"
                    onClick={() => window.open('mailto:saniya@example.com', '_blank')}
                  >
                    Start a Conversation
                  </Button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Bottom Stats */}
        <motion.div 
          className="mt-16 pt-16 border-t border-white/20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-accent mb-2">24h</p>
              <p className="text-white/80 text-sm">Response Time</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-accent mb-2">100%</p>
              <p className="text-white/80 text-sm">Project Success</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-accent mb-2">15+</p>
              <p className="text-white/80 text-sm">Happy Clients</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-accent mb-2">3+</p>
              <p className="text-white/80 text-sm">Years Experience</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
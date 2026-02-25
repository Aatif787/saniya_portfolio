import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CallToAction = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSending, setContactSending] = useState(false);
  const [contactStatus, setContactStatus] = useState(null);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail('');
    }, 1500);
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;
    setContactSending(true);
    setContactStatus(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: contactName, email: contactEmail, message: contactMessage })
      });
      const data = await res.json();
      if (res.ok) {
        setContactStatus('Message sent successfully');
        setContactName('');
        setContactEmail('');
        setContactMessage('');
      } else {
        setContactStatus(data?.error || 'Failed to send message');
      }
    } catch (err) {
      setContactStatus('Network error');
    } finally {
      setContactSending(false);
    }
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
      action: () => window.open('/assets/images/resume.pdf', '_blank'),
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
      handle: "+91 88649 31247",
      icon: "Phone",
      link: "tel:+918864931247"
    }
  ];

  return (
    <section className="py-12 sm:py-20 bg-gradient-brand text-white relative overflow-hidden w-full">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 border border-white/20 rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 border border-white/20 rounded-full"></div>
        <div className="absolute bottom-32 right-1/3 w-24 h-24 border border-white/20 rounded-full"></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 items-start lg:items-center">
          
          {/* Left Content */}
          <motion.div
            className="w-full max-w-full overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight break-words">
              Ready to Transform Your Data into 
              <span className="text-accent"> Success Stories</span>?
            </h2>
            
            <p className="text-base sm:text-xl text-white/90 mb-6 sm:mb-8 leading-relaxed break-words">
              Let's collaborate to turn your business challenges into data-driven solutions. Whether you need analytics insights or web development expertise, I'm here to help.
            </p>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {quickActions?.map((action, index) => (
                <motion.div
                  key={action?.title}
                  className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-200 cursor-pointer group"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  onClick={action?.action || (() => window.location.href = action.link)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 ${action?.color} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <Icon name={action?.icon} size={18} color="white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white text-sm sm:text-base mb-0.5 truncate">{action?.title}</h3>
                    <p className="text-white/70 text-[10px] sm:text-xs truncate">{action?.description}</p>
                  </div>
                  <Icon name="ArrowRight" size={16} className="text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all flex-shrink-0" />
                </motion.div>
              ))}
            </div>

            {/* Contact Methods */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
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
                  className="flex items-center space-x-3 p-3 bg-white/10 rounded-xl border border-white/10 hover:bg-white/20 transition-all duration-200 group overflow-hidden"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Icon name={method?.icon} size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white/60 text-[10px] uppercase tracking-wider font-bold mb-0.5">{method?.platform}</p>
                    <p className="text-white font-medium text-xs sm:text-sm truncate break-all">{method?.handle}</p>
                  </div>
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Newsletter & CTA */}
          <motion.div
            className="w-full bg-white/10 backdrop-blur-md rounded-3xl p-5 sm:p-8 border border-white/20 shadow-2xl relative overflow-hidden group"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 blur-3xl -mr-16 -mt-16 rounded-full group-hover:bg-accent/30 transition-colors"></div>
            {!isSubscribed ? (
              <>
                <div className="text-center mb-8 relative z-10">
                  <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-4 rotate-3 group-hover:rotate-0 transition-transform shadow-lg">
                    <Icon name="Mail" size={24} color="white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Stay Updated
                  </h3>
                  <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                    Get the latest insights on data analytics, web development trends, 
                    and exclusive project case studies delivered to your inbox.
                  </p>
                </div>

                <form onSubmit={handleNewsletterSubmit} className="space-y-4 relative z-10">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e?.target?.value)}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder-white/50 h-12 focus:bg-white/20"
                  />
                  
                  <Button
                    type="submit"
                    variant="secondary"
                    fullWidth
                    loading={isLoading}
                    iconName="Send"
                    iconPosition="right"
                    disabled={!email}
                    className="h-12 shadow-brand"
                  >
                    Subscribe Now
                  </Button>
                </form>

                <div className="mt-8 pt-8 border-t border-white/10 relative z-10">
                  <p className="text-white/60 text-xs sm:text-sm text-center mb-6 uppercase tracking-widest font-bold">
                    Quick Connect
                  </p>
                  
                  <form onSubmit={handleContactSubmit} className="grid grid-cols-1 gap-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        type="text"
                        placeholder="Your name"
                        value={contactName}
                        onChange={(e) => setContactName(e?.target?.value)}
                        required
                        className="bg-white/10 border-white/20 text-white placeholder-white/50 h-11"
                      />
                      <Input
                        type="email"
                        placeholder="Your email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e?.target?.value)}
                        required
                        className="bg-white/10 border-white/20 text-white placeholder-white/50 h-11"
                      />
                    </div>
                    <textarea
                      placeholder="How can I help you?"
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e?.target?.value)}
                      required
                      className="w-full min-h-[100px] rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 p-3 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all text-sm"
                    />
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <Button
                        type="submit"
                        variant="default"
                        fullWidth
                        loading={contactSending}
                        iconName="MessageSquare"
                        iconPosition="left"
                        className="h-11 bg-white text-primary hover:bg-white/90"
                      >
                        Send Message
                      </Button>
                    </div>
                    {contactStatus && (
                      <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-center font-medium text-accent"
                      >
                        {contactStatus}
                      </motion.p>
                    )}
                  </form>
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

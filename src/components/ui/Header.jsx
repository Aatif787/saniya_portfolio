import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Home', path: '/homepage-data-storyteller-portfolio', icon: 'Home' },
    { name: 'About', path: '/about-professional-journey', icon: 'User' },
    { name: 'Skills', path: '/skills-interactive-capabilities', icon: 'Code' },
    { name: 'Projects', path: '/project-case-studies-portfolio', icon: 'FolderOpen' },
    { name: 'Blog', path: '/insights-professional-blog', icon: 'BookOpen' }
  ];

  const secondaryItems = [
    { name: 'Resume', path: '/professional-assets-resume-hub', icon: 'FileText' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
        when: "afterChildren"
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled 
          ? 'glass-nav py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/homepage-data-storyteller-portfolio" 
            className="flex items-center space-x-3 group"
            onClick={closeMenu}
          >
            <div className="relative">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-animated rounded-xl flex items-center justify-center animate-glow group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-xl sm:text-2xl font-mono">S</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-accent rounded-full animate-bounce-slow"></div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg sm:text-[23px] font-bold text-gradient-rainbow whitespace-nowrap tracking-tight">Saniya Dhada</h1>
              <p className="text-[10px] sm:text-sm text-text-secondary font-mono animate-pulse-slow leading-none">Data Storyteller</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover-lift ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground shadow-brand'
                    : 'text-text-secondary hover:text-primary hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.name}</span>
              </Link>
            ))}
            
            {/* More Menu */}
            <div className="relative group">
              <button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-primary hover:bg-muted transition-all duration-200">
                <Icon name="MoreHorizontal" size={16} />
                <span>More</span>
              </button>
              
              <div className="absolute top-full right-0 mt-2 w-48 bg-surface border border-border rounded-lg shadow-brand-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {secondaryItems?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    className={`flex items-center space-x-3 px-4 py-3 text-sm hover:bg-muted transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg ${
                      isActivePath(item?.path)
                        ? 'text-primary bg-muted' :'text-text-secondary'
                    }`}
                  >
                    <Icon name={item?.icon} size={16} />
                    <span>{item?.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm"
              iconName="Download"
              iconPosition="left"
              onClick={() => window.open("/assets/images/resume.pdf", '_blank')}
            >
              Resume
            </Button>
            <Button 
              variant="default" 
              size="sm"
              iconName="MessageCircle"
              iconPosition="left"
              onClick={() => window.open('mailto:saniyadhada71@gmail.com', '_blank')}
            >
              Let's Talk
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleMenu}
            className="lg:hidden p-2 sm:p-3 rounded-xl text-text-secondary hover:text-primary hover:bg-muted transition-colors duration-200 relative z-[110]"
            aria-label="Toggle menu"
          >
            <Icon name={isMenuOpen ? "X" : "Menu"} size={24} />
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="lg:hidden fixed inset-0 z-[105] bg-surface/95 backdrop-blur-xl overflow-y-auto"
            >
              <div className="flex flex-col min-h-screen pt-24 pb-8 px-6">
                <nav className="flex-1 space-y-2">
                  {[...navigationItems, ...secondaryItems]?.map((item, index) => (
                    <motion.div
                      key={item?.path}
                      variants={itemVariants}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        to={item?.path}
                        onClick={closeMenu}
                        className={`flex items-center space-x-4 px-6 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 ${
                          isActivePath(item?.path)
                            ? 'bg-primary text-primary-foreground shadow-brand-lg scale-[1.02]'
                            : 'text-text-secondary hover:text-primary hover:bg-muted'
                        }`}
                      >
                        <div className={`p-2 rounded-xl ${isActivePath(item?.path) ? 'bg-white/20' : 'bg-muted'}`}>
                          <Icon name={item?.icon} size={22} />
                        </div>
                        <span>{item?.name}</span>
                        {isActivePath(item?.path) && (
                          <motion.div 
                            layoutId="activeIndicator"
                            className="ml-auto w-2 h-2 bg-white rounded-full"
                          />
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </nav>
                
                {/* Mobile CTA Buttons */}
                <motion.div 
                  variants={itemVariants}
                  transition={{ delay: (navigationItems.length + secondaryItems.length) * 0.05 }}
                  className="mt-8 pt-8 border-t border-border space-y-4"
                >
                  <Button 
                    variant="outline" 
                    fullWidth
                    size="lg"
                    iconName="Download"
                    iconPosition="left"
                    className="h-14 rounded-2xl border-2"
                    onClick={() => {
                      window.open('/assets/images/resume.pdf', '_blank');
                      closeMenu();
                    }}
                  >
                    Download Resume
                  </Button>
                  <Button 
                    variant="default" 
                    fullWidth
                    size="lg"
                    iconName="MessageCircle"
                    iconPosition="left"
                    className="h-14 rounded-2xl shadow-brand-lg"
                    onClick={() => {
                      window.open('mailto:saniyadhada71@gmail.com', '_blank');
                      closeMenu();
                    }}
                  >
                    Let's Talk
                  </Button>
                </motion.div>

                {/* Social Links Mobile */}
                <motion.div 
                  variants={itemVariants}
                  transition={{ delay: (navigationItems.length + secondaryItems.length + 2) * 0.05 }}
                  className="mt-8 flex justify-center space-x-6"
                >
                  {[
                    { href: "https://www.linkedin.com/in/saniya-dhada-618311326?", icon: "Linkedin" },
                    { href: "https://github.com/Saniyyadhada06", icon: "Github" },
                    { href: "mailto:saniyadhada71@gmail.com", icon: "Mail" }
                  ].map((social, i) => (
                    <a 
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-muted rounded-xl text-text-secondary hover:text-primary transition-colors"
                    >
                      <Icon name={social.icon} size={24} />
                    </a>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;

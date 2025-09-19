import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-surface/95 backdrop-blur-md shadow-brand border-b border-border' 
          : 'bg-transparent'
      }`}
    >
      <div className="w-full">
        <div className="flex items-center justify-between h-16 px-6 lg:px-8">
          {/* Logo */}
          <Link 
            to="/homepage-data-storyteller-portfolio" 
            className="flex items-center space-x-3 hover:opacity-80 transition-all duration-300 hover:scale-105"
            onClick={closeMenu}
          >
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-animated rounded-xl flex items-center justify-center animate-glow">
                <span className="text-white font-bold text-2xl font-mono">S</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full animate-bounce-slow"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-3xl font-bold text-gradient-rainbow">Saniya Dhada</h1>
              <p className="text-sm text-text-secondary font-mono animate-pulse-slow">Data Storyteller</p>
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
              onClick={() => window.open('mailto:saniya@example.com', '_blank')}
            >
              Let's Talk
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 rounded-lg text-text-secondary hover:text-primary hover:bg-muted transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <Icon name={isMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`lg:hidden transition-all duration-300 ease-brand ${
            isMenuOpen 
              ? 'max-h-screen opacity-100' :'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="bg-surface border-t border-border px-6 py-4">
            <nav className="space-y-2">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={closeMenu}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActivePath(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-text-secondary hover:text-primary hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.name}</span>
                </Link>
              ))}
              
              {secondaryItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={closeMenu}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActivePath(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-text-secondary hover:text-primary hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.name}</span>
                </Link>
              ))}
            </nav>
            
            {/* Mobile CTA Buttons */}
            <div className="mt-6 pt-4 border-t border-border space-y-3">
              <Button 
                variant="outline" 
                fullWidth
                iconName="Download"
                iconPosition="left"
                onClick={() => {
                  window.open('/assets/resume.pdf', '_blank');
                  closeMenu();
                }}
              >
                Download Resume
              </Button>
              <Button 
                variant="default" 
                fullWidth
                iconName="MessageCircle"
                iconPosition="left"
                onClick={() => {
                  window.open('mailto:saniyadhada71@gmail.com', '_blank');
                  closeMenu();
                }}
              >
                Let's Talk
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
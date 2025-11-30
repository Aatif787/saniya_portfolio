import React, { useEffect } from 'react';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import TimelineSection from './components/TimelineSection';
import PhilosophySection from './components/PhilosophySection';
import SkillsLabSection from './components/SkillsLabSection';
import BehindScenesSection from './components/BehindScenesSection';
import ResourcesSection from './components/ResourcesSection';

const AboutProfessionalJourney = () => {
  useEffect(() => {
    // Set page title
    document.title = 'About & Professional Journey - Saniya | Data Storyteller & Digital Craftsperson';
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription?.setAttribute('content', 
        'Discover Saniya\'s journey from BCA graduate to Data Storyteller & Digital Craftsperson. Learn about her philosophy, skills, and approach to bridging analytical rigor with user-centric design.'
      );
    }

    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-transparent about-page">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-transparent rounded-3xl p-6 sm:p-8 shadow-none border-none backdrop-blur-0">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Professional Timeline */}
        <TimelineSection />
        
        {/* Philosophy & Approach */}
        <PhilosophySection />
        
        {/* Skills Laboratory */}
        <SkillsLabSection />
        
        {/* Behind the Scenes */}
        <BehindScenesSection />
        
        {/* Professional Resources */}
        <ResourcesSection />
        </div>
      </main>
      {/* Footer */}
      <footer className="py-12 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-transparent rounded-3xl p-6 shadow-none border-none backdrop-blur-0">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                  <span className="text-accent-foreground font-bold text-lg font-mono">S</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold">Saniya</h3>
                  <p className="text-sm opacity-80">Data Storyteller</p>
                </div>
              </div>
              <p className="text-sm opacity-80 leading-relaxed">
                Transforming complex data into meaningful insights and crafting digital experiences 
                that bridge analytical rigor with user-centric design.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <a href="/homepage-data-storyteller-portfolio" className="block opacity-80 hover:opacity-100 transition-opacity">
                  Home
                </a>
                <a href="/skills-interactive-capabilities" className="block opacity-80 hover:opacity-100 transition-opacity">
                  Skills
                </a>
                <a href="/project-case-studies-portfolio" className="block opacity-80 hover:opacity-100 transition-opacity">
                  Projects
                </a>
                <a href="/professional-assets-resume-hub" className="block opacity-80 hover:opacity-100 transition-opacity">
                  Resume
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Get In Touch</h4>
              <div className="space-y-2 text-sm">
                <p className="opacity-80">saniya@example.com</p>
                <p className="opacity-80">+91 98765 43210</p>
                <p className="opacity-80">Available for new opportunities</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm opacity-80">
            <p>&copy; {new Date()?.getFullYear()} Saniya. All rights reserved. Built with passion for data and design.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutProfessionalJourney;

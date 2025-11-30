import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import SkillsPreview from './components/SkillsPreview';
import FeaturedProjects from './components/FeaturedProjects';
import LatestInsights from './components/LatestInsights';
import SocialProof from './components/SocialProof';
import CallToAction from './components/CallToAction';

const Homepage = () => {
  useEffect(() => {
    // Smooth scroll behavior for anchor links
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Saniya - Data Storyteller & Full-Stack Developer | Portfolio</title>
        <meta 
          name="description" 
          content="BCA graduate specializing in data analytics and full-stack development. Transforming data into decisions and building solutions that matter. View portfolio, projects, and insights." 
        />
        <meta 
          name="keywords" 
          content="data analyst, full-stack developer, BCA graduate, React developer, Python analytics, portfolio, data visualization, web development" 
        />
        <meta name="author" content="Saniya" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Saniya - Data Storyteller & Developer Portfolio" />
        <meta property="og:description" content="Transforming data into decisions, building solutions that matter. Explore my journey in data analytics and web development." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://saniya-portfolio.com" />
        <meta property="og:image" content="https://saniya-portfolio.com/assets/og-image.jpg" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Saniya - Data Storyteller & Developer" />
        <meta name="twitter:description" content="BCA graduate specializing in data analytics and full-stack development" />
        <meta name="twitter:image" content="https://saniya-portfolio.com/assets/twitter-image.jpg" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Saniya",
            "jobTitle": "Data Analyst & Full-Stack Developer",
            "description": "BCA graduate specializing in data analytics and web development",
            "url": "https://saniya-portfolio.com",
            "sameAs": [
              "https://linkedin.com/in/saniya-portfolio",
              "https://github.com/saniya-portfolio"
            ],
            "knowsAbout": [
              "Data Analytics",
              "Web Development", 
              "React",
              "Python",
              "SQL",
              "Tableau"
            ],
            "alumniOf": {
              "@type": "EducationalOrganization",
              "name": "University of Technology"
            }
          })}
        </script>
      </Helmet>
      <div className="min-h-screen bg-transparent">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main>
          {/* Hero Section */}
          <HeroSection />

          {/* Skills Preview */}
          <SkillsPreview />

          {/* Featured Projects */}
          <FeaturedProjects />

          {/* Latest Insights */}
          <LatestInsights />

          {/* Social Proof */}
          <SocialProof />

          {/* Call to Action */}
          <CallToAction />
        </main>

        {/* Footer */}
        <footer className="py-12 bg-transparent">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 glass-section rounded-3xl p-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Brand */}
              <div className="lg:col-span-2">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                    <span className="text-accent-foreground font-bold text-lg font-mono">S</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Saniya</h3>
                    <p className="text-sm text-primary-foreground/80 font-mono">Data Storyteller</p>
                  </div>
                </div>
                <p className="text-primary-foreground/80 mb-4 max-w-md">
                  Transforming complex data into actionable insights and building digital solutions 
                  that drive real business impact. Let's create something amazing together.
                </p>
                <div className="flex space-x-4">
                  <a 
                    href="https://www.linkedin.com/in/saniya-dhada-618311326?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary-foreground/60 hover:text-primary-foreground transition-colors duration-200"
                  >
                    <span className="sr-only">LinkedIn</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a 
                    href="https://github.com/Saniyyadhada06" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary-foreground/60 hover:text-primary-foreground transition-colors duration-200"
                  >
                    <span className="sr-only">GitHub</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a 
                    href="mailto:saniyadhada71@gmail.com"
                    className="text-primary-foreground/60 hover:text-primary-foreground transition-colors duration-200"
                  >
                    <span className="sr-only">Email</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="/about-professional-journey" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200">
                      About Me
                    </a>
                  </li>
                  <li>
                    <a href="/project-case-studies-portfolio" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200">
                      Projects
                    </a>
                  </li>
                  <li>
                    <a href="/skills-interactive-capabilities" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200">
                      Skills
                    </a>
                  </li>
                  <li>
                    <a href="/insights-professional-blog" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200">
                      Blog
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="font-semibold mb-4">Get in Touch</h4>
                <ul className="space-y-2 text-sm text-primary-foreground/80">
                  <li>saniyadhada71@gmail.com</li>
                  <li>+91 8269668885</li>
                  <li>Available for freelance</li>
                  <li>Remote & On-site</li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-8 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center">
              <p className="text-text-secondary text-sm">
                © {new Date()?.getFullYear()} Saniya. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="/privacy" className="text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors duration-200">
                  Privacy Policy
                </a>
                <a href="/terms" className="text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors duration-200">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Homepage;

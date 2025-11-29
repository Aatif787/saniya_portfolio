import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ProfessionalAssetsResumeHub from './pages/professional-assets-resume-hub';
import AboutProfessionalJourney from './pages/about-professional-journey';
import InsightsProfessionalBlog from './pages/insights-professional-blog';
import ProjectCaseStudiesPortfolio from './pages/project-case-studies-portfolio';
import Homepage from './pages/homepage-data-storyteller-portfolio';
import SkillsInteractiveCapabilities from './pages/skills-interactive-capabilities';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AboutProfessionalJourney />} />
        <Route path="/professional-assets-resume-hub" element={<ProfessionalAssetsResumeHub />} />
        <Route path="/about-professional-journey" element={<AboutProfessionalJourney />} />
        <Route path="/insights-professional-blog" element={<InsightsProfessionalBlog />} />
        <Route path="/project-case-studies-portfolio" element={<ProjectCaseStudiesPortfolio />} />
        <Route path="/homepage-data-storyteller-portfolio" element={<Homepage />} />
        <Route path="/skills-interactive-capabilities" element={<SkillsInteractiveCapabilities />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;

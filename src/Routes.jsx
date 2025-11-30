import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes as RouterRoutes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import ScrollToTop from "components/ScrollToTop";
import ThreeBackground from "components/ThreeBackground";
import ErrorBoundary from "components/ErrorBoundary";
const Homepage = lazy(() => import('./pages/homepage-data-storyteller-portfolio'));
const AboutProfessionalJourney = lazy(() => import('./pages/about-professional-journey'));
const ProfessionalAssetsResumeHub = lazy(() => import('./pages/professional-assets-resume-hub'));
const InsightsProfessionalBlog = lazy(() => import('./pages/insights-professional-blog'));
const ProjectCaseStudiesPortfolio = lazy(() => import('./pages/project-case-studies-portfolio'));
const SkillsInteractiveCapabilities = lazy(() => import('./pages/skills-interactive-capabilities'));
const NotFound = lazy(() => import('pages/NotFound'));

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <ScrollToTop />
        <RouterRoutes location={location}>
          <Route path="/" element={<AboutProfessionalJourney />} />
          <Route path="/professional-assets-resume-hub" element={<ProfessionalAssetsResumeHub />} />
          <Route path="/about-professional-journey" element={<AboutProfessionalJourney />} />
          <Route path="/insights-professional-blog" element={<InsightsProfessionalBlog />} />
          <Route path="/project-case-studies-portfolio" element={<ProjectCaseStudiesPortfolio />} />
          <Route path="/homepage-data-storyteller-portfolio" element={<Homepage />} />
          <Route path="/skills-interactive-capabilities" element={<SkillsInteractiveCapabilities />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </motion.div>
    </AnimatePresence>
  );
};

const Routes = () => {
  return (
    <BrowserRouter>
      <ThreeBackground />
      <ErrorBoundary>
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-primary">Loading…</div>}>
          <AnimatedRoutes />
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;

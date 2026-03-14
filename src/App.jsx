import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Routes from "./Routes";
import { BrowserRouter } from "react-router-dom";
import MusicController from "./components/effects/MusicController";
import ErrorBoundary from "./components/ErrorBoundary";
import ViewportBorder from "./components/effects/ViewportBorder";
import PremiumEnhancements from "./components/effects/PremiumEnhancements";

function GlobalLoader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[10000] bg-[#0b0e1a] flex flex-col items-center justify-center"
    >
      <div className="relative">
        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        <div className="mt-4 text-primary font-mono text-sm tracking-widest animate-pulse">
          LOADING_SYSTEM...
        </div>
      </div>
    </motion.div>
  );
}

function MainLayout() {
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsInitializing(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <AnimatePresence>
        {isInitializing && <GlobalLoader key="loader" />}
      </AnimatePresence>
      <MusicController />

      <motion.div
        className="relative glass-content"
        style={{ zIndex: 10 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isInitializing ? 0 : 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <ViewportBorder />
        <PremiumEnhancements />
        <ErrorBoundary>
          <Routes />
        </ErrorBoundary>
      </motion.div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
}

export default App;

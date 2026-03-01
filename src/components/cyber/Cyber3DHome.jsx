import React, { Suspense, lazy, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { portfolioData } from "@/data/portfolioData";

import LatestInsights from "@/pages/homepage-data-storyteller-portfolio/components/LatestInsights";
import SocialProof from "@/pages/homepage-data-storyteller-portfolio/components/SocialProof";

const ArmoryOfCreation = lazy(() => import("./ArmoryOfCreation"));
const RobotCompanion = lazy(() => import("./RobotCompanion"));

const Cyber3DHome = () => {
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSending, setContactSending] = useState(false);
  const [contactStatus, setContactStatus] = useState(null);

  const skillTags = useMemo(() => {
    if (!portfolioData?.skills) return [];
    const tags = portfolioData.skills.flatMap((group) => group?.skills || []);
    return tags.map((skill, index) => ({
      ...skill,
      key: `${skill?.name || 'skill'}-${index}`
    }));
  }, []);


  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;
    setContactSending(true);
    setContactStatus(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          message: contactMessage
        })
      });
      const data = await res.json();
      if (res.ok) {
        setContactStatus(portfolioData.labels.contactForm.success);
        setContactName("");
        setContactEmail("");
        setContactMessage("");
      } else {
        setContactStatus(data?.error || portfolioData.labels.contactForm.failure);
      }
    } catch (err) {
      setContactStatus(portfolioData.labels.contactForm.network);
    } finally {
      setContactSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-white">
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,242,255,0.15),transparent_45%)]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 pt-28 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center px-4 py-2 border border-cyan-400/40 rounded-full text-xs tracking-[0.4em] uppercase text-cyan-300 mb-6 cyber-glass">
              {portfolioData.labels.heroKicker}
            </div>
            <div className="cyber-glass neon-border rounded-3xl px-6 sm:px-10 py-10 sm:py-12">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold neon-text tracking-tight mb-4">
                {portfolioData.name}
              </h1>
              <p className="text-xl sm:text-2xl text-cyan-100/70 font-medium">
                {portfolioData.role}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="cyber-glass rounded-3xl p-8 sm:p-10 border border-cyan-400/20 shadow-[0_0_30px_rgba(0,242,255,0.15)]">
            <h2 className="text-3xl sm:text-4xl font-semibold neon-text mb-6">
              {portfolioData.labels.aboutTitle}
            </h2>
            <p className="text-cyan-100/70 leading-relaxed text-base sm:text-lg">
              {portfolioData.about}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-semibold neon-text mb-4">
              {portfolioData.labels.skillsTitle}
            </h2>
            <p className="text-cyan-100/60 max-w-3xl mx-auto">
              {portfolioData.labels.skillsSubtitle}
            </p>
          </div>
          <div className="cyber-glass rounded-3xl p-6 sm:p-10 border border-cyan-400/20 perspective-[1200px]">
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {skillTags.map((skill, index) => (
                <motion.span
                  key={skill.key}
                  className="px-4 py-2 text-xs sm:text-sm uppercase tracking-[0.2em] border border-cyan-500/40 text-cyan-200 rounded-full bg-cyan-500/5"
                  animate={{ rotateY: 360 }}
                  transition={{
                    duration: 18 + index,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {skill.name}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ErrorBoundary fallback={<div className="p-10 text-red-500 font-mono">ARMORY_ERROR: DATA_LOAD_FAILED</div>}>
        <Suspense fallback={<div className="h-96 flex items-center justify-center font-mono text-cyan-400 animate-pulse tracking-widest">LOADING_ARMORY...</div>}>
          <ArmoryOfCreation
            projects={portfolioData.projects}
            heading={portfolioData.labels.projectsTitle}
            subheading={portfolioData.labels.projectsSubtitle}
            projectPrefix={portfolioData.labels.projectMeta.prefix}
            projectCta={portfolioData.labels.projectMeta.cta}
          />
        </Suspense>
      </ErrorBoundary>

      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="cyber-glass rounded-3xl p-4 sm:p-8 border border-cyan-400/20">
            <LatestInsights />
          </div>
        </div>
      </section>

      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="cyber-glass rounded-3xl p-4 sm:p-8 border border-cyan-400/20">
            <SocialProof />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="cyber-glass rounded-3xl p-8 sm:p-10 border border-cyan-400/20 shadow-[0_0_30px_rgba(0,242,255,0.15)]">
            <div className="flex items-center justify-between flex-col sm:flex-row gap-4 mb-6">
              <div>
                <h2 className="text-3xl sm:text-4xl font-semibold neon-text mb-2">
                  {portfolioData.labels.contactTitle}
                </h2>
                <p className="text-cyan-300/70 text-xs uppercase tracking-[0.3em]">
                  {portfolioData.labels.contactSubtitle}
                </p>
              </div>
              <div className="text-cyan-200/70 text-sm font-mono">
                {portfolioData.contact.email}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="border border-cyan-500/30 rounded-2xl p-4 bg-cyan-500/5">
                <div className="text-xs text-cyan-400/80 uppercase tracking-[0.3em] mb-2">
                  {portfolioData.labels.contactMeta.channel}
                </div>
                <div className="text-sm text-cyan-100/80">{portfolioData.contact.phone}</div>
              </div>
              <div className="border border-cyan-500/30 rounded-2xl p-4 bg-cyan-500/5">
                <div className="text-xs text-cyan-400/80 uppercase tracking-[0.3em] mb-2">
                  {portfolioData.labels.contactMeta.status}
                </div>
                <div className="text-sm text-cyan-100/80">
                  {portfolioData.contact.availability}
                </div>
              </div>
              <div className="border border-cyan-500/30 rounded-2xl p-4 bg-cyan-500/5 sm:col-span-2">
                <div className="text-xs text-cyan-400/80 uppercase tracking-[0.3em] mb-2">
                  {portfolioData.labels.contactMeta.reach}
                </div>
                <div className="text-sm text-cyan-100/80">
                  {portfolioData.contact.location}
                </div>
              </div>
            </div>

            <form onSubmit={handleContactSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder={portfolioData.labels.contactForm.namePlaceholder}
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                required
                className="w-full rounded-lg bg-black/40 border border-cyan-500/30 text-white placeholder-cyan-200/40 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
              />
              <input
                type="email"
                placeholder={portfolioData.labels.contactForm.emailPlaceholder}
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                required
                className="w-full rounded-lg bg-black/40 border border-cyan-500/30 text-white placeholder-cyan-200/40 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
              />
              <textarea
                placeholder={portfolioData.labels.contactForm.messagePlaceholder}
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                required
                className="sm:col-span-2 min-h-[120px] rounded-lg bg-black/40 border border-cyan-500/30 text-white placeholder-cyan-200/40 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
              />
              <div className="sm:col-span-2 flex flex-col sm:flex-row items-center gap-3">
                <Button
                  type="submit"
                  variant="secondary"
                  fullWidth
                  loading={contactSending}
                  iconName="Send"
                  iconPosition="right"
                >
                  {portfolioData.labels.contactForm.sendLabel}
                </Button>
                {contactStatus && (
                  <span className="text-sm text-cyan-200/80">{contactStatus}</span>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      <footer className="py-16">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="cyber-glass rounded-3xl border border-cyan-500/20">
            <ErrorBoundary fallback={<div className="p-6 text-red-500 font-mono">COMPANION_OFFLINE</div>}>
              <Suspense fallback={<div className="h-40 flex items-center justify-center font-mono text-cyan-400">CONNECTING_TO_COMPANION...</div>}>
                <RobotCompanion
                  labelLine1={portfolioData.labels.robot.line1}
                  labelLine2={portfolioData.labels.robot.line2}
                />
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Cyber3DHome;

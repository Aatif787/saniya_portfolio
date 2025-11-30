export const initScrollReveal = () => {
  if (typeof window === 'undefined') return;
  const elements = Array.from(document.querySelectorAll('.glass-section, .glass-panel'));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  elements.forEach((el) => {
    el.classList.add('scroll-reveal');
    observer.observe(el);
  });
};


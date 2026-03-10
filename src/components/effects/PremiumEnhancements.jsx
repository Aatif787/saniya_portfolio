import { useEffect } from 'react';

/**
 * PremiumEnhancements — Adds 6 subtle premium effects on top of the existing portfolio.
 * 1. Cursor glow (CSS variable driven)
 * 2. Floating background particles (lightweight canvas)
 * 3. Magnetic button effect
 * 4. 3D tilt on profile card
 * 5. Scroll-reveal fade-up
 * 6. Hover glow on interactive elements
 *
 * All effects are purely additive — no existing styles or HTML are modified.
 */
const PremiumEnhancements = () => {
    useEffect(() => {
        // ============================================================
        // 1. CURSOR GLOW — soft radial glow following the mouse
        // ============================================================
        const cursorGlow = document.createElement('div');
        cursorGlow.id = 'premium-cursor-glow';
        Object.assign(cursorGlow.style, {
            position: 'fixed',
            top: '0', left: '0',
            width: '320px', height: '320px',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: '99998',
            background: 'radial-gradient(circle, rgba(168,85,247,0.08) 0%, rgba(99,102,241,0.04) 40%, transparent 70%)',
            transform: 'translate(-50%, -50%)',
            transition: 'opacity 0.3s ease',
            opacity: '0',
            willChange: 'transform',
        });
        document.body.appendChild(cursorGlow);

        let cursorX = 0, cursorY = 0;
        let glowX = 0, glowY = 0;
        let cursorVisible = false;

        const onMouseMove = (e) => {
            cursorX = e.clientX;
            cursorY = e.clientY;
            if (!cursorVisible) { cursorGlow.style.opacity = '1'; cursorVisible = true; }
        };
        const onMouseLeave = () => { cursorGlow.style.opacity = '0'; cursorVisible = false; };
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseleave', onMouseLeave);

        // Smooth follow via RAF
        const updateCursorGlow = () => {
            glowX += (cursorX - glowX) * 0.12;
            glowY += (cursorY - glowY) * 0.12;
            cursorGlow.style.transform = `translate(${glowX - 160}px, ${glowY - 160}px)`;
            requestAnimationFrame(updateCursorGlow);
        };
        const cursorRAF = requestAnimationFrame(updateCursorGlow);

        // ============================================================
        // 2. FLOATING BACKGROUND PARTICLES — slow glowing dots
        // ============================================================
        const particleCanvas = document.createElement('canvas');
        particleCanvas.id = 'premium-particles';
        Object.assign(particleCanvas.style, {
            position: 'fixed',
            top: '0', left: '0',
            width: '100vw', height: '100vh',
            pointerEvents: 'none',
            zIndex: '0',
            opacity: '0.6',
        });
        document.body.appendChild(particleCanvas);

        const pCtx = particleCanvas.getContext('2d');
        let pW, pH;
        const resizeParticles = () => {
            pW = window.innerWidth;
            pH = window.innerHeight;
            const dpr = window.devicePixelRatio || 1;
            particleCanvas.width = pW * dpr;
            particleCanvas.height = pH * dpr;
            pCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };
        resizeParticles();
        window.addEventListener('resize', resizeParticles);

        const PARTICLE_COUNT = 40;
        const particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push({
                x: Math.random() * pW,
                y: Math.random() * pH,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                size: 1 + Math.random() * 2,
                hue: Math.random() * 360,
                phase: Math.random() * Math.PI * 2,
            });
        }

        let particleRAF;
        const animateParticles = (ts) => {
            const t = ts * 0.001;
            pCtx.clearRect(0, 0, pW, pH);
            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < -10) p.x = pW + 10;
                if (p.x > pW + 10) p.x = -10;
                if (p.y < -10) p.y = pH + 10;
                if (p.y > pH + 10) p.y = -10;

                const alpha = 0.3 + 0.3 * Math.sin(t * 0.5 + p.phase);
                const grad = pCtx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
                grad.addColorStop(0, `hsla(${p.hue}, 80%, 70%, ${alpha})`);
                grad.addColorStop(1, `hsla(${p.hue}, 80%, 70%, 0)`);
                pCtx.fillStyle = grad;
                pCtx.beginPath();
                pCtx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
                pCtx.fill();
            });
            particleRAF = requestAnimationFrame(animateParticles);
        };
        particleRAF = requestAnimationFrame(animateParticles);

        // ============================================================
        // 3. MAGNETIC BUTTON EFFECT — buttons pull toward cursor
        // ============================================================
        const magneticSelectors = 'button, a[class*="btn"], [class*="Button"], [role="button"]';
        const MAGNETIC_RANGE = 80;
        const MAGNETIC_STRENGTH = 0.3;

        const magneticHandler = (e) => {
            document.querySelectorAll(magneticSelectors).forEach((btn) => {
                const rect = btn.getBoundingClientRect();
                const bx = rect.left + rect.width / 2;
                const by = rect.top + rect.height / 2;
                const dx = e.clientX - bx;
                const dy = e.clientY - by;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < MAGNETIC_RANGE) {
                    const pull = (1 - dist / MAGNETIC_RANGE) * MAGNETIC_STRENGTH;
                    btn.style.transform = `translate(${dx * pull}px, ${dy * pull}px)`;
                    btn.style.transition = 'transform 0.2s ease-out';
                } else {
                    if (btn.style.transform) {
                        btn.style.transform = '';
                        btn.style.transition = 'transform 0.4s ease-out';
                    }
                }
            });
        };
        document.addEventListener('mousemove', magneticHandler);

        // ============================================================
        // 4. 3D TILT ON PROFILE CARD — vanilla tilt via mouse
        // ============================================================
        const setupTilt = () => {
            // Target the profile card container
            const cards = document.querySelectorAll('[class*="glass-panel"][class*="rounded-"]');
            cards.forEach((card) => {
                // Only apply to larger card-like elements
                if (card.offsetHeight < 100) return;

                card.style.transformStyle = 'preserve-3d';
                card.style.transition = 'transform 0.15s ease-out';

                const tiltMove = (e) => {
                    const rect = card.getBoundingClientRect();
                    const cx = rect.left + rect.width / 2;
                    const cy = rect.top + rect.height / 2;
                    const dx = (e.clientX - cx) / (rect.width / 2);
                    const dy = (e.clientY - cy) / (rect.height / 2);
                    card.style.transform = `perspective(800px) rotateY(${dx * 5}deg) rotateX(${-dy * 5}deg) scale3d(1.02,1.02,1.02)`;
                };
                const tiltLeave = () => {
                    card.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)';
                };

                card.addEventListener('mousemove', tiltMove);
                card.addEventListener('mouseleave', tiltLeave);
                card._tiltCleanup = () => {
                    card.removeEventListener('mousemove', tiltMove);
                    card.removeEventListener('mouseleave', tiltLeave);
                };
            });
        };
        // Delay to let React render
        const tiltTimeout = setTimeout(setupTilt, 2000);

        // ============================================================
        // 5. SCROLL REVEAL — fade-up on sections entering viewport
        // ============================================================
        const injectScrollRevealCSS = () => {
            const style = document.createElement('style');
            style.id = 'premium-scroll-reveal-css';
            style.textContent = `
                .premium-reveal {
                    opacity: 0;
                    transform: translateY(30px);
                    transition: opacity 0.7s ease-out, transform 0.7s ease-out;
                }
                .premium-reveal.revealed {
                    opacity: 1;
                    transform: translateY(0);
                }
                .premium-hover-glow {
                    position: relative;
                    overflow: visible;
                }
                .premium-hover-glow::after {
                    content: '';
                    position: absolute;
                    inset: -2px;
                    border-radius: inherit;
                    opacity: 0;
                    background: linear-gradient(135deg, rgba(168,85,247,0.15), rgba(99,102,241,0.1), rgba(236,72,153,0.1));
                    filter: blur(8px);
                    transition: opacity 0.3s ease;
                    pointer-events: none;
                    z-index: -1;
                }
                .premium-hover-glow:hover::after {
                    opacity: 1;
                }
            `;
            document.head.appendChild(style);
        };
        injectScrollRevealCSS();

        const setupScrollReveal = () => {
            const sections = document.querySelectorAll('section, [class*="glass-section"]');
            sections.forEach((s) => {
                if (!s.classList.contains('premium-reveal')) {
                    s.classList.add('premium-reveal');
                }
            });

            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                    }
                });
            }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

            document.querySelectorAll('.premium-reveal').forEach((el) => observer.observe(el));
            return observer;
        };
        let scrollObserver;
        const revealTimeout = setTimeout(() => { scrollObserver = setupScrollReveal(); }, 2500);

        // ============================================================
        // 6. HOVER GLOW — soft glow on interactive elements
        // ============================================================
        const setupHoverGlow = () => {
            const glowTargets = document.querySelectorAll(
                '[class*="glass-panel"], nav a, [class*="card"], [class*="Card"]'
            );
            glowTargets.forEach((el) => {
                if (!el.classList.contains('premium-hover-glow')) {
                    el.classList.add('premium-hover-glow');
                }
            });
        };
        const hoverTimeout = setTimeout(setupHoverGlow, 2500);

        // Re-apply on route changes via MutationObserver
        const mutationObserver = new MutationObserver(() => {
            setupHoverGlow();
            if (scrollObserver) {
                document.querySelectorAll('.premium-reveal:not(.revealed)').forEach((el) =>
                    scrollObserver.observe(el)
                );
            }
        });
        mutationObserver.observe(document.getElementById('root'), { childList: true, subtree: true });

        // ============================================================
        // CLEANUP
        // ============================================================
        return () => {
            cancelAnimationFrame(cursorRAF);
            cancelAnimationFrame(particleRAF);
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseleave', onMouseLeave);
            document.removeEventListener('mousemove', magneticHandler);
            window.removeEventListener('resize', resizeParticles);
            clearTimeout(tiltTimeout);
            clearTimeout(revealTimeout);
            clearTimeout(hoverTimeout);
            cursorGlow.remove();
            particleCanvas.remove();
            document.getElementById('premium-scroll-reveal-css')?.remove();
            if (scrollObserver) scrollObserver.disconnect();
            mutationObserver.disconnect();
            document.querySelectorAll('[data-tilt-cleanup]').forEach((el) => el._tiltCleanup?.());
        };
    }, []);

    return null; // Pure side-effect component
};

export default PremiumEnhancements;

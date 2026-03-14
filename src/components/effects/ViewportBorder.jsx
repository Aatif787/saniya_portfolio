import React, { useEffect, useRef } from 'react';
import '../../styles/ViewportBorder.css';

const ViewportBorder = () => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let w, h;

        const resize = () => {
            w = window.innerWidth;
            h = window.innerHeight;
            const dpr = window.devicePixelRatio || 1;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = w + 'px';
            canvas.style.height = h + 'px';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };
        resize();
        window.addEventListener('resize', resize);

        // ============ MOUSE STATE ============
        let mouseX = w / 2;
        let mouseY = h / 2;
        let mouseVX = 0;
        let mouseVY = 0;
        const mouseTrail = [];
        const MAX_TRAIL = 40;
        const mouseParticles = [];
        const MAX_PARTICLES = 60;

        const handleMouseMove = (e) => {
            mouseVX = e.clientX - mouseX;
            mouseVY = e.clientY - mouseY;
            mouseX = e.clientX;
            mouseY = e.clientY;
        };
        window.addEventListener('mousemove', handleMouseMove);

        // ============ SHOOTING STARS / METEORS ============
        const MAX_METEORS = 15;
        const meteors = [];
        const meteorTrails = [];
        const MAX_METEOR_TRAIL_PARTICLES = 200;

        const spawnMeteor = () => {
            // Pick a random starting edge: 0=top, 1=right, 2=bottom, 3=left
            const edge = Math.floor(Math.random() * 4);
            let startX, startY, angle;

            // Spread factor for angle variation (radians) — slight fan
            const spread = (Math.random() - 0.5) * 0.6;

            switch (edge) {
                case 0: // top edge — going down
                    startX = Math.random() * w;
                    startY = -10;
                    angle = Math.PI / 2 + spread;
                    break;
                case 1: // right edge — going left
                    startX = w + 10;
                    startY = Math.random() * h;
                    angle = Math.PI + spread;
                    break;
                case 2: // bottom edge — going up
                    startX = Math.random() * w;
                    startY = h + 10;
                    angle = -Math.PI / 2 + spread;
                    break;
                case 3: // left edge — going right
                default:
                    startX = -10;
                    startY = Math.random() * h;
                    angle = 0 + spread;
                    break;
            }

            const speed = 4 + Math.random() * 8;
            const tailLength = 80 + Math.random() * 140;
            const size = 1.5 + Math.random() * 2.5;
            const hueOffset = Math.random() * 120;

            meteors.push({
                x: startX,
                y: startY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                speed,
                tailLength,
                size,
                hueOffset,
                life: 1.0,
                trailTimer: 0,
            });
        };

        // Stagger initial meteor spawns
        let spawnTimer = 0;
        const SPAWN_INTERVAL_MIN = 150;
        const SPAWN_INTERVAL_MAX = 800;
        let nextSpawnDelay = SPAWN_INTERVAL_MIN + Math.random() * (SPAWN_INTERVAL_MAX - SPAWN_INTERVAL_MIN);

        // Seed a few meteors immediately
        for (let i = 0; i < 6; i++) spawnMeteor();

        // ============ ANIMATION ============
        let lastFrameTime = 0;

        const animate = (timestamp) => {
            const dt = lastFrameTime ? (timestamp - lastFrameTime) : 16;
            lastFrameTime = timestamp;
            const time = timestamp * 0.001;
            ctx.clearRect(0, 0, w, h);

            const baseHue = (time * 25) % 360;

            ctx.save();
            ctx.globalCompositeOperation = 'lighter';

            // --- Spawn new meteors ---
            spawnTimer += dt;
            if (spawnTimer >= nextSpawnDelay && meteors.length < MAX_METEORS) {
                spawnMeteor();
                spawnTimer = 0;
                nextSpawnDelay = SPAWN_INTERVAL_MIN + Math.random() * (SPAWN_INTERVAL_MAX - SPAWN_INTERVAL_MIN);
            }

            // --- Update & draw meteors ---
            for (let i = meteors.length - 1; i >= 0; i--) {
                const m = meteors[i];
                m.x += m.vx;
                m.y += m.vy;

                // Emit trail particles every few frames
                m.trailTimer += dt;
                if (m.trailTimer > 20) {
                    m.trailTimer = 0;
                    meteorTrails.push({
                        x: m.x,
                        y: m.y,
                        life: 1.0,
                        size: m.size * (0.3 + Math.random() * 0.5),
                        hueOffset: m.hueOffset + Math.random() * 20 - 10,
                    });
                    if (meteorTrails.length > MAX_METEOR_TRAIL_PARTICLES) meteorTrails.shift();
                }

                // Kill if out of bounds
                const margin = m.tailLength + 50;
                if (m.x < -margin || m.x > w + margin || m.y < -margin || m.y > h + margin) {
                    meteors.splice(i, 1);
                    continue;
                }

                const meteorHue = (baseHue + m.hueOffset) % 360;

                // --- Draw tail (gradient line) ---
                const tailX = m.x - (m.vx / m.speed) * m.tailLength;
                const tailY = m.y - (m.vy / m.speed) * m.tailLength;

                const tailGrad = ctx.createLinearGradient(tailX, tailY, m.x, m.y);
                tailGrad.addColorStop(0, `hsla(${meteorHue}, 100%, 60%, 0)`);
                tailGrad.addColorStop(0.5, `hsla(${meteorHue}, 100%, 70%, 0.15)`);
                tailGrad.addColorStop(0.85, `hsla(${meteorHue + 20}, 100%, 80%, 0.5)`);
                tailGrad.addColorStop(1, `hsla(${meteorHue + 40}, 100%, 95%, 0.9)`);

                ctx.beginPath();
                ctx.moveTo(tailX, tailY);
                ctx.lineTo(m.x, m.y);
                ctx.strokeStyle = tailGrad;
                ctx.lineWidth = m.size;
                ctx.lineCap = 'round';
                ctx.stroke();

                // --- Draw head glow ---
                const headGrad = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.size * 6);
                headGrad.addColorStop(0, `hsla(${meteorHue + 40}, 80%, 95%, 0.9)`);
                headGrad.addColorStop(0.2, `hsla(${meteorHue + 20}, 100%, 80%, 0.5)`);
                headGrad.addColorStop(0.5, `hsla(${meteorHue}, 100%, 60%, 0.15)`);
                headGrad.addColorStop(1, `hsla(${meteorHue}, 100%, 50%, 0)`);
                ctx.fillStyle = headGrad;
                const gr = m.size * 6;
                ctx.fillRect(m.x - gr, m.y - gr, gr * 2, gr * 2);

                // --- Bright core dot ---
                ctx.beginPath();
                ctx.arc(m.x, m.y, m.size * 0.6, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${meteorHue + 40}, 60%, 97%, 0.95)`;
                ctx.fill();
            }

            // --- Update & draw meteor trail particles ---
            for (let i = meteorTrails.length - 1; i >= 0; i--) {
                const tp = meteorTrails[i];
                tp.life -= 0.025;
                if (tp.life <= 0) { meteorTrails.splice(i, 1); continue; }

                const alpha = tp.life * tp.life; // ease out
                const trailHue = (baseHue + tp.hueOffset) % 360;
                const tpGrad = ctx.createRadialGradient(tp.x, tp.y, 0, tp.x, tp.y, tp.size * 3);
                tpGrad.addColorStop(0, `hsla(${trailHue}, 100%, 85%, ${alpha * 0.6})`);
                tpGrad.addColorStop(0.5, `hsla(${trailHue + 15}, 100%, 65%, ${alpha * 0.2})`);
                tpGrad.addColorStop(1, `hsla(${trailHue}, 100%, 50%, 0)`);
                ctx.fillStyle = tpGrad;
                const r = tp.size * 3;
                ctx.fillRect(tp.x - r, tp.y - r, r * 2, r * 2);
            }

            // ============ MOUSE EFFECTS ============
            const speed = Math.sqrt(mouseVX * mouseVX + mouseVY * mouseVY);

            // Add trail orbs
            if (speed > 1) {
                const trailHue = (baseHue + time * 40) % 360;
                mouseTrail.push({
                    x: mouseX, y: mouseY,
                    life: 1.0,
                    hue: trailHue,
                    size: Math.min(6, 1.5 + speed * 0.1),
                });
                if (mouseTrail.length > MAX_TRAIL) mouseTrail.shift();

                // Spark particles on fast moves
                if (speed > 5) {
                    const count = Math.min(3, Math.floor(speed * 0.2));
                    for (let p = 0; p < count; p++) {
                        const angle = Math.atan2(mouseVY, mouseVX) + (Math.random() - 0.5) * Math.PI * 0.8;
                        const spd = 1 + Math.random() * 2.5;
                        mouseParticles.push({
                            x: mouseX + (Math.random() - 0.5) * 8,
                            y: mouseY + (Math.random() - 0.5) * 8,
                            vx: Math.cos(angle) * spd,
                            vy: Math.sin(angle) * spd,
                            life: 1.0,
                            hue: (trailHue + Math.random() * 50 - 25) % 360,
                            size: 0.8 + Math.random() * 2,
                        });
                        if (mouseParticles.length > MAX_PARTICLES) mouseParticles.shift();
                    }
                }
            }

            // Draw trail
            for (let i = mouseTrail.length - 1; i >= 0; i--) {
                const t = mouseTrail[i];
                t.life -= 0.03;
                if (t.life <= 0) { mouseTrail.splice(i, 1); continue; }
                const alpha = t.life;
                const tGrad = ctx.createRadialGradient(t.x, t.y, 0, t.x, t.y, t.size * 2.5 * alpha);
                tGrad.addColorStop(0, `hsla(${t.hue}, 100%, 85%, ${alpha * 0.6})`);
                tGrad.addColorStop(0.4, `hsla(${t.hue + 20}, 100%, 60%, ${alpha * 0.25})`);
                tGrad.addColorStop(1, `hsla(${t.hue}, 100%, 40%, 0)`);
                ctx.fillStyle = tGrad;
                const r = t.size * 2.5;
                ctx.fillRect(t.x - r, t.y - r, r * 2, r * 2);

                // Connect trail with lines
                if (i > 0) {
                    const next = mouseTrail[i - 1];
                    ctx.beginPath();
                    ctx.moveTo(t.x, t.y);
                    ctx.lineTo(next.x, next.y);
                    ctx.strokeStyle = `hsla(${t.hue}, 100%, 75%, ${alpha * 0.3})`;
                    ctx.lineWidth = t.size * alpha * 0.4;
                    ctx.stroke();
                }
            }

            // Draw particles
            for (let i = mouseParticles.length - 1; i >= 0; i--) {
                const p = mouseParticles[i];
                p.x += p.vx; p.y += p.vy;
                p.vx *= 0.95; p.vy *= 0.95;
                p.vy += 0.04;
                p.life -= 0.025;
                if (p.life <= 0) { mouseParticles.splice(i, 1); continue; }
                const alpha = p.life;
                const pGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
                pGrad.addColorStop(0, `hsla(${p.hue}, 100%, 90%, ${alpha * 0.8})`);
                pGrad.addColorStop(0.5, `hsla(${p.hue + 15}, 100%, 65%, ${alpha * 0.3})`);
                pGrad.addColorStop(1, `hsla(${p.hue}, 100%, 50%, 0)`);
                ctx.fillStyle = pGrad;
                ctx.fillRect(p.x - p.size * 2, p.y - p.size * 2, p.size * 4, p.size * 4);
            }

            // Cursor glow halo
            const cursorHue = (baseHue + time * 50) % 360;
            const cursorPulse = 0.6 + 0.4 * Math.sin(time * 8);
            const glowR = 20 + speed * 1.2;
            const cursorGrad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, glowR * cursorPulse);
            cursorGrad.addColorStop(0, `hsla(${cursorHue}, 100%, 80%, ${0.2 * cursorPulse})`);
            cursorGrad.addColorStop(0.3, `hsla(${cursorHue + 30}, 100%, 60%, ${0.08 * cursorPulse})`);
            cursorGrad.addColorStop(1, `hsla(${cursorHue}, 100%, 40%, 0)`);
            ctx.fillStyle = cursorGrad;
            ctx.fillRect(mouseX - glowR, mouseY - glowR, glowR * 2, glowR * 2);

            // Decay velocity
            mouseVX *= 0.85;
            mouseVY *= 0.85;

            ctx.restore();
            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        const handleResize = () => {
            resize();
        };
        window.removeEventListener('resize', resize);
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationRef.current);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div className="viewport-neon-root" aria-hidden="true">
            <canvas ref={canvasRef} className="viewport-lightning-canvas" />
        </div>
    );
};

export default ViewportBorder;

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

        // ============ CONFIG ============
        const BORDER = 1.5;
        const GLOW_SIZE = 10;
        const CORNER_RADIUS = 12;
        const MARGIN = 2; // pushed to the very edge

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

        // ============ BORDER PATH ============
        const buildBorderPath = (width, height, segments) => {
            const pts = [];
            const r = CORNER_RADIUS;
            const perimeter = 2 * (width + height) - 8 * r + 2 * Math.PI * r;
            const step = perimeter / segments;

            for (let x = r; x <= width - r; x += step)
                pts.push({ x, y: 0, nx: 0, ny: -1 });
            for (let a = -Math.PI / 2; a <= 0; a += step / r) {
                const cx = width - r, cy = r;
                pts.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r, nx: Math.cos(a), ny: Math.sin(a) });
            }
            for (let y = r; y <= height - r; y += step)
                pts.push({ x: width, y, nx: 1, ny: 0 });
            for (let a = 0; a <= Math.PI / 2; a += step / r) {
                const cx = width - r, cy = height - r;
                pts.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r, nx: Math.cos(a), ny: Math.sin(a) });
            }
            for (let x = width - r; x >= r; x -= step)
                pts.push({ x, y: height, nx: 0, ny: 1 });
            for (let a = Math.PI / 2; a <= Math.PI; a += step / r) {
                const cx = r, cy = height - r;
                pts.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r, nx: Math.cos(a), ny: Math.sin(a) });
            }
            for (let y = height - r; y >= r; y -= step)
                pts.push({ x: 0, y, nx: -1, ny: 0 });
            for (let a = Math.PI; a <= 1.5 * Math.PI; a += step / r) {
                const cx = r, cy = r;
                pts.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r, nx: Math.cos(a), ny: Math.sin(a) });
            }
            return pts;
        };

        // Noise offsets — gentle wobble, not aggressive zigzag
        let noiseOffsets = [];
        const regenerateNoise = (count) => {
            noiseOffsets = [];
            for (let i = 0; i < count; i++) {
                noiseOffsets.push({
                    phase: Math.random() * Math.PI * 2,
                    speed: 0.5 + Math.random() * 0.8,
                    amp: 0.35 + Math.random() * 0.45,
                    phase2: Math.random() * Math.PI * 2,
                    speed2: 0.8 + Math.random() * 1.2,
                    amp2: 0.15 + Math.random() * 0.3,
                });
            }
        };

        let sparkPoints = [];
        const generateSparks = (count) => {
            sparkPoints = [];
            for (let i = 0; i < count; i++) {
                sparkPoints.push({
                    index: Math.floor(Math.random() * 400),
                    intensity: 0.4 + Math.random() * 0.6,
                    phase: Math.random() * Math.PI * 2,
                    speed: 2 + Math.random() * 4,
                    size: 0.8 + Math.random() * 2,
                });
            }
        };

        let borderPts = buildBorderPath(w, h, 500);
        regenerateNoise(borderPts.length);
        generateSparks(35);

        // ============ ANIMATION ============
        const animate = (timestamp) => {
            const time = timestamp * 0.001;
            ctx.clearRect(0, 0, w, h);

            if (borderPts.length < 2) {
                animationRef.current = requestAnimationFrame(animate);
                return;
            }

            // Cycling neon hue
            const baseHue = (time * 25) % 360;

            ctx.save();
            ctx.globalCompositeOperation = 'lighter';

            // Build distorted path — moderate zigzag + rotating phase sweep
            const rotatePhase = time * 2.5; // rotation speed
            const buildPath = (offsetScale) => {
                ctx.beginPath();
                for (let i = 0; i < borderPts.length; i++) {
                    const pt = borderPts[i];
                    const n = noiseOffsets[i] || noiseOffsets[0];
                    // Rotating phase offset — energy sweeps around the border
                    const sweep = (i / borderPts.length) * Math.PI * 2;
                    const w1 = Math.sin(time * n.speed * 5 + n.phase + i * 0.06 + rotatePhase + sweep) * n.amp;
                    const w2 = Math.sin(time * n.speed2 * 5 + n.phase2 + i * 0.12 - rotatePhase * 0.7) * n.amp2;
                    const wobble = (w1 + w2) * offsetScale;

                    const x = pt.x + pt.nx * (wobble * 2 - MARGIN);
                    const y = pt.y + pt.ny * (wobble * 2 - MARGIN);

                    if (i === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.closePath();
            };

            // --- Outer diffuse glow ---
            buildPath(1.3);
            ctx.strokeStyle = `hsla(${baseHue}, 100%, 50%, 0.06)`;
            ctx.lineWidth = GLOW_SIZE * 1.8;
            ctx.filter = 'blur(6px)';
            ctx.stroke();
            ctx.filter = 'none';

            // --- Mid glow ---
            buildPath(1.1);
            ctx.strokeStyle = `hsla(${baseHue + 20}, 100%, 60%, 0.14)`;
            ctx.lineWidth = GLOW_SIZE * 0.7;
            ctx.filter = 'blur(2.5px)';
            ctx.stroke();
            ctx.filter = 'none';

            // --- Inner glow ---
            buildPath(1.0);
            ctx.strokeStyle = `hsla(${baseHue + 40}, 100%, 70%, 0.3)`;
            ctx.lineWidth = GLOW_SIZE * 0.25;
            ctx.filter = 'blur(1px)';
            ctx.stroke();
            ctx.filter = 'none';

            // --- Core neon line ---
            buildPath(1.0);
            const coreHue = baseHue + Math.sin(time * 3) * 30;
            ctx.strokeStyle = `hsla(${coreHue}, 100%, 75%, 0.75)`;
            ctx.lineWidth = BORDER;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.stroke();

            // White-hot center
            buildPath(1.0);
            ctx.strokeStyle = `hsla(${coreHue}, 50%, 92%, 0.4)`;
            ctx.lineWidth = BORDER * 0.3;
            ctx.stroke();

            // --- Corner hotspots ---
            const corners = [
                { x: MARGIN + CORNER_RADIUS, y: MARGIN + CORNER_RADIUS },
                { x: w - MARGIN - CORNER_RADIUS, y: MARGIN + CORNER_RADIUS },
                { x: w - MARGIN - CORNER_RADIUS, y: h - MARGIN - CORNER_RADIUS },
                { x: MARGIN + CORNER_RADIUS, y: h - MARGIN - CORNER_RADIUS },
            ];
            corners.forEach((c, ci) => {
                const pulse = 0.5 + 0.5 * Math.sin(time * 5 + ci * 1.6);
                const hue = (baseHue + ci * 60) % 360;
                const grad = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, GLOW_SIZE * 1.3 * pulse);
                grad.addColorStop(0, `hsla(${hue}, 100%, 80%, ${0.45 * pulse})`);
                grad.addColorStop(0.4, `hsla(${hue + 20}, 100%, 55%, ${0.18 * pulse})`);
                grad.addColorStop(1, `hsla(${hue}, 100%, 40%, 0)`);
                ctx.fillStyle = grad;
                ctx.fillRect(c.x - GLOW_SIZE * 2, c.y - GLOW_SIZE * 2, GLOW_SIZE * 4, GLOW_SIZE * 4);
            });

            // --- Sparks ---
            sparkPoints.forEach((sp) => {
                const idx = sp.index % borderPts.length;
                const pt = borderPts[idx];
                const n = noiseOffsets[idx] || noiseOffsets[0];
                const sweep = (idx / borderPts.length) * Math.PI * 2;
                const wobble = Math.sin(time * n.speed * 5 + n.phase + idx * 0.06 + rotatePhase + sweep) * n.amp;
                const x = pt.x + pt.nx * (wobble * 2 - MARGIN);
                const y = pt.y + pt.ny * (wobble * 2 - MARGIN);

                const flicker = Math.abs(Math.sin(time * sp.speed * 3 + sp.phase));
                if (flicker > 0.7) {
                    const hue = (baseHue + idx * 0.5) % 360;
                    const sparkGrad = ctx.createRadialGradient(x, y, 0, x, y, sp.size * 2.5);
                    sparkGrad.addColorStop(0, `hsla(${hue}, 100%, 90%, ${flicker * sp.intensity})`);
                    sparkGrad.addColorStop(0.5, `hsla(${hue + 30}, 100%, 65%, ${flicker * sp.intensity * 0.35})`);
                    sparkGrad.addColorStop(1, `hsla(${hue}, 100%, 40%, 0)`);
                    ctx.fillStyle = sparkGrad;
                    ctx.fillRect(x - sp.size * 2.5, y - sp.size * 2.5, sp.size * 5, sp.size * 5);
                }
            });

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
            borderPts = buildBorderPath(w, h, 500);
            regenerateNoise(borderPts.length);
            generateSparks(35);
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

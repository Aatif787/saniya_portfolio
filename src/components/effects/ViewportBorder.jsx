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
        const GLOW_SIZE = 12;
        const CORNER_RADIUS = 16;
        const MARGIN = 6;

        // ============ MOUSE STATE ============
        let mouseX = w / 2;
        let mouseY = h / 2;
        let mouseVX = 0;
        let mouseVY = 0;
        let prevMouseX = mouseX;
        let prevMouseY = mouseY;
        const mouseTrail = []; // {x, y, life, hue, size}
        const MAX_TRAIL = 50;
        const mouseParticles = []; // {x, y, vx, vy, life, hue, size}
        const MAX_PARTICLES = 80;

        const handleMouseMove = (e) => {
            mouseVX = e.clientX - mouseX;
            mouseVY = e.clientY - mouseY;
            prevMouseX = mouseX;
            prevMouseY = mouseY;
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

        // Noise offsets — higher amplitude for more zigzag
        let noiseOffsets = [];
        const regenerateNoise = (count) => {
            noiseOffsets = [];
            for (let i = 0; i < count; i++) {
                noiseOffsets.push({
                    phase: Math.random() * Math.PI * 2,
                    speed: 0.8 + Math.random() * 1.5,
                    amp: 0.8 + Math.random() * 1.2,
                    phase2: Math.random() * Math.PI * 2,
                    speed2: 1.2 + Math.random() * 2.0,
                    amp2: 0.5 + Math.random() * 0.8,
                    // Third frequency for extra zigzag
                    phase3: Math.random() * Math.PI * 2,
                    speed3: 2.5 + Math.random() * 3.0,
                    amp3: 0.3 + Math.random() * 0.5,
                });
            }
        };

        let sparkPoints = [];
        const generateSparks = (count) => {
            sparkPoints = [];
            for (let i = 0; i < count; i++) {
                sparkPoints.push({
                    index: Math.floor(Math.random() * 400),
                    intensity: 0.5 + Math.random() * 0.5,
                    phase: Math.random() * Math.PI * 2,
                    speed: 2 + Math.random() * 5,
                    size: 1 + Math.random() * 2.5,
                });
            }
        };

        let borderPts = buildBorderPath(w, h, 500);
        regenerateNoise(borderPts.length);
        generateSparks(40);

        // ============ ANIMATION ============
        const animate = (timestamp) => {
            const time = timestamp * 0.001;
            ctx.clearRect(0, 0, w, h);

            if (borderPts.length < 2) {
                animationRef.current = requestAnimationFrame(animate);
                return;
            }

            // Cycling neon hue — goes through cyan, purple, magenta, blue
            const baseHue = (time * 25) % 360;

            ctx.save();
            ctx.globalCompositeOperation = 'lighter';

            // Build distorted zigzag path
            const buildPath = (offsetScale) => {
                ctx.beginPath();
                for (let i = 0; i < borderPts.length; i++) {
                    const pt = borderPts[i];
                    const n = noiseOffsets[i] || noiseOffsets[0];
                    const w1 = Math.sin(time * n.speed * 5 + n.phase + i * 0.08) * n.amp;
                    const w2 = Math.sin(time * n.speed2 * 5 + n.phase2 + i * 0.15) * n.amp2;
                    const w3 = Math.sin(time * n.speed3 * 5 + n.phase3 + i * 0.25) * n.amp3;
                    const wobble = (w1 + w2 + w3) * offsetScale;

                    const x = pt.x + pt.nx * (wobble * 3 - MARGIN);
                    const y = pt.y + pt.ny * (wobble * 3 - MARGIN);

                    if (i === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.closePath();
            };

            // --- Outer diffuse neon glow ---
            buildPath(1.5);
            ctx.strokeStyle = `hsla(${baseHue}, 100%, 50%, 0.06)`;
            ctx.lineWidth = GLOW_SIZE * 2;
            ctx.filter = 'blur(8px)';
            ctx.stroke();
            ctx.filter = 'none';

            // --- Mid glow ---
            buildPath(1.2);
            ctx.strokeStyle = `hsla(${baseHue + 20}, 100%, 60%, 0.15)`;
            ctx.lineWidth = GLOW_SIZE * 0.8;
            ctx.filter = 'blur(3px)';
            ctx.stroke();
            ctx.filter = 'none';

            // --- Inner glow ---
            buildPath(1.0);
            ctx.strokeStyle = `hsla(${baseHue + 40}, 100%, 70%, 0.35)`;
            ctx.lineWidth = GLOW_SIZE * 0.3;
            ctx.filter = 'blur(1.5px)';
            ctx.stroke();
            ctx.filter = 'none';

            // --- Core neon line ---
            buildPath(1.0);
            const coreHue = baseHue + Math.sin(time * 3) * 30;
            ctx.strokeStyle = `hsla(${coreHue}, 100%, 75%, 0.8)`;
            ctx.lineWidth = BORDER;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.stroke();

            // White-hot center
            buildPath(1.0);
            ctx.strokeStyle = `hsla(${coreHue}, 50%, 92%, 0.45)`;
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
                const pulse = 0.5 + 0.5 * Math.sin(time * 6 + ci * 1.6);
                const hue = (baseHue + ci * 60) % 360;
                const grad = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, GLOW_SIZE * 1.5 * pulse);
                grad.addColorStop(0, `hsla(${hue}, 100%, 80%, ${0.5 * pulse})`);
                grad.addColorStop(0.4, `hsla(${hue + 20}, 100%, 55%, ${0.2 * pulse})`);
                grad.addColorStop(1, `hsla(${hue}, 100%, 40%, 0)`);
                ctx.fillStyle = grad;
                ctx.fillRect(c.x - GLOW_SIZE * 2, c.y - GLOW_SIZE * 2, GLOW_SIZE * 4, GLOW_SIZE * 4);
            });

            // --- Sparks ---
            sparkPoints.forEach((sp) => {
                const idx = sp.index % borderPts.length;
                const pt = borderPts[idx];
                const n = noiseOffsets[idx] || noiseOffsets[0];
                const wobble = Math.sin(time * n.speed * 5 + n.phase + idx * 0.08) * n.amp;
                const x = pt.x + pt.nx * (wobble * 3 - MARGIN);
                const y = pt.y + pt.ny * (wobble * 3 - MARGIN);

                const flicker = Math.abs(Math.sin(time * sp.speed * 4 + sp.phase));
                if (flicker > 0.65) {
                    const hue = (baseHue + idx * 0.5) % 360;
                    const sparkGrad = ctx.createRadialGradient(x, y, 0, x, y, sp.size * 3);
                    sparkGrad.addColorStop(0, `hsla(${hue}, 100%, 90%, ${flicker * sp.intensity})`);
                    sparkGrad.addColorStop(0.5, `hsla(${hue + 30}, 100%, 65%, ${flicker * sp.intensity * 0.4})`);
                    sparkGrad.addColorStop(1, `hsla(${hue}, 100%, 40%, 0)`);
                    ctx.fillStyle = sparkGrad;
                    ctx.fillRect(x - sp.size * 3, y - sp.size * 3, sp.size * 6, sp.size * 6);
                }
            });

            // ============ MOUSE EFFECTS ============

            const speed = Math.sqrt(mouseVX * mouseVX + mouseVY * mouseVY);

            // Add trail point
            if (speed > 0.5) {
                const trailHue = (baseHue + time * 40) % 360;
                mouseTrail.push({
                    x: mouseX,
                    y: mouseY,
                    life: 1.0,
                    hue: trailHue,
                    size: Math.min(8, 2 + speed * 0.15),
                });
                if (mouseTrail.length > MAX_TRAIL) mouseTrail.shift();

                // Spawn particles on fast movement
                if (speed > 3) {
                    const count = Math.min(4, Math.floor(speed * 0.3));
                    for (let p = 0; p < count; p++) {
                        const angle = Math.atan2(mouseVY, mouseVX) + (Math.random() - 0.5) * Math.PI;
                        const spd = 1 + Math.random() * 3;
                        mouseParticles.push({
                            x: mouseX + (Math.random() - 0.5) * 10,
                            y: mouseY + (Math.random() - 0.5) * 10,
                            vx: Math.cos(angle) * spd,
                            vy: Math.sin(angle) * spd,
                            life: 1.0,
                            hue: (trailHue + Math.random() * 60 - 30) % 360,
                            size: 1 + Math.random() * 3,
                        });
                        if (mouseParticles.length > MAX_PARTICLES) mouseParticles.shift();
                    }
                }
            }

            // Draw mouse trail
            for (let i = mouseTrail.length - 1; i >= 0; i--) {
                const t = mouseTrail[i];
                t.life -= 0.025;
                if (t.life <= 0) {
                    mouseTrail.splice(i, 1);
                    continue;
                }
                const alpha = t.life;
                // Glow orb
                const tGrad = ctx.createRadialGradient(t.x, t.y, 0, t.x, t.y, t.size * 3 * alpha);
                tGrad.addColorStop(0, `hsla(${t.hue}, 100%, 85%, ${alpha * 0.7})`);
                tGrad.addColorStop(0.4, `hsla(${t.hue + 20}, 100%, 60%, ${alpha * 0.3})`);
                tGrad.addColorStop(1, `hsla(${t.hue}, 100%, 40%, 0)`);
                ctx.fillStyle = tGrad;
                ctx.fillRect(t.x - t.size * 3, t.y - t.size * 3, t.size * 6, t.size * 6);

                // Connect trail points with lines
                if (i > 0 && i < mouseTrail.length - 1) {
                    const next = mouseTrail[i + 1];
                    ctx.beginPath();
                    ctx.moveTo(t.x, t.y);
                    ctx.lineTo(next.x, next.y);
                    ctx.strokeStyle = `hsla(${t.hue}, 100%, 75%, ${alpha * 0.4})`;
                    ctx.lineWidth = t.size * alpha * 0.5;
                    ctx.stroke();
                }
            }

            // Draw mouse particles
            for (let i = mouseParticles.length - 1; i >= 0; i--) {
                const p = mouseParticles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.vx *= 0.96;
                p.vy *= 0.96;
                p.vy += 0.05; // slight gravity
                p.life -= 0.02;
                if (p.life <= 0) {
                    mouseParticles.splice(i, 1);
                    continue;
                }
                const alpha = p.life;
                const pGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
                pGrad.addColorStop(0, `hsla(${p.hue}, 100%, 90%, ${alpha * 0.9})`);
                pGrad.addColorStop(0.5, `hsla(${p.hue + 15}, 100%, 65%, ${alpha * 0.4})`);
                pGrad.addColorStop(1, `hsla(${p.hue}, 100%, 50%, 0)`);
                ctx.fillStyle = pGrad;
                ctx.fillRect(p.x - p.size * 2, p.y - p.size * 2, p.size * 4, p.size * 4);
            }

            // Cursor glow halo
            const cursorHue = (baseHue + time * 50) % 360;
            const cursorPulse = 0.6 + 0.4 * Math.sin(time * 8);
            const glowRadius = 25 + speed * 1.5;
            const cursorGrad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, glowRadius * cursorPulse);
            cursorGrad.addColorStop(0, `hsla(${cursorHue}, 100%, 80%, ${0.25 * cursorPulse})`);
            cursorGrad.addColorStop(0.3, `hsla(${cursorHue + 30}, 100%, 60%, ${0.12 * cursorPulse})`);
            cursorGrad.addColorStop(1, `hsla(${cursorHue}, 100%, 40%, 0)`);
            ctx.fillStyle = cursorGrad;
            ctx.fillRect(mouseX - glowRadius, mouseY - glowRadius, glowRadius * 2, glowRadius * 2);

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
            generateSparks(40);
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

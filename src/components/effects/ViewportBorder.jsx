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

        // Border thickness & glow config
        const BORDER = 2;
        const GLOW_SIZE = 14;
        const CORNER_RADIUS = 18;

        // Color palette — warm amber / molten gold
        const BASE_HUE = 30;      // amber-orange
        const BASE_SAT = 100;
        const BASE_LIGHT = 50;

        // Create rough / organic noise points along border path
        // Returns array of {x, y, nx, ny} where nx,ny is outward normal
        const buildBorderPath = (width, height, segments) => {
            const pts = [];
            const r = CORNER_RADIUS;
            const perimeter = 2 * (width + height) - 8 * r + 2 * Math.PI * r;
            const step = perimeter / segments;

            // Walk the rounded-rect perimeter clockwise
            // Top edge (left to right)
            for (let x = r; x <= width - r; x += step) {
                pts.push({ x, y: 0, nx: 0, ny: -1 });
            }
            // Top-right corner
            for (let a = -Math.PI / 2; a <= 0; a += step / r) {
                const cx = width - r, cy = r;
                pts.push({
                    x: cx + Math.cos(a) * r,
                    y: cy + Math.sin(a) * r,
                    nx: Math.cos(a),
                    ny: Math.sin(a),
                });
            }
            // Right edge (top to bottom)
            for (let y = r; y <= height - r; y += step) {
                pts.push({ x: width, y, nx: 1, ny: 0 });
            }
            // Bottom-right corner
            for (let a = 0; a <= Math.PI / 2; a += step / r) {
                const cx = width - r, cy = height - r;
                pts.push({
                    x: cx + Math.cos(a) * r,
                    y: cy + Math.sin(a) * r,
                    nx: Math.cos(a),
                    ny: Math.sin(a),
                });
            }
            // Bottom edge (right to left)
            for (let x = width - r; x >= r; x -= step) {
                pts.push({ x, y: height, nx: 0, ny: 1 });
            }
            // Bottom-left corner
            for (let a = Math.PI / 2; a <= Math.PI; a += step / r) {
                const cx = r, cy = height - r;
                pts.push({
                    x: cx + Math.cos(a) * r,
                    y: cy + Math.sin(a) * r,
                    nx: Math.cos(a),
                    ny: Math.sin(a),
                });
            }
            // Left edge (bottom to top)
            for (let y = height - r; y >= r; y -= step) {
                pts.push({ x: 0, y, nx: -1, ny: 0 });
            }
            // Top-left corner
            for (let a = Math.PI; a <= 1.5 * Math.PI; a += step / r) {
                const cx = r, cy = r;
                pts.push({
                    x: cx + Math.cos(a) * r,
                    y: cy + Math.sin(a) * r,
                    nx: Math.cos(a),
                    ny: Math.sin(a),
                });
            }
            return pts;
        };

        // Seeded noise offsets for organic roughness
        let noiseOffsets = [];
        const regenerateNoise = (count) => {
            noiseOffsets = [];
            for (let i = 0; i < count; i++) {
                noiseOffsets.push({
                    phase: Math.random() * Math.PI * 2,
                    speed: 0.3 + Math.random() * 0.7,
                    amp: 0.4 + Math.random() * 0.6,
                    phase2: Math.random() * Math.PI * 2,
                    speed2: 0.5 + Math.random() * 1.0,
                    amp2: 0.2 + Math.random() * 0.4,
                });
            }
        };

        // Crackle / spark points
        let sparkPoints = [];
        const generateSparks = (count) => {
            sparkPoints = [];
            for (let i = 0; i < count; i++) {
                sparkPoints.push({
                    index: Math.floor(Math.random() * 400),
                    intensity: 0.5 + Math.random() * 0.5,
                    phase: Math.random() * Math.PI * 2,
                    speed: 1 + Math.random() * 3,
                    size: 1 + Math.random() * 3,
                });
            }
        };

        let borderPts = buildBorderPath(w, h, 400);
        regenerateNoise(borderPts.length);
        generateSparks(30);

        const animate = (timestamp) => {
            const time = timestamp * 0.001;
            ctx.clearRect(0, 0, w, h);

            if (borderPts.length < 2) {
                animationRef.current = requestAnimationFrame(animate);
                return;
            }

            // Inset margin
            const margin = 8;

            // ============ DRAW LAYERS ============

            // --- Layer 1: Outer soft glow ---
            ctx.save();
            ctx.globalCompositeOperation = 'lighter';

            // Build the distorted path
            const buildPath = (offsetScale) => {
                ctx.beginPath();
                for (let i = 0; i < borderPts.length; i++) {
                    const pt = borderPts[i];
                    const n = noiseOffsets[i] || noiseOffsets[0];
                    // Multi-frequency organic wobble
                    const wobble1 = Math.sin(time * n.speed * 4 + n.phase + i * 0.05) * n.amp;
                    const wobble2 = Math.sin(time * n.speed2 * 4 + n.phase2 + i * 0.12) * n.amp2;
                    const wobble = (wobble1 + wobble2) * offsetScale;

                    const x = pt.x + pt.nx * (wobble * 2 - margin);
                    const y = pt.y + pt.ny * (wobble * 2 - margin);

                    if (i === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.closePath();
            };

            // Outermost diffuse glow
            buildPath(1.5);
            ctx.strokeStyle = `hsla(${BASE_HUE}, ${BASE_SAT}%, ${BASE_LIGHT - 10}%, 0.08)`;
            ctx.lineWidth = GLOW_SIZE * 1.8;
            ctx.filter = 'blur(6px)';
            ctx.stroke();
            ctx.filter = 'none';

            // Mid glow — warm orange
            buildPath(1.2);
            ctx.strokeStyle = `hsla(${BASE_HUE}, ${BASE_SAT}%, ${BASE_LIGHT}%, 0.18)`;
            ctx.lineWidth = GLOW_SIZE * 0.8;
            ctx.filter = 'blur(3px)';
            ctx.stroke();
            ctx.filter = 'none';

            // Inner glow — brighter amber
            buildPath(1.0);
            ctx.strokeStyle = `hsla(${BASE_HUE + 5}, ${BASE_SAT}%, ${BASE_LIGHT + 15}%, 0.4)`;
            ctx.lineWidth = GLOW_SIZE * 0.4;
            ctx.filter = 'blur(1.5px)';
            ctx.stroke();
            ctx.filter = 'none';

            // --- Layer 2: Core electric line ---
            buildPath(1.0);
            // Animated hue shift for liveliness
            const hueShift = Math.sin(time * 2) * 8;
            const coreHue = BASE_HUE + hueShift;
            ctx.strokeStyle = `hsla(${coreHue}, ${BASE_SAT}%, ${BASE_LIGHT + 25}%, 0.7)`;
            ctx.lineWidth = BORDER;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.stroke();

            // Bright white-hot center
            buildPath(1.0);
            ctx.strokeStyle = `hsla(${coreHue + 10}, 60%, 85%, 0.5)`;
            ctx.lineWidth = BORDER * 0.4;
            ctx.stroke();

            // --- Layer 3: Corner hot spots ---
            const corners = [
                { x: margin + CORNER_RADIUS, y: margin + CORNER_RADIUS },
                { x: w - margin - CORNER_RADIUS, y: margin + CORNER_RADIUS },
                { x: w - margin - CORNER_RADIUS, y: h - margin - CORNER_RADIUS },
                { x: margin + CORNER_RADIUS, y: h - margin - CORNER_RADIUS },
            ];

            corners.forEach((c, ci) => {
                const pulse = 0.6 + 0.4 * Math.sin(time * 5 + ci * 1.6);
                const grad = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, GLOW_SIZE * 1.2 * pulse);
                grad.addColorStop(0, `hsla(${BASE_HUE + 15}, 100%, 75%, ${0.6 * pulse})`);
                grad.addColorStop(0.3, `hsla(${BASE_HUE}, 100%, 55%, ${0.3 * pulse})`);
                grad.addColorStop(1, `hsla(${BASE_HUE - 5}, 100%, 40%, 0)`);
                ctx.fillStyle = grad;
                ctx.fillRect(c.x - GLOW_SIZE * 2, c.y - GLOW_SIZE * 2, GLOW_SIZE * 4, GLOW_SIZE * 4);
            });

            // --- Layer 4: Electric sparks / crackle points ---
            sparkPoints.forEach((sp) => {
                const idx = sp.index % borderPts.length;
                const pt = borderPts[idx];
                const n = noiseOffsets[idx] || noiseOffsets[0];
                const wobble = Math.sin(time * n.speed * 4 + n.phase + idx * 0.05) * n.amp;

                const x = pt.x + pt.nx * (wobble * 2 - margin);
                const y = pt.y + pt.ny * (wobble * 2 - margin);

                const flicker = Math.abs(Math.sin(time * sp.speed * 3 + sp.phase));
                if (flicker > 0.7) {
                    const sparkGrad = ctx.createRadialGradient(x, y, 0, x, y, sp.size * 3);
                    sparkGrad.addColorStop(0, `hsla(40, 100%, 90%, ${flicker * sp.intensity})`);
                    sparkGrad.addColorStop(0.4, `hsla(30, 100%, 65%, ${flicker * sp.intensity * 0.5})`);
                    sparkGrad.addColorStop(1, 'hsla(25, 100%, 40%, 0)');
                    ctx.fillStyle = sparkGrad;
                    ctx.fillRect(x - sp.size * 3, y - sp.size * 3, sp.size * 6, sp.size * 6);
                }
            });

            // --- Layer 5: Occasional intense energy flares along edges ---
            const flareCount = 3;
            for (let f = 0; f < flareCount; f++) {
                const flareIdx = Math.floor(
                    (borderPts.length / flareCount) * f +
                    Math.sin(time * 1.2 + f * 2.1) * borderPts.length * 0.1
                );
                const safeFI = ((flareIdx % borderPts.length) + borderPts.length) % borderPts.length;
                const fpt = borderPts[safeFI];
                const fn = noiseOffsets[safeFI] || noiseOffsets[0];
                const fwobble = Math.sin(time * fn.speed * 4 + fn.phase) * fn.amp;
                const fx = fpt.x + fpt.nx * (fwobble * 2 - margin);
                const fy = fpt.y + fpt.ny * (fwobble * 2 - margin);
                const flarePulse = Math.pow(Math.abs(Math.sin(time * 3 + f * 1.3)), 3);

                if (flarePulse > 0.3) {
                    const flareGrad = ctx.createRadialGradient(fx, fy, 0, fx, fy, GLOW_SIZE * 1.5 * flarePulse);
                    flareGrad.addColorStop(0, `hsla(40, 100%, 80%, ${flarePulse * 0.5})`);
                    flareGrad.addColorStop(0.5, `hsla(25, 100%, 50%, ${flarePulse * 0.2})`);
                    flareGrad.addColorStop(1, 'hsla(20, 100%, 30%, 0)');
                    ctx.fillStyle = flareGrad;
                    ctx.fillRect(fx - GLOW_SIZE * 3, fy - GLOW_SIZE * 3, GLOW_SIZE * 6, GLOW_SIZE * 6);
                }
            }

            ctx.restore();

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        const handleResize = () => {
            resize();
            borderPts = buildBorderPath(w, h, 400);
            regenerateNoise(borderPts.length);
            generateSparks(30);
        };

        window.removeEventListener('resize', resize);
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationRef.current);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="viewport-neon-root" aria-hidden="true">
            <canvas ref={canvasRef} className="viewport-lightning-canvas" />
        </div>
    );
};

export default ViewportBorder;

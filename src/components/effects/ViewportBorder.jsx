import React, { useEffect, useRef, useCallback } from 'react';
import '../../styles/ViewportBorder.css';

const ViewportBorder = () => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const boltsRef = useRef([]);
    const flashRef = useRef(0);
    const ambientRef = useRef([]);

    const NEON_COLORS = [
        { r: 200, g: 220, b: 255 },  // blue-white lightning
        { r: 230, g: 240, b: 255 },  // bright white-blue
        { r: 170, g: 200, b: 255 },  // cool electric blue
        { r: 210, g: 225, b: 250 },  // pale silver-blue
        { r: 240, g: 245, b: 255 },  // near-white flash
    ];

    const randomColor = useCallback(() => {
        return NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)];
    }, []);

    // Generate a lightning bolt path along a border edge
    const generateBolt = useCallback((startX, startY, endX, endY, detail = 5) => {
        const points = [{ x: startX, y: startY }];
        const dx = endX - startX;
        const dy = endY - startY;
        const len = Math.sqrt(dx * dx + dy * dy);
        const segments = Math.max(8, Math.floor(len / detail));

        // perpendicular direction for displacement
        const nx = -dy / len;
        const ny = dx / len;

        for (let i = 1; i < segments; i++) {
            const t = i / segments;
            const baseX = startX + dx * t;
            const baseY = startY + dy * t;
            // displacement follows a jagged pattern — higher in the middle
            const midFactor = Math.sin(t * Math.PI);
            const displacement = (Math.random() - 0.5) * 12 * midFactor;
            points.push({
                x: baseX + nx * displacement,
                y: baseY + ny * displacement,
            });
        }
        points.push({ x: endX, y: endY });
        return points;
    }, []);

    // Generate a single lightning bolt along a border edge
    const spawnBolt = useCallback((w, h) => {
        const edge = Math.floor(Math.random() * 4);
        const borderInset = 2;
        let sx, sy, ex, ey;
        const segLen = 120 + Math.random() * 300;

        switch (edge) {
            case 0: // top
                sx = Math.random() * w;
                sy = borderInset;
                ex = Math.min(w, Math.max(0, sx + (Math.random() - 0.5) * segLen));
                ey = borderInset;
                break;
            case 1: // right
                sx = w - borderInset;
                sy = Math.random() * h;
                ex = w - borderInset;
                ey = Math.min(h, Math.max(0, sy + (Math.random() - 0.5) * segLen));
                break;
            case 2: // bottom
                sx = Math.random() * w;
                sy = h - borderInset;
                ex = Math.min(w, Math.max(0, sx + (Math.random() - 0.5) * segLen));
                ey = h - borderInset;
                break;
            case 3: // left
                sx = borderInset;
                sy = Math.random() * h;
                ex = borderInset;
                ey = Math.min(h, Math.max(0, sy + (Math.random() - 0.5) * segLen));
                break;
        }

        const color = randomColor();
        const points = generateBolt(sx, sy, ex, ey, 4 + Math.random() * 4);

        // Generate 0-2 branch bolts from random points
        const branches = [];
        const numBranches = Math.floor(Math.random() * 3);
        for (let b = 0; b < numBranches; b++) {
            const branchIdx = Math.floor(Math.random() * (points.length - 2)) + 1;
            const bp = points[branchIdx];
            const branchLen = 20 + Math.random() * 50;
            const angle = Math.random() * Math.PI * 2;
            const bex = bp.x + Math.cos(angle) * branchLen;
            const bey = bp.y + Math.sin(angle) * branchLen;
            branches.push(generateBolt(bp.x, bp.y, bex, bey, 6));
        }

        return {
            points,
            branches,
            color,
            life: 1.0,
            decay: 0.015 + Math.random() * 0.035,
            thickness: 0.5 + Math.random() * 0.8,
            flickerPhase: Math.random() * Math.PI * 2,
            flickerSpeed: 8 + Math.random() * 12,
            edge,
        };
    }, [randomColor, generateBolt]);

    // Ambient glow particles that drift along the border
    const spawnAmbient = useCallback((w, h) => {
        const edge = Math.floor(Math.random() * 4);
        const borderInset = 2;
        let x, y, vx, vy;

        switch (edge) {
            case 0: x = Math.random() * w; y = borderInset; vx = (Math.random() - 0.5) * 1.5; vy = 0; break;
            case 1: x = w - borderInset; y = Math.random() * h; vx = 0; vy = (Math.random() - 0.5) * 1.5; break;
            case 2: x = Math.random() * w; y = h - borderInset; vx = (Math.random() - 0.5) * 1.5; vy = 0; break;
            case 3: x = borderInset; y = Math.random() * h; vx = 0; vy = (Math.random() - 0.5) * 1.5; break;
        }

        const color = randomColor();
        return { x, y, vx, vy, color, life: 1.0, decay: 0.003 + Math.random() * 0.005, radius: 1 + Math.random() * 2.5 };
    }, [randomColor]);

    const drawBoltPath = useCallback((ctx, points, color, alpha, thickness) => {
        if (points.length < 2) return;
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }
        // outer glow — bright halo
        ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha * 0.4})`;
        ctx.lineWidth = thickness * 6;
        ctx.shadowColor = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha * 0.7})`;
        ctx.shadowBlur = 28;
        ctx.stroke();

        // mid glow — intense
        ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha * 0.75})`;
        ctx.lineWidth = thickness * 3;
        ctx.shadowBlur = 16;
        ctx.stroke();

        // core — blazing white-hot center
        ctx.strokeStyle = `rgba(255, 255, 255, ${Math.min(1, alpha * 1.1)})`;
        ctx.lineWidth = thickness * 0.8;
        ctx.shadowColor = `rgba(${color.r}, ${color.g}, ${color.b}, ${Math.min(1, alpha * 1.0)})`;
        ctx.shadowBlur = 10;
        ctx.stroke();
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let w, h;

        const resize = () => {
            w = window.innerWidth;
            h = window.innerHeight;
            canvas.width = w * window.devicePixelRatio;
            canvas.height = h * window.devicePixelRatio;
            canvas.style.width = w + 'px';
            canvas.style.height = h + 'px';
            ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
        };
        resize();
        window.addEventListener('resize', resize);

        // Spawn initial ambient particles
        for (let i = 0; i < 40; i++) {
            ambientRef.current.push(spawnAmbient(w, h));
        }

        let lastBoltTime = 0;
        let time = 0;

        const animate = (timestamp) => {
            time = timestamp * 0.001;
            ctx.clearRect(0, 0, w, h);

            // --- Draw the continuous neon border glow ---
            const borderWidth = 1;
            const pulseIntensity = 0.4 + 0.2 * Math.sin(time * 2);

            // Draw each edge with a subtle neon glow
            const drawEdgeGlow = (x1, y1, x2, y2, colorIdx) => {
                const c = NEON_COLORS[colorIdx % NEON_COLORS.length];
                const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
                const c2 = NEON_COLORS[(colorIdx + 1) % NEON_COLORS.length];
                gradient.addColorStop(0, `rgba(${c.r}, ${c.g}, ${c.b}, ${pulseIntensity})`);
                gradient.addColorStop(0.5, `rgba(${c2.r}, ${c2.g}, ${c2.b}, ${pulseIntensity * 1.2})`);
                gradient.addColorStop(1, `rgba(${c.r}, ${c.g}, ${c.b}, ${pulseIntensity})`);

                // Outer glow
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.strokeStyle = gradient;
                ctx.lineWidth = borderWidth * 6;
                ctx.shadowColor = `rgba(${c.r}, ${c.g}, ${c.b}, 0.5)`;
                ctx.shadowBlur = 22;
                ctx.stroke();

                // Inner bright line
                ctx.lineWidth = borderWidth;
                ctx.shadowBlur = 12;
                ctx.stroke();
            };

            const edgeShift = Math.floor(time * 0.3) % NEON_COLORS.length;
            drawEdgeGlow(0, 1, w, 1, edgeShift);           // top
            drawEdgeGlow(w - 1, 0, w - 1, h, edgeShift + 1); // right
            drawEdgeGlow(w, h - 1, 0, h - 1, edgeShift + 2); // bottom
            drawEdgeGlow(1, h, 1, 0, edgeShift + 3);         // left

            // --- Lightning bolts ---
            // Spawn new bolts periodically
            const boltInterval = 0.15 + Math.random() * 0.25;
            if (time - lastBoltTime > boltInterval) {
                const numBolts = 1 + Math.floor(Math.random() * 2);
                for (let i = 0; i < numBolts; i++) {
                    boltsRef.current.push(spawnBolt(w, h));
                }
                // Random screen flash
                if (Math.random() < 0.12) {
                    flashRef.current = 0.18 + Math.random() * 0.12;
                }
                lastBoltTime = time;
            }

            // Draw and update lightning bolts
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            for (let i = boltsRef.current.length - 1; i >= 0; i--) {
                const bolt = boltsRef.current[i];
                // Flicker effect
                const flicker = 0.5 + 0.5 * Math.sin(time * bolt.flickerSpeed + bolt.flickerPhase);
                const alpha = bolt.life * flicker;

                drawBoltPath(ctx, bolt.points, bolt.color, alpha, bolt.thickness);

                // Draw branches
                for (const branch of bolt.branches) {
                    drawBoltPath(ctx, branch, bolt.color, alpha * 0.6, bolt.thickness * 0.6);
                }

                bolt.life -= bolt.decay;
                if (bolt.life <= 0) {
                    boltsRef.current.splice(i, 1);
                }
            }

            // --- Ambient particles ---
            for (let i = ambientRef.current.length - 1; i >= 0; i--) {
                const p = ambientRef.current[i];
                p.x += p.vx;
                p.y += p.vy;
                p.life -= p.decay;

                if (p.life <= 0) {
                    ambientRef.current.splice(i, 1);
                    ambientRef.current.push(spawnAmbient(w, h));
                    continue;
                }

                const pa = p.life * (0.6 + 0.4 * Math.sin(time * 5 + p.x));
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${pa})`;
                ctx.shadowColor = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${pa})`;
                ctx.shadowBlur = 16;
                ctx.fill();
            }

            // --- Screen flash overlay ---
            if (flashRef.current > 0) {
                ctx.fillStyle = `rgba(180, 210, 255, ${flashRef.current})`;
                ctx.fillRect(0, 0, w, h);
                flashRef.current *= 0.88;
                if (flashRef.current < 0.005) flashRef.current = 0;
            }

            // Reset shadow for performance
            ctx.shadowBlur = 0;

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationRef.current);
            window.removeEventListener('resize', resize);
            boltsRef.current = [];
            ambientRef.current = [];
        };
    }, [spawnBolt, spawnAmbient, drawBoltPath, generateBolt, randomColor]);

    return (
        <div className="viewport-neon-root" aria-hidden="true">
            <canvas ref={canvasRef} className="viewport-lightning-canvas" />
        </div>
    );
};

export default ViewportBorder;

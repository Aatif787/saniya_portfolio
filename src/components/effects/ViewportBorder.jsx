import React, { useEffect, useRef, useCallback } from 'react';
import '../../styles/ViewportBorder.css';

const ViewportBorder = () => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const boltsRef = useRef([]);
    const flashRef = useRef(0);
    const afterimagesRef = useRef([]);

    // Realistic thunder colors — blue-white spectrum like real lightning
    const BOLT_COLORS = [
        { r: 220, g: 235, b: 255 },  // blue-white
        { r: 245, g: 248, b: 255 },  // near-white
        { r: 190, g: 215, b: 255 },  // electric blue
        { r: 255, g: 250, b: 245 },  // warm white flash
        { r: 200, g: 225, b: 255 },  // silver-blue
    ];

    const randomColor = useCallback(() => {
        return BOLT_COLORS[Math.floor(Math.random() * BOLT_COLORS.length)];
    }, []);

    // Midpoint displacement algorithm for hyper-realistic jagged lightning
    const subdivide = useCallback((p1, p2, depth, maxOffset, points) => {
        if (depth <= 0) {
            points.push(p2);
            return;
        }
        const midX = (p1.x + p2.x) / 2 + (Math.random() - 0.5) * maxOffset;
        const midY = (p1.y + p2.y) / 2 + (Math.random() - 0.5) * maxOffset;
        const mid = { x: midX, y: midY };
        subdivide(p1, mid, depth - 1, maxOffset * 0.55, points);
        subdivide(mid, p2, depth - 1, maxOffset * 0.55, points);
    }, []);

    const generateBolt = useCallback((sx, sy, ex, ey) => {
        const dx = ex - sx;
        const dy = ey - sy;
        const len = Math.sqrt(dx * dx + dy * dy);
        const maxOffset = len * 0.15;
        const depth = Math.min(7, Math.max(4, Math.floor(Math.log2(len / 5))));
        const points = [{ x: sx, y: sy }];
        subdivide({ x: sx, y: sy }, { x: ex, y: ey }, depth, maxOffset, points);
        return points;
    }, [subdivide]);

    // Spawn a bolt on a random viewport edge
    const spawnBolt = useCallback((w, h) => {
        const edge = Math.floor(Math.random() * 4);
        const inset = 1;
        let sx, sy, ex, ey;
        const segLen = 150 + Math.random() * 350;

        switch (edge) {
            case 0: sx = Math.random() * w; sy = inset; ex = Math.min(w, Math.max(0, sx + (Math.random() - 0.5) * segLen)); ey = inset; break;
            case 1: sx = w - inset; sy = Math.random() * h; ex = w - inset; ey = Math.min(h, Math.max(0, sy + (Math.random() - 0.5) * segLen)); break;
            case 2: sx = Math.random() * w; sy = h - inset; ex = Math.min(w, Math.max(0, sx + (Math.random() - 0.5) * segLen)); ey = h - inset; break;
            case 3: sx = inset; sy = Math.random() * h; ex = inset; ey = Math.min(h, Math.max(0, sy + (Math.random() - 0.5) * segLen)); break;
        }

        const color = randomColor();
        const points = generateBolt(sx, sy, ex, ey);

        // Generate realistic branches — thinner forks splitting off the main bolt
        const branches = [];
        const numBranches = 1 + Math.floor(Math.random() * 4);
        for (let b = 0; b < numBranches; b++) {
            const branchIdx = Math.floor(points.length * 0.2 + Math.random() * points.length * 0.6);
            if (branchIdx >= points.length) continue;
            const bp = points[branchIdx];
            const branchLen = 15 + Math.random() * 60;
            const angle = Math.random() * Math.PI * 2;
            const bex = bp.x + Math.cos(angle) * branchLen;
            const bey = bp.y + Math.sin(angle) * branchLen;
            const branchPoints = generateBolt(bp.x, bp.y, bex, bey);

            // Sub-branches (micro forks)
            const subBranches = [];
            if (Math.random() < 0.4 && branchPoints.length > 3) {
                const sbi = Math.floor(Math.random() * (branchPoints.length - 2)) + 1;
                const sbp = branchPoints[sbi];
                const sbLen = 8 + Math.random() * 20;
                const sbAngle = Math.random() * Math.PI * 2;
                subBranches.push(generateBolt(sbp.x, sbp.y, sbp.x + Math.cos(sbAngle) * sbLen, sbp.y + Math.sin(sbAngle) * sbLen));
            }

            branches.push({ points: branchPoints, subBranches });
        }

        // Random intensity multiplier — some bolts are brighter "main strikes"
        const isMainStrike = Math.random() < 0.2;
        const intensityMul = isMainStrike ? 1.5 : 0.8 + Math.random() * 0.4;

        return {
            points,
            branches,
            color,
            life: 1.0,
            decay: isMainStrike ? 0.008 + Math.random() * 0.015 : 0.02 + Math.random() * 0.04,
            thickness: isMainStrike ? 0.8 + Math.random() * 0.6 : 0.3 + Math.random() * 0.5,
            flickerPhase: Math.random() * Math.PI * 2,
            flickerSpeed: 15 + Math.random() * 25,
            intensityMul,
            isMainStrike,
            edge,
            // Multi-flash: main strikes flash 2-3 times rapidly
            restrikeCount: isMainStrike ? 1 + Math.floor(Math.random() * 2) : 0,
            restrikeTimer: 0,
        };
    }, [randomColor, generateBolt]);

    // Draw a single bolt path with multi-layer glow
    const drawBoltPath = useCallback((ctx, points, color, alpha, thickness, intensityMul) => {
        if (points.length < 2) return;
        const a = Math.min(1, alpha * intensityMul);
        if (a <= 0.01) return;

        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }

        // Layer 1: wide atmospheric glow
        ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${a * 0.2})`;
        ctx.lineWidth = thickness * 10;
        ctx.shadowColor = `rgba(${color.r}, ${color.g}, ${color.b}, ${a * 0.5})`;
        ctx.shadowBlur = 40;
        ctx.stroke();

        // Layer 2: bright corona
        ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${a * 0.55})`;
        ctx.lineWidth = thickness * 4;
        ctx.shadowBlur = 20;
        ctx.stroke();

        // Layer 3: intense inner glow
        ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${a * 0.85})`;
        ctx.lineWidth = thickness * 1.8;
        ctx.shadowBlur = 10;
        ctx.stroke();

        // Layer 4: white-hot plasma core
        ctx.strokeStyle = `rgba(255, 255, 255, ${Math.min(1, a * 1.2)})`;
        ctx.lineWidth = thickness * 0.6;
        ctx.shadowColor = `rgba(255, 255, 255, ${a * 0.7})`;
        ctx.shadowBlur = 4;
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

        let lastBoltTime = 0;
        let time = 0;

        const animate = (timestamp) => {
            time = timestamp * 0.001;
            ctx.clearRect(0, 0, w, h);

            // --- Spawn lightning bolts ---
            const boltInterval = 0.1 + Math.random() * 0.2;
            if (time - lastBoltTime > boltInterval) {
                const numBolts = 1 + Math.floor(Math.random() * 3);
                for (let i = 0; i < numBolts; i++) {
                    boltsRef.current.push(spawnBolt(w, h));
                }
                lastBoltTime = time;
            }

            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            // --- Draw and update lightning bolts ---
            for (let i = boltsRef.current.length - 1; i >= 0; i--) {
                const bolt = boltsRef.current[i];

                // Realistic flicker — rapid staccato for main strikes
                let flicker;
                if (bolt.isMainStrike) {
                    // Harsh on/off flicker like real lightning
                    const f1 = Math.sin(time * bolt.flickerSpeed + bolt.flickerPhase);
                    const f2 = Math.sin(time * bolt.flickerSpeed * 2.7 + bolt.flickerPhase * 1.3);
                    flicker = Math.max(0, f1 * 0.5 + 0.5) * Math.max(0, f2 * 0.3 + 0.7);
                } else {
                    flicker = 0.4 + 0.6 * Math.sin(time * bolt.flickerSpeed + bolt.flickerPhase);
                }
                const alpha = bolt.life * Math.max(0.15, flicker);

                // Draw main bolt
                drawBoltPath(ctx, bolt.points, bolt.color, alpha, bolt.thickness, bolt.intensityMul);

                // Draw branches
                for (const branch of bolt.branches) {
                    drawBoltPath(ctx, branch.points, bolt.color, alpha * 0.5, bolt.thickness * 0.5, bolt.intensityMul * 0.7);
                    // Sub-branches
                    for (const sub of branch.subBranches) {
                        drawBoltPath(ctx, sub, bolt.color, alpha * 0.3, bolt.thickness * 0.3, bolt.intensityMul * 0.5);
                    }
                }

                // Screen flash for main strikes
                if (bolt.isMainStrike && bolt.life > 0.85) {
                    flashRef.current = Math.max(flashRef.current, 0.15 * bolt.life * bolt.intensityMul);
                }

                // Restrike effect — bolt re-illuminates after a brief pause
                if (bolt.restrikeCount > 0 && bolt.life < 0.6 && bolt.restrikeTimer <= 0) {
                    bolt.life = Math.min(1.0, bolt.life + 0.4);
                    bolt.restrikeCount--;
                    bolt.restrikeTimer = 0.08 + Math.random() * 0.06;
                    flashRef.current = Math.max(flashRef.current, 0.1);
                    // Save an afterimage
                    afterimagesRef.current.push({
                        points: [...bolt.points],
                        color: bolt.color,
                        alpha: 0.25,
                        thickness: bolt.thickness * 0.4,
                        decay: 0.015,
                    });
                }
                bolt.restrikeTimer -= 0.016;

                bolt.life -= bolt.decay;
                if (bolt.life <= 0) {
                    boltsRef.current.splice(i, 1);
                }
            }

            // --- Afterimages (residual glow where bolts were) ---
            for (let i = afterimagesRef.current.length - 1; i >= 0; i--) {
                const ai = afterimagesRef.current[i];
                if (ai.alpha <= 0.01) {
                    afterimagesRef.current.splice(i, 1);
                    continue;
                }
                ctx.beginPath();
                ctx.moveTo(ai.points[0].x, ai.points[0].y);
                for (let j = 1; j < ai.points.length; j++) {
                    ctx.lineTo(ai.points[j].x, ai.points[j].y);
                }
                ctx.strokeStyle = `rgba(${ai.color.r}, ${ai.color.g}, ${ai.color.b}, ${ai.alpha * 0.4})`;
                ctx.lineWidth = ai.thickness * 3;
                ctx.shadowColor = `rgba(${ai.color.r}, ${ai.color.g}, ${ai.color.b}, ${ai.alpha * 0.3})`;
                ctx.shadowBlur = 20;
                ctx.stroke();

                ctx.strokeStyle = `rgba(200, 180, 255, ${ai.alpha * 0.2})`;
                ctx.lineWidth = ai.thickness;
                ctx.shadowBlur = 6;
                ctx.stroke();

                ai.alpha -= ai.decay;
            }

            // --- Thunder flash (full screen white flash) ---
            if (flashRef.current > 0) {
                // Two-tone flash — bright center, dimmer edges
                const grad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.7);
                grad.addColorStop(0, `rgba(220, 235, 255, ${flashRef.current * 0.7})`);
                grad.addColorStop(0.5, `rgba(200, 220, 255, ${flashRef.current * 0.4})`);
                grad.addColorStop(1, `rgba(180, 200, 240, ${flashRef.current * 0.15})`);
                ctx.fillStyle = grad;
                ctx.fillRect(0, 0, w, h);
                flashRef.current *= 0.85;
                if (flashRef.current < 0.003) flashRef.current = 0;
            }

            ctx.shadowBlur = 0;
            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationRef.current);
            window.removeEventListener('resize', resize);
            boltsRef.current = [];
            afterimagesRef.current = [];
        };
    }, [spawnBolt, drawBoltPath]);

    return (
        <div className="viewport-neon-root" aria-hidden="true">
            <canvas ref={canvasRef} className="viewport-lightning-canvas" />
        </div>
    );
};

export default ViewportBorder;

import React, { useEffect, useRef, useCallback } from 'react';
import '../../styles/ViewportBorder.css';

const ViewportBorder = () => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const boltsRef = useRef([]);
    const flashRef = useRef(0);

    const BOLT_COLORS = [
        { r: 220, g: 235, b: 255 },
        { r: 245, g: 248, b: 255 },
        { r: 190, g: 215, b: 255 },
        { r: 255, g: 250, b: 245 },
    ];

    const randomColor = useCallback(() => {
        return BOLT_COLORS[Math.floor(Math.random() * BOLT_COLORS.length)];
    }, []);

    // Lightweight bolt generation — simple midpoint displacement, low depth
    const generateBolt = useCallback((sx, sy, ex, ey) => {
        const points = [{ x: sx, y: sy }];
        const dx = ex - sx;
        const dy = ey - sy;
        const len = Math.sqrt(dx * dx + dy * dy);
        const segments = Math.max(8, Math.min(18, Math.floor(len / 10)));
        const nx = -dy / len;
        const ny = dx / len;

        for (let i = 1; i < segments; i++) {
            const t = i / segments;
            const mid = Math.sin(t * Math.PI);
            const offset = (Math.random() - 0.5) * 20 * mid;
            points.push({
                x: sx + dx * t + nx * offset,
                y: sy + dy * t + ny * offset,
            });
        }
        points.push({ x: ex, y: ey });
        return points;
    }, []);

    const spawnBolt = useCallback((w, h) => {
        const edge = Math.floor(Math.random() * 4);
        const inset = 1;
        let sx, sy, ex, ey;
        const segLen = 200 + Math.random() * 450;

        switch (edge) {
            case 0: sx = Math.random() * w; sy = inset; ex = Math.min(w, Math.max(0, sx + (Math.random() - 0.5) * segLen)); ey = inset; break;
            case 1: sx = w - inset; sy = Math.random() * h; ex = w - inset; ey = Math.min(h, Math.max(0, sy + (Math.random() - 0.5) * segLen)); break;
            case 2: sx = Math.random() * w; sy = h - inset; ex = Math.min(w, Math.max(0, sx + (Math.random() - 0.5) * segLen)); ey = h - inset; break;
            case 3: sx = inset; sy = Math.random() * h; ex = inset; ey = Math.min(h, Math.max(0, sy + (Math.random() - 0.5) * segLen)); break;
        }

        const color = randomColor();
        const points = generateBolt(sx, sy, ex, ey);

        // 0-1 branch only
        const branches = [];
        if (Math.random() < 0.5 && points.length > 4) {
            const bi = Math.floor(points.length * 0.3 + Math.random() * points.length * 0.4);
            const bp = points[bi];
            const bLen = 12 + Math.random() * 30;
            const angle = Math.random() * Math.PI * 2;
            branches.push(generateBolt(bp.x, bp.y, bp.x + Math.cos(angle) * bLen, bp.y + Math.sin(angle) * bLen));
        }

        return {
            points,
            branches,
            color,
            life: 1.0,
            decay: 0.03 + Math.random() * 0.05,
            thickness: 1.2 + Math.random() * 1.0,
        };
    }, [randomColor, generateBolt]);

    // Lightweight 2-layer draw — no expensive shadowBlur
    const drawBolt = useCallback((ctx, points, color, alpha, thickness) => {
        if (points.length < 2 || alpha < 0.02) return;

        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }

        // Outer glow — wide halo
        ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha * 0.2})`;
        ctx.lineWidth = thickness * 12;
        ctx.stroke();

        // Mid glow — visible colored band
        ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${alpha * 0.5})`;
        ctx.lineWidth = thickness * 4;
        ctx.stroke();

        // Core — bright white center
        ctx.strokeStyle = `rgba(255, 255, 255, ${Math.min(1, alpha * 1.2)})`;
        ctx.lineWidth = thickness * 1.2;
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
            const dpr = window.devicePixelRatio;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = w + 'px';
            canvas.style.height = h + 'px';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };
        resize();
        window.addEventListener('resize', resize);

        let nextBoltTime = performance.now() * 0.001 + 0.5 + Math.random() * 2;

        const animate = (timestamp) => {
            const time = timestamp * 0.001;
            ctx.clearRect(0, 0, w, h);

            // Spawn bolts rarely — random intervals of 0.8s to 3s
            if (time > nextBoltTime) {
                boltsRef.current.push(spawnBolt(w, h));
                // Occasional double strike
                if (Math.random() < 0.25) {
                    boltsRef.current.push(spawnBolt(w, h));
                }
                // Subtle flash
                if (Math.random() < 0.3) {
                    flashRef.current = 0.06 + Math.random() * 0.06;
                }
                nextBoltTime = time + 0.8 + Math.random() * 2.2;
            }

            // Cap max bolts for safety
            if (boltsRef.current.length > 6) {
                boltsRef.current.splice(0, boltsRef.current.length - 6);
            }

            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            // Draw bolts
            for (let i = boltsRef.current.length - 1; i >= 0; i--) {
                const bolt = boltsRef.current[i];
                const alpha = bolt.life;

                drawBolt(ctx, bolt.points, bolt.color, alpha, bolt.thickness);

                for (const branch of bolt.branches) {
                    drawBolt(ctx, branch, bolt.color, alpha * 0.4, bolt.thickness * 0.5);
                }

                bolt.life -= bolt.decay;
                if (bolt.life <= 0) {
                    boltsRef.current.splice(i, 1);
                }
            }

            // Subtle flash
            if (flashRef.current > 0) {
                ctx.fillStyle = `rgba(220, 235, 255, ${flashRef.current})`;
                ctx.fillRect(0, 0, w, h);
                flashRef.current *= 0.82;
                if (flashRef.current < 0.003) flashRef.current = 0;
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationRef.current);
            window.removeEventListener('resize', resize);
            boltsRef.current = [];
        };
    }, [spawnBolt, drawBolt]);

    return (
        <div className="viewport-neon-root" aria-hidden="true">
            <canvas ref={canvasRef} className="viewport-lightning-canvas" />
        </div>
    );
};

export default ViewportBorder;

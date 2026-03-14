import React, { useEffect, useRef } from 'react';
import '../../styles/ViewportBorder.css';

const ViewportBorder = () => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const dims = useRef({ w: 0, h: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const resize = () => {
            dims.current.w = window.innerWidth;
            dims.current.h = window.innerHeight;
            const dpr = window.devicePixelRatio || 1;
            canvas.width = dims.current.w * dpr;
            canvas.height = dims.current.h * dpr;
            canvas.style.width = dims.current.w + 'px';
            canvas.style.height = dims.current.h + 'px';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };
        resize();
        window.addEventListener('resize', resize);

        // ============ ATMOSPHERIC OBJECTS ============
        const objects = [];
        const MAX_OBJECTS = 12;

        // ============ MOUSE STATE ============
        let mouseX = dims.current.w / 2;
        let mouseY = dims.current.h / 2;
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

        class AtmosphericObject {
            constructor(type) {
                this.type = type;
                this.init();
            }

            init() {
                const { w, h } = dims.current;
                const side = Math.floor(Math.random() * 4);
                const padding = 100;

                if (side === 0) { // Top
                    this.x = Math.random() * w;
                    this.y = -padding;
                    this.tx = Math.random() * w;
                    this.ty = h + padding;
                } else if (side === 1) { // Right
                    this.x = w + padding;
                    this.y = Math.random() * h;
                    this.tx = -padding;
                    this.ty = Math.random() * h;
                } else if (side === 2) { // Bottom
                    this.x = Math.random() * w;
                    this.y = h + padding;
                    this.tx = Math.random() * w;
                    this.ty = -padding;
                } else { // Left
                    this.x = -padding;
                    this.y = Math.random() * h;
                    this.tx = w + padding;
                    this.ty = Math.random() * h;
                }

                const dx = this.tx - this.x;
                const dy = this.ty - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy) || 1;
                
                const baseSpeed = this.type === 'star' ? 4 + Math.random() * 4 : 12 + Math.random() * 15;
                this.vx = (dx / dist) * baseSpeed;
                this.vy = (dy / dist) * baseSpeed;

                this.history = [];
                this.maxHistory = this.type === 'star' ? 40 : 15;
                this.life = 1.0;
                this.size = this.type === 'star' ? 1.5 + Math.random() * 1.5 : 0.8 + Math.random() * 1.2;
                this.hue = this.type === 'star' ? 200 + Math.random() * 40 : 180 + Math.random() * 20;
                this.opacity = 0;
                this.active = true;
            }

            update() {
                this.history.unshift({ x: this.x, y: this.y });
                if (this.history.length > this.maxHistory) this.history.pop();

                this.x += this.vx;
                this.y += this.vy;

                if (this.life > 0.1) this.opacity = Math.min(1, this.opacity + 0.05);
                
                const { w, h } = dims.current;
                if (this.x < -200 || this.x > w + 200 || this.y < -200 || this.y > h + 200) {
                    this.active = false;
                }
            }

            draw() {
                if (!this.active || this.history.length < 2) return;
                const head = this.history[0];
                const tail = this.history[this.history.length - 1];
                ctx.save();
                ctx.globalCompositeOperation = 'lighter';

                ctx.beginPath();
                ctx.moveTo(head.x, head.y);
                for (let i = 1; i < this.history.length; i++) {
                    ctx.lineTo(this.history[i].x, this.history[i].y);
                }
                
                const grad = ctx.createLinearGradient(head.x, head.y, tail.x, tail.y);
                const color = `hsla(${this.hue}, 80%, 90%, ${this.opacity})`;
                grad.addColorStop(0, color);
                grad.addColorStop(1, 'transparent');
                ctx.strokeStyle = grad;
                ctx.lineWidth = this.size;
                ctx.lineCap = 'round';
                ctx.stroke();

                const glowSize = this.size * (this.type === 'star' ? 8 : 4);
                const headGrad = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, glowSize);
                headGrad.addColorStop(0, `hsla(${this.hue}, 100%, 95%, ${this.opacity * 0.8})`);
                headGrad.addColorStop(0.3, `hsla(${this.hue}, 100%, 70%, ${this.opacity * 0.3})`);
                headGrad.addColorStop(1, 'transparent');
                ctx.fillStyle = headGrad;
                ctx.beginPath();
                ctx.arc(head.x, head.y, glowSize, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }

        const spawn = () => {
            if (objects.length < MAX_OBJECTS) {
                objects.push(new AtmosphericObject(Math.random() > 0.7 ? 'star' : 'meteor'));
            }
        };

        const animate = (timestamp) => {
            const time = timestamp * 0.001;
            const { w, h } = dims.current;
            ctx.clearRect(0, 0, w, h);

            if (Math.random() < 0.02) spawn();

            for (let i = objects.length - 1; i >= 0; i--) {
                const obj = objects[i];
                obj.update();
                obj.draw();
                if (!obj.active) objects.splice(i, 1);
            }

            const speed = Math.sqrt(mouseVX * mouseVX + mouseVY * mouseVY);

            ctx.save();
            ctx.globalCompositeOperation = 'lighter';

            if (speed > 1) {
                const trailHue = 220 + Math.sin(time) * 40;
                mouseTrail.push({ x: mouseX, y: mouseY, life: 1.0, hue: trailHue, size: Math.min(6, 1.5 + speed * 0.1) });
                if (mouseTrail.length > MAX_TRAIL) mouseTrail.shift();

                if (speed > 5) {
                    const count = Math.min(3, Math.floor(speed * 0.2));
                    for (let p = 0; p < count; p++) {
                        const angle = Math.atan2(mouseVY, mouseVX) + (Math.random() - 0.5) * Math.PI * 0.8;
                        mouseParticles.push({
                            x: mouseX, y: mouseY,
                            vx: Math.cos(angle) * (1 + Math.random() * 2.5),
                            vy: Math.sin(angle) * (1 + Math.random() * 2.5),
                            life: 1.0, hue: (trailHue + Math.random() * 40 - 20), size: 0.8 + Math.random() * 2
                        });
                        if (mouseParticles.length > MAX_PARTICLES) mouseParticles.shift();
                    }
                }
            }

            for (let i = mouseTrail.length - 1; i >= 0; i--) {
                const t = mouseTrail[i];
                t.life -= 0.03;
                if (t.life <= 0) { mouseTrail.splice(i, 1); continue; }
                const alpha = t.life;
                const tGrad = ctx.createRadialGradient(t.x, t.y, 0, t.x, t.y, t.size * 2.5 * alpha);
                tGrad.addColorStop(0, `hsla(${t.hue}, 100%, 85%, ${alpha * 0.6})`);
                tGrad.addColorStop(0.4, `hsla(${t.hue}, 100%, 60%, ${alpha * 0.25})`);
                tGrad.addColorStop(1, 'transparent');
                ctx.fillStyle = tGrad;
                const r = t.size * 2.5;
                ctx.fillRect(t.x - r, t.y - r, r * 2, r * 2);
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

            for (let i = mouseParticles.length - 1; i >= 0; i--) {
                const p = mouseParticles[i];
                p.x += p.vx; p.y += p.vy;
                p.vx *= 0.95; p.vy *= 0.95; p.vy += 0.04;
                p.life -= 0.025;
                if (p.life <= 0) { mouseParticles.splice(i, 1); continue; }
                const pGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
                const alpha = p.life;
                pGrad.addColorStop(0, `hsla(${p.hue}, 100%, 90%, ${alpha * 0.8})`);
                pGrad.addColorStop(0.5, `hsla(${p.hue}, 100%, 65%, ${alpha * 0.3})`);
                pGrad.addColorStop(1, 'transparent');
                ctx.fillStyle = pGrad;
                ctx.fillRect(p.x - p.size * 2, p.y - p.size * 2, p.size * 4, p.size * 4);
            }

            const cursorHue = 220 + Math.sin(time * 2) * 20;
            const pulse = 0.6 + 0.4 * Math.sin(time * 8);
            const r = 25 + speed * 1.5;
            const cGrad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, r * pulse);
            cGrad.addColorStop(0, `hsla(${cursorHue}, 100%, 85%, ${0.25 * pulse})`);
            cGrad.addColorStop(0.4, `hsla(${cursorHue}, 100%, 65%, ${0.1 * pulse})`);
            cGrad.addColorStop(1, 'transparent');
            ctx.fillStyle = cGrad;
            ctx.fillRect(mouseX - r, mouseY - r, r * 2, r * 2);

            mouseVX *= 0.85;
            mouseVY *= 0.85;
            ctx.restore();
            animationRef.current = requestAnimationFrame(animate);
        };
        animationRef.current = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationRef.current);
            window.removeEventListener('resize', resize);
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

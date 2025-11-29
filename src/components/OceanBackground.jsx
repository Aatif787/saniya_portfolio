import React, { useEffect, useRef } from 'react';

const rand = (min, max) => Math.random() * (max - min) + min;

const colors = ['#63B3ED', '#10B981', '#F59E0B', '#EC4899', '#6366F1', '#3B82F6'];

const Fish = ({ index }) => {
  const size = rand(18, 42);
  const duration = rand(18, 38);
  const delay = rand(0, 8);
  const top = rand(5, 90);
  const hue = colors[index % colors.length];
  const flip = Math.random() > 0.5 ? 1 : -1;
  return (
    <svg
      className="absolute fish"
      style={{
        top: `${top}%`,
        left: flip === 1 ? '-10%' : '110%',
        width: size,
        height: size,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        transform: `scaleX(${flip})`,
        opacity: 0.9
      }}
      viewBox="0 0 100 60"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id={`body-${index}`} x1="0" x2="1">
          <stop offset="0%" stopColor={hue} />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.25" />
        </linearGradient>
      </defs>
      <path d="M20 30 C30 5, 70 5, 80 30 C70 55, 30 55, 20 30 Z" fill={`url(#body-${index})`} />
      <polygon points="80,30 100,15 100,45" fill={hue} />
      <circle cx="28" cy="28" r="3" fill="#1F2937" />
    </svg>
  );
};

const OceanBackground = () => {
  const canvasRef = useRef(null);
  const ripplesRef = useRef([]);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
    };
    resize();
    const onResize = () => resize();
    window.addEventListener('resize', onResize);

    const addRipple = (x, y) => {
      ripplesRef.current.push({ x: x * dpr, y: y * dpr, r: 0, a: 0.7 });
      if (ripplesRef.current.length > 64) ripplesRef.current.shift();
    };

    const onMove = (e) => {
      addRipple(e.clientX, e.clientY);
    };
    const onClick = (e) => {
      addRipple(e.clientX, e.clientY);
      addRipple(e.clientX + 12, e.clientY + 8);
      addRipple(e.clientX - 12, e.clientY - 8);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('click', onClick);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'lighter';
      ripplesRef.current.forEach(r => {
        r.r += 2 * dpr;
        r.a *= 0.965;
        ctx.beginPath();
        const grad = ctx.createRadialGradient(r.x, r.y, r.r * 0.2, r.x, r.y, r.r);
        grad.addColorStop(0, `rgba(99,102,241,${r.a})`);
        grad.addColorStop(1, `rgba(16,185,129,0)`);
        ctx.fillStyle = grad;
        ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
        ctx.fill();
      });
      ripplesRef.current = ripplesRef.current.filter(r => r.a > 0.02 && r.r < Math.max(canvas.width, canvas.height));
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('click', onClick);
    };
  }, []);

  const fishCount = Math.max(10, Math.min(24, Math.floor(window.innerWidth / 80)));

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: fishCount }).map((_, i) => (
          <Fish key={i} index={i} />
        ))}
      </div>
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
};

export default OceanBackground;


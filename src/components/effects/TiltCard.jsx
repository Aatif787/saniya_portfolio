import React, { useRef, useEffect } from 'react';

const isTouch = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(pointer: coarse)').matches;
};

const TiltCard = ({ children, maxTilt = 8, scale = 1.02, className }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (isTouch()) return;
    const el = ref.current;
    if (!el) return;
    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rx = ((y / rect.height) - 0.5) * -2 * maxTilt;
      const ry = ((x / rect.width) - 0.5) * 2 * maxTilt;
      el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})`;
    };
    const reset = () => {
      el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
    };
    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', reset);
    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', reset);
    };
  }, [maxTilt, scale]);

  const child = React.Children.only(children);
  const mergedClass = `${child.props.className ?? ''} ${className ?? ''}`.trim();
  return React.cloneElement(child, { ref, className: mergedClass, style: { willChange: 'transform' } });
};

export default TiltCard;


import React, { useEffect, useRef } from 'react';

export default function TrailingParticles() {
  const containerRef = useRef(null);

  useEffect(() => {
    const createParticle = (x, y) => {
      const particle = document.createElement('div');
      particle.className = 'fixed bg-purple-400 rounded-full pointer-events-none z-[9999]';
      particle.style.width = '8px';
      particle.style.height = '8px';
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.transform = 'translate(-50%, -50%)';
      particle.style.opacity = 0.8;
      document.body.appendChild(particle);

      setTimeout(() => {
        particle.style.transition = 'all 400ms ease-out';
        particle.style.opacity = 0;
        particle.style.transform = 'translate(-50%, -50%) scale(2)';
      }, 10);

      setTimeout(() => particle.remove(), 410);
    };

    const handleMouseMove = (e) => {
      createParticle(e.clientX, e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="fixed top-0 left-0 w-screen h-screen pointer-events-none z-[9999]" />
  );
}

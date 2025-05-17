import React, { useEffect } from 'react';

export default function CursorRipple() {
  useEffect(() => {
    const createRipple = (x, y) => {
      const ripple = document.createElement('div');
      ripple.className = 'fixed bg-purple-400 opacity-30 rounded-full pointer-events-none z-[9999] ripple-effect';
      ripple.style.width = '20px';
      ripple.style.height = '20px';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.style.transform = 'translate(-50%, -50%) scale(1)';
      ripple.style.transition = 'transform 500ms ease-out, opacity 500ms ease-out';
      document.body.appendChild(ripple);

      // Trigger the ripple expansion
      requestAnimationFrame(() => {
        ripple.style.transform = 'translate(-50%, -50%) scale(5)';
        ripple.style.opacity = '0';
      });

      // Clean up ripple after animation
      setTimeout(() => ripple.remove(), 500);
    };

    const handleMouseMove = (e) => {
      createRipple(e.clientX, e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return null; // No visible component needed
}

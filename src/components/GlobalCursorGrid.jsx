import { useEffect } from "react";

export default function GlobalCursorGrid() {
  useEffect(() => {
    let timeoutId;

    const updateCursorGlow = (e) => {
      document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);
      document.body.classList.add('glow-grid');

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        document.body.classList.remove('glow-grid');
      }, 1000);
    };

    window.addEventListener('mousemove', updateCursorGlow);

    return () => {
      window.removeEventListener('mousemove', updateCursorGlow);
      clearTimeout(timeoutId);
      document.body.classList.remove('glow-grid');
    };
  }, []);

  return null;
}

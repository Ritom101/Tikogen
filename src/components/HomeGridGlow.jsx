// ✅ src/components/HomeGridGlow.jsx
import { useEffect } from "react";
import CursorGrid from "./CursorGrid";

export default function HomeGridGlow() {
  useEffect(() => {
    let timeoutId;

    document.documentElement.style.setProperty('--cursor-x', `50%`);
    document.documentElement.style.setProperty('--cursor-y', `50%`);

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
      document.body.classList.remove('glow-grid');   // 💥 clear any leftover
    };
  }, []);

  return <CursorGrid />;
}

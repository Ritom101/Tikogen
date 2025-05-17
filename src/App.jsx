// src/App.jsx
import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import CursorGrid from "./components/CursorGrid";

export default function App() {
  const location = useLocation();
  const [showGrid, setShowGrid] = useState(false);

  // ✅ Enable grid only on Home
  useEffect(() => {
    setShowGrid(location.pathname === "/" || location.pathname === "/home");
  }, [location.pathname]);

  // ✅ Grid animation logic
  useEffect(() => {
    let timeoutId;

    document.documentElement.style.setProperty('--cursor-x', `50%`);
    document.documentElement.style.setProperty('--cursor-y', `50%`);

    const updateCursorGlow = (e) => {
      document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);
      if (showGrid) {
        document.body.classList.add('glow-grid');
      }

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        document.body.classList.remove('glow-grid');
      }, 300000);
    };

    window.addEventListener('mousemove', updateCursorGlow);

    return () => {
      window.removeEventListener('mousemove', updateCursorGlow);
      clearTimeout(timeoutId);
    };
  }, [showGrid]);

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* ✅ Grid only on home */}
      {showGrid && <CursorGrid />}

      {/* ✅ Navbar on all pages */}
      <Navbar />

      {/* ✅ Render the current route content */}
      <Outlet />
    </div>
  );
}

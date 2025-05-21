import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import HamburgerMenu from "react-hamburger-menu";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const startY = useRef(null);
  const drawerRef = useRef(null);

  const handleLogoClick = () => {
    if (location.pathname === "/" || location.pathname === "/home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
    setMobileMenuOpen(false);
  };

  const handleFeaturesClick = () => {
    if (location.pathname === "/" || location.pathname === "/home") {
      const el = document.getElementById("features");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/#features");
    }
    setMobileMenuOpen(false);
  };

  // ✅ Swipe down to close drawer
  const handleTouchStart = (e) => {
    startY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    if (!startY.current) return;
    const currentY = e.touches[0].clientY;
    const diff = currentY - startY.current;
    if (diff > 80) {
      setMobileMenuOpen(false);
      startY.current = null;
    }
  };

  useEffect(() => {
    // Reset swipe state on drawer open/close
    startY.current = null;
  }, [mobileMenuOpen]);

  return (
    <div className="fixed top-12 left-1/2 transform -translate-x-1/2 z-50 font-poppins w-full max-w-5xl px-4">
      <nav className="relative flex justify-between items-center bg-white bg-opacity-80 backdrop-blur-lg shadow-xl px-4 py-0.5 md:py-1 rounded-full mx-auto">
        {/* Logo */}
        <div onClick={() => navigate("/")} className="flex items-center cursor-pointer h-[48px]">
          <img src="/logo.png" alt="Tikogen Logo" className="h-[40px] w-auto -mt-2.5" />
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center space-x-6 text-black text-lg font-semibold tracking-wide">
          <li onClick={handleFeaturesClick} className="hover:text-purple-600 cursor-pointer">Features</li>
          <li><NavLink to="/about" className="hover:text-purple-600">About</NavLink></li>
          <li><NavLink to="/contact" className="hover:text-purple-600">Contact</NavLink></li>
          <li><NavLink to="/demo" className="hover:text-purple-600">Demo</NavLink></li>
        </ul>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <HamburgerMenu
            isOpen={mobileMenuOpen}
            menuClicked={() => setMobileMenuOpen(!mobileMenuOpen)}
            width={24}
            height={18}
            strokeWidth={2}
            rotate={0}
            color="black"
            borderRadius={2}
            animationDuration={0.4}
          />
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
       <div
          ref={drawerRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          className="fixed top-[80px] right-4 w-30 bg-white/20 backdrop-blur-md border border-white/30 shadow-xl rounded-xl p-4 z-50 space-y-4 text-right md:hidden"
       >
          <button
            onClick={handleFeaturesClick}
            className="block w-full text-right text-base font-semibold text-black hover:text-purple-600 transition"
          >
            Features
          </button>
          <NavLink
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full text-right text-base font-semibold text-black hover:text-purple-600 transition"
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full text-right text-base font-semibold text-black hover:text-purple-600 transition"
          >
            Contact
          </NavLink>
          <NavLink
            to="/demo"
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full text-right text-base font-semibold text-black hover:text-purple-600 transition"
          >
            Demo
          </NavLink>
       </div>
      )}
    </div>
  );
}

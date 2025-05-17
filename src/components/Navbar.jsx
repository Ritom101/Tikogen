import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaCloud, FaShieldAlt, FaRobot, FaRocket, FaBuilding, FaPhone, FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleMouseEnter = (menu) => setOpenMenu(menu);
  const handleMouseLeave = () => setOpenMenu(null);

  const handleLogoClick = () => {
    if (location.pathname === "/home" || location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  const handleFeaturesClick = () => {
    if (location.pathname === "/home" || location.pathname === "/") {
      const el = document.getElementById("features");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/#features");
    }
  };

  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 font-poppins w-full max-w-5xl px-4">
      <nav className="relative flex justify-between items-center bg-white bg-opacity-80 backdrop-blur-lg shadow-xl px-6 py-3 rounded-full mx-auto">

        {/* Left: Logo */}
        <div onClick={handleLogoClick} className="flex items-center cursor-pointer">
          <img src={logo} alt="Tikogen Logo" className="h-10 w-10 mr-2 rounded-full" />
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent tracking-wide">
            Tikogen
          </h1>
        </div>

        {/* Right: Nav Items */}
        <ul className="hidden md:flex items-center space-x-6 text-black text-lg font-semibold tracking-wide">
          <li
            className="relative hover:text-purple-600 cursor-pointer"
            onMouseEnter={() => handleMouseEnter("features")}
            onMouseLeave={handleMouseLeave}
            onClick={handleFeaturesClick}
          >
            Features
            {openMenu === "features" && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute left-0 top-full mt-2 bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-200 shadow-xl hover:shadow-2xl rounded-full px-4 py-5 w-[18rem] z-50 hover:scale-105 transition"
                  onMouseEnter={() => handleMouseEnter("features")}
                  onMouseLeave={handleMouseLeave}
                >
                  <ul className="space-y-3 text-center">
                    <li><div className="flex items-center space-x-3 justify-center"><FaCloud className="text-purple-600 text-xl" /><span className="text-sm font-semibold text-gray-800">Multi-Cloud Management</span></div></li>
                    <li><div className="flex items-center space-x-3 justify-center"><FaShieldAlt className="text-purple-600 text-xl" /><span className="text-sm font-semibold text-gray-800">Enterprise Security Tool</span></div></li>
                    <li><div className="flex items-center space-x-3 justify-center"><FaRobot className="text-purple-600 text-xl" /><span className="text-sm font-semibold text-gray-800">AI Driven Automation</span></div></li>
                    <li><div className="flex items-center space-x-3 justify-center"><FaRocket className="text-purple-600 text-xl" /><span className="text-sm font-semibold text-gray-800">One-Click Deployment</span></div></li>
                  </ul>
                </motion.div>
              </AnimatePresence>
            )}
          </li>

          <li><NavLink to="/about" className="hover:text-purple-600">About</NavLink></li>
          <li><NavLink to="/contact" className="hover:text-purple-600">Contact</NavLink></li>
          <li><NavLink to="/demo" className="hover:text-purple-600">Demo</NavLink></li>
        </ul>

        {/* Hamburger for mobile */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed top-0 right-0 w-64 h-full bg-white shadow-xl z-50 p-6 flex flex-col space-y-6"
          >
            <button onClick={() => { setMobileMenuOpen(false); handleLogoClick(); }} className="text-2xl font-bold">
              Tikogen
            </button>
            <button onClick={() => { setMobileMenuOpen(false); handleFeaturesClick(); }} className="text-lg">Features</button>
            <NavLink to="/about" onClick={() => setMobileMenuOpen(false)} className="text-lg">About</NavLink>
            <NavLink to="/contact" onClick={() => setMobileMenuOpen(false)} className="text-lg">Contact</NavLink>
            <NavLink to="/demo" onClick={() => setMobileMenuOpen(false)} className="text-lg">Demo</NavLink>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

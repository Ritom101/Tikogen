import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import CursorGrid from "../components/CursorGrid";
import GlobalCursorGlow from "../components/GlobalCursorGlow";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        // slight delay to allow layout to paint
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    }
  }, [location]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white">
      {/* ✅ ONLY Home uses Grid + Glow */}
      <CursorGrid />
      <GlobalCursorGlow />

      <div className="relative z-10 pt-32 px-4 max-w-6xl mx-auto">
        {/* Hero section */}
        <section className="text-center">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-6">
            Automate Your CloudOps with AI
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Tikogen: AI-powered CloudOps Assistant to simplify infrastructure management.
          </p>
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full text-lg font-semibold shadow hover:shadow-lg">
            Get Started
          </button>
        </section>

        {/* ✅ Features Section with premium card style */}
        <section id="features" className="mt-32 scroll-mt-32">
          {/* 💥 Bulletproof grid blocker ONLY for Features Section */}
          <style>{`
            #features canvas,
            #features .cursor-grid-overlay,
            #features .react-grid-background,
            #features .grid-background,
            #features .background-grid {
              display: none !important;
            }
          `}</style>

          <h2 className="text-4xl font-extrabold text-center text-purple-700 mb-12">
            Tikogen Premium Features 🚀
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-3xl shadow-xl p-6 hover:scale-105 transition-all">
              <h3 className="text-2xl font-bold text-purple-600 mb-3">☁️ Multi-Cloud Management</h3>
              <p className="text-gray-600">Manage AWS, Azure, GCP, and more from a single AI-powered dashboard.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-3xl shadow-xl p-6 hover:scale-105 transition-all">
              <h3 className="text-2xl font-bold text-pink-600 mb-3">🔐 Enterprise Security</h3>
              <p className="text-gray-600">Proactive security audits, identity management, and policy automation.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-3xl shadow-xl p-6 hover:scale-105 transition-all">
              <h3 className="text-2xl font-bold text-green-600 mb-3">🤖 AI Driven Automation</h3>
              <p className="text-gray-600">Let Tikogen automatically handle provisioning, scaling, and optimization.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-3xl shadow-xl p-6 hover:scale-105 transition-all">
              <h3 className="text-2xl font-bold text-yellow-600 mb-3">🚀 One-Click Deployment</h3>
              <p className="text-gray-600">Spin up production-ready environments with a single command inside Teams.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-3xl shadow-xl p-6 hover:scale-105 transition-all">
              <h3 className="text-2xl font-bold text-blue-600 mb-3">📊 Real-Time Insights</h3>
              <p className="text-gray-600">Get instant resource cost estimates + security issue alerts inside chat.</p>
            </div>
            <div className="bg-white border border-gray-200 rounded-3xl shadow-xl p-6 hover:scale-105 transition-all">
              <h3 className="text-2xl font-bold text-indigo-600 mb-3">🛡️ Self-Healing Automation</h3>
              <p className="text-gray-600">Let Tikogen auto-detect & fix infrastructure drift or failures in real-time.</p>
            </div>
          </div>
        </section>

        {/* Call to action */}
        <section className="mt-32 text-center">
          <h2 className="text-3xl font-bold mb-4">Start Automating Your Cloud Today</h2>
          <p className="text-lg text-gray-600 mb-6">
            Join 100+ engineers who’ve reduced cloud headaches using Tikogen.
          </p>
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full text-lg font-semibold shadow hover:shadow-lg">
            Request Demo
          </button>
        </section>
      </div>
    </div>
  );
}

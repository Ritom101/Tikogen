import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import CursorGrid from "../components/CursorGrid";
import GlobalCursorGlow from "../components/GlobalCursorGlow";

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    }
  }, [location]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-blue-50 via-white to-white">
      <CursorGrid />
      <GlobalCursorGlow />

      {/* ✨ Sparkle Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="w-full h-full animate-pulse bg-[radial-gradient(circle,_#ffffff22_1px,_transparent_1px)] [background-size:20px_20px] opacity-30 blur-sm"></div>
      </div>

      <div className="relative z-10 pt-32 px-4 max-w-6xl mx-auto">
        {/* ✅ Hero */}
        <motion.section
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-6">
            Automate Your CloudOps with AI
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Tikogen: AI-powered CloudOps Assistant to simplify infrastructure management.
          </p>
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full text-lg font-semibold shadow hover:shadow-lg">
            Get Started
          </button>
        </motion.section>

        {/* ✅ 3D Demo Video Box */}
        <motion.section
          className="relative mt-24 flex justify-center items-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="w-[90%] h-[100%] rounded-[32px] blur-3xl opacity-70 z-[-1] bg-gradient-to-br from-pink-200 via-purple-200 to-blue-100"></div>
          </div>
          <div className="w-full max-w-5xl aspect-video rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.1)] border border-white/40 bg-white bg-opacity-30 backdrop-blur-lg">
            <iframe
              src="https://player.vimeo.com/video/76979871"
              title="Tikogen Demo"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </motion.section>

        {/* ✅ Features */}
        <section id="features" className="mt-32 scroll-mt-32">
          <style>{`
            #features canvas,
            #features .cursor-grid-overlay,
            #features .react-grid-background,
            #features .grid-background,
            #features .background-grid {
              display: none !important;
            }
          `}</style>

          <motion.h2
            className="text-4xl font-extrabold text-center text-purple-700 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Tikogen Premium Features 🚀
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1 }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
              hidden: {}
            }}
          >
            {[
              ["☁️ Multi-Cloud Management", "Manage AWS, Azure, GCP, and more from a single AI-powered dashboard.", "text-purple-600"],
              ["🔐 Enterprise Security", "Proactive security audits, identity management, and policy automation.", "text-pink-600"],
              ["🤖 AI Driven Automation", "Let Tikogen automatically handle provisioning, scaling, and optimization.", "text-green-600"],
              ["🚀 One-Click Deployment", "Spin up production-ready environments with a single command inside Teams.", "text-yellow-600"],
              ["📊 Real-Time Insights", "Get instant resource cost estimates + security issue alerts inside chat.", "text-blue-600"],
              ["🛡️ Self-Healing Automation", "Let Tikogen auto-detect & fix infrastructure drift or failures in real-time.", "text-indigo-600"]
            ].map(([title, desc, color], i) => (
              <motion.div
                key={i}
                className="bg-white border border-gray-200 rounded-3xl shadow-xl p-6 hover:scale-105 transition-all"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <h3 className={`text-2xl font-bold mb-3 ${color}`}>{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ✅ Why Tikogen */}
        <motion.section
          className="mt-32"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-center text-purple-800 mb-12">Why Tikogen?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              ["❌ Too Many Dashboards", "Clients struggle with managing AWS, Azure, GCP separately.", "✅ Tikogen unifies cloud control into one chat UI."],
              ["⏳ Wasted Time on Repetitive Tasks", "Manual provisioning, patching, and IAM reviews slow teams down.", "✅ Tikogen automates all that using natural language."],
              ["🛑 Cloud Cost Surprises", "Lack of cost awareness causes budget overshoot.", "✅ Tikogen predicts cost before you launch anything."]
            ].map(([title, pain, solution], i) => (
              <div key={i} className="bg-purple-50 border border-purple-200 rounded-2xl p-6 shadow hover:shadow-md">
                <h3 className="text-xl font-bold text-purple-700 mb-2">{title}</h3>
                <p className="text-gray-600 mb-2">{pain}</p>
                <p className="text-purple-700 font-medium">{solution}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ✅ CTA Banner */}
        <motion.section
          className="mt-32 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl py-12 px-6 text-center text-white shadow-lg"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4">See it in action 🚀</h2>
          <p className="text-lg mb-6">Request a live demo tailored to your infrastructure.</p>
          <button
            onClick={() => navigate("/demo")}
            className="bg-white text-purple-600 px-6 py-3 rounded-full text-lg font-semibold shadow hover:shadow-lg transition"
          >
            Request a Demo
          </button>
        </motion.section>

        {/* Scroll Target (placeholder for older anchor) */}
        <div id="contact-form" className="pt-32"></div>

        {/* ✅ Full-Width Footer with Cursor Grid */}
        <div className="relative mt-32">
          <CursorGrid />
          <footer className="relative z-10 w-full bg-gray-900 text-gray-300 text-sm py-12 px-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <h4 className="font-bold mb-3 text-white">Tikogen</h4>
                <p>© 2025 Tikogen Inc. All rights reserved.</p>
              </div>
              <div>
                <h4 className="font-bold mb-3 text-white">Product</h4>
                <ul className="space-y-1">
                  <li><a href="#features" className="hover:text-white">Features</a></li>
                  <li><a href="#" className="hover:text-white">Pricing</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-3 text-white">Company</h4>
                <ul className="space-y-1">
                  <li><a href="/about" className="hover:text-white">About</a></li>
                  <li><a href="/contact" className="hover:text-white">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-3 text-white">Legal</h4>
                <ul className="space-y-1">
                  <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white">Terms of Use</a></li>
                </ul>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

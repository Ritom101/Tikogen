import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import toast, { Toaster } from "react-hot-toast";
import CursorGrid from "../components/CursorGrid";
import GlobalCursorGlow from "../components/GlobalCursorGlow";

export default function Home() {
  const navigate = useNavigate();

  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [showTopBanner, setShowTopBanner] = useState(true);
  const [showSupportBadge, setShowSupportBadge] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [qrSeen, setQrSeen] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;

    if (!name || !email || !message) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    emailjs
      .send("service_kzkx5el", "template_ps7iu7z", formData, "I5ZnodqHe6rXNLDKU")
      .then(() => {
        toast.success("Message sent!");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setShowDemoModal(false), 3000);
      })
      .catch(() => toast.error("Failed to send"))
      .finally(() => setLoading(false));
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-blue-50 via-white to-white">
      <CursorGrid />
      <GlobalCursorGlow />

      {showTopBanner && (
        <div className="w-full h-10 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm flex items-center justify-center font-bold">
          <span
              onClick={() => {
                 setShowQRModal(true);
                 setQrSeen(true);
              }}
              className="cursor-pointer font-bold"
          >
            📢 We're raising funds for future development - Support innovation in AI 🚀 →
          </span>

          {qrSeen && ( // ✅ conditionally show ❌
            <button
                onClick={() => setShowTopBanner(false)}
                className="absolute right-3 text-blue-500 font-bold text-lg"
            >
              ❌
            </button>
          )}
        </div>
      )}

      {/* ✅ Mobile Fundraising Banner - shows only on small screens */}
      {showTopBanner && (
        <div className="flex md:hidden absolute top-0 left-0 w-full h-12 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs items-center justify-center font-bold z-50 px-2">
           📢 We're raising funds for innovation —&nbsp;
           <span
             onClick={() => setShowQRModal(true)}
             className="underline underline-offset-2 cursor-pointer font-bold"
           >
             Support AI 🚀
           </span>
        </div>
      )}

      {showSupportBadge && (
        <div className="fixed bottom-4 right-4 z-50 flex items-center space-x-2">
          <div
             onClick={() => {
                setShowQRModal(true);
                setQrSeen(true);
             }}
             className={`bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 cursor-pointer transition-all duration-300 ${scrolled ? 'scale-90' : 'scale-100'} animate-pulse`}
          >
            ❤️ Support Us
          </div>
          {qrSeen && (
            <button
              onClick={() => setShowSupportBadge(false)}
              className="text-red-500 font-bold text-xl"
            >
              ❌
            </button>
           )}
        </div>
      )}

      {/* Your full site content starts here */}
      <div className="relative z-10 pt-44 px-4 max-w-6xl mx-auto">
        {/* Full content remains unchanged (Hero, Chat, Features, etc.) */}
      </div>

      {/* ✅ Demo Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl max-w-md w-full relative shadow-xl">
            <button
              onClick={() => setShowDemoModal(false)}
              className="absolute top-2 right-3 text-red-500 text-xl font-bold"
            >
              ❌
            </button>
            <h3 className="text-xl font-bold mb-4">Request a Demo</h3>
            <form onSubmit={handleSend} className="space-y-4">
              <div>
                <label className="block font-medium">Full Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  className="w-full border px-4 py-2 rounded"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block font-medium">Email Address <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  className="w-full border px-4 py-2 rounded"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block font-medium">Message <span className="text-red-500">*</span></label>
                <textarea
                  className="w-full border px-4 py-2 rounded"
                  rows="3"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-full w-full"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ✅ QR Code Modal */}
      {showQRModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl text-center relative shadow-xl">
            <button
              onClick={() => setShowQRModal(false)}
              className="absolute top-2 right-3 text-red-500 text-xl font-bold"
            >
              ❌
            </button>
            <h3 className="text-xl font-bold mb-4">Support Us ❤️</h3>
            <img src="/qr-code.png" alt="Support QR" className="w-64 mx-auto rounded-md mb-4" />
            <p className="text-gray-700">Thank you for supporting Tikogen! 🙏</p>
          </div>
        </div>
      )}

      {/* ✨ Background Grid */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="w-full h-full animate-pulse bg-[radial-gradient(circle,_#ffffff22_1px,_transparent_1px)] [background-size:20px_20px] opacity-30 blur-sm"></div>
      </div>

      <div className="relative z-10 pt-18 md:pt-22 px-4 max-w-6xl mx-auto">
        {/* ✅ Hero */}
        <motion.section
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent mb-6 leading-tight">
            Automate Your CloudOps with AI
          </h1>
          <p className="text-base md:text-lg text-gray-600 mb-8 px-2 md:px-0">
            Tikogen: AI-powered CloudOps Assistant to simplify infrastructure management.
          </p>
        </motion.section>

        <div className="mt-6">
          {!started ? (
    // 👉 Get Started Button
            <button
               onClick={() => setStarted(true)}
               className="mx-auto block bg-gradient-to-r from-blue-500 to-pink-500 text-white font-semibold text-lg px-6 py-3 rounded-full shadow-lg transition-all hover:scale-105"
            >
              Get Started
            </button>
          ) : (
    // 👉 Scroll Down Badge
            <div className="mx-auto flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold text-base px-5 py-3 rounded-full w-fit shadow-lg">
               Scroll Down <span className="text-xl animate-bounce">⬇️</span>
            </div>
          )}
        </div>
    
        {/* ✅ Chat Simulation Section */}
        <motion.section
          className="mt-24 px-4 flex justify-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white w-full max-w-3xl p-6 rounded-3xl shadow-2xl border border-gray-200 space-y-4">
            <motion.div className="flex justify-start" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <img src="/avatar/bot.png" alt="Bot Avatar" className="w-10 h-10 rounded-full shadow-lg ring-2 ring-purple-400 mr-3" />
              <div className="bg-gray-100 text-gray-800 px-5 py-3 rounded-2xl max-w-sm rounded-bl-none">
                Hey there! 👋 Need help launching an EC2 instance?
              </div>
            </motion.div>

            <motion.div className="flex justify-end" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
              <div className="bg-blue-600 text-white px-5 py-3 rounded-2xl max-w-sm rounded-br-none">
                Yes please! t2.micro + Ubuntu 20.04
              </div>
              <img src="/avatar/user.png" alt="User Avatar" className="w-10 h-10 rounded-full shadow-lg ring-2 ring-blue-400 ml-3" />
            </motion.div>

            <motion.div className="flex justify-start" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.0 }}>
              <img src="/avatar/bot.png" alt="Bot Avatar" className="w-10 h-10 rounded-full shadow-lg ring-2 ring-purple-400 mr-3" />
              <div className="bg-gray-100 text-gray-800 px-5 py-3 rounded-2xl max-w-sm rounded-bl-none">
                Got it. Launching now with 20GB EBS. 🔄
              </div>
            </motion.div>

            <motion.div className="flex justify-end" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.2 }}>
              <div className="bg-blue-600 text-white px-5 py-3 rounded-2xl max-w-sm rounded-br-none">
                Awesome! Can you enable public IP?
              </div>
              <img src="/avatar/user.png" alt="User Avatar" className="w-10 h-10 rounded-full shadow-lg ring-2 ring-blue-400 ml-3" />
            </motion.div>

            <motion.div className="flex justify-start" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.2 }}>
              <img src="/avatar/bot.png" alt="Bot Avatar" className="w-10 h-10 rounded-full shadow-lg ring-2 ring-purple-400 mr-3" />
              <div className="bg-gray-100 text-gray-800 px-5 py-3 rounded-2xl max-w-sm rounded-bl-none">
                ✅ Done. Instance ready. IP: 13.234.56.78
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 5.2 }}
              className="flex justify-start"
            >
              <img src="/avatar/bot.png" alt="Bot Avatar" className="w-10 h-10 rounded-full shadow-lg ring-2 ring-purple-400 mr-3" />
              <div className="bg-gray-100 text-gray-800 px-5 py-3 rounded-2xl max-w-sm rounded-bl-none">
                 Also configured IAM role with S3ReadOnlyAccess.
              </div>
            </motion.div>

            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 6.2 }}
               className="flex justify-end"
            >
              <div className="bg-blue-600 text-white px-5 py-3 rounded-2xl max-w-sm rounded-br-none">
                Sweet! Can you tag it as “WebApp-Dev”?
              </div>
              <img src="/avatar/user.png" alt="User Avatar" className="w-10 h-10 rounded-full shadow-lg ring-2 ring-blue-400 ml-3" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 7.2 }}
              className="flex justify-start"
            >
             <img src="/avatar/bot.png" alt="Bot Avatar" className="w-10 h-10 rounded-full shadow-lg ring-2 ring-purple-400 mr-3" />
             <div className="bg-gray-100 text-gray-800 px-5 py-3 rounded-2xl max-w-sm rounded-bl-none">
                ✅ Tag added. You're all set! 🎉
             </div>
            </motion.div>
          </div>
        </motion.section>

        {/* ✅ Vimeo Demo */}
        <motion.section
          className="relative mt-24 flex justify-center items-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="w-[90%] h-[100%] rounded-[32px] blur-3xl opacity-70 z-[-1] bg-gradient-to-br from-pink-200 via-blue-200 to-blue-100"></div>
          </div>
          <div className="w-full max-w-3xl aspect-video rounded-2xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.1)] border border-white/40 bg-white bg-opacity-30 backdrop-blur-lg">
            <iframe
              src="https://player.vimeo.com/video/1085857140"
              title="Tikogen Demo"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </motion.section>

        {/* ✅ Request Demo Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => setShowDemoModal(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold shadow hover:shadow-lg transition"
          >
            Request a Demo
          </button>
        </div>

        {/* ✅ Features */}
        <section id="features" className="mt-32 scroll-mt-32">
          <motion.h2
            className="text-4xl font-extrabold text-center text-blue-700 mb-12"
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
            variants={{ visible: { transition: { staggerChildren: 0.1 } }, hidden: {} }}
          >
            {[["☁️ Multi-Cloud Management", "Manage AWS, Azure, GCP, and more from a single AI-powered dashboard.", "text-blue-600"],
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
          <h2 className="text-4xl font-bold text-center text-blue-800 mb-12">Why Tikogen?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[["❌ Too Many Dashboards", "Clients struggle with managing AWS, Azure, GCP separately.", "✅ Tikogen unifies cloud control into one chat UI."],
              ["⏳ Wasted Time on Repetitive Tasks", "Manual provisioning, patching, and IAM reviews slow teams down.", "✅ Tikogen automates all that using natural language."],
              ["🛑 Cloud Cost Surprises", "Lack of cost awareness causes budget overshoot.", "✅ Tikogen predicts cost before you launch anything."]
            ].map(([title, pain, solution], i) => (
              <div key={i} className="bg-blue-50 border border-blue-200 rounded-2xl p-6 shadow hover:shadow-md">
                <h3 className="text-xl font-bold text-blue-700 mb-2">{title}</h3>
                <p className="text-gray-600 mb-2">{pain}</p>
                <p className="text-blue-700 font-medium">{solution}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* ✅ Support Us Button */}
        <div className="mt-12 text-center">
          <button
            onClick={() => setShowQRModal(true)}
            className="bg-gray-800 text-white px-6 py-3 rounded-full text-lg font-semibold shadow hover:shadow-lg transition"
          >
            Support Us via Scan ❤️
          </button>
        </div>

        {/* ✅ CTA Banner */}
        <motion.section
          className="mt-32 bg-gradient-to-r from-blue-600 to-pink-600 rounded-2xl py-12 px-6 text-center text-white shadow-lg"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4">See it in action 🚀</h2>
          <p className="text-lg mb-6">Request a live demo tailored to your infrastructure.</p>
          <button
            onClick={() => navigate("/demo")}
            className="bg-white text-blue-600 px-6 py-3 rounded-full text-lg font-semibold shadow hover:shadow-lg transition"
          >
            Request a Demo
          </button>
        </motion.section>

        {/* ✅ Footer Full Width */}
        <div className="relative mt-32 w-full">
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

      {/* ✅ Demo Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl max-w-md w-full relative shadow-xl">
            <button
              onClick={() => setShowDemoModal(false)}
              className="absolute top-2 right-3 text-red-500 text-xl font-bold"
            >
              ❌
            </button>
            <h3 className="text-xl font-bold mb-4">Request a Demo</h3>
            <form onSubmit={handleSend} className="space-y-4">
              <div>
                <label className="block font-medium">Full Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  className="w-full border px-4 py-2 rounded"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className="block font-medium">Email Address <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  className="w-full border px-4 py-2 rounded"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block font-medium">Message <span className="text-red-500">*</span></label>
                <textarea
                  className="w-full border px-4 py-2 rounded"
                  rows="3"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-full w-full"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ✅ QR Code Modal */}
      {showQRModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl text-center relative shadow-xl">
            <button
              onClick={() => setShowQRModal(false)}
              className="absolute top-2 right-3 text-red-500 text-xl font-bold"
            >
              ❌
            </button>
            <h3 className="text-xl font-bold mb-4">Support Us ❤️</h3>
            <img src="/qr-code.png" alt="Support QR" className="w-64 mx-auto rounded-md mb-4" />
            <p className="text-gray-700">Thank you for supporting Tikogen! 🙏</p>
          </div>
        </div>
      )}

      <Toaster position="bottom-center" />
    </div>
  );
}

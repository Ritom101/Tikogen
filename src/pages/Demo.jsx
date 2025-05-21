import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { motion, AnimatePresence } from "framer-motion";

export default function Demo() {
  const [showForm, setShowForm] = useState(false);
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="relative bg-white text-black overflow-x-hidden min-h-screen">
      <Navbar />

      {/* ✅ Top Info Section */}
      <section className="bg-blue-50 pt-32 pb-20 px-6">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-12">
          What You’ll See in the Demo
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {[
            ["🤖 AI Commands", "Manage AWS infra using natural language in chat."],
            ["🚀 Live Provisioning", "Deploy EC2s, VPCs, IAM roles instantly."],
            ["💰 Cost Insights", "Get pre-launch AWS cost predictions."],
            ["🔐 IAM Audit", "Evaluate and improve access permissions."],
            ["💬 Teams Integration", "All operations within Microsoft Teams UI."],
            ["🛠 Terraform + Boto3", "Built for enterprise-scale automation."]
          ].map(([title, desc], i) => (
            <div key={i} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <p className="text-gray-600 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ Request Demo Section */}
      <section className="py-24 px-6 bg-white text-center">
        <h2 className="text-3xl font-bold text-blue-700 mb-6">See it in action 🚀</h2>
        <p className="text-gray-600 mb-6">Want a personalized walkthrough? We’ve got you.</p>
        <button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-blue-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition"
        >
          Request a Demo
        </button>
      </section>

      {/* ✅ Floating Support Us Button */}
      <button
        onClick={() => setShowQR(true)}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white px-6 py-3 text-lg font-semibold rounded-full shadow-xl hover:bg-blue-700 transition"
      >
        💜 Support Us via Scan 
      </button>

      {/* ✅ Demo Form Popup */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowForm(false)}
          >
            <motion.div
              className="bg-white rounded-2xl p-8 w-full max-w-lg relative"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-4 right-4 text-xl font-bold text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
              <h3 className="text-2xl font-bold text-blue-700 mb-4 text-center">
                Request a Demo
              </h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                />
                <textarea
                  placeholder="Tell us what you’d like to see..."
                  rows="4"
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Submit
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✅ QR Code Popup */}
      <AnimatePresence>
        {showQR && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-md flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowQR(false)}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 w-[90%] max-w-xs relative"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowQR(false)}
                className="absolute top-3 right-4 text-xl font-bold text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
              <h4 className="text-lg font-semibold text-center mb-4 text-blue-700">
                Support Us via UPI
              </h4>
              <img
                src="/qr-code.png"
                alt="QR Code"
                className="w-full rounded-md"
              />
              <p className="text-center text-gray-500 text-xs mt-2">
                Scan with any UPI app to support us 🙏
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

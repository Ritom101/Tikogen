import React, { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import toast, { Toaster } from "react-hot-toast";
import emailjs from "@emailjs/browser";

export default function Demo() {
  const [showForm, setShowForm] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    reason: "Demo Request",
    message: "",
  });
  const [usedEmails, setUsedEmails] = useState([]);
  const formRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) {
        setShowForm(false);
      }
    };
    if (showForm) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showForm]);

  const validateForm = () => {
    const { name, email, message } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name || !email || !message) return toast.error("All fields are required.");
    if (!emailRegex.test(email)) return toast.error("Invalid email.");
    if (usedEmails.includes(email)) return toast.error("Email already used.");
    return true;
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSending(true);
    try {
      await emailjs.send("service_kzkx5el", "template_ps7iu7z", formData, "I5ZnodqHe6rXNLDKU");
      toast.success("Demo request sent!");
      setUsedEmails((prev) => [...prev, formData.email]);
      setTimeout(() => setShowForm(false), 4000);
    } catch (err) {
      toast.error("Failed to send. Try again.");
    } finally {
      setIsSending(false);
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="relative min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <Toaster position="top-center" />

      {/* Hero */}
      <section className="pt-32 pb-12 text-center px-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
          See Tikogen in Action
        </h1>
        <p className="mt-4 text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
          Watch the AI-powered cloud automation experience, and book a personal walkthrough.
        </p>
      </section>

      {/* Vimeo Video */}
      <section className="flex justify-center mb-10 px-4">
        <div className="w-full max-w-3xl aspect-video bg-black rounded-2xl shadow-lg overflow-hidden">
          <iframe
            src="https://player.vimeo.com/video/76979871"
            title="Tikogen Demo"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
      </section>

      {/* Features */}
      <section className="bg-purple-50 py-12 px-6 sm:px-12">
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-8">What You’ll See in the Demo</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            ["🤖 AI Commands", "Manage AWS infra using natural language in chat."],
            ["🚀 Live Provisioning", "Deploy EC2s, VPCs, IAM roles instantly."],
            ["💰 Cost Insights", "Get pre-launch AWS cost predictions."],
            ["🔐 IAM Audit", "Evaluate and improve access permissions."],
            ["💬 Teams Integration", "All operations within Microsoft Teams UI."],
            ["🛠 Powered by Terraform + Boto3", "Built for enterprise-scale automation."]
          ].map(([title, desc], i) => (
            <div key={i} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <p className="text-gray-600 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA: Request Demo */}
      <section className="text-center py-12 px-4">
        <h3 className="text-2xl font-bold text-purple-600 mb-4">Want a Personalized Demo?</h3>
        <p className="text-gray-600 mb-6 max-w-md mx-auto text-sm sm:text-base">
          Let our engineers walk you through Tikogen’s capabilities — tailored for your team.
        </p>
        <button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-6 py-3 rounded-full hover:shadow-lg transition"
        >
          Request a Demo
        </button>
      </section>

      {/* Pop-up Demo Request Form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/30 backdrop-blur-sm">
          <form
            ref={formRef}
            onSubmit={sendEmail}
            className="relative w-[90%] sm:w-[340px] p-4 text-xs sm:text-sm bg-white bg-opacity-90 backdrop-blur-xl shadow-2xl rounded-[40px] space-y-3 animate-fade-in border border-white/30"
          >
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-3 text-red-500 text-2xl font-bold hover:scale-110 transition"
            >
              ❌
            </button>

            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Jane Doe"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-full focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-full focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Company Name <span className="text-gray-400">(optional)</span>
              </label>
              <input
                type="text"
                name="company"
                placeholder="Your Company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-full focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Your Message <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                placeholder="Type your request..."
                value={formData.message}
                onChange={handleChange}
                rows={3}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSending}
              className={`w-full font-semibold py-2 rounded-full text-white transition ${
                isSending
                  ? "bg-purple-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-md"
              }`}
            >
              {isSending ? "Sending..." : "Send Message"}
            </button>
          </form>

          <style>{`
            @keyframes fade-in {
              0% { opacity: 0; transform: translateY(-10px); }
              100% { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in {
              animation: fade-in 0.3s ease-out forwards;
            }
          `}</style>
        </div>
      )}
      {/* 🔒 Disable cursor glow on Contact Page */}
      <style>{`
           body::before,
           body::after {
               display: none !important;
           }
           body.glow-grid::after {
            opacity: 0 !important;
           }
      `}</style>
    </div>
  );
}

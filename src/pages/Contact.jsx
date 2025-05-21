import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import TrailingParticles from "../components/TrailingParticles";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";

export default function ContactPage() {
  const [showForm, setShowForm] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    reason: "",
    message: "",
  });
  const [usedEmails, setUsedEmails] = useState([]);
  const formRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) {
        setShowForm(false);
      }
    };
    if (showForm) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showForm]);

  const validateForm = () => {
    const { name, email, message } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name || !email || !message) {
      toast.error("All mandatory fields are required.");
      return false;
    }
    if (!emailRegex.test(email)) {
      toast.error("Invalid email address.");
      return false;
    }
    if (usedEmails.includes(email)) {
      toast.error("This email has already submitted a message.");
      return false;
    }
    return true;
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSending(true);

    try {
      await emailjs.send(
        "service_kzkx5el",
        "template_ps7iu7z",
        formData,
        "I5ZnodqHe6rXNLDKU"
      );
      toast.success("Message sent successfully!");
      setUsedEmails((prev) => [...prev, formData.email]);
      setTimeout(() => setShowForm(false), 4000);
    } catch (error) {
      toast.error("Failed to send. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="relative min-h-screen bg-[#fef3f8] overflow-x-hidden">
      <TrailingParticles />
      <Navbar />
      <Toaster position="top-center" />

      {/* ❄️ Page Header */}
      <section className="pt-36 pb-4 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500 drop-shadow-md">
          Let’s Discuss Together
        </h1>
        <p className="mt-2 text-gray-600 text-sm sm:text-base">
          Reach out for demos, partnerships, or support inquiries.
        </p>
        <div className="flex justify-center gap-4 text-sm font-medium mt-3 text-gray-700">
          <p>📧 hello@tikogen.com</p>
          <p>📞 +91 98765 43210</p>
          <p>📍 Bangalore, India</p>
        </div>
      </section>

      {/* 🚀 Send Message CTA */}
      <div className="flex justify-center mt-6 z-10 relative">
        {!showForm && (
          <button
            onMouseEnter={() => setShowForm(true)}
            className="bg-gradient-to-r from-blue-500 to-pink-500 text-white font-semibold text-sm py-2 px-6 rounded-xl shadow-lg hover:scale-105 transition-all"
          >
            Send Message
          </button>
        )}
      </div>

      {/* 📮 FORM: Appears Below Navbar */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/30 backdrop-blur-sm">
          <form
            ref={formRef}
            onSubmit={sendEmail}
            className="relative w-[90%] sm:w-[340px] p-3 sm:p-4 text-xs sm:text-sm bg-white bg-opacity-90 backdrop-blur-xl shadow-2xl rounded-[40px] space-y-3 animate-fade-in border border-white/30"
          >
            {/* ❌ Close Button */}
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-3 text-red-500 text-2xl font-bold hover:scale-110 transition"
            >
              ❌
            </button>

            {/* Form Inputs */}
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
                className="w-full px-3 py-2 border border-gray-300 rounded-full focus:ring-blue-500 focus:border-blue-500"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-full focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700">
                Company Name <span className="text-gray-400">(optional)</span>
              </label>
              <input
                type="text"
                name="company"
                placeholder="Your Company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-full focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Reason for Contact
              </label>
              <select
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-full focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select a reason</option>
                <option value="Demo Request">Demo Request</option>
                <option value="Partnership">Partnership</option>
                <option value="General Inquiry">General Inquiry</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Your Message <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                placeholder="Type your message..."
                value={formData.message}
                onChange={handleChange}
                rows={3}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-full focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSending}
              className={`w-full font-semibold py-2 rounded-full text-white transition ${
                isSending
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-pink-500 hover:shadow-md"
              }`}
            >
              {isSending ? "Sending..." : "Send Message"}
            </button>
          </form>

          {/* Animations */}
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

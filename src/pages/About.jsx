import React from "react";
import Navbar from "../components/Navbar";
import founder1 from "../assets/founder1.jpg";
import founder2 from "../assets/founder2.jpg";
import CursorRipple from "../components/CursorRipple";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#fef3f8]">
      <CursorRipple />

      {/* 💥 Bulletproof grid blocker for About */}
      <style>{`
        canvas, 
        .cursor-grid-overlay, 
        .react-grid-background, 
        .grid-background, 
        .background-grid {
          display: none !important;
        }
      `}</style>

      <Navbar />

      <section className="pt-40 pb-10 text-center">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500 drop-shadow-md">
          Our Story & Vision
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600">
          From frustration to revolution: AWS CloudOps + AI Assistant inside Microsoft Teams.
        </p>
      </section>

      <section className="bg-white bg-opacity-90 backdrop-blur-xl rounded-3xl shadow-xl mx-auto mt-10 p-8 max-w-5xl text-center space-y-12">
        <div>
          <h2 className="text-3xl font-bold text-blue-600 mb-4">The Tikogen Origin</h2>
          <p className="text-gray-700 text-lg">
            As AWS engineers, we suffered from manual cloud tasks + too many dashboards. 
            So we created Tikogen: AI + Terraform + Boto3 inside Teams. 
            It automates CloudOps while you focus on real work.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-blue-600 mb-4">Creators</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-10">
            <div className="flex flex-col items-center bg-white p-4 rounded-2xl shadow-md hover:shadow-xl border border-blue-100 hover:border-blue-400 transition-transform duration-300 ease-in-out hover:scale-105">
              <img src={founder1} alt="Samriddha" className="h-48 w-48 rounded-full shadow-lg object-cover border-4 border-white" />
              <p className="text-xl font-semibold mt-4">Samriddha</p>
            </div>
            <div className="flex flex-col items-center bg-white p-4 rounded-2xl shadow-md hover:shadow-xl border border-blue-100 hover:border-blue-400 transition-transform duration-300 ease-in-out hover:scale-105">
              <img src={founder2} alt="Ritom" className="h-48 w-48 rounded-full shadow-lg object-cover border-4 border-white" />
              <p className="text-xl font-semibold mt-4">Ritom</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-blue-600 mb-4">Mission</h2>
          <p className="text-gray-700 text-lg">
            To become the #1 AI-powered assistant for AWS infrastructure management.
          </p>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-blue-600 mb-4">Journey</h2>
          <ul className="list-disc list-inside text-gray-700 text-lg space-y-2">
            <li>💡 Idea in late 2024</li>
            <li>⚙️ First MVP by early 2025</li>
            <li>🚀 Beta clients onboarded May 2025</li>
            <li>🌍 SaaS public launch expected Q3 2025</li>
          </ul>
        </div>
      </section>
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

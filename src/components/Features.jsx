import React, { useState, useEffect, useRef } from 'react';

const features = [
  { id: 1, title: "AI-Powered AWS Operations", description: "Manage AWS using natural language inside Teams. Powered by LLaMA3 / Ollama for intelligent cloud automation." },
  { id: 2, title: "Deep Microsoft Teams Integration", description: "Works inside Microsoft Teams with Adaptive Cards, sliders, dropdowns, and smooth in-chat enterprise workflows." },
  { id: 3, title: "Smart Infrastructure Automation", description: "Provision AWS EC2, VPCs, S3, IAM users & roles directly from chat using Terraform + Boto3 automation." },
  { id: 4, title: "Real-Time Insights & Cost Awareness", description: "Get AWS cost predictions before resource creation. Monitor security issues and IAM audits automatically." },
  { id: 5, title: "Self-Healing & Auto Troubleshooting (Beta)", description: "Auto-detect and resolve AWS issues to minimize downtime. Let Tikogen handle routine cloud operations." },
  { id: 6, title: "Scalable, Modular, Futuristic Design", description: "Scales effortlessly for enterprise workloads. Intuitive Teams UI and modular design for rapid innovation." },
];

export default function Features() {
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    let animationFrameId;
    let lastTime = performance.now();

    const scroll = (time) => {
      if (!isPaused && scrollRef.current) {
        const delta = time - lastTime;
        lastTime = time;
        scrollRef.current.scrollLeft += (delta * 0.1);   // speed control
        if (scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth / 2) {
          scrollRef.current.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 tracking-wide drop-shadow-xl">
          ✨ Tikogen Premium Features ✨
        </h2>
      </div>

      {/* Marquee Cards */}
      <div 
        ref={scrollRef} 
        className="flex space-x-6 overflow-x-scroll no-scrollbar px-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {[...features, ...features].map((feature, index) => (
          <div 
            key={index}
            className="min-w-[250px] h-64 bg-white bg-opacity-90 backdrop-blur-md shadow-xl rounded-3xl flex flex-col items-center justify-center text-center p-4 cursor-pointer select-none transform transition duration-300 hover:scale-105"
          >
            <div className="text-3xl font-bold text-blue-500 mb-2">
              {feature.id}
            </div>
            <h3 className="text-lg font-bold text-purple-700">
              {feature.title}
            </h3>
            <p className="text-sm mt-2 text-gray-600">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

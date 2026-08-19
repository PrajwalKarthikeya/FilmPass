"use client";

import { motion } from "framer-motion";

const phases = [
  {
    version: "Version 1",
    status: "Current",
    title: "The Foundation",
    items: ["Movie Search & Discovery", "Ticket Generation Engine", "Private Cinema Vault", "Cinema Passports"]
  },
  {
    version: "Version 2",
    status: "In Development",
    title: "The Community",
    items: ["Public Profiles & Following", "Curated Collections", "Custom Theatres", "Shared Movie Marathons"]
  },
  {
    version: "Version 3",
    status: "Future Vision",
    title: "The Ecosystem",
    items: ["AI-Powered Recommendations", "Virtual Film Clubs", "Community Challenges", "Film Festival Integrations"]
  }
];

export function RoadmapTimeline() {
  return (
    <section className="py-24 max-w-5xl mx-auto px-4 md:px-8">
      <div className="text-center mb-16">
        <h2 className="font-display text-4xl font-bold mb-4">The Roadmap</h2>
        <p className="text-gray-400 font-light">Where we are going next.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        
        {/* Horizontal connecting line on desktop */}
        <div className="hidden md:block absolute top-12 left-0 right-0 h-[2px] bg-white/10 z-0" />

        {phases.map((phase, i) => (
          <motion.div
            key={phase.version}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            className="relative z-10 flex flex-col items-center text-center"
          >
            <div className={`w-24 h-24 rounded-full border-4 flex items-center justify-center mb-6 shadow-2xl ${phase.status === 'Current' ? 'border-[#D4AF37] bg-[#1A1A1A]' : 'border-white/10 bg-[#050505]'}`}>
              <span className={`font-mono font-bold text-xl ${phase.status === 'Current' ? 'text-[#D4AF37]' : 'text-gray-500'}`}>
                {phase.version.replace('Version ', 'V')}
              </span>
            </div>
            
            <span className={`text-[10px] uppercase tracking-widest font-mono mb-2 ${phase.status === 'Current' ? 'text-[#D4AF37]' : 'text-gray-500'}`}>
              {phase.status}
            </span>
            <h3 className="font-display text-2xl font-bold mb-6 text-white">{phase.title}</h3>
            
            <ul className="space-y-3 w-full">
              {phase.items.map((item, j) => (
                <li key={j} className="glass-panel p-3 rounded-lg border border-white/5 text-sm text-gray-400 font-light">
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

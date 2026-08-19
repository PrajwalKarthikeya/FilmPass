"use client";

import { motion } from "framer-motion";
import { Globe, BookOpen, Film, Users, Award } from "lucide-react";
import { mockPassportStats } from "@/lib/mock-passports";

export function PassportHero() {
  const stats = [
    { label: "Earned", value: mockPassportStats.earned, icon: Award },
    { label: "Movies", value: mockPassportStats.collected, icon: Film },
    { label: "Countries", value: mockPassportStats.countries, icon: Globe },
    { label: "Directors", value: mockPassportStats.directors, icon: Users },
  ];

  return (
    <div className="relative w-full h-[50vh] min-h-[450px] flex items-center justify-center rounded-[2rem] overflow-hidden glass-panel border border-[#D4AF37]/20 mb-16">
      
      {/* Background Map Simulation */}
      <div className="absolute inset-0 bg-[#050505]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1A1A1A] via-[#050505] to-[#050505]" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-8 text-center flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs uppercase tracking-[0.2em] mb-8 font-mono">
            <BookOpen className="w-4 h-4" />
            Official Cinema Documents
          </div>
          
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-wide mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
            Cinema Passport
          </h1>
          <p className="text-xl text-gray-400 font-light max-w-2xl mx-auto mb-12">
            Travel through the history of world cinema, one ticket at a time. Unlock luxurious digital passports by exploring new horizons.
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-6 md:gap-12"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <p className="font-display text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-[10px] uppercase tracking-widest text-gray-500 font-mono">{stat.label}</p>
              </div>
            );
          })}
        </motion.div>

      </div>
    </div>
  );
}

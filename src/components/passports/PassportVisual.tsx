"use client";

import { motion } from "framer-motion";
import { Passport } from "@/lib/mock-passports";
import { Globe, Film, Clapperboard, Award, Sparkles, Ghost, Rocket } from "lucide-react";

// Map keywords to emblems
const getEmblem = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes("world")) return Globe;
  if (t.includes("oscar")) return Award;
  if (t.includes("horror")) return Ghost;
  if (t.includes("sci-fi")) return Rocket;
  if (t.includes("animation") || t.includes("pixar") || t.includes("ghibli")) return Sparkles;
  if (t.includes("director") || t.includes("nolan")) return Clapperboard;
  return Film;
};

export function PassportVisual({ passport }: { passport: Passport }) {
  const Emblem = getEmblem(passport.title);

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0, rotateY: 20 }}
      animate={{ scale: 1, opacity: 1, rotateY: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="relative w-full aspect-[1/1.4] max-w-[400px] mx-auto rounded-3xl shadow-2xl overflow-hidden preserve-3d cursor-pointer group"
      style={{ perspective: "1000px" }}
    >
      {/* Premium Leather Texture Simulation */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-[1.02]"
        style={{ 
          backgroundColor: passport.color,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.15' mix-blend-mode='multiply'/%3E%3C/svg%3E")`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/60 mix-blend-overlay" />
        <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.5)]" />
        
        {/* Binding fold line */}
        <div className="absolute left-4 top-0 bottom-0 w-8 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
      </div>

      {/* Gold Foil Details */}
      <div className="relative z-10 w-full h-full p-8 md:p-12 flex flex-col items-center justify-between text-[#D4AF37] mix-blend-plus-lighter border-4 border-transparent border-x-white/5 border-y-white/5 rounded-2xl m-2" style={{ height: "calc(100% - 16px)", width: "calc(100% - 16px)" }}>
        <div className="text-center w-full">
          <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] mb-2 opacity-80">Official Cinema Document</p>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent mb-6" />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center w-full">
          <Emblem className="w-20 h-20 md:w-28 md:h-28 mb-8 stroke-[1] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
          <h2 className="font-display text-2xl md:text-3xl font-bold text-center tracking-wide uppercase leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] max-w-[250px]">
            {passport.title}
          </h2>
        </div>

        <div className="text-center w-full">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent mt-6 mb-2" />
          <p className="font-mono text-[8px] md:text-[10px] uppercase tracking-[0.4em] opacity-80">Issued by FilmPass</p>
        </div>
      </div>
      
      {/* Subtle light reflection sweep */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1.5s] ease-in-out pointer-events-none" />
    </motion.div>
  );
}

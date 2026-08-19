"use client";

import { motion } from "framer-motion";
import { ArrowRight, Film } from "lucide-react";
import Link from "next/link";

export function AboutHero() {
  return (
    <div className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center rounded-[2rem] overflow-hidden border border-white/5 mb-24 bg-[#020202]">
      
      {/* Cinematic Lighting & Film Grain */}
      <div className="absolute inset-0 opacity-20 mix-blend-screen pointer-events-none" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />
      
      {/* Light Rays */}
      <div className="absolute top-0 left-1/4 w-[20vw] h-[100vh] bg-gradient-to-b from-[#D4AF37]/20 via-[#D4AF37]/5 to-transparent blur-[100px] transform -rotate-12 transform-origin-top animate-pulse" />
      <div className="absolute top-0 right-1/4 w-[30vw] h-[100vh] bg-gradient-to-b from-blue-500/10 via-blue-500/5 to-transparent blur-[120px] transform rotate-12 transform-origin-top" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-8 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs uppercase tracking-[0.2em] mb-8 font-mono backdrop-blur-md">
            <Film className="w-4 h-4" />
            The FilmPass Project
          </div>
          
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-200 to-gray-500 drop-shadow-2xl">
            Every Ticket<br/>Tells a Story.
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 font-light max-w-3xl mx-auto mb-12 leading-relaxed">
            A digital home where movie lovers celebrate cinema through beautifully crafted collectible tickets.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/" className="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-sm rounded-full hover:bg-gray-200 transition-colors flex items-center gap-2">
              Start Exploring <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/search" className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold uppercase tracking-widest text-sm rounded-full hover:bg-white/10 transition-colors">
              Browse Movies
            </Link>
          </div>
        </motion.div>
      </div>
      
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent" />
    </div>
  );
}

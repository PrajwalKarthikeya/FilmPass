"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

export function TheatreHero() {
  return (
    <div className="relative rounded-[2rem] overflow-hidden bg-black border border-white/10 h-[500px] flex flex-col justify-end mb-12 group">
      {/* Cinematic Ambient Background */}
      <div className="absolute inset-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="w-full h-full object-cover opacity-30 transition-transform duration-1000 group-hover:scale-105"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-1610-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-transparent opacity-80" />
      </div>

      <div className="relative z-20 p-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md rounded-full text-xs font-mono uppercase tracking-widest text-[#D4AF37] mb-6 border border-[#D4AF37]/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D4AF37]"></span>
            </span>
            Now Screening
          </div>
          
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-[1.1]">
            Welcome to the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40">Cinema District</span>
          </h1>
          
          <p className="text-lg text-gray-400 font-light max-w-2xl leading-relaxed">
            Step into ten exclusively curated virtual theatres. Each theatre presents a constantly evolving selection of masterpieces, blockbusters, and hidden gems.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

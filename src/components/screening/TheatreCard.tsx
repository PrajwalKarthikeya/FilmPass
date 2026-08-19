"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { type Theatre } from "@/lib/theatres";
import { RefreshCountdown } from "./RefreshCountdown";

export function TheatreCard({ theatre, index }: { theatre: Theatre, index: number }) {
  const Icon = theatre.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link href={`/screening/${theatre.id}`} className="block group">
        <div className="relative h-[450px] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl transition-all duration-700 hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          
          {/* Dynamic Glow Based on Color Accent */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700 mix-blend-overlay z-10 pointer-events-none"
            style={{ background: `radial-gradient(circle at 50% 50%, ${theatre.colorAccent} 0%, transparent 70%)` }}
          />

          <Image 
            src={theatre.backgroundUrl}
            alt={theatre.name}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 to-transparent" />
          
          <div className="absolute inset-0 p-8 flex flex-col z-20">
            <div className="flex justify-between items-start">
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20 shadow-xl transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundColor: `${theatre.colorAccent}20` }}
              >
                <Icon 
                  className="w-6 h-6 transition-colors duration-500" 
                  style={{ color: theatre.colorAccent }}
                />
              </div>
              <RefreshCountdown />
            </div>

            <div className="mt-auto">
              <p 
                className="text-xs uppercase tracking-widest font-mono mb-2"
                style={{ color: theatre.colorAccent }}
              >
                {theatre.theme}
              </p>
              <h3 className="font-display text-3xl font-bold mb-3 tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text transition-colors duration-500"
                  style={{ backgroundImage: `linear-gradient(to right, #fff, ${theatre.colorAccent})` }}>
                {theatre.name}
              </h3>
              <p className="text-sm text-gray-400 line-clamp-2 mb-6 font-light leading-relaxed">
                {theatre.description}
              </p>
              
              <div className="flex items-center gap-3">
                <span className="px-6 py-3 bg-white/10 hover:bg-white text-white hover:text-black rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 backdrop-blur-md flex items-center gap-2 group-hover:bg-white group-hover:text-black">
                  Enter Theatre
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

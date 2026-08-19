"use client";

import { motion } from "framer-motion";
import { Lock, Sparkles, CheckCircle2 } from "lucide-react";
import { Passport } from "@/lib/mock-passports";
import { cn } from "@/lib/utils";
import { ProgressRing } from "./ProgressRing";

interface PassportCardProps {
  passport: Passport;
  onClick?: (passport: Passport) => void;
}

export function PassportCard({ passport, onClick }: PassportCardProps) {
  const isLocked = passport.status === "locked";
  const isCompleted = passport.status === "completed";
  const isHard = passport.difficulty === "Hard" || passport.difficulty === "Master";

  return (
    <motion.div
      whileHover={!isLocked ? { scale: 1.05, rotateY: 5, rotateX: 5 } : {}}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "group relative w-full aspect-[1/1.4] rounded-r-xl rounded-l-md cursor-pointer preserve-3d transition-shadow duration-500",
        isLocked ? "opacity-60 grayscale" : "hover:shadow-[20px_20px_40px_rgba(0,0,0,0.8)]"
      )}
      onClick={() => !isLocked && onClick && onClick(passport)}
      style={{
        backgroundColor: passport.color,
        // Leather texture using SVG noise and CSS
        backgroundImage: `
          linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 4%, transparent 10%),
          url('https://grainy-gradients.vercel.app/noise.svg')
        `,
        boxShadow: "inset 2px 0 5px rgba(255,255,255,0.1), inset -5px 0 10px rgba(0,0,0,0.5), inset 0 2px 5px rgba(255,255,255,0.1)"
      }}
    >
      {/* Binding Seam (Spine) */}
      <div className="absolute left-1 top-0 bottom-0 w-[2px] bg-black/40 shadow-[1px_0_1px_rgba(255,255,255,0.1)]" />

      {/* Passport Cover Content */}
      <div className="absolute inset-0 p-6 flex flex-col items-center justify-between text-center border-[2px] border-black/20 m-3 rounded-lg z-10">
        
        {/* Top Header */}
        <div>
          <p className={cn(
            "text-[8px] uppercase tracking-[0.3em] font-mono mb-2",
            isLocked ? "text-white/40" : "text-[#D4AF37] mix-blend-plus-lighter"
          )}>
            Official Document
          </p>
          {isHard && !isLocked && (
            <div className="flex justify-center text-[#D4AF37] mb-2">
              <Sparkles className="w-4 h-4" />
            </div>
          )}
        </div>

        {/* Title (Gold Foil Simulation) */}
        <div className="flex-1 flex items-center justify-center">
          <h3 className={cn(
            "font-display text-2xl font-bold uppercase tracking-wider leading-tight",
            isLocked ? "text-white/50" : "text-transparent bg-clip-text bg-gradient-to-b from-[#FFF2B2] via-[#D4AF37] to-[#AA7700] drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]"
          )}>
            {passport.title}
          </h3>
        </div>

        {/* Bottom Status */}
        <div className="w-full flex flex-col items-center gap-4">
          {isLocked ? (
            <div className="w-10 h-10 rounded-full bg-black/40 border border-white/10 flex items-center justify-center">
              <Lock className="w-4 h-4 text-white/50" />
            </div>
          ) : isCompleted ? (
            <div className="flex flex-col items-center gap-2">
              <CheckCircle2 className="w-8 h-8 text-[#D4AF37]" />
              <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">Verified</span>
            </div>
          ) : (
            <ProgressRing progress={passport.progress} total={passport.total} size={48} strokeWidth={3} />
          )}
          
          <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent opacity-50 mt-2" />
          <p className="text-[8px] uppercase tracking-[0.2em] font-mono text-[#D4AF37]/70 mt-2">
            FilmPass Cinema
          </p>
        </div>
      </div>

      {/* Glow effect on hover */}
      {!isLocked && (
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-xl" />
      )}
    </motion.div>
  );
}

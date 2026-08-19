"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Trophy, Download, Share2, Pin, Clock, CheckCircle2 } from "lucide-react";
import { Passport } from "@/lib/mock-passports";
import { ProgressRing } from "./ProgressRing";
import { UnlockAnimation } from "./UnlockAnimation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface PassportViewerProps {
  passport: Passport | null;
  onClose: () => void;
}

export function PassportViewer({ passport, onClose }: PassportViewerProps) {
  const [showUnlock, setShowUnlock] = useState(false);

  useEffect(() => {
    if (passport?.status === "completed") {
      setShowUnlock(true);
      const timer = setTimeout(() => setShowUnlock(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [passport]);

  if (!passport) return null;

  const isCompleted = passport.status === "completed";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
        
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Container (The Passport Interior) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-5xl h-[85vh] bg-[#F4F1EA] text-[#2C3E50] rounded-xl shadow-[0_30px_100px_rgba(0,0,0,1)] overflow-hidden flex flex-col md:flex-row border border-white/20"
        >
          {showUnlock && <UnlockAnimation />}

          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/10 hover:bg-black/20 transition-colors z-20 text-[#2C3E50]"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Page (Details & Artwork) */}
          <div className="flex-1 p-8 md:p-12 relative flex flex-col border-r border-black/10" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')", opacity: 0.98 }}>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#2C3E50] rounded-full flex items-center justify-center">
                <Trophy className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest font-mono font-bold opacity-50">Visa Category</p>
                <p className="font-bold text-sm uppercase tracking-wider">{passport.difficulty}</p>
              </div>
            </div>

            <h2 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-wider leading-tight mb-4 text-black">
              {passport.title}
            </h2>
            <p className="text-lg opacity-80 mb-8 max-w-md">
              {passport.description}
            </p>

            <div className="mt-auto grid grid-cols-2 gap-8 p-6 bg-black/5 rounded-xl border border-black/10">
              <div>
                <p className="text-[10px] uppercase tracking-widest font-mono font-bold opacity-50 mb-1">Estimated Remaining</p>
                <p className="font-bold text-xl flex items-center gap-2">
                  <Clock className="w-5 h-5 opacity-50" /> {passport.estimatedRuntimeRemaining}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest font-mono font-bold opacity-50 mb-1">Completion Reward</p>
                <p className="font-bold text-sm text-[#AA7700] leading-tight">{passport.reward}</p>
              </div>
            </div>

            {/* Actions for completed passports */}
            {isCompleted && (
              <div className="mt-6 flex gap-3">
                <button className="flex-1 bg-[#D4AF37] hover:bg-[#AA7700] text-black font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
                  <Download className="w-4 h-4" /> Export
                </button>
                <button className="flex-1 bg-[#2C3E50] hover:bg-black text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
                  <Pin className="w-4 h-4" /> Pin to Vault
                </button>
                <button className="px-4 bg-black/10 hover:bg-black/20 text-black font-bold rounded-lg flex items-center justify-center transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Right Page (Checklist & Progress) */}
          <div className="flex-1 p-8 md:p-12 relative flex flex-col bg-[#FDFBF7]" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')", opacity: 0.98 }}>
            
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-black/10">
              <div>
                <h3 className="font-display text-2xl font-bold uppercase tracking-widest mb-1">Progress</h3>
                <p className="text-xs uppercase tracking-widest font-mono font-bold opacity-50">
                  {passport.progress} of {passport.total} Completed
                </p>
              </div>
              
              <div className="bg-[#2C3E50] rounded-full p-2">
                <ProgressRing progress={passport.progress} total={passport.total} size={64} strokeWidth={4} />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
              <h4 className="font-display text-sm font-bold uppercase tracking-widest mb-4 opacity-50">Stamps Acquired</h4>
              
              {passport.moviesCompleted.length === 0 ? (
                <div className="text-center py-12 opacity-50 font-mono text-sm">
                  No stamps yet. Start watching to unlock!
                </div>
              ) : (
                <div className="space-y-3">
                  {passport.moviesCompleted.map((movie, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-black/10 bg-white shadow-sm">
                      <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-[#AA7700]" />
                      </div>
                      <span className="font-medium text-sm">{movie}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* What to watch next */}
            {!isCompleted && passport.suggestedNextMovie && passport.suggestedNextMovie !== "None" && (
              <div className="mt-6 pt-6 border-t border-black/10">
                <p className="text-[10px] uppercase tracking-widest font-mono font-bold opacity-50 mb-2">Suggested Next Watch</p>
                <div className="p-4 bg-[#2C3E50] text-white rounded-xl shadow-lg flex justify-between items-center">
                  <span className="font-display font-bold text-lg">{passport.suggestedNextMovie}</span>
                  <button className="px-4 py-2 bg-[#D4AF37] text-black text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-[#AA7700] transition-colors">
                    Find
                  </button>
                </div>
              </div>
            )}

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}

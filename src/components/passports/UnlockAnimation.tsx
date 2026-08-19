"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

export function UnlockAnimation({ onComplete }: { onComplete?: () => void }) {
  const [showStamp, setShowStamp] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowStamp(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center overflow-hidden">
      
      {/* Background Flare */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: [0, 1, 0], scale: [0.5, 2, 3] }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute w-96 h-96 bg-[#D4AF37]/30 rounded-full blur-[100px] mix-blend-screen"
      />

      {/* Gold Confetti Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
          animate={{ 
            opacity: 0, 
            scale: Math.random() * 1.5 + 0.5,
            x: (Math.random() - 0.5) * 600, 
            y: (Math.random() - 0.5) * 600 
          }}
          transition={{ duration: 1.5 + Math.random(), ease: "easeOut" }}
          className="absolute w-2 h-2 bg-[#D4AF37] shadow-[0_0_10px_#D4AF37]"
          style={{ borderRadius: Math.random() > 0.5 ? '50%' : '2px' }}
        />
      ))}

      {/* The Stamp */}
      {showStamp && (
        <motion.div
          initial={{ opacity: 0, scale: 3, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: -5 }}
          transition={{ type: "spring", damping: 12, stiffness: 200 }}
          onAnimationComplete={() => {
            if (onComplete) setTimeout(onComplete, 2000);
          }}
          className="relative"
        >
          <div className="border-4 border-[#D4AF37] text-[#D4AF37] px-6 py-3 rounded-xl flex items-center gap-3 backdrop-blur-sm bg-black/40 shadow-[0_0_30px_rgba(212,175,55,0.3)] mix-blend-screen">
            <CheckCircle className="w-8 h-8" />
            <div className="flex flex-col">
              <span className="font-display font-bold text-3xl uppercase tracking-widest leading-none">Unlocked</span>
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-80 mt-1">Official Document</span>
            </div>
          </div>
        </motion.div>
      )}

    </div>
  );
}

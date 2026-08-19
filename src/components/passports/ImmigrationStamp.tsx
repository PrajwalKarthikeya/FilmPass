"use client";

import { motion } from "framer-motion";
import { PassportMovie } from "@/lib/mock-passports";

export function ImmigrationStamp({ movie, index }: { movie: PassportMovie, index: number }) {
  // Generate a random slight rotation for the stamp to look authentic
  const rotation = (Math.random() * 20 - 10).toFixed(1); 
  const color = index % 2 === 0 ? "border-[#4A90E2] text-[#4A90E2]" : "border-[#E24A4A] text-[#E24A4A]";
  
  return (
    <motion.div 
      initial={{ scale: 2, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.5 }}
      style={{ rotate: `${rotation}deg` }}
      className={`absolute right-4 bottom-4 md:right-8 md:bottom-8 w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-double ${color} mix-blend-screen opacity-80 flex flex-col items-center justify-center p-2 z-20 pointer-events-none`}
    >
      <div className={`absolute inset-0 rounded-full border border-dashed ${color} opacity-50 m-1`} />
      
      <svg className="w-6 h-6 mb-1 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
      </svg>
      
      <p className="font-mono text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-center leading-none mb-1">
        {movie.completedDate}
      </p>
      
      <p className="font-mono text-[7px] md:text-[9px] uppercase tracking-wider text-center leading-tight">
        {movie.title}
      </p>
      
      <p className="font-mono text-[6px] md:text-[8px] uppercase tracking-widest text-center mt-1 border-t border-current pt-1">
        {movie.serialNumber}
      </p>
    </motion.div>
  );
}

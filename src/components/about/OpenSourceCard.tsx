"use client";

import { motion } from "framer-motion";
import { Code2, Terminal } from "lucide-react";
import Link from "next/link";

export function OpenSourceCard() {
  return (
    <section className="py-24 max-w-4xl mx-auto px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="glass-panel p-8 md:p-16 rounded-[2rem] border border-[#D4AF37]/30 text-center relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/5 via-transparent to-[#D4AF37]/10 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-[#1A1A1A] border border-[#D4AF37]/50 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
            <Code2 className="w-8 h-8 text-[#D4AF37]" />
          </div>
          
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">Proudly Open Source</h2>
          <p className="text-gray-300 font-light max-w-2xl mx-auto mb-8 text-lg">
            FilmPass is built by cinephiles, for cinephiles. The entire platform is open source, and we welcome contributions from developers and designers who share our passion for film.
          </p>
          
          <Link 
            href="https://github.com/FilmPass" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-sm rounded-full hover:bg-gray-200 transition-colors flex items-center gap-3"
          >
            <Terminal className="w-5 h-5" /> View on GitHub
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

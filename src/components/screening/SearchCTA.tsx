"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

export function SearchCTA() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-32 glass-panel p-16 rounded-[2rem] border border-white/10 text-center relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
      
      <Search className="w-12 h-12 text-gray-500 mx-auto mb-6" />
      <h3 className="font-display text-4xl font-bold mb-4">Can't find your movie here?</h3>
      <p className="text-gray-400 max-w-lg mx-auto mb-10 text-lg">
        The complete TMDB library is always at your fingertips. Search for any movie in existence to generate your ticket.
      </p>
      
      <Link 
        href="/search" 
        className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-bold uppercase tracking-widest text-sm rounded-full hover:bg-gray-200 transition-all hover:scale-105 shadow-xl"
      >
        <Search className="w-4 h-4" />
        Search the Library
      </Link>
    </motion.div>
  );
}

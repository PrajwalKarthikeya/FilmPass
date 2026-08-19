"use client";

import { motion } from "framer-motion";
import { Search, SlidersHorizontal, Download } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "1. Discover",
    description: "Search the TMDB database for any movie, from timeless classics to modern blockbusters."
  },
  {
    icon: SlidersHorizontal,
    title: "2. Customize",
    description: "Select your preferred theatre, set the date and time, and choose a premium ticket design."
  },
  {
    icon: Download,
    title: "3. Collect",
    description: "Generate a high-resolution, cinema-grade digital ticket to save to your personal collection."
  }
];

export function HowItWorks() {
  return (
    <section className="py-32 bg-[#0A0A0A] relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-display font-medium text-white mb-4">How It Works</h2>
          <p className="text-secondary max-w-xl mx-auto">Three simple steps to craft your personalized cinematic keepsake.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {steps.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className="w-24 h-24 rounded-full bg-surface border border-white/10 flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 group-hover:border-accent/30 transition-all duration-500">
                <step.icon className="w-10 h-10 text-muted group-hover:text-accent transition-colors duration-500" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-display font-medium text-white mb-3">{step.title}</h3>
              <p className="text-secondary text-sm leading-relaxed max-w-xs">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

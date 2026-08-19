"use client";

import { motion } from "framer-motion";
import { Sparkles, Bookmark, Compass, History, Heart, Clapperboard } from "lucide-react";

const philosophies = [
  { title: "Celebrate Cinema", description: "Movies are art, not just content. We celebrate the craft of filmmaking.", icon: Clapperboard },
  { title: "Collect Memories", description: "Every film watched is a memory made. We give you a place to keep them.", icon: Bookmark },
  { title: "Discover New Worlds", description: "Step outside your comfort zone. World cinema is waiting for you.", icon: Compass },
  { title: "Explore Film History", description: "From the silent era to modern blockbusters, trace the evolution of the silver screen.", icon: History },
  { title: "Support Curiosity", description: "Our passports guide you toward directors and genres you might never have considered.", icon: Sparkles },
  { title: "Every Movie Deserves It", description: "Whether it's a masterpiece or a guilty pleasure, every movie deserves to be remembered.", icon: Heart },
];

export function PhilosophyGrid() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-4 md:px-8">
      <div className="text-center mb-16">
        <h2 className="font-display text-4xl font-bold mb-4">Our Philosophy</h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">The principles that guide the development of FilmPass.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {philosophies.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-panel p-8 rounded-3xl border border-white/5 hover:border-[#D4AF37]/30 transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-[#D4AF37]/10 transition-colors">
                <Icon className="w-5 h-5 text-gray-400 group-hover:text-[#D4AF37] transition-colors" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-3">{item.title}</h3>
              <p className="text-gray-400 font-light leading-relaxed">{item.description}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

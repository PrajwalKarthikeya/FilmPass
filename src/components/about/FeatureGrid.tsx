"use client";

import { motion } from "framer-motion";
import { Database, Ticket, Globe, Archive, Hash, Type, Palette, ShieldCheck, Download, UserCircle } from "lucide-react";

const features = [
  { title: "TMDB Database", icon: Database },
  { title: "Collectible Tickets", icon: Ticket },
  { title: "Cinema Passport", icon: Globe },
  { title: "Cinema Vault", icon: Archive },
  { title: "Unique Collectible Serial", icon: Hash },
  { title: "Edition Numbers", icon: Type },
  { title: "Luxury Ticket Designs", icon: Palette },
  { title: "World Cinema Exploration", icon: ShieldCheck },
  { title: "High Resolution Downloads", icon: Download },
  { title: "Beautiful User Profiles", icon: UserCircle },
];

export function FeatureGrid() {
  return (
    <section className="py-24 max-w-6xl mx-auto px-4 md:px-8">
      <div className="mb-16">
        <h2 className="font-display text-4xl font-bold mb-4">Features</h2>
        <div className="w-12 h-[2px] bg-white/20" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {features.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col items-center text-center justify-center aspect-square hover:bg-white/5 transition-colors group"
            >
              <Icon className="w-8 h-8 text-gray-500 mb-4 group-hover:text-white transition-colors duration-300" />
              <h3 className="font-bold text-sm leading-tight text-gray-300 group-hover:text-white transition-colors">{feature.title}</h3>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

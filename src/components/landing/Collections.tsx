"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { popularCollections } from "@/lib/mock-data";

export function Collections() {
  return (
    <section aria-labelledby="collections-heading" className="py-24 bg-[#0A0A0A] relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 id="collections-heading" className="text-3xl md:text-4xl font-display font-medium text-white mb-4">Curated Collections</h2>
            <p className="text-secondary max-w-xl">Explore critically acclaimed filmographies and genre-defining masterpieces.</p>
          </div>
          <button 
            className="text-white flex items-center gap-2 group text-sm font-medium hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm px-2 py-1"
            aria-label="View all curated collections"
          >
            View all collections
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
          {popularCollections.map((collection, idx) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="group relative aspect-video rounded-2xl overflow-hidden bg-surface border border-white/5"
              role="listitem"
            >
              <button 
                className="absolute inset-0 w-full h-full text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent focus-visible:ring-inset rounded-2xl"
                aria-label={`Explore the ${collection.title} collection`}
              >
                <Image
                  src={collection.image}
                  alt={`${collection.title} cover`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end pointer-events-none">
                  <h3 className="text-2xl font-display font-medium text-white group-hover:text-accent transition-colors">
                    {collection.title}
                  </h3>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

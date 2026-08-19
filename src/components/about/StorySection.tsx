"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function StorySection() {
  return (
    <section className="py-24 max-w-6xl mx-auto px-4 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Editorial Text */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">Our Story</h2>
            <div className="w-12 h-[2px] bg-[#D4AF37]" />
          </div>
          
          <div className="space-y-6 text-gray-300 text-lg md:text-xl font-light leading-relaxed">
            <p>Movies create memories.</p>
            <p>
              People remember first dates. Midnight premieres. Family outings. Film festivals. Rain-soaked afternoons seeking shelter in a dark theatre with friends.
            </p>
            <p>
              But physical movie tickets—the tangible proof of those memories—are disappearing. They've been replaced by sterile QR codes in email inboxes.
            </p>
            <p className="text-white font-medium border-l-2 border-[#D4AF37] pl-4 italic">
              This platform preserves those memories digitally through highly collectible, personalized cinema tickets.
            </p>
            <p>
              Our goal is not booking movies. Our goal is celebrating them.
            </p>
          </div>
        </motion.div>

        {/* Elegant Imagery */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="relative aspect-[4/5] rounded-3xl overflow-hidden glass-panel border border-white/10 shadow-2xl"
        >
          {/* We use a cinematic unsplash placeholder for the editorial feel */}
          <Image 
            src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=1000"
            alt="Cinematic Theatre"
            fill
            className="object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
          
          <div className="absolute bottom-8 left-8 right-8">
            <p className="text-[10px] uppercase tracking-[0.3em] font-mono text-[#D4AF37] mb-2">The Archive</p>
            <p className="font-display text-2xl font-bold text-white leading-tight">Preserving the physical connection to digital memories.</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

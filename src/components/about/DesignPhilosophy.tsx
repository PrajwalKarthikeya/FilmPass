"use client";

import { motion } from "framer-motion";

export function DesignPhilosophy() {
  return (
    <section className="py-32 bg-[#050505] border-y border-white/5 relative overflow-hidden">
      
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-white/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/4" />

      <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-center">Our Design Philosophy</h2>
            <div className="w-12 h-[2px] bg-white/20 mx-auto" />
          </div>
          
          <div className="space-y-8 text-gray-300 text-lg md:text-xl font-light leading-relaxed columns-1 md:columns-2 gap-12">
            <p>
              We believe that a digital platform dedicated to cinema should feel as crafted and intentional as the films it celebrates. FilmPass is built on a foundation of minimalism and luxury, drawing heavy inspiration from the tactile nature of physical media and the polish of high-end editorial design.
            </p>
            <p>
              We rejected the noisy, metric-driven layouts of traditional social media. You won't find infinite feeds of hot takes or intrusive algorithms here. Instead, you'll find a museum-quality presentation designed to highlight beautiful poster art and elegant typography.
            </p>
            <p>
              Every interaction is meant to feel physical. Tickets cast cinematic drop shadows. Passports simulate the texture of leather and the glint of gold foil. Buttons depress with a satisfying weight. 
            </p>
            <p>
              By prioritizing immersive experiences and cinematic motion, we ensure that every ticket you generate feels truly collectible. We are not just building a tracker; we are building a digital archive worthy of the masterpieces it holds.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

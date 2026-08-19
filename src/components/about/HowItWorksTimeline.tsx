"use client";

import { motion } from "framer-motion";

const steps = [
  { step: "01", title: "Search", desc: "Find any movie using our comprehensive database." },
  { step: "02", title: "Discover", desc: "View rich details, backdrops, and cast information." },
  { step: "03", title: "Choose Your Screening", desc: "Select your preferred theatre, date, and exact seat." },
  { step: "04", title: "Customize", desc: "Apply luxury aesthetic themes to your ticket." },
  { step: "05", title: "Generate", desc: "Mint your unique digital collectible with a verified serial." },
  { step: "06", title: "Collect", desc: "Store your tickets in your private Cinema Vault." },
  { step: "07", title: "Earn Passports", desc: "Unlock beautiful documents as you hit milestones." },
  { step: "08", title: "Explore More Cinema", desc: "Let your passport guide you to your next favorite film." },
];

export function HowItWorksTimeline() {
  return (
    <section className="py-24 bg-[#0A0A0A] border-y border-white/5 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="font-display text-4xl font-bold mb-4">How It Works</h2>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute top-0 bottom-0 left-[27px] md:left-1/2 w-[2px] bg-white/10 -translate-x-1/2" />
          
          <div className="space-y-12">
            {steps.map((item, i) => (
              <motion.div 
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col md:flex-row items-start md:items-center gap-8 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                
                {/* Content */}
                <div className={`flex-1 md:text-${i % 2 === 0 ? 'left' : 'right'} pl-16 md:pl-0`}>
                  <h3 className="font-display text-2xl font-bold mb-2 text-white">{item.title}</h3>
                  <p className="text-gray-400 font-light">{item.desc}</p>
                </div>

                {/* Node */}
                <div className="absolute left-0 md:relative md:left-auto w-14 h-14 rounded-full bg-[#141414] border-2 border-[#D4AF37] flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(212,175,55,0.2)] z-10">
                  <span className="font-mono text-sm font-bold text-[#D4AF37]">{item.step}</span>
                </div>

                {/* Empty space for alternating layout */}
                <div className="hidden md:block flex-1" />
                
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

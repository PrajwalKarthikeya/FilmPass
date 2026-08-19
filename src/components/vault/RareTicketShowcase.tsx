"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles } from "lucide-react";

export function RareTicketShowcase({ tickets }: { tickets: any[] }) {
  const rareTickets = tickets?.filter(t => 
    t.ticket_style === "Holographic" || t.style === "Holographic" || 
    t.ticket_style === "Gold Foil" || t.style === "Gold Foil"
  ) || [];

  if (rareTickets.length === 0) {
    return (
      <div className="glass-panel p-12 rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center">
        <Sparkles className="w-8 h-8 text-[#D4AF37] mb-4" />
        <h3 className="font-display text-2xl font-bold mb-2">No Rare Tickets Yet</h3>
        <p className="text-gray-400 text-sm max-w-md">
          Special tickets like Holographic or Gold Foil editions will be showcased here in all their glory.
        </p>
      </div>
    );
  }

  const rareTicket = rareTickets[0];

  return (
    <div className="glass-panel p-8 md:p-12 rounded-3xl border border-[#D4AF37]/20 relative overflow-hidden flex flex-col md:flex-row items-center gap-12 group">
      
      {/* Background FX */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/5 via-transparent to-transparent opacity-50" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-[80px] pointer-events-none" />
      
      {/* Ticket Visual */}
      <motion.div 
        initial={{ rotateY: -15, rotateX: 5 }}
        whileHover={{ rotateY: 0, rotateX: 0, scale: 1.05 }}
        transition={{ duration: 0.5 }}
        className="relative w-64 aspect-[2/3] shrink-0 rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(212,175,55,0.2)] border border-[#D4AF37]/30 preserve-3d"
      >
        <Image src={rareTicket.image_url || rareTicket.image || rareTicket.poster || "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba"} alt={rareTicket.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-[#D4AF37]/20 mix-blend-overlay" />
        
        {/* Holographic Sheen */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 -translate-x-full group-hover:translate-x-full ease-in-out" />
      </motion.div>

      {/* Info */}
      <div className="flex-1 relative z-10 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-[10px] uppercase tracking-widest mb-6">
          <Sparkles className="w-3 h-3" />
          Rarest Ticket in Vault
        </div>
        
        <h3 className="font-display text-4xl font-bold mb-2">{rareTicket.title}</h3>
        <p className="text-gray-400 font-mono text-sm mb-8">Serial: {rareTicket.serial_number || rareTicket.serial}</p>
        
        <div className="grid grid-cols-2 gap-6 text-left">
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Generated On</p>
            <p className="font-medium text-lg">{rareTicket.screening_date || rareTicket.date}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Edition Style</p>
            <p className="font-medium text-lg">{rareTicket.ticket_style || rareTicket.style}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Theatre</p>
            <p className="font-medium text-lg">{rareTicket.theatre || "Digital"}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Vault Status</p>
            <p className="font-medium text-lg text-[#D4AF37]">Pristine</p>
          </div>
        </div>
      </div>

    </div>
  );
}

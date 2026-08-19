"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Search, Download, Share2, Maximize2 } from "lucide-react";
import type { Ticket } from "@/types/database";

export function TicketGrid({ tickets }: { tickets: any[] }) {
  if (!tickets || tickets.length === 0) {
    return (
      <div className="py-24 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 mb-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
          <Search className="w-10 h-10 text-gray-500" />
        </div>
        <h3 className="font-display text-2xl font-bold mb-3">Your Vault is Empty</h3>
        <p className="text-gray-400 mb-8 max-w-sm">
          You haven't generated any collectible cinema tickets yet. Start exploring the world of cinema.
        </p>
        <Link href="/search" className="px-8 py-4 bg-[#D4AF37] text-black font-bold uppercase tracking-widest text-sm rounded-full hover:bg-[#AA7700] hover:text-white transition-all flex items-center gap-2 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
          Generate First Ticket
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
      {tickets.map((ticket, i) => (
        <motion.div 
          key={ticket.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.05 }}
          className="group relative aspect-[2/3] rounded-xl overflow-hidden cursor-pointer transition-transform duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
        >
          <Image 
            src={ticket.image_url || ticket.image || ticket.poster || "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba"} 
            alt={ticket.title} 
            fill 
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Aesthetic Overlay based on Style */}
          {(ticket.ticket_style === "Vintage" || ticket.style === "Vintage") && <div className="absolute inset-0 bg-amber-900/30 mix-blend-multiply" />}
          {(ticket.ticket_style === "Noir" || ticket.style === "Noir") && <div className="absolute inset-0 bg-black/50 mix-blend-color" />}
          
          {/* Default Darkening Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />

          {/* Persistent Ticket Info */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-[10px] uppercase tracking-widest text-[#D4AF37] mb-1">{ticket.screening_date || ticket.date}</p>
            <h4 className="font-display font-bold text-sm leading-tight mb-1">{ticket.title}</h4>
            <p className="text-xs text-gray-400">{ticket.theatre || "Digital Cinema"}</p>
          </div>

          {/* Hover Actions Overlay */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
            <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#D4AF37] hover:text-black transition-colors flex items-center justify-center">
              <Maximize2 className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-full bg-white/10 hover:bg-white transition-colors flex items-center justify-center">
                <Download className="w-3 h-3 text-white hover:text-black" />
              </button>
              <button className="w-8 h-8 rounded-full bg-white/10 hover:bg-white transition-colors flex items-center justify-center">
                <Share2 className="w-3 h-3 text-white hover:text-black" />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

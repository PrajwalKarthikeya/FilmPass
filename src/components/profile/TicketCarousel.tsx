"use client";

import { useRef } from "react";
import Image from "next/image";
import { Download, Share2, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { mockVaultTickets } from "@/lib/mock-data";

export function TicketCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="mb-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h3 className="font-display text-3xl font-bold">Recent Tickets</h3>
          <p className="text-gray-400 text-sm mt-1">The latest additions to the collection.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => scroll("left")} className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={() => scroll("right")} className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div 
        ref={carouselRef}
        className="flex overflow-x-auto gap-6 pb-8 custom-scrollbar snap-x snap-mandatory hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {mockVaultTickets.map((ticket) => (
          <div 
            key={ticket.id} 
            className="shrink-0 w-[240px] md:w-[280px] snap-center group relative aspect-[2/3] rounded-2xl overflow-hidden cursor-pointer bg-zinc-900 border border-white/5 hover:border-[#D4AF37]/30 transition-all duration-300"
          >
            <Image src={ticket.image} alt={ticket.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
            
            <div className="absolute top-4 left-4 right-4 flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-[9px] uppercase tracking-widest text-[#D4AF37] border border-white/10">
                {ticket.style}
              </span>
              <button className="p-2 bg-black/60 backdrop-blur-md rounded-full text-white hover:text-red-500 transition-colors border border-white/10">
                <Heart className="w-3 h-3" />
              </button>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-mono mb-1">{ticket.date}</p>
              <h4 className="font-display font-bold text-xl leading-tight mb-1">{ticket.title}</h4>
              <p className="text-xs text-[#D4AF37] truncate">{ticket.serial}</p>
              
              <div className="flex gap-2 mt-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                <button className="flex-1 py-2 bg-white/10 hover:bg-[#D4AF37] hover:text-black rounded-lg text-xs font-bold uppercase tracking-wider transition-colors">
                  Open
                </button>
                <button className="px-3 py-2 bg-white/10 hover:bg-white hover:text-black rounded-lg transition-colors flex items-center justify-center">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

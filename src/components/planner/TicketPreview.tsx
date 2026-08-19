"use client";

import Image from "next/image";
import QRCode from "react-qr-code";
import { ExtendedMovieDetails, TMDB_IMAGE_URL } from "@/lib/tmdb";
import { cn } from "@/lib/utils";

export interface TicketConfig {
  theatre: string;
  date: string;
  time: string;
  screen: string;
  seat: string;
  style: string;
}

interface TicketPreviewProps {
  movie: ExtendedMovieDetails;
  config: TicketConfig;
  serialNumber: string;
}

export function TicketPreview({ movie, config, serialNumber }: TicketPreviewProps) {
  const posterUrl = movie.poster_path ? `${TMDB_IMAGE_URL}/w500${movie.poster_path}` : "";
  const year = movie.release_date ? movie.release_date.split("-")[0] : "";
  const runtime = `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`;

  // Dynamic style variations
  const isLight = config.style === "Vintage" || config.style === "Minimal";
  const bgClass = {
    Modern: "bg-zinc-900 text-white",
    Vintage: "bg-[#F4EFE6] text-amber-950",
    Luxury: "bg-black text-accent",
    Retro: "bg-red-950 text-amber-100",
    Minimal: "bg-white text-black",
    "Sci-Fi": "bg-slate-950 text-cyan-400 font-mono",
    Noir: "bg-stone-900 text-stone-300 grayscale",
  }[config.style] || "bg-zinc-900 text-white";

  const qrPayload = JSON.stringify({
    mId: movie.id,
    title: movie.title,
    t: config.theatre,
    d: config.date,
    tm: config.time,
    s: config.seat,
    sc: config.screen,
    sn: serialNumber,
    v: 1
  });

  return (
    <div className="relative w-full max-w-sm mx-auto perspective-1000 group">
      {/* Ticket Container with 3D hover effects */}
      <div className={cn(
        "relative w-full rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 preserve-3d group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.5)] group-hover:-translate-y-4 group-hover:rotate-x-12 group-hover:-rotate-y-12",
        bgClass
      )}>
        
        {/* Paper Textures & Lighting */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 pointer-events-none" />
        
        {/* Holographic Shimmer (Visible on Hover) */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[linear-gradient(115deg,transparent_20%,rgba(255,255,255,0.3)_30%,transparent_40%)] -translate-x-full group-hover:animate-shimmer pointer-events-none mix-blend-overlay" />

        {/* Top Header */}
        <div className="px-6 pt-6 pb-4 border-b-2 border-dashed border-current/20 relative">
          {/* Perforated Edges (Cutouts) */}
          <div className={cn("absolute -left-3 bottom-[-13px] w-6 h-6 rounded-full", isLight ? "bg-white" : "bg-background")} />
          <div className={cn("absolute -right-3 bottom-[-13px] w-6 h-6 rounded-full", isLight ? "bg-white" : "bg-background")} />
          
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-[10px] uppercase tracking-widest opacity-60 font-semibold mb-1">Admit One</p>
              <h3 className="font-display text-xl font-bold leading-none">{config.theatre}</h3>
            </div>
            {config.style === "Luxury" && (
              <div className="w-8 h-8 rounded-full border border-accent flex items-center justify-center">
                <span className="text-xs">VIP</span>
              </div>
            )}
          </div>
        </div>

        {/* Poster & Movie Details */}
        <div className="px-6 py-6 flex gap-4">
          <div className="w-24 shrink-0 relative aspect-[2/3] rounded-lg overflow-hidden shadow-lg">
            {posterUrl && <Image src={posterUrl} alt={movie.title} fill className="object-cover" />}
            {config.style === "Vintage" && <div className="absolute inset-0 bg-amber-900/20 mix-blend-multiply" />}
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <h2 className="font-display text-2xl font-bold leading-tight line-clamp-2 mb-2">
              {movie.title}
            </h2>
            <div className="flex items-center gap-2 text-xs opacity-80 mb-1">
              <span>{year}</span>
              <span>•</span>
              <span>{runtime}</span>
            </div>
            <div className="text-xs opacity-80">
              {movie.genres.slice(0,2).map(g => g.name).join(", ")}
            </div>
          </div>
        </div>

        {/* Screening Details Grid */}
        <div className="px-6 pb-6 grid grid-cols-3 gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest opacity-60 mb-1">Date</span>
            <span className="font-bold text-sm">{config.date}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest opacity-60 mb-1">Time</span>
            <span className="font-bold text-sm">{config.time}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest opacity-60 mb-1">Screen</span>
            <span className="font-bold text-sm">{config.screen}</span>
          </div>
        </div>

        {/* Seat Row & Col */}
        <div className="px-6 pb-6 flex items-center justify-between border-b-2 border-dashed border-current/20 relative">
          <div className={cn("absolute -left-3 bottom-[-13px] w-6 h-6 rounded-full", isLight ? "bg-white" : "bg-background")} />
          <div className={cn("absolute -right-3 bottom-[-13px] w-6 h-6 rounded-full", isLight ? "bg-white" : "bg-background")} />
          
          <div className="flex flex-col items-center flex-1">
            <span className="text-[10px] uppercase tracking-widest opacity-60 mb-1">Row</span>
            <span className="font-display text-3xl font-bold">{config.seat.charAt(0) || "-"}</span>
          </div>
          <div className="w-px h-12 bg-current/20" />
          <div className="flex flex-col items-center flex-1">
            <span className="text-[10px] uppercase tracking-widest opacity-60 mb-1">Seat</span>
            <span className="font-display text-3xl font-bold">{config.seat.substring(1) || "-"}</span>
          </div>
        </div>

        {/* QR Code & Serial */}
        <div className="p-6 flex flex-col items-center bg-black/5 relative">
          <div className="bg-white p-2 rounded-lg shadow-inner mb-4 transition-transform group-hover:scale-105 duration-500">
            <QRCode 
              value={qrPayload}
              size={96}
              bgColor="#ffffff"
              fgColor="#000000"
              level="M"
            />
          </div>
          
          <p 
            className="text-[10px] tracking-[0.2em] opacity-60 font-mono text-center break-all px-4"
            title="Unique Collectible Cinema ID"
          >
            {serialNumber}
          </p>

          {/* Holographic Authenticity Badge */}
          <div className="mt-4 flex items-center justify-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
            <div className="w-3 h-3 rounded-full bg-gradient-to-tr from-accent via-white to-accent shadow-[0_0_10px_currentColor] animate-pulse" />
            <span className="text-[9px] uppercase tracking-widest">Official Cinema Collectible</span>
          </div>
        </div>

      </div>
    </div>
  );
}

import Image from "next/image";
import QRCode from "react-qr-code";
import { ExtendedMovieDetails, TMDB_IMAGE_URL } from "@/lib/tmdb";
import { cn } from "@/lib/utils";

interface HighResTicketProps {
  movie: ExtendedMovieDetails;
  theatre: string;
  date: string;
  time: string;
  screen: string;
  seat: string;
  style: string;
  serial: string;
}

export function HighResTicket({ movie, theatre, date, time, screen, seat, style, serial }: HighResTicketProps) {
  // Always use original for maximum export quality
  const posterUrl = movie.poster_path ? `${TMDB_IMAGE_URL}/original${movie.poster_path}` : "";
  const year = movie.release_date ? movie.release_date.split("-")[0] : "";
  const runtime = `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`;
  const timestamp = new Date().toISOString();

  // Dynamic styles for the final render
  const isLight = style === "Vintage" || style === "Minimal";
  const bgClass = {
    Modern: "bg-zinc-900 text-white border-zinc-800",
    Vintage: "bg-[#F4EFE6] text-amber-950 border-amber-900/20",
    Luxury: "bg-black text-accent border-accent/20",
    Retro: "bg-red-950 text-amber-100 border-red-900",
    Minimal: "bg-white text-black border-zinc-200",
    "Sci-Fi": "bg-slate-950 text-cyan-400 font-mono border-cyan-900/50",
    Noir: "bg-stone-900 text-stone-300 grayscale border-stone-800",
  }[style] || "bg-zinc-900 text-white border-zinc-800";

  const qrPayload = JSON.stringify({ mId: movie.id, t: theatre, d: date, tm: time, s: seat, sn: serial });

  return (
    <div 
      id="export-ticket" 
      className={cn(
        "relative w-[600px] h-auto flex flex-col rounded-[2rem] overflow-hidden shadow-2xl border-4",
        bgClass
      )}
      style={{ transform: 'scale(1)', transformOrigin: 'top center' }} // Ensure no weird transforms during export
    >
      {/* Paper Textures */}
      <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />
      <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/10 pointer-events-none" />

      {/* Top Header */}
      <div className="px-10 pt-10 pb-6 border-b-[3px] border-dashed border-current/20 relative">
        <div className={cn("absolute -left-6 bottom-[-24px] w-12 h-12 rounded-full border-r-[3px] border-current/20", isLight ? "bg-[#050505]" : "bg-[#050505]")} style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }} />
        <div className={cn("absolute -right-6 bottom-[-24px] w-12 h-12 rounded-full border-l-[3px] border-current/20", isLight ? "bg-[#050505]" : "bg-[#050505]")} style={{ clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)' }} />
        
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] opacity-60 font-semibold mb-2">Admit One</p>
            <h3 className="font-display text-3xl font-bold tracking-wide">{theatre}</h3>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-widest opacity-40 font-mono mb-1">Generated</p>
            <p className="text-xs opacity-60 font-mono">{new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-10 py-10 flex gap-8">
        <div className="w-48 shrink-0 relative aspect-[2/3] rounded-xl overflow-hidden shadow-2xl border border-white/10">
          {/* Using img instead of next/image for flawless html-to-image capture */}
          {posterUrl && <img src={posterUrl} alt={movie.title} className="absolute inset-0 w-full h-full object-cover" crossOrigin="anonymous" />}
          {style === "Vintage" && <div className="absolute inset-0 bg-amber-900/30 mix-blend-multiply" />}
        </div>
        
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="font-display text-4xl font-bold leading-tight mb-4">
            {movie.title}
          </h2>
          
          <div className="flex items-center gap-3 text-sm opacity-80 mb-6 font-medium tracking-wide">
            <span className="bg-current/10 px-3 py-1 rounded-md">{year}</span>
            <span>•</span>
            <span className="bg-current/10 px-3 py-1 rounded-md">{runtime}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-auto">
            <div>
              <span className="block text-xs uppercase tracking-widest opacity-50 mb-1">Date</span>
              <span className="text-lg font-bold">{date}</span>
            </div>
            <div>
              <span className="block text-xs uppercase tracking-widest opacity-50 mb-1">Time</span>
              <span className="text-lg font-bold">{time}</span>
            </div>
            <div>
              <span className="block text-xs uppercase tracking-widest opacity-50 mb-1">Screen</span>
              <span className="text-lg font-bold">{screen}</span>
            </div>
            <div>
              <span className="block text-xs uppercase tracking-widest opacity-50 mb-1">Genre</span>
              <span className="text-sm font-medium leading-tight">
                {movie.genres.slice(0,2).map(g => g.name).join(", ")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Seat Row */}
      <div className="px-10 pb-8 flex items-center justify-between border-b-[3px] border-dashed border-current/20 relative">
        <div className="flex flex-col items-center flex-1">
          <span className="text-xs uppercase tracking-widest opacity-50 mb-2">Row</span>
          <span className="font-display text-5xl font-bold">{seat.charAt(0) || "-"}</span>
        </div>
        <div className="w-1 h-16 bg-current/20 rounded-full" />
        <div className="flex flex-col items-center flex-1">
          <span className="text-xs uppercase tracking-widest opacity-50 mb-2">Seat</span>
          <span className="font-display text-5xl font-bold">{seat.substring(1) || "-"}</span>
        </div>
      </div>

      {/* Footer & QR */}
      <div className="p-10 flex gap-8 items-center bg-black/5 relative overflow-hidden">
        
        {/* Security Pattern Background */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 1px, transparent 10px)' }} />

        <div className="bg-white p-3 rounded-xl shadow-lg relative z-10 shrink-0">
          <QRCode 
            value={qrPayload}
            size={120}
            bgColor="#ffffff"
            fgColor="#000000"
            level="Q"
          />
        </div>
        
        <div className="flex-1 flex flex-col justify-center relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 opacity-80">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Official Digital Collectible</span>
          </div>
          
          <p className="text-[11px] tracking-[0.2em] opacity-80 font-mono break-all leading-relaxed mb-4">
            {serial}
          </p>

          <div className="flex flex-col gap-1 text-[8px] uppercase tracking-widest opacity-40 font-mono">
            <p>Auth Hash: {Buffer.from(serial).toString('base64').substring(0, 16)}</p>
            <p>Timestamp: {timestamp}</p>
            <p>Version: 1.0.0-FP</p>
          </div>
        </div>
      </div>
    </div>
  );
}

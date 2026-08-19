"use client";

import Image from "next/image";

export function TMDBAttribution() {
  return (
    <section className="py-12 border-t border-white/5 bg-[#020202]">
      <div className="max-w-4xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <div className="max-w-xl">
          <p className="text-sm text-gray-400 font-light leading-relaxed">
            Movie information and images are provided by TMDB. 
            This product uses the TMDB API but is not endorsed or certified by TMDB.
          </p>
        </div>
        
        {/* We use a placeholder for the TMDB logo here, or stylized text if logo isn't locally available */}
        <div className="flex items-center gap-3 shrink-0 opacity-50 hover:opacity-100 transition-opacity">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-green-400 flex items-center justify-center">
            <span className="font-bold text-white text-xs">TMDB</span>
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-mono">Powered By</p>
            <p className="font-bold text-white text-sm">The Movie Database</p>
          </div>
        </div>
      </div>
    </section>
  );
}

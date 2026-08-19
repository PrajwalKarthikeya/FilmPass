import { notFound } from "next/navigation";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { theatres } from "@/lib/theatres";
import { getTMDBMovies } from "@/lib/tmdb";
import { NowShowingCarousel } from "@/components/screening/NowShowingCarousel";
import { SearchCTA } from "@/components/screening/SearchCTA";
import { RefreshCountdown } from "@/components/screening/RefreshCountdown";
import { Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";

export async function generateMetadata({ params }: { params: { theatreId: string } }) {
  const theatre = theatres.find(t => t.id === params.theatreId);
  if (!theatre) return { title: 'Theatre Not Found' };
  
  return {
    title: `${theatre.name} | Now Screening`,
    description: theatre.description,
  };
}

export default async function TheatrePage({ params }: { params: { theatreId: string } }) {
  const theatre = theatres.find(t => t.id === params.theatreId);
  
  if (!theatre) {
    notFound();
  }

  // Dynamically fetch TMDB movies for this specific theatre's theme rules!
  const movies = await getTMDBMovies(theatre.fetchParams.endpoint, theatre.fetchParams.params);
  
  const Icon = theatre.icon;

  return (
    <main className="flex-1 w-full min-h-screen bg-[#050505] flex flex-col font-sans selection:bg-[#D4AF37] selection:text-black">
      <Navbar />
      
      {/* Immersive Theatre Hero */}
      <div className="relative w-full h-[70vh] min-h-[600px] flex flex-col justify-end">
        <div className="absolute inset-0">
          <Image 
            src={theatre.backgroundUrl}
            alt={theatre.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent opacity-100" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/40 to-transparent" />
          
          {/* Dynamic Color Wash */}
          <div 
            className="absolute inset-0 opacity-20 mix-blend-color"
            style={{ backgroundColor: theatre.colorAccent }}
          />
        </div>

        <div className="relative z-20 w-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 pb-24">
          <Link href="/screening" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-12 text-sm uppercase tracking-widest font-mono">
            <ArrowLeft className="w-4 h-4" />
            Back to District
          </Link>

          <div className="flex items-center gap-6 mb-6">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20 shadow-2xl"
              style={{ backgroundColor: `${theatre.colorAccent}20` }}
            >
              <Icon className="w-8 h-8" style={{ color: theatre.colorAccent }} />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full text-[10px] font-mono uppercase tracking-widest text-white mb-2 border border-white/10">
                <Sparkles className="w-3 h-3" style={{ color: theatre.colorAccent }} />
                {theatre.theme}
              </div>
            </div>
          </div>
          
          <h1 className="font-display text-6xl md:text-8xl font-bold tracking-tighter mb-6 leading-none text-white">
            {theatre.name}
          </h1>
          
          <p className="text-xl text-gray-300 font-light max-w-2xl leading-relaxed mb-8">
            {theatre.description}
          </p>

          <div className="flex items-center gap-4">
            <RefreshCountdown />
            <div className="text-sm font-mono text-gray-400 uppercase tracking-widest">
              {movies.length} Featured Films
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 pt-16 pb-32">
        <div className="mb-8 flex items-center gap-4">
          <h2 className="font-display text-4xl font-bold">Now Showing</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
        </div>
        
        <NowShowingCarousel movies={movies} colorAccent={theatre.colorAccent} />

        <SearchCTA />
      </div>
      
      <Footer />
    </main>
  );
}

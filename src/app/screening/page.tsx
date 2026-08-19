import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TheatreHero } from "@/components/screening/TheatreHero";
import { TheatreGrid } from "@/components/screening/TheatreGrid";

export const metadata = {
  title: 'Now Screening | FilmPass',
  description: 'Enter the curated digital cinema district. Ten virtual theatres, endless discovery.',
};

export default function ScreeningPage() {
  return (
    <main className="flex-1 w-full min-h-screen bg-[#050505] flex flex-col font-sans selection:bg-[#D4AF37] selection:text-black">
      <Navbar />
      
      <div className="flex-1 w-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 pt-24 pb-32">
        <TheatreHero />
        
        <div className="mb-12">
          <div className="flex items-end justify-between border-b border-white/10 pb-6">
            <div>
              <h2 className="font-display text-4xl font-bold tracking-wide">Virtual Theatres</h2>
              <p className="text-gray-400 mt-2 font-mono text-sm uppercase tracking-widest">Select a theatre to enter</p>
            </div>
          </div>
        </div>
        
        <TheatreGrid />
        
      </div>
      
      <Footer />
    </main>
  );
}

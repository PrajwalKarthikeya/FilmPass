import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PassportHero } from "@/components/passports/PassportHero";
import { PassportSearch } from "@/components/passports/PassportSearch";
import { PassportGrid } from "@/components/passports/PassportGrid";

import { createClient } from "@/lib/supabase/server";
import { getUserPassports } from "@/lib/supabase/queries";
import { mockPassports } from "@/lib/mock-passports";

export const metadata = {
  title: 'Cinema Passport | FilmPass',
  description: 'Travel through the history of world cinema, one ticket at a time.',
};

export default async function PassportsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let userProgress: any[] = [];

  if (user) {
    // Authenticated Mode: Fetch Real Progress
    userProgress = await getUserPassports(user.id) || [];
  } else {
    // Guest Mode: Demo Data (e.g. some passports have mock progress)
    userProgress = mockPassports.map(p => ({
      passport_id: p.id,
      progress_count: p.currentCount,
      status: p.currentCount >= p.totalRequired ? 'completed' : 'in_progress'
    }));
  }

  return (
    <main className="flex-1 w-full min-h-screen bg-[#050505] flex flex-col font-sans selection:bg-[#D4AF37] selection:text-black">
      <Navbar />
      
      <div className="flex-1 w-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 pt-24 pb-32">
        
        <PassportHero />
        
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-wide">Passport Archive</h2>
            <p className="text-gray-400 text-sm mt-1">Discover new cinematic horizons.</p>
          </div>
        </div>
        
        <PassportSearch />
        
        <PassportGrid userProgress={userProgress} />
        
      </div>
      
      <Footer />
    </main>
  );
}

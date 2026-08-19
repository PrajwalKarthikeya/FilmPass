import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProfileHero } from "@/components/vault/ProfileHero";
import { StatisticGrid } from "@/components/vault/StatisticGrid";
import { CollectorLevelCard } from "@/components/vault/CollectorLevelCard";
import { RareTicketShowcase } from "@/components/vault/RareTicketShowcase";
import { TicketGrid } from "@/components/vault/TicketGrid";
import { CollectionGrid } from "@/components/vault/CollectionGrid";
import { AchievementGrid } from "@/components/vault/AchievementGrid";
import { ActivityTimeline } from "@/components/vault/ActivityTimeline";

import { createClient } from "@/lib/supabase/server";
import { getUserProfile, getUserStats, getUserTickets, getUserCollections } from "@/lib/supabase/queries";
import { mockVaultUser, mockVaultStats, mockVaultTickets, mockCollections } from "@/lib/mock-data";

export const metadata = {
  title: 'Cinema Vault | FilmPass',
  description: 'Your private collection of cinema tickets.',
};

export default async function VaultPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Option B: Hybrid Data Fetching
  let profile, stats, tickets, collections;
  
  if (user) {
    // Authenticated Mode: Fetch Real Data
    profile = await getUserProfile(user.id) || { username: user.user_metadata?.username, display_name: user.user_metadata?.display_name, avatar_url: user.user_metadata?.avatar_url, collector_level: 'Newcomer', xp: 0 };
    stats = await getUserStats(user.id) || { movies_collected: 0, tickets_generated: 0, passports_earned: 0, directors_completed: 0, total_runtime_minutes: 0 };
    tickets = await getUserTickets(user.id) || [];
    collections = await getUserCollections(user.id) || [];
  } else {
    // Guest Mode: Demo Data
    profile = mockVaultUser;
    stats = mockVaultStats;
    tickets = mockVaultTickets;
    collections = mockCollections;
  }

  return (
    <main className="flex-1 w-full min-h-screen bg-[#050505] flex flex-col font-sans selection:bg-[#D4AF37] selection:text-black">
      <Navbar />
      
      <div className="flex-1 w-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 pt-24 pb-32">
        
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <div className="lg:col-span-2">
            <ProfileHero profile={profile} />
          </div>
          <div>
            <CollectorLevelCard profile={profile} stats={stats} />
          </div>
        </div>

        {/* Global Statistics */}
        <StatisticGrid stats={stats} />

        {/* Gamification Showcases */}
        <div className="mb-20">
          <h2 className="font-display text-3xl font-bold mb-8">Prized Possession</h2>
          <RareTicketShowcase tickets={tickets} />
        </div>

        {/* Main Vault Content */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
            <h2 className="font-display text-3xl font-bold">Ticket Archive</h2>
            <div className="text-sm font-mono text-gray-400 uppercase tracking-widest">
              {tickets.length} Tickets
            </div>
          </div>
          <TicketGrid tickets={tickets} />
        </div>

        {/* Collections */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
            <h2 className="font-display text-3xl font-bold">Curated Collections</h2>
          </div>
          <CollectionGrid collections={collections} />
        </div>

        {/* Gamification & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display text-2xl font-bold mb-6">Recent Achievements</h2>
            <AchievementGrid />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold mb-6">Activity Log</h2>
            <ActivityTimeline tickets={tickets} />
          </div>
        </div>

      </div>
      
      <Footer />
    </main>
  );
}

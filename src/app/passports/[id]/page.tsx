import { notFound } from "next/navigation";
import { mockPassports } from "@/lib/mock-passports";
import { PassportDetailClient } from "./PassportDetailClient";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export function generateMetadata({ params }: { params: { id: string } }) {
  const passport = mockPassports.find(p => p.id === params.id);
  if (!passport) return { title: 'Not Found' };
  return { title: `${passport.title} | FilmPass` };
}

export default function PassportPage({ params }: { params: { id: string } }) {
  const passport = mockPassports.find(p => p.id === params.id);
  
  if (!passport) {
    notFound();
  }

  // Ensure there is a requiredMovies array (fallback if not defined in mock)
  const fullPassport = {
    ...passport,
    requiredMovies: passport.requiredMovies || []
  };

  return (
    <main className="flex-1 w-full min-h-screen bg-[#050505] flex flex-col font-sans selection:bg-[#D4AF37] selection:text-black">
      <Navbar />
      <div className="flex-1 w-full pt-24 pb-32">
        <PassportDetailClient passport={fullPassport} />
      </div>
      <Footer />
    </main>
  );
}

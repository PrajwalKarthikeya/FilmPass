import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TicketBuilder } from "@/components/ticket/TicketBuilder";
import { getMovieDetails } from "@/lib/tmdb";

export const dynamic = "force-dynamic";

interface TicketPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function TicketPage({ searchParams }: TicketPageProps) {
  const resolvedParams = await searchParams;
  
  const mId = resolvedParams.mId as string;
  const theatre = (resolvedParams.theatre as string) || "FilmPass Cinema";
  const date = (resolvedParams.date as string) || "Today";
  const time = (resolvedParams.time as string) || "12:00 PM";
  const screen = (resolvedParams.screen as string) || "Screen 1";
  const seat = (resolvedParams.seat as string) || "A1";
  const style = (resolvedParams.style as string) || "Modern";
  const serial = (resolvedParams.serial as string) || "TKT-00000000";

  const movieId = parseInt(mId);
  if (isNaN(movieId)) {
    notFound();
  }

  const movie = await getMovieDetails(movieId);
  if (movie && 'error' in movie) {
    return (
      <main className="flex-1 w-full min-h-screen bg-[#0A0A0A] flex flex-col pt-24">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-red-500 font-mono">
          <h1 className="text-2xl mb-4 font-bold text-white">Movie API Debug</h1>
          <p className="bg-red-900/30 p-4 border border-red-500 rounded-lg max-w-2xl overflow-auto text-left">
            {movie.error}
          </p>
          <p className="mt-6 text-white text-sm">Please screenshot this and send it to your developer.</p>
        </div>
        <Footer />
      </main>
    );
  }

  if (!movie) {
    notFound();
  }

  const validMovie = movie as any;

  return (
    <main className="flex-1 w-full min-h-screen bg-[#050505] flex flex-col">
      <Navbar />
      
      <div className="flex-1 w-full flex items-center justify-center">
        <TicketBuilder 
          movie={validMovie}
          theatre={theatre}
          date={date}
          time={time}
          screen={screen}
          seat={seat}
          style={style}
          serial={serial}
        />
      </div>

      <Footer />
    </main>
  );
}

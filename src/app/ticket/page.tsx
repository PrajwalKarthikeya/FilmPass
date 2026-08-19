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
  if (!movie) {
    notFound();
  }

  return (
    <main className="flex-1 w-full min-h-screen bg-[#050505] flex flex-col">
      <Navbar />
      
      <div className="flex-1 w-full flex items-center justify-center">
        <TicketBuilder 
          movie={movie}
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

import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/movie/HeroSection";
import { StorySection } from "@/components/movie/StorySection";
import { MovieFacts } from "@/components/movie/MovieFacts";
import { CastCarousel } from "@/components/movie/CastCarousel";
import { CrewGrid } from "@/components/movie/CrewGrid";
import { MediaTabs } from "@/components/movie/MediaTabs";
import { RecommendationCarousel } from "@/components/movie/RecommendationCarousel";
import { ScreeningPlanner } from "@/components/planner/ScreeningPlanner";
import { getMovieDetails } from "@/lib/tmdb";

export const dynamic = "force-dynamic";

interface MoviePageProps {
  params: { id: string };
}

export default async function MoviePage({ params }: MoviePageProps) {
  const resolvedParams = await params;
  const movieId = parseInt(resolvedParams.id);
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

  // Tell TypeScript it's definitively an ExtendedMovieDetails now
  const validMovie = movie as any;

  return (
    <main className="flex-1 w-full min-h-screen bg-[#0A0A0A] flex flex-col">
      <Navbar />
      
      <HeroSection movie={validMovie} />

      <div className="flex-1 w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 pt-16 pb-32">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Main Content Column */}
          <div className="flex-1 min-w-0">
            <StorySection movie={validMovie} />
            <CastCarousel movie={validMovie} />
            <CrewGrid movie={validMovie} />
            <MediaTabs movie={validMovie} />
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80 xl:w-96 shrink-0">
            <MovieFacts movie={validMovie} />
          </div>
        </div>

        <ScreeningPlanner movie={validMovie} />
        
        <RecommendationCarousel movie={validMovie} />
      </div>
      
      <Footer />
    </main>
  );
}

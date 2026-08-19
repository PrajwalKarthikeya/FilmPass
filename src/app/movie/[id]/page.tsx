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
  
  if (!movie) {
    notFound();
  }

  return (
    <main className="flex-1 w-full min-h-screen bg-[#0A0A0A] flex flex-col">
      <Navbar />
      
      <HeroSection movie={movie} />

      <div className="flex-1 w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16 pt-16 pb-32">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Main Content Column */}
          <div className="flex-1 min-w-0">
            <StorySection movie={movie} />
            <CastCarousel movie={movie} />
            <CrewGrid movie={movie} />
            <MediaTabs movie={movie} />
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-80 xl:w-96 shrink-0">
            <MovieFacts movie={movie} />
          </div>
        </div>

        <ScreeningPlanner movie={movie} />
        
        <RecommendationCarousel movie={movie} />
      </div>
      
      <Footer />
    </main>
  );
}

import { ExtendedMovieDetails } from "@/lib/tmdb";
import { DiscoverSection } from "@/components/search/DiscoverSection";

interface RecommendationCarouselProps {
  movie: ExtendedMovieDetails;
}

export function RecommendationCarousel({ movie }: RecommendationCarouselProps) {
  const recommendations = movie.recommendations?.results || [];
  const similar = movie.similar?.results || [];

  return (
    <div className="space-y-12">
      {recommendations.length > 0 && (
        <DiscoverSection title="People Also Liked" movies={recommendations} />
      )}
      {recommendations.length === 0 && similar.length > 0 && (
        <DiscoverSection title="Similar Movies" movies={similar} />
      )}
    </div>
  );
}

import { ExtendedMovieDetails } from "@/lib/tmdb";

interface MovieFactsProps {
  movie: ExtendedMovieDetails;
}

export function MovieFacts({ movie }: MovieFactsProps) {
  const formatCurrency = (amount: number) => {
    if (!amount || amount === 0) return "Unknown";
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount);
  };

  const facts = [
    { label: "Status", value: movie.status },
    { label: "Release Date", value: movie.release_date },
    { label: "Original Language", value: movie.original_language.toUpperCase() },
    { label: "Budget", value: formatCurrency(movie.budget) },
    { label: "Revenue", value: formatCurrency(movie.revenue) },
    { label: "Popularity", value: movie.vote_average.toFixed(1) },
  ];

  return (
    <div className="bg-surface/50 border border-white/5 rounded-2xl p-6 md:p-8">
      <h3 className="font-display text-lg font-medium text-white mb-6 uppercase tracking-wider">
        Facts
      </h3>
      <dl className="space-y-4">
        {facts.map((fact) => (
          <div key={fact.label} className="flex flex-col gap-1">
            <dt className="text-sm text-muted">{fact.label}</dt>
            <dd className="text-sm font-medium text-white">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

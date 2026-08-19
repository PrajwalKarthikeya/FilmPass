export const mockUserProfile = {
  username: "cinemavale",
  displayName: "Alexander Vance",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256",
  country: "United Kingdom",
  joinDate: "October 2023",
  bio: "Preserving the magic of 70mm and neon-drenched sci-fi. Film is forever.",
  rank: "Master Cinephile",
  xp: 14250,
  nextMilestone: "Legend",
  progressToNext: 85,
  accentColor: "#D4AF37",
  quote: "\"We used to look up at the sky and wonder at our place in the stars...\"",
  backdrops: [
    "https://image.tmdb.org/t/p/original/gEU2QlsUUHXjNpeYYC2Bfkvl5p.jpg", // Interstellar
    "https://image.tmdb.org/t/p/original/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg", // Blade Runner 2049
    "https://image.tmdb.org/t/p/original/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg", // Oppenheimer
    "https://image.tmdb.org/t/p/original/1pdfLvkbY9ohJlCjQH2JGjjc94Y.jpg", // Dune
  ]
};

export const mockProfileStats = [
  { label: "Movies Collected", value: 118 },
  { label: "Tickets Generated", value: 142 },
  { label: "Passports Earned", value: 4 },
  { label: "Total Runtime", value: "248h" },
  { label: "Avg Rating", value: 8.4 },
  { label: "Countries", value: 12 },
  { label: "Decades", value: 8 },
  { label: "Favorite Genre", value: "Sci-Fi" },
];

export const mockFavoriteMovies = [
  { id: "m1", title: "Interstellar", poster: "https://image.tmdb.org/t/p/w500/gEU2QlsUUHXjNpeYYC2Bfkvl5p.jpg", year: 2014 },
  { id: "m2", title: "Blade Runner 2049", poster: "https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg", year: 2017 },
  { id: "m3", title: "Oppenheimer", poster: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg", year: 2023 },
  { id: "m4", title: "Dune: Part Two", poster: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2JGjjc94Y.jpg", year: 2024 },
  { id: "m5", title: "2001: A Space Odyssey", poster: "https://image.tmdb.org/t/p/w500/zVmyTNxB0xZqLKEzEA6EisHw1qB.jpg", year: 1968 },
  { id: "m6", title: "The Grand Budapest Hotel", poster: "https://image.tmdb.org/t/p/w500/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg", year: 2014 },
  { id: "m7", title: "Parasite", poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg", year: 2019 },
  { id: "m8", title: "Spirited Away", poster: "https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkBg8lWOb.jpg", year: 2001 },
  { id: "m9", title: "Everything Everywhere All at Once", poster: "https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg", year: 2022 },
  { id: "m10", title: "The Matrix", poster: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GvwJwB02xcUK.jpg", year: 1999 },
  { id: "m11", title: "Arrival", poster: "https://image.tmdb.org/t/p/w500/pA2k9YQ01Gla0R46n4xOq2hP66X.jpg", year: 2016 },
  { id: "m12", title: "Ex Machina", poster: "https://image.tmdb.org/t/p/w500/96K9X4e7b8r7oZ6Dq40j1tK96s6.jpg", year: 2014 },
];

export const mockFavoriteDirectors = [
  { id: "d1", name: "Christopher Nolan", image: "https://image.tmdb.org/t/p/w500/1XmOl9H7vV03VjSg4Hl5Qf8mN9J.jpg", completed: 12, total: 12, favoriteFilm: "Interstellar", completionPercent: 100 },
  { id: "d2", name: "Denis Villeneuve", image: "https://image.tmdb.org/t/p/w500/zdqOaB3Txs4H1zB0P8G5m59gLw2.jpg", completed: 8, total: 11, favoriteFilm: "Blade Runner 2049", completionPercent: 72 },
  { id: "d3", name: "Hayao Miyazaki", image: "https://image.tmdb.org/t/p/w500/tzH2k13YcEhwq88RUKXj99tF79S.jpg", completed: 10, total: 12, favoriteFilm: "Spirited Away", completionPercent: 83 },
  { id: "d4", name: "Wes Anderson", image: "https://image.tmdb.org/t/p/w500/3U9QvTofbheN8Y0Gikv9eP45N7V.jpg", completed: 7, total: 11, favoriteFilm: "The Grand Budapest Hotel", completionPercent: 63 }
];

export const mockFavoriteActors = [
  { id: "a1", name: "Cillian Murphy", image: "https://image.tmdb.org/t/p/w500/36bQ8gE0X2fKjUq1j0QdE7O4jO3.jpg", watched: 15, favoritePerformance: "Oppenheimer" },
  { id: "a2", name: "Ryan Gosling", image: "https://image.tmdb.org/t/p/w500/1r4cCpeFweQxweEouqQ0JmndTnt.jpg", watched: 18, favoritePerformance: "Blade Runner 2049" },
  { id: "a3", name: "Florence Pugh", image: "https://image.tmdb.org/t/p/w500/96nK0jVp1y6oOQMBt4u07kXjY7l.jpg", watched: 10, favoritePerformance: "Midsommar" },
  { id: "a4", name: "Oscar Isaac", image: "https://image.tmdb.org/t/p/w500/40q6nO79n5YI1fOqS5pE2JkOqY4.jpg", watched: 14, favoritePerformance: "Ex Machina" }
];

export const mockGenreData = [
  { name: "Sci-Fi", value: 35, color: "#1B4F72" },
  { name: "Drama", value: 25, color: "#7D3C98" },
  { name: "Thriller", value: 15, color: "#641E16" },
  { name: "Action", value: 10, color: "#935116" },
  { name: "Animation", value: 10, color: "#117A65" },
  { name: "Horror", value: 5, color: "#4A0404" },
];

export const mockShowcaseItems = [
  { id: "s1", type: "movie", title: "Interstellar", image: "https://image.tmdb.org/t/p/w500/gEU2QlsUUHXjNpeYYC2Bfkvl5p.jpg" },
  { id: "s2", type: "ticket", title: "Blade Runner 2049", image: "https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg", detail: "Serial: BLA-2017-AMC-S04" },
  { id: "s3", type: "passport", title: "Sci-Fi Passport", image: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2JGjjc94Y.jpg", detail: "Completed" }
];

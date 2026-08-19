export const trendingMovies = [
  {
    id: 1,
    title: "Dune: Part Two",
    release_date: "2024-03-01",
    vote_average: 8.8,
    poster_path: "/1pdfLvkbY9ohJlCjQH2JGjjc91p.jpg",
    backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
    genre_ids: [878, 12],
    overview: "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.",
  },
  {
    id: 2,
    title: "Oppenheimer",
    release_date: "2023-07-21",
    vote_average: 8.6,
    poster_path: "/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    backdrop_path: "/fm6KqXpk3M2HVveHwCrBRoOoA0i.jpg",
    genre_ids: [18, 36],
    overview: "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II.",
  },
  {
    id: 3,
    title: "Interstellar",
    release_date: "2014-11-05",
    vote_average: 8.6,
    poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdrop_path: "/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
    genre_ids: [878, 18],
    overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
  },
  {
    id: 4,
    title: "Blade Runner 2049",
    release_date: "2017-10-04",
    vote_average: 8.0,
    poster_path: "/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
    backdrop_path: "/ilRyazdflIgEqO59ImjboG1CVJq.jpg",
    genre_ids: [878, 9648],
    overview: "Young Blade Runner K's discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, who's been missing for thirty years.",
  },
  {
    id: 5,
    title: "The Batman",
    release_date: "2022-03-01",
    vote_average: 7.8,
    poster_path: "/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    backdrop_path: "/b0PlSFdSmBgZAqfwSECJQh9cVNX.jpg",
    genre_ids: [80, 28],
    overview: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.",
  }
];

export const popularCollections = [
  {
    id: "nolan",
    title: "Christopher Nolan",
    image: "https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg"
  },
  {
    id: "scifi",
    title: "Sci-Fi Essentials",
    image: "https://image.tmdb.org/t/p/w500/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg"
  },
  {
    id: "a24",
    title: "A24 Masterpieces",
    image: "https://image.tmdb.org/t/p/w500/zVmyTNxB0xZqLKEzEA6EisHw1qB.jpg"
  }
];

export const mockExtendedMovieDetails = {
  id: 1,
  title: "Dune: Part Two",
  overview: "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.",
  poster_path: "/1pdfLvkbY9ohJlCjQH2JGjjc91p.jpg",
  backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
  release_date: "2024-03-01",
  vote_average: 8.8,
  genre_ids: [878, 12],
  runtime: 166,
  tagline: "Long live the fighters.",
  status: "Released",
  budget: 190000000,
  revenue: 711844358,
  original_language: "en",
  homepage: "https://www.dunemovie.com",
  genres: [
    { id: 878, name: "Science Fiction" },
    { id: 12, name: "Adventure" }
  ],
  credits: {
    cast: [
      { id: 1, name: "Timothée Chalamet", character: "Paul Atreides", profile_path: "/BE2sdjpgsa2rNTFa66f7upkaOP.jpg" },
      { id: 2, name: "Zendaya", character: "Chani", profile_path: "/3WG5GkaXg5FpZfG2r3yZ464i6H.jpg" },
      { id: 3, name: "Rebecca Ferguson", character: "Lady Jessica", profile_path: "/4tJqgEqqO1gXXHw6i6jO4fQpI6i.jpg" }
    ],
    crew: [
      { id: 4, name: "Denis Villeneuve", job: "Director", department: "Directing", profile_path: null },
      { id: 5, name: "Hans Zimmer", job: "Original Music Composer", department: "Sound", profile_path: null }
    ]
  },
  videos: {
    results: [
      { id: "v1", name: "Official Trailer", key: "U2Qp5pL3ovA", site: "YouTube", type: "Trailer" }
    ]
  },
  images: {
    backdrops: [{ file_path: "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg", aspect_ratio: 1.777 }],
    posters: [{ file_path: "/1pdfLvkbY9ohJlCjQH2JGjjc91p.jpg", aspect_ratio: 0.667 }]
  },
  keywords: {
    keywords: [{ id: 1, name: "desert" }, { id: 2, name: "messiah" }, { id: 3, name: "prophecy" }]
  },
  recommendations: {
    results: trendingMovies.slice(1)
  },
  similar: {
    results: trendingMovies.slice(1, 3)
  }
};

export const mockVaultUser = {
  name: "Alexander Vance",
  username: "@cinemavale",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256",
  bio: "Preserving the magic of 70mm and neon-drenched sci-fi. Film is forever.",
  country: "United Kingdom",
  joinDate: "October 2023",
  rank: "Master Cinephile",
  progress: 85
};

export const mockVaultStats = {
  totalTickets: 142,
  moviesCollected: 118,
  uniqueDirectors: 47,
  countriesExplored: 12,
  decadesExplored: 8,
  averageRating: 8.4,
  favoriteTheatre: "IMAX",
  favoriteStyle: "Vintage",
  totalRuntime: "248h 15m"
};

export const mockVaultTickets = [
  { id: "1", title: "Oppenheimer", serial: "OPP-2023-IMX-S01-G8-1930-B4C2", date: "Jul 21, 2023", theatre: "IMAX", style: "Vintage", image: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg" },
  { id: "2", title: "Dune: Part Two", serial: "DUN-2024-DLB-S02-H14-2000-8F9A", date: "Mar 1, 2024", theatre: "Dolby Cinema", style: "Sci-Fi", image: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2JGjjc94Y.jpg" },
  { id: "3", title: "Blade Runner 2049", serial: "BLA-2017-AMC-S04-F12-2130-A1D8", date: "Oct 6, 2017", theatre: "AMC Empire", style: "Noir", image: "https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg" },
  { id: "4", title: "Interstellar", serial: "INT-2014-PVR-S01-J20-1800-C91A", date: "Nov 7, 2014", theatre: "PVR Luxe", style: "Modern", image: "https://image.tmdb.org/t/p/w500/gEU2QlsUUHXjNpeYYC2Bfkvl5p.jpg" },
  { id: "5", title: "The Grand Budapest Hotel", serial: "GRA-2014-GRX-S03-E10-1500-D3E7", date: "Mar 28, 2014", theatre: "The Grand Rex", style: "Luxury", image: "https://image.tmdb.org/t/p/w500/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg" },
  { id: "6", title: "2001: A Space Odyssey", serial: "200-1968-IMX-S01-D15-1400-55F1", date: "Apr 3, 1968", theatre: "IMAX", style: "Retro", image: "https://image.tmdb.org/t/p/w500/zVmyTNxB0xZqLKEzEA6EisHw1qB.jpg" },
];

export const mockAchievements = [
  { id: "a1", title: "First Ticket", description: "Generated your very first cinema ticket.", rarity: "Common", icon: "ticket", unlocked: true },
  { id: "a2", title: "Nolan Complete", description: "Collected a ticket for every Christopher Nolan film.", rarity: "Legendary", icon: "star", unlocked: true },
  { id: "a3", title: "Sci-Fi Enthusiast", description: "Generated 20 tickets for Sci-Fi films.", rarity: "Rare", icon: "rocket", unlocked: true },
  { id: "a4", title: "IMAX Regular", description: "Selected IMAX as your theatre 50 times.", rarity: "Epic", icon: "monitor", unlocked: true },
  { id: "a5", title: "Silent Era Explorer", description: "Collected a ticket for a movie released before 1930.", rarity: "Legendary", icon: "film", unlocked: false },
  { id: "a6", title: "World Cinema", description: "Collected tickets from 10 different countries.", rarity: "Epic", icon: "globe", unlocked: true },
];

export const mockCollections = [
  { id: "c1", title: "A24 Masterpieces", count: 14, cover: "https://image.tmdb.org/t/p/w500/A7Oaw9xsKzQ7MszBhaF8aJpM1L2.jpg" },
  { id: "c2", title: "Sci-Fi Epics", count: 28, cover: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2JGjjc94Y.jpg" },
  { id: "c3", title: "Oscar Winners", count: 42, cover: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg" },
  { id: "c4", title: "Midnight Screenings", count: 9, cover: "https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg" },
];

export const mockActivity = [
  { id: "act1", type: "generate", movie: "Dune: Part Two", time: "2 hours ago" },
  { id: "act2", type: "unlock", achievement: "Sci-Fi Enthusiast", time: "2 hours ago" },
  { id: "act3", type: "collection", collection: "Sci-Fi Epics", time: "1 day ago" },
  { id: "act4", type: "generate", movie: "Oppenheimer", time: "3 days ago" },
];

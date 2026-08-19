export interface PassportMovie {
  title: string;
  year: string;
  director: string;
  runtime: string;
  rating: number;
  posterUrl: string;
  isCompleted: boolean;
  completedDate?: string;
  serialNumber?: string;
}

export interface Passport {
  id: string;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Master";
  progress: number;
  total: number;
  suggestedNextMovie: string;
  estimatedRuntimeRemaining: string;
  status: "locked" | "in-progress" | "completed";
  color: string;
  moviesCompleted: string[];
  requiredMovies?: PassportMovie[];
  reward: string;
}

export const mockPassportStats = {
  earned: 4,
  collected: 118,
  countries: 12,
  directors: 47,
  completionProgress: 34
};

export const mockPassports: Passport[] = [
  {
    id: "p1",
    title: "World Cinema Explorer",
    description: "Watch films from 25 different countries.",
    difficulty: "Medium",
    progress: 12,
    total: 25,
    suggestedNextMovie: "Parasite (South Korea)",
    estimatedRuntimeRemaining: "28 hours",
    status: "in-progress",
    color: "#2C3E50",
    moviesCompleted: ["Amélie", "Spirited Away", "City of God", "Pan's Labyrinth"],
    requiredMovies: [
      { title: "Parasite", year: "2019", director: "Bong Joon-ho", runtime: "132m", rating: 8.5, posterUrl: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg", isCompleted: false },
      { title: "Amélie", year: "2001", director: "Jean-Pierre Jeunet", runtime: "122m", rating: 8.3, posterUrl: "https://image.tmdb.org/t/p/w500/oTxwEkk3K8fG2uO6o4WlJ6QzP2f.jpg", isCompleted: true, completedDate: "2024-01-12", serialNumber: "FP-WLD-001" },
      { title: "Spirited Away", year: "2001", director: "Hayao Miyazaki", runtime: "125m", rating: 8.6, posterUrl: "https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkBg8lWOb.jpg", isCompleted: true, completedDate: "2024-02-05", serialNumber: "FP-WLD-002" },
      { title: "City of God", year: "2002", director: "Fernando Meirelles", runtime: "130m", rating: 8.6, posterUrl: "https://image.tmdb.org/t/p/w500/gLh4ZcTwW1P03E2kR1n83D36oUj.jpg", isCompleted: true, completedDate: "2024-03-20", serialNumber: "FP-WLD-003" },
      { title: "Pan's Labyrinth", year: "2006", director: "Guillermo del Toro", runtime: "118m", rating: 8.2, posterUrl: "https://image.tmdb.org/t/p/w500/2jPZtO0jOONtYtWJ1F5wN2kP61X.jpg", isCompleted: true, completedDate: "2024-04-18", serialNumber: "FP-WLD-004" },
      { title: "A Separation", year: "2011", director: "Asghar Farhadi", runtime: "123m", rating: 8.3, posterUrl: "https://image.tmdb.org/t/p/w500/yRzEWt5i17P6uKopkY9F5Zq745A.jpg", isCompleted: false },
      { title: "The Hunt", year: "2012", director: "Thomas Vinterberg", runtime: "115m", rating: 8.3, posterUrl: "https://image.tmdb.org/t/p/w500/r0L8aR6sXoA8s83lB1V644jD0Xg.jpg", isCompleted: false }
    ],
    reward: "Global Passport Theme"
  },
  {
    id: "p2",
    title: "Christopher Nolan Collection",
    description: "Generate tickets for every Nolan feature film.",
    difficulty: "Medium",
    progress: 12,
    total: 12,
    suggestedNextMovie: "None",
    estimatedRuntimeRemaining: "0 hours",
    status: "completed",
    color: "#1A1A1A",
    moviesCompleted: ["Following", "Memento", "Insomnia", "Batman Begins", "The Prestige", "The Dark Knight", "Inception", "The Dark Knight Rises", "Interstellar", "Dunkirk", "Tenet", "Oppenheimer"],
    requiredMovies: [
      { title: "Oppenheimer", year: "2023", director: "Christopher Nolan", runtime: "180m", rating: 8.5, posterUrl: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg", isCompleted: true, completedDate: "2023-08-14", serialNumber: "FP-NOL-012" },
      { title: "Tenet", year: "2020", director: "Christopher Nolan", runtime: "150m", rating: 7.3, posterUrl: "https://image.tmdb.org/t/p/w500/k68nPLbIST6NP96JmTxmZijEvCA.jpg", isCompleted: true, completedDate: "2021-02-10", serialNumber: "FP-NOL-011" },
      { title: "Dunkirk", year: "2017", director: "Christopher Nolan", runtime: "106m", rating: 7.9, posterUrl: "https://image.tmdb.org/t/p/w500/ebSnODcju64P88Z36P55Cmsv6fF.jpg", isCompleted: true, completedDate: "2018-05-22", serialNumber: "FP-NOL-010" },
      { title: "Interstellar", year: "2014", director: "Christopher Nolan", runtime: "169m", rating: 8.7, posterUrl: "https://image.tmdb.org/t/p/w500/gEU2QlsUUHXjNENJ2XhN50n3zYw.jpg", isCompleted: true, completedDate: "2015-11-01", serialNumber: "FP-NOL-009" },
      { title: "The Dark Knight Rises", year: "2012", director: "Christopher Nolan", runtime: "165m", rating: 8.4, posterUrl: "https://image.tmdb.org/t/p/w500/hr0L2aueqlP2BYUblTTjmtn0hw4.jpg", isCompleted: true, completedDate: "2013-03-12", serialNumber: "FP-NOL-008" },
      { title: "Inception", year: "2010", director: "Christopher Nolan", runtime: "148m", rating: 8.8, posterUrl: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg", isCompleted: true, completedDate: "2011-07-04", serialNumber: "FP-NOL-007" },
      { title: "The Dark Knight", year: "2008", director: "Christopher Nolan", runtime: "152m", rating: 9.0, posterUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg", isCompleted: true, completedDate: "2009-08-25", serialNumber: "FP-NOL-006" }
    ],
    reward: "Director Passport Theme"
  },
  {
    id: "p3",
    title: "Japanese Cinema Master",
    description: "Watch qualifying films from Kurosawa, Miyazaki, Kon, Ozu, Hosoda, and Kore-eda.",
    difficulty: "Hard",
    progress: 4,
    total: 15,
    suggestedNextMovie: "Seven Samurai",
    estimatedRuntimeRemaining: "24 hours",
    status: "in-progress",
    color: "#800000",
    moviesCompleted: ["Spirited Away", "Perfect Blue", "Shoplifters", "Mirai"],
    reward: "Japanese Passport Theme"
  },
  {
    id: "p4",
    title: "Pixar Complete",
    description: "Every Pixar feature animation.",
    difficulty: "Medium",
    progress: 27,
    total: 27,
    suggestedNextMovie: "None",
    estimatedRuntimeRemaining: "0 hours",
    status: "completed",
    color: "#2980B9",
    moviesCompleted: ["Toy Story", "A Bug's Life", "Toy Story 2", "Monsters, Inc.", "Finding Nemo", "The Incredibles", "Cars", "Ratatouille", "WALL-E", "Up", "Toy Story 3", "Cars 2", "Brave", "Monsters University", "Inside Out", "The Good Dinosaur", "Finding Dory", "Cars 3", "Coco", "Incredibles 2", "Toy Story 4", "Onward", "Soul", "Luca", "Turning Red", "Lightyear", "Elemental"],
    reward: "Animation Passport Theme"
  },
  {
    id: "p5",
    title: "Oscar Passport",
    description: "Every Best Picture winner in history.",
    difficulty: "Master",
    progress: 15,
    total: 96,
    suggestedNextMovie: "Casablanca",
    estimatedRuntimeRemaining: "182 hours",
    status: "in-progress",
    color: "#D4AF37",
    moviesCompleted: ["Everything Everywhere All at Once", "Parasite", "Moonlight", "The Lord of the Rings: The Return of the King", "Titanic", "Forrest Gump", "Schindler's List", "The Silence of the Lambs", "The Godfather", "Rocky"],
    reward: "Academy Passport Theme"
  },
  {
    id: "p6",
    title: "Horror Passport",
    description: "100 Horror Films.",
    difficulty: "Hard",
    progress: 32,
    total: 100,
    suggestedNextMovie: "The Shining",
    estimatedRuntimeRemaining: "128 hours",
    status: "in-progress",
    color: "#4A0404",
    moviesCompleted: ["Get Out", "Hereditary", "Alien", "The Thing", "Psycho"],
    reward: "Blood Red Passport Theme"
  },
  {
    id: "p7",
    title: "Sci-Fi Passport",
    description: "100 Science Fiction Films.",
    difficulty: "Hard",
    progress: 100,
    total: 100,
    suggestedNextMovie: "None",
    estimatedRuntimeRemaining: "0 hours",
    status: "completed",
    color: "#1B4F72",
    moviesCompleted: ["Blade Runner 2049", "Dune", "The Matrix", "Arrival", "Ex Machina"], // Truncated for mock
    reward: "Cybernetic Passport Theme"
  },
  {
    id: "p8",
    title: "Silent Era Passport",
    description: "Watch qualifying silent films.",
    difficulty: "Master",
    progress: 0,
    total: 20,
    suggestedNextMovie: "Metropolis",
    estimatedRuntimeRemaining: "45 hours",
    status: "locked",
    color: "#7F8C8D",
    moviesCompleted: [],
    reward: "Silver Screen Passport Theme"
  },
  {
    id: "p9",
    title: "Film Festival Passport",
    description: "Generate tickets for Cannes, Venice, Berlin, Toronto, and Sundance winners.",
    difficulty: "Hard",
    progress: 8,
    total: 30,
    suggestedNextMovie: "Triangle of Sadness",
    estimatedRuntimeRemaining: "51 hours",
    status: "in-progress",
    color: "#117A65",
    moviesCompleted: ["Titane", "Roma", "Nomadland"],
    reward: "Palme d'Or Passport Theme"
  },
  {
    id: "p10",
    title: "Studio Ghibli Passport",
    description: "Complete every Studio Ghibli feature.",
    difficulty: "Medium",
    progress: 24,
    total: 24,
    suggestedNextMovie: "None",
    estimatedRuntimeRemaining: "0 hours",
    status: "completed",
    color: "#27AE60",
    moviesCompleted: ["My Neighbor Totoro", "Grave of the Fireflies", "Kiki's Delivery Service", "Only Yesterday", "Porco Rosso", "Pom Poko", "Whisper of the Heart", "Princess Mononoke", "My Neighbors the Yamadas", "Spirited Away", "The Cat Returns", "Howl's Moving Castle", "Tales from Earthsea", "Ponyo", "Arrietty", "From Up on Poppy Hill", "The Wind Rises", "The Tale of the Princess Kaguya", "When Marnie Was There", "The Red Turtle", "Earwig and the Witch", "The Boy and the Heron"],
    reward: "Ghibli Blue Passport Theme"
  }
];

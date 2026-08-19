import { 
  MonitorPlay, 
  Clapperboard, 
  Award, 
  Globe2, 
  Ghost, 
  Sparkles, 
  Film, 
  Ticket, 
  Rocket, 
  TrendingUp 
} from "lucide-react";

export type Theatre = {
  id: string;
  name: string;
  theme: string;
  description: string;
  backgroundUrl: string;
  colorAccent: string;
  icon: any;
  fetchParams: {
    endpoint: string;
    params?: Record<string, string>;
  };
};

export const theatres: Theatre[] = [
  {
    id: "imax-experience",
    name: "IMAX Experience",
    theme: "Modern Blockbusters",
    description: "Epic science fiction and high-octane action designed for the largest screens.",
    backgroundUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=2000",
    colorAccent: "#00539C", // IMAX Blue
    icon: MonitorPlay,
    fetchParams: {
      endpoint: "/discover/movie",
      params: { with_genres: "28,878", "vote_count.gte": "2000", sort_by: "popularity.desc" }
    }
  },
  {
    id: "directors-hall",
    name: "Director's Hall",
    theme: "Auteur Cinema",
    description: "Masterpieces from celebrated visionary directors like Nolan, Villeneuve, and Scorsese.",
    backgroundUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=2000",
    colorAccent: "#8C1515", // Deep Red
    icon: Clapperboard,
    fetchParams: {
      endpoint: "/discover/movie",
      params: { sort_by: "vote_average.desc", "vote_count.gte": "5000" } // Fallback for high-rated masterpieces
    }
  },
  {
    id: "oscar-theatre",
    name: "Oscar Theatre",
    theme: "Award Winners",
    description: "Academy Award-winning films, Best Picture winners, and prestigious nominees.",
    backgroundUrl: "https://images.unsplash.com/photo-1585647347384-2593bc35786b?auto=format&fit=crop&q=80&w=2000",
    colorAccent: "#D4AF37", // Gold
    icon: Award,
    fetchParams: {
      endpoint: "/discover/movie",
      params: { with_genres: "18", "vote_average.gte": "8.0", "vote_count.gte": "3000", sort_by: "vote_average.desc" }
    }
  },
  {
    id: "world-cinema",
    name: "World Cinema",
    theme: "International Masterpieces",
    description: "Captivating movies from every continent, celebrating global storytelling.",
    backgroundUrl: "https://images.unsplash.com/photo-1524311583145-d5593bd25028?auto=format&fit=crop&q=80&w=2000",
    colorAccent: "#006B3F", // Emerald
    icon: Globe2,
    fetchParams: {
      endpoint: "/discover/movie",
      params: { with_original_language: "ko|fr|it|es|ja", "vote_count.gte": "1000", sort_by: "popularity.desc" }
    }
  },
  {
    id: "midnight-horror",
    name: "Midnight Horror",
    theme: "Chilling Cinema",
    description: "Classic creature features, psychological thrillers, and modern horror.",
    backgroundUrl: "https://images.unsplash.com/photo-1505635552518-3448ff116af3?auto=format&fit=crop&q=80&w=2000",
    colorAccent: "#8A0303", // Blood Red
    icon: Ghost,
    fetchParams: {
      endpoint: "/discover/movie",
      params: { with_genres: "27", sort_by: "popularity.desc", "vote_count.gte": "500" }
    }
  },
  {
    id: "animation-palace",
    name: "Animation Palace",
    theme: "Animated Worlds",
    description: "From Studio Ghibli magic to Pixar perfection and independent animation.",
    backgroundUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=2000",
    colorAccent: "#9D4EDD", // Purple
    icon: Sparkles,
    fetchParams: {
      endpoint: "/discover/movie",
      params: { with_genres: "16", sort_by: "popularity.desc", "vote_count.gte": "1000" }
    }
  },
  {
    id: "classic-cinema",
    name: "Classic Cinema",
    theme: "Golden Age Hollywood",
    description: "Historic masterpieces, Film Noir, and the unforgettable Silent Era.",
    backgroundUrl: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?auto=format&fit=crop&q=80&w=2000",
    colorAccent: "#A9A9A9", // Silver/Monochrome
    icon: Film,
    fetchParams: {
      endpoint: "/discover/movie",
      params: { "primary_release_date.lte": "1975-12-31", "vote_count.gte": "1000", sort_by: "vote_average.desc" }
    }
  },
  {
    id: "festival-screen",
    name: "Festival Screen",
    theme: "Indie & Arthouse",
    description: "Standout selections from Cannes, Venice, Sundance, and TIFF.",
    backgroundUrl: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&q=80&w=2000",
    colorAccent: "#FF7F50", // Coral
    icon: Ticket,
    fetchParams: {
      endpoint: "/discover/movie",
      params: { with_genres: "18,10749", "vote_count.lte": "2000", "vote_count.gte": "100", sort_by: "vote_average.desc" }
    }
  },
  {
    id: "scifi-nexus",
    name: "Sci-Fi Nexus",
    theme: "Futuristic Visions",
    description: "Space operas, cyberpunk realities, time travel, and alien encounters.",
    backgroundUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000",
    colorAccent: "#00FFFF", // Cyan
    icon: Rocket,
    fetchParams: {
      endpoint: "/discover/movie",
      params: { with_genres: "878", sort_by: "popularity.desc", "vote_count.gte": "1000" }
    }
  },
  {
    id: "trending-now",
    name: "Trending Now",
    theme: "Weekly Highlights",
    description: "The most popular releases and trending blockbusters of the week.",
    backgroundUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=2000",
    colorAccent: "#FFD700", // Bright Gold
    icon: TrendingUp,
    fetchParams: {
      endpoint: "/trending/movie/week"
    }
  }
];

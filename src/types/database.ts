export interface Profile {
  id: string;
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
  country: string | null;
  bio: string | null;
  collector_level: string;
  xp: number;
  theme_preference: string;
  created_at: string;
}

export interface UserStatistics {
  id: string;
  movies_collected: number;
  tickets_generated: number;
  passports_earned: number;
  directors_completed: number;
  total_runtime_minutes: number;
}

export interface Ticket {
  id: string;
  user_id: string;
  movie_id: string;
  tmdb_id: number | null;
  title: string;
  poster_url: string | null;
  theatre: string | null;
  screening_date: string | null;
  screening_time: string | null;
  seat: string | null;
  ticket_style: string;
  edition_number: string | null;
  serial_number: string;
  image_url: string | null;
  qr_data: string | null;
  created_at: string;
}

export interface Collection {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  cover_url: string | null;
  is_public: boolean;
  created_at: string;
}

export interface PassportProgress {
  id: string;
  user_id: string;
  passport_id: string;
  status: string;
  progress_count: number;
  completed_at: string | null;
}

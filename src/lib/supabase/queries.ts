import { createClient } from './server';
import type { Profile, UserStatistics, Ticket, Collection, PassportProgress } from '@/types/database';

export async function getUserProfile(userId: string): Promise<Profile | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
  return data as Profile;
}

export async function getUserStats(userId: string): Promise<UserStatistics | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('user_statistics')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error("Error fetching user stats:", error);
    return null;
  }
  return data as UserStatistics;
}

export async function getUserTickets(userId: string): Promise<Ticket[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('tickets')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching user tickets:", error);
    return [];
  }
  return data as Ticket[];
}

export async function getUserCollections(userId: string): Promise<Collection[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('collections')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching user collections:", error);
    return [];
  }
  return data as Collection[];
}

export async function getUserPassports(userId: string): Promise<PassportProgress[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('passport_progress')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.error("Error fetching user passports:", error);
    return [];
  }
  return data as PassportProgress[];
}

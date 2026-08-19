"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function generateTicket(movieData: any, config: any) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in to generate a ticket.");
  }

  // 1. Generate unique serial number if not provided
  const serial = config.serial || `FP-${new Date().getFullYear()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  
  // 2. Determine edition number
  const edition = "1st Edition"; 

  // 3. Insert the ticket
  const { data: ticket, error: ticketError } = await supabase
    .from('tickets')
    .insert({
      user_id: user.id,
      movie_id: String(movieData.id),
      tmdb_id: movieData.id,
      title: movieData.title,
      poster_url: `https://image.tmdb.org/t/p/w500${movieData.poster_path}`,
      theatre: config.theatre,
      screening_date: config.date,
      screening_time: config.time,
      seat: config.seat,
      ticket_style: config.style,
      edition_number: edition,
      serial_number: serial,
      image_url: `https://image.tmdb.org/t/p/w500${movieData.poster_path}`,
    })
    .select()
    .single();

  if (ticketError) {
    console.error("Ticket Generation Error:", ticketError);
    throw new Error(ticketError.message);
  }

  // 4. Update user statistics (Increment tickets and movies)
  // Call RPC or just fetch and update since RLS allows update on own row
  const { data: stats } = await supabase.from('user_statistics').select('*').eq('id', user.id).single();
  
  if (stats) {
    await supabase.from('user_statistics').update({
      tickets_generated: (stats.tickets_generated || 0) + 1,
      movies_collected: (stats.movies_collected || 0) + 1,
    }).eq('id', user.id);
  }

  // Revalidate the vault and profile paths to show the new data
  revalidatePath("/vault");
  revalidatePath("/profile");

  return ticket;
}

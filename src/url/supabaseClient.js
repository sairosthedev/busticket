import { createClient } from "@supabase/supabase-js";
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions for database operations
export const getBuses = async () => {
  const { data, error } = await supabase
    .from('buses')
    .select('*')
    .order('departure_time', { ascending: true });
  
  if (error) throw error;
  return data;
};

export const getBusById = async (id) => {
  const { data, error } = await supabase
    .from('buses')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
};

export const createBooking = async (bookingData) => {
  const { data, error } = await supabase
    .from('bookings')
    .insert([bookingData])
    .select();
  
  if (error) throw error;
  return data;
};

export const updateBusSeats = async (busId, seats) => {
  const { data, error } = await supabase
    .from('buses')
    .update({ available_seats: seats })
    .eq('id', busId)
    .select();
  
  if (error) throw error;
  return data;
};
    
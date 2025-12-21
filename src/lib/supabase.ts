import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          name: string;
          role: 'client' | 'admin';
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          name: string;
          role?: 'client' | 'admin';
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          role?: 'client' | 'admin';
          created_at?: string;
        };
      };
      offers: {
        Row: {
          id: string;
          title: string;
          description: string;
          short_description: string;
          destination: string;
          country: string;
          duration: number;
          price: number;
          original_price: number | null;
          images: string[];
          meals: 'BB' | 'HB' | 'AI' | 'none';
          trip_type: 'relax' | 'adventure' | 'culture' | 'family';
          season: 'spring' | 'summer' | 'autumn' | 'winter';
          is_last_minute: boolean;
          accommodation: string;
          transport: string;
          rating: number;
          review_count: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          short_description: string;
          destination: string;
          country: string;
          duration: number;
          price: number;
          original_price?: number | null;
          images: string[];
          meals: 'BB' | 'HB' | 'AI' | 'none';
          trip_type: 'relax' | 'adventure' | 'culture' | 'family';
          season: 'spring' | 'summer' | 'autumn' | 'winter';
          is_last_minute: boolean;
          accommodation: string;
          transport: string;
          rating?: number;
          review_count?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          short_description?: string;
          destination?: string;
          country?: string;
          duration?: number;
          price?: number;
          original_price?: number | null;
          images?: string[];
          meals?: 'BB' | 'HB' | 'AI' | 'none';
          trip_type?: 'relax' | 'adventure' | 'culture' | 'family';
          season?: 'spring' | 'summer' | 'autumn' | 'winter';
          is_last_minute?: boolean;
          accommodation?: string;
          transport?: string;
          rating?: number;
          review_count?: number;
          created_at?: string;
        };
      };
      itinerary_days: {
        Row: {
          id: string;
          offer_id: string;
          day: number;
          title: string;
          description: string;
          activities: string[];
          created_at: string;
        };
        Insert: {
          id?: string;
          offer_id: string;
          day: number;
          title: string;
          description: string;
          activities: string[];
          created_at?: string;
        };
        Update: {
          id?: string;
          offer_id?: string;
          day?: number;
          title?: string;
          description?: string;
          activities?: string[];
          created_at?: string;
        };
      };
      available_dates: {
        Row: {
          id: string;
          offer_id: string;
          date: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          offer_id: string;
          date: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          offer_id?: string;
          date?: string;
          created_at?: string;
        };
      };
      reservations: {
        Row: {
          id: string;
          user_id: string;
          offer_id: string;
          status: 'blocked' | 'confirmed' | 'cancelled';
          guests: number;
          total_price: number;
          departure_date: string;
          blocked_until: string | null;
          payment_deadline: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          offer_id: string;
          status?: 'blocked' | 'confirmed' | 'cancelled';
          guests: number;
          total_price: number;
          departure_date: string;
          blocked_until?: string | null;
          payment_deadline?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          offer_id?: string;
          status?: 'blocked' | 'confirmed' | 'cancelled';
          guests?: number;
          total_price?: number;
          departure_date?: string;
          blocked_until?: string | null;
          payment_deadline?: string | null;
          created_at?: string;
        };
      };
      favorites: {
        Row: {
          id: string;
          user_id: string;
          offer_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          offer_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          offer_id?: string;
          created_at?: string;
        };
      };
    };
  };
};

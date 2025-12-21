/*
  # Create Travel Booking System Database

  ## Overview
  This migration creates a complete database schema for a travel booking system with offers, 
  reservations, itineraries, and user management.

  ## Tables Created

  1. **profiles**
     - `id` (uuid, references auth.users)
     - `email` (text)
     - `name` (text)
     - `role` (text) - 'client' or 'admin'
     - `created_at` (timestamptz)
     - Extended user profile information linked to Supabase Auth

  2. **offers**
     - `id` (uuid, primary key)
     - `title` (text) - Offer title
     - `description` (text) - Full description
     - `short_description` (text) - Brief summary
     - `destination` (text) - Destination city
     - `country` (text) - Country name
     - `duration` (integer) - Trip duration in days
     - `price` (numeric) - Current price
     - `original_price` (numeric, nullable) - Original price for discounts
     - `images` (text[]) - Array of image URLs
     - `meals` (text) - Meal plan: BB, HB, AI, none
     - `trip_type` (text) - Type: relax, adventure, culture, family
     - `season` (text) - Season: spring, summer, autumn, winter
     - `is_last_minute` (boolean) - Last minute offer flag
     - `accommodation` (text) - Accommodation details
     - `transport` (text) - Transport information
     - `rating` (numeric) - Average rating
     - `review_count` (integer) - Number of reviews
     - `created_at` (timestamptz)

  3. **itinerary_days**
     - `id` (uuid, primary key)
     - `offer_id` (uuid, references offers)
     - `day` (integer) - Day number
     - `title` (text) - Day title
     - `description` (text) - Day description
     - `activities` (text[]) - Array of activities

  4. **available_dates**
     - `id` (uuid, primary key)
     - `offer_id` (uuid, references offers)
     - `date` (date) - Available departure date

  5. **reservations**
     - `id` (uuid, primary key)
     - `user_id` (uuid, references profiles)
     - `offer_id` (uuid, references offers)
     - `status` (text) - Status: blocked, confirmed, cancelled
     - `guests` (integer) - Number of guests
     - `total_price` (numeric) - Total reservation price
     - `departure_date` (date) - Departure date
     - `blocked_until` (timestamptz, nullable) - Blocked until timestamp
     - `payment_deadline` (timestamptz, nullable) - Payment deadline
     - `created_at` (timestamptz)

  6. **favorites**
     - `id` (uuid, primary key)
     - `user_id` (uuid, references profiles)
     - `offer_id` (uuid, references offers)
     - `created_at` (timestamptz)
     - Unique constraint on (user_id, offer_id)

  ## Security

  - Row Level Security (RLS) enabled on all tables
  - Public read access for offers, itinerary_days, and available_dates
  - Authenticated users can manage their own profiles, reservations, and favorites
  - Admin users can manage all data
  - Proper ownership checks on all policies
*/

-- Create profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  name text NOT NULL,
  role text NOT NULL DEFAULT 'client' CHECK (role IN ('client', 'admin')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create offers table
CREATE TABLE IF NOT EXISTS offers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  short_description text NOT NULL,
  destination text NOT NULL,
  country text NOT NULL,
  duration integer NOT NULL,
  price numeric NOT NULL,
  original_price numeric,
  images text[] NOT NULL DEFAULT '{}',
  meals text NOT NULL DEFAULT 'none' CHECK (meals IN ('BB', 'HB', 'AI', 'none')),
  trip_type text NOT NULL CHECK (trip_type IN ('relax', 'adventure', 'culture', 'family')),
  season text NOT NULL CHECK (season IN ('spring', 'summer', 'autumn', 'winter')),
  is_last_minute boolean NOT NULL DEFAULT false,
  accommodation text NOT NULL,
  transport text NOT NULL,
  rating numeric DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  review_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE offers ENABLE ROW LEVEL SECURITY;

-- Create itinerary_days table
CREATE TABLE IF NOT EXISTS itinerary_days (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  offer_id uuid NOT NULL REFERENCES offers(id) ON DELETE CASCADE,
  day integer NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  activities text[] NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE itinerary_days ENABLE ROW LEVEL SECURITY;

-- Create available_dates table
CREATE TABLE IF NOT EXISTS available_dates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  offer_id uuid NOT NULL REFERENCES offers(id) ON DELETE CASCADE,
  date date NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(offer_id, date)
);

ALTER TABLE available_dates ENABLE ROW LEVEL SECURITY;

-- Create reservations table
CREATE TABLE IF NOT EXISTS reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  offer_id uuid NOT NULL REFERENCES offers(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'blocked' CHECK (status IN ('blocked', 'confirmed', 'cancelled')),
  guests integer NOT NULL,
  total_price numeric NOT NULL,
  departure_date date NOT NULL,
  blocked_until timestamptz,
  payment_deadline timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

-- Create favorites table
CREATE TABLE IF NOT EXISTS favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  offer_id uuid NOT NULL REFERENCES offers(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, offer_id)
);

ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Offers policies (public read, admin write)
CREATE POLICY "Offers are viewable by everyone"
  ON offers FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admins can insert offers"
  ON offers FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update offers"
  ON offers FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete offers"
  ON offers FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Itinerary days policies (public read, admin write)
CREATE POLICY "Itinerary days are viewable by everyone"
  ON itinerary_days FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admins can manage itinerary days"
  ON itinerary_days FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Available dates policies (public read, admin write)
CREATE POLICY "Available dates are viewable by everyone"
  ON available_dates FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admins can manage available dates"
  ON available_dates FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Reservations policies (users can manage their own)
CREATE POLICY "Users can view their own reservations"
  ON reservations FOR SELECT
  TO authenticated
  USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Authenticated users can create reservations"
  ON reservations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reservations"
  ON reservations FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  )
  WITH CHECK (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Users can delete their own reservations"
  ON reservations FOR DELETE
  TO authenticated
  USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Favorites policies (users can manage their own)
CREATE POLICY "Users can view their own favorites"
  ON favorites FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can add favorites"
  ON favorites FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove favorites"
  ON favorites FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_offers_trip_type ON offers(trip_type);
CREATE INDEX IF NOT EXISTS idx_offers_season ON offers(season);
CREATE INDEX IF NOT EXISTS idx_offers_country ON offers(country);
CREATE INDEX IF NOT EXISTS idx_offers_is_last_minute ON offers(is_last_minute);
CREATE INDEX IF NOT EXISTS idx_itinerary_days_offer_id ON itinerary_days(offer_id);
CREATE INDEX IF NOT EXISTS idx_available_dates_offer_id ON available_dates(offer_id);
CREATE INDEX IF NOT EXISTS idx_reservations_user_id ON reservations(user_id);
CREATE INDEX IF NOT EXISTS idx_reservations_offer_id ON reservations(offer_id);
CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_offer_id ON favorites(offer_id);
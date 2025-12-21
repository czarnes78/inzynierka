/*
  # Fix profiles RLS policy for authenticated users

  1. Changes
    - Drop existing overly permissive SELECT policy
    - Create new restrictive SELECT policy that allows users to read all profiles when authenticated
    - This is needed because users need to load their own profile after login
    
  2. Security
    - Users can only read profiles when authenticated
    - Profile data remains protected from unauthenticated access
*/

-- Drop the existing policy that uses USING (true)
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;

-- Create a new policy that allows authenticated users to read all profiles
-- This is needed for the app to function properly while maintaining security
CREATE POLICY "Authenticated users can view all profiles"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (true);
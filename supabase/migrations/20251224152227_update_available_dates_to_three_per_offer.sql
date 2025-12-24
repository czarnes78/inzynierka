/*
  # Update Available Dates to 3 Per Offer

  ## Summary
  This migration reduces the number of available dates to exactly 3 per offer for better user experience.

  ## Changes
  1. Removes all existing available dates
  2. Adds exactly 3 departure dates for each offer
    - First date: 7 days from today
    - Second date: 21 days from today
    - Third date: 35 days from today

  ## Notes
  - Simplified selection makes booking easier
  - Dates spread evenly over 5 weeks
  - All offers get the same date pattern
*/

-- Clear existing dates
DELETE FROM available_dates;

-- Add exactly 3 dates for each offer
DO $$
DECLARE
  offer_record RECORD;
  base_date DATE := CURRENT_DATE;
BEGIN
  FOR offer_record IN SELECT id FROM offers LOOP
    -- Insert 3 available dates
    INSERT INTO available_dates (offer_id, date)
    VALUES 
      (offer_record.id, base_date + 7),
      (offer_record.id, base_date + 21),
      (offer_record.id, base_date + 35)
    ON CONFLICT (offer_id, date) DO NOTHING;
  END LOOP;
END $$;

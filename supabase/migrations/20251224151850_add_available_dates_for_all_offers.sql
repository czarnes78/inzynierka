/*
  # Add Available Dates for All Offers

  ## Summary
  This migration populates the `available_dates` table with departure dates for all existing offers.

  ## Changes
  1. Adds multiple departure dates for each offer
    - Creates dates starting from today and extending 6 months into the future
    - Adds departures every 7-14 days depending on the offer type
    - Last minute offers get more frequent departures (every 3-7 days)
    - Regular offers get departures every 10-14 days
  
  2. Date Distribution
    - Last minute offers: 15-20 available dates in the next 3 months
    - Regular offers: 12-15 available dates over the next 6 months
    - Ensures at least 10 departure options for every offer

  ## Notes
  - Dates are set to start from current date to ensure relevance
  - Distribution ensures good availability without overcrowding
  - Last minute offers prioritized with more immediate dates
*/

-- Add available dates for all offers
DO $$
DECLARE
  offer_record RECORD;
  base_date DATE := CURRENT_DATE;
  date_count INTEGER;
  days_increment INTEGER;
  i INTEGER;
BEGIN
  -- Loop through all offers
  FOR offer_record IN SELECT id, is_last_minute FROM offers LOOP
    -- Determine number of dates and increment based on offer type
    IF offer_record.is_last_minute THEN
      date_count := 18;
      days_increment := 4; -- More frequent departures for last minute
    ELSE
      date_count := 14;
      days_increment := 12; -- Regular spacing for standard offers
    END IF;

    -- Insert available dates for this offer
    FOR i IN 1..date_count LOOP
      INSERT INTO available_dates (offer_id, date)
      VALUES (
        offer_record.id,
        base_date + (i * days_increment)
      )
      ON CONFLICT (offer_id, date) DO NOTHING;
    END LOOP;
  END LOOP;
END $$;

/*
  # Add Demo Data for user@travel.com

  ## Summary
  This migration adds demonstration data for the user@travel.com account to showcase all profile features.

  ## Changes
  1. Favorites
    - Adds 5 favorite offers to demonstrate the favorites section
  
  2. Reservations
    - Adds 2 confirmed reservations (paid and confirmed)
    - Adds 1 blocked reservation (pending payment, blocked for 3 hours)
    - Adds 1 cancelled reservation (to show cancelled state)

  ## Notes
  - All data is for demonstration purposes
  - Reservations have realistic dates and prices
  - Different statuses show various states of the booking process
*/

-- Add favorites for user@travel.com
INSERT INTO favorites (user_id, offer_id)
SELECT 
  '16c46c64-6f30-40e6-bdf0-be46181c0b89'::uuid,
  id
FROM offers
WHERE id IN (
  '13894c1b-2e69-49da-8d20-2e9a3e5c3b3f',  -- Safari w Tanzanii
  'f2fbef57-8693-4be4-92ac-ba22fc114aa5',  -- Santorini
  '058572d4-0085-416c-9486-6d3c4c0d11c1',  -- Japonia
  '46b2512d-03f5-49c4-bee3-bf31eb4bb799',  -- Barcelona
  '232c3e46-bebb-4ea8-958d-ac75f5adef39'   -- Lizbona
)
ON CONFLICT (user_id, offer_id) DO NOTHING;

-- Add confirmed reservations
INSERT INTO reservations (user_id, offer_id, status, guests, total_price, departure_date, payment_deadline, created_at)
VALUES 
  -- Confirmed reservation 1
  (
    '16c46c64-6f30-40e6-bdf0-be46181c0b89',
    'f2fbef57-8693-4be4-92ac-ba22fc114aa5',  -- Santorini
    'confirmed',
    2,
    5798,
    CURRENT_DATE + INTERVAL '21 days',
    CURRENT_DATE - INTERVAL '3 days',
    CURRENT_DATE - INTERVAL '5 days'
  ),
  -- Confirmed reservation 2
  (
    '16c46c64-6f30-40e6-bdf0-be46181c0b89',
    '46b2512d-03f5-49c4-bee3-bf31eb4bb799',  -- Barcelona
    'confirmed',
    3,
    7500,
    CURRENT_DATE + INTERVAL '35 days',
    CURRENT_DATE - INTERVAL '1 day',
    CURRENT_DATE - INTERVAL '2 days'
  ),
  -- Blocked reservation (awaiting payment)
  (
    '16c46c64-6f30-40e6-bdf0-be46181c0b89',
    '13894c1b-2e69-49da-8d20-2e9a3e5c3b3f',  -- Safari w Tanzanii
    'blocked',
    2,
    11998,
    CURRENT_DATE + INTERVAL '7 days',
    CURRENT_DATE + INTERVAL '3 hours',
    CURRENT_DATE
  ),
  -- Cancelled reservation
  (
    '16c46c64-6f30-40e6-bdf0-be46181c0b89',
    '232c3e46-bebb-4ea8-958d-ac75f5adef39',  -- Lizbona
    'cancelled',
    2,
    4200,
    CURRENT_DATE + INTERVAL '14 days',
    CURRENT_DATE - INTERVAL '7 days',
    CURRENT_DATE - INTERVAL '10 days'
  )
ON CONFLICT DO NOTHING;

-- Update blocked_until for the blocked reservation
UPDATE reservations
SET blocked_until = CURRENT_TIMESTAMP + INTERVAL '3 hours'
WHERE status = 'blocked' 
  AND user_id = '16c46c64-6f30-40e6-bdf0-be46181c0b89'::uuid;

/*
  # Winter Season - Skiing Only

  1. Changes
    - Remove all non-skiing winter offers (tropical destinations, cultural trips)
    - Keep only skiing/snowboarding offers for winter season
    - Update skiing offer images to show proper skiing photos
  
  2. Winter Offers Kept
    - Val d'Isère (France) - Skiing
    - Innsbruck (Austria) - Snowboarding
    - Cortina d'Ampezzo (Italy) - Skiing
    - Zermatt (Switzerland) - Premium skiing
    - Zakopane (Poland) - Skiing

  3. Notes
    - All non-skiing winter offers will be removed
    - Images updated to show actual skiing scenes
*/

-- Remove all winter offers that are NOT skiing/snowboarding related
DELETE FROM offers 
WHERE season = 'winter' 
AND trip_type != 'adventure'
AND destination NOT IN ('Val d''Isère', 'Innsbruck', 'Cortina d''Ampezzo', 'Zermatt', 'Zakopane');

-- Also remove winter adventure offers that are not skiing (Iceland, Norway, diving, etc)
DELETE FROM offers 
WHERE season = 'winter'
AND destination NOT IN ('Val d''Isère', 'Innsbruck', 'Cortina d''Ampezzo', 'Zermatt', 'Zakopane');

-- Update Val d'Isère images to proper skiing photos
UPDATE offers 
SET images = ARRAY[
  'https://images.pexels.com/photos/848595/pexels-photo-848595.jpeg',
  'https://images.pexels.com/photos/848618/pexels-photo-848618.jpeg',
  'https://images.pexels.com/photos/2433353/pexels-photo-2433353.jpeg'
]
WHERE destination = 'Val d''Isère' AND country = 'Francja' AND season = 'winter';

-- Update Innsbruck images to proper snowboarding photos
UPDATE offers 
SET images = ARRAY[
  'https://images.pexels.com/photos/2440025/pexels-photo-2440025.jpeg',
  'https://images.pexels.com/photos/848604/pexels-photo-848604.jpeg',
  'https://images.pexels.com/photos/1430677/pexels-photo-1430677.jpeg'
]
WHERE destination = 'Innsbruck' AND country = 'Austria' AND season = 'winter';

-- Update Cortina d'Ampezzo images to proper skiing photos
UPDATE offers 
SET images = ARRAY[
  'https://images.pexels.com/photos/2437297/pexels-photo-2437297.jpeg',
  'https://images.pexels.com/photos/869258/pexels-photo-869258.jpeg',
  'https://images.pexels.com/photos/848595/pexels-photo-848595.jpeg'
]
WHERE destination = 'Cortina d''Ampezzo' AND country = 'Włochy' AND season = 'winter';

-- Update Zermatt images to proper skiing photos with Matterhorn
UPDATE offers 
SET images = ARRAY[
  'https://images.pexels.com/photos/1430676/pexels-photo-1430676.jpeg',
  'https://images.pexels.com/photos/2403209/pexels-photo-2403209.jpeg',
  'https://images.pexels.com/photos/848618/pexels-photo-848618.jpeg'
]
WHERE destination = 'Zermatt' AND country = 'Szwajcaria' AND season = 'winter';

-- Update Zakopane images to proper skiing photos (Tatras)
UPDATE offers 
SET images = ARRAY[
  'https://images.pexels.com/photos/848595/pexels-photo-848595.jpeg',
  'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg',
  'https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg'
]
WHERE destination = 'Zakopane' AND country = 'Polska' AND season = 'winter';
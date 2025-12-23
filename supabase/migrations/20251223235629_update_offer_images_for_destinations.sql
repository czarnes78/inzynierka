/*
  # Update Offer Images for Destinations

  1. Changes
    - Update images for Greece/Crete offers to show Greek islands
    - Update images for Poland/Tatry to show Polish mountains  
    - Update images for Italy/Rome to show Colosseum and Rome landmarks
    - Update images for Croatia to show Croatian coastline
    - Update images for Egypt to show pyramids and Egyptian landmarks
    - Update seasonal offer images to better match destinations

  2. Notes
    - Using verified Pexels image URLs
    - Images now better represent actual destinations
*/

-- Update main offers with destination-specific images

-- Greece/Crete offers
UPDATE offers 
SET images = ARRAY[
  'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg',
  'https://images.pexels.com/photos/164336/pexels-photo-164336.jpeg',
  'https://images.pexels.com/photos/533851/pexels-photo-533851.jpeg'
]
WHERE destination = 'Kreta' AND country = 'Grecja';

-- Poland/Zakopane offers
UPDATE offers 
SET images = ARRAY[
  'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg',
  'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg',
  'https://images.pexels.com/photos/1670045/pexels-photo-1670045.jpeg'
]
WHERE destination = 'Zakopane' AND country = 'Polska';

-- Italy/Rome offers
UPDATE offers 
SET images = ARRAY[
  'https://images.pexels.com/photos/2225439/pexels-photo-2225439.jpeg',
  'https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg',
  'https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg'
]
WHERE destination = 'Rzym' AND country = 'Włochy';

-- Croatia/Makarska offers
UPDATE offers 
SET images = ARRAY[
  'https://images.pexels.com/photos/2104152/pexels-photo-2104152.jpeg',
  'https://images.pexels.com/photos/1518967/pexels-photo-1518967.jpeg',
  'https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg'
]
WHERE destination = 'Makarska' AND country = 'Chorwacja';

-- Egypt/Hurghada offers
UPDATE offers 
SET images = ARRAY[
  'https://images.pexels.com/photos/71241/pexels-photo-71241.jpeg',
  'https://images.pexels.com/photos/262780/pexels-photo-262780.jpeg',
  'https://images.pexels.com/photos/3290075/pexels-photo-3290075.jpeg'
]
WHERE destination = 'Hurghada' AND country = 'Egipt';

-- Update seasonal winter offers
UPDATE offers 
SET images = ARRAY[
  'https://images.pexels.com/photos/848595/pexels-photo-848595.jpeg',
  'https://images.pexels.com/photos/848618/pexels-photo-848618.jpeg'
]
WHERE destination = 'Val d''Isère' AND country = 'Francja' AND season = 'winter';

UPDATE offers 
SET images = ARRAY[
  'https://images.pexels.com/photos/2440025/pexels-photo-2440025.jpeg',
  'https://images.pexels.com/photos/848604/pexels-photo-848604.jpeg'
]
WHERE destination = 'Innsbruck' AND country = 'Austria' AND season = 'winter';

-- Update Greece sailing offer
UPDATE offers 
SET images = ARRAY[
  'https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg',
  'https://images.pexels.com/photos/2412609/pexels-photo-2412609.jpeg'
]
WHERE destination = 'Ateny' AND country = 'Grecja' AND title LIKE '%Rejs%Cykladach%';

-- Update Croatia water sports
UPDATE offers 
SET images = ARRAY[
  'https://images.pexels.com/photos/2104152/pexels-photo-2104152.jpeg',
  'https://images.pexels.com/photos/1430672/pexels-photo-1430672.jpeg'
]
WHERE destination = 'Split' AND country = 'Chorwacja' AND season = 'summer';

-- Update Paris offer
UPDATE offers 
SET images = ARRAY[
  'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg',
  'https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg'
]
WHERE destination = 'Paryż' AND country = 'Francja' AND season = 'autumn';

-- Update Prague offer
UPDATE offers 
SET images = ARRAY[
  'https://images.pexels.com/photos/2091166/pexels-photo-2091166.jpeg',
  'https://images.pexels.com/photos/1845331/pexels-photo-1845331.jpeg'
]
WHERE destination = 'Praga' AND country = 'Czechy' AND season = 'autumn';

-- Update Budapest offer
UPDATE offers 
SET images = ARRAY[
  'https://images.pexels.com/photos/2031706/pexels-photo-2031706.jpeg',
  'https://images.pexels.com/photos/2422461/pexels-photo-2422461.jpeg'
]
WHERE destination = 'Budapeszt' AND country = 'Węgry' AND season = 'autumn';
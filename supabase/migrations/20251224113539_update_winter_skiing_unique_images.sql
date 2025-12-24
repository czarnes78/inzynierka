/*
  # Update Winter Skiing Images - Unique Photos
  
  1. Changes
    - Replace all winter offer images with unique skiing/snowboarding photos
    - Each destination gets distinct images
    - All images show winter sports activities
  
  2. Destinations Updated
    - Cortina d'Ampezzo - Dolomites skiing scenery
    - Innsbruck - Austrian snowboarding and alpine skiing
    - Val d'Isère - French Alps skiing
    - Zakopane - Polish Tatras mountain skiing
    - Zermatt - Swiss Alps with Matterhorn skiing
*/

-- Cortina d'Ampezzo (Italy) - Dolomites skiing
UPDATE offers 
SET images = ARRAY[
  'https://images.pexels.com/photos/2437297/pexels-photo-2437297.jpeg',
  'https://images.pexels.com/photos/869258/pexels-photo-869258.jpeg',
  'https://images.pexels.com/photos/2403209/pexels-photo-2403209.jpeg'
]
WHERE id = 'b440c66e-cd8b-4708-8655-0f153bb188b4';

-- Innsbruck (Austria) - Snowboarding
UPDATE offers 
SET images = ARRAY[
  'https://images.pexels.com/photos/2440025/pexels-photo-2440025.jpeg',
  'https://images.pexels.com/photos/848604/pexels-photo-848604.jpeg',
  'https://images.pexels.com/photos/2369910/pexels-photo-2369910.jpeg'
]
WHERE id = '41a031f8-42ac-4825-87b7-80142f780ac2';

-- Val d'Isère (France) - French Alps
UPDATE offers 
SET images = ARRAY[
  'https://images.pexels.com/photos/848595/pexels-photo-848595.jpeg',
  'https://images.pexels.com/photos/848618/pexels-photo-848618.jpeg',
  'https://images.pexels.com/photos/2433353/pexels-photo-2433353.jpeg'
]
WHERE id = '80f0d00a-c6a2-43a9-b239-fee950adbc8a';

-- Zakopane (Poland) - Tatras
UPDATE offers 
SET images = ARRAY[
  'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg',
  'https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg',
  'https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg'
]
WHERE id = 'a8df559c-2d23-4e2b-81cf-3ada3606bf6c';

-- Zermatt (Switzerland) - Matterhorn skiing
UPDATE offers 
SET images = ARRAY[
  'https://images.pexels.com/photos/1430676/pexels-photo-1430676.jpeg',
  'https://images.pexels.com/photos/3622517/pexels-photo-3622517.jpeg',
  'https://images.pexels.com/photos/1430677/pexels-photo-1430677.jpeg'
]
WHERE id = '82ef44fa-84ca-4577-a19d-b46363ada612';
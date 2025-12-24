/*
  # Update Last Minute Offers with Winter Images
  
  1. Changes
    - Update images for all last-minute offers with winter-specific photos
    - Obidos i Nazaré - winter coastal town
    - Trogir i Omiś - winter Croatia
    - Łeba - winter beach and dunes
    - Tatry - winter mountain landscape with Morskie Oko
*/

-- Obidos i Nazaré - winter coastal town
UPDATE offers 
SET images = ARRAY['https://media.tacdn.com/media/attractions-splice-spp-674x446/07/35/de/97.jpg']
WHERE id = '5e76369e-2adf-4ffd-9b6e-d82dfdea586b';

-- Trogir i Omiś - winter Croatia
UPDATE offers 
SET images = ARRAY['https://crolove.pl/wp-content/uploads/2018/01/lodowisko-zagrzeb-chorwacja-2017-1.jpg']
WHERE id = '5eef9abd-9298-45d7-8e95-393606a68dbe';

-- Słowiński Park Narodowy (Łeba) - winter beach
UPDATE offers 
SET images = ARRAY['https://www.patrykbieganski.com/wp-content/uploads/2022/07/PAT_7064.jpg']
WHERE id = 'e444ad03-c29d-48e9-886b-dd1e0a58f623';

-- Przygoda w Tatrach - winter Morskie Oko
UPDATE offers 
SET images = ARRAY['https://wodnesprawy.pl/wp-content/uploads/2025/01/Wodne-Sprawy_Morskie-Oko-zima-%E2%80%93-dlaczego-przyciaga-najwiecej-turystow-wlasnie-o-tej-porze-roku.jpg']
WHERE id = '36c23ad0-2914-4020-8749-d5131f4d0eaf';
/*
  # Update Prague and Budapest Offer Images
  
  1. Changes
    - Update Budapeszt offer with winter city view
    - Update Praga offer with city center view
*/

-- Budapeszt - Termy i Gastronomia
UPDATE offers 
SET images = ARRAY['https://fly.pl/wp-content/uploads/2014/06/Wegry-Budapeszt.jpg']
WHERE id = '89a6aed6-34c4-49bd-ba27-33262b107682';

-- Praga - Magiczny City Break
UPDATE offers 
SET images = ARRAY['https://media.brate.com/images/europa/czechy/praga/praga-1.jpg']
WHERE id = '070981bb-829f-492f-86af-fb84060aadd9';
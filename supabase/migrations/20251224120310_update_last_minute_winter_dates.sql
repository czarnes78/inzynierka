/*
  # Update Last Minute Offers with Winter Dates
  
  1. Changes
    - Update all last-minute offers with December/January date references
    - Make offers feel current and relevant for winter season
    - Update descriptions to include specific timeframes
*/

-- Słowiński Park Narodowy - December dates
UPDATE offers 
SET description = 'Ruchome wydmy, plaża i latarnia w Czołpinie. Unikalna przyroda. Wyjazd 27-30 grudnia - spacery po zimowej plaży i ognisko sylwestrowe.',
    short_description = 'Zimowe wydmy i plaża - 27-30 grudnia'
WHERE id = 'e444ad03-c29d-48e9-886b-dd1e0a58f623';

-- Trogir i Omiš - Early January
UPDATE offers 
SET description = 'UNESCO Trogir i zimowa Dalmacja. Historia, lokalne wino i oliwa. Wyjazd 3-7 stycznia - łagodna zima nad Adriatykiem.',
    short_description = 'Trogir zimą - 3-7 stycznia'
WHERE id = '5eef9abd-9298-45d7-8e95-393606a68dbe';

-- Obidos i Nazaré - Late December
UPDATE offers 
SET description = 'Średniowieczne miasteczko i największe zimowe fale świata. Historia i surfing. Wyjazd 28 grudnia - 2 stycznia.',
    short_description = 'Obidos i fale - 28 gru - 2 sty'
WHERE id = '5e76369e-2adf-4ffd-9b6e-d82dfdea586b';

-- Przygoda w Tatrach - Mid January
UPDATE offers 
SET description = 'Aktywny wypoczynek w zimowych Tatrach. Rakiety śnieżne, Morskie Oko i ciepła herbata w schroniskach. Wyjazd 10-13 stycznia.',
    short_description = 'Zimowe Tatry z przewodnikiem - 10-13 sty'
WHERE id = '36c23ad0-2914-4020-8749-d5131f4d0eaf';
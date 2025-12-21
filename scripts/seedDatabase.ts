import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const mockOffers = [
  {
    id: '1',
    title: 'Greckie Wakacje na Krecie',
    description: 'Odkryj piękno starożytnej kultury i relaksuj się na wspaniałych plażach Krety. Nasz hotel położony jest zaledwie 50 metrów od morza, oferując idealne warunki do wypoczynku.',
    short_description: 'Relaks na pięknych plażach Krety z możliwością zwiedzania zabytków',
    destination: 'Kreta',
    country: 'Grecja',
    duration: 7,
    price: 2499,
    original_price: 2999,
    images: [
      'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg',
      'https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg',
      'https://images.pexels.com/photos/3566135/pexels-photo-3566135.jpeg'
    ],
    meals: 'AI',
    trip_type: 'relax',
    season: 'summer',
    is_last_minute: false,
    available_dates: [
      '2024-12-15',
      '2025-01-10',
      '2025-02-05',
      '2025-03-01'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Przyjazd i zameldowanie',
        description: 'Transfer z lotniska, zameldowanie w hotelu, kolacja powitalna',
        activities: ['Transfer z lotniska', 'Zameldowanie w hotelu', 'Kolacja powitalna', 'Spacer po okolicy']
      },
      {
        day: 2,
        title: 'Zwiedzanie Heraklionu',
        description: 'Wycieczka do stolicy Krety z przewodnikiem',
        activities: ['Pałac Knossos', 'Muzeum Archeologiczne', 'Stare miasto Heraklionu', 'Lokalna taverna']
      },
      {
        day: 3,
        title: 'Dzień na plaży',
        description: 'Relaks na hotelowej plaży, zajęcia wodne',
        activities: ['Plażowanie', 'Sporty wodne', 'Masaż SPA', 'Wieczorna animacja']
      }
    ],
    accommodation: 'Hotel 4* all inclusive',
    transport: 'Samolot + transfer',
    rating: 4.5,
    review_count: 127
  },
  {
    id: '2',
    title: 'Przygoda w Tatrach',
    description: 'Aktywny wypoczynek w polskich górach. Trekking, wspinaczka i odkrywanie najpiękniejszych szlaków Tatr.',
    short_description: 'Aktywny wypoczynek w polskich górach z przewodnikiem',
    destination: 'Zakopane',
    country: 'Polska',
    duration: 5,
    price: 899,
    images: [
      'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg',
      'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg',
      'https://images.pexels.com/photos/709552/pexels-photo-709552.jpeg'
    ],
    meals: 'HB',
    trip_type: 'adventure',
    season: 'summer',
    is_last_minute: true,
    available_dates: [
      '2024-12-20',
      '2025-01-15',
      '2025-02-10'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Przyjazd do Zakopanego',
        description: 'Zameldowanie w hotelu, spacer po Krupówkach',
        activities: ['Zameldowanie', 'Spacer po Krupówkach', 'Kolacja regionalna']
      },
      {
        day: 2,
        title: 'Morskie Oko',
        description: 'Wycieczka do najsłynniejszego jeziora w Tatrach',
        activities: ['Trekking do Morskiego Oka', 'Lunch w górach', 'Sesja fotograficzna']
      }
    ],
    accommodation: 'Hotel 3* w centrum Zakopanego',
    transport: 'Autokar',
    rating: 4.8,
    review_count: 89
  },
  {
    id: '3',
    title: 'Kultura i Historia Rzymu',
    description: 'Poznaj wieczne miasto i jego niesamowitą historię. Zwiedzanie najważniejszych zabytków z przewodnikiem.',
    short_description: 'Zwiedzanie Rzymu z przewodnikiem, zabytki i kultura',
    destination: 'Rzym',
    country: 'Włochy',
    duration: 4,
    price: 1599,
    images: [
      'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg',
      'https://images.pexels.com/photos/532263/pexels-photo-532263.jpeg',
      'https://images.pexels.com/photos/1797161/pexels-photo-1797161.jpeg'
    ],
    meals: 'BB',
    trip_type: 'culture',
    season: 'spring',
    is_last_minute: false,
    available_dates: [
      '2025-01-05',
      '2025-02-15',
      '2025-03-20'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Koloseum i Forum Romanum',
        description: 'Zwiedzanie najsłynniejszych zabytków starożytnego Rzymu',
        activities: ['Koloseum', 'Forum Romanum', 'Wzgórze Palatyn', 'Lunch w rzymskiej trattorii']
      }
    ],
    accommodation: 'Hotel 4* w centrum miasta',
    transport: 'Samolot',
    rating: 4.7,
    review_count: 156
  },
  {
    id: '4',
    title: 'Rodzinne Wakacje w Chorwacji',
    description: 'Idealne wakacje dla całej rodziny nad Adriatykiem. Piękne plaże, czysta woda i mnóstwo atrakcji dla dzieci.',
    short_description: 'Wakacje nad Adriatykiem dla całej rodziny',
    destination: 'Makarska',
    country: 'Chorwacja',
    duration: 10,
    price: 3299,
    images: [
      'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg',
      'https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg',
      'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg'
    ],
    meals: 'HB',
    trip_type: 'family',
    season: 'summer',
    is_last_minute: false,
    available_dates: [
      '2025-01-20',
      '2025-02-25',
      '2025-03-15'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Przyjazd i relaks',
        description: 'Transfer, zameldowanie, pierwszy dzień na plaży',
        activities: ['Transfer', 'Zameldowanie', 'Plaża', 'Mini disco dla dzieci']
      }
    ],
    accommodation: 'Resort 4* z basenem dla dzieci',
    transport: 'Autokar',
    rating: 4.6,
    review_count: 203
  },
  {
    id: '5',
    title: 'Last Minute Egipt - Hurghada',
    description: 'Niesamowita oferta last minute do Egiptu! Słońce, plaża i rafa koralowa w atrakcyjnej cenie.',
    short_description: 'Last minute do Egiptu - słońce, plaża, nurkowanie',
    destination: 'Hurghada',
    country: 'Egipt',
    duration: 7,
    price: 1899,
    original_price: 2599,
    images: [
      'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg',
      'https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg',
      'https://images.pexels.com/photos/3566135/pexels-photo-3566135.jpeg'
    ],
    meals: 'AI',
    trip_type: 'relax',
    season: 'winter',
    is_last_minute: true,
    available_dates: [
      '2024-12-25',
      '2025-01-08'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Przyjazd do Hurghady',
        description: 'Transfer z lotniska, zameldowanie w hotelu',
        activities: ['Transfer z lotniska', 'Zameldowanie', 'Kolacja', 'Spacer po hotelu']
      }
    ],
    accommodation: 'Hotel 5* all inclusive nad morzem',
    transport: 'Samolot + transfer',
    rating: 4.4,
    review_count: 92
  }
];

async function seedDatabase() {
  console.log('Starting database seed...');

  for (const offer of mockOffers) {
    const { itinerary, available_dates, ...offerData } = offer;

    console.log(`Inserting offer: ${offer.title}`);
    const { data: insertedOffer, error: offerError } = await supabase
      .from('offers')
      .insert(offerData)
      .select()
      .single();

    if (offerError) {
      console.error(`Error inserting offer ${offer.title}:`, offerError);
      continue;
    }

    console.log(`  Offer inserted with ID: ${insertedOffer.id}`);

    for (const day of itinerary) {
      const { error: itineraryError } = await supabase
        .from('itinerary_days')
        .insert({
          offer_id: insertedOffer.id,
          day: day.day,
          title: day.title,
          description: day.description,
          activities: day.activities
        });

      if (itineraryError) {
        console.error(`  Error inserting itinerary day ${day.day}:`, itineraryError);
      }
    }

    for (const date of available_dates) {
      const { error: dateError } = await supabase
        .from('available_dates')
        .insert({
          offer_id: insertedOffer.id,
          date
        });

      if (dateError) {
        console.error(`  Error inserting available date ${date}:`, dateError);
      }
    }

    console.log(`  ✓ Completed ${offer.title}`);
  }

  console.log('\nDatabase seed completed!');
}

seedDatabase().catch(console.error);

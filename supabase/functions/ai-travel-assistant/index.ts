import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface ChatRequest {
  message: string;
}

interface Offer {
  id: string;
  title: string;
  country: string;
  destination: string;
  price: number;
  duration: string;
  image_url: string;
  trip_type: string;
  rating?: number;
  description?: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { message }: ChatRequest = await req.json();
    const lowerMessage = message.toLowerCase();

    // Analiza intencji użytkownika
    const intent = analyzeIntent(lowerMessage);
    
    // Wyszukaj oferty w bazie danych
    let query = supabase
      .from('offers')
      .select('*');

    // Filtruj według kraju
    if (intent.country) {
      query = query.ilike('country', `%${intent.country}%`);
    }

    // Filtruj według destynacji
    if (intent.destination) {
      query = query.ilike('destination', `%${intent.destination}%`);
    }

    // Filtruj według typu wycieczki
    if (intent.tripType) {
      query = query.eq('trip_type', intent.tripType);
    }

    // Filtruj według budżetu
    if (intent.maxPrice) {
      query = query.lte('price', intent.maxPrice);
    }

    // Filtruj last minute
    if (intent.lastMinute) {
      query = query.eq('is_last_minute', true);
    }

    // Ogranicz wyniki
    query = query.limit(3);

    const { data: offers, error } = await query;

    if (error) {
      throw error;
    }

    // Generuj odpowiedź
    const response = generateResponse(intent, offers || [], message);

    return new Response(
      JSON.stringify({
        response: response,
        offers: offers || [],
        intent: intent,
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({
        error: 'Przepraszam, wystąpił błąd. Spróbuj ponownie.',
        details: error.message,
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});

function analyzeIntent(message: string) {
  const intent: any = {
    country: null,
    destination: null,
    tripType: null,
    maxPrice: null,
    lastMinute: false,
  };

  // Słownik krajów
  const countries = {
    'egipt': 'Egipt',
    'grecj': 'Grecja',
    'włoch': 'Włochy',
    'hiszpa': 'Hiszpania',
    'chorwacj': 'Chorwacja',
    'portugal': 'Portugalia',
    'maroko': 'Maroko',
    'tajland': 'Tajlandia',
    'tajski': 'Tajlandia',
    'indonezj': 'Indonezja',
    'bali': 'Indonezja',
    'japoni': 'Japonia',
    'tanzani': 'Tanzania',
    'norwegi': 'Norwegia',
    'island': 'Islandia',
    'kanad': 'Kanada',
    'zea': 'ZEA',
    'dubaj': 'ZEA',
    'polsk': 'Polska',
  };

  // Słownik destynacji
  const destinations = {
    'hurghada': 'Hurghada',
    'sharm': 'Sharm El Sheikh',
    'kreta': 'Kreta',
    'rodos': 'Rodos',
    'korf': 'Korfu',
    'zakynthos': 'Zakynthos',
    'rzym': 'Rzym',
    'wenecj': 'Wenecja',
    'neapol': 'Neapol',
    'barcelon': 'Barcelona',
    'madryt': 'Madryt',
    'teneryf': 'Teneryfa',
    'dubrovnik': 'Dubrovnik',
    'split': 'Split',
    'lisbona': 'Lizbona',
    'porto': 'Porto',
    'marrakesz': 'Marrakesz',
    'bangkok': 'Bangkok',
    'phuket': 'Phuket',
    'ubud': 'Ubud',
    'tokio': 'Tokio',
    'osaka': 'Osaka',
    'zanzibar': 'Zanzibar',
    'serengeti': 'Serengeti',
    'reykjavik': 'Reykjavik',
    'zakopan': 'Zakopane',
    'gdańsk': 'Gdańsk',
    'kraków': 'Kraków',
  };

  // Typy wycieczek
  const tripTypes = {
    'relaks': 'relax',
    'plaż': 'relax',
    'morz': 'relax',
    'wypoczy': 'relax',
    'przygod': 'adventure',
    'aktywn': 'adventure',
    'gór': 'adventure',
    'trekking': 'adventure',
    'rodzin': 'family',
    'dziec': 'family',
    'zwiedza': 'sightseeing',
    'kultur': 'sightseeing',
    'zabytk': 'sightseeing',
  };

  // Wyszukaj kraj
  for (const [keyword, country] of Object.entries(countries)) {
    if (message.includes(keyword)) {
      intent.country = country;
      break;
    }
  }

  // Wyszukaj destynację
  for (const [keyword, destination] of Object.entries(destinations)) {
    if (message.includes(keyword)) {
      intent.destination = destination;
      break;
    }
  }

  // Wyszukaj typ wycieczki
  for (const [keyword, type] of Object.entries(tripTypes)) {
    if (message.includes(keyword)) {
      intent.tripType = type;
      break;
    }
  }

  // Wyszukaj budżet
  const priceMatch = message.match(/(\d+)\s*(?:zł|zloty|zlotych)/i);
  if (priceMatch) {
    intent.maxPrice = parseInt(priceMatch[1]);
  }

  // Last minute
  if (message.includes('last minute') || message.includes('lastminute') || message.includes('pilne')) {
    intent.lastMinute = true;
  }

  return intent;
}

function generateResponse(intent: any, offers: Offer[], originalMessage: string): string {
  if (offers.length === 0) {
    return 'Przepraszam, nie znalazłem ofert dokładnie pasujących do Twoich kryteriów. Spróbuj zmienić parametry wyszukiwania lub zapytać o inne kierunki.';
  }

  let response = '';

  if (intent.country) {
    response = `Świetnie! Znalazłem dla Ciebie ${offers.length} ${offers.length === 1 ? 'ofertę' : 'oferty'} wycieczek do ${intent.country}. `;
  } else if (intent.destination) {
    response = `Doskonały wybór! Mam ${offers.length} ${offers.length === 1 ? 'ofertę' : 'oferty'} do ${intent.destination}. `;
  } else if (intent.tripType === 'relax') {
    response = `Idealnie! Przygotowałem ${offers.length} relaksujące ${offers.length === 1 ? 'ofertę' : 'oferty'} dla Ciebie. `;
  } else if (intent.tripType === 'adventure') {
    response = `Kochasz przygody! Oto ${offers.length} pełne adrenaliny ${offers.length === 1 ? 'wycieczka' : 'wycieczki'}. `;
  } else if (intent.tripType === 'family') {
    response = `Rodzinne wakacje to świetny pomysł! Mam ${offers.length} ${offers.length === 1 ? 'ofertę' : 'oferty'} idealną dla rodzin z dziećmi. `;
  } else if (intent.lastMinute) {
    response = `Świetnie! Znalazłem ${offers.length} promocyjne oferty Last Minute. `;
  } else {
    response = `Na podstawie Twojego zapytania znalazłem ${offers.length} interesujące ${offers.length === 1 ? 'ofertę' : 'oferty'}. `;
  }

  if (intent.maxPrice) {
    response += `Wszystkie mieszczą się w Twoim budżecie do ${intent.maxPrice} zł. `;
  }

  response += 'Poniżej znajdziesz szczegóły każdej z propozycji.';

  return response;
}

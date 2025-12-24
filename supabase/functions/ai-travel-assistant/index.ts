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

    // Specjalna logika dla pytań o rezerwację - pokaż tanie oferty do Włoch i Norwegii
    if (intent.questionType === 'reservation') {
      query = query.in('country', ['Włochy', 'Norwegia']).order('price', { ascending: true }).limit(3);
    } else {
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
    }

    const { data: rawOffers, error } = await query;

    if (error) {
      throw error;
    }

    // Przekształć oferty na odpowiedni format
    const offers = (rawOffers || []).map((offer: any) => ({
      ...offer,
      image_url: offer.images && offer.images.length > 0 ? offer.images[0] : 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800',
      duration: `${offer.duration} dni`,
    }));

    // Generuj odpowiedź
    const response = generateResponse(intent, offers, message);

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
    questionType: null, // 'reservation', 'recommended', 'family', 'last_minute', 'budget'
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
    'węgr': 'Węgry',
    'wegr': 'Węgry',
    'czec': 'Czechy',
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
    'prag': 'Praga',
    'budapes': 'Budapeszt',
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
  let maxPrice = null;

  // Próbuj różne formaty ceny
  // Format: "4k", "4tys" -> 4000
  const kMatch = message.match(/(\d+)\s*(?:k|tys)/i);
  if (kMatch) {
    maxPrice = parseInt(kMatch[1]) * 1000;
  }

  // Format: "4000 zł", "4000 złotych", "4000 zloty"
  const zlMatch = message.match(/(\d+)\s*(?:zł|zloty|zlotych)/i);
  if (zlMatch && !maxPrice) {
    maxPrice = parseInt(zlMatch[1]);
  }

  // Format: "do 4000", "maksymalnie 4000", "max 4000"
  const numMatch = message.match(/(?:do|maksymalnie|max|maximum)\s*(\d+)/i);
  if (numMatch && !maxPrice) {
    maxPrice = parseInt(numMatch[1]);
  }

  // Samo "4000" w kontekście budżetu
  const plainNumMatch = message.match(/bud[żz]et[^0-9]*(\d+)/i);
  if (plainNumMatch && !maxPrice) {
    maxPrice = parseInt(plainNumMatch[1]);
  }

  if (maxPrice) {
    intent.maxPrice = maxPrice;
  }

  // Last minute
  if (message.includes('last minute') || message.includes('lastminute') || message.includes('pilne')) {
    intent.lastMinute = true;
  }

  // Rozpoznaj typ pytania
  if (message.includes('rezerwacj') || message.includes('zarezerwow') || message.includes('jak zarezerwować') || message.includes('jak dokona')) {
    intent.questionType = 'reservation';
  } else if (message.includes('poleca') || message.includes('najlep') || message.includes('jaki kierunek') || message.includes('gdzie pojechać') || message.includes('teraz najlep')) {
    intent.questionType = 'recommended';
  } else if (message.includes('rodzin') || message.includes('dziec')) {
    intent.questionType = 'family';
    intent.tripType = 'family';
  } else if (message.includes('last minute') || message.includes('lastminute')) {
    intent.questionType = 'last_minute';
    intent.lastMinute = true;
  } else if (message.includes('budżet') || message.includes('budzet') || message.includes('cena') || message.includes('do 4') || message.includes('do 3') || message.includes('tani') || message.includes('tanio') || message.includes('niedrogi') || maxPrice) {
    intent.questionType = 'budget';
  }

  return intent;
}

function generateResponse(intent: any, offers: Offer[], originalMessage: string): string {
  let response = '';

  // Odpowiedzi na konkretne pytania
  if (intent.questionType === 'reservation') {
    response = 'Rezerwacja jest bardzo prosta! Wystarczy:\n\n';
    response += '1. Wybierz interesującą Cię ofertę\n';
    response += '2. Kliknij przycisk "Zarezerwuj"\n';
    response += '3. Wypełnij formularz z danymi uczestników\n';
    response += '4. Dokonaj płatności online\n';
    response += '5. Otrzymasz potwierdzenie na email\n\n';
    response += 'Polecam Ci nasze tanie oferty do Włoch i Norwegii:';
    return response;
  }

  if (intent.questionType === 'recommended') {
    const currentMonth = new Date().getMonth(); // 0-11
    let seasonalInfo = '';

    // Grudzień = 11
    if (currentMonth === 11 || currentMonth === 0 || currentMonth === 1) {
      seasonalInfo = 'W tym okresie polecam:\n\n';
      seasonalInfo += '1. Zakopane - idealne na narty i snowboard\n';
      seasonalInfo += '2. Egipt - ciepłe słońce i rajskie plaże\n';
      seasonalInfo += '3. Praga i Budapeszt - magiczne świąteczne rynki\n\n';
    } else if (currentMonth >= 2 && currentMonth <= 4) {
      seasonalInfo = 'Na wiosnę polecam:\n\n';
      seasonalInfo += '1. Grecję - piękna pogoda, mniej turystów\n';
      seasonalInfo += '2. Włochy - idealne na zwiedzanie\n';
      seasonalInfo += '3. Hiszpanię - przyjemne temperatury\n\n';
    } else if (currentMonth >= 5 && currentMonth <= 8) {
      seasonalInfo = 'Latem najlepsze są:\n\n';
      seasonalInfo += '1. Grecja - piękne plaże i wyspy\n';
      seasonalInfo += '2. Chorwacja - krystalicznie czyste morze\n';
      seasonalInfo += '3. Tajlandia - egzotyczne wakacje\n\n';
    } else {
      seasonalInfo = 'Jesienią polecam:\n\n';
      seasonalInfo += '1. Egipt - gorące słońce, brak upałów\n';
      seasonalInfo += '2. Włochy - doskonałe na zwiedzanie\n';
      seasonalInfo += '3. Maroko - fascynująca kultura\n\n';
    }

    response = seasonalInfo;

    if (offers.length > 0) {
      response += `Znalazłem dla Ciebie ${offers.length} świetne ${offers.length === 1 ? 'ofertę' : 'oferty'} na ten okres:`;
    }
    return response;
  }

  if (intent.questionType === 'family') {
    response = 'Dla rodzin z dziećmi polecam oferty, które oferują:\n\n';
    response += '1. Atrakcje dla dzieci i aquaparki\n';
    response += '2. Animacje i kluby dla młodszych\n';
    response += '3. Bezpieczne, płytkie plaże\n';
    response += '4. Hotele z wyżywieniem all inclusive\n\n';

    if (offers.length > 0) {
      response += `Oto ${offers.length} idealne ${offers.length === 1 ? 'propozycja' : 'propozycje'} dla Twojej rodziny:`;
    } else {
      response += 'Sprawdź nasze oferty rodzinne - znajdziesz tam wiele wspaniałych propozycji!';
    }
    return response;
  }

  if (intent.questionType === 'last_minute') {
    response = 'Tak! Mamy świetne oferty Last Minute!\n\n';
    response += '1. Wyjazd już za kilka dni\n';
    response += '2. Ceny nawet o 50% niższe\n';
    response += '3. Sprawdzone hotele i destynacje\n\n';

    if (offers.length > 0) {
      response += `Znalazłem ${offers.length} gorące ${offers.length === 1 ? 'ofertę' : 'oferty'} Last Minute:`;
    } else {
      response += 'Sprawdź naszą sekcję Last Minute - oferty dodajemy codziennie!';
    }
    return response;
  }

  if (intent.questionType === 'budget') {
    response = 'Oczywiście! Możesz znaleźć wycieczki w każdym budżecie.\n\n';

    if (intent.maxPrice) {
      response += `Dla budżetu do ${intent.maxPrice} zł mamy wiele świetnych opcji!\n\n`;
    }

    response += 'Wskazówka: Oferty Last Minute często mają najlepsze ceny!\n\n';

    if (offers.length > 0) {
      response += `Znalazłem ${offers.length} ${offers.length === 1 ? 'ofertę' : 'oferty'} dopasowane do Twojego budżetu:`;
    } else {
      response += 'Sprecyzuj swój budżet, a znajdę dla Ciebie najlepsze oferty!';
    }
    return response;
  }

  // Standardowe odpowiedzi dla wyszukiwania
  if (offers.length === 0) {
    return 'Przepraszam, nie znalazłem ofert dokładnie pasujących do Twoich kryteriów. Spróbuj zmienić parametry wyszukiwania lub zapytać o inne kierunki. Możesz też zapytać o oferty Last Minute lub propozycje dla rodzin!';
  }

  if (intent.country) {
    response = `Świetnie! Znalazłem dla Ciebie ${offers.length} ${offers.length === 1 ? 'ofertę' : 'oferty'} wycieczek do ${intent.country}. `;
  } else if (intent.destination) {
    response = `Doskonały wybór! Mam ${offers.length} ${offers.length === 1 ? 'ofertę' : 'oferty'} do ${intent.destination}. `;
  } else if (intent.tripType === 'relax') {
    response = `Idealnie! Przygotowałem ${offers.length} relaksujące ${offers.length === 1 ? 'ofertę' : 'oferty'} dla Ciebie. `;
  } else if (intent.tripType === 'adventure') {
    response = `Kochasz przygody! Oto ${offers.length} pełne adrenaliny ${offers.length === 1 ? 'wycieczka' : 'wycieczki'}. `;
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

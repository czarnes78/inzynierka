import { supabase } from '../lib/supabase';
import { Offer, ItineraryDay, SearchFilters } from '../types';

export async function fetchOffers(filters?: SearchFilters): Promise<Offer[]> {
  let query = supabase
    .from('offers')
    .select('*');

  if (filters?.country) {
    query = query.eq('country', filters.country);
  }

  if (filters?.tripType) {
    query = query.eq('trip_type', filters.tripType);
  }

  if (filters?.season) {
    query = query.eq('season', filters.season);
  }

  if (filters?.meals) {
    query = query.eq('meals', filters.meals);
  }

  if (filters?.priceMin !== undefined) {
    query = query.gte('price', filters.priceMin);
  }

  if (filters?.priceMax !== undefined) {
    query = query.lte('price', filters.priceMax);
  }

  if (filters?.destination) {
    query = query.ilike('destination', `%${filters.destination}%`);
  }

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching offers:', error);
    return [];
  }

  const offers: Offer[] = await Promise.all(
    (data || []).map(async (offer) => {
      const [itineraryData, datesData] = await Promise.all([
        supabase
          .from('itinerary_days')
          .select('*')
          .eq('offer_id', offer.id)
          .order('day', { ascending: true }),
        supabase
          .from('available_dates')
          .select('date')
          .eq('offer_id', offer.id)
          .order('date', { ascending: true })
      ]);

      const itinerary: ItineraryDay[] = (itineraryData.data || []).map(day => ({
        day: day.day,
        title: day.title,
        description: day.description,
        activities: day.activities
      }));

      const availableDates = (datesData.data || []).map(d => new Date(d.date));

      if (filters?.dateFrom || filters?.dateTo) {
        const hasMatchingDate = availableDates.some(date => {
          const matchesFrom = !filters.dateFrom || date >= filters.dateFrom;
          const matchesTo = !filters.dateTo || date <= filters.dateTo;
          return matchesFrom && matchesTo;
        });

        if (!hasMatchingDate) {
          return null;
        }
      }

      return {
        id: offer.id,
        title: offer.title,
        description: offer.description,
        shortDescription: offer.short_description,
        destination: offer.destination,
        country: offer.country,
        duration: offer.duration,
        price: offer.price,
        originalPrice: offer.original_price,
        images: offer.images,
        meals: offer.meals,
        tripType: offer.trip_type,
        season: offer.season,
        isLastMinute: offer.is_last_minute,
        availableDates,
        itinerary,
        accommodation: offer.accommodation,
        transport: offer.transport,
        rating: offer.rating,
        reviewCount: offer.review_count,
        createdAt: new Date(offer.created_at)
      };
    })
  );

  return offers.filter((offer): offer is Offer => offer !== null);
}

export async function fetchAllOffers(): Promise<Offer[]> {
  return fetchOffers();
}

export async function fetchOfferById(id: string): Promise<Offer | null> {
  const { data: offer, error } = await supabase
    .from('offers')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error || !offer) {
    console.error('Error fetching offer:', error);
    return null;
  }

  const [itineraryData, datesData] = await Promise.all([
    supabase
      .from('itinerary_days')
      .select('*')
      .eq('offer_id', offer.id)
      .order('day', { ascending: true }),
    supabase
      .from('available_dates')
      .select('date')
      .eq('offer_id', offer.id)
      .order('date', { ascending: true })
  ]);

  const itinerary: ItineraryDay[] = (itineraryData.data || []).map(day => ({
    day: day.day,
    title: day.title,
    description: day.description,
    activities: day.activities
  }));

  const availableDates = (datesData.data || []).map(d => new Date(d.date));

  return {
    id: offer.id,
    title: offer.title,
    description: offer.description,
    shortDescription: offer.short_description,
    destination: offer.destination,
    country: offer.country,
    duration: offer.duration,
    price: offer.price,
    originalPrice: offer.original_price,
    images: offer.images,
    meals: offer.meals,
    tripType: offer.trip_type,
    season: offer.season,
    isLastMinute: offer.is_last_minute,
    availableDates,
    itinerary,
    accommodation: offer.accommodation,
    transport: offer.transport,
    rating: offer.rating,
    reviewCount: offer.review_count,
    createdAt: new Date(offer.created_at)
  };
}

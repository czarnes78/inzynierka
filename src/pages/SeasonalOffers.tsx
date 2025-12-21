import React, { useState, useEffect } from 'react';
import { Snowflake, Flower2, Sun, Leaf, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

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
  season: string;
}

interface Season {
  id: string;
  name: string;
  emoji: string;
  icon: React.ReactNode;
  description: string;
  keywords: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

const SeasonalOffers: React.FC = () => {
  const [selectedSeason, setSelectedSeason] = useState<string | null>(null);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(false);

  const seasons: Season[] = [
    {
      id: 'winter',
      name: 'Zima',
      emoji: '❄️',
      icon: <Snowflake className="h-12 w-12" />,
      description: 'narty, snowboard, après-ski',
      keywords: 'Narty, zimowe sporty, śnieg, ciepłe kraje',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      id: 'spring',
      name: 'Wiosna',
      emoji: '🌸',
      icon: <Flower2 className="h-12 w-12" />,
      description: 'nurkowanie, trekking, city nature',
      keywords: 'Kwitnąca przyroda, nurkowanie, trekking',
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200'
    },
    {
      id: 'summer',
      name: 'Lato',
      emoji: '☀️',
      icon: <Sun className="h-12 w-12" />,
      description: 'żagle, plaża, sporty wodne',
      keywords: 'Plaża, morze, sporty wodne, żeglarstwo',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    {
      id: 'autumn',
      name: 'Jesień',
      emoji: '🍁',
      icon: <Leaf className="h-12 w-12" />,
      description: 'city break, kultura, gastronomia',
      keywords: 'Zwiedzanie, kultura, gastronomia, miasta',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200'
    }
  ];

  useEffect(() => {
    if (selectedSeason) {
      loadSeasonalOffers(selectedSeason);
    }
  }, [selectedSeason]);

  const loadSeasonalOffers = async (season: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('offers')
        .select('*')
        .eq('season', season)
        .limit(12);

      if (error) throw error;

      const formattedOffers = data?.map(offer => ({
        id: offer.id,
        title: offer.title,
        country: offer.country,
        destination: offer.destination,
        price: offer.price,
        duration: `${offer.duration} dni`,
        image_url: offer.images?.[0] || '',
        trip_type: offer.trip_type,
        rating: offer.rating,
        season: offer.season
      })) || [];

      setOffers(formattedOffers);
    } catch (error) {
      console.error('Error loading seasonal offers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSeasonClick = (seasonId: string) => {
    setSelectedSeason(seasonId);
  };

  const handleBackToSeasons = () => {
    setSelectedSeason(null);
    setOffers([]);
  };

  const currentSeason = seasons.find(s => s.id === selectedSeason);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!selectedSeason ? (
          <>
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Wycieczki Sezonowe
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Odkryj najlepsze destynacje dostosowane do pory roku. Każdy sezon ma swój urok!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {seasons.map((season) => (
                <button
                  key={season.id}
                  onClick={() => handleSeasonClick(season.id)}
                  className={`${season.bgColor} ${season.borderColor} border-2 rounded-2xl p-8 text-left hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group`}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <span className="text-6xl">{season.emoji}</span>
                      <div>
                        <h2 className={`text-3xl font-bold ${season.color} mb-2`}>
                          {season.name}
                        </h2>
                        <p className="text-gray-700 text-lg font-medium">
                          {season.description}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className={`h-8 w-8 ${season.color} opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all duration-300`} />
                  </div>

                  <div className={`mt-4 pt-4 border-t-2 ${season.borderColor}`}>
                    <p className="text-gray-600 text-sm">
                      {season.keywords}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="mb-8">
              <button
                onClick={handleBackToSeasons}
                className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-2 mb-6"
              >
                <ChevronRight className="h-5 w-5 transform rotate-180" />
                <span>Powrót do sezonów</span>
              </button>

              <div className={`${currentSeason?.bgColor} ${currentSeason?.borderColor} border-2 rounded-2xl p-8`}>
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-6xl">{currentSeason?.emoji}</span>
                  <div>
                    <h1 className={`text-4xl font-bold ${currentSeason?.color}`}>
                      {currentSeason?.name}
                    </h1>
                    <p className="text-gray-700 text-lg">
                      {currentSeason?.description}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 mt-4">
                  Znaleźliśmy {offers.length} {offers.length === 1 ? 'ofertę' : 'ofert'} idealnych na {currentSeason?.name.toLowerCase()}
                </p>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
              </div>
            ) : offers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {offers.map((offer) => (
                  <a
                    key={offer.id}
                    href={`/offer/${offer.id}`}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="relative">
                      <img
                        src={offer.image_url}
                        alt={offer.title}
                        className="w-full h-56 object-cover"
                      />
                      {offer.rating && (
                        <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 shadow-lg">
                          <span className="text-yellow-500 font-bold">★ {offer.rating}</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                        {offer.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {offer.destination}, {offer.country}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">{offer.duration}</span>
                        <span className="text-2xl font-bold text-blue-600">
                          {offer.price.toLocaleString('pl-PL')} zł
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-2xl text-gray-600">
                  Brak ofert na {currentSeason?.name.toLowerCase()}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SeasonalOffers;

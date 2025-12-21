import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plane, Star, MapPin, Clock, Sparkles, Shield, HeartHandshake } from 'lucide-react';
import SearchForm from '../components/UI/SearchForm';
import OfferCard from '../components/UI/OfferCard';
import { SearchFilters, Offer } from '../types';
import { fetchOffers } from '../services/offerService';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [featuredOffers, setFeaturedOffers] = useState<Offer[]>([]);
  const [lastMinuteOffers, setLastMinuteOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOffers();
  }, []);

  const loadOffers = async () => {
    setLoading(true);
    const allOffers = await fetchOffers();
    setFeaturedOffers(allOffers.slice(0, 3));
    setLastMinuteOffers(allOffers.filter(offer => offer.isLastMinute).slice(0, 2));
    setLoading(false);
  };

  const handleSearch = (filters: SearchFilters) => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (value instanceof Date) {
          params.append(key, value.toISOString());
        } else {
          params.append(key, value.toString());
        }
      }
    });

    navigate(`/offers?${params.toString()}`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg)'
          }}
        ></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Odkryj świat z <span className="text-blue-300">TravelPL</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Znajdź wymarzoną podróż spośród tysięcy ofert. 
              Gwarantujemy najlepsze ceny i niezapomniane wrażenia.
            </p>
          </div>

          {/* Search Form */}
          <div className="max-w-4xl mx-auto">
            <SearchForm onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Dlaczego wybierają nas tysiące klientów?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Od ponad 15 lat organizujemy niezapomniane podróże dla naszych klientów
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Bezpieczne rezerwacje</h3>
              <p className="text-gray-600">
                Wszystkie płatności są zabezpieczone. Pełna ochrona Twoich danych osobowych.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Najlepsze ceny</h3>
              <p className="text-gray-600">
                Gwarantujemy konkurencyjne ceny. Jeśli znajdziesz taniej, zwrócimy różnicę.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <HeartHandshake className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Wsparcie 24/7</h3>
              <p className="text-gray-600">
                Nasz zespek ekspertów służy pomocą przez całą dobę, 7 dni w tygodniu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Offers */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Polecane oferty</h2>
              <p className="text-lg text-gray-600">Najchętniej wybierane przez naszych klientów</p>
            </div>
            <Link 
              to="/offers"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
            >
              Zobacz wszystkie
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600"></div>
                <p className="mt-4 text-gray-600">Ładowanie ofert...</p>
              </div>
            ) : (
              featuredOffers.map(offer => (
                <OfferCard key={offer.id} offer={offer} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Last Minute */}
      {lastMinuteOffers.length > 0 && (
        <section className="py-16 bg-gradient-to-r from-red-50 to-orange-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center space-x-2">
                  <Sparkles className="h-8 w-8 text-red-500" />
                  <span>Last Minute</span>
                </h2>
                <p className="text-lg text-gray-600">Wyjątkowe okazje na ostatnią chwilę</p>
              </div>
              <Link 
                to="/last-minute"
                className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors duration-200"
              >
                Zobacz wszystkie
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {loading ? (
                <div className="col-span-full text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600"></div>
                </div>
              ) : (
                lastMinuteOffers.map(offer => (
                  <OfferCard key={offer.id} offer={offer} />
                ))
              )}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Nie wiesz, którą podróż wybrać?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Skorzystaj z naszego inteligentnego asystenta AI, który pomoże Ci znaleźć idealną wycieczkę
          </p>
          <Link
            to="/ai-assistant"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-200 inline-flex items-center space-x-2"
          >
            <Sparkles className="h-5 w-5" />
            <span>Porozmawiaj z AI</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
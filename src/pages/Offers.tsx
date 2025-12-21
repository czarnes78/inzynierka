import React, { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { Filter, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import OfferCard from '../components/UI/OfferCard';
import { Offer, SearchFilters } from '../types';
import { fetchOffers } from '../services/offerService';

const Offers: React.FC = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [filteredOffers, setFilteredOffers] = useState<Offer[]>([]);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [sortBy, setSortBy] = useState<string>('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState<string[]>([]);

  useEffect(() => {
    const urlFilters: SearchFilters = {};

    searchParams.forEach((value, key) => {
      if (key === 'dateFrom' || key === 'dateTo') {
        urlFilters[key as keyof SearchFilters] = new Date(value) as any;
      } else if (key === 'guests' || key === 'priceMin' || key === 'priceMax') {
        urlFilters[key as keyof SearchFilters] = parseInt(value) as any;
      } else {
        urlFilters[key as keyof SearchFilters] = value as any;
      }
    });

    setFilters(urlFilters);
    loadOffers(urlFilters);
  }, [searchParams, location.pathname]);

  const loadOffers = async (initialFilters: SearchFilters = {}) => {
    setLoading(true);
    let allOffers = await fetchOffers();

    if (location.pathname === '/last-minute') {
      allOffers = allOffers.filter(offer => offer.isLastMinute);
    } else if (location.pathname === '/seasonal') {
      allOffers = allOffers;
    }

    setOffers(allOffers);

    const uniqueCountries = [...new Set(allOffers.map(offer => offer.country))];
    setCountries(uniqueCountries);
    setLoading(false);
  };

  useEffect(() => {
    let filtered = [...offers];

    // Apply filters
    if (filters.destination) {
      filtered = filtered.filter(offer => 
        offer.country.toLowerCase().includes(filters.destination!.toLowerCase()) ||
        offer.destination.toLowerCase().includes(filters.destination!.toLowerCase())
      );
    }

    if (filters.dateFrom) {
      filtered = filtered.filter(offer =>
        offer.availableDates.some(date => date >= filters.dateFrom!)
      );
    }

    if (filters.dateTo) {
      filtered = filtered.filter(offer =>
        offer.availableDates.some(date => date <= filters.dateTo!)
      );
    }

    if (filters.meals) {
      filtered = filtered.filter(offer => offer.meals === filters.meals);
    }

    if (filters.tripType) {
      filtered = filtered.filter(offer => offer.tripType === filters.tripType);
    }

    if (filters.priceMin) {
      filtered = filtered.filter(offer => offer.price >= filters.priceMin!);
    }

    if (filters.priceMax) {
      filtered = filtered.filter(offer => offer.price <= filters.priceMax!);
    }

    if (filters.country) {
      filtered = filtered.filter(offer => offer.country === filters.country);
    }

    if (filters.season) {
      filtered = filtered.filter(offer => offer.season === filters.season);
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
    }

    setFilteredOffers(filtered);
  }, [offers, filters, sortBy]);

  const seasons = ['spring', 'summer', 'autumn', 'winter'];
  const seasonLabels = {
    spring: 'Wiosna',
    summer: 'Lato', 
    autumn: 'Jesień',
    winter: 'Zima'
  };

  const mealOptions = [
    { value: '', label: 'Dowolne' },
    { value: 'BB', label: 'Śniadania (BB)' },
    { value: 'HB', label: 'Śniadania + obiad/kolacja (HB)' },
    { value: 'AI', label: 'All Inclusive' },
    { value: 'none', label: 'Bez wyżywienia' }
  ];

  const tripTypes = [
    { value: '', label: 'Dowolny' },
    { value: 'relax', label: 'Relaks' },
    { value: 'adventure', label: 'Przygoda' },
    { value: 'culture', label: 'Kultura' },
    { value: 'family', label: 'Rodzina' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Najnowsze' },
    { value: 'price-asc', label: 'Cena rosnąco' },
    { value: 'price-desc', label: 'Cena malejąco' },
    { value: 'rating', label: 'Najlepiej oceniane' }
  ];

  const getPageTitle = () => {
    if (location.pathname === '/last-minute') {
      return 'Oferty Last Minute';
    } else if (location.pathname === '/seasonal') {
      return 'Wycieczki sezonowe';
    }
    return 'Wszystkie oferty';
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{getPageTitle()}</h1>
          <p className="text-gray-600">
            Znaleziono {filteredOffers.length} {filteredOffers.length === 1 ? 'ofertę' : filteredOffers.length < 5 ? 'oferty' : 'ofert'}
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4 lg:hidden">
                <h3 className="text-lg font-semibold text-gray-900">Filtry</h3>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="p-2 hover:bg-gray-100 rounded-md"
                >
                  <SlidersHorizontal className="h-5 w-5" />
                </button>
              </div>

              <div className={`space-y-6 ${showFilters || 'hidden lg:block'}`}>
                <div className="hidden lg:block">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                    <Filter className="h-5 w-5" />
                    <span>Filtry</span>
                  </h3>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Cena (zł)</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder="Od"
                      value={filters.priceMin || ''}
                      onChange={(e) => setFilters(prev => ({ ...prev, priceMin: e.target.value ? parseInt(e.target.value) : undefined }))}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="number"
                      placeholder="Do"
                      value={filters.priceMax || ''}
                      onChange={(e) => setFilters(prev => ({ ...prev, priceMax: e.target.value ? parseInt(e.target.value) : undefined }))}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Country */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Kraj</h4>
                  <select
                    value={filters.country || ''}
                    onChange={(e) => setFilters(prev => ({ ...prev, country: e.target.value || undefined }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  >
                    <option value="">Wszystkie kraje</option>
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>

                {/* Meals */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Wyżywienie</h4>
                  <select
                    value={filters.meals || ''}
                    onChange={(e) => setFilters(prev => ({ ...prev, meals: e.target.value || undefined }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  >
                    {mealOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>

                {/* Trip Type */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Typ wyjazdu</h4>
                  <select
                    value={filters.tripType || ''}
                    onChange={(e) => setFilters(prev => ({ ...prev, tripType: e.target.value || undefined }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  >
                    {tripTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>

                {/* Season */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Sezon</h4>
                  <select
                    value={filters.season || ''}
                    onChange={(e) => setFilters(prev => ({ ...prev, season: e.target.value || undefined }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  >
                    <option value="">Wszystkie sezony</option>
                    {seasons.map(season => (
                      <option key={season} value={season}>
                        {seasonLabels[season as keyof typeof seasonLabels]}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Clear Filters */}
                <button
                  onClick={() => setFilters({})}
                  className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors duration-200 text-sm"
                >
                  Wyczyść filtry
                </button>
              </div>
            </div>
          </div>

          {/* Offers List */}
          <div className="lg:col-span-3 mt-6 lg:mt-0">
            {/* Sorting */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  Wyniki: {filteredOffers.length} ofert
                </span>
                <div className="flex items-center space-x-2">
                  <ArrowUpDown className="h-4 w-4 text-gray-500" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  >
                    {sortOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Offers Grid */}
            {loading ? (
              <div className="col-span-full text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600"></div>
                <p className="mt-4 text-gray-600">Ładowanie ofert...</p>
              </div>
            ) : filteredOffers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredOffers.map(offer => (
                  <OfferCard key={offer.id} offer={offer} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <Filter className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Nie znaleziono ofert
                </h3>
                <p className="text-gray-600 mb-4">
                  Spróbuj zmienić kryteria wyszukiwania lub wyczyść filtry
                </p>
                <button
                  onClick={() => setFilters({})}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Wyczyść filtry
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offers;
import React, { useState } from 'react';
import { Search, Calendar, MapPin, Users, Utensils, Heart } from 'lucide-react';
import { SearchFilters } from '../../types';

interface SearchFormProps {
  onSearch: (filters: SearchFilters) => void;
  className?: string;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, className = '' }) => {
  const [filters, setFilters] = useState<SearchFilters>({
    destination: '',
    dateFrom: new Date(),
    dateTo: undefined,
    guests: 2,
    meals: '',
    tripType: ''
  });

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  const destinations = [
    'Grecja', 'Hiszpania', 'Włochy', 'Chorwacja', 'Egipt', 'Turcja', 
    'Bułgaria', 'Polska', 'Francja', 'Portugalia'
  ];

  const mealOptions = [
    { value: '', label: 'Dowolne' },
    { value: 'BB', label: 'Śniadania (BB)' },
    { value: 'HB', label: 'Śniadania + obiad/kolacja (HB)' },
    { value: 'AI', label: 'All Inclusive' },
    { value: 'none', label: 'Bez wyżywienia' }
  ];

  const tripTypes = [
    { value: '', label: 'Dowolny', icon: Heart },
    { value: 'relax', label: 'Relaks', icon: Heart },
    { value: 'adventure', label: 'Przygoda', icon: Heart },
    { value: 'culture', label: 'Kultura', icon: Heart },
    { value: 'family', label: 'Rodzina', icon: Heart }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  const formatDate = (date: string) => {
    return date ? new Date(date) : undefined;
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`bg-white rounded-lg shadow-xl p-6 ${className}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {/* Destination */}
        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
            <MapPin className="h-4 w-4" />
            <span>Kierunek</span>
          </label>
          <select
            value={filters.destination || ''}
            onChange={(e) => setFilters(prev => ({ ...prev, destination: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          >
            <option value="">Wybierz kierunek</option>
            {destinations.map(dest => (
              <option key={dest} value={dest}>{dest}</option>
            ))}
          </select>
        </div>

        {/* Date From */}
        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
            <Calendar className="h-4 w-4" />
            <span>Data wyjazdu od</span>
          </label>
          <input
            type="date"
            value={filters.dateFrom ? filters.dateFrom.toISOString().split('T')[0] : today}
            onChange={(e) => setFilters(prev => ({ 
              ...prev, 
              dateFrom: formatDate(e.target.value)
            }))}
            min={today}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
          />
        </div>

        {/* Date To */}
        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
            <Calendar className="h-4 w-4" />
            <span>Data wyjazdu do</span>
          </label>
          <input
            type="date"
            value={filters.dateTo ? filters.dateTo.toISOString().split('T')[0] : ''}
            onChange={(e) => setFilters(prev => ({ 
              ...prev, 
              dateTo: formatDate(e.target.value)
            }))}
            min={filters.dateFrom ? filters.dateFrom.toISOString().split('T')[0] : today}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
          />
        </div>

        {/* Guests */}
        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
            <Users className="h-4 w-4" />
            <span>Liczba osób</span>
          </label>
          <select
            value={filters.guests || 2}
            onChange={(e) => setFilters(prev => ({ ...prev, guests: parseInt(e.target.value) }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          >
            {[1,2,3,4,5,6,7,8].map(num => (
              <option key={num} value={num}>{num} {num === 1 ? 'osoba' : num < 5 ? 'osoby' : 'osób'}</option>
            ))}
          </select>
        </div>

        {/* Meals */}
        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
            <Utensils className="h-4 w-4" />
            <span>Wyżywienie</span>
          </label>
          <select
            value={filters.meals || ''}
            onChange={(e) => setFilters(prev => ({ ...prev, meals: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          >
            {mealOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        {/* Trip Type */}
        <div className="space-y-2">
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
            <Heart className="h-4 w-4" />
            <span>Typ wyjazdu</span>
          </label>
          <select
            value={filters.tripType || ''}
            onChange={(e) => setFilters(prev => ({ ...prev, tripType: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          >
            {tripTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
      >
        <Search className="h-5 w-5" />
        <span>Szukaj wycieczki</span>
      </button>
    </form>
  );
};

export default SearchForm;